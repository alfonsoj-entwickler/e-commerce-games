"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  classname?: string;
}

export const GameMobileSlideShow = ({ images, title, classname }: Props) => {
  return (
    <div className={classname}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        navigation={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={`mobile-slideshow-${image}`}>
            <Image
              width={600}
              height={500}
              src={`/products/${image}`}
              alt={title}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
