import { FaSolidFolder } from "solid-icons/fa";
import { Component, createSignal, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import {
  GetSettings,
  GetSettingsPath,
  LoadSettings,
  OpenDirectoryDialog,
  OpenFileDialog,
  SaveSettings,
} from "wails/go/backend/App";
import { backend } from "wails/go/models";
import { Button, Input, Spacer } from "~/components";
import { InputArray } from "~/components/input-array";

export const SettingsPage: Component = () => {
  const [settingsPath, setSettingsPath] = createSignal("");
  const [settings, setSettings] = createStore<backend.Settings>({
    database: "",
    sources: [],
    destination: "",

    image_extensions: [],
    video_extensions: [],
  });

  onMount(async () => {
    setSettingsPath(await GetSettingsPath());
    setSettings(await GetSettings());
  });

  const onLoad = async () => {
    await LoadSettings(settingsPath());
  };

  const onSave = async () => {
    await SaveSettings(settings);
  };

  return (
    <div class="flex h-full w-full flex-col gap-4">
      <h1 class="m-4 text-center text-2xl">Settings</h1>

      <div class="flex gap-2">
        <Input
          class="w-full"
          label="Settings"
          value={settingsPath()}
          onChange={(e) => setSettingsPath(e.currentTarget.value)}
        />
        <Button class="min-w-max" onClick={onLoad}>
          Load Settings
        </Button>
      </div>

      <Spacer />

      <Input
        class="w-full"
        label="Database"
        value={settings.database}
        onChange={(e) => setSettings("database", e.currentTarget.value)}
      >
        <DialogButton
          type="file"
          onClick={(file) => {
            setSettings("database", file);
          }}
        />
      </Input>
      <InputArray
        label="Sources"
        placeholder="New Source"
        array={settings.sources}
        onAppend={(value) => setSettings(produce((settings) => settings.sources.push(value)))}
        onRemove={(index) => setSettings(produce((settings) => settings.sources.splice(index, 1)))}
      >
        <DialogButton
          type="directory"
          onClick={(directory) => {
            setSettings(produce((settings) => settings.sources.push(directory)));
          }}
        />
      </InputArray>
      <Input
        class="w-full"
        label="Destination"
        value={settings.destination}
        onChange={(e) => setSettings("destination", e.currentTarget.value)}
      >
        <DialogButton
          type="directory"
          onClick={(directory) => {
            setSettings("destination", directory);
          }}
        />
      </Input>

      <Spacer />

      <Input
        class="w-full"
        label="Image Extensions"
        value={settings.image_extensions}
        onChange={(e) => setSettings("image_extensions", e.currentTarget.value.split(","))}
      />
      <Input
        class="w-full"
        label="Video Extensions"
        value={settings.video_extensions}
        onChange={(e) => setSettings("video_extensions", e.currentTarget.value.split(","))}
      />

      <div>
        <Button class="w-full" onClick={onSave}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

const DialogButton: Component<{ type: "file" | "directory"; onClick: (path: string) => void }> = (
  props,
) => {
  return (
    <div
      class="p-4 items-center cursor-pointer"
      onClick={async () => {
        const path = props.type === "file" ? await OpenFileDialog() : await OpenDirectoryDialog();
        if (path !== "") {
          props.onClick(path);
        }
      }}
    >
      <FaSolidFolder />
    </div>
  );
};
