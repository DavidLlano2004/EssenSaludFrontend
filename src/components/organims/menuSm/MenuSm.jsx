import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "../../../assets/icons/IconsProvider";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../../routes/paths";
import { OptionsAside } from "../../molecules/optionsAside/OptionsAside";
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
  IconInvoicesGray,
  IconInvoicesBlue,
} = Icons;

export const MenuSm = ({ isopenModal, setViewMenuSm }) => {
  const { rol } = useSelector((state) => state.auth);
  const { pathname } = useLocation(); //Obtiene la ruta actual
  const navigate = useNavigate();

  const variants = {
    enter: () => ({
      x: -400, // Entra desde el lado indicado
    }),
    center: {
      x: 0, // Posición actual
    },
    exit: () => ({
      x: -400, // Sale hacia el lado indicado
    }),
  };

  const pages = [
    {
      id: 1,
      name: "Usuarios",
      iconBlue: IconUsersBlue,
      iconGray: IconUsersGray,
      path: paths.HOME,
      handleClick: () => {
        navigate(paths.HOME);
        setViewMenuSm(false);
      },
    },
    {
      id: 2,
      name: "C. de salud",
      iconGray: IconHealthyCentersGray,
      iconBlue: IconHealthyCentersBlue,
      path: paths.HEALTHYCENTER,
      handleClick: () => {
        navigate(paths.HEALTHYCENTER);
        setViewMenuSm(false);
      },
    },
    {
      id: 3,
      name: "Planes",
      iconGray: IconPriceGrayLight,
      iconBlue: IconPriceBlue,
      path: paths.HEALTHYPLANS,
      handleClick: () => {
        navigate(paths.HEALTHYPLANS);
        setViewMenuSm(false);
      },
    },
    {
      id: 4,
      name: "Citas",
      iconGray: IconDateAppointmentGrayLight,
      iconBlue: IconDateAppointmentBlue,
      path: paths.APPOINTMENTSADMIN,
      handleClick: () => {
        navigate(paths.APPOINTMENTSADMIN);
        setViewMenuSm(false);
      },
    },
    {
      id: 5,
      name: "Facturas",
      iconGray: IconInvoicesGray,
      iconBlue: IconInvoicesBlue,
      path: paths.INVOICES,
      handleClick: () => {
        navigate(paths.INVOICES);
        setViewMenuSm(false);
      },
    },
  ];

  const relatedRoutes = {
    [paths.HOME]: [paths.HOME],
    [paths.HEALTHYCENTER]: [paths.HEALTHYCENTER],
    [paths.HEALTHYPLANS]: [paths.HEALTHYPLANS],
    [paths.APPOINTMENTSADMIN]: [paths.APPOINTMENTSADMIN],
    [paths.INVOICES]: [paths.INVOICES],
  };

  const allowedRoutesByRole = {
    Administrativo: [paths.HOME, paths.HEALTHYCENTER, paths.APPOINTMENTSADMIN],
    Afiliado: [paths.HEALTHYPLANS, paths.APPOINTMENTSADMIN, paths.INVOICES],
    Profesional: [paths.APPOINTMENTSADMIN],
  };

  const allowedRoutes = allowedRoutesByRole[rol] || [];

  return (
    <AnimatePresence>
      {isopenModal && (
        <>
          <motion.div
            onClick={() => setViewMenuSm(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full fixed inset-0 bg-[#202020]/30 backdrop-blur-[1px] h-[100dvh] z-50 flex flex-row justify-start"
          >
            <motion.div
              initial="enter"
              animate="center"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              variants={variants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white-custom w-[70%] flex flex-col px-2 pb-2"
            >
              <div className="flex items-center justify-center gap-1 h-[80px] border-b border-gray-light-custom">
                <img className="w-6" src={IconWeb} alt="" />
                <h1 className=" text-lg text-primary font-semibold">
                  EssenSalud
                </h1>
              </div>
              <div className="flex-1 mt-10">
                {pages
                  .filter((page) => allowedRoutes.includes(page.path))
                  .map((page) => {
                    const isRelatedRoute = relatedRoutes[page?.path]?.some(
                      (route) => pathname.startsWith(route)
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
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
