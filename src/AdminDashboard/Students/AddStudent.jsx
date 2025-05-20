import React, { useState } from 'react';
import Nav from '../Common/Nav';
import Sidebar from '../Common/Sidebar';
import Bannertemp from '../../components/AboutPage/Bannertemp';

// Dummy courses list
const coursesList = [
  { id: 1, title: 'DSA' },
  { id: 2, title: 'Data Science' },
  { id: 3, title: 'Python' },
  { id: 4, title: 'JavaScript' },
  { id: 5, title: 'Java' },
];

const AddStudent = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    courses: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCourseSelect = (id) => {
    setForm((prev) => ({
      ...prev,
      courses: prev.courses.includes(id)
        ? prev.courses.filter((cid) => cid !== id)
        : [...prev.courses, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // API call yahan karein
    console.log('Student Data:', form);
  };

  return (
    <div>
      <Nav />
      <Bannertemp value={"Dashboard"} />
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="lg:w-64">
          <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"} />
        </div>
        <div className="flex-1 flex justify-center items-start">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mt-4">
            <h2 className="text-2xl font-bold mb-6 text-[#020A47]">Add New Student</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder='Enter Student Name'
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                     placeholder='Enter Student Email'
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder='Enter Student Phone Number'
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Enroll in Courses</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {coursesList.map((course) => (
                    <label key={course.id} className="flex items-center gap-2 cursor-pointer bg-gray-50 rounded px-2 py-1 hover:bg-purple-50">
                      <input
                        type="checkbox"
                        checked={form.courses.includes(course.id)}
                        onChange={() => handleCourseSelect(course.id)}
                        className="accent-[#020A47]"
                      />
                      <span>{course.title}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#020a47dc] hover:bg-[#020A47]  text-white px-4 py-2 rounded  mt-2 font-semibold"
                disabled={!form.name || !form.email || !form.phone }
              >
                Add Student
              </button>
              {submitted && (
                <div className="text-green-600 font-medium mt-2 w-full flex justify-center items-center ">Student added successfully</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
