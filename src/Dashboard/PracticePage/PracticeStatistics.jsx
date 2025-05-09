"use client"

import { useState, useEffect } from "react"
import { FaFileAlt, FaChartLine, FaTrophy, FaStar, FaChevronDown } from "react-icons/fa"

const PracticeStatistics = () => {
  const [statistics, setStatistics] = useState({
    started: 0,
    inProgress: 0,
    completed: 0,
    languages: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    // Fetch data from backend
    const fetchStatistics = async () => {
      try {
        setLoading(true)
        // Replace with  actual API 
        const response = await fetch("/api/practice-statistics")

        if (!response.ok) {
          throw new Error("Failed to fetch statistics")
        }

        const data = await response.json()
        setStatistics(data)
      } catch (err) {
        setError(err.message)
        console.error("Error fetching statistics:", err)
      } finally {
        setLoading(false)
      }
    }

    // For demo purposes, using mock data
    // Remove this and uncomment fetchStatistics() when connecting to real backend
    setTimeout(() => {
      setStatistics({
        started: 5,
        inProgress: 3,
        completed: 2,
        languages: [
          { name: "React", progress: 0, pointsToUnlock: 120, stars: 4, score: 0 },
          { name: "Python", progress: 43, pointsToUnlock: 120, stars: 4, score: 1430 },
          { name: "Java", progress: 92, pointsToNextStar: 2, stars: 3, score: 4583 },
          { name: "JavaScript", progress: 75, pointsToNextStar: 5, stars: 2, score: 3200 },
          { name: "C++", progress: 60, pointsToUnlock: 150, stars: 3, score: 2800 }
        ],
      })
      setLoading(false)
    }, 1000)

    // fetchStatistics();
  }, [])

  const renderStars = (count) => {
    return Array(count)
      .fill()
      .map((_, index) => <FaStar key={index} className="text-yellow-400" />)
  }

  const getVisibleLanguages = () => {
    const visibleCount = showAll ? statistics.languages.length : 3;
    return statistics.languages.slice(0, visibleCount);
  }

  if (loading) {
    return (
      <div className="lg:w-[70%] w-full mx-auto p-4">
        {/* Title Skeleton */}
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>

        {/* Statistics Overview Card Skeleton */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex flex-wrap w-full flex-col md:flex-row items-center justify-between">
            {/* Started Skeleton */}
            <div className="flex md:flex-col gap- ml-4 md:ml-0 md:gap-2 items-center md:w-1/3">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mb-2"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* In-Progress Skeleton */}
            <div className="flex md:flex-col gap-4 md:gap-2 items-center md:w-1/3">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mb-2"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Completed Skeleton */}
            <div className="flex md:flex-col gap-4 md:gap-2 items-center md:w-1/3">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mb-2"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Language Progress Cards Skeleton */}
        {[1, 2, 3].map((index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="mb-2">
              {/* Language Title Skeleton */}
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>

              {/* Progress Bar Skeleton */}
              <div className="w-[80%] bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-gray-300 h-2 rounded-full w-3/4"></div>
              </div>

              {/* Progress Details Skeleton */}
              <div className="flex justify-between items-center mt-2">
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((star) => (
                    <div key={star} className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Score Skeleton */}
            <div className="flex justify-end">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>
  }

  return (
    <div className=" lg:w-[70%] w-full mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4  text-[#020A47] ">Practice Statistics</h2>

      {/* Statistics Overview Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex flex-wrap w-full flex-col md:flex-row items-center justify-between">
          <div className="flex md:flex-col  gap-4 ml-4 md:ml-0 md:gap-0 items-center md:w-1/3">
            <div className="w-12 h-12 flex items-center justify-center  mb-2">
              <img src="/images/image1.png" alt="started" className="w-8 h-8  lg:scale-150 scale-125"  />
            </div>
            <div className="text-3xl font-bold text-[#020A47]">{statistics.started}</div>
            <div className="text-sm text-center px-5 text-[#020A47]  font-semibold"> Started </div>
          </div>

          <div className="flex md:flex-col gap-4 md:gap-0 items-center md:w-1/3">
            <div className="w-12 h-12 flex items-center justify-center  mb-2">
            <img src="/images/image2.png" alt="started" className="w-8 h-8 lg:scale-150 scale-125"  />

            </div>
            <div className="text-3xl font-bold text-[#020A47]">{statistics.inProgress}</div>
            <div className="text-sm text-center text-[#020A47]  font-semibold font-s">In-Progress</div>
          </div>

          <div className="flex md:flex-col gap-4 md:gap-0 items-center md:w-1/3">
            <div className="w-12 h-12 flex items-center justify-center  mb-2">
            <img src="/images/image3.png" alt="started" className="w-8 h-8 lg:scale-150 scale-125"  />

            </div>
            <div className="text-3xl font-bold text-[#020A47]">{statistics.completed}</div>
            <div className="text-sm text-center text-[#020A47]  font-semibold font-s">Completed</div>
          </div>
        </div>
      </div>

      {/* Language Progress Cards */}
      {getVisibleLanguages().map((language, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="mb-2">
            <h3 className="text-xl font-bold text-[#020A47]">{language.name}</h3>

            <div className="w-[80%] bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-[#020A47] h-2 rounded-full" style={{ width: `${language.progress}%` }}></div>
            </div>

            <div className="flex justify-between items-center mt-2">
              <div>
                {language.progress}%
                {language.pointsToUnlock
                  ? ` Get to ${language.pointsToUnlock} points to unlock this badge`
                  : language.pointsToNextStar
                    ? ` (${language.pointsToNextStar} points to next star)`
                    : ""}
              </div>

              {language.stars && <div className="flex">{renderStars(language.stars)}</div>}
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-[#020A47] text-white lg:text-md text-sm px-3 py-1 rounded">Score: {language.score}</div>
          </div>
        </div>
      ))}

      {/* Show More Button */}
      {statistics.languages.length > 3 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-[#020A47] hover:bg-[#151d5e] text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-all duration-300"
          >
            {showAll ? "Show Less" : "Show More"}
            <FaChevronDown className={`transform transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </div>
  )
}

export default PracticeStatistics

