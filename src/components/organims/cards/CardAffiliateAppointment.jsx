import { motion } from "framer-motion";
import React from "react";
import { Icons } from "../../../assets/icons/IconsProvider";
const { IconDefaultUser } = Icons;

const CardAffiliateAppointment = ({ actionCard }) => {
  return (
    <motion.div
      onClick={actionCard}
      className="w-full relative hover:shadow-md cursor-pointer transition-all duration-200 ease-in border border-gray-light-custom min-h-[180px] overflow-hidden bg-white rounded-xl p-5"
    >
      <div className=" min-h-7 min-w-8 flex absolute top-0 right-0">
        <div className=" h-full flex-1 py-[6px] px-[12px] rounded-bl-xl border-gray-light-custom border-b border-r border-l">
          <p className="text-sm text-[#919191] font-medium">17/01/2025</p>
       </div>
        <div className=" h-full flex-1 py-[6px] px-[12px] border-gray-light-custom border-b">
          <p className="text-sm text-[#919191] font-medium">02:20 pm</p>
        </div>
       
      </div>
      <div className="flex items-center gap-4 relative">
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-contain"
            src={IconDefaultUser}
            alt=""
          />
        </div>
        <div>
          <h1 className="text-base font-semibold text-black-custom">Nombre</h1>
          <p className="text-sm text-black-custom">Julian David Rodrigue...</p>
        </div>
        {/* <div className=" absolute top-0 right-0">
          <h1 className="text-xs font-medium text-black-custom">17/01/2025 - 02:00 pm</h1>
        </div> */}
      </div>
      <div className="h-[0.5px] w-full my-4 bg-[#e2e2e2]"></div>

      <div className="flex">
        <div>
          <h1 className="text-base font-semibold text-black-custom">
            Cc: <b className="font-normal">1107974183</b>
          </h1>
          <h1 className="text-base font-semibold text-black-custom">
            Correo: <b className="font-normal">juli.matias.2004@gmail.com</b>
          </h1>
        </div>
        <div></div>
      </div>
    </motion.div>
  );
};

export default CardAffiliateAppointment;
