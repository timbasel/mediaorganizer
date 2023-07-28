import { FaSolidMinus } from "solid-icons/fa";
import { For, ParentComponent } from "solid-js";
import { Block } from "./block";

export const InputArray: ParentComponent<{
  label: string;
  placeholder?: string;
  array: string[];
  onAppend: (value: string) => void;
  onRemove: (index: number) => void;
}> = (props) => {
  let inputRef: HTMLInputElement;
  return (
    <Block class="flex flex-col p-2 gap-2">
      <div class="text-gray-400 text-xs">{props.label}</div>
      <For each={props.array}>
        {(item, index) => (
          <div class="flex items-stretch">
            <div class="w-full pl-2">{item}</div>
            <div
              class="flex cursor-pointer items-center px-4 hover:text-gray-500"
              onClick={() => props.onRemove(index())}
            >
              <FaSolidMinus />
            </div>
          </div>
        )}
      </For>
      <div class="flex">
        <Block class="flex w-full items-stretch">
          <input
            ref={inputRef!}
            placeholder={props.placeholder ?? "New Value"}
            class="w-full bg-transparent p-2 outline-none placeholder:text-gray-700"
            onKeyDown={(e) => {
              console.log("test");
              if (e.key === "Enter") {
                if (inputRef.value === "") return;
                props.onAppend(inputRef.value);
                inputRef.value = "";
              }
            }}
          />
          {props.children}
        </Block>
      </div>
    </Block>
  );
};
