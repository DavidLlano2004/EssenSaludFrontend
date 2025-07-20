import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "../../../../assets/icons/IconsProvider";
import { ButtonTypeA } from "../../../molecules/buttons/ButtonTypeA";
import { Images } from "../../../../assets/images/ImagesProvider";
import {
  formatearFechaConSlashes,
  formatearHoraA12Horas,
} from "../../../../helpers/truncateDate";

const { IconClose } = Icons;
const { ImgAvatarMen, ImgAvatarWoman } = Images;

export const ViewInfoAffliate = ({
  isopenModal,
  setViewMenuSm,
  actionCancel,
  actionComplete,
  dataAppointment,
  rol,
  medicalRecordEnd,
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
            onClick={setViewMenuSm}
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
                onClick={setViewMenuSm}
                className="bg-white border active:opacity-70 border-gray-light-custom h-7 w-7 right-2 top-2 rounded-full absolute sm:hidden grid place-items-center"
              >
                <img className="w-2" src={IconClose} alt="" />
              </button>
              <div className=" flex-1 p-8 overflow-y-auto">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-contain"
                      src={
                        rol === "Afiliado"
                          ? dataAppointment?.infoProfessional?.user?.gender ===
                            "Masculino"
                            ? ImgAvatarMen
                            : ImgAvatarWoman
                          : dataAppointment?.infoAffiliate?.user?.gender ===
                            "Masculino"
                          ? ImgAvatarMen
                          : ImgAvatarWoman
                      }
                      alt="IconDefaultUser"
                    />
                  </div>
                  <div>
                    <h1 className="text-base font-semibold text-black-custom">
                      {rol === "Afiliado" ? "Especialista" : "Paciente"}
                    </h1>
                    <p className="text-sm text-black-custom">
                      {rol === "Afiliado"
                        ? dataAppointment?.infoProfessional?.user?.name
                        : dataAppointment?.infoAffiliate?.user?.name}
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
                        Sede:{" "}
                        <b className="font-light">
                          {dataAppointment?.infoHealthyCenter?.name}
                        </b>
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="mt-8 grid-cols-2 grid gap-4">
                  <div>
                    <h1 className="font-semibold">Fecha</h1>
                    <p className="font-light">
                      {formatearFechaConSlashes(dataAppointment?.date)}
                    </p>
                  </div>
                  <div>
                    <h1 className="font-semibold">Hora</h1>
                    <p className="font-light">
                      {formatearHoraA12Horas(dataAppointment?.time)}
                    </p>
                  </div>
                </div>

                {(rol === "Afiliado" || rol === "Administrativo") && (
                  <>
                    <div className="border-b-2 border-t-2 py-4 mt-8 border-gray-light-custom">
                      <h1 className="text-lg text-black-custom font-semibold ">
                        Información del especialista
                      </h1>
                    </div>
                    <div className="mt-8 grid-cols-2 grid gap-4">
                      <div className="col-span-2">
                        <h1 className="font-semibold">Nombre</h1>
                        <p className="font-light">
                          {dataAppointment?.infoProfessional?.user?.name}
                        </p>
                      </div>

                      <div>
                        <h1 className="font-semibold">N° de licencia</h1>
                        <p className="font-light">
                          {dataAppointment?.infoProfessional?.license_number}
                        </p>
                      </div>
                      <div>
                        <h1 className="font-semibold">Especialidad</h1>
                        <p className="font-light">
                          {dataAppointment?.infoProfessional?.specialty}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {(rol === "Profesional" || rol === "Administrativo") && (
                  <>
                    <div className="border-b-2 border-t-2 py-4 mt-8 border-gray-light-custom">
                      <h1 className="text-lg text-black-custom font-semibold ">
                        Información del paciente
                      </h1>
                    </div>
                    <div className="mt-8 grid-cols-2 grid gap-4">
                      <div className="col-span-2">
                        <h1 className="font-semibold">Correo</h1>
                        <p className="font-light">
                          {dataAppointment?.infoAffiliate?.user?.email}
                        </p>
                      </div>
                      <div>
                        <h1 className="font-semibold">Cc</h1>
                        <p className="font-light">
                          {dataAppointment?.infoAffiliate?.document_number}
                        </p>
                      </div>
                      <div>
                        <h1 className="font-semibold">F. Nacimiento</h1>
                        <p className="font-light">
                          {formatearFechaConSlashes(
                            dataAppointment?.infoAffiliate?.user?.birthday
                          )}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <h1 className="font-semibold">Dirección</h1>
                        <p className="font-light">
                          {dataAppointment?.infoAffiliate?.address}
                        </p>
                      </div>
                      <div className="">
                        <h1 className="font-semibold">Teléfono</h1>
                        <p className="font-light">
                          {dataAppointment?.infoAffiliate?.phone}
                        </p>
                      </div>
                      <div className="">
                        <h1 className="font-semibold">Plan de salud</h1>
                        <p className="font-light">
                          {dataAppointment?.infoAffiliate?.healthyPlan?.name}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <div className="border-b-2 border-t-2 py-4 mt-8 border-gray-light-custom">
                  <h1 className="text-lg text-black-custom font-semibold ">
                    Historia clínica
                  </h1>
                </div>

                <div className="mt-8 grid-cols-2 grid gap-4">
                  <div className="col-span-2">
                    <h1 className="font-semibold">Síntomas</h1>
                    <p className="font-light">
                      {medicalRecordEnd?.symptoms || "Sin información"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <h1 className="font-semibold">Tratamiento</h1>
                    <p className="font-light">
                      {medicalRecordEnd?.treatment || "Sin información"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <h1 className="font-semibold">Diagnóstico</h1>
                    <p className="font-light">
                      {medicalRecordEnd?.diagnostic || "Sin información"}
                    </p>
                  </div>
                </div>
              </div>
              <div className=" border-t border-gray-light-custom flex sm:flex-row flex-col px-2 py-4 gap-5">
                {dataAppointment?.state === "realizada" &&
                rol != "Administrativo" ? null : (
                  <ButtonTypeA
                    action={actionCancel}
                    text={
                      dataAppointment?.state === "cancelada" ||
                      dataAppointment?.state === "realizada"
                        ? "Reprogramar"
                        : "Cancelar"
                    }
                    bgColor={
                      dataAppointment?.state === "cancelada" ||
                      dataAppointment?.state === "realizada"
                        ? "bg-primary"
                        : "bg-red-custom"
                    }
                    txColor="text-white"
                    bdWidth="0px"
                    bgHvColor={
                      dataAppointment?.state === "cancelada" ||
                      dataAppointment?.state === "realizada"
                        ? "hover:bg-primary-hover"
                        : "hover:bg-red-custom-hover"
                    }
                    width="w-full"
                    alternativeStyle="flex items-center justify-center gap-2 xl:text-base text-[14px] cursor-pointer"
                    paddingButton="0 20px"
                    heigthButton={"h-[45px]"}
                    imgStyles={"w-[18px]"}
                  />
                )}
                {(rol === "Profesional" || rol === "Administrativo") &&
                  dataAppointment?.state === "programada" && (
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
                  )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
