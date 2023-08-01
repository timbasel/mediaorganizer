package backend

import (
	"encoding/json"
	"fmt"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/adrg/xdg"
	"github.com/timbasel/mediaorganizer/backend/db"
)

type Settings struct {
	Database           string `json:"database"`
	ThumbnailDirectory string `json:"thumbnailDirectory"`

	Sources     []string `json:"sources"`
	Destination string   `json:"destination"`

	ImageExtensions []string `json:"imageExtensions"`
	VideoExtensions []string `json:"videoExtensions"`
}

func NewSettings() *Settings {
	return &Settings{
		Database:           fmt.Sprintf("./%s.db", strings.ToLower(Title)),
		ThumbnailDirectory: filepath.Join(xdg.CacheHome, Title, "thumbnails"),

		Sources:     []string{},
		Destination: "",

		ImageExtensions: []string{"jpg", "jpeg", "png", "webp"},
		VideoExtensions: []string{"mp4", "m4v", "mkv", "mov", "avi", "wmv"},
	}
}

func LoadSettings(filepath string) (*Settings, error) {
	data, err := os.ReadFile(filepath)
	if err != nil {
		return nil, err
	}

	settings := NewSettings()
	err = json.Unmarshal(data, &settings)
	if err != nil {
		return nil, err
	}
	return settings, nil
}

func LoadOrNewSettings(filepath string) *Settings {
	settings, err := LoadSettings(filepath)
	if err != nil {
		settings := NewSettings()
		settings.Save(filepath)
		return settings
	}
	return settings
}

func (settings *Settings) Save(filepath string) error {
	err := os.MkdirAll(path.Dir(filepath), os.ModePerm)
	if err != nil {
		return err
	}
	data, err := json.MarshalIndent(settings, "", "  ")
	if err != nil {
		return err
	}
	err = os.WriteFile(filepath, data, 0644)
	if err != nil {
		return err
	}
	return nil
}

// loads settings file and updates fields dependent on the settings
func (app *App) LoadSettings(filepath string) {
	app.state.SettingsPath = filepath
	app.Settings = LoadOrNewSettings(app.state.SettingsPath)
	if app.DB != nil {
		app.DB.Close()
	}
	app.DB = db.Open(app.Settings.Database)

	os.MkdirAll(app.Settings.ThumbnailDirectory, os.ModePerm)
}

func (app *App) SaveSettings(settings Settings) {
	app.Settings = &settings
	app.Settings.Save(app.state.SettingsPath)
}

func (app *App) GetSettings() Settings {
	return *app.Settings
}

func (app *App) GetSettingsPath() string {
	return app.state.SettingsPath
}
