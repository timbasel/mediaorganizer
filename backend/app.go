package backend

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"path"
	"strings"

	"github.com/adrg/xdg"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

const Title = "MediaOrganizer"

type App struct {
	ctx   context.Context
	State *AppState
}

func NewApp() *App {
	app := &App{
		State: LoadAppState(),
	}
	return app
}

func (app *App) Startup(ctx context.Context) {
	app.ctx = ctx
	runtime.LogSetLogLevel(app.ctx, logger.INFO)
}

func (app *App) DomReady(ctx context.Context) {
	setWindowState(app.ctx, app.State.Window)
}

func (app *App) BeforeClose(ctx context.Context) bool {
	app.State.Window = getWindowState(app.ctx)
	app.State.Save()
	return false
}

func (app *App) Shutdown(ctx context.Context) {
}

type AppState struct {
	SettingsFile string      `json:"settings_file"`
	Window       WindowState `json:"window"`
}

func LoadAppState() *AppState {
	state := &AppState{
		SettingsFile: fmt.Sprintf("./%s.json", strings.ToLower(Title)),
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

	path := getAppStateFilePath()
	err = os.WriteFile(path, data, 0644)
	if err != nil {
		return err
	}
	return nil
}

type WindowState struct {
	X     int `json:"x"`
	Y     int `json:"y"`
	SizeX int `json:"size_x"`
	SizeY int `json:"size_y"`
}

func getWindowState(ctx context.Context) WindowState {
	window := WindowState{}
	window.X, window.Y = runtime.WindowGetPosition(ctx)
	window.SizeX, window.SizeY = runtime.WindowGetSize(ctx)
	return window
}

func setWindowState(ctx context.Context, window WindowState) {
	runtime.WindowSetPosition(ctx, window.X, window.Y)
	runtime.WindowSetSize(ctx, window.SizeX, window.SizeY)
}

func getAppStateFilePath() string {
	cacheDir := xdg.CacheHome
	return path.Join(cacheDir, strings.ToLower(Title), "state.json")
}
