package backend

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/go-rel/rel"
	"github.com/h2non/bimg"
	"github.com/timbasel/go-log/pkg/log"
	"github.com/timbasel/mediaorganizer/backend/utils"
	ffmpeg "github.com/u2takey/ffmpeg-go"
	"golang.org/x/sync/errgroup"
)

type Media struct {
	ID           string    `db:"id" json:"id"`
	Path         string    `db:"path" json:"path"`
	OriginalPath string    `db:"original_path" json:"originalPath"`
	Hash         int64     `db:"hash" json:"hash"`
	Size         int64     `db:"size" json:"size"`
	ModTime      time.Time `db:"mod_time" json:"modTime"`
	CreatedAt    time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt    time.Time `db:"updated_at" json:"updatedAt"`

	Name          string `db:"-" json:"name"`
	FileType      string `db:"-" json:"fileType"`
	ThumbnailPath string `db:"-" json:"thumbnailPath"`
}

func (media *Media) GetName() string {
	return strings.TrimSuffix(filepath.Base(media.Path), filepath.Ext(media.Path))
}

func (media *Media) ExpandExtraInfo(app *App) {
	media.Name = media.GetName()
	media.FileType = app.getFileType(media.Path)
	media.ThumbnailPath = app.getThumbnailPath(media.Hash)
}

type MediaFilter struct {
	Limit  int `json:"limit"`
	Offset int `json:"offset"`
}

func (app *App) GetMedia(filter MediaFilter) ([]Media, error) {
	media := []Media{}
	err := app.DB.FindAll(app.ctx, &media, rel.Limit(filter.Limit), rel.Offset(filter.Offset))
	if err != nil {
		return []Media{}, err
	}

	var g errgroup.Group

	// generate thumbnails
	for index := range media {
		media := &media[index]
		media.ExpandExtraInfo(app)
		_, err := os.Stat(media.ThumbnailPath)
		if os.IsNotExist(err) {
			g.Go(func() error {
				app.GenerateThumbnail(media.Path, media.Hash)
				return nil // ignore thumbnail generation errors
			})
		}
	}
	if err := g.Wait(); err != nil {
		log.Error(err.Error())
		return []Media{}, err
	}

	return media, nil
}

func (app *App) GetMediaCount(filter MediaFilter) (int, error) {
	return app.DB.Count(app.ctx, "media")
}

type MediaStats struct {
	Count int `json:"count"`
	Size  int `json:"size"`
}

func (app *App) GetMediaStats() (*MediaStats, error) {
	var err error
	stats := &MediaStats{}

	stats.Count, err = app.DB.Count(app.ctx, "media")
	if err != nil {
		return nil, err
	}
	stats.Size, err = app.DB.Aggregate(app.ctx, rel.From("media"), "sum", "size")
	if err != nil {
		return nil, err
	}

	return stats, nil
}

func (app *App) IndexSources() error {
	start := time.Now()

	stats := &MediaStats{}
	for _, source := range app.Settings.Sources {
		err := app.IndexDirectory(source, stats)
		if err != nil {
			return err
		}

	}

	elapsed := time.Since(start)
	log.Infof("%d media files indexed (%s)", stats.Count, elapsed)
	return nil
}

func (app *App) IndexDirectory(directory string, stats *MediaStats) error {
	files, err := os.ReadDir(directory)
	if err != nil {
		return err
	}

	media := []Media{}

	for _, file := range files {
		path := filepath.Join(directory, file.Name())
		if file.IsDir() {
			err := app.IndexDirectory(path, stats)
			if err != nil {
				return err
			}
		} else {
			// get file info
			info, err := os.Stat(path)
			if err != nil {
				return err
			}
			stats.Size = stats.Size + int(info.Size())

			// generate hash
			hash, err := utils.Hash(path)
			if err != nil {
				return err
			}

			media = append(media, Media{
				Path:         path,
				OriginalPath: path,
				Hash:         int64(hash),
				Size:         info.Size(),
				ModTime:      info.ModTime(),
			})
		}
	}

	stats.Count = stats.Count + len(media)
	for _, chunk := range utils.ChunkBy(media, 100) {
		err := app.DB.InsertAll(app.ctx, &chunk, rel.OnConflictKeyIgnore("path"), rel.OnConflictKeyIgnore("original_path"))
		if err != nil {
			return err
		}
	}

	log.Infof("%s indexed (%d files found)", directory, len(media))

	return nil
}

const ThumbnailSize = 480

func (app *App) GenerateThumbnail(path string, hash int64) error {
	ext := strings.TrimPrefix(filepath.Ext(path), ".")
	if utils.Contains(app.Settings.ImageExtensions, ext) {
		file, err := bimg.Read(path)
		if err != nil {
			return err
		}
		img, err := bimg.NewImage(file).Process(bimg.Options{
			Height:  ThumbnailSize,
			Quality: 80,
			Type:    bimg.JPEG,
		})
		if err != nil {
			return err
		}
		err = bimg.Write(app.getThumbnailPath(hash), img)
		if err != nil {
			return err
		}
	} else if utils.Contains(app.Settings.VideoExtensions, ext) {
		file, err := os.Create(app.getThumbnailPath(hash))
		if err != nil {
			return err
		}
		err = ffmpeg.Input(path).Filter("thumbnail", ffmpeg.Args{}, ffmpeg.KwArgs{"n": 10}).Output("pipe:", ffmpeg.KwArgs{"vframes": 1, "format": "image2", "vcodec": "mjpeg"}).WithOutput(file).Run()
		if err != nil {
			return err
		}
	} else {
		return fmt.Errorf("invalid file format to generate thumbnail")
	}

	return nil
}

func (app *App) getThumbnailPath(hash int64) string {
	return filepath.Join(app.Settings.ThumbnailDirectory, fmt.Sprintf("%016x.jpg", uint64(hash)))
}

func (app *App) getFileType(path string) string {
	ext := strings.TrimPrefix(filepath.Ext(path), ".")
	if utils.Contains(app.Settings.ImageExtensions, ext) {
		return "image"
	} else if utils.Contains(app.Settings.VideoExtensions, ext) {
		return "video"
	} else {
		return ""
	}
}
