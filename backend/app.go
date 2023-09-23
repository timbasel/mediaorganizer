package backend

import "context"

const Title = "MediaOrganizer"

type App struct {
	ctx   context.Context
	state *State
}

func NewApp() *App {
	app := &App{
		state: LoadState(),
	}
	return app
}

func (app *App) OnStartup(ctx context.Context) {
	app.ctx = ctx
}

func (app *App) OnDomReady(ctx context.Context) {}

func (app *App) OnBeforeClose(ctx context.Context) bool {
	return true
}

func (app *App) OnShutdown(ctx context.Context) {}

func (app *App) OnResize() {

}
