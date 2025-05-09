import React, { useState } from "react";

const faqData = [
  {
    question: "Why Aarambh Skills?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
  {
    question: "Why Aarambh Skills?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    question: "Why Aarambh Skills?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    question: "Why Aarambh Skills?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    question: "Why Aarambh Skills?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  
];

export default function SimpleFAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:pt-28  flex flex-col justify-center items-center md:-translate-y-28">
      <h1 className="flex justify-center  py-10 items-center text-[#020A47] text-xl md:text-4xl font-bold md:-translate-y-20  ">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4 pb-10 md:pb-2">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-xl drop-shadow-lg sm:text-lg w-[70vw] lg:w-[70vw] xl:w-[50vw]"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-medium text-sm md:text-lg">{faq.question}</span>
              <span className="text-2xl px-2 rounded-full bg-[#c9cef958]">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
