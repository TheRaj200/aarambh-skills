import React, { useState, useEffect } from 'react'
import { LuIndianRupee } from 'react-icons/lu';

const data = [
    {
        image: "/images/creative.png",
        course:"Creative development",
        ActualAmount: "₹2000",
        EarnedAmount: "₹200",
        date: "28 February 2025 04:50",
        
    },
    {
      image: "/images/WebDevelopment1.png",
      course:"Web development",
      ActualAmount: "₹2000",
      EarnedAmount: "₹200",
      date: "28 February 2025 04:50",
    },
   
]

const AffiliateTable = () => {
  const [PurchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setPurchaseHistory(data);
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Skeleton loading component
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </td>
     
    </tr>
  );

  return (
    <div className='w-full  '>
        <h1 className='text-2xl font-bold text-[#020A47] mb-6'>Earnings History</h1>
        <div className='w-full bg-white rounded-lg shadow-md drop-shadow-xl border-[1px] border-gray-100 overflow-hidden'>
            <div className='overflow-x-auto '>
                <table className='w-full '>
                    <thead className=' h-[50px] w-full '>
                        <tr>
                            <th className='px-6 py-3  text-md font-bold text-[#615B5B]  tracking-wider'> courses</th>
                            <th className='px-6 py-3  text-md font-bold text-[#615B5B]  tracking-wider'>Actual Amount </th>
                            <th className='px-6 py-3   text-md font-bold text-[#615B5B]  tracking-wider'>Earned Amount</th>
                            <th className='px-6 py-3  text-md font-bold text-[#615B5B]  tracking-wider'> Date</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white '>
                        {loading ? (
                            // Skeleton loading rows
                            <>
                                <SkeletonRow />
                                <SkeletonRow />
                                <SkeletonRow />
                            </>
                        ) : PurchaseHistory.length === 0 ? (
                            // No PurchaseHistory message
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-500 text-lg">
                                    No Purchase History available
                                </td>
                            </tr>
                        ) : (
                            // Certificate data
                            PurchaseHistory.map((item, index) => (
                                <tr key={index}>
                                    <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-semibold'>
                                      <div className='  flex justify-start   '>
                                        <img className='h-12  w-20 rounded-md ' src={item.image} alt="" />
                                        <h1 className='w-[300px] text-wrap'> {item.course}</h1>
                                      </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-center'>{item.ActualAmount}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-center'>{item.EarnedAmount}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold text-center'>{item.date}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default AffiliateTable
