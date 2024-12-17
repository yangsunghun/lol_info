// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ReactNode } from "react";

type SkinCarouselProps = {
  children: ReactNode;
  slidesPerView?: number;
  spaceBetween?: number;
};

const SkinCarousel = ({
  children,
  slidesPerView = 5,
  spaceBetween = 30,
}: SkinCarouselProps) => {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      pagination={{ clickable: true }}
      navigation
    >
      {children}
    </Swiper>
  );
};

export default SkinCarousel;
