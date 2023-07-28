import { Link, useNavigate } from "@solidjs/router";
import { FaSolidAngleLeft, FaSolidGear } from "solid-icons/fa";
import { Component, ComponentProps, ParentComponent } from "solid-js";

export const NavBar: Component = () => {
  const navigate = useNavigate();

  const NavLink: ParentComponent<ComponentProps<typeof Link>> = (props) => {
    return <Link class="px-8 py-4 hover:bg-black/20" activeClass="bg-black/40" {...props} />;
  };

  return (
    <nav class="bg-gray-900 shadow-4dp">
      <div class="mx-4 flex justify-between">
        <div class="flex items-center px-8 hover:bg-black/20" onClick={() => navigate(-1)}>
          <FaSolidAngleLeft class="h-6" />
        </div>
        <div class="flex items-center">
          <NavLink href="/media">Media</NavLink>
          <NavLink href="/people">People</NavLink>
          <NavLink href="/tags">Tags</NavLink>
        </div>
        <div class="flex items-center">
          <NavLink href="/settings">
            <FaSolidGear class="h-6" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
