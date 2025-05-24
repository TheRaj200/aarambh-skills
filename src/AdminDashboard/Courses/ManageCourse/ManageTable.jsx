import React, { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { FaFileExport } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';
import { FaEdit, FaTrash, FaCopy, FaPowerOff, FaPlay, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import envConfig from '../../../utils/envConfig';
import { authToken } from '../../../utils/constants';
import apiService from '../../../api';
import toast from 'react-hot-toast';


const ManageTable = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const itemsPerPage = 10;


  useEffect(() => {
    (async () => {
      const response = await apiService.course.fetchCourse()
      console.log("Response is >>>> ", response)
      if (response.status) setCourses(response.data)
      else toast.error(response.error)
    })()
  }, [])

  const stats = {
    activeCourses: 43,
    pendingCourses: 0,
    upcomingCourses: 3,
    freeCourses: 4,
    paidCourses: 42
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting data...');
  };

  const handleFilter = () => {
    // Implement filter functionality
    console.log('Filtering data...');
  };

  const handleOptionsClick = (courseId, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === courseId ? null : courseId);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleEditCourse = (courseId) => {
    console.log('Edit course:', courseId);
    // Implement edit course functionality
    handleNavigation(`/admin/dashboard/courseedit?courseId=${courseId}`);
  };

  const handleToggleCourseStatus = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? { ...course, status: course.status === 'Active' ? 'Inactive' : 'Active' }
          : course
      )
    );
  };

  const handleDeleteCourse = (courseId) => {
    console.log('Delete course:', courseId);
    // Implement delete course functionality
  };
  let handleNavigation = useNavigate();

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Manage Courses</h1>
        <button
          onClick={() => handleNavigation('/admin/dashboard/courses/add')}
          className="flex items-center gap-2 px-4 py-2 bg-[#020A47] text-white rounded-lg cursor-pointer">
          <GoPlus className='text-3xl lg:text-xl ' /> Add New Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer">
          <div className="text-3xl font-bold">{stats.activeCourses}</div>
          <div className="text-gray-600">Active Courses</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer">
          <div className="text-3xl font-bold">{stats.pendingCourses}</div>
          <div className="text-gray-600">Pending Courses</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer">
          <div className="text-3xl font-bold">{stats.upcomingCourses}</div>
          <div className="text-gray-600">Upcoming courses</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer">
          <div className="text-3xl font-bold">{stats.freeCourses}</div>
          <div className="text-gray-600">Free courses</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer">
          <div className="text-3xl font-bold">{stats.paidCourses}</div>
          <div className="text-gray-600">Paid courses</div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <FaFileExport /> Export
          </button>
          <button
            onClick={handleFilter}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <FiFilter /> Filter
          </button>
        </div>
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Title"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Enrolled Student</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((course) => (
              <tr key={course.id} className="border-t">
                <td className="px-4 py-3">{course.id}</td>
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{course.title}</div>
                  </div>
                </td>
                <td className="px-4 py-3">{course.category_title}</td>
                <td className="px-4 py-3">
                  Enrollment History: {course.people_enrolled}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-sm ${course.status === 'active' ? 'bg-green-100 text-green-800' :
                    course.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-red-800'
                    }`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {course.pricing_type === "free" ? (
                    'Free'
                  ) : (
                    <div className='flex items-center gap-2'>
                      {
                        course.discount_price === 0 ? (
                          <div> ₹ {course.price}</div>
                        ) : <div>{course.discount_price}</div>
                      }

                      {course.discount_price !== 0 && (
                        <span className="text-gray-400 line-through ml-2">
                          ₹ {course.price}
                        </span>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 relative">
                  <div className="relative">
                    <button
                      onClick={(e) => handleOptionsClick(course.id, e)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <BsThreeDotsVertical />
                    </button>
                    {openMenuId === course.id && (
                      <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg z-50 border">
                        <div className="py-1 relative z-[99999]">
                          <button
                            onClick={() => handleEditCourse(course.id)}
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                          >
                            <FaEdit className="text-gray-400" />
                            Edit Course
                          </button>
                          <button
                            onClick={() => handleToggleCourseStatus(course.id)}
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                          >
                            <FaPowerOff className="text-gray-400" />
                            {course.status === 'active' ? 'Inactivate Course' : 'Activate Course'}
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2 border-t"
                          >
                            <FaTrash className="text-red-600" />
                            Delete Course
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCourses.length)} of {filteredCourses.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 rounded ${currentPage === number
                ? 'bg-[#020A47] text-white'
                : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageTable;
