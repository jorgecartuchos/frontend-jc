"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import { useRef, useEffect } from "react";

import { useLocation, useParamsShim as useParams } from "../router-shim";

import { Tarjeta } from ".";
import { useInicio } from "../hooks/useInicio";

export const ListadoMarca = ({ data }) => {

  const location = useLocation();
  const { id } = useParams();

  let dataId = Number(id) || null;


  const marca = data.length > 0 ? data[0]?.marca : "No hay datos disponibles";

  const { activeButton } = useInicio();

  const filterLocation = location.pathname !== '/';

  const slidesToRender = filterLocation
    ? data.filter((product) => product.id !== dataId)
    : data;

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !prevRef.current || !nextRef.current) return;
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  return (
    <>
      {activeButton !== marca && location.pathname === '/' &&
        <p className="text-[#9e7b52] absolute mt-1 uppercase tracking-wide font-semibold text-center text-xl">{marca}</p>
      }
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          loop={true}
          spaceBetween={15}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          centeredSlides={true}
          breakpoints={{
            0: {
              slidesPerView: 1.3,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0,
            },
            658: {
              slidesPerView: 2.3,
              slidesOffsetBefore: 122,
              slidesOffsetAfter: 122,
            },
            968: {
              slidesPerView: 3.3,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0,
            },
            1250: {
              slidesPerView: 4.3,
              slidesOffsetBefore: 122,
              slidesOffsetAfter: 122,
            },
            1451: {
              slidesPerView: 5.3,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0,
            },
          }}
          className="card-wrapper">

          {slidesToRender.map((product) => (
            <SwiperSlide key={product.id} className="group !h-[266px] p-1 rounded-xl bg-white flex flex-col select-none hover:cursor-pointer active:cursor-grabbing transition-transform duration-300 hover:scale-105 shadow-md shadow-[#06151d]">
              <Tarjeta product={product} />
            </SwiperSlide>
          ))}
          <div className="pointer-events-none absolute inset-y-0 z-50 left-0 w-9 bg-gradient-to-r from-[#061922] to-transparent" />

          <div className="pointer-events-none absolute inset-y-0 z-50 right-0 w-9 bg-gradient-to-l from-[#061922] to-transparent" />

          <div ref={prevRef} className="swiper-button-prev arrow-class w-14 h-14 rounded-full bg-[#997246] bg-opacity-80 hover:shadow-md backdrop-blur-sm hover:bg-opacity-95 active:bg-opacity-80 transition-all duration-300 active:scale-125" />
          <div ref={nextRef} className="swiper-button-next arrow-class w-14 h-14 rounded-full bg-[#997246] bg-opacity-80 hover:shadow-md backdrop-blur-sm hover:bg-opacity-95 active:bg-opacity-80 transition-all duration-300 active:scale-125" />

        </Swiper>
      </div>
    </>
  )
}
