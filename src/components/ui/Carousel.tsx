"use client";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ReactNode, useState } from "react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [swiper, setSwiper] = useState<SwiperClass | null>(null); // Swiper 인스턴스 상태 관리
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => {
    swiper?.slidePrev();
  };

  const handleNext = () => {
    swiper?.slideNext();
  };

  return (
    <div className="relative">
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        onSwiper={(swiperInstance) => {
          setSwiper(swiperInstance);
          setIsBeginning(swiperInstance.isBeginning);
          setIsEnd(swiperInstance.isEnd);
        }}
        onSlideChange={(swiperInstance) => {
          setIsBeginning(swiperInstance.isBeginning);
          setIsEnd(swiperInstance.isEnd);
        }}
        pagination={{ clickable: true }}
        modules={[Navigation]}
      >
        {children}
      </Swiper>
      <button
        className="slide-arrow prev"
        onClick={handlePrev}
        disabled={isBeginning}
      >
        <ChevronLeft />
      </button>
      <button
        className="slide-arrow next"
        onClick={handleNext}
        disabled={isEnd}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default SkinCarousel;
