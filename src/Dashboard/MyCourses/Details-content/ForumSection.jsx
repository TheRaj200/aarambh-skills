"use client"

import { useState, useEffect } from "react"
import { FaHeart } from "react-icons/fa"

// Set this to true when backend is ready
const USE_API = false

// Dummy data for development
const DUMMY_DATA = [
  {
    id: 1,
    author: "Raj Kumar",
    time: "28 Minutes Ago",
    content: "What is Aarambh Skills and how can it help me in my career?",
    liked: true,
    replies: [
      {
        id: 11,
        author: "Priya Singh",
        time: "15 Minutes Ago",
        content: "Aarambh Skills is a platform that helps you learn .",
        replies: [
          
        ]
      },
      
    ],
  },
 
  {
    id: 3,
    author: "Ankit Patel",
    time: "2 Hours Ago",
    content: "The React course content is very well structured and easy to follow!",
    liked: true,
    replies: [],
  }
]

function ForumSection() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newQuestion, setNewQuestion] = useState("")
  const [replyText, setReplyText] = useState({})
  const [showQuestionInput, setShowQuestionInput] = useState(true)
  const [showReplyInput, setShowReplyInput] = useState({})

  // Fetch all posts when component mounts
  useEffect(() => {
    if (USE_API) {
      fetchPosts()
    } else {
      // Use dummy data
      setTimeout(() => {
        setPosts(DUMMY_DATA)
        setLoading(false)
      }, 1000) // Simulate loading delay
    }
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.VITE_API_URL}/api/forum/posts`)
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data = await response.json()
      setPosts(data)
      setError(null)
    } catch (err) {
      setError("Failed to load forum posts. Please try again later.")
      console.error("Error fetching posts:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (postId) => {
    if (USE_API) {
      try {
        const response = await fetch(`${process.env.VITE_API_URL}/api/forum/posts/${postId}/like`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to like post')
        }

        setPosts(posts.map((post) => 
          post.id === postId ? { ...post, liked: !post.liked } : post
        ))
      } catch (err) {
        console.error("Error liking post:", err)
      }
    } else {
      // Handle likes locally for dummy data
      setPosts(posts.map((post) => 
        post.id === postId ? { ...post, liked: !post.liked } : post
      ))
    }
  }

  const handleReplyChange = (postId, text) => {
    setReplyText({ ...replyText, [postId]: text })
  }

  const toggleReplyInput = (postId) => {
    setShowReplyInput(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
    if (!showReplyInput[postId]) {
      setReplyText(prev => ({
        ...prev,
        [postId]: ""
      }))
    }
  }

  const submitReply = async (postId, parentReplyId = null, replyInputId) => {
    if (!replyText[replyInputId]?.trim()) return

    const newReply = {
      id: Date.now(),
      author: "You",
      content: replyText[replyInputId],
      time: "Just now",
      replies: []
    }

    if (USE_API) {
      try {
        const payload = {
          content: replyText[replyInputId],
          parentReplyId
        }

        const response = await fetch(
          `${process.env.VITE_API_URL}/api/forum/posts/${postId}/replies`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          }
        )

        if (!response.ok) {
          throw new Error('Failed to submit reply')
        }

        const data = await response.json()
        newReply = data
      } catch (err) {
        console.error("Error submitting reply:", err)
        alert("Failed to submit reply. Please try again.")
        return
      }
    }

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          if (!parentReplyId) {
            return {
              ...post,
              replies: [...post.replies, newReply]
            }
          } else {
            return {
              ...post,
              replies: findAndUpdateReply(post.replies, parentReplyId, newReply)
            }
          }
        }
        return post
      })
    )

    setReplyText({ ...replyText, [replyInputId]: "" })
    setShowReplyInput(prev => ({
      ...prev,
      [replyInputId]: false
    }))
  }

  const submitQuestion = async () => {
    if (!newQuestion.trim()) return

    const newPost = {
      id: Date.now(),
      author: "You",
      time: "Just now",
      content: newQuestion,
      liked: false,
      replies: []
    }

    if (USE_API) {
      try {
        const response = await fetch(`${process.env.VITE_API_URL}/api/forum/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: newQuestion
          })
        })

        if (!response.ok) {
          throw new Error('Failed to submit question')
        }

        const data = await response.json()
        newPost = data
      } catch (err) {
        console.error("Error submitting question:", err)
        alert("Failed to submit question. Please try again.")
        return
      }
    }

    setPosts([newPost, ...posts])
    setNewQuestion("")
    setShowQuestionInput(false)
  }

  const findAndUpdateReply = (replies, parentReplyId, newReply) => {
    return replies.map(reply => {
      if (reply.id === parentReplyId) {
        return {
          ...reply,
          replies: [...(reply.replies || []), newReply]
        }
      } else if (reply.replies && reply.replies.length > 0) {
        return {
          ...reply,
          replies: findAndUpdateReply(reply.replies, parentReplyId, newReply)
        }
      }
      return reply
    })
  }

  const ReplyComponent = ({ reply, postId, level = 0 }) => {
    const replyId = `${postId}-${reply.id}`
    
    return (
      <div className={`mt-2  ${level > 0 ? 'ml-8' : ''}`}>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
            {reply.author.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{reply.author}</span>
              <span className="text-xs text-gray-500">{reply.time}</span>
            </div>
            <p className="text-sm">{reply.content}</p>
            
            <div className="flex items-center mt-1">
              {!showReplyInput[replyId] ? (
                <button
                  onClick={() => toggleReplyInput(replyId)}
                  className="text-sm text-gray-500"
                >
                  Reply
                </button>
              ) : null}
            </div>

            {showReplyInput[replyId] && (
              <div className="mt-2 flex relative w-[90%]">
                <input
                  type="text"
                  value={replyText[replyId] || ""}
                  onChange={(e) => handleReplyChange(replyId, e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 pr-[12%] placeholder:text-black text-sm"
                />
                <button
                  onClick={() => submitReply(postId, reply.id, replyId)}
                  className="ml-2 absolute right-0 top-1/2 -translate-y-1/2 text-[#020A47] font-bold rounded-md px-4 py-1 text-sm"
                >
                  Post
                </button>
              </div>
            )}

            {/* Nested Replies */}
            {reply.replies?.map((nestedReply) => (
              <ReplyComponent 
                key={nestedReply.id} 
                reply={nestedReply} 
                postId={postId} 
                level={level + 1}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex-1 w-full p-6">
        {/* Header Skeleton */}
        <div className="flex justify-center mb-4">
          <div className="h-7 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="mb-4 mx-auto w-24"></div>

        {/* Question Input Box Skeleton */}
        <div className="w-full rounded-xl shadow p-4 flex flex-col gap-4 bg-white">
          <div className="flex justify-between items-center">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-[50px] bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Posts Skeleton */}
        <div className="space-y-4 w-[95%] mt-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="mb-4">
              <div className="flex items-start gap-3">
                {/* Avatar Skeleton */}
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                
                <div className="flex-1">
                  {/* Author and Time Skeleton */}
                  <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  
                  {/* Content Skeleton */}
                  <div className="mt-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mt-2"></div>
                  </div>

                  {/* Reply Button Skeleton */}
                  <div className="mt-2">
                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  {/* Replies Skeleton */}
                  <div className="ml-8 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-14 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mt-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 w-full p-6 flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="flex-1 w-full p-6 border-gray-200">
      <div className="flex justify-center mb-4">
        <h2 className="text-lg text-center font-medium">Forum</h2>
      </div>
      <div className="mb-4 mx-auto w-24"></div>

      <div className="w-full rounded-xl shadow p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Post Questions</span>
          <button 
            onClick={() => setShowQuestionInput(!showQuestionInput)} 
            className="shadow-lg w-[50px] text-xl rounded-md p-1"
          >
            {showQuestionInput ? "×" : ">"}
          </button>
        </div>
        
        {showQuestionInput && (
          <div className="flex relative w-full">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Write your question..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 pr-[12%] placeholder:text-black text-sm"
            />
            <button
              onClick={submitQuestion}
              className="ml-2 absolute right-0 top-1/2 -translate-y-1/2 text-[#020A47] font-bold rounded-md px-4 py-1 text-sm"
            >
              Post
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4 w-[95%] mt-4">
        {posts.map((post) => (
          <div key={post.id} className="mb-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                {post.author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{post.author}</span>        
                    <span className="text-xs text-gray-500">{post.time}</span>
                  </div>
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`${post.liked ? "text-pink-500" : "text-gray-400"}`}
                  >
                    <FaHeart />
                  </button>
                </div>
                
                <p className="text-sm mt-1">{post.content}</p>
                <div className="flex items-center mt-1">
                  {!showReplyInput[post.id] ? (
                    <button
                      onClick={() => toggleReplyInput(post.id)}
                      className="text-sm text-gray-500"
                    >
                      Reply
                    </button>
                  ) : null}
                </div>

                {showReplyInput[post.id] && (
                  <div className="mt-2 flex relative w-[90%]">
                    <input
                      type="text"
                      value={replyText[post.id] || ""}
                      onChange={(e) => handleReplyChange(post.id, e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 pr-[12%] placeholder:text-black text-sm"
                    />
                    <button
                      onClick={() => submitReply(post.id, null, post.id)}
                      className="ml-2 absolute right-0 top-1/2 -translate-y-1/2 text-[#020A47] font-bold rounded-md px-4 py-1 text-sm"
                    >
                      Post
                    </button>
                  </div>
                )}

                {/* Replies */}
                {post.replies.map((reply) => (
                  <ReplyComponent 
                    key={reply.id} 
                    reply={reply} 
                    postId={post.id}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 

export default ForumSection

