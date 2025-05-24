import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowRight, FaHeart } from 'react-icons/fa';
import { FaCirclePlay } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../../components/redux/wishlistSlice';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdError } from "react-icons/md";
import envConfig from '../../utils/envConfig';

const Notification = ({ message, type }) => (
  <div
    className={`fixed top-4 right-4 z-50 min-w-[300px] p-4 rounded-lg shadow-lg animate-slideIn ${
      type === 'success' 
        ? 'bg-green-50 border-l-4 border-green-500' 
        : 'bg-red-50 border-l-4 border-red-500'
    }`}
  >
    <div className="flex items-center space-x-3">
      {type === 'success' ? (
        <IoMdCheckmarkCircle className="text-2xl text-green-500" />
      ) : (
        <MdError className="text-2xl text-red-500" />
      )}
      <p className={`font-medium ${
        type === 'success' ? 'text-green-800' : 'text-red-800'
      }`}>
        {message}
      </p>
    </div>
  </div>
);

const Content = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '', show: false });
    const dispatch = useDispatch();

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type, show: true });
        setTimeout(() => {
            setNotification({ message: '', type: '', show: false });
        }, 3000);
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    showNotification('Please login to view wishlist', 'error');
                    return;
                }

                const response = await fetch(`${envConfig.backendUrl}/courses/wishlist`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                
                if (data.status) {
                    setWishlistItems(data.data);
                } else {
                    showNotification(data.message || 'Failed to fetch wishlist', 'error');
                }
            } catch (error) {
                showNotification('Error fetching wishlist', 'error');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const removeFromWishlistHandler = async (course) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                showNotification('Please login to modify wishlist', 'error');
                return;
            }

            const response = await fetch(`${envConfig.backendUrl}/courses/like/${course.course}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            if (data.status) {
                dispatch(removeFromWishlist(course));
                setWishlistItems(prevItems => prevItems.filter(item => item.id !== course.id));
                showNotification('Course removed from wishlist');
            } else {
                showNotification(data.message || 'Failed to remove from wishlist', 'error');
            }
        } catch (error) {
            showNotification('Error removing from wishlist', 'error');
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-4 w-full">
            {notification.show && (
                <Notification message={notification.message} type={notification.type} />
            )}
            {loading ? (
                <div className="flex flex-wrap flex-col lg:flex-row justify-center gap-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="bg-white sm:w-[400px] relative rounded-lg shadow-md hover:shadow-xl transition duration-300">
                            <div className="h-[180px] md:h-[240px] bg-gray-300 animate-pulse rounded-t-lg"></div>
                            <div className="p-4">
                                <div className="h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
                                <div className="h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
                                <div className="h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : wishlistItems.length === 0 ? (
                <div className="w-full h-[50vh] flex flex-col justify-center items-center">
                    <p className="text-lg text-gray-600">Your wishlist is empty</p>
                    <Link to="/courses" className="mt-4 inline-block bg-[#020A47] text-white px-6 py-2 rounded-md">
                        Browse Courses
                    </Link>
                </div>
            ) : (
                <div className="p-4 flex flex-wrap justify-center gap-6">
                    {wishlistItems.map((course) => (
                        <div 
                            key={course.id}
                            className="bg-white sm:w-[400px] relative rounded-lg shadow-md hover:shadow-xl transition duration-300"
                        >
                            <div className="relative">
                                <Link to={`/courses/${course.course}`}>
                                    <div
                                        className="h-[180px] md:h-[240px] bg-no-repeat bg-center bg-contain"
                                        style={{ backgroundImage: `url(${course.image})` }}
                                    ></div>
                                </Link>
                                <button className="absolute end-1 -bottom-3 cursor-pointer p-1 z-30 rounded-full flex justify-center items-center">
                                    <FaRegCirclePlay className="bg-white rounded-full justify-center items-center invert text-5xl drop-shadow-xl" />
                                </button>
                                <div
                                    onClick={() => removeFromWishlistHandler(course)}
                                    className="absolute top-6 md:top-3 right-4 text-xl bg-white p-2 rounded-full cursor-pointer text-[#A90AA4]"
                                >
                                    <FaHeart />
                                </div>
                            </div>
                            <div className="p-4">
                                <div className='flex justify-between gap-2 '>
                                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                                    <Link
                                        to={`/courses/${course.course}/checkout`}
                                        className="py-1 px-1 h-[40px] w-[70%] lg:w-[50%] flex justify-center items-center gap-2 bg-[#020A47] text-white text-[12px] md:text-sm rounded"
                                    >
                                        Enroll Now <FaArrowRight />
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <span className="ml-1">{course.people_enrolled} Enrolled</span>
                                        <span className="ml-2 text-gray-500">({course.language})</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-2">{course.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Content;