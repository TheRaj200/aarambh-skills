import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

function Slider() {
  return (
    <div className="w-full  h-[150px] md:h-[250px] flex justify-center items-center">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper w-full max-w-[1200px] mx-auto"
      >
     <SwiperSlide className="flex justify-center items-center">
          <div className="w-full h-[150px] md:h-[250px] flex justify-center items-center">
            <img
              className="w-full h-[250px] object-contain rounded-lg"
              src="./images/Rectangle 40.png"
              alt="Slider Image 2"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide className="flex justify-center items-center">
          <div className="w-full h-[150px] md:h-[250px] flex justify-center items-center">
            <img
              className="w-full h-[250px] object-contain rounded-lg"
              src="./images/Rectangle 40.png"
              alt="Slider Image 2"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
