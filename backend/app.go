package backend

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path"
	"strings"

	"github.com/adrg/xdg"
	"github.com/timbasel/mediaorganizer/backend/db"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

const Title = "MediaOrganizer"

type App struct {
	ctx   context.Context
	state *AppState

	Settings *Settings
	DB       *db.Database
}

func NewApp() *App {
	app := &App{
		state: LoadAppState(),
	}
	app.LoadSettings(app.state.SettingsPath)
	return app
}

func (app *App) Startup(ctx context.Context) {
	app.ctx = ctx
	runtime.LogSetLogLevel(app.ctx, logger.INFO)
}

func (app *App) DomReady(ctx context.Context) {
	setWindowState(app.ctx, app.state.Window)
}

func (app *App) BeforeClose(ctx context.Context) bool {
	log.Println("Before Close")
	app.state.Window = getWindowState(app.ctx)
	err := app.state.Save()
	if err != nil {
		log.Println(err)
	}
	return false
}

func (app *App) Shutdown(ctx context.Context) {
}

func (app *App) OpenDirectoryDialog() string {
	dir, err := runtime.OpenDirectoryDialog(app.ctx, runtime.OpenDialogOptions{
		ShowHiddenFiles: true,
	})
	if err != nil {
		return ""
	}
	return dir
}

func (app *App) OpenFileDialog() string {
	file, err := runtime.OpenFileDialog(app.ctx, runtime.OpenDialogOptions{
		ShowHiddenFiles: true,
	})
	if err != nil {
		return ""
	}
	return file
}

type AppState struct {
	SettingsPath string      `json:"settings_path"`
	Window       WindowState `json:"window"`
}

func LoadAppState() *AppState {
	state := &AppState{
		SettingsPath: fmt.Sprintf("./%s.json", strings.ToLower(Title)),
		Window: WindowState{
			X:      0,
			Y:      0,
			Width:  1024,
			Height: 768,
		},
	}

	path := getAppStateFilePath()
	data, err := os.ReadFile(path)
	if err != nil {
		return state // ignore and use default app state
	}

	err = json.Unmarshal(data, &state)
	if err != nil {
		return state // ignore and use default app state
	}

	return state
}

func (state *AppState) Save() error {
	data, err := json.MarshalIndent(state, "", "  ")
	if err != nil {
		return err
	}

	filepath := getAppStateFilePath()
	err = os.MkdirAll(path.Dir(filepath), os.ModePerm)
	if err != nil {
		return err
	}
	err = os.WriteFile(filepath, data, 0644)
	if err != nil {
		return err
	}
	return nil
}

type WindowState struct {
	X      int `json:"x"`
	Y      int `json:"y"`
	Width  int `json:"width"`
	Height int `json:"height"`
}

func getWindowState(ctx context.Context) WindowState {
	window := WindowState{}
	window.X, window.Y = runtime.WindowGetPosition(ctx)
	window.Width, window.Height = runtime.WindowGetSize(ctx)
	return window
}

func setWindowState(ctx context.Context, window WindowState) {
	runtime.WindowSetPosition(ctx, window.X, window.Y)
	runtime.WindowSetSize(ctx, window.Width, window.Height)
}

func getAppStateFilePath() string {
	cacheDir := xdg.CacheHome
	return path.Join(cacheDir, strings.ToLower(Title), "state.json")
}
