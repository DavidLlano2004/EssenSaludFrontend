import React from "react";
import { Icons } from "../../../assets/icons/IconsProvider";
import { OptionsAside } from "../../molecules/optionsAside/OptionsAside";
import { paths } from "../../../routes/paths";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const {
  IconWeb,
  IconUsersBlue,
  IconUsersGray,
  IconHealthyCentersGray,
  IconHealthyCentersBlue,
  IconPriceGrayLight,
  IconPriceBlue,
  IconDateAppointmentGrayLight,
  IconDateAppointmentBlue,
} = Icons;

export const Aside = () => {
  const { rol } = useSelector((state) => state.auth);
  const { pathname } = useLocation(); //Obtiene la ruta actual
  const navigate = useNavigate();

  const pages = [
    {
      id: 1,
      name: "Usuarios",
      iconBlue: IconUsersBlue,
      iconGray: IconUsersGray,
      path: paths.HOME,
      handleClick: () => navigate(paths.HOME),
    },
    {
      id: 2,
      name: "C. de salud",
      iconGray: IconHealthyCentersGray,
      iconBlue: IconHealthyCentersBlue,
      path: paths.HEALTHYCENTER,
      handleClick: () => navigate(paths.HEALTHYCENTER),
    },
    {
      id: 3,
      name: "Citas",
      iconGray: IconDateAppointmentGrayLight,
      iconBlue: IconDateAppointmentBlue,
      path: paths.APPOINTMENTS,
      handleClick: () => navigate(paths.APPOINTMENTS),
    },
    {
      id: 4,
      name: "Planes",
      iconGray: IconPriceGrayLight,
      iconBlue: IconPriceBlue,
      path: paths.HEALTHYPLANS,
      handleClick: () => navigate(paths.HEALTHYPLANS),
    },
  ];

  const relatedRoutes = {
    [paths.HOME]: [paths.HOME],
    [paths.HEALTHYCENTER]: [paths.HEALTHYCENTER],
    [paths.HEALTHYPLANS]: [paths.HEALTHYPLANS],
    [paths.APPOINTMENTS]: [paths.APPOINTMENTS],
  };

  const allowedRoutesByRole = {
    Administrativo: [paths.HOME, paths.HEALTHYCENTER],
    Afiliado: [paths.APPOINTMENTS, paths.HEALTHYPLANS],
    Profesional: [paths.HEALTHYPLANS],
  };

  const allowedRoutes = allowedRoutesByRole[rol] || [];

  return (
    <div className="bg-white lg:w-[180px] border-r border-[#E6EFF5] sm:flex hidden flex-col">
      <div className="flex items-center justify-center gap-1 h-[80px] px-3">
        <img className="w-8" src={IconWeb} alt="" />
        <h1 className=" text-xl text-primary font-semibold">EssenSalud</h1>
      </div>
      <div className=" flex-1  mt-10 gap-4 flex flex-col">
        {pages
          .filter((page) => allowedRoutes.includes(page.path))
          .map((page) => {
            const isRelatedRoute = relatedRoutes[page?.path]?.some((route) =>
              pathname.startsWith(route)
            );

            return (
              <OptionsAside
                key={page?.id}
                text={page?.name}
                img={isRelatedRoute ? page?.iconBlue : page?.iconGray}
                isRelatedRoute={isRelatedRoute}
                action={page?.handleClick}
              />
            );
          })}
      </div>
    </div>
  );
};
