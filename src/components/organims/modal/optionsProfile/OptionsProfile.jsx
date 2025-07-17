import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "../../../../assets/icons/IconsProvider";
import { ButtonTypeA } from "../../../molecules/buttons/ButtonTypeA";
const { IconUser } = Icons;

export const OptionsProfile = ({ isopenModal, setViewMenuSm }) => {
  const variants = {
    enter: () => ({
      x: 400, // Entra desde el lado indicado
    }),
    center: {
      x: 0, // Posición actual
    },
    exit: () => ({
      x: 400, // Sale hacia el lado indicado
    }),
  };
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
            className="w-full fixed inset-0 bg-[#202020]/30 backdrop-blur-[1px] h-[100dvh] z-50 flex flex-row justify-end"
          >
            <motion.div
              initial="enter"
              animate="center"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              variants={variants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white-custom w-[70%] flex flex-col justify-between"
            >
              <div>
                <div className="px-6 py-4 flex flex-col gap-3">
                  <div className="flex">
                    <p className=" font-normal text-xs bg-primary px-4 py-[3px] rounded-lg text-white-custom">
                      Administrador
                    </p>
                  </div>
                  <p className="text-black-custom font-semibold text-sm text-start">
                    Julian David Rodríguez
                  </p>
                  <p className="text-black-custom font-normal text-xs">
                    juli.matias.2004@gmail.com
                  </p>
                </div>
                <div className=" border-b border-t border-gray-light-custom px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img className="w-5" src={IconUser} alt="" />
                    <p className="text-black-custom text-sm font-normal">
                      Perfil
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4">
                <ButtonTypeA
                  submitBtn={false}
                  text="Cerrar sesión"
                  bgColor="bg-red-custom"
                  txColor="text-white"
                  bdWidth="0px"
                  bgHvColor="hover:bg-red-custom-hover"
                  width="w-full"
                  alternativeStyle="flex items-center justify-center gap-2 text-[14px] cursor-pointer"
                  heigthButton={"h-[38px]"}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
