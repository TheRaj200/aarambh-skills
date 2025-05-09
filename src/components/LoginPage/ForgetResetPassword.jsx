import React, { useState, useEffect } from 'react';
import Nav from '../Common/Nav';
import Bannertemp from '../AboutPage/Bannertemp';
import { useNavigate } from 'react-router-dom';
import envConfig from '../../utils/envConfig';

export default function ForgetResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token on component mount
    const token = localStorage.getItem('resetToken');
   
    if (!token) {
      setErrors(prev => ({
        ...prev,
        general: 'No reset token found. Please request a new password reset.'
      }));
      setTimeout(() => {
        navigate('/forget-password');
      }, 2000);
    }
  }, [navigate]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      newPassword: '',
      confirmPassword: '',
    };

    // Password validation
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and numbers';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem('resetToken');
   
    if (!token) {
      setErrors(prev => ({
        ...prev,
        general: 'No reset token found. Please request a new password reset.'
      }));
      setTimeout(() => {
        navigate('/forget-password');
      }, 2000);
      return;
    }

    setLoading(true);
    try {
    
      const response = await fetch(`${envConfig.backendUrl}/user/reset_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          password: formData.newPassword
        })
      });

      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Handle non-JSON response
        const text = await response.text();
       
        throw new Error('Received non-JSON response from server');
      }

     

      if (response.ok) {
        setSuccess('Password reset successful! Redirecting to login...');
        // Clear the token after successful password reset
        localStorage.removeItem('resetToken');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        
        setErrors(prev => ({
          ...prev,
          general: data.message || 'Password reset failed. Please try again.'
        }));
      }
    } catch (error) {
      
      setErrors(prev => ({
        ...prev,
        general: 'An error occurred. Please try again later.'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <Bannertemp value="Reset Password" />
      <div className="flex items-center justify-center py-12 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full flex gap-8 items-center">
          {/* Left side - Image */}
          <div className="hidden md:block w-1/2">
            <img
              src="/images/Login.png"
              alt="Reset Password illustration"
              className="w-full h-auto"
            />
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#020A47]">Reset Password</h2>
              <p className="mt-4 text-sm text-gray-600">
                Create a new password for your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {/* New Password Field */}
              <div>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter New Password"
                  className={`appearance-none rounded-lg drop-shadow-lg relative block w-full px-3 py-3 border ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#020A47] focus:border-transparent shadow-sm`}
                />
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`appearance-none rounded-lg relative drop-shadow-lg block w-full px-3 py-3 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#020A47] focus:border-transparent shadow-sm`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className=''>
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative mt-12 w-full flex justify-center  py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#020A47]   transition-colors ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>
            </form>

            {/* Error and Success Messages */}
            {errors.general && (
              <div className="text-red-500 text-center mt-2">{errors.general}</div>
            )}
            {success && (
              <div className="text-green-500 text-center mt-2">{success}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}