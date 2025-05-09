import React, { useState, useEffect } from 'react'

const ticket = {
    open: 1,
    inprogress: 2,
    answered: 3,
    onhold: 0,
    closed: 4,
}

const data = [
    {
        srno: 1,
        name: "John Doe",
        department: "IT",
        subject: "Ticket Subject",
        priority: "High",
        status: "Open",
        date: "2021-01-01",
        lastreply: "Course not showing",
        created: "2021-01-01",
    },
    {
        srno: 2,
        name: "John Doe",
        department: "IT",
        subject: "Ticket Subject",
        priority: "High",
        status: "In-Progress",
        date: "2021-01-01",
        lastreply: "Payment done but not show ",
        created: "2021-01-01",
    }
]

const Details = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setTickets(data);
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

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
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </td>
        </tr>
    );

    return (
        <div className='w-full p-12 drop-shadow-lg border-[1px] border-gray-100 rounded-lg shadow-lg px-4 '>
            <h1 className='text-2xl font-bold text-[#020A47] mb-6'>Tickets Summary</h1>
            <div className='flex justify-between flex-wrap px-8 w-full gap-4 border-b-[1px] border-gray-500 mb-6'>
                <h1 className='text-xl font-bold text-[#020A47] mb-6'>{ticket.open} <span className=' text-[#CC1414]'>open</span></h1>
                <h1 className='text-xl font-bold text-[#020A47] mb-6'>{ticket.inprogress} <span className=' text-[#35844F]'>In-progress</span></h1>
                <h1 className='text-xl font-bold text-[#020A47] mb-6'>{ticket.answered} answered</h1>
                <h1 className='text-xl font-bold text-[#020A47] mb-6'>{ticket.onhold} on hold</h1>
                <h1 className='text-xl font-bold text-[#020A47] mb-6'>{ticket.closed} closed</h1>
            </div>
            <div className='w-full bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-[#020A47] text-white'>
                            <tr>
                                <th className='px-6 py-3  text-xs font-medium uppercase tracking-wider'>Sr.No</th>
                                <th className='px-6 py-3  text-xs font-medium uppercase tracking-wider'>Name</th>
                                <th className='px-6 py-3  text-xs font-medium uppercase tracking-wider'>Department</th>
                                <th className='px-6 py-3  text-xs font-medium uppercase tracking-wider'>Subject</th>
                                <th className='px-6 py-3  text-xs font-medium uppercase tracking-wider'>Priority</th>
                                <th className='px-6 py-3  text-xs font-medium uppercase tracking-wider'>Status</th>
                                <th className='px-6 py-3  text-xs font-medium uppercase tracking-wider'>Last Reply</th>
                                <th className='px-6 py-3  text-xs font-medium uppercase tracking-wider'>Created</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {loading ? (
                                <>
                                    <SkeletonRow />
                                    <SkeletonRow />
                                    <SkeletonRow />
                                </>
                            ) : tickets.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-10 text-center text-gray-500 text-lg">
                                        No tickets available
                                    </td>
                                </tr>
                            ) : (
                                tickets.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900'>{item.srno}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900'>{item.name}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900'>{item.department}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900'>{item.subject}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900'>{item.priority}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-center text-sm ${item.status === 'Open' ? 'text-[#CC1414]' : item.status === 'In-Progress' ? 'text-[#35844F]' : item.status === 'Answered' ? 'text-[#020A47]' : item.status === 'On Hold' ? 'text-[#FFA500]' : item.status === 'Closed' ? 'text-[#008000]' : ''}`}>{item.status}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-center text-sm  w-[100px] text-gray-900'>{item.lastreply}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900'>{item.created}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Details
