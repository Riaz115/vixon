import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../Components/Loader/loader";
import { serverUrl } from "../../config";
const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(5).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; 
  useEffect(() => {
    if (!email) {
      navigate("/User-login");
    }
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput && nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Move focus to the previous field
      if (index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput && prevInput.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    if (!/^\d{5}$/.test(pastedText)) return; // Ensure exactly 5 digits

    const newOtp = pastedText.split("");
    setOtp(newOtp);
    const lastInput = document.getElementById(`otp-4`);
    lastInput && lastInput.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.includes("") ) {
      setError("Prosím, vyplňte všetky polia pre overenie kódu .");
      return;
    }

    if(email){
      setLoading(true);
      axios
        .post(`${serverUrl}/api/ghl/verify-otp`, { email, otp: otp?.join('') })
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            toast.success("opt overiť úspešne");  
            navigate("/change-password", { state: { email ,otp: otp?.join('')} });          
          } else {
            toast.error(response.data.message);
          }
        }
      )
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.message);
        })
      }

    setError("");
    // setSuccessMessage("Váš OTP kód bol úspešne overený!");
  };

  const handleResendOtp = () => {
    if (email) {
      setLoading(true);
      axios
        .post(`${serverUrl}/api/ghl/request-otp`, { email })
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            toast.success("opt overiť úspešne"); 
            // navigate("/verify-otp", { state: { email } });        
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.message); // Display error message
        });
        setOtp(Array(5).fill("")); 
    }else{
      toast.error("Email je povinný");
    }
  };

  useEffect(() => {
    if (isResendDisabled && resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer on unmount
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
    }
  }, [isResendDisabled, resendTimer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full sm:w-[24rem]">
        {/* Logo Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-20 mt-10">
            <span className="text-black">VEX</span>
            <span className="text-[#36C6FA]">i</span>ON{" "}
            <span className="text-[#36C6FA]">cards</span>
          </h1>
          <h2 className="mt-4 text-3xl font-semibold">Overenie OTP</h2>
          <p className="mt-2 text-gray-600 mx-2">
            Zadajte 5-miestny overovací kód, ktorý sme vám poslali na váš email.
          </p>
        </div>

        {/* Form Section */}
        <form
          className="space-y-4 p-6 border-t-2 border-gray-300 mt-6 rounded-t-2xl"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-2xl font-bold border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <div>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResendDisabled}
              className="w-full px-4 text-end hover:underline   text-sm text-[#36C6FA] "
            >
            Znovu odoslať OTP
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-gray-800"
            >
              Overiť OTP
            </button>
          </div>
        </form>

      </div>
      <Loader loading={loading} />
    </div>
  );
};

export default VerifyOtp;
