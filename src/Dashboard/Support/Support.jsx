import React from 'react'
import Nav from '../Nav'
import Sidebar from '../Sidebar'
import Bannertemp from '../../components/AboutPage/Bannertemp'
import Form from './Form'
import Contact from '../../components/BundlesPage/Contact'
import Details from './Details'
  


const Support = () => {
  return (
    <div className=''>
        <Nav/>
        <Bannertemp value={"Dashboard"} />
        <div className='lg:my-4  lg:flex lg:gap-4 '>
      <div className='mb-2'>
      <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold  "} /> 
      </div>
        <div className='flex flex-col gap-6 w-full overflow-hidden'>
        <Form />
        <Details/>
        <Contact/>
        </div>
        </div>
    </div>
  )
}

export default Support