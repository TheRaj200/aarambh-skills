import { useState } from "react"
import CircularProgress from "./CircularProgress"


function CertificateSection() {
  const [progress, setProgress] = useState(10)


  return (
    <div className="flex-1 p-6  ">
      <h2 className="text-lg font-medium text-center mb-4">Certificate</h2>

      <div className="flex justify-center mb-4">
        <CircularProgress percentage={progress} size={150} />
      </div>

      {/* Certificate Section */}
      {progress === 100 ? (
        <div className="flex flex-col items-center">
          <div className="bg-green-100 rounded-xl p-4 lg:max-w-[80%] m-auto text-center mt-4">
          <h3 className="font-medium text-lg">Well done!</h3>
          <p className="mb-2">Congratulations!!!</p>
          <p className="text-sm">You are now eligible to download the course completion certificate.</p>
        </div>
        <button className="mt-4 bg-[#020A47]   m-auto flex justify-center items-center text-white px-12 py-2 rounded-lg">Get certificate</button>
        </div>
      ) : (
        <div className="bg-[#F3E8FF] rounded-xl p-4 lg:max-w-[80%] m-auto text-center mt-4">
          <h3 className="font-medium text-lg">Notice</h3>
          <p className="mb-2 text-wrap text-center">You have completed {progress}% Of the course
          You can download the course completion certificate after completing the course. </p>     
         
        </div>
      )}
      
    
    </div>
  )
}

export default CertificateSection

