import React from 'react'


function Subscribe() {
  return (
    <div className=' flex h-32  gap-4 justify-around items-center py-4 px-8 mt-8 bg-gradient-to-l from-[#a3c3a481] to-[#989fd374]'>
      <h1 className=' lg:text-3xl text-[#020A47] text-sm md:text-xl text-center  md:w-[40%] font-bold'>Get 15% off 1st Premium   Course Registration</h1>
     <div className='flex flex-col md:flex-row gap-3 md:gap-8'>
     <input type="text" placeholder='Enter your email' className='py-2 w-[110%] px-2 md:px-8 rounded-lg shadow-xl' />
     <button className='flex  gap-2 w-[80%] md:w-full justify-center items-center bg-[#020A47]  font-semibold text-white py-3 px-8  text-sm md:text-xl rounded-xl'>SUBSCRIBE</button>
     </div>
    </div>
  )
}

export default Subscribe