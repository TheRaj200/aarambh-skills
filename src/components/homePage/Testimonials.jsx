import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Import Autoplay module
import "swiper/css";
import "swiper/css/pagination";
import { FaCirclePlay } from "react-icons/fa6";


const testimonialsData = [
  {
    name: "Priya Gupta",
    rating: "★★★★☆",
    feedback:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    image: "./images/expert1.jpg",
  },
  {
    name: "Nitesh Singh",
    rating: "★★★★★",
    feedback:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "./images/expert2.jpg",
  },
  {
    name: "Rohit Sharma",
    rating: "★★★★★",
    feedback:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    image: "./images/expert2.jpg",
  },
  {
    name: "Anjali Verma",
    rating: "★★★★★",
    feedback:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.",
    image: "./images/expert1.jpg",
  },
];

function Testimonials() {
  const [isPlaying, setIsPlaying] = useState(false); 
  const videoRef = useRef(null); 

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      videoRef.current.controls = false;
    } else {
      videoRef.current.play();
      videoRef.current.controls = true;
    }
    setIsPlaying(!isPlaying); 
  };

  return (
    <div>
      <h1 className="flex justify-center items-center text-[#020A47] mt-8 text-2xl md:text-4xl font-bold">
        Student Testimonials
      </h1>
      <div className="relative md:h-[600px] w-full">

        {/* Background Layer */}
        <div className="absolute top-0 left-0 w-full h-full z-10"></div>

        {/* Content Layer */}
        <div className="relative h-full w-full z-20 flex flex-col lg:flex-row justify-evenly items-center">

          {/* Video Section */}
          <div className="mb-4 cursor-pointer mt-8 xl:h-[75%] lg:h-[45%] lg:w-[45%] xl:w-[40%] p-1 bg-white rounded-lg overflow-hidden relative">
            <video
              ref={videoRef} 
              src="./videos/2278095-hd_1920_1080_30fps.mp4"
              muted={!isPlaying} 
              controls={false} 
              className="h-full w-full rounded-lg object-cover"
              poster="./images/WebDevelopment1.png"
            ></video>

            {/* Play Button */}
            {!isPlaying && (
              <button
                onClick={togglePlayPause}
                className="absolute  cursor-pointer p-1 xl:h-[14%] top-[37%] md:top-[40%] left-[37%] md:left-[45%] z-30 invert  rounded-full flex justify-center  items-center text-black text-6xl"
              >
                <FaCirclePlay className="ml-2 bg-white rounded-full 2xl:text-6xl text-5xl" />
              </button>
            )}

        
            {isPlaying && (
              <div
                onClick={togglePlayPause}
                className="absolute inset-0 bg-opacity-30 cursor-pointer"
              ></div>
            )}
          </div>

          {/* Swiper Section */}
          <div className="text-center w-[100%] md:w-[80%] h-[100%] md:h-[80%] lg:h-[50%] xl:h-[60%] lg:w-[40%] xl:w-[40%] bg-transparent rounded-3xllg overflow-hidden">
            <Swiper
              slidesPerView={2} 
              direction="vertical" 
              loop={true} 
              autoplay={{
                delay: 3000, 
                disableOnInteraction: false, 
              }}
              pagination={{
                clickable: true,
              }}
              spaceBetween={20} 
              modules={[Pagination, Autoplay]} 
              className="h-[320px] md:h-full lg:h-[100%] overflow-hidden"
            >
              {testimonialsData.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="flex ml-6 md:ml-0 bg-white justify-between items-center w-[86%] h-[90%] rounded-lg text-[#000000] border-2 border-[#BEBEBE] p-4">
                    <div className="w-[25%] flex justify-center items-center">
                      <img
                        className="rounded-full w-[65%]"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                    </div>
                    <div className="w-[80%] md:w-[70%] flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <h1>{testimonial.name}</h1>
                        <span className="text-[#F0B71A] text-xl">
                          {testimonial.rating}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xs w-[100%] text-left flex justify-center items-center">
                          {testimonial.feedback}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

      
        <div
          className="absolute top-0 -left-16 lg:w-[80%] lg:h-[80%] xl:w-full xl:h-full bg-[#020A47] z-15"
          style={{
            clipPath: "polygon(0 0, 100% 100%, 0 100%)",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Testimonials;
