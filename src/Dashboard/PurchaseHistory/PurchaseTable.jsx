import React, { useState, useEffect } from 'react'
import { LuIndianRupee } from 'react-icons/lu';

const data = [
    {
        image: "/images/creative.png",
        course:"Creative development",
        method: "Paytm",
        price: "677",
        date: "2021-01-01",
        
    },
    {
      image: "/images/WebDevelopment1.png",
      course:"Web development",
      method: "Phonepay",
      price: "799",
      date: "2021-01-01",
    },
    {
      image: "/images/pythonimg.png",
      course:"Python ",
      method: "Gpay",
      price: "886",
      date: "2021-01-01",
    }
]

const CertificationContent = () => {
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
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </td>
    </tr>
  );

  return (
    <div className='w-full lg:w-[70%] p-4'>
        <h1 className='text-2xl font-bold text-[#020A47] mb-6'>Purchase History</h1>
        <div className='w-full bg-white rounded-lg shadow-md drop-shadow-xl border-[1px] border-gray-100 overflow-hidden'>
            <div className='overflow-x-auto '>
                <table className='min-w-full divide-y  divide-black'>
                    <thead className=' h-[50px]'>
                        <tr>
                            <th className='px-6 py-3  text-md font-bold text-[#615B5B]  tracking-wider'>Purchased courses</th>
                            <th className='px-6 py-3  text-md font-bold text-[#615B5B]  tracking-wider'>Payment method</th>
                            <th className='px-6 py-3  text-md font-bold text-[#615B5B]  tracking-wider'>Price</th>
                            <th className='px-6 py-3  text-md font-bold text-[#615B5B]  tracking-wider'>Purchased date</th>
                            <th className='px-6 py-3  text-md font-bold text-[#615B5B]  tracking-wider'>Invoice</th>
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
                                <td colSpan="5" className="px-6 py-10 text-center text-gray-500 text-lg">
                                    No Purchase History available
                                </td>
                            </tr>
                        ) : (
                            // Certificate data
                            PurchaseHistory.map((item, index) => (
                                <tr key={index} >
                                    <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-semibold'>
                                      <div className='  flex gap-4 lg:translate-x-20 justify-items-start items-center'>
                                        <img className='h-12  w-20 rounded-md ' src={item.image} alt="" />
                                        <h1 className='w-[300px] text-wrap'> {item.course}</h1>
                                      </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-semibold'>{item.method}</td>
                                    <td className='px-6 py-8 whitespace-nowrap  text-center flex justify-center items-center text-sm  font-semibold'><LuIndianRupee />{item.price}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-semibold'>{item.date}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-semibold '>
                                     <button className='border-black border-[2px] rounded-lg py-1 px-3'>
                                     Invoice
                                     </button>
                                    </td>
                                   
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

export default CertificationContent
