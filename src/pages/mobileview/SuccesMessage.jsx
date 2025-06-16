import React from "react";
import { useEffect } from "react";

const SuccessMessage = ({ message, setmessage,setBarCodeData }) => {

    useEffect(() => {
        setTimeout(() => {
            setBarCodeData()
            setmessage({
                messagetitle: "",
                messagedescription: "",
                SuccessMessage: false,
                ErrorMessage: false
            })
        }, 2000);
    }, [])
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-11/12 max-w-sm bg-white rounded-2xl shadow-md p-6 text-center">
                {/* Circular Icon */}
                <div className="w-12 h-12 mx-auto flex items-center justify-center bg-blue-100 rounded-full mb-4 cursor-pointer" onClick={() => setmessage({
                    messagetitle: "",
                    messagedescription: "",
                    SuccessMessage: false,
                    ErrorMessage: false
                })}>
                    <img src="/assets/successmessage.svg" alt="success message" />
                </div>

                {/* Title */}
                <h1 className="text-xl font-bold text-black mb-2">{message?.messagetitle}</h1>

                {/* Subtitle */}
                <p className="text-gray-600">{message?.messagedescription}</p>
            </div>
        </div>
    );
};

export default SuccessMessage;
