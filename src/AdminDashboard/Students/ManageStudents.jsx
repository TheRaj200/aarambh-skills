import React, { useState } from 'react';
import { FaFileExport } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

// Dummy data
const initialStudents = [
  {
    id: 1,
    name: 'Jona Corso',
    email: 'student21@example.com',
    phone: '34463434634',
    courses: 4,
   
  },
  {
    id: 2,
    name: 'Riana Hoffman',
    email: 'student13@example.com',
    phone: '34463434634',
    courses: 4,
  
  },
  {
    id: 3,
    name: 'Josel Vosus',
    email: 'student@example.com',
    phone: '+90020088',
    courses: 4,
  
  },
  {
    id: 4,
    name: 'Amber Domore',
    email: 'student5@example.com',
    phone: '34463434634',
    courses: 4,
    
  },
  {
    id: 5,
    name: 'David Warner',
    email: 'David@example.com',
    phone: '34463434634',
    courses: 1,
   
  },
  {
    id: 6,
    name: 'Geoffrey Hammond',
    email: 'Geoffrey@example.com',
    phone: '34463434634',
    courses: 1,
    
  },
  {
    id: 7,
    name: 'razucjelyj',
    email: 'st@gmail.com',
    phone: '+1 (317) 381-1655',
    courses: 0,
    
  },
  {
    id: 8,
    name: 'sevolasus',
    email: 'kowsercreativeltem@gmail.com',
    phone: '34463434634',
    courses: 0,
 
  },
];

function exportToCSV(students) {
  const headers = ['Name', 'Email', 'Phone', 'Enrolled Courses', ];
  const rows = students.map(s => [s.name, s.email, s.phone, s.courses]);
  let csvContent = 'data:text/csv;charset=utf-8,'
    + headers.join(',') + '\n'
    + rows.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'students.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const itemsPerPage = 10;

const ManageStudents = () => {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();


 

  // Filtered students
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

 

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
    setMenuOpen(null);
  };


  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setMenuOpen(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Manage Students</h1>
        <button
          onClick={() => navigate('/admin/dashboard/students/add')}
          className="flex items-center gap-2 px-4 py-2 bg-[#020A47] text-white rounded-lg cursor-pointer"
        >
          <GoPlus className='text-3xl lg:text-xl ' /> Add New Student
        </button>
      </div>

    

      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => exportToCSV(filtered)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <FaFileExport /> Export
          </button>
          
        </div>
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Name or Email"
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
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
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Enrolled Courses</th>
              <th className="px-4 py-3 text-left">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">No students found.</td>
              </tr>
            )}
            {currentItems.map((s, idx) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-3">{indexOfFirstItem + idx + 1}</td>
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3">{s.phone}</td>
                <td className="px-4 py-3">{s.courses} Courses</td>
                <td className="px-4 py-3 relative">
                  <div className="relative">
                    <button
                      onClick={e => { e.stopPropagation(); setMenuOpen(menuOpen === s.id ? null : s.id); }}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <BsThreeDotsVertical />
                    </button>
                    {menuOpen === s.id && (
                      <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg z-50 border">
                        <div className="py-1 relative z-[99999]">
                          <button
                            onClick={() => navigate('/admin/dashboard/students/Edit')}
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                          >
                            Edit Student
                          </button>
                        
                          <button
                            onClick={() => handleDelete(s.id)}
                            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2 border-t"
                          >
                            Delete Student
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
          Showing {filtered.length === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filtered.length)} of {filtered.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
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
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 rounded ${currentPage === number
                ? 'bg-[#020A47] text-white'
                : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 rounded ${currentPage === totalPages || totalPages === 0
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

export default ManageStudents;
