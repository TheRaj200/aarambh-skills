import React from 'react'
import Nav from './Nav'
import Bannertemp from '../AboutPage/Bannertemp'
import Slider from './Slider'
import TopicTags from './Topics'

const Practice = () => {
  return (
    <div className='overflow-hidden'>
        <Nav/>
        <Bannertemp value={"Learn programming skills"} />
        <Slider/>
        <TopicTags/>
    </div>
  )
}

export default Practice