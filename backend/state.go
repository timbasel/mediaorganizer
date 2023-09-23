package backend

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"path"
	"strings"

	"github.com/adrg/xdg"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type State struct {
	SettingsPath string      `json:"settings_path"`
	Window       WindowState `json:"window"`
}

func NewState() *State {
	return &State{
		SettingsPath: fmt.Sprintf("./%s.json", strings.ToLower(Title)),
		Window: WindowState{
			X:      0,
			Y:      0,
			Width:  1024,
			Height: 768,
		},
	}
}

func LoadState() *State {
	state := NewState()
	statePath := getStateFilePath()

	data, err := os.ReadFile(statePath)
	if err != nil {
		return state // ignore error and use default state
	}

	err = json.Unmarshal(data, &state)
	if err != nil {
		return state // ignore error and use default state
	}

	return state
}

func (state *State) Save() error {
	statePath := getStateFilePath()

	data, err := json.MarshalIndent(state, "", "  ")
	if err != nil {
		return err
	}

	err = os.MkdirAll(path.Dir(statePath), os.ModePerm)
	if err != nil {
		return err
	}
	err = os.WriteFile(statePath, data, 0644)
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

func getStateFilePath() string {
	return path.Join(xdg.CacheHome, strings.ToLower(Title), "state.json")
}
