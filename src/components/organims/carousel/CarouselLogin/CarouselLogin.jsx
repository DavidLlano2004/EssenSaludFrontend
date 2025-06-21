import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./carouselLogin.css";

import { Pagination } from "swiper/modules";
import { Images } from "../../../../assets/images/ImagesProvider";
const { ImageCarouselLogin1, ImageCarouselLogin2, ImageCarouselLogin3 } =
  Images;

export const CarouselLogin = () => {
  return (
    <div className="h-full w-full">
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={ImageCarouselLogin1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={ImageCarouselLogin2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={ImageCarouselLogin3} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
