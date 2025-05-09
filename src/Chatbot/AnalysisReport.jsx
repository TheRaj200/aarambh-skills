export default function AnalysisReport({ selectedCourses, onReset }) {
    const courseData = [
      { id: "C1", percentage: 65 },
      { id: "C2", percentage: 20 },
      { id: "C3", percentage: 15 },
    ]
  
    return (
      <div className="p-6 space-y-6">
        <h2 className="text-lg font-semibold">AI Counsellor Report</h2>
  
        <div className="space-y-4">
          {courseData.map((course) => (
            <div key={course.id} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{course.id}</span>
                <span>{course.percentage}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#020A47] transition-all duration-500"
                  style={{ width: `${course.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
  
        <div className="pt-4">
          <p className="text-sm text-gray-600 mb-4">According to my analysis, you must go with C1 course.</p>
  
          <div className="flex gap-2">
            {["C1", "C2", "C3"].map((course) => (
              <button key={course} className="px-4 py-2 border-2 border-gray-300 rounded-md hover:border-blue-600">
                {course}
              </button>
            ))}
          </div>
        </div>
  
        <button onClick={onReset} className="w-full mt-4 px-4 py-2 bg-[#020A47] text-white rounded-md">
          Start New Analysis
        </button>
      </div>
    )
  }
  
  