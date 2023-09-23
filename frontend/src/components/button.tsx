import { ComponentProps, ParentComponent } from "solid-js";
import { twMerge } from "tailwind-merge";

export const Button: ParentComponent<ComponentProps<"button">> = (props) => {
  return (
    <button
      {...props}
      class={twMerge(
        "rounded-sm px-5 py-2 shadow-2dp transition",
        !props.disabled
          ? "bg-gray-600 hover:brightness-110 active:brightness-75"
          : "cursor-default bg-gray-700 text-gray-500",
        props.class,
      )}
    >
      {props.children}
    </button>
  );
};
