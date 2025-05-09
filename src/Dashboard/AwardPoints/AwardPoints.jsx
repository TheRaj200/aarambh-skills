import React, { useState, useEffect } from 'react'
import Nav from '../Nav'
import Sidebar from '../Sidebar'
import Bannertemp from '../../components/AboutPage/Bannertemp'
import Content from './Content'
import Table from './PointsTable'

const AwardPointsSkeleton = () => {
  return (
    <div className="md:w-[70%] lg:w-[70%] w-full mx-auto p-4">
      {/* Overview Card Skeleton */}
      <div className="border-[1px] border-gray-100 rounded-lg shadow-md p-6 mb-4">
        <div className="flex flex-wrap gap-8 md:gap-0 w-full flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col md:ml-0 md:gap-0 items-center md:w-1/3 animate-pulse">
            <div className="h-20 md:h-32 w-20 bg-gray-300 rounded-full mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-20 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="flex flex-col md:gap-0 items-center md:w-1/3 animate-pulse">
            <div className="h-20 md:h-32 w-20 bg-gray-300 rounded-full mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-20 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="flex flex-col gap-4 md:gap-0 items-center justify-center md:w-1/3 animate-pulse">
            <div className="h-20 md:h-32 w-20 bg-gray-300 rounded-full mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-20 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </div>

      {/* Convert Point Card Skeleton */}
      <div className="border-[1px] border-gray-100 shadow-md rounded-lg flex gap-8 flex-col lg:flex-row justify-between p-8 mb-4">
        <div className="flex justify-center items-center animate-pulse">
          <div className="h-28 w-28 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 lg:w-[50%] animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center animate-pulse">
          <div className="h-10 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-40 mb-2"></div>
          <div className="h-10 bg-gray-300 rounded w-36"></div>
        </div>
      </div>
    </div>
  );
};

const AwardPoints = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=''>
      <Nav/>
      <Bannertemp value={"Dashboard"} />
      <div className='lg:my-4 lg:flex lg:gap-4'>
        <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"} />
        {loading ? (
          <AwardPointsSkeleton />
        ) : (
          <Content/>
        )}
      </div>
    </div>
  )
}

export default AwardPoints;