import React from "react";
import { Icons } from "../../../assets/icons/IconsProvider";
import { paths } from "../../../routes/paths";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.hooks";
const { IconMenuHamburguesa } = Icons;

export const Header = ({ setViewMenuSm }) => {
  const { fetchSignOut } = useAuth();

  const { pathname } = useLocation();
  const routesText = {
    [paths.HOME]: "Usuarios",
    [paths.HEALTHYCENTER]: "Centros de salud",
    [paths.HEALTHYPLANS]: "Planes de salud",
    [paths.APPOINTMENTSPROFESSIONAL]: "Citas",
  };
  const text = routesText[pathname] || "Sección no reconocida";
  return (
    <div className="h-[80px] bg-white border-b border-[#E6EFF5] flex items-center justify-between px-4">
      <button className="sm:hidden flex" onClick={() => setViewMenuSm(true)}>
        <img className="w-7" src={IconMenuHamburguesa} alt="" />
      </button>
      <div className=" sm:flex hidden items-center justify-center px-0">
        <h1 className="font-semibold text-black-custom sm:text-xl text-lg">
          {text}
        </h1>
      </div>
      <button
        className="p-2 rounded-lg bg-red-800 text-white"
        onClick={() => fetchSignOut()}
      >
        {" "}
        Cerrar sesión
      </button>
      <div>
        <div className="sm:h-[60px] sm:w-[60px] h-[40px] w-[40px] rounded-full bg-primary"></div>
      </div>
    </div>
  );
};
