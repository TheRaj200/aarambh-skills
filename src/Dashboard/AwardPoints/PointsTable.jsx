import React, { useState, useEffect } from 'react'
import { GrNext, GrPrevious } from "react-icons/gr";

const data = [
  {
    Title: "Withdraw points",
    Points: "5852",
    Type: "Course Buy ",
    Date: "28 February 2025 04:50",

  },
  {
    Title: "Purchase",
    Points: "165",
    Type: "Earn",
    Date: "08 February 2025 02:50",

  },
  {
    Title: "Course Review (Rate)",
    Points: "165",
    Type: "Earn",
    Date: "02 February 2025 02:50",
  },
  {
    Title: "Course Completion",
    Points: "250",
    Type: "Earn",
    Date: "15 January 2025 10:30",
  },
  {
    Title: "Referral Bonus",
    Points: "500",
    Type: "Earn",
    Date: "10 January 2025 14:20",
  },
  {
    Title: "Quiz Completion",
    Points: "100",
    Type: "Earn",
    Date: "05 January 2025 09:15",
  },
  {
    Title: "Withdraw points",
    Points: "2000",
    Type: "Course Buy",
    Date: "28 December 2024 16:45",
  },
  {
    Title: "Daily Login",
    Points: "50",
    Type: "Earn",
    Date: "20 December 2024 08:00",
  },
  {
    Title: "Forum Participation",
    Points: "75",
    Type: "Earn",
    Date: "15 December 2024 11:30",
  },
  {
    Title: "Course Completion",
    Points: "300",
    Type: "Earn",
    Date: "10 December 2024 13:45",
  },
  {
    Title: "Withdraw points",
    Points: "1500",
    Type: "Course Buy",
    Date: "05 December 2024 17:20",
  },
  {
    Title: "Course Review (Rate)",
    Points: "150",
    Type: "Earn",
    Date: "01 December 2024 14:10",
  },
  {
    Title: "Course Completion",
    Points: "250",
    Type: "Earn",
    Date: "15 January 2025 10:30",
  },
  {
    Title: "Referral Bonus",
    Points: "500",
    Type: "Earn",
    Date: "10 January 2025 14:20",
  },
  {
    Title: "Quiz Completion",
    Points: "100",
    Type: "Earn",
    Date: "05 January 2025 09:15",
  },
  {
    Title: "Withdraw points",
    Points: "2000",
    Type: "Course Buy",
    Date: "28 December 2024 16:45",
  },
  {
    Title: "Daily Login",
    Points: "50",
    Type: "Earn",
    Date: "20 December 2024 08:00",
  },
  {
    Title: "Forum Participation",
    Points: "75",
    Type: "Earn",
    Date: "15 December 2024 11:30",
  },
  {
    Title: "Course Completion",
    Points: "300",
    Type: "Earn",
    Date: "10 December 2024 13:45",
  },
  {
    Title: "Withdraw points",
    Points: "1500",
    Type: "Course Buy",
    Date: "05 December 2024 17:20",
  },
  {
    Title: "Course Review (Rate)",
    Points: "150",
    Type: "Earn",
    Date: "01 December 2024 14:10",
  },
  {
    Title: "Withdraw points",
    Points: "5852",
    Type: "Course Buy ",
    Date: "28 February 2025 04:50",

  },
  {
    Title: "Purchase",
    Points: "165",
    Type: "Earn",
    Date: "08 February 2025 02:50",

  },
  {
    Title: "Course Review (Rate)",
    Points: "165",
    Type: "Earn",
    Date: "02 February 2025 02:50",
  },
  {
    Title: "Course Completion",
    Points: "250",
    Type: "Earn",
    Date: "15 January 2025 10:30",
  },
  {
    Title: "Referral Bonus",
    Points: "500",
    Type: "Earn",
    Date: "10 January 2025 14:20",
  },
  {
    Title: "Quiz Completion",
    Points: "100",
    Type: "Earn",
    Date: "05 January 2025 09:15",
  },
  {
    Title: "Withdraw points",
    Points: "2000",
    Type: "Course Buy",
    Date: "28 December 2024 16:45",
  },
  {
    Title: "Daily Login",
    Points: "50",
    Type: "Earn",
    Date: "20 December 2024 08:00",
  },
  {
    Title: "Forum Participation",
    Points: "75",
    Type: "Earn",
    Date: "15 December 2024 11:30",
  },
  {
    Title: "Course Completion",
    Points: "300",
    Type: "Earn",
    Date: "10 December 2024 13:45",
  },
  {
    Title: "Withdraw points",
    Points: "1500",
    Type: "Course Buy",
    Date: "05 December 2024 17:20",
  },
  {
    Title: "Course Review (Rate)",
    Points: "150",
    Type: "Earn",
    Date: "01 December 2024 14:10",
  },
  {
    Title: "Course Completion",
    Points: "250",
    Type: "Earn",
    Date: "15 January 2025 10:30",
  },
  {
    Title: "Referral Bonus",
    Points: "500",
    Type: "Earn",
    Date: "10 January 2025 14:20",
  },
  {
    Title: "Quiz Completion",
    Points: "100",
    Type: "Earn",
    Date: "05 January 2025 09:15",
  },
  {
    Title: "Withdraw points",
    Points: "2000",
    Type: "Course Buy",
    Date: "28 December 2024 16:45",
  },
  {
    Title: "Daily Login",
    Points: "50",
    Type: "Earn",
    Date: "20 December 2024 08:00",
  },
  {
    Title: "Forum Participation",
    Points: "75",
    Type: "Earn",
    Date: "15 December 2024 11:30",
  },
  {
    Title: "Course Completion",
    Points: "300",
    Type: "Earn",
    Date: "10 December 2024 13:45",
  },
  {
    Title: "Withdraw points",
    Points: "1500",
    Type: "Course Buy",
    Date: "05 December 2024 17:20",
  },
  {
    Title: "Course Review (Rate)",
    Points: "150",
    Type: "Earn",
    Date: "01 December 2024 14:10",
  }
]

const Table = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setCertificates(data);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(certificates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = certificates.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Skeleton loading component
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </td>
    </tr>
  );

  // Generate page numbers
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={` px-3 py-1 md:scale-125 flex items-center  shadow-lg justify-center rounded-full  ${currentPage === i
              ? 'bg-[#020A47] text-white'
              : 'bg-white text-[#020A47] border border-gray-300'
            }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className='w-full p-4 mt-8'>
      <h1 className='text-2xl font-bold text-[#020A47] mb-6'>Points & Rewards Statistics</h1>
      <div className='w-full bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-[#020A47] text-white'>
              <tr>
                <th className='px-6 py-3 text text-center- text-xs font-bold uppercase tracking-wider'>Title</th>
                <th className='px-6 py-3 text text-center- text-xs font-bold uppercase tracking-wider'>Points</th>
                <th className='px-6 py-3 text text-center- text-xs font-bold uppercase tracking-wider'>Type </th>
                <th className='px-6 py-3 text text-center- text-xs font-bold uppercase tracking-wider'>Date</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {loading ? (
                // Skeleton loading rows
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : certificates.length === 0 ? (
                // No certificates message
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500 text-lg">
                    No points history available
                  </td>
                </tr>
              ) : (
                // Certificate data
                currentItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900'>{item.Title}</td>
                    <td  className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900'>{item.Points}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-center text-sm ${item.Title === "Withdraw points" ? 'text-[#A43232]' : 'text-[#35844F]'}`}>
                      {item.Type}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900'>{item.Date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>


      </div>
      {!loading && certificates.length > 0 && (
        <div className="flex justify-center  w-full  items-center py-4 my-2">
          <div className="flex items-center gap-4 border-[1px]  border-gray-100 shadow-md py-2 px-1   md:px-2.5 rounded-full overflow-hidden">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-3 py-3 shadow-lg  rounded-full ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-white text-[#020A47]'}`}
            >
              <GrPrevious />
            </button>

           <div className='flex gap-4'>
           {renderPageNumbers()}
           </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={` px-3 py-3 shadow-lg rounded-full ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-white text-[#020A47]'}`}
            >
              <GrNext />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Table
