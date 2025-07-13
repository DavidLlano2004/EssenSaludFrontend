import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "../../../../assets/icons/IconsProvider";
import { ButtonTypeA } from "../../../molecules/buttons/ButtonTypeA";
const { IconDefaultUser, IconClose } = Icons;

export const ViewInfoAffliate = ({
  isopenModal,
  setViewMenuSm,
  actionCancel,
  actionComplete,
}) => {
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
            className="w-full fixed inset-0 bg-[#202020]/30 backdrop-blur-[1px] h-[100dvh] z-10 flex flex-row justify-end"
          >
            <motion.div
              initial="enter"
              animate="center"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              variants={variants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white-custom xl:w-[25%] lg:w-[35%] md:w-[45%] w-[100%] flex z-50 flex-col"
            >
              <button
                onClick={() => setViewMenuSm(false)}
                className="bg-white border active:opacity-70 border-gray-light-custom h-7 w-7 right-2 top-2 rounded-full absolute sm:hidden grid place-items-center"
              >
                <img className="w-2" src={IconClose} alt="" />
              </button>
              <div className=" flex-1 p-8 overflow-y-auto">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-contain"
                      src={IconDefaultUser}
                      alt="IconDefaultUser"
                    />
                  </div>
                  <div>
                    <h1 className="text-base font-semibold text-black-custom">
                      Nombre
                    </h1>
                    <p className="text-sm text-black-custom">
                      Julian David Rodrigue...
                    </p>
                  </div>
                </div>
                <div className="border-b-2 border-t-2 py-4 mt-8 border-gray-light-custom">
                  <h1 className="text-lg text-black-custom font-semibold ">
                    Información de la cita
                  </h1>
                </div>
                <h1 className="mt-8 font-semibold">Sede</h1>
                <div className="rounded-xl overflow-hidden h-[120px] relative">
                  <img
                    className="h-full w-full object-cover"
                    src="https://c1.wallpaperflare.com/preview/314/641/78/alabama-building-photos-marine-hospital.jpg"
                    alt=""
                  />
                  <div className="bg-linear-to-b from-transparent to-black w-full h-full absolute z-10 top-0 flex flex-col justify-end items-center">
                    <div className="w-full h-auto py-2 px-4">
                      <h1 className="text-white-custom">
                        Sede: <b className="font-light">Santillana</b>
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="mt-8 grid-cols-2 grid gap-4">
                  <div>
                    <h1 className="font-semibold">Fecha</h1>
                    <p className="font-light">17/01/2025</p>
                  </div>
                  <div>
                    <h1 className="font-semibold">Hora</h1>
                    <p className="font-light">02:30 pm</p>
                  </div>
                  <div className="col-span-2">
                    <h1 className="font-semibold">Correo</h1>
                    <p className="font-light">juli.matias.2004@gmail.com</p>
                  </div>
                  <div>
                    <h1 className="font-semibold">Cc</h1>
                    <p className="font-light">1107974183</p>
                  </div>
                  <div>
                    <h1 className="font-semibold">F. Nacimiento</h1>
                    <p className="font-light">17/01/2004</p>
                  </div>
                  <div className="col-span-2">
                    <h1 className="font-semibold">Dirección</h1>
                    <p className="font-light">Carrera 8c # 57e - 36</p>
                  </div>
                  <div className="">
                    <h1 className="font-semibold">Teléfono</h1>
                    <p className="font-light">3122480775</p>
                  </div>
                  <div className="">
                    <h1 className="font-semibold">Plan de salud</h1>
                    <p className="font-light">Básico</p>
                  </div>
                </div>
                <div className="border-b-2 border-t-2 py-4 mt-8 border-gray-light-custom">
                  <h1 className="text-lg text-black-custom font-semibold ">
                    Historia clínica
                  </h1>
                </div>
                <div className="mt-8 grid-cols-2 grid gap-4">
                  <div className="col-span-2">
                    <h1 className="font-semibold">Síntomas</h1>
                    <p className="font-light">Sin información</p>
                  </div>
                  <div className="col-span-2">
                    <h1 className="font-semibold">Tratamiento</h1>
                    <p className="font-light">Sin información</p>
                  </div>
                  <div className="col-span-2">
                    <h1 className="font-semibold">Diagnóstico</h1>
                    <p className="font-light">Sin información</p>
                  </div>
                </div>
              </div>
              <div className=" border-t border-gray-light-custom flex px-2 py-4 gap-5">
                <ButtonTypeA
                  action={actionCancel}
                  text="Cancelar"
                  bgColor="bg-red-custom"
                  txColor="text-white"
                  bdWidth="0px"
                  bgHvColor="hover:bg-red-custom-hover"
                  width="w-full"
                  alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer"
                  paddingButton="0 20px"
                  heigthButton={"h-[45px]"}
                  imgStyles={"w-[18px]"}
                />
                <ButtonTypeA
                  action={actionComplete}
                  text="Finalizar"
                  bgColor="bg-secondary"
                  txColor="text-white"
                  bdWidth="0px"
                  bgHvColor="hover:bg-secondary-hover"
                  width="w-full"
                  alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer"
                  paddingButton="0 20px"
                  heigthButton={"h-[45px]"}
                  imgStyles={"w-[18px]"}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
