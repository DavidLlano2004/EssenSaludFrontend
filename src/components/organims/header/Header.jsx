import React from "react";
import { Icons } from "../../../assets/icons/IconsProvider";
import { paths } from "../../../routes/paths";
import { useLocation } from "react-router-dom";
const { IconMenuHamburguesa } = Icons;

export const Header = ({ setViewMenuSm }) => {
  const { pathname } = useLocation();
  const routesText = {
    [paths.HOME]: "Usuarios",
    [paths.HEALTHYCENTER]: "Centros de salud",
  };
  const text = routesText[pathname] || "Sección no reconocida";
  return (
    <div className="h-[80px] bg-white border-b border-[#E6EFF5] flex items-center justify-between px-4">
      <button className="sm:hidden flex" onClick={() => setViewMenuSm(true)}>
        <img className="w-7" src={IconMenuHamburguesa} alt="" />
      </button>
      <div className=" flex items-center justify-center px-0">
        <h1 className="font-semibold text-black-custom sm:text-xl text-lg">
          {text}
        </h1>
      </div>
      <div>
        <div className="sm:h-[60px] sm:w-[60px] h-[40px] w-[40px] rounded-full bg-primary"></div>
      </div>
    </div>
  );
};
