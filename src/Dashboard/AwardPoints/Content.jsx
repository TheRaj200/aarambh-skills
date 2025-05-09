import React from 'react'
import Table from './PointsTable'
import { useNavigate } from 'react-router-dom';


       const point = {
        Remained:5988,
        total:2500,
        spend:200
       }

       
       const Content = () => {
         
         const Navigate = useNavigate();
    
    return  (
        <div className=" md:w-[70%] lg:w-[70%] w-full mx-auto p-4">

        {/*  Overview Card */}
        <div className=" border-[1px] border-gray-100 rounded-lg shadow-md p-6 mb-4">
            <div className="flex flex-wrap gap-8 md:gap-0 w-full flex-col md:flex-row items-center justify-between">
                <div className="flex flex-col  md:ml-0  md:gap-0 items-center md:w-1/3">
                    <div className=" flex h-20 md:h-32 items-center justify-center text-blue-700 ">
                        <img src="/images/tropy.png" alt="started" className="w-20 h-14 lg:scale-[200%] scale-[140%]" />
                    </div>
                    <div className="text-3xl font-bold text-[#020A47]">{point.Remained}</div>
                    <div className="text-xl text-center px-5 text-[#020A47] font-semibold"> Remained Points </div>
                </div>

                <div className="flex flex-col  md:gap-0 items-center md:w-1/3">
                    <div className="h-20 md:h-32 flex items-center justify-center text-blue-700 ">
                        <img src="/images/point.png" alt="started" className="w-18 h-14 lg:scale-[150%]  scale-[100%]" />

                    </div>
                    <div className="text-3xl font-bold text-[#020A47]">{point.total}</div>
                    <div className="text-xl text-center text-[#020A47]  font-semibold font-s">Total Points</div>
                </div>

                <div className="flex flex-col  gap-4 md:gap-0 items-center justify-center md:w-1/3">
                    <div className=" h-20 md:h-32 mr-4 flex items-center justify-center text-blue-700 ">
                        <img src="/images/spendpoint.png" alt="started" className="w-18 h-14 lg:scale-[150%] scale-[130%] " />

                    </div >
                  <div className='flex flex-col lg:ml-2 justify-center items-center '>
                  <div className="text-3xl font-bold text-[#020A47]">{point.spend}</div>
                  <div className="text-xl text-center text-[#020A47]  font-semibold ">Spent Points</div>
                  </div>
                </div>
            </div>
        </div>

        {/* convert point Card */}
        <div className='border-[1px] border-gray-100 shadow-md rounded-lg flex gap-8 flex-col lg:flex-row justify-between p-8'>
          <div className='flex justify-center items-center'>
            <img className='h-28 w-28' src="/images/gift.png" alt="" />
          </div>
          <div className='flex flex-col justify-center items-center gap-4 lg:w-[50%] '>
            <h1 className='font-bold text-xl text-center'>Convert your points or get free courses</h1>
            <h4 className=' w-[90%] lg:w-[80%] text-center text-gray-500'>You can convert your earned points to  the wallet charge or get free courses by spending points. You can get</h4>
          </div>
          <div className='flex flex-col gap-2 justify-center items-center'>
            <h1 className='text-[#35844F] text-5xl font-bold'>5863</h1>
            <h1 className='font-bold text-lg text-center'>For your available points</h1>
            <button onClick={()=> Navigate('/courses')} className='bg-[#020A47] text-white text-lg font-bold px-3 py-1 rounded-lg'>Browse Courses</button>
          </div>

        </div>
        <Table/>
    </div>
    )
}



export default Content;