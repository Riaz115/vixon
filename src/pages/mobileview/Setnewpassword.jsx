import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation,useNavigate } from "react-router-dom";
import { Loader } from "../../Components/Loader/loader";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../../config";

const Setnewpassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate=useNavigate();
  const email = location.state?.email;
  const otp=location.state?.otp;
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Basic Validation
    if (!password) {
      validationErrors.password = "Heslo je povinné";
    } else if (password.length < 8) {
      validationErrors.password = "Heslo musí mať aspoň 8 znakov";
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = "Potvrdenie hesla je povinné";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Heslá sa nezhodujú";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      axios
        .post(`${serverUrl}/api/ghl/reset-password`, {
          email,
          newPassword:password,
          otp,
        })
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            toast.success(response.data.message);
            navigate("/User-login");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.message); // Display error message
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full sm:w-[24rem]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-black">VEX</span>
            <span className="text-[#36C6FA]">i</span>ON{" "}
            <span className="text-[#36C6FA]">cards</span>
          </h1>
          <h2 className="mt-[10rem] md:mt-6 lg:mt-6 xl:mt-6 mx-2 text-3xl font-semibold">
            Nastavenie nového hesla
          </h2>
          <p className="mt-[2rem] lg:mt-2 md:mt-2 mx-2 text-gray-600">
            Zadajte svoje nové heslo a potvrďte ho nižšie.
          </p>
        </div>

        <div className="border-t-2 border-[#AAAAAA] rounded-t-2xl sm:border-none lg:border-none md:mt-1 mt-[2rem]">
          <form className="space-y-4 p-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nové heslo"
                className={`w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500" : "focus:ring-blue-400"
                }`}
              />
              <span
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-4 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Potvrdiť heslo"
                className={`w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "focus:ring-blue-400"
                }`}
              />
              <span
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="absolute right-3 top-4 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-gray-800"
              >
                Nastaviť heslo
              </button>
            </div>

            {successMessage && (
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
      <Loader loading={loading} />
    </div>
  );
};

export default Setnewpassword;

