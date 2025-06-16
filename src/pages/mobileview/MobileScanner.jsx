import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Addcustomer, selectcustomers } from "../../redux/customerSlice";
import { useSelector } from "react-redux";
import { selectBusinesses } from "../../redux/businessSlice";
import { getallcustomers, getalltransaction } from "../../api/createstamp";
import { useDispatch } from "react-redux";
import { Loader } from "../../Components/Loader/loader";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Addtransaction } from "../../redux/transactionSlice";
import Mobilecustomerview from "./Mobilecustomerview";
import SuccessMessage from "./SuccesMessage";
import ErrorMessage from "./ErrorMessage";
import SidebarModal from "./SidebarModal";
import OnScreen from "./OnScreen";
import axios from "axios";
import { serverUrl } from "../../config";
import BouncingBubbles from "./Bouncingbubbles";

const MobileScanner = () => {
    const [step, setStep] = useState();
    const [previous, setPrevious] = useState(8);
    const [on, setOn] = useState(false)
    const [nav, setNav] = useState();
    const businessdata = useSelector(selectBusinesses);
    const dispatch = useDispatch()
    const [barcodeData, setBarCodeData] = useState();
    const Navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [message, setmessage] = useState({
        SuccessMessage: false,
        ErrorMessage: false,
        messagetitle: "",
        messagedescription: ""
    })





    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization']; // Remove the token if not provided
        }
    };

    useEffect(() => {
        const userToken = localStorage.getItem("mytoken");
        // //console.log(userToken, "this is user token")
        setAuthToken(userToken)
        if (!userToken) {
            //console.log("user token not found", userToken)
            Navigate("/Accessaccount")
        } else {
          
            const steppage = localStorage.getItem("stepno");
            if (steppage === "true") {
                setStep(7);
            }else{
                setStep(0)
                setNav(7)
            }
        }
    }, []);



    // useEffect(() => {
    //     const keepFocus = () => {
    //         if(on===false){

    //             setOn(true)
    //         }
    //     };

    //     document.addEventListener("click", keepFocus);

    //     return () => {
    //         document.removeEventListener("click", keepFocus);
    //     };
    // }, []);
    // //console.log("Qr code data", barcodeData)

    // console.log(step, "this is step data")

    return (
        <>
            {step !== undefined && <div>

                {step === 0 || step === 1 || step === 2 || step === 3 || step === 4 || step === 5 || step === 6 ? (
                    <OnScreen setStep={setStep} step={step} setPrevious={setPrevious} setNav={setNav} nav={nav} />
                ) : step === 7 ? (
                    barcodeData ? (
                        !message?.SuccessMessage && !message?.ErrorMessage ? (
                            <Mobilecustomerview
                                data={barcodeData}
                                setBarCodeData={setBarCodeData}
                                setmessage={setmessage}
                            />
                        ) : message?.SuccessMessage ? (
                            <SuccessMessage message={message} setmessage={setmessage} setBarCodeData={setBarCodeData} />
                        ) : (
                            <ErrorMessage setmessage={setmessage} setBarCodeData={setBarCodeData} />
                        )
                    ) : (
                        <>
                            <div className=" w-screen flex  bg-gray-100">
                                <div className="w-full bg-white flex flex-col">
                                    {/* Header */}
                                    <div className="flex justify-between items-center px-4 py-2">
                                        <img
                                            src="/assets/logoblack.svg"
                                            alt="Company Logo"
                                            className="h-7"
                                        />
                                        <button className="p-1" onClick={() => {
                                            setPrevious(step)
                                            setStep(8)
                                        }}>
                                            <img src="/assets/Group_1.svg" alt="Menu Icon" />
                                        </button>
                                    </div>
                                    {/* Main Content */}
                                    <div className="flex mt-10 justify-center items-center" >
                                        <BouncingBubbles on={on} setOn={setOn} />
                                    </div>

                                </div>
                            </div>
                            {/* Additional Components */}
                            <motion.div initial="initial" animate="animate" exit="exit">
                                <BarcodeScannerInput setBarCodeData={setBarCodeData} on={on} setOn={setOn} />
                                <Loader loading={loading} />
                            </motion.div>
                        </>
                    )
                ) : (
                    <SidebarModal setStep={setStep} previous={previous} setNav={setNav} />
                )}
            </div>}
        </>


    );
};

export default MobileScanner;
const BarcodeScannerInput = ({ setBarCodeData, on, setOn }) => {
    const inputRef = useRef(null);
    const [barcodeValue, setBarcodeValue] = useState("");

    useEffect(() => {
        const handleKeydown = (event) => {
            //console.log("Key pressed:", event?.key);

            if (event?.key === "Shift" || event?.ctrlKey || event?.altKey || event?.metaKey) {
                return; // Ignore control keys
            }

            if (event?.key === "Enter") {
                //console.log("Enter pressed, barcode value:", barcodeValue);
                const scannedData = barcodeValue.trim();
                setBarCodeData(scannedData); // Pass scanned data to parent
                setBarcodeValue(""); // Clear for next scan
            } else {
                setBarcodeValue((prevBarcode) => prevBarcode + event?.key);
            }
        };

        document.addEventListener("keydown", handleKeydown);

        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [barcodeValue, setBarCodeData]);

    useEffect(() => {
        if (on && inputRef.current) {
            inputRef.current.focus(); // Focus input if `on` changes
        }
    }, [on]);

    return (
        <></>
        // <input
        //     type="text"
        //     ref={inputRef}
        //     value={barcodeValue}
        //     readOnly // Prevent user from typing
        //     // style={{
        //     //     position: "absolute",
        //     //     opacity: 0,
        //     //     width: "1px",
        //     //     height: "1px",
        //     // }}
        //     autoComplete="off"
        // />
    );
};







// const BarcodeScannerInput = ({ setBarCodeData }) => {
//     const inputRef = useRef(null);
//     const [barcodeValue, setBarcodeValue] = useState("");

//     useEffect(() => {
//         const handleKeydown = (event) => {
//             const key = event.key;
//             //console.log("key", key)
//             if (key === "Shift" || event.ctrlKey || event.altKey || event.metaKey) {
//                 return; // Ignore control keys
//             }
//             if (key === "Enter") {
//                 //console.log("enter pressed")
//                 const scannedData = barcodeValue.trim();
//                 //console.log("scannedData", scannedData)
//                 setBarCodeData(scannedData);
//                 setBarcodeValue(""); // Clear the current barcode after processing
//             } else {
//                 setBarcodeValue((prevBarcode) => prevBarcode + key);
//             }
//         };

//         window.addEventListener("keydown", handleKeydown);

//         return () => {
//             window.removeEventListener("keydown", handleKeydown);
//         };
//     }, [barcodeValue, setBarCodeData]);

//     useEffect(() => {
//         inputRef.current.focus();
//     }, []);

//     return (
//         <input
//             type="text"
//             ref={inputRef}
//             className="border-2 border-black hidden"
//             value={barcodeValue}
//             onChange={(e) => setBarcodeValue(e.target.value)}
//             autoComplete="off"
//         />
//     );
// };





