import { Component, createResource } from "solid-js";
import { GetMediaStats } from "wails/go/backend/App";

export const StatisticsPage: Component = () => {
  const [stats] = createResource(
    async () => {
      return GetMediaStats();
    },
    { initialValue: { count: 0, size: 0 } },
  );
  return (
    <div class="flex h-full w-full flex-col gap-4">
      <div class="flex">
        <div class="col-1/2">Total Size: {(stats().size / 1_000_000_000).toFixed(2)} GB </div>
        <div class="col-1/2">Total Count: {stats().count} </div>
      </div>
    </div>
  );
};
