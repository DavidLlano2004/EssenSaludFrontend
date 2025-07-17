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
const { IconDefaultUser } = Icons;

export const CarouselAppoCenter = ({
  textCarousel = "Próximos pacientes",
  center = false,
  affiliate = true,
}) => {
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
          <div className=" w-full h-full bg-primary flex items-center justify-center rounded-xl" >
            <h1 className="text-white-custom underline font-semibold xl:text-lg">
              {textCarousel}
            </h1>
          </div>
        </SwiperSlide>

        {center ? (
          <SwiperSlide>
            <div className="w-full h-full relative rounded-xl overflow-hidden">
              <img
                className="h-full w-full z-0"
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
          </SwiperSlide>
        ) : (
          <>
          
          <SwiperSlide>
            <div className="  w-full min-h-full flex flex-row p-3 border bg-white border-gray-light-custom rounded-xl">
              <div className=" flex-1  px-2">
                <div>
                  <h1 className="text-sm font-semibold">
                    {affiliate ? "Paciente" : "Especialista"}
                  </h1>
                  <h1 className="text-sm font-normal">Julián David Rodri...</h1>
                </div>
                <div>
                  <p className="text-sm mt-1">
                    <b>{affiliate ? "Cc:"  : "N°:"}</b> 1107974...
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
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="  w-full min-h-full flex flex-row p-3 border bg-white border-gray-light-custom rounded-xl">
              <div className=" flex-1  px-2">
                <div>
                  <h1 className="text-sm font-semibold">
                    {affiliate ? "Paciente" : "Especialista"}
                  </h1>
                  <h1 className="text-sm font-normal">Julián David Rodri...</h1>
                </div>
                <div>
                  <p className="text-sm mt-1">
                    <b>{affiliate ? "Cc:"  : "N°:"}</b> 1107974...
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
            </div>
          </SwiperSlide>
          </>
        )}
      </Swiper>
    </>
  );
};
