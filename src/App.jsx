import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Common/Footer.jsx';
import HomePage from './components/HomePage.jsx';
import CoursesPage from './components/CoursesPage.jsx';
import BundlesPage from './components/BundlesPage.jsx';
import AboutPage from './components/AboutPage.jsx';
import CourseDetailsPage from './components/CourseDetails/CourseDetails.jsx';
import Checkout from "./components/Common/Checkout.jsx";
import Practice from './components/PracticePage/Practice.jsx';
import QuizPage from './components/PracticePage/QuizPage.jsx';
import Confirmpass from './components/LoginPage/Confirmpass.jsx';
import Joinnow from './components/LoginPage/Joinnow.jsx';
import Login from './components/LoginPage/Login.jsx';
import ForgetResetPassword from './components/LoginPage/ForgetResetPassword.jsx';
import Forgetpass from './components/LoginPage/Forgetpass.jsx';
import Forgetpassotp from './components/LoginPage/ForgetpassOtp.jsx';
import ProtectedRoute from './components/Common/ProtectedRoute.jsx';
import Nav from './components/Common/Nav.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import AdminDashboard from './AdminDashboard/DashboardPage/Dashboard.jsx';
import Chat from './Chatbot/Chat.jsx';
import DashboardPractice from './Dashboard/PracticePage/Practice.jsx';
import MyCourses from './Dashboard/MyCourses/MyCourses.jsx';
import CourseDetails from './Dashboard/MyCourses/CourseDetails.jsx';
import MyProject from './Dashboard/MyProject/MyProject.jsx'
import Wishlist from './Dashboard/Wishlist/Wishlist.jsx';
import AwardPoints from './Dashboard/AwardPoints/AwardPoints.jsx'
import Certification from './Dashboard/Certification/Certification.jsx';
import PurchaseHistory from './Dashboard/PurchaseHistory/PurchaseHistory.jsx';
import Affiliate from './Dashboard/Affiliate/Affiliate.jsx';
import Setting from './Dashboard/Setting/Setting.jsx';
import Support from './Dashboard/Support/Support.jsx';
import TicketDetails from './Dashboard/Support/TicketDetails.jsx';
import Payout from './AdminDashboard/Payout/Payout.jsx';

import AddCourse from './AdminDashboard/Courses/AddNewCourse/AddCourse.jsx';
import Category from './AdminDashboard/Category/CategoryPage.jsx';
import ManageCourse from './AdminDashboard/Courses/ManageCourse/ManageCourse.jsx';
import AddQuiz from './AdminDashboard/Courses/AddNewQuiz/AddQuiz.jsx'
import AddProject from './AdminDashboard/Courses/AddNewProject/AddProject.jsx';
import AddNewVideo from './AdminDashboard/Courses/AddNewVideo/AddNewVideo.jsx';
import EditCourse from './AdminDashboard/Courses/ManageCourse/EditCourse/EditCourse.jsx';
import Students from './AdminDashboard/Students/Students.jsx';
import AddStudent from './AdminDashboard/Students/addStudent.jsx';
import EditStudent from './AdminDashboard/Students/EditStudent.jsx';
import CourseBundle from './AdminDashboard/CourseBundle/CourseBundle.jsx';
import AddBundle from './AdminDashboard/CourseBundle/AddBundle.jsx';
import PaymentHistory from './AdminDashboard/PaymentHistory/PaymentHistory.jsx';
import ManageLetters from './AdminDashboard/NewsLetter/ManageLetters.jsx';
import NewsLetter from './AdminDashboard/NewsLetter/NewsLetter.jsx';
import PayemnetPage from './AdminDashboard/PaymentHistory/PaymentPage.jsx';
import PaymentPage from './AdminDashboard/PaymentHistory/PaymentPage.jsx';

const App = () => {
  const [cartCount, setCartCount] = useState(0);

  const incrementCartCount = () => {
    setCartCount(cartCount + 1);
  };

  const decrementCartCount = () => {
    setCartCount(cartCount > 0 ? cartCount - 1 : 0);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<Forgetpass />} />
            <Route path="/forgetpass-otp" element={<Forgetpassotp />} />
            <Route path="/forget-reset-password" element={<ForgetResetPassword />} />
            <Route path="/joinnow" element={<Joinnow />} />
            <Route path="/confirmpass" element={<Confirmpass />} />
            <Route path="/courses" element={<CoursesPage incrementCartCount={incrementCartCount} />} />
            <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
            <Route path="/checkout" element={<ProtectedRoute element={Checkout} />} />
            <Route path="/bundles" element={<BundlesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/practice" element={<ProtectedRoute element={Practice} />} />
            <Route path="/quiz/:topicName" element={<QuizPage />} />

            // Dashboard routes
            <Route path="/chat" element={<Chat />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/practice" element={<DashboardPractice />} />
            <Route path="/dashboard/mycourses" element={<MyCourses />} />
            <Route path="/dashboard/projects" element={<MyProject />} />
            <Route path="/dashboard/wishlist" element={<Wishlist />} />
            <Route path="/dashboard/award-points" element={<AwardPoints />} />
            <Route path="/dashboard/purchase-history" element={<PurchaseHistory />} />
            <Route path="/dashboard/certification" element={<Certification />} />
            <Route path="/dashboard/affiliate" element={<Affiliate />} />
            <Route path="/dashboard/setting" element={<Setting />} />
            <Route path="/dashboard/support" element={<Support />} />
            <Route path="/dashboard/support/ticket-details" element={<TicketDetails />} />
            <Route path="/dashboard/courses/:courseId" element={<CourseDetails />} />



            // Admin Dashboard routes
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/dashboard/category" element={<Category/>} />
            <Route path="/admin/dashboard/manageCourse" element={<ManageCourse/>} />
            <Route path="/admin/withdrawal/request" element={<Payout />} />
            <Route path="/admin/dashboard/courses/add" element={<AddCourse />} />
            <Route path="/admin/dashboard/quiz/add" element={<AddQuiz />} />
            <Route path="/admin/dashboard/project/add" element={<AddProject />} />
            <Route path="/admin/dashboard/video/add" element={<AddNewVideo />} />
            <Route path="/admin/dashboard/courseedit" element={<EditCourse />} />
            <Route path="/admin/dashboard/students" element={<Students />} />
            <Route path="/admin/dashboard/students/add" element={<AddStudent />} />
            <Route path="/admin/dashboard/students/Edit" element={<EditStudent />} />
            <Route path="/admin/dashboard/bundle" element={<AddBundle />} />
            <Route path="/admin/dashboard/paymenthistory" element={<PaymentPage />} />
            <Route path="/admin/dashboard/newsletter" element={<NewsLetter />} />


          </Routes>




        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;