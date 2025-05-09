import React from "react";
import "./Scroll.css";
const partners = [
  { image: "images/Coca-Cola-logo.png" },
  { image: "/images/Microsoft_India-Logo.wine.png" },
  { image: "/images/Red_Hat_logo_PNG2.png" },
  { image: "/images/reliance.png" },
  { image: "images/Coca-Cola-logo.png" },
  { image: "/images/Microsoft_India-Logo.wine.png" },
  { image: "/images/Red_Hat_logo_PNG2.png" },
  { image: "/images/reliance.png" },
  { image: "images/Coca-Cola-logo.png" },
  { image: "/images/Microsoft_India-Logo.wine.png" },
  
  
  
];

export default function Partners() {
  return (
    <div className="overflow-hidden h-full">
      <h1 className="flex justify-center text-[#020A47] items-center py-10 text-3xl md:text-4xl font-bold">
        Our Partners
      </h1>
      <div className="overflow-hidden relative w-[2500px] h-[120px] md:h-[150px] lg:h-[200px]  mt-6">
        {/* Scrolling container */}
        <div className="flex items-center justify-center animate-scroll gap-6  hover:pause-animation">
          {partners.map((data, index) => (
            <div
              key={index}
              className="flex justify-center  shadow-2xl items-center h-[80px]  w-[200px] md:h-[100px] md:w-[250px] lg:h-[100px] lg:w-[250px]  rounded-lg bg-white"
            >
              <img
                src={data.image}
                alt="Partner Logo"
                className=" w-[100px] lg:w-[130px]  object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
