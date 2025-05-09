import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from 'swiper/modules';
import "swiper/css";
const Data = [

  {
    name: "Rajveer Singh",
    image: "./images/expert2.jpg",
    post: "Instructor",
  },
  {
    name: "Rashmi Mandhan",
    image: "./images/expert1.jpg",
    post: "Instructor",
  },
  {
    name: "Rajveer Singh",
    image: "./images/expert2.jpg",
    post: "Instructor",
  },
  {
    name: "Rashmi Mandhan",
    image: "./images/expert1.jpg",
    post: "Instructor",
  },
  {
    name: "Rajveer Singh",
    image: "./images/expert2.jpg",
    post: "Instructor",
  },
  {
    name: "Rashmi Mandhan",
    image: "./images/expert1.jpg",
    post: "Instructor",
  },
  {
    name: "Rajveer Singh",
    image: "./images/expert2.jpg",
    post: "Instructor",
  },
  {
    name: "Rashmi Mandhan",
    image: "./images/expert1.jpg",
    post: "Instructor",
  },


];

function ExpertsSection({ value }) {

  return (
    <div className="relative">
      <h1 className="flex justify-center items-center text-[#020A47] mt-16 text-4xl font-bold">
        {value}
      </h1>
      <div className="container py-24 mx-auto">
        <Swiper
          slidesPerView={1.2}
          spaceBetween={16}
          slidesPerGroup={4}

          autoplay={{
            delay: 300,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          speed={20000}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 24,
            },
            1440: {
              slidesPerView: 4.2,
              spaceBetween: 30,
            },
            2560: {
              slidesPerView: 4.2,
              spaceBetween: 40,
            },
          }}
          // Set Swiper instance
          className="mySwiper"
        >
          {Data.map((data, index) => (
            <SwiperSlide
              key={index}
              className="mb-10"

            >
              <div

                className="relative flex justify-center items-center rounded-lg">
                <img
                  className="rounded-3xl w-[80%] md:w-[100%] lg:h-[300px] object-cover shadow-gray-600 shadow-lg"
                  src={data.image}
                  alt={data.name}
                />
                <div className="absolute bottom-0 w-[80%] flex justify-center flex-col items-center z-20 bg-white p-1 shadow-2xl rounded-lg">
                  <h1 className="text-black font-bold">{data.name}</h1>
                  <h4 className="text-black font-light">{data.post}</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ExpertsSection;