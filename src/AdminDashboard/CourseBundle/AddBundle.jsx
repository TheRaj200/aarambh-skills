import React, { useState } from 'react';
import Nav from '../Common/Nav';
import Sidebar from '../Common/Sidebar';
import Bannertemp from '../../components/AboutPage/Bannertemp';
import { FaRegImage } from 'react-icons/fa';

// Dummy courses list with price
const coursesList = [
  { id: 1, title: 'DSA', price: 1000 },
  { id: 2, title: 'Data Science', price: 1200 },
  { id: 3, title: 'Python', price: 900 },
  { id: 4, title: 'JavaScript', price: 800 },
  { id: 5, title: 'Java', price: 1100 },
  { id: 6, title: 'React', price: 950 },
  { id: 7, title: 'Node.js', price: 1050 },
  { id: 8, title: 'C++', price: 850 },
  { id: 9, title: 'Machine Learning', price: 1500 },
  { id: 10, title: 'Cloud Computing', price: 1300 },
];

const AddBundle = () => {
  const [form, setForm] = useState({
    title: '',
    courses: [],
    price: '',
    image: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [courseSearch, setCourseSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleCourseSearch = (e) => {
    const value = e.target.value;
    setCourseSearch(value);
    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }
    const shownIds = coursesList.slice(0, 5).map(c => c.id);
    const filtered = coursesList.filter(
      c =>
        !form.courses.includes(c.id) &&
        !shownIds.includes(c.id) &&
        c.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleAddSearchedCourse = (course) => {
    setForm((prev) => ({ ...prev, courses: [...prev.courses, course.id] }));
    setCourseSearch('');
    setSearchResults([]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageRemove = () => {
    setForm((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  // Calculate total price
  const totalPrice = form.courses.reduce((sum, cid) => {
    const course = coursesList.find(c => c.id === cid);
    return course ? sum + course.price : sum;
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // API call yahan karein
    console.log('Bundle Data:', form);
  };

  return (
    <div className="w-full flex justify-center items-center ">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mt-4">
        <h2 className="text-2xl font-bold mb-6 text-[#020A47]">Add New Bundle</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block mb-1 font-medium">Bundle Image</label>
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-[#bdbdbd] rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer relative"
              onClick={() => document.getElementById('bundle-image-input').click()}
              style={{ minHeight: '120px' }}
            >
              <input
                id="bundle-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {!imagePreview ? (
                <>
                  <span className="text-gray-400 text-4xl mb-2"><FaRegImage /></span>
                  <span className="text-gray-500">Upload an image here to upload</span>
                  <span className="text-xs text-gray-400 mt-1">Recommended: Square image, max 2MB</span>
                </>
              ) : (
                <div className="relative group">
                  <img src={imagePreview} alt="Bundle Preview" className="h-32 w-32 object-cover rounded border shadow" />
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); handleImageRemove(); }}
                    className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-red-100 transition group-hover:opacity-100 opacity-80"
                    title="Remove image"
                  >
                    <span className="text-red-500 text-lg">×</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Bundle Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder='Enter title of bundle'
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Select Courses</label>
            
            <input
              type="text"
              placeholder="Search and add more courses..."
              value={courseSearch}
              onChange={handleCourseSearch}
              className="w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
            />
            {searchResults.length > 0 && (
              <div className="bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto z-50 relative">
                {searchResults.map((course) => (
                  <div
                    key={course.id}
                    className="px-3 py-2 hover:bg-purple-50 cursor-pointer"
                    onClick={() => handleAddSearchedCourse(course)}
                  >
                    {course.title} <span className="text-xs text-gray-500">(₹{course.price})</span>
                  </div>
                ))}
              </div>
            )}
            {/* Show selected courses not in first 5 */}
            {form.courses.filter(cid => !coursesList.slice(0, 5).map(c => c.id).includes(cid)).length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {form.courses.filter(cid => !coursesList.slice(0, 5).map(c => c.id).includes(cid)).map(cid => {
                  const course = coursesList.find(c => c.id === cid);
                  return course ? (
                    <span key={cid} className="bg-purple-100 text-[#020A47] px-2 py-1 rounded text-sm flex items-center gap-1">
                      {course.title} <span className="text-xs text-gray-500">(₹{course.price})</span>
                      <button type="button" onClick={() => handleCourseSelect(cid)} className="ml-1 text-xs">×</button>
                    </span>
                  ) : null;
                })}
              </div>
            )}
            <div className="mt-2 text-right font-semibold text-[#020A47]">
              Total Price: ₹{totalPrice}
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Bundle Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder='Enter the price of the bundle'
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
              required
              min="0"
            />
          </div>
          <button
            type="submit"
            className="bg-[#020a47dc] hover:bg-[#020A47] text-white px-4 py-2 rounded mt-2 font-semibold"
            disabled={!form.title || !form.price || form.courses.length === 0}
          >
            Add Bundle
          </button>
          {submitted && (
            <div className="text-green-600 font-medium mt-2 w-full flex justify-center items-center">Bundle added successfully</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBundle;
