import { useNavigate } from "@solidjs/router";
import { FaSolidImage, FaSolidVideo } from "solid-icons/fa";
import { Component, Match, Switch } from "solid-js";
import { backend } from "wails/go/models";
import { Block } from "~/components/block";

export const Thumbnail: Component<{ media: backend.Media }> = (props) => {
  const navigate = useNavigate();
  return (
    <Block
      class="relative w-full justify-center flex p-2 hover:bg-black/50"
      onClick={() => navigate(`/media/${props.media.id}`)}
    >
      <img src={props.media.thumbnailPath} class="peer h-full max-auto object-contain" />
      <div class="peer-hover:opacity-100 absolute bottom-5 left-0 opacity-0 text-left bg-black/50 py-1 px-2">
        {props.media.name}
      </div>
      <div class="absolute top-5 left-5">
        <Switch>
          <Match when={props.media.fileType === "image"}>
            <FaSolidImage />
          </Match>
          <Match when={props.media.fileType === "video"}>
            <FaSolidVideo />
          </Match>
        </Switch>
      </div>
    </Block>
  );
};
