import { Link, useNavigate } from "@solidjs/router";
import {
  FaSolidAngleLeft,
  FaSolidChartColumn,
  FaSolidGear,
  FaSolidPhotoFilm,
  FaSolidTags,
} from "solid-icons/fa";
import { Component, ComponentProps, ParentComponent } from "solid-js";

const NavLink: ParentComponent<ComponentProps<typeof Link>> = (props) => {
  return <Link class="p-4 hover:bg-black/20" activeClass="bg-black/40" {...props} />;
};

export const NavBar: Component = () => {
  const navigate = useNavigate();

  return (
    <nav class="bg-gray-900 shadow-4dp">
      <div class="flex flex-col h-full justify-between">
        <div class="flex flex-col">
          <div
            class="flex items-center p-4 hover:bg-black/20 hover:cursor-pointer"
            title="Back"
            onClick={() => navigate(-1)}
          >
            <FaSolidAngleLeft />
          </div>
          <NavLink href="/media" title="Media">
            <FaSolidPhotoFilm />
          </NavLink>
          <NavLink href="/tags" title="Tags">
            <FaSolidTags />
          </NavLink>
          <NavLink href="/statistics" title="Statistics">
            <FaSolidChartColumn />
          </NavLink>
        </div>
        <div class="flex flex-col">
          <NavLink href="/settings" title="Settings">
            <FaSolidGear />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
