import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig"; 
import Nav from "../Common/Nav";
import Bannertemp from "../AboutPage/Bannertemp";
import OTPVerification from "./OTPVerification";
import Confirmpass from "./Confirmpass";
import { useNavigate, useLocation } from "react-router-dom";

//  Google Auth Provider
const provider = new GoogleAuthProvider();

export default function Joinnow ({ onSubmit = () => {} }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [affiliateId, setAffiliateId] = useState(null);

  // Get affiliate_id from URL when component mounts
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const affiliate_id = searchParams.get('affiliate_id');
    if (affiliate_id) {
      setAffiliateId(affiliate_id);
    }
  }, [location]);

  //  Function to handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}!`);
      setShowConfirmPass(true);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      alert("Google Login Failed!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    navigate('/confirmpass', { state: { phoneNumber, affiliateId } });
  };

  if (showConfirmPass) {
    return <Confirmpass phoneNumber={phoneNumber} affiliateId={affiliateId} />;
  }

  if (showOTP) {
    return <OTPVerification phoneNumber={phoneNumber} onVerify={() => setShowOTP(false)} />;
  }

  return (
    <div>
      <Nav />
      <Bannertemp value={"Join Now"} />
      <div className="flex justify-center bg-white py-36 p-4">
        <div className="max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <img src="/images/Login.png" alt="Educational illustration" className="w-full h-auto" />
          </div>

          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center flex flex-col gap-5 md:gap-10 md:text-left">
              <h2 className="text-2xl lg:text-4xl font-bold text-black">Get Onboard and jumpstart your career!</h2>
              <p className="mt-2 text-sm text-gray-600">Please enter your phone number to login/register</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="relative">
                <div className="flex w-full lg:w-[90%] items-center border-b-2 border-gray-300">
                  <span className="flex w-20 items-center font-semibold text-lg">
                    <img src="/images/india.png" alt="India flag" className="w-6 h-6 mr-1" />
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    className="w-full py-2 pl-2 text-gray-800 focus:outline-none"
                    placeholder="Enter your mobile number"
                    maxLength="10"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="w-full lg:w-[90%] mt-6 py-3 px-4 rounded-md text-sm font-medium text-white bg-[#020A47]" >
                Send OTP
              </button>
              <div className="flex justify-center items-center text-2xl py-1 mt-3 md:w-[90%]  w-full  ">or</div>
            <div className="md:w-[100%] w-full   flex justify-center items-center px-8 cursor-pointer ">
            <div
             onClick={handleGoogleLogin}
             className="flex mt-2 px-4 py-2 drop-shadow-lg hover:shadow-xl font-semibold rounded-lg md:-translate-x-5  justify-center items-center border-2 md:w-[90%] w-full  gap-4">
                <img className="h-5 w-5" src="/images/google.jpg" alt="" />
                <h1>Sign in with Google</h1>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
