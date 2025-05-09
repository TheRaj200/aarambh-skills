import { useState } from "react";
import Nav from "../Common/Nav";
import Bannertemp from "../AboutPage/Bannertemp";
import { useNavigate } from "react-router-dom";

export default function Forgetpass() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://arambhskills-zxut.onrender.com/auth/send_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();


      if (response.ok) {
        // Store the token in localStorage
        if (data.token) {
          localStorage.setItem('resetToken', data.token);
         
        }
        // Navigate to ForgetpassOtp page
        navigate("/forgetpass-otp");
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
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
      <Bannertemp value={"Forget Password"} />
      <div className="flex items-center py-36 justify-center p-4">
        <div className="relative max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <img src="/images/Login.png" alt="Educational illustration" className="w-full h-auto" />
          </div>

          <div className="w-full max-w-md mx-auto space-y-6">
            <h2 className="text-3xl text-center font-bold text-black">Forget Password</h2>
            <div className="text-center flex flex-col gap-4 md:text-left">
              <p className="mt-2 text-lg text-center text-gray-600">
                Please enter your email to receive an OTP
              </p>
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your Email"
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full mt-6 py-2 rounded-md text-lg font-medium text-white bg-[#020A47]"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

