import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import toast from "react-hot-toast";
import { Loader } from "../../Components/Loader/loader";
import { useNavigate } from "react-router-dom";
const Resetsendmail = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!email) {
      validationErrors.email = "Email je povinný";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Neplatná emailová adresa";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      axios
        .post(`${serverUrl}/api/ghl/request-otp`, { email })
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            toast.success(response.data.message);  
            navigate("/verify-otp", { state: { email } });          
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          if(error.response.data.message){
            toast.error(error.response.data.message); // Display error message
          }
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
        <h2 className="mt-[10rem] md:mt-6 lg:mt-6 xl:mt-6 text-3xl font-semibold">
          Resetovanie hesla
        </h2>
        <p className="mt-[2rem] lg:mt-2 md:mt-2 mx-2 text-gray-600">
          Zadajte svoju emailovú adresu a my vám pošleme pokyny na
          resetovanie hesla.
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
              className={`w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "focus:ring-blue-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-gray-800"
            >
              Odoslať
            </button>
          </div>
          {successMessage && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
              {successMessage}
            </div>
          )}
        </form>
      </div>

      {/* Back to Login Section */}
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate('/Accessaccount')}
          className=" text-sm text-[#36C6FA] hover:underline"
        >
          ← Späť na Prihlásenie
        </button>
      </div>
    </div>
    <Loader loading={loading} />
  </div>
  
  );
};

export default Resetsendmail;
