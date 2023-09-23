import { debounce } from "@solid-primitives/scheduled";
import { RouteDefinition, useRoutes } from "@solidjs/router";
import { Component } from "solid-js";
import { OnResize } from "wails/go/backend/App";
import { NavBar } from "~/components";
import { SettingsPage } from "~/settings";

const Routes: RouteDefinition[] = [
  { path: "/", component: () => <div></div> },
  { path: "/settings", component: SettingsPage },
];

export const App: Component = () => {
  const Route = useRoutes(Routes);

  window.onresize = debounce(() => {
    console.log("resize");
    OnResize();
  }, 500);

  return (
    <div class="flex h-screen w-screen bg-gray-800 text-gray-50">
      <NavBar />
      <main class="min-w-0 flex-grow w-full p-4">
        <Route />
      </main>
    </div>
  );
};
