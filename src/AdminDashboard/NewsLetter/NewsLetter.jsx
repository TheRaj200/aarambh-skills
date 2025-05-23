import React from 'react'
import Nav from '../Common/Nav'
import Sidebar from '../Common/Sidebar'
import Bannertemp from '../../components/AboutPage/Bannertemp'
import ManageLetters from './ManageLetters'


const NewsLetter = () => {
  return (
    <div className='bg-gray-50'>
        <Nav/>
        <Bannertemp value={"Dashboard"} />
        <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
          <div className='lg:w-72'>
            <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"}/>
          </div>
          <div className='flex-1'>
            <ManageLetters/>
          </div>
        </div>
    </div>
  )
}
export default NewsLetter