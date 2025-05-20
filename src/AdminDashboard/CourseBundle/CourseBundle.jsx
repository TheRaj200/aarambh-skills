import React from 'react'
import Nav from '../Common/Nav'
import Sidebar from '../Common/Sidebar'
import Bannertemp from '../../components/AboutPage/Bannertemp'
import AddBundle from './AddBundle'




const CourseBundle = () => {
  return (
    <>
        <Nav/>
        <Bannertemp value={"Dashboard"} />
        <div className='lg:my-4 lg:flex lg:gap-4 '>
        <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"}/>
       <div className='flex flex-col gap-4 w-full p-4 md:p-0 lg:p-4'>
        
    
       </div>
        </div>
    </>
  )
}
export default CourseBundle