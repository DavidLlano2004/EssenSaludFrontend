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
import { motion } from "framer-motion";

export const CarouselCenter = ({
  textCarousel = "Próximos pacientes",
  upcomingAppointments,
  actionCardCarousel
}) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000, // 3 segundos entre slides
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div className=" w-full h-full bg-primary flex items-center justify-center rounded-xl">
            <h1 className="text-white-custom underline font-semibold xl:text-lg">
              {textCarousel}
            </h1>
          </div>
        </SwiperSlide>

        {upcomingAppointments?.map((appointment) => (
          <SwiperSlide key={appointment?.id}>
            <motion.div
              onClick={() => actionCardCarousel(appointment)}
              className="w-full h-full relative rounded-xl overflow-hidden cursor-pointer "
            >
              <img
                className="h-full w-full z-0"
                src="https://c1.wallpaperflare.com/preview/314/641/78/alabama-building-photos-marine-hospital.jpg"
                alt=""
              />
              <div className="bg-linear-to-b hover:bg-black/20 transition-all ease-in duration-200 from-transparent to-black w-full h-full absolute z-10 top-0 flex flex-col justify-end items-center">
                <div className="w-full h-auto py-2 px-4">
                  <h1 className="text-white-custom">
                    <b className="font-light">
                      {appointment?.infoHealthyCenter?.name}
                    </b>
                  </h1>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
