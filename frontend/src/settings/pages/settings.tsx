import { FaSolidFolder } from "solid-icons/fa";
import { Component, createSignal, onMount } from "solid-js";
import { produce } from "solid-js/store";
import * as App from "wails/go/backend/App";
import { Button, Input, InputArray, Spacer } from "~/components";
import { SetSettings, Settings } from "../store";

export const SettingsPage: Component = () => {
  const [settingsPath, setSettingsPath] = createSignal("");

  onMount(async () => {
    setSettingsPath(await App.GetSettingsPath());
    SetSettings(await App.GetSettings());
  });

  const onLoadSettings = async () => {
    await App.LoadSettings(settingsPath());
    SetSettings(await App.GetSettings());
  };

  const onSaveSettings = async () => {
    await App.SaveSettings(Settings);
  };

  return (
    <div class="flex h-full w-full flex-col gap-4 max-w-screen-2xl m-auto">
      <h1 class="m-4 text-center text-2xl">Settings</h1>

      <div class="flex gap-2">
        <Input
          class="w-full"
          label="Settings"
          value={settingsPath()}
          onChange={(e) => setSettingsPath(e.currentTarget.value)}
        />
        <Button class="min-w-max" onClick={onLoadSettings}>
          Load Settings
        </Button>
      </div>
      <Spacer class="bg-gray-400" />
      <Input
        class="w-full"
        label="Database"
        value={Settings.database}
        onChange={(e) => SetSettings("database", e.currentTarget.value)}
      />
      <Input
        class="w-full"
        label="Thumbnail Directory"
        value={Settings.thumbnailDirectory}
        onChange={(e) => SetSettings("thumbnailDirectory", e.currentTarget.value)}
      >
        <Button
          class="h-full"
          onClick={async () => {
            SetSettings("thumbnailDirectory", await App.OpenDirectoryDialog());
          }}
        >
          <FaSolidFolder />
        </Button>
      </Input>
      <Spacer />
      <InputArray
        label="Sources"
        placeholder="New Source"
        array={Settings.sources}
        onAppend={(value) => SetSettings(produce((settings) => settings.sources.push(value)))}
        onRemove={(index) => SetSettings(produce((settings) => settings.sources.splice(index, 1)))}
      >
        <Button
          class="h-full"
          onClick={async () => {
            const path = await App.OpenDirectoryDialog();
            SetSettings(produce((settings) => settings.sources.push(path)));
          }}
        >
          <FaSolidFolder />
        </Button>
      </InputArray>
      <Input
        class="w-full"
        label="Destination"
        value={Settings.destination}
        onChange={(e) => SetSettings("destination", e.currentTarget.value)}
      >
        <Button
          class="h-full"
          onClick={async () => {
            SetSettings("destination", await App.OpenDirectoryDialog());
          }}
        >
          <FaSolidFolder />
        </Button>
      </Input>
      <Spacer />
      <Input
        class="w-full"
        label="Image Extensions"
        value={Settings.imageExtensions}
        onChange={(e) => SetSettings("imageExtensions", e.currentTarget.value.split(","))}
      />
      <Input
        class="w-full"
        label="Video Extensions"
        value={Settings.videoExtensions}
        onChange={(e) => SetSettings("videoExtensions", e.currentTarget.value.split(","))}
      />
      <Spacer />
      <Button onClick={onSaveSettings}>Save Settings</Button>
    </div>
  );
};
