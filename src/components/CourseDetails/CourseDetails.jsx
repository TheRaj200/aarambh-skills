import React from "react";
import Bannertemp from "./Bannertemp";
import Nav from "../Common/Nav";
import Skills from "../homePage/Skills";
import Contact from "../BundlesPage/Contact";

function CourseDetails() {
  return (
  <div className="">
    <Nav/>
    <Bannertemp/>
    <Skills skill={"Related Course" }/>
    <Contact value={"Get any doubts ?"} />
  </div>
  );
}

export default CourseDetails;
