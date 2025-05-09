import React from 'react'
import Nav from '../../Common/Nav'
import Sidebar from '../../Common/Sidebar'
import Bannertemp from '../../../components/AboutPage/Bannertemp'

import VideoContent from './VideoContent'


const AddNewVideo = () => {
  return (
    <div className=''>
        <Nav/>
        <Bannertemp value={"Dashboard"} />
        <div className='lg:my-4 lg:flex lg:gap-4 '>
        <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"}/>
       <div className='flex flex-col gap-4 w-full lg:w-[60%]  m-auto p-4 md:p-0 lg:p-4 shadow-lg hover:shadow-xl rounded-lg'>
            <VideoContent/>
       </div>
        </div>
    </div>
  )
}   

export default AddNewVideo