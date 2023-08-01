import { Link, useNavigate } from "@solidjs/router";
import {
  FaSolidAngleLeft,
  FaSolidChartColumn,
  FaSolidGear,
  FaSolidPhotoFilm,
  FaSolidTags,
} from "solid-icons/fa";
import { Component, ComponentProps, ParentComponent } from "solid-js";

export const NavBar: Component = () => {
  const navigate = useNavigate();

  const NavLink: ParentComponent<ComponentProps<typeof Link>> = (props) => {
    return <Link class="px-8 py-4 hover:bg-black/20" activeClass="bg-black/40" {...props} />;
  };

  return (
    <nav class="bg-gray-900 shadow-4dp">
      <div class="mx-4 flex justify-between">
        <div
          class="flex items-center px-8 hover:bg-black/20"
          onClick={() => navigate(-1)}
          title="Back"
        >
          <FaSolidAngleLeft />
        </div>
        <div class="flex items-center">
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
        <div class="flex items-center" title="Settings">
          <NavLink href="/settings">
            <FaSolidGear />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
