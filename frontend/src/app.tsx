import { RouteDefinition, useRoutes } from "@solidjs/router";
import { Component } from "solid-js";
import { NavBar } from "~/components";
import { SettingsPage } from "~/settings/pages/settings";

const Routes: RouteDefinition[] = [
  { path: "/", component: () => <div class="text-2xl">MediaOrganizer</div> },
  { path: "/settings", component: SettingsPage },
];

export const App: Component = () => {
  const Route = useRoutes(Routes);

  return (
    <div class="h-screen w-screen bg-gray-800 text-gray-50">
      <NavBar />
      <main class="mx-auto max-w-screen-xl p-4">
        <Route />
      </main>
    </div>
  );
};
