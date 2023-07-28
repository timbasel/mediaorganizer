import { RouteDefinition, useRoutes } from "@solidjs/router";
import { Component } from "solid-js";

const Routes: RouteDefinition[] = [
  { path: "/", component: () => <div class="text-2xl">MediaOrganizer</div> },
];

export const App: Component = () => {
  const Route = useRoutes(Routes);

  return (
    <div class="h-screen w-screen bg-gray-800 text-gray-50">
      <main class="mx-auto max-w-screen-xl p-4">
        <Route />
      </main>
    </div>
  );
};
