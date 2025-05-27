import React, { useState, useEffect } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import envConfig from '../../utils/envConfig';
import { useNavigate } from 'react-router-dom';

const AddBundle = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    courses: [],
    price: '',
    image: null,
    bundle_data: {
      duration: '',
      type: 'Online'
    },
    credits_applied: true
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [courseSearch, setCourseSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view courses');
          return;
        }

        const response = await fetch(`${envConfig.backendUrl}/courses/admin/get_course`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        if (response.ok && data.status) {
          setAvailableCourses(data.data);
        } else {
          toast.error(data.message || 'Failed to fetch courses');
        }
      } catch (error) {
        toast.error('Error fetching courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCourseSearch = (e) => {
    const value = e.target.value;
    setCourseSearch(value);
    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = availableCourses.filter(
      (c) => !form.courses.includes(c.id) && c.title.toLowerCase().includes(value.toLowerCase())
    );
    console.log('Filtered courses:', filtered); // Debug log
    setSearchResults(filtered);
  };

  const handleAddSearchedCourse = (course) => {
    console.log('Adding course:', course); // Debug log
    if (!course || !course.id) {
      toast.error('Invalid course selected');
      return;
    }
    setForm((prev) => ({
      ...prev,
      courses: [...prev.courses, course.id]
    }));
    setCourseSearch('');
    setSearchResults([]);
  };

  const handleCourseSelect = (id) => {
    console.log('Removing course ID:', id); // Debug log
    setForm((prev) => ({
      ...prev,
      courses: prev.courses.includes(id)
        ? prev.courses.filter((cid) => cid !== id)
        : [...prev.courses, id]
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setForm((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, price, bundle_data, credits_applied, image, courses } = form;

    if (!title || !description || !price || !bundle_data.duration || courses.length === 0) {
      toast.error('Please fill all required fields');
      return;
    }

    // Validate course IDs
    const validCourses = courses.filter(cid => {
      const course = availableCourses.find(c => c.id === cid);
      if (!course) {
        toast.error(`Course ID ${cid} not found`);
        return false;
      }
      return true;
    });

    if (validCourses.length === 0) {
      toast.error('No valid courses selected');
      return;
    }

    try {
      let base64Image;
      
      if (image) {
        // If image is uploaded, convert it to base64
        const reader = new FileReader();
        reader.readAsDataURL(image);
        await new Promise((resolve, reject) => {
          reader.onloadend = () => {
            base64Image = reader.result;
            resolve();
          };
          reader.onerror = reject;
        });
      } else {
        // Use default image URL if no image is uploaded
        base64Image = 'https://example.com/images/bundle.jpg';
      }

      // Prepare data in the exact format required
      const bundleData = {
        title: title,
        description: description,
        dundle_image: base64Image,
        price: parseInt(price),
        bundle_data: {
          duration: bundle_data.duration,
          type: bundle_data.type
        },
        credits_applied: credits_applied,
        courses: validCourses.map(id => parseInt(id))
      };

      console.log('Sending bundle data:', bundleData);

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add bundle');
        return;
      }

      const response = await fetch(`${envConfig.backendUrl}/courses/admin/create_bundle`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bundleData)
      });

      const data = await response.json();

      if (response.ok && data.status) {
        toast.success('Bundle added successfully!');
        setForm({
          title: '',
          description: '',
          courses: [],
          price: '',
          image: null,
          bundle_data: { duration: '', type: 'Online' },
          credits_applied: true
        });
        setImagePreview(null);
      } else {
        if (data.courses) {
          // Handle course-specific errors
          const courseErrors = data.courses.map(err => err.msg).join(', ');
          toast.error(`Course errors: ${courseErrors}`);
        } else {
          toast.error(data.message || 'Failed to add bundle');
        }
      }
    } catch (error) {
      toast.error('Something went wrong: ' + error.message);
    }
    navigate('/admin/dashboard/bundle/manage')
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mt-4">
        <h2 className="text-2xl font-bold mb-6 text-[#020A47]">Add New Bundle</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">Bundle Image</label>
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-[#bdbdbd] rounded-lg p-4 bg-gray-50 cursor-pointer"
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
                  <span className="text-gray-500">Click to upload image</span>
                </>
              ) : (
                <div className="relative group">
                  <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded" />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleImageRemove(); }}
                    className="absolute top-1 right-1 text-red-500 bg-white rounded-full px-2 py-1"
                  >×</button>
                </div>
              )}
            </div>
          </div>

          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" required />
          <input type="text" value={form.bundle_data.duration} onChange={(e) => setForm((prev) => ({
            ...prev,
            bundle_data: { ...prev.bundle_data, duration: e.target.value }
          }))} placeholder="Duration (e.g. 3 months)" className="border p-2 rounded" required />
          <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price ₹" className="border p-2 rounded" min="0" required />

          {/* Course Search */}
          <div>
            <input
              type="text"
              placeholder="Search courses..."
              value={courseSearch}
              onChange={handleCourseSearch}
              className="border p-2 rounded w-full"
            />
            {searchResults.length > 0 && (
              <div className="bg-white border rounded mt-1 max-h-40 overflow-y-auto">
                {searchResults.map(course => (
                  <div
                    key={course.id}
                    className="px-3 py-2 hover:bg-purple-100 cursor-pointer"
                    onClick={() => handleAddSearchedCourse(course)}
                  >
                    {course.title}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {form.courses.map((cid) => {
                const course = availableCourses.find(c => c.id === cid);
                return course ? (
                  <span key={cid} className="bg-purple-100 text-[#020A47] px-2 py-1 rounded text-sm flex items-center gap-1">
                    {course.title} 
                    <button type="button" onClick={() => handleCourseSelect(cid)} className="text-xs">×</button>
                  </span>
                ) : null;
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="credits_applied"
              checked={form.credits_applied}
              onChange={(e) => setForm(prev => ({ ...prev, credits_applied: e.target.checked }))}
            />
            <label htmlFor="credits_applied" className="font-medium">Credits Applicable</label>
          </div>

          <button
            type="submit"
            className="bg-[#020a47dc] hover:bg-[#020A47] text-white px-4 py-2 rounded mt-2 font-semibold"
          >
            Add Bundle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBundle;
