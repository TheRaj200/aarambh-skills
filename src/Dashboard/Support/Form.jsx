"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

const Form = () => {
  const [btn, setbtn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    subject: "",
    priority: "",
    message: "",
    attachment: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        attachment: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'attachment' && formData[key]) {
          submitData.append(key, formData[key]);
        } else {
          submitData.append(key, formData[key] || '');
        }
      });

      // Here you would make your API call
      // const response = await fetch('/api/tickets', {
      //   method: 'POST',
      //   body: submitData
      // });

      console.log("Form submitted:", Object.fromEntries(submitData));
      setbtn(false);
      
      // Clear form
      setFormData({
        name: "",
        department: "",
        subject: "",
        priority: "",
        message: "",
        attachment: null
      });
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!btn) {
    return (
      <div className='flex justify-between flex-col-reverse gap-2 md:flex-row lg:gap-0 w-full px-8'>
        <button 
          onClick={() => setbtn(true)} 
          className='bg-[#020A47] text-white px-8 py-3 flex justify-center items-center gap-4 text-lg rounded-lg'
        >
          <span className="text-3xl font-bold flex justify-center items-center">+</span> New Ticket
        </button>
        <input 
          type="text" 
          placeholder="Search Ticket" 
          className="py-3 px-4 bg-[#EDF3F5] rounded-md text-gray-800" 
        />
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/2 border-[1px] border-gray-100 mx-auto rounded-lg shadow-md drop-shadow-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-md font-medium text-[#020A47] mb-2">Subject</label>
          <div className="relative">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full py-3 px-4 bg-[#EDF3F5] rounded-md text-gray-800"
              placeholder="Enter subject"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-md font-medium text-[#020A47] mb-2">Name</label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              className="w-full py-3 px-4 bg-[#EDF3F5] rounded-md text-gray-800"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-md font-medium text-[#020A47] mb-2">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full py-3 px-4 bg-[#EDF3F5] rounded-md text-gray-800"
          >
            <option value="">Select Department</option>
            <option value="sales">Sales</option>
            <option value="service">Service</option>
            
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-md font-medium text-[#020A47] mb-2">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full py-3 px-4 bg-[#EDF3F5] rounded-md text-gray-800"
          >
            <option value="">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-md font-medium text-[#020A47] mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message....."
            className="w-full h-48 py-3 px-4 bg-[#EDF3F5] rounded-md text-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-md font-medium text-[#020A47] mb-2">Attachment</label>
          <input 
            type="file" 
            name="attachment" 
            onChange={handleChange}
            className="w-full file:bg-[#020A47] file:text-white file:py-2 file:px-4 file:rounded-md file:text-sm py-3 px-4 bg-[#EDF3F5] rounded-md text-[#020A47]" 
          />
        </div>

        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="bg-[#020A47] hover:bg-[#0a1e47] text-white py-3 px-12 text-lg rounded-md transition-colors"
          >
            Submit Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

