import React, { useEffect, useState } from 'react'
import { VscLink } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import Table from './AffiliateTable';
import toast, { Toaster } from 'react-hot-toast';


       const point = {
       
        Commission:500,
       }

       
       const AffiliateDeatils = ({ userData }) => {
  const Navigate = useNavigate();
  const [currentUserData, setCurrentUserData] = useState(userData);

  useEffect(() => {
    // Update the state whenever userData changes
    setCurrentUserData(userData);
  }, [userData]);

  console.log("Received userData in AffiliateDetails:", currentUserData);

  if (!currentUserData) {
    return <div>Loading...</div>;
  }

    // Updated copy to clipboard function with toast
    const copyToClipboard = () => {
      const affiliateUrl = `https://aarambhskills.vercel.app/joinnow?affiliate_id=${currentUserData?.affiliate_id}`;
      navigator.clipboard.writeText(affiliateUrl)
        .then(() => {
          toast.success('Affiliate link copied!', {
            duration: 2000,
            position: 'top-center',
            style: {
              background: '#020A47',
              color: '#fff',
              padding: '16px',
              borderRadius: '10px',
            },
            icon: '📋',
          });
        })
        .catch((err) => {
          console.error('Failed to copy:', err);
          toast.error('Failed to copy affiliate link', {
            duration: 2000,
            position: 'top-center',
            style: {
              background: '#FF4B4B',
              color: '#fff',
              padding: '16px',
              borderRadius: '10px',
            },
          });
        });
    };

    return (
        <div className="lg:w-[70%] w-full mx-auto p-4">

        {/* Add Toaster component */}
        <Toaster />

        {/*  Overview Card */}
        <div className=" border-[1px] border-gray-100 rounded-lg shadow-md p-6 mb-4">
            <div className="flex flex-wrap gap-8 md:gap-0 w-full flex-col md:flex-row items-center justify-between">
                <div className="flex flex-col  md:ml-0  md:gap-0 items-center md:w-1/3">
                    <div className=" flex h-20 md:h-32 items-center justify-center text-blue-700 ">
                        <img src="/images/image7.png" alt="started" className="w-18 h-14 lg:scale-[200%] scale-[140%]" />
                    </div>
                    <div className="text-3xl font-bold text-[#020A47]">{currentUserData?.reffered_user || 0}</div>
                    <div className="text-xl text-center px-5 text-[#020A47] font-semibold">Referred Users</div>
                </div>

                <div className="flex flex-col  md:gap-0 items-center md:w-1/3">
                    <div className="h-20 md:h-32 flex items-center justify-center text-blue-700 ">
                        <img src="/images/image8.png" alt="started" className="w-18 h-14 lg:scale-[150%]  scale-[100%]" />

                    </div>
                    <div className="text-3xl font-bold text-[#020A47]">{currentUserData?.affiliate_money || 0}</div>
                    <div className="text-xl text-center text-[#020A47]  font-semibold font-s">Registration Bonus</div>
                </div>

                <div className="flex flex-col  gap-4 md:gap-0 items-center justify-center md:w-1/3">
                    <div className=" h-20 md:h-32 mr-4 flex items-center justify-center text-blue-700 ">
                        <img src="/images/image9.png" alt="started" className="w-18 h-14 lg:scale-[150%] scale-[130%] " />

                    </div >
                  <div className='flex flex-col lg:ml-2 justify-center items-center '>
                  <div className="text-3xl font-bold text-[#020A47]">900</div>
                  <div className="text-xl text-center text-[#020A47]  font-semibold ">Sales Commission</div>
                  </div>
                </div>
            </div>
        </div>
                <div className='p-2'>
                    <h1 className='text-[#020A47] text-2xl font-bold mb-2'>Affiliate Summary</h1>
                    <h2 className='text-gray-500 text-lg'>- Your income from each referred user registration: ₹2000</h2>
                    <h2 className='text-gray-500 text-lg'>- The referred user income when registers with your affiliate code: ₹100</h2>
                    <h2 className='text-gray-500 text-lg'>- Your commission from referred user purchases: 5%</h2>
                    <h2 className='text-gray-500 text-lg'>- Your affiliate code: 422536</h2>
                    <h2 className='text-gray-500 text-lg'>- You can share your affiliate URL you will get the above rewards when a user uses the platform.</h2>
                    
                    <h1 className='text-[#020A47] text-2xl font-medium mt-4'>Your Affiliate URL</h1>
                    <div className='flex gap-10 p-4 flex-col items-center lg:flex-row'>
                        <div className='flex border-[1px] h-16 border-gray-100 shadow-lg rounded-r-xl'>
                            <div 
                              className='bg-[#020A47] flex justify-center items-center px-2 rounded-l-xl py-2 cursor-pointer hover:bg-[#020A47]/90 transition-colors'
                              onClick={copyToClipboard}
                            >
                              <VscLink className='text-white text-3xl'/>
                            </div>
                            <div className='flex justify-center items-center rounded-r-full px-2'>
                              {currentUserData?.affiliate_id ?? 'N/A'}
                            </div>
                        </div>
                        <div className='w-full lg:w-1/2 xl:w-1/3 border-[2px] border-black rounded-lg p-4'> 
                            <h1 className='pb-2 font-semibold'>Available balance to withdrawal</h1>
                            <div className='flex justify-between flex-col gap-2 md:flex-row w-full'>
                                <h1 className='text-3xl font-semibold '>₹{currentUserData?.affiliate_money ?? 'N/A'}</h1>
                                <button className='bg-[#020A47]  text-white px-2 py-2 rounded-lg'>Request a withdrawal</button>
                            </div>
                        </div>
                    </div>
                
                </div>
                         <div className='lg:w-full'><Table/></div>
    </div>
    )
}



export default AffiliateDeatils;