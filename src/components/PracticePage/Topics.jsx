import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function TopicTags() {
  const navigate = useNavigate()
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('Please login to view topics')
          setLoading(false)
          return
        }

        const response = await fetch('https://arambhskills-zxut.onrender.com/prepare/get_topics/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.status === 401) {
          setError('Session expired. Please login again')
          localStorage.removeItem('token')
          navigate('/login')
          return
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch topics: ${response.status}`)
        }

        const responseData = await response.json()
      

        if (responseData.status && responseData.data) {
          setTopics(responseData.data)
        } else {
          throw new Error('Invalid data format received')
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching topics:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTopics()
  }, [navigate])

  const handleTopicClick = (topic) => {
    navigate(`/quiz/${encodeURIComponent(topic.id)}`)
  }

  if (loading) {
    return (
      <div className="mx-auto p-6 bg-white">
        <h2 className="text-2xl font-bold mb-6">Topic Wise Programming MCQs</h2>
        <div className="flex flex-wrap lg:mx-10 xl:mx-20 gap-3">
          <div className="animate-pulse flex space-x-4">
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto p-6 bg-white">
        <h2 className="text-2xl font-bold mb-6">Topic Wise Programming MCQs</h2>
        <div className="text-red-500 p-4 bg-red-50 rounded-md">
          <p className="font-medium">Error loading topics:</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Topic Wise Programming MCQs</h2>
      <div className="flex flex-wrap lg:mx-10 xl:mx-20 gap-3">
        {topics.length === 0 ? (
          <p className="text-gray-500">No topics available</p>
        ) : (
          topics.map((topic, index) => (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              className="px-8 py-3 md:text-lg bg-white border text-black border-gray-300 rounded-md hover:bg-gray-50 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                       transition-colors duration-200 text-sm"
            >
              {topic.topic}
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export default TopicTags