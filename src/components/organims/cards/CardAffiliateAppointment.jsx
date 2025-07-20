import { motion } from "framer-motion";
import React from "react";
import {
  formatearFechaConSlashes,
  formatearHoraA12Horas,
} from "../../../helpers/truncateDate";
import { Images } from "../../../assets/images/ImagesProvider";
import { Icons } from "../../../assets/icons/IconsProvider";
const { ImgAvatarMen, ImgAvatarWoman } = Images;
const { IconEditYellow, IconDeleteRed } = Icons;

const CardAffiliateAppointment = ({
  actionCard,
  titleCard = "Paciente",
  affiliate = true,
  dataCard,
  actionEdit,
  actionDelete,
  rol,
}) => {
  console.log(dataCard);

  return (
    <motion.div
      onClick={actionCard}
      className="w-full relative hover:shadow-md cursor-pointer transition-all duration-200 ease-in border border-gray-light-custom bg-white rounded-xl p-5"
    >
      <div className=" min-h-7 min-w-8 flex absolute top-0 right-0">
        <div className=" h-full flex-1 py-[6px] px-[12px] rounded-bl-xl border-gray-light-custom border-b border-r border-l">
          <p className="text-sm text-[#919191] font-medium">
            {formatearFechaConSlashes(dataCard?.date)}
          </p>
        </div>
        <div className=" h-full flex-1 py-[6px] px-[12px] border-gray-light-custom border-b">
          <p className="text-sm text-[#919191] font-medium">
            {formatearHoraA12Horas(dataCard?.time)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 relative xl:mt-0 mt-6">
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-contain"
            src={
              rol === "Afiliado"
                ? dataCard?.infoProfessional?.user?.gender === "Masculino"
                  ? ImgAvatarMen
                  : ImgAvatarWoman
                : dataCard?.infoAffiliate?.user?.gender === "Masculino"
                ? ImgAvatarMen
                : ImgAvatarWoman
            }
            alt=""
          />
        </div>
        <div>
          <h1 className="text-base font-semibold text-black-custom">
            {rol === "Afiliado" ? "Especialista" : "Paciente"}
          </h1>
          <p className="text-sm text-black-custom">
            {rol === "Afiliado"
              ? dataCard?.infoProfessional?.user?.name
              : dataCard?.infoAffiliate?.user?.name}
          </p>
        </div>
      </div>
      <div className="h-[0.5px] w-full my-4 bg-[#e2e2e2]"></div>

      <div className="flex">
        <div>
          <h1 className="text-base font-semibold text-black-custom">
            {rol === "Profesional" ? "Cc: " : "N° de licencia: "}
            <b className="font-normal">
              {rol === "Afiliado"
                ? dataCard?.infoProfessional?.license_number
                : dataCard?.infoAffiliate?.document_number}
            </b>
          </h1>
          <h1 className="text-base font-semibold text-black-custom">
            {affiliate ? "Correo:" : "Especialidad:"}{" "}
            <b className="font-normal">
              {rol === "Afiliado"
                ? dataCard?.infoProfessional?.user?.email
                : dataCard?.infoAffiliate?.user?.email}
            </b>
          </h1>
        </div>
      </div>
      {rol === "Admistrativo" && (
        <div className="mt-5 flex justify-end gap-5">
          {dataCard?.state === "programada" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                actionEdit(dataCard);
              }}
              className="w-9 h-9 rounded-lg bg-yellow-custom/20 hover:bg-yellow-custom/30 cursor-pointer grid place-items-center transition-all ease-in duration-150"
            >
              <img className="w-4" src={IconEditYellow} alt="" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              actionDelete(dataCard);
            }}
            className="w-9 h-9 rounded-lg bg-red-custom/20 hover:bg-red-custom/30 cursor-pointer grid place-items-center transition-all ease-in duration-150"
          >
            <img className="w-4" src={IconDeleteRed} alt="" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default CardAffiliateAppointment;
