import { Video, Mail, Calendar, MessageCircle, DollarSign } from "lucide-react"
import { IoMdWallet } from "react-icons/io"
import { LuIndianRupee } from "react-icons/lu"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { useState } from "react"

const chartData = [
  { day: "Sun", value: 23 },
  { day: "Mon", value: 0 },
  { day: "Tue", value: 10 },
  { day: "Wed", value: 20 },
  { day: "Thu", value: 39 },
  { day: "Fri", value: 78 },
  { day: "Sat", value: 0 },
]

const notices = [
  {
    title: "New Private Course Published",
    author: "Light Moon",
    date: "13 Jul 2021",
    time: "23:58",
  },
  {
    title: "New Class Published",
    author: "Light Moon",
    date: "13 Jul 2021",
    time: "04:30",
  },
  {
    title: "New Year Sales Festival",
    author: "Staff",
    date: "12 Jul 2021",
    time: "19:26",
  },
  {
    title: "Top summer classes",
    author: "Staff",
    date: "10 Jul 2021",
    time: "08:55",
  },
]

const ContentSkeleton = () => {
  return (
    <div className="p-6 w-full">
      <div className="flex  flex-wrap w-full h-full gap-8">
        {/* Account Balance Card Skeleton */}
        <div className="bg-white p-6 rounded-xl h-[200px] w-full lg:w-[384px] border-[1px] border-gray-50 shadow-lg">
          <div className="flex flex-col justify-center items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex w-full justify-center items-center gap-2 mt-4">
              <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="mt-5 w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="flex flex-col gap-4 w-full lg:w-[300px] lg:h-[100px]">
          {[1, 2].map((item) => (
            <div key={item} className="bg-white p-4 rounded-xl border-[1px] border-gray-50 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div>
                  <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mt-1"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Noticeboard Skeleton */}
        <div className="bg-white p-6 rounded-xl w-[500px] md:w-[100%] lg:w-[50%] xl:w-[60%] lg:col-span-2 border-[1px] border-gray-50 shadow-lg">
          <div className="w-40 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div className="w-48 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-64 h-4 bg-gray-200 rounded animate-pulse mt-2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Statistics Skeleton */}
        <div className="bg-white p-6 rounded-xl border-[1px] w-[500px] md:w-[100%] lg:w-[40%] xl:w-[30%] border-gray-50 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-[300px] bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

const Content = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading for demo
  useState(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return <ContentSkeleton />
  }

  return (
    <div className="p-6 w-full ">
      <div className=" flex flex-wrap  w-full h-full gap-8">
        {/* Account Balance Card */}
        <div className="bg-white   p-6 rounded-xl h-[200px] w-full lg:w-[384px]  border-[1px] border-gray-50 shadow-lg">
          <div className="flex flex-col justify-center items-center">
            <span className="text-[#020A47] font-medium  text-6xl"><IoMdWallet /></span>
            <div className="flex w-full justify-center items-center text-[#020A47] gap-2 mt-4">
              <LuIndianRupee className="" size={24} />
              <span className="text-2xl font-bold ">297.90</span>
            </div>
            <button className="mt-5 text-[#020A47] text-2xl font-bold  ">Withdrawal </button>
           
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-col gap-4 w-full lg:w-[300px]  lg:h-[100px] ">
          <div className="bg-white p-4 rounded-xl  border-[1px] border-gray-50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-400 p-3 rounded-full">
                <Video className="text-white" size={24} />
              </div>
              <div>
                <span className="text-2xl font-bold">10</span>
                <p className="text-gray-500 text-sm">Purchased Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl  border-[1px] border-gray-50 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 p-3 rounded-full">
                <Calendar className="text-white" size={24} />
              </div>
              <div>
                <span className="text-2xl font-bold">4</span>
                <p className="text-gray-500 text-sm">Project Completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Progress Card */}
        {/* <div className="bg-white p-6 rounded-xl  border-[1px] border-gray-50 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle className="text-gray-200 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="none" />
                <circle
                  className="text-[#020A47] stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  style={{
                    strokeDasharray: "251.2",
                    strokeDashoffset: "0",
                  }}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-[#020A47] font-medium">Faithful User</p>
                <p className="text-sm text-gray-500">100%</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-500">Next Badge:</p>
              <p className="font-medium">Not defined</p>
            </div>
          </div>
        </div> */}

        {/* Noticeboard */}
        <div className="bg-white p-6 rounded-xl w-[500px] md:w-[100%] lg:w-[50%] xl:w-[60%] lg:col-span-2  border-[1px] border-gray-50 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Noticeboard</h2>
          <div className="space-y-4">
            {notices.map((notice, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-[#020A47] font-medium">{notice.title}</h3>
                  <button className="text-gray-500 hover:bg-[#020a470b] text-sm border-[1px] p-2 rounded-md border-gray-100  ">More info</button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Created by {notice.author} | {notice.date} | {notice.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Statistics */}
        <div className="bg-white p-6 rounded-xl border-[1px] w-[500px] md:w-[100%] lg:w-[40%] xl:w-[30%] border-gray-50 shadow-lg">
          <div className="flex justify-between items-center  mb-4">
            <h2 className="text-xl font-semibold">Hours spend</h2>
           
            <select name="time" id="time">
              <option value="Thisweek">This week</option>
              <option value="This Month">This Month</option>
              <option value="This Year">This Year</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <Line type="monotone" dataKey="value" stroke="#10B981" dot={{ fill: "#10B981" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content