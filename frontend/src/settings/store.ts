import { createStore } from "solid-js/store";
import { backend } from "wails/go/models";

export const [Settings, SetSettings] = createStore<backend.Settings>({
  database: "",
  thumbnailDirectory: "",
  sources: [],
  destination: "",
  imageExtensions: [],
  videoExtensions: [],
});
