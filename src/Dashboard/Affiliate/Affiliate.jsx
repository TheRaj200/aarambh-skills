import React from 'react'
import Nav from '../Nav'
import Sidebar from '../Sidebar'
import Bannertemp from '../../components/AboutPage/Bannertemp'
import Form from './Form'
  


const Affiliate = () => {
  return (
    <div className=''>
        <Nav/>
        <Bannertemp value={"Dashboard"} />
        <div className='lg:my-4 lg:flex lg:gap-4 '>
        <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold "} />
         <Form/>
        </div>
    </div>
  )
}

export default Affiliate