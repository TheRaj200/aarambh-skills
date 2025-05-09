import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Correct import
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import modules
import { Autoplay, Navigation } from "swiper/modules"; // Use /modules path for newer versions

function Slider() {
  return (
    <div className="w-full h-full  ">
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
        className="mySwiper  w-[100vw] mt-5 relative"
      >
        <SwiperSlide className="xl:h-[99vh]  flex justify-center  items-center">
          <div className="relative h-[100px] md:h-[200px] xl:h-[250px]  lg:w-[100vw] xl:w-[100vw]   ">
            <h1 className="absolute flex w-full justify-center items-center text-[11px] md:text-sm top-2  md:top-4 xl:top-5 font-bold xl:text-xl">Earning / Certification Slider</h1>
            <img
              className="h-[100%] w-[99%]  object-fill object-center"
              src="./images/Rectangle 40.png"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="xl:h-[100vh]  flex justify-center  items-center">
          <div className="relative h-[100px] md:h-[200px] xl:h-[250px]  lg:w-[100vw] xl:w-[100vw]   ">
            <h1 className="absolute flex w-full justify-center items-center text-[11px] md:text-sm top-2  md:top-4 xl:top-5 font-bold xl:text-xl">Earning / Certification Slider</h1>
            <img
              className="h-[100%] w-[99%]  object-fill object-center"
              src="./images/Rectangle 40.png"
              alt=""
            />
          </div>
        </SwiperSlide>
      
    

       
      </Swiper>
    </div>
  );
}

export default Slider;
