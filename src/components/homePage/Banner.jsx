import React from "react";
import { FaArrowRight } from "react-icons/fa";

function Banner() {
  return (
    <div>
      <div className="relative z-10 lg:h-[10vh] xl:h-[40vh] flex justify-center items-center">
        <img
          className="w-[100vw] h-[100px] xl:h-[30vh] xl:w-[70vw] rounded-xl	"
          src="./images/banner.png"
          alt=""
        />
      </div>
      <div className="relative flex flex-col md:flex-row px-4 md:px-0 lg:justify-between gap-6 lg:gap-12   xl:justify-evenly  items-center bg-[#c9ffcc86] pt-10 lg:pt-64 pb-10 lg:-top-28 xl:-top-48">
        <div>
          <img src="./images/Python.png" alt="" />
        </div>
        <div className=" flex flex-col  gap-2">
          <h4 className="lg:text-lg uppercase font-semibold">
            Get Proof for your newly learnt skills
          </h4>
          <h1 className="text-xl lg:text-3xl w-[100%] lg:w-[60%]">
            Get Job ready with Arambh Skills Certificate
          </h1>
          <img
            className="w-[60%] contrast-150	"
            src="./images/skill-nsdc-logo2 1.png"
            alt=""
          />
          <button className="w-[50%] lg:w-[30%] rounded-xl flex gap-2 justify-center items-center text-white py-2  bg-[#020A47]">
            JOIN NOW <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
