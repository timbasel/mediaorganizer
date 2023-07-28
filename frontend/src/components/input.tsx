import { ComponentProps, ParentComponent, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { Block } from "./block";

export const Input: ParentComponent<{ label: string } & ComponentProps<"input">> = (props) => {
  const [, htmlProps] = splitProps(props, ["label", "class", "placeholder"]);

  return (
    <Block class={twMerge("relative flex items-center", props.class)}>
      <input
        type="text"
        {...htmlProps}
        id={props.label}
        class="peer box-border block w-full rounded-sm bg-transparent p-2 pt-5 text-base outline-none"
        placeholder=" "
      />
      <label
        for={props.label}
        class="absolute left-2 top-4 z-10 origin-[0] -translate-y-3 text-xs text-gray-400  transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:-translate-y-3 peer-focus:text-xs"
      >
        {props.label}
      </label>
      {props.children}
    </Block>
  );
};
