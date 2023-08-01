import { Router, hashIntegration } from "@solidjs/router";
import { render } from "solid-js/web";

import { App } from "~/app";
import "~/style.css";

render(
  () => (
    <Router source={hashIntegration()}>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement,
);
