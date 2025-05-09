import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";

export default function Slider() {
  return (
    <div className=" flex flex-col md:flex-row  ">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper  w-[100vw]  md:w-[70vw]  mt-5 relative "
      >
        <SwiperSlide className=" flex ml-2  items-center  md:ml-4 relative">
          <div className="bg-transparent    rounded-md md:p-4  flex">
            <div className=" lg:p-4 flex flex-col items-start gap-3 md:gap-4 xl:gap-4">
              <h4 className="font-bold text-[12px] md:text-sm w-full  lg:text-lg">
                Accelerate your career
              </h4>
              <h4 className="lg:text-2xl w-full xl:text-4xl text-md font-bold">
                We provide GPT Services
              </h4>
              <h3 className="lg:text-sm xl:text-xl text-[7px] w-full  font-bold md:w-[60%]">
                Power ahead in your career with certificate courses & from
                world-class universities.
              </h3>
              <button
                type="button"
                className="text-white bg-gradient-to-br from-blue-500 to-purple-600 hover:bg-gradient-to-bl     font-medium rounded-lg text-[10px] lg:text-sm px-2 py-1 lg:px-5 lg:py-2.5 text-center me-2 mb-2"
              >
                Click Now
              </button>
            </div>
            <div className="w-[100%] md:w-[70%]">
              <img
                className="xl:h-[300px] h-[180px] lg:h-[280px]"
                src="/images/copuai.jpg"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" flex ml-2  items-center  md:ml-4 relative">
          <div className="bg-transparent    rounded-md md:p-4  flex">
            <div className=" lg:p-4 flex flex-col items-start gap-3 md:gap-4 xl:gap-4">
              <h4 className="font-bold text-[12px] md:text-sm w-full  lg:text-lg">
                Accelerate your career
              </h4>
              <h4 className="lg:text-2xl w-full xl:text-4xl text-md font-bold">
                We provide GPT Services
              </h4>
              <h3 className="lg:text-sm xl:text-xl text-[7px] w-full  font-bold md:w-[60%]">
                Power ahead in your career with certificate courses & from
                world-class universities.
              </h3>
              <button
                type="button"
                className="text-white bg-gradient-to-br from-blue-500 to-purple-600 hover:bg-gradient-to-bl     font-medium rounded-lg text-[10px] lg:text-sm px-2 py-1 lg:px-5 lg:py-2.5 text-center me-2 mb-2"
              >
                Click Now
              </button>
            </div>
            <div className="w-[100%] md:w-[70%]">
              <img
                className="xl:h-[300px] h-[180px] lg:h-[280px]"
                src="/images/copuai.jpg"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" flex ml-2  items-center  md:ml-4 relative">
          <div className="bg-transparent    rounded-md md:p-4  flex">
            <div className=" lg:p-4 flex flex-col items-start gap-3 md:gap-4 xl:gap-4">
              <h4 className="font-bold text-[12px] md:text-sm w-full  lg:text-lg">
                Accelerate your career
              </h4>
              <h4 className="lg:text-2xl w-full xl:text-4xl text-md font-bold">
                We provide GPT Services
              </h4>
              <h3 className="lg:text-sm xl:text-xl text-[7px] w-full  font-bold md:w-[60%]">
                Power ahead in your career with certificate courses & from
                world-class universities.
              </h3>
              <button
                type="button"
                className="text-white bg-gradient-to-br from-blue-500 to-purple-600 hover:bg-gradient-to-bl     font-medium rounded-lg text-[10px] lg:text-sm px-2 py-1 lg:px-5 lg:py-2.5 text-center me-2 mb-2"
              >
                Click Now
              </button>
            </div>
            <div className="w-[100%] md:w-[70%]">
              <img
                className="xl:h-[300px] h-[180px] lg:h-[280px]"
                src="/images/copuai.jpg"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        
      
       
      </Swiper>

      <div className="flex  justify-center items-center   w-[100%] md:w-[30%] overflow-hidden ml-4 md:ml-0 mt-9 relative">
        <img
          className="   w-[595px] md:h-[220px] lg:h-[350px] xl:h-[380px]"
          src="/images/gpt.png"
          alt="AI Learning"
        />
        <div className="absolute flex flex-col md:gap-2 lg:gap-1 justify-center items-center top-[48%] md:top-[46%] lg:top-[50%] xl:top-[50%] 2xl:top-[48%] translate-x-[1vw] lg:translate-x-[1vw] xl:translate-x-[.1vw] 2xl:-translate-x-[1vw] text-[#ffff]">
          <div className="md:text-[10px] lg:text-lg">
            <h2 className="font-light text-[#ffffffb5]">Learn AI with</h2>
            <h1 className="font-semibold">Aarambh</h1>
          </div>
          <div className="flex text-[10px] lg:text-lg justify-center items-center gap-4 border-2 px-4 py-1 rounded-full border-[#ffff]">
            <button className="text-sm xl:text-lg">Register Now</button>
            <FaArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}
