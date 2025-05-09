import React from 'react'
import Nav from '../Nav'
import Sidebar from '../Sidebar'
import Bannertemp from '../../components/AboutPage/Bannertemp'
import Content from './Content'




const MyProject = () => {
  return (
    <div className=''>
        <Nav/>
        <Bannertemp value={"Dashboard"} />
        <div className='lg:my-4 lg:flex lg:gap-4 '>
        <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold "} />
        <Content/>
        </div>
    </div>
  )
}

export default MyProject