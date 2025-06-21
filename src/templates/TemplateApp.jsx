import React from "react";
import { Outlet } from "react-router-dom";

export const TemplateApp = () => {
  return (
    <article className="h-[100dvh] flex">
      <div className="bg-white lg:w-[180px] border-r border-[#E6EFF5]"></div>
      <div className="bg-white-custom flex-1 flex flex-col">
        <div className="h-[80px] bg-white border-b border-[#E6EFF5]"></div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </article>
  );
};
