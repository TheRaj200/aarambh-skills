import React from 'react';
import Nav from './Common/Nav';
import Bannertemp from './AboutPage/Bannertemp';
import { useLocation } from 'react-router-dom';
import Content from './AboutPage/Content';
import Patners from "./homePage/Patners"
import ExpertsSection from "./homePage/ExpertsSection"
import Subscribe from './AboutPage/Subscribe';

function AboutPage() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <div className=''>
      <Nav about={isAboutPage ? "#020A47" : "#0000"} />
      <Bannertemp value={"About Us"} />
      <Content/>
      <ExpertsSection value={"Our Team"}/>
      <Patners/>
      <Subscribe/>
    </div>
  );
}

export default AboutPage;
