import React from 'react'
import Slider from './homePage/Slider.jsx'
import Patners from './homePage/Patners.jsx'
import Skills from './homePage/Skills.jsx'
import ExpertsSection from './homePage/ExpertsSection.jsx'
import Testimonials from './homePage/Testimonials.jsx'
import Banner from "./homePage/Banner.jsx"
import SimpleFAQAccordion from './homePage/FAQ.jsx'
import Nav from './Common/Nav.jsx'
import StatsSection from './homePage/StatsSection.jsx'

function HomePage() {
  return (
    <div className='w-[100vw] md:w-full overflow-hidden'>
      <Nav color={"[#000000]"} />
      <Slider />
      <Patners />
      <Skills skill={"Top Skills"} />
      <div className="mt-12">
        <StatsSection />
      </div>
      <ExpertsSection value={"Our Experts"} />
      <Testimonials />
      <Banner />
      <SimpleFAQAccordion />
    </div>
  )
}

export default HomePage