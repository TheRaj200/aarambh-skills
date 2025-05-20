import { useEffect, useState } from "react";
import { AiOutlineProject } from "react-icons/ai";
import { FaGraduationCap, FaUsers, FaBook, FaHeart, FaCog, FaHistory, FaUser, FaComments, FaMoneyBill, FaShoppingCart, FaCommentDots, FaHome, FaChartBar, FaChevronDown, FaChevronRight, FaList, FaPlus, FaQuestionCircle, FaProjectDiagram, FaTasks, FaClipboardList } from "react-icons/fa";
import { HiMiniDocumentCurrencyRupee } from "react-icons/hi2";
import { FaChalkboardUser } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { LiaAwardSolid } from "react-icons/lia";
import { PiCertificateFill } from "react-icons/pi";
import { RiShareForwardBoxLine, RiVideoAddLine } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { TbCategoryFilled } from "react-icons/tb";
import { MdLibraryBooks, MdKeyboardArrowDown, MdKeyboardArrowUp, MdAddchart } from "react-icons/md";
import { BiSolidLayer } from "react-icons/bi";

const Sidebar = ({ col }) => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://arambhskills.onrender.com/user/get_user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.status && data.user) {
            setUser({
              id: data.user.id,
              name: data.user.username,
              email: data.user.email,
              isActive: data.user.is_active,
              dateJoined: data.user.date_joined,
              loginMethod: data.user.login_method,
              score: data.user.score
            });
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative top-4 mb-4 left-[85%] z-50 p-2 h-10 rounded-md bg-white shadow-md"
      >
        <IoMenu className="h-6 w-6 text-[#020A47]" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static top-0 right-0 z-50 w-64 h-full bg-white shadow-lg border-gray-50 border-[1px] rounded-l-2xl p-6 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}>
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute  top-4 right-4 p-2 rounded-md hover:bg-gray-100"
        >
          <IoClose className="h-6 w-6 text-[#020A47]" />
        </button>

        <div className="flex flex-col items-center justify-center rounded">
          <img
            src="https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG1vZGVsfGVufDB8fDB8fHww"
            alt="User"
            className="h-14 w-14 rounded-full mb-2"
          />
          {user && (
            <>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </>
          )}
        </div>

        {/* Navigation Menu */}
        <ul className="mt-6 space-y-2 overflow-y-auto h-[60vh] lg:h-fit scrollbar-hide">
          <li onClick={() => handleNavigation('/admin/dashboard')}
            className={`flex items-center space-x-2 text-[#020A47] hover:bg-gray-100 p-2 rounded-lg cursor-pointer ${location.pathname === '/admin/dashboard' ? col : ''}`}>
            <FaHome className="text-lg" />
            <span>Dashboard</span>
          </li>

          <li onClick={() => handleNavigation('/admin/dashboard/category')}
            className={`flex items-center space-x-2 text-[#020A47] hover:bg-gray-100 p-2 rounded-lg cursor-pointer ${location.pathname === '/admin/dashboard/category' ? col : ''}`}>
            <FaUser className="text-lg" />
            <span>Category</span>
          </li>

          <div className="relative">
            <li onClick={() => setIsCourseOpen(!isCourseOpen)}
              className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname.includes('/admin/dashboard/courses') ? col : ''}`}>
              <div className="flex items-center space-x-2">
                <FaBook className="text-lg" />
                <span>Courses</span>
              </div>
              {isCourseOpen ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
            </li>

            {isCourseOpen && (
              <ul className="pl-8 mt-2 space-y-2 border-l-2 border-gray-200">
                <li onClick={() => handleNavigation('/admin/dashboard/manageCourse')}
                  className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/admin/dashboard/manageCourse' ? 'text-[#020A47]' : ''}`}>
                  <FaList className="text-sm" />
                  <span className="text-sm">Manage Courses</span>
                </li>
                <li onClick={() => handleNavigation('/admin/dashboard/courses/add')}
                  className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/admin/dashboard/courses/add' ? 'text-[#020A47]' : ''}`}>
                  <FaPlus className="text-sm" />
                  <span className="text-sm">Add New Course</span>
                </li>
                <li onClick={() => handleNavigation('/admin/dashboard/video/add')}
                  className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/admin/dashboard/video/add' ? 'text-[#020A47]' : ''}`}>
                  <RiVideoAddLine className="text-lg" />
                  <span className="text-sm">Add New Video</span>
                </li>
                <li onClick={() => handleNavigation('/admin/dashboard/quiz/add')}
                  className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/admin/dashboard/quiz/add' ? 'text-[#020A47]' : ''}`}>
                  <FaClipboardList className="text-md" />
                  <span className="text-sm">Add New Quiz</span>
                </li>
                <li onClick={() => handleNavigation('/admin/dashboard/project/add')}
                  className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/admin/dashboard/project/add' ? 'text-[#020A47]' : ''}`}>
                  <MdAddchart className="text-md" />
                  <span className="text-sm">Add New Project</span>
                </li>
              </ul>
            )}
          </div>
          <li onClick={() => handleNavigation('/admin/dashboard/students')}
            className={`flex items-center space-x-2 text-[#020A47] hover:bg-gray-100 p-2 rounded-lg cursor-pointer ${location.pathname === '/admin/dashboard/students' ? col : ''}`}>
            <FaUsers className="text-lg" />
            <span className="text-md">Students enrolled</span>
          </li>
          <li onClick={() => handleNavigation('/admin/dashboard/bundle')}
            className={`flex items-center space-x-2 text-[#020A47] hover:bg-gray-100 p-2 rounded-lg cursor-pointer ${location.pathname === '/admin/dashboard/bundle' ? col : ''}`}>
            <BiSolidLayer className="text-xl" />
            <span>Add Bundle</span>
          </li>

          <li onClick={() => handleNavigation('/admin/dashboard/paymenthistory')}
            className={`flex items-center space-x-2 text-[#020A47] hover:bg-gray-100 p-2 rounded-lg cursor-pointer ${location.pathname === '/admin/dashboard/paymenthistory' ? col : ''}`}>
            <HiMiniDocumentCurrencyRupee className="text-lg" />
            <span>Payement History</span>
          </li>

          <li onClick={() => handleNavigation('/admin/dashboard/settings')}
            className={`flex items-center space-x-2 text-[#020A47] hover:bg-gray-100 p-2 rounded-lg cursor-pointer ${location.pathname === '/admin/dashboard/settings' ? col : ''}`}>
            <FaCog className="text-lg" />
            <span>Settings</span>
          </li>

          <li onClick={() => handleNavigation('/admin/dashboard/projects')}
            className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/admin/dashboard/projects' ? col : ''}`}>
            <AiOutlineProject className="text-xl font-semibold" />
            <span>My Projects</span>
          </li>

          <li onClick={() => handleNavigation('/admin/dashboard/wishlist')}
            className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/admin/dashboard/wishlist' ? col : ''}`}>
            <FaHeart className="text-xl font-semibold" />
            <span>Wishlist</span>
          </li>

          <li onClick={() => handleNavigation('/admin/dashboard/certification')}
            className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${location.pathname === '/admin/dashboard/certification' ? col : ''}`}>
            <PiCertificateFill className="text-xl font-semibold" />
            <span>Certification</span>
          </li>

      
     
         

         

          <li onClick={() => handleNavigation('/')}
            className="flex items-center space-x-2 p-2 text-red-600 rounded-lg hover:bg-gray-100 cursor-pointer">
            <RiShareForwardBoxLine />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;