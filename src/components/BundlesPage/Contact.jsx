import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { SiWhatsapp } from 'react-icons/si'

const Contact = ({value}) => {
  return (
    <div className="flex flex-col gap-10 pb-8 items-center">
        <h1 className="text-2xl font-bold text-[#020A47]">{value}</h1>
        <h1 className="text-2xl text-[#020A47]">Contact us at</h1>
        <div className="flex  flex-col md:flex-row items-center justify-center gap-10">
          <h1 className="flex bg-[#020A47] items-center md:text-xl text-white py-2 px-4 rounded-xl gap-2 justify-center">
            <FaPhoneAlt />
            +91-7738538548
          </h1>
          <h1 className="flex items-center bg-[#020A47] md:text-xl text-white py-2 px-4 rounded-xl gap-2 justify-center">
            <SiWhatsapp />
            +91-7738538548
          </h1>
        </div>
      </div>
  )
}

export default Contact