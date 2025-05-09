import React, { useState, useEffect } from 'react';
import Nav from '../Common/Nav';
import Bannertemp from '../AboutPage/Bannertemp';
import { useNavigate, useLocation } from 'react-router-dom';
import envConfig from '../../utils/envConfig';

export default function Confirmpass() {
  const location = useLocation();
  const navigate = useNavigate();
  const { phoneNumber, affiliateId } = location.state || {};


  // Redirect if no phone number is provided
  useEffect(() => {
    if (!phoneNumber) {
      navigate('/joinnow');
    }
  }, [phoneNumber, navigate]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: ''
    };

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setErrors({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: ''
    });

    if (!validateForm()) {
      return;
    }

    try {
      // Construct URL with affiliate_id query parameter
      const baseUrl = `${envConfig.backendUrl}/auth/register`;
      const url = affiliateId ? `${baseUrl}?affiliate_id=${affiliateId}` : baseUrl;
   

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          phone: phoneNumber,
          firstname: formData.username,
          affiliate_id: affiliateId 
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        localStorage.setItem('authToken', data.token);
        navigate('/practice');
      } else {
        setErrors(prev => ({
          ...prev,
          general: data.message || 'Registration failed. Please try again.'
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'An error occurred. Please try again.'
      }));
    }
  };

  return (
    <div>
      <Nav />
      <Bannertemp value="Join Now" />
      <div className="flex items-center justify-center bg-gray-50 py-12 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full flex gap-8 items-center">
          {/* Left side - Image */}
          <div className="hidden md:block w-1/2">
            <img
              src="/images/Login.png"
              alt="Learning illustration"
              className="w-full h-auto"
            />
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Join Now</h2>
              <p className="mt-2 text-sm text-gray-600">
                Hey enter your details to create your account
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg`}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create Password"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full mt-10 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#020A47]"
                >
                  Continue
                </button>
              </div>
            </form>
            {errors.general && <div className="text-red-500 text-center">{errors.general}</div>}
            {success && <div className="text-green-500 text-center">{success}</div>}
            <div className="text-center">
              <a href="/login" className="text-sm text-gray-600 hover:text-gray-900">
                Already have account? Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}