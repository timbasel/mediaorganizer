import { trackStore } from "@solid-primitives/deep";
import { createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";
import { SaveSettings } from "wails/go/backend/App";
import { backend } from "wails/go/models";

export const [Settings, SetSettings] = createStore<backend.Settings>({
  database: "",
  thumbnailDirectory: "",

  sources: [],
  destination: "",

  imageExtensions: [],
  videoExtensions: [],
});

// update Go settings
createEffect(
  on(
    () => trackStore(Settings),
    async () => {
      console.log("update");
      await SaveSettings(Settings);
    },
    { defer: true },
  ),
);
