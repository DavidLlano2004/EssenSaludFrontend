import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Esto no es obligatorio, pero lo dejamos por si tienes estilos

import "./CarouselAppoCenter.css";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import { Icons } from "../../../../assets/icons/IconsProvider";
import { truncateText } from "../../../../helpers/truncateText";
import { motion } from "framer-motion";
const { IconDefaultUser } = Icons;

export const CarouselAppoCenter = ({ rol, upcomingAppointments , actionCardCarousel }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 3000, // 3 segundos entre slides
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div className=" w-full h-full bg-primary flex items-center justify-center rounded-xl">
            <h1 className="text-white-custom underline font-semibold xl:text-lg">
              {rol === "Afiliado" ? "Próximas citas" : "Próximos pacientes"}
            </h1>
          </div>
        </SwiperSlide>

        {upcomingAppointments?.map((appointment) => (
          <SwiperSlide key={appointment?.id}>
            <motion.div
              onClick={() => actionCardCarousel(appointment)}
              className="  w-full min-h-full flex flex-row p-3 border bg-white border-gray-light-custom hover:bg-[#fafafa] transition-all ease-in duration-200 rounded-xl cursor-pointer"
            >
              <div className=" flex-1  px-2">
                <div>
                  <h1 className="text-sm font-semibold">
                    {rol === "Profesional" ? "Paciente" : "Especialista"}
                  </h1>
                  <h1 className="text-sm font-normal">
                    {rol === "Afiliado"
                      ? appointment?.infoProfessional?.user?.name
                      : appointment?.infoAffiliate?.user?.name}
                  </h1>
                </div>
                <div>
                  <p className="text-sm mt-1">
                    <b>{rol === "Profesional" ? "Cc: " : "N°: "}</b>
                    {truncateText(
                      rol === "Afiliado"
                        ? String(appointment?.infoProfessional?.license_number)
                        : String(appointment?.infoAffiliate?.document_number),
                      10
                    )}
                  </p>
                </div>
              </div>
              <div className="border-l-2 border-gray-light-custom flex flex-col items-center justify-center px-3">
                <div className="rounded-full overflow-hidden h-10 w-10">
                  <img
                    className="w-full h-full object-contain"
                    src={IconDefaultUser}
                    alt=""
                  />
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
