import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

function Bannertemp() {
  return (
    <div className=' flex flex-col gap-4 justify-center items-center px-4 md:px-0 py-4 mt-4 bg-gradient-to-l from-[#a3c3a481] to-[#989fd374]'>
      <h1 className='  text-3xl'>AI Course / Interest Councilor Descript</h1>
      <button className='flex gap-2 justify-center items-center bg-[#020A47] font-semibold text-white py-2 px-8  rounded-xl'>COUNCIL <FaArrowRight /></button>
    </div>
  )
}

export default Bannertemp