import { Component } from "solid-js";
import { twMerge } from "tailwind-merge";

export const Spacer: Component<{ class?: string; vertical?: boolean }> = (props) => {
  return (
    <div
      class={twMerge(
        "flex-shrink-0 bg-gray-700",
        props.vertical ? "inline-block min-h-full w-[2px]" : "h-[2px] w-full",
        props.class,
      )}
    />
  );
};
