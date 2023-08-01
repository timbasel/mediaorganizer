import { Component } from "solid-js";

export const ImageTile: Component<{ path: string }> = (props) => {
  return (
    <div class="w-full rounded-sm flex justify-center overflow-hidden p-2">
      <img src={props.path} class="h-full max-auto object-contain" />
    </div>
  );
};
