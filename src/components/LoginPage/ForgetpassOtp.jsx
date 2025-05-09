import { useState, useEffect } from "react";
import Nav from "../Common/Nav";
import Bannertemp from "../AboutPage/Bannertemp";
import { FaEdit, FaExclamationCircle } from "react-icons/fa";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

export default function ForgetpassOtp() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [otpSent, setOtpSent] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Check for token on component mount
    const token = localStorage.getItem('resetToken') || searchParams.get('token');
   

    if (token) {
      // If token exists in URL but not in localStorage, store it
      if (!localStorage.getItem('resetToken') && token) {
        localStorage.setItem('resetToken', token);
      }
      
      // Start the timer
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setError("No reset token found. Please request a new OTP.");
    
      if (location.pathname !== '/forget-password') {
        setTimeout(() => {
          navigate('/forget-password');
        }, 2000);
      }
    }
  }, [otpSent, navigate, location, searchParams]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    
    if (otpCode.length !== 4) {
      setError("Please enter complete OTP");
      return;
    }

    setLoading(true);
    setError("");

    // Get token from localStorage or URL
    const token = localStorage.getItem('resetToken') || searchParams.get('token');
    

    if (!token) {
      setError("No reset token found. Please request a new OTP.");
      setLoading(false);
      if (location.pathname !== '/forget-password') {
        setTimeout(() => {
          navigate('/forget-password');
        }, 2000);
      }
      return;
    }

    try {
      const response = await fetch("https://arambhskills-zxut.onrender.com/auth/verify_otp/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          otp: otpCode,
          token: token
        }),
      });

      
      const data = await response.json();
    

      if (response.ok) {
        setIsVerified(true);
        // Save the new token from response
        if (data.token) {
          localStorage.setItem('resetToken', data.token);
         
        }
        navigate('/forget-reset-password');
      } else {
      
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
    
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    const token = localStorage.getItem('resetToken') || searchParams.get('token');
    if (!token) {
      setError("No reset token found. Please request a new OTP.");
      if (location.pathname !== '/forget-password') {
        setTimeout(() => {
          navigate('/forget-password');
        }, 2000);
      }
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://arambhskills-zxut.onrender.com/auth/resend_otp/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          token: token
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setOtpSent(true);
        setTimer(30);
        setError("");
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <Bannertemp value={"Forget Page"} />
      <div className="flex items-center py-36 justify-center p-4">
        <div className="relative max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="hidden md:block">
            <img src="/images/Login.png" alt="Educational illustration" className="w-full h-auto" />
          </div>

          <div className="w-full max-w-md mx-auto space-y-6">
            <h2 className="text-3xl text-center font-bold text-black">Verify OTP</h2>
            <div className="text-center flex flex-col gap-4 md:text-left">
              <p className="mt-2 text-lg text-center text-gray-600">Please enter the OTP sent to your email</p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <FaExclamationCircle className="fill-current h-4 w-4 text-red-500" />
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="flex justify-center md:justify-start gap-8">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    className="w-12 h-12 shadow-lg border-2 rounded text-center text-xl"
                    onFocus={(e) => e.target.select()}
                  />
                ))}
              </div>

              <div className="mt-6 ml-10 md:ml-1 text-sm md:text-lg">
                <span className="border-r-2 px-2 font-bold border-black">
                  {String(Math.floor(timer / 60)).padStart(2, "0")}:
                  {String(timer % 60).padStart(2, "0")}
                </span>
                {otpSent && <span className="text-green-600 ml-2">OTP has been sent.</span>}
              </div>

              <button 
                type="button" 
                onClick={handleResendOTP} 
                className="text-sm ml-12 md:ml-3 text-gray-700 cursor-pointer mt-2" 
                disabled={timer > 0}
              >
                Resend OTP
              </button>

              <button 
                type="submit" 
                className="w-full mt-6 py-2 rounded-md text-lg font-medium text-white bg-[#020A47]"
                disabled={!otp.every(digit => digit !== "")}
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

