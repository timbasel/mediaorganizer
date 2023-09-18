import { useParams } from "@solidjs/router";
import { FaSolidSpinner } from "solid-icons/fa";
import { Component, Suspense, createResource } from "solid-js";
import { GetMediaByID } from "wails/go/backend/App";

export const MediaViewPage: Component = () => {
  const params = useParams<{ id: string }>();
  const [media] = createResource(params.id, async (id) => {
    return await GetMediaByID(id);
  });

  return (
    <div class="flex h-full w-full flex-col gap-4">
      <Suspense fallback={<FaSolidSpinner />}>
        <img src={media()?.path} />
      </Suspense>
    </div>
  );
};
