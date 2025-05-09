function CircularProgress({ percentage, size = 100 }) {
    // Calculate the circumference of the circle
    const radius = size / 2 - 10
    const circumference = 2 * Math.PI * radius
  
    // Calculate the stroke-dashoffset based on the percentage
    const offset = circumference - (percentage / 100) * circumference
  
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          {/* Background circle */}
          <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="#e6e6e6" strokeWidth="8" />
  
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#2e7d32"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
  
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold">{percentage}%</span>
        </div>
      </div>
    )
  }
  
  export default CircularProgress
  
  