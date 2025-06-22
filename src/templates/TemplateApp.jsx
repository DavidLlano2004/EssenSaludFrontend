import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Icons } from "../assets/icons/IconsProvider";
import { Aside } from "../components/organims/aside/Aside";
import { Header } from "../components/organims/header/Header";
import { MenuSm } from "../components/organims/menuSm/MenuSm";
const { IconWeb, IconMenuHamburguesa } = Icons;

export const TemplateApp = () => {
  const [viewMenuSm, setViewMenuSm] = useState(false);
  return (
    <article className="h-[100dvh] flex">
      <Aside />
      <div className="bg-white-custom flex-1 flex flex-col overflow-hidden">
        <Header setViewMenuSm={setViewMenuSm} />
        <Outlet />
      </div>
      <MenuSm isopenModal={viewMenuSm} setViewMenuSm={setViewMenuSm} />
    </article>
  );
};
