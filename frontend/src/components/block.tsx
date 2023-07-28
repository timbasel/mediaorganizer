import { ComponentProps, ParentComponent } from "solid-js";
import { twMerge } from "tailwind-merge";

export const Block: ParentComponent<ComponentProps<"div">> = (props) => {
  return (
    <div {...props} class={twMerge("rounded-sm bg-black/20 shadow-inset-2dp", props.class)}>
      {props.children}
    </div>
  );
};
