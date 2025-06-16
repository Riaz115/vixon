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
    console.log("how are you")
    // const fetchUserData = async () => {
    //   setloader(true);

    //   const key = await new Promise((resolve, reject) => {
    //     function handleMessage({ data }) {
    //       if (data.message === "REQUEST_USER_DATA_RESPONSE") {
    //         clearTimeout(timeout);
    //         window.removeEventListener("message", handleMessage);
    //         resolve(data.payload);
    //       }
    //     }
    //     window.parent.postMessage({ message: "REQUEST_USER_DATA" }, "*");
    //     window.addEventListener("message", ({ data }) => {
    //       if (data.message === "REQUEST_USER_DATA_RESPONSE") {
    //         resolve(data.payload);
    //       }
    //     });
    //     const timeout = setTimeout(() => {
    //       window.removeEventListener("message", handleMessage);
    //       reject(new Error("Timeout waiting for session key"));
    //     }, 20000);
    //   });

      
    //   try {
    //     if (key) {
    //       const res = await axios.post(
    //         `${serverUrl}/api/ghl/decrypt-sso`,
    //         { key },
    //         {
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );

    //       if (res.status === 200) {
    //         axios.defaults.headers.common['Authorization'] = `Bearer ${res.data?.data?.token}`;
    //         // //console.log("came from server")
    //         // //console.log("res.data?.data", res.data?.data)
    //         dispatch(addBusiness(res.data?.data));
    //         if (!res.data?.data?.activeLocation) {
    //           setMessage("Please Select Account!");
    //           setloader(false);
    //         }
    //       }
    //     }
    //   } catch (error) {
 
    //     setloader(false);
    //     setMessage("Please Select Account!");
    //   }
    // };

   
  
    dispatch(
      addBusiness({
        "_id": "67055968f7e6b13031fa155c",
        "userName": "Ibrara Thar",
        "companyId": "7GrJlYP1RJIPNfvRRu0A",
        "email": "ibrarathar0007@gmail.com",
        "role": "admin",
        "type": "account",
        "userId": "5X9uWRUKvQBMr7MszoDn",
        "activeLocation": "0jQTjZGZtQVVMfXpRN6D",
        "createdAt": {
          "$date": "2024-10-08T16:10:16.081Z"
        },
        "updatedAt": {
          "$date": "2024-12-24T06:58:39.841Z"
        },
        "__v": 0,
        "passIdentifier": "pass.one.vexioncards.loyalty",
        "keyId": "94Q68VCF4A",
        "signerKeyPassPhrase": "password",
        "teamIdentifier": "H4V9L4WC5C",
        "allFieldFill": true,
        "signerCert": {
          "location": "https://vexion-storage.s3.eu-central-1.amazonaws.com/certificates%2F67055968f7e6b13031fa155c%2FsignerCert.pem",
          "key": "certificates/67055968f7e6b13031fa155c/signerCert.pem"
        },
        "signerKey": {
          "location": "https://vexion-storage.s3.eu-central-1.amazonaws.com/certificates%2F67055968f7e6b13031fa155c%2FsignerKey.pem",
          "key": "certificates/67055968f7e6b13031fa155c/signerKey.pem"
        },
        "wwdrp": {
          "location": "https://vexion-storage.s3.eu-central-1.amazonaws.com/certificates%2F67055968f7e6b13031fa155c%2Fwwdrp.pem",
          "key": "certificates/67055968f7e6b13031fa155c/wwdrp.pem"
        },
        "AuthKey": {
          "location": "https://vexion-storage.s3.eu-central-1.amazonaws.com/certificates%2F67055968f7e6b13031fa155c%2FAuthKey_94Q68VCF4A.p8",
          "key": "certificates/67055968f7e6b13031fa155c/AuthKey_94Q68VCF4A.p8"
        },
       "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpYXp0YWxoYTk2OEBnbWFpbC5jb20iLCJpZCI6IjY3MDJkZGQ2NGZiYjcxYzFhZjk5OWRkMiIsImJ1c2luZXNzSWQiOiJFeVBENUhmOTZQZ2JsTENtMjlmWiIsImlhdCI6MTczNTU0NTU1NywiZXhwIjozNDc4ODY3MTE0fQ.6mO41W8orzyIYBnYu3zWHJcUZR-_fM-MhpmCyNQvzpE"
      })
    );
    axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpYXp0YWxoYTk2OEBnbWFpbC5jb20iLCJpZCI6IjY3MDJkZGQ2NGZiYjcxYzFhZjk5OWRkMiIsImJ1c2luZXNzSWQiOiJFeVBENUhmOTZQZ2JsTENtMjlmWiIsImlhdCI6MTczNTU0NTU1NywiZXhwIjozNDc4ODY3MTE0fQ.6mO41W8orzyIYBnYu3zWHJcUZR-_fM-MhpmCyNQvzpE`;
    
    // fetchUserData();
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
