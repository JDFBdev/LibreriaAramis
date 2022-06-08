import React from "react";
import s from './SwiperProducts.module.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Card from '../Card/Card';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper";

export default function SwiperProducts() {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={18}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className={s.swiper}
      >
        <SwiperSlide className={s.swiperSlide}><Card/></SwiperSlide>
        <SwiperSlide className={s.swiperSlide}><Card/></SwiperSlide>
        <SwiperSlide className={s.swiperSlide}><Card/></SwiperSlide>
        <SwiperSlide className={s.swiperSlide}><Card/></SwiperSlide>
        <SwiperSlide className={s.swiperSlide}><Card/></SwiperSlide>
        <SwiperSlide className={s.swiperSlide}><Card/></SwiperSlide>
        <SwiperSlide className={s.swiperSlide}><Card/></SwiperSlide>
        <SwiperSlide className={s.swiperSlide}><Card/></SwiperSlide>
        <SwiperSlide className={s.swiperSlide}><Card/></SwiperSlide>
      </Swiper>
    </>
  );
}
