import React from 'react'
import ManageStudents from './ManageStudents'
import Bannertemp from '../../components/AboutPage/Bannertemp'
import Sidebar from '../Common/Sidebar'
import Nav from '../Common/Nav'

const Students = () => {
  return (
    <>
    <Nav/>
    <Bannertemp value={"Dashboard"} />
    <div className='lg:my-4 lg:flex lg:gap-4 '>
    <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"}/>
   <div className='flex flex-col gap-4 w-full p-4 md:p-0 lg:p-4'>
    <ManageStudents/>

   </div>
    </div>
</>
  )
}

export default Students