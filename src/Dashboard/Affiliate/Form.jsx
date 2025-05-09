"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import AffiliateDeatils from "./AffiliateDetails";
import { useNavigate } from "react-router-dom";
import envConfig from "../../utils/envConfig";

const Form = () => {
const navigate = useNavigate();
const [btn,setbtn] = useState(false);
const [firsttime,setFirsttime]=  useState(true);
const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    accountNumber: "",
    reAccountNumber: "",
    ifscCode: "",
    upiCode: "",
  })

  // State to hold affiliate data
  const [affiliateData, setAffiliateData] = useState(null);

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await fetch(`${envConfig.backendUrl}/user/get_user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log('API Response:', data);
        if (response.ok && data.status && data.user) {
          const userData = data.user;
          
          // Check if user is already an affiliate
          if (userData.affiliate_id && userData.affiliate_money && userData.reffered_user) {
            setFirsttime(false);
            // Set affiliate data from user data
            setAffiliateData({
              affiliate_id: userData.affiliate_id,
              affiliate_money: userData.affiliate_money,
              reffered_user: userData.reffered_user
            });
          }

          setFormData({
            name: userData.username || "",
            email: userData.email || "",
            phone: userData.phone || "",
            accountNumber: userData.account_number || "",
            reAccountNumber: userData.account_number || "",
            ifscCode: userData.ifsc_code || "",
            upiCode: userData.upi_code || "",
          });
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Log form submission
    console.log('Form Data:', formData); // Log form data
    // Validate form data
    if (formData.accountNumber !== formData.reAccountNumber) {
      alert("Account numbers do not match!");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No auth token found');
        alert('Authentication token is missing. Please log in again.');
        navigate('/login');
        return;
      }
      console.log('Submitting with token:', token); // Log token
      const response = await fetch(`${envConfig.backendUrl}/user/submit_affiliate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          account_number: formData.accountNumber,
          ifsc_code: formData.ifscCode,
          upi_code: formData.upiCode
        })
      });
      console.log('Request sent');
      const data = await response.json();
      console.log('API Response:', data); // Log API response
      if (response.ok) {
        console.log('Form submitted successfully:', data);
        setFirsttime(false);
        // Pass the specific data to AffiliateDetails
        setAffiliateData({
          affiliate_id: data.data.affiliate_id,
          affiliate_money: data.data.affiliate_money || 0,
          reffered_user: data.data.reffered_user || 0
        });
      } else {
        console.error('Submission failed:', data.message);
        alert(data.message || 'Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  if(firsttime){
    if(!btn){
      return(
       <div onClick={()=>setbtn(true)} className='flex justify-center items-center h-[40vh] lg:h-[80vh] w-full'>
         <button className='bg-[#020A47] text-white px-8 py-3 text-lg rounded-lg'>Become a Affiliate</button>
       </div>
      )
    }

    return (
      <div className="w-full lg:w-1/2 border-[1px] border-gray-100 mx-auto rounded-lg shadow-md drop-shadow-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-md font-medium text-[#020A47] mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-[#EDF3F5] rounded-md text-gray-800"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-[#020A47] mb-2">Email Id</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-[#EDF3F5] rounded-md text-gray-800"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-[#020A47] mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-[#EDF3F5] rounded-md text-gray-800"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-[#020A47] mb-2">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-[#EDF3F5] rounded-md text-gray-800"
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-[#020A47] mb-2">Re- Account Number</label>
            <input
              type="text"
              name="reAccountNumber"
              value={formData.reAccountNumber}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-[#EDF3F5] rounded-md text-gray-800"
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-[#020A47] mb-2">IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-[#EDF3F5] rounded-md text-gray-800"
            />
          </div>

          <div className="mb-6">
            <label className="block text-md font-medium text-[#020A47] mb-2">UPI Code</label>
            <input
              type="text"
              name="upiCode"
              value={formData.upiCode}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-[#EDF3F5] rounded-md text-gray-800"
            />
          </div>

          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="bg-navy-800 hover:bg-navy-900 text-white py-3 px-12 text-lg rounded-md transition-colors"
              style={{ backgroundColor: "#0a1e47" }}
            >
              Submit Now
            </button>
          </div>
        </form>
      </div>
    )
  }

  if (!firsttime && affiliateData) {
    return <AffiliateDeatils userData={affiliateData} />;
  }
}

export default Form

