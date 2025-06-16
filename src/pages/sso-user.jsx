import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../config";
import { useDispatch } from "react-redux";
import { addBusiness } from "../redux/businessSlice";
const User = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("Checking for Bussiness User...");
  const [loader, setloader] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      setloader(true);

      const key = await new Promise((resolve, reject) => {
        function handleMessage({ data }) {
          if (data.message === "REQUEST_USER_DATA_RESPONSE") {
            clearTimeout(timeout);
            window.removeEventListener("message", handleMessage);
            resolve(data.payload);
          }
        }
        window.parent.postMessage({ message: "REQUEST_USER_DATA" }, "*");
        window.addEventListener("message", ({ data }) => {
          if (data.message === "REQUEST_USER_DATA_RESPONSE") {
            resolve(data.payload);
          }
        });
        const timeout = setTimeout(() => {
          window.removeEventListener("message", handleMessage);
          reject(new Error("Timeout waiting for session key"));
        }, 20000);
      });

      
      try {
        if (key) {
          const res = await axios.post(
            `${serverUrl}/api/ghl/decrypt-sso`,
            { key },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (res.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data?.data?.token}`;
            dispatch(addBusiness(res.data?.data));
            if (!res.data?.data?.activeLocation) {
              setMessage("Please Select Account!");
              setloader(false);
            }
          }
        }
      } catch (error) {
 
        setloader(false);
        setMessage("Please Select Account!");
      }
    };




    dispatch(
      addBusiness({
        "_id":  "670df4ccde73685062dfd38d",
        "userName": "umair athar",
        "companyId": "7GrJlYP1RJIPNfvRRu0A",
        "email": "umair.athar@fabtechsol.com",
        "role": "admin",
        "type": "account",
        "userId": "V5swzza3x6Kn2aiZKgx9",
        "activeLocation": "0jQTjZGZtQVVMfXpRN6D",
        "token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVtYWlyLmF0aGFyQGZhYnRlY2hzb2wuY29tIiwiaWQiOiI2NzBkZjRjY2RlNzM2ODUwNjJkZmQzOGQiLCJidXNpbmVzc0lkIjoiMGpRVGpaR1p0UVZWTWZYcFJONkQiLCJpYXQiOjE3MzY0MjE5MzQsImV4cCI6MzQ4MDYxOTg2OH0.A-KkdqMho4V5SOAd7UvrqNFTHRUIecATHbTidcmAIJg"
      })
    );
    axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVtYWlyLmF0aGFyQGZhYnRlY2hzb2wuY29tIiwiaWQiOiI2NzBkZjRjY2RlNzM2ODUwNjJkZmQzOGQiLCJidXNpbmVzc0lkIjoiMGpRVGpaR1p0UVZWTWZYcFJONkQiLCJpYXQiOjE3MzY0MjE5MzQsImV4cCI6MzQ4MDYxOTg2OH0.A-KkdqMho4V5SOAd7UvrqNFTHRUIecATHbTidcmAIJg`;
    fetchUserData();
  }, []);

  // if (loading) {
  //     return <div>Loading...</div>;
  // }

  return (
    <>
      <div className="min-h-screen flex">
        {/* Left side with background image */}
        <div
          className="relative w-full md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: 'url("/assets/26.jpg")' }}
        >
          <div className="flex items-center justify-center h-full bg-black bg-opacity-30">
            <div className="text-center">
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                <img
                  src="/assets/VEXiON Logo.svg"
                  alt="Vexio Logo"
                  className="h-24 w-34"
                />
                <h1 className="text-white text-3xl md:text-2xl lg:text-3xl leading-10 mt-10">
                  Digital Loyalty Platform <br />
                  Based on Apple Wallet and Google Pay
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            {loader && (
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4" />
            )}
            <p className="text-green-900 font-semibold text-xl">{message}</p>
          </div>
        </div>
      </div>

      {/* <Loader /> */}
    </>
  );
};

export default User;
