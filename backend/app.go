package backend

import (
	"context"
	"os"

	"github.com/timbasel/go-log/pkg/log"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

const Title = "MediaOrganizer"

type App struct {
	ctx   context.Context
	state *State

	Settings *Settings
}

func NewApp() *App {
	app := &App{
		state: LoadState(),
	}
	app.update()
	return app
}

func (app *App) OnStartup(ctx context.Context) {
	app.ctx = ctx
}

func (app *App) OnDomReady(ctx context.Context) {
	setWindowState(app.ctx, app.state.Window)
}

func (app *App) OnBeforeClose(ctx context.Context) bool {
	app.state.Window = getWindowState(app.ctx)
	err := app.state.Save()
	if err != nil {
		log.Error(err.Error())
	}
	return false
}

func (app *App) OnShutdown(ctx context.Context) {}

func (app *App) OnResize() {
	app.state.Window = getWindowState(app.ctx)
	err := app.state.Save()
	if err != nil {
		log.Error(err.Error())
	}
}

func (app *App) OpenDirectoryDialog() string {
	path, err := runtime.OpenDirectoryDialog(app.ctx, runtime.OpenDialogOptions{
		ShowHiddenFiles: true,
	})
	if err != nil {
		return ""
	}
	return path
}

func (app *App) OpenFileDialog() string {
	path, err := runtime.OpenFileDialog(app.ctx, runtime.OpenDialogOptions{
		ShowHiddenFiles: true,
	})
	if err != nil {
		return ""
	}
	return path
}

func (app *App) SaveFileDialog() string {
	path, err := runtime.SaveFileDialog(app.ctx, runtime.SaveDialogOptions{
		ShowHiddenFiles: true,
	})
	if err != nil {
		return ""
	}
	return path
}

// loads settings and updates fields dependent on the settings
func (app *App) update() {
	app.Settings = LoadOrNewSettings(app.state.SettingsPath)

	os.MkdirAll(app.Settings.ThumbnailDirectory, os.ModePerm)
}
