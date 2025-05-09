import React, { useState, useEffect } from 'react'

const data = [
    {
        item: "Certification",
        type: "Certification",
        certificateId: "1234567890",
        date: "2021-01-01",
        link: "https://www.google.com",
    },
    {
        item: "Certification",
        type: "Certification",
        certificateId: "1234567890",
        date: "2021-01-01",
        link: "https://www.google.com",
    },
    {
        item: "Certification",
        type: "Certification",
        certificateId: "1234567890",
        date: "2021-01-01",
        link: "https://www.google.com",
    }
]

const CertificationContent = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setCertificates(data);
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
    <div className='w-full p-4'>
        <h1 className='text-2xl font-bold text-[#020A47] mb-6'>My Certification</h1>
        <div className='w-full bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-[#020A47] text-white'>
                        <tr>
                            <th className='px-6 py-3  text-xs font-medium uppercase tracking-wider'>Item</th>
                            <th className='px-6 py-3  text-xs font-medium uppercase tracking-wider'>Type</th>
                            <th className='px-6 py-3  text-xs font-medium uppercase tracking-wider'>Certificate ID</th>
                            <th className='px-6 py-3  text-xs font-medium uppercase tracking-wider'>Date</th>
                            <th className='px-6 py-3  text-xs font-medium uppercase tracking-wider'>Link</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {loading ? (
                            // Skeleton loading rows
                            <>
                                <SkeletonRow />
                                <SkeletonRow />
                                <SkeletonRow />
                            </>
                        ) : certificates.length === 0 ? (
                            // No certificates message
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-gray-500 text-lg">
                                    No certificates available
                                </td>
                            </tr>
                        ) : (
                            // Certificate data
                            certificates.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900'>{item.item}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900'>{item.type}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900'>{item.certificateId}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900'>{item.date}</td>
                                    <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-blue-600 hover:text-blue-800'>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">View Certificate</a>
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
