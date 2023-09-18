import { makeCache } from "@solid-primitives/resource";
import { createVirtualizer } from "@tanstack/solid-virtual";
import { Component, For, createEffect, createMemo, createResource, createSignal } from "solid-js";
import { GetMedia, GetMediaCount, IndexSources } from "wails/go/backend/App";
import { backend } from "wails/go/models";
import { Button } from "~/components";
import { Thumbnail } from "../components";

const ROW_SIZE = 8;

const [getMedia] = makeCache<backend.Media[][], backend.MediaFilter, unknown>(
  async (filter: { limit: number; offset: number }, { value }) => {
    const media = await GetMedia(filter);
    return [...(value ?? []), media];
  },
);

export const MediaPage: Component = () => {
  const [page, setPage] = createSignal(1);

  const [mediaCount] = createResource(
    async () => {
      return await GetMediaCount({ limit: 0, offset: 0 });
    },
    { initialValue: 0 },
  );
  const [media] = createResource<backend.Media[][], backend.MediaFilter>(
    () => ({ limit: ROW_SIZE, offset: page() * ROW_SIZE }),
    getMedia,
    { initialValue: [] },
  );

  createEffect(() => {
    console.log(media());
  });

  let ref: HTMLDivElement;

  const hasNextPage = () => page() * ROW_SIZE < mediaCount();

  const virtualizer = createMemo(() =>
    createVirtualizer({
      count: hasNextPage() ? media().length + 1 : media().length,
      getScrollElement: () => ref,
      estimateSize: () => 392, // TODO: calculate that value somehow (currenlty it is h-96+gap-2 = 384px+8px = 392px )
      overscan: 4,
    }),
  );
  createEffect(() => {
    const [lastItem] = [...virtualizer().getVirtualItems()].reverse();
    if (!lastItem) return;
    if (lastItem.index >= media().length - 1 && hasNextPage() && !media.loading) {
      setPage((prev) => prev + 1);
    }
  });
  createEffect(() => {
    console.log(media().length);
  });

  return (
    <div class="flex h-full w-full flex-col gap-4">
      <div class="flex w-full gap-2">
        <Button onClick={() => IndexSources()}>Index Sources</Button>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next Page</Button>
      </div>
      <div ref={ref!} class="w-full flex-grow overflow-scroll">
        <div class="relative w-full" style={{ height: `${virtualizer().getTotalSize()}px` }}>
          <For each={virtualizer().getVirtualItems()}>
            {(row) => (
              <div
                class="absolute left-0 top-0 h-96 min-w-full flex gap-2"
                style={{ transform: `translateY(${row.start}px)` }}
              >
                <For each={media()[row.index]}>{(media) => <Thumbnail media={media} />}</For>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
