import { Navigate, RouteDefinition, useRoutes } from "@solidjs/router";
import { Component } from "solid-js";
import { NavBar } from "~/components";
import { MediaPage, StatisticsPage } from "~/media/pages";
import { SettingsPage } from "~/settings/pages";

const Routes: RouteDefinition[] = [
  { path: "/", component: () => <Navigate href="/media" /> },
  { path: "/media", component: MediaPage },
  { path: "/statistics", component: StatisticsPage },
  { path: "/settings", component: SettingsPage },
];

export const App: Component = () => {
  const Route = useRoutes(Routes);

  return (
    <div class="flex flex-col h-screen w-screen bg-gray-800 text-gray-50">
      <NavBar />
      <main class="min-h-0 flex-grow w-full p-4">
        <Route />
      </main>
    </div>
  );
};
