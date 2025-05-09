"use client"

import { useState } from "react"
import { BookOpen, Clock, HelpCircle, ChevronRight } from "lucide-react"
import { FaCirclePlay } from "react-icons/fa6";
import { RiTimeFill } from "react-icons/ri";
import { FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

export default function Content() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courses] = useState([
    {
      id: 1,
      time: '1 Hour',
      type : "Mini Project",
      title: "Web Development",
      lectures: 22,
      duration: "20:15:12 Hours",
      quizzes: 4,
      progress: 43,
      status: "in-progress",
      image: "/images/WebDevelopment1.png",
    },
    {
      id: 2,
      time: '2 Day',
      type : "Major Project",
      title: "Creative Suite Mastery",
      lectures: 15,
      duration: "15:10:22 Hours",
      quizzes: 3,
      progress: 92,
      status: "in-progress",
      image: "/images/creative.png",
    },
    {
      id: 3,
      time: '22 Hour',
      type : "Mini Project",
      title: "Python Decode",
      lectures: 20,
      duration: "30:10:13 Mins",
      quizzes: 2,
      progress: 100,
      status: "completed",
      image: "/images/pythonimg.png",
    },
    {
      id: 1,
      time: '5 Day',
      type : "Mini Project",
      title: "Web Development",
      lectures: 22,
      duration: "20:15:12 Hours",
      quizzes: 4,
      progress: 43,
      status: "in-progress",
      image: "/images/WebDevelopment1.png",
    },
    {
      id: 2,
      type : "Major Project",
      time: '1 Day',
      title: "Creative Suite Mastery",
      lectures: 15,
      duration: "15:10:22 Hours",
      quizzes: 3,
      progress: 92,
      status: "in-progress",
      image: "/images/creative.png",
    },
    {
      id: 3,
      time: '8 Day',
      title: "Python Decode",
      lectures: 20,
      duration: "30:10:13 Mins",
      quizzes: 2,
      progress: 100,
      status: "completed",
      image: "/images/pythonimg.png",
    },
  ])

  useState(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const statistics = {
    started: 3,
    inProgress: 2,
    completed: 1,
  }

  const getVisibleCourses = () => {
    const visibleCount = showAll ? courses.length : 3;
    return courses.slice(0, visibleCount);
  }

  const handleCourseClick = (courseId) => {
    navigate(`/dashboard/courses/${courseId}`);
  };

  if (loading) {
    return (
      <div className="md:w-[70%] lg:w-[70%] w-full mx-auto p-4">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex flex-wrap w-full flex-col md:flex-row items-center justify-between">
            <div className="flex md:flex-col ml-4 md:ml-0 gap-4 md:gap-2 items-center md:w-1/3">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mb-2"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="flex md:flex-col gap-4 md:gap-2 items-center md:w-1/3">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mb-2"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="flex md:flex-col gap-4 md:gap-2 items-center md:w-1/3">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mb-2"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-4 p-4">
                <div className="flex-shrink-0 w-full lg:w-[20%] h-48 lg:h-32">
                  <div className="w-full h-full bg-gray-200 rounded-md animate-pulse"></div>
                </div>

                <div className="flex-1">
                  <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>

                  <div className="flex flex-wrap gap-4 mt-2">
                    {[1, 2, 3].map((stat) => (
                      <div key={stat} className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>

                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 w-3/4 bg-gray-300 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center ml-2 lg:ml-4">
                  <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className=" md:w-[70%] lg:w-[70%] w-full mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4  text-[#020A47] ">Projects Statistics</h2>

      {/* Statistics Overview Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex flex-wrap w-full flex-col md:flex-row items-center justify-between">
          <div className="flex md:flex-col ml-4 md:ml-0 gap-4 md:gap-0 items-center md:w-1/3">
            <div className="w-12 h-12 flex items-center justify-center text-blue-700 mb-2">
              <img src="/images/image1.png" alt="started" className="w-8 h-8 lg:scale-150 scale-125" />
            </div>
            <div className="text-3xl font-bold text-[#020A47]">{statistics.started}</div>
            <div className="text-sm text-center px-5 text-[#020A47] font-semibold"> Started </div>
          </div>

          <div className="flex md:flex-col gap-4 md:gap-0 items-center md:w-1/3">
            <div className="w-12 h-12 flex items-center justify-center text-blue-700 mb-2">
              <img src="/images/image2.png" alt="started" className="w-8 h-8 lg:scale-150 scale-125" />

            </div>
            <div className="text-3xl font-bold text-[#020A47]">{statistics.inProgress}</div>
            <div className="text-sm text-center text-[#020A47]  font-semibold font-s">In-Progress</div>
          </div>

          <div className="flex md:flex-col gap-4 md:gap-0 items-center md:w-1/3">
            <div className="w-12 h-12 flex items-center justify-center text-blue-700 mb-2">
              <img src="/images/image3.png" alt="started" className="w-8 h-8 lg:scale-150 scale-125" />

            </div>
            <div className="text-3xl font-bold text-[#020A47]">{statistics.completed}</div>
            <div className="text-sm text-center text-[#020A47]  font-semibold font-s">Completed</div>
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div className="space-y-4">
        {getVisibleCourses().map((course) => (
          <div

            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"

          >
            <div className="flex flex-col lg:flex-row gap-4 p-4">
              <div className="flex-shrink-0 w-full   lg:w-[20%] h-full mr-4">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-[100%]  object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-xl text-[#383D61]">{course.title}</h3>

                <div className="mt-3">
                  <div className="flex w-full  justify-center items-center gap-4">
                  <div className="w-full  bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${course.status === "completed" ? "bg-[#020A47]" : "bg-[#020A47]"}`}
                      style={{ width: `${course.progress}%` }}
                    > </div>
                  </div>
                    <span className="text-xs font-medium">{course.progress}%</span>
                  </div>
                  
                  <div className="flex  gap-10 mt-2">
                    <span className="text-sm font-semibold text-[#000000]">Submit - <span className="text-[#35844F]">{course.time}</span></span>
                    <span className="text-sm font-semibold text-[#000000]">Project Type - <span className="text-[#35844F]">{course.type}</span></span>
  
                  </div>
                  <div className="flex lg:justify-end mt-6 lg:mt-0 w-full justify-center items-center ml-2  lg:ml-0">
                <button
                  key={course.id}
                  onClick={() => handleCourseClick(course.id)}
                  className={`px-4 py-2 rounded-md scale-125 lg:scale-100 text-xs font-medium text-white bg-[#020A47]
                    ${course.status === "completed" ? "bg-green-700" : "bg-[#020A47]"}
                  `}
                >
                  {course.status === "completed" ? "Completed" : "Complete Now"}
                </button>
              </div>
                </div>
                
              </div>

            
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {courses.length > 3 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-[#020A47] hover:bg-[#151d5e] text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-all duration-300"
          >
            {showAll ? "Show Less" : "Show More"}
            <ChevronRight className={`transform transition-transform duration-300 ${showAll ? "rotate-90" : ""}`} />
          </button>
        </div>
      )}
    </div>
  )
}

