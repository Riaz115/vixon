import React, { useState, useEffect } from "react";
import { serverUrl } from "../../config";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../../Components/Loader/loader";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Basic Validation
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email address";
    }

    if (!password) {
      validationErrors.password = "Heslo is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const response = await axios.post(`${serverUrl}/api/ghl/user-login`, {
          email,
          password,
        });
        //console.log(response, "this is response of user login");
        if (response.status === 200) {
          setLoading(false);
          // console.log(response.data?.data?.token, "this is token")
          localStorage.setItem("mytoken", response.data?.data?.token);
          toast.success("Login successful");
          navigate("/mobilescanner")
        } else {
          setLoading(false);
          toast.error(response?.data?.message);
        }

      } catch (error) {
        setLoading(false);;
        toast.error(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("mytoken");
    //console.log(userToken, "this is user token")
    // setAuthToken(userToken)
    if (userToken) {
      //console.log("user token not found", userToken)
      navigate("/mobilescanner")
    }
  }, []);

  const handleResetPassword = () => {
    alert("Reset Password functionality goes here.");
    // Add your reset password logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full sm:w-[24rem]  ">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-black">VEX</span>
            <span className="text-[#36C6FA]">i</span>ON{" "}
            <span className="text-[#36C6FA]">cards</span>
          </h1>
          <h2 className="mt-[10rem] md:mt-6 lg:mt-6 xl:mt-6 text-3xl font-semibold">
            Vitajte späť
          </h2>
          <p className="mt-[2rem] lg:mt-2 md:mt-2 text-gray-600">
            <span className="font-bold">Prihláste </span>sa do svojho účtu
          </p>
        </div>

        <div className="border-t-2 border-[#AAAAAA] rounded-t-2xl sm:border-none lg:border-none md:mt-1 mt-[2rem]">
          <form className="space-y-4 p-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={`w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 ${errors.email ? "border-red-500" : "focus:ring-blue-400"
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Heslo"
                className={`w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 ${errors.password ? "border-red-500" : "focus:ring-blue-400"
                  }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="text-end text-sm">
              <button
                type="button"
                onClick={() => navigate("/resetsendmail")}
                className="text-blue-500 hover:underline"
              >
                Reset Password
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-gray-800"
              >
                Prihlásiť sa
              </button>
            </div>

          </form>
        </div>
      </div>
      <Loader loading={loading} />
    </div>
  );
};

export default UserLogin;
