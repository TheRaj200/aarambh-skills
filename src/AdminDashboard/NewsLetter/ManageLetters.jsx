import React, { useState } from 'react';

import { FaPaperPlane, FaEdit, FaTrash, FaPlus, FaChevronDown } from 'react-icons/fa';

const dummyNewsletters = [
  {
    id: 1,
    subject: 'Unlock Your Potential with 50% Off on Our UI/UX course',
    description:
      "Are you ready to take your skills to the next level? Now is the perfect time! For a limited time only, we're offering an exclusive 50% discount on all our online courses. Whether you're looking to master UI/UX design, dive into data science, or learn the fundamentals of Adobe Illustrator, our comprehensive courses are designed to help you succeed. Don't miss out on this incredible opportunity to enhance your knowledge and boost your career. Enroll today and start learning from industry experts at half the price. Use code...",
  },
  {
    id: 2,
    subject: 'Startup Spotlight: Innovation and Entrepreneurship',
    description:
      'Discover the latest trends in the startup world. Learn from successful entrepreneurs and get inspired to start your own journey. Our newsletter brings you exclusive interviews, tips, and resources to fuel your entrepreneurial spirit.',
  },
  {
    id: 3,
    subject: 'Academy News: The Future of Learning',
    description:
      'Stay updated with the latest news and updates from our academy. Explore new courses, upcoming events, and community highlights. Be a part of the future of learning with us!',
  },
];

const ManageLetters = () => {
  const [newsletters, setNewsletters] = useState(dummyNewsletters);
  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editSubject, setEditSubject] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Accordion expand/collapse
  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Add newsletter
  const handleAddNewsletter = (e) => {
    e.preventDefault();
    if (!newSubject.trim() || !newDescription.trim()) return;
    const newLetter = {
      id: newsletters.length + 1,
      subject: newSubject,
      description: newDescription,
    };
    setNewsletters([newLetter, ...newsletters]);
    setShowModal(false);
    setNewSubject('');
    setNewDescription('');
  };

  // Edit newsletter
  const handleEdit = (id) => {
    const letter = newsletters.find((n) => n.id === id);
    if (letter) {
      setEditId(id);
      setEditSubject(letter.subject);
      setEditDescription(letter.description);
      setEditModal(true);
      setShowModal(false);
    }
  };
  const handleEditNewsletter = (e) => {
    e.preventDefault();
    setNewsletters(newsletters.map((n) => n.id === editId ? { ...n, subject: editSubject, description: editDescription } : n));
    setEditModal(false);
    setEditId(null);
    setEditSubject('');
    setEditDescription('');
  };

  // Dummy actions
  const handleSend = (id) => {
    alert('Newsletter sent! (dummy action)');
  };
  const handleDelete = (id) => {
    setNewsletters(newsletters.filter((n) => n.id !== id));
  };

  return (
    <>
     <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#020A47]">Newsletter</h1>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#020A47] text-white rounded-lg shadow  transition-colors"
            >
              <FaPlus /> Add Newsletter
            </button>
          </div>

          {/* Newsletter List */}
          <div className="space-y-4">
            {newsletters.length === 0 && (
              <div className="text-center text-gray-500">No newsletters found.</div>
            )}
            {newsletters.map((letter, idx) => (
              <div
                key={letter.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                  onClick={() => handleExpand(letter.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#020A47] text-base md:text-lg">
                      {idx + 1}. {letter.subject}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSend(letter.id); }}
                      className="p-2 rounded  text-[#020A47]"
                      title="Send"
                    >
                      <FaPaperPlane />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEdit(letter.id); }}
                      className="p-2 rounded  text-[#020A47]"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(letter.id); }}
                      className="p-2 rounded hover:bg-red-50 text-red-600"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                    <span className={`transition-transform duration-300 ml-2 ${expandedId === letter.id ? 'rotate-180' : 'rotate-0'}`}>
                      <FaChevronDown />
                    </span>
                  </div>
                </div>
                {/* Description (expand/collapse) */}
                {expandedId === letter.id && (
                  <div className="px-6 pb-4 text-gray-700 text-sm md:text-base">
                    {letter.description}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Data count */}
          <div className="mt-4 text-sm text-gray-500">
            Showing {newsletters.length} of {newsletters.length} data
          </div>
        </div>

        {/* Add Newsletter Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 text-[#020A47]">Add Newsletter</h2>
              <form onSubmit={handleAddNewsletter}>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Subject</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Subject"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#020A47] text-white "
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Newsletter Modal */}
        {editModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setEditModal(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 text-[#020A47]">Edit Newsletter</h2>
              <form onSubmit={handleEditNewsletter}>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Subject</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    placeholder="Subject"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                    onClick={() => setEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#020A47] text-white "
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </>
  );
};

export default ManageLetters;
