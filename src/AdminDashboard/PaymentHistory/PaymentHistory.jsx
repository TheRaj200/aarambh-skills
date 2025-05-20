import React, { useState } from 'react';
import { FaFileExport } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import { BsPrinter } from 'react-icons/bs';
import Nav from '../Common/Nav';
import Sidebar from '../Common/Sidebar';
import Bannertemp from '../../components/AboutPage/Bannertemp';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Dummy data
const initialPayments = [
  {
    id: 1,
    user: { name: 'Josel Vosus', email: 'student@example.com' },
    item: 'Responsive Web Design Essentials - HTML5 CSS Bootstrap',
    amount: 25,
    method: 'stripe',
    date: '2025-05-19',
  },
  {
    id: 2,
    user: { name: 'Geoffrey Hammond', email: 'Geoffrey@example.com' },
    item: 'The Complete Web Development with Bootstrap',
    amount: 12,
    method: 'stripe',
    date: '2025-05-19',
  },
  {
    id: 3,
    user: { name: 'David warner', email: 'David@example.com' },
    item: 'The Complete Web Development with Bootstrap',
    amount: 12,
    method: 'stripe',
    date: '2025-05-19',
  },
  {
    id: 4,
    user: { name: 'Amber Domore', email: 'student5@example.com' },
    item: 'Complete Blender Creator: Learn 3D Modelling',
    amount: 69,
    method: 'stripe',
    date: '2025-05-19',
  },
  {
    id: 5,
    user: { name: 'Amber Domore', email: 'student5@example.com' },
    item: 'Melody Guitar Beginner Course',
    amount: 19,
    method: 'stripe',
    date: '2025-05-19',
  },
  {
    id: 6,
    user: { name: 'Amber Domore', email: 'student5@example.com' },
    item: 'The Complete Web Development with Bootstrap',
    amount: 12,
    method: 'stripe',
    date: '2025-05-19',
  },
  {
    id: 7,
    user: { name: 'Amber Domore', email: 'student5@example.com' },
    item: 'Responsive Web Design Essentials - HTML5 CSS Bootstrap',
    amount: 25,
    method: 'stripe',
    date: '2025-05-19',
  },
  {
    id: 8,
    user: { name: 'Riana Hoffman', email: 'student13@example.com' },
    item: 'Complete Blender Creator: Learn 3D Modelling',
    amount: 69,
    method: 'stripe',
    date: '2025-05-19',
  },
  {
    id: 9,
    user: { name: 'Riana Hoffman', email: 'student13@example.com' },
    item: 'Melody Guitar Beginner Course',
    amount: 19,
    method: 'stripe',
    date: '2025-05-19',
  },
  {
    id: 10,
    user: { name: 'Riana Hoffman', email: 'student13@example.com' },
    item: 'The Complete Web Development with Bootstrap',
    amount: 12,
    method: 'stripe',
    date: '2025-05-19',
  },
];

const itemsPerPage = 10;

const PaymentHistory = () => {
  const [payments] = useState(initialPayments);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState(new Date('2025-05-01'));
  const [endDate, setEndDate] = useState(new Date('2025-05-31'));
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered payments
  const filtered = payments.filter(p => {
    const paymentDate = new Date(p.date);
    return (
      (p.user.name.toLowerCase().includes(search.toLowerCase()) ||
        p.user.email.toLowerCase().includes(search.toLowerCase()) ||
        p.item.toLowerCase().includes(search.toLowerCase())) &&
      paymentDate >= startDate && paymentDate <= endDate
    );
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Total amount
  const totalAmount = filtered.reduce((sum, p) => sum + p.amount, 0);

  function exportToCSV(payments) {
    const headers = ['User', 'Email', 'Item', 'Paid amount', 'Payment Method', 'Purchased date'];
    const rows = payments.map(p => [p.user.name, p.user.email, p.item, '₹' + p.amount, p.method, p.date]);
    let csvContent = 'data:text/csv;charset=utf-8,'
      + headers.join(',') + '\n'
      + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'payment_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <Nav />
      <Bannertemp value={"Dashboard"} />
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="lg:w-64">
          <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"} />
        </div>
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold">Purchase History</h1>
            </div>

            {/* Table Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 px-8">
              <button
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 flex items-center gap-2 w-fit"
                onClick={() => exportToCSV(filtered)}
              >
                <FaFileExport /> Export
              </button>
              <div className="flex gap-2 w-full md:w-auto  items-center">
                <input
                  type="text"
                  placeholder="Search user, item..."
                  className="border border-gray-300 rounded px-4 py-2 w-full md:w-80"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd/MM/yyyy"
                  className="border border-gray-300 rounded px-4 py-2 w-36 focus:outline-none"
                  placeholderText="Start Date"
                />
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="dd/MM/yyyy"
                  className="border border-gray-300 rounded px-4 py-2 w-36 focus:outline-none"
                  placeholderText="End Date"
                />
               
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">User</th>
                    <th className="px-4 py-3 text-left">Item</th>
                    <th className="px-4 py-3 text-left">Paid amount</th>
                    <th className="px-4 py-3 text-left">Payment Method</th>
                    <th className="px-4 py-3 text-left">Purchased date</th>
                    <th className="px-4 py-3 text-left">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-6 text-gray-400">No data found.</td>
                    </tr>
                  )}
                  {currentItems.map((p, idx) => (
                    <tr key={p.id} className="border-t">
                      <td className="px-4 py-3">{indexOfFirstItem + idx + 1}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500">
                            {p.user.name[0]}
                          </div>
                          <div>
                            <div className="font-medium">{p.user.name}</div>
                            <div className="text-xs text-gray-500">{p.user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{p.item}</td>
                      <td className="px-4 py-3 ">₹ {p.amount}  </td>
                      <td className="px-4 py-3">{p.method}</td>
                      <td className="px-4 py-3">{new Date(p.date).toLocaleDateString('en-GB')}</td>
                      <td className="px-4 py-3">
                        <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded">
                          <BsPrinter className="text-xl text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Total row */}
                <tfoot>
                  <tr className='flex w-full items-end'>
                    <td colSpan="3"></td>
                    <td className="px-4 py-3 font-bold">Total : ₹ {totalAmount}  </td>
                    <td colSpan="3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 px-4">
              <div className="text-sm text-gray-600">
                Showing {filtered.length === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filtered.length)} of {filtered.length} data
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
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;