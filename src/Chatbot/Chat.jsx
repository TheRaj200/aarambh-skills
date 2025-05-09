import { useState } from "react"
import ChatInterface from "./ChatInterface"
import AnalysisReport from "./AnalysisReport"
import Nav from "../Dashboard/Nav"
import Bannertemp from "../components/AboutPage/Bannertemp"

export default function Chat() {
  const [showReport, setShowReport] = useState(false)
  const [selectedCourses, setSelectedCourses] = useState([])
  const [selectedAI, setSelectedAI] = useState("")

  return (
    <div>
      <Nav/>
      <Bannertemp value={"AI counsellor"} />
    <div className=" py-12 w-full  relative flex items-center justify-center p-4">
       <div className="absolute -z-10 top-0 "><img className="h-48 w-48" src="./images/man.png" alt="" /></div>
      <div className="w-[50%]  mt-36 bg-[#020a473c] border-[1px] border-gray-100  rounded-lg shadow-lg overflow-hidden">

        {!showReport ? (
          <ChatInterface
            onCoursesSelected={setSelectedCourses}
            onAISelected={setSelectedAI}
            onAnalysisComplete={() => setShowReport(true)}
          />
        ) : (
          <AnalysisReport
            selectedCourses={selectedCourses}
            onReset={() => {
              setShowReport(false)
              setSelectedCourses([])
              setSelectedAI("")
            }}
          />
        )}
      </div>
    </div>
    </div>
  )
}

