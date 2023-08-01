import { FaSolidFolder } from "solid-icons/fa";
import { Component, createSignal, onMount } from "solid-js";
import { produce } from "solid-js/store";
import {
  GetSettings,
  GetSettingsPath,
  LoadSettings,
  OpenDirectoryDialog,
  OpenFileDialog,
} from "wails/go/backend/App";
import { Button, Input, Spacer } from "~/components";
import { InputArray } from "~/components/input-array";
import { SetSettings, Settings } from "../resource";

export const SettingsPage: Component = () => {
  const [settingsPath, setSettingsPath] = createSignal("");

  onMount(async () => {
    setSettingsPath(await GetSettingsPath());
    SetSettings(await GetSettings());
  });

  const onLoad = async () => {
    await LoadSettings(settingsPath());
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
        value={Settings.database}
        onChange={(e) => SetSettings("database", e.currentTarget.value)}
      >
        <DialogButton
          type="file"
          onClick={(file) => {
            SetSettings("database", file);
          }}
        />
      </Input>
      <Input
        class="w-full"
        label="Thumbnail Directory"
        value={Settings.thumbnailDirectory}
        onChange={(e) => SetSettings("thumbnailDirectory", e.currentTarget.value)}
      >
        <DialogButton
          type="directory"
          onClick={(file) => {
            SetSettings("thumbnailDirectory", file);
          }}
        />
      </Input>

      <InputArray
        label="Sources"
        placeholder="New Source"
        array={Settings.sources}
        onAppend={(value) => SetSettings(produce((settings) => settings.sources.push(value)))}
        onRemove={(index) => SetSettings(produce((settings) => settings.sources.splice(index, 1)))}
      >
        <DialogButton
          type="directory"
          onClick={(directory) => {
            SetSettings(produce((settings) => settings.sources.push(directory)));
          }}
        />
      </InputArray>
      <Input
        class="w-full"
        label="Destination"
        value={Settings.destination}
        onChange={(e) => SetSettings("destination", e.currentTarget.value)}
      >
        <DialogButton
          type="directory"
          onClick={(directory) => {
            SetSettings("destination", directory);
          }}
        />
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
