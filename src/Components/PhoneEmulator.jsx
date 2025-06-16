import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useTransition,
} from "react";
import { useTranslation } from "react-i18next";

export function PhoneEmulator({
  MbBanner = true,
  onlyPhone = false,
  status,
  andriod,
  emulatorContent,
  emulaterdetailContent,
  emulaterDefaultAndriod,
  navSteper,
  activecard,
  activeview,
  swipping,
}) {
  const { t } = useTranslation("phone");

  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef(null);
  const outerDivRef = useRef(null); // Reference for the outermost div

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    if (showDetails && detailsRef.current) {
      detailsRef.current.scrollTop = 0;
    }
  }, [showDetails]);

  useEffect(() => {
    // Function to handle clicks outside the details
    const handleClickOutside = (event) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target) && // Check if click is outside details
        outerDivRef.current &&
        outerDivRef.current.contains(event.target) // Check if click is inside outer div
      ) {
        setShowDetails(false); // Close details if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [detailsRef, showDetails]);

  // //console.log(andriod, "this is andriod data for customer")

  return (
    <div ref={outerDivRef} className="w-[18rem] mx-auto mx-2 ">
      {" "}
      {/* Assign ref here */}
      {!activeview && (
        <div className="w-full flex justify-center items-center mb-2 ">
          <div
            className={`flex gap-1 my-2 justify-center items-center w-max rounded-full bg-gray-200 shadow px-4 py-1  text-xs ${
              !onlyPhone && "mr-10"
            }`}
          >
            <div
              className={`${
                status ? "bg-[#1DCD27]" : "bg-[#FF0030]"
              } p-1 rounded-full`}
            ></div>
            <span>{status ? t("active") : t("inactive")}</span>
          </div>
        </div>
      )}
      <div className="relative w-full h-[580px] flex justify-center">
        <div
          className={`rounded-[40px] flex justify-center items-center mt-3 h-[97%] w-[93%] overflow-hidden ${
            (showDetails && andriod === true) ||
            (swipping === "information" && andriod === true)
              ? "bg-black bg-opacity-50 z-10"
              : ""
          }`}
        >
          <div className={`w-[100%] h-full mt-24 relative `}>
            {andriod ? emulaterDefaultAndriod : emulatorContent}
            {swipping !== "information" && andriod && (
              <div className="flex">
                <button
                  onClick={toggleDetails}
                  className="mt-7 border px-24 py-1 rounded-xl mx-auto text-center font-bold text-blue-800"
                >
                  {t("detail")}
                </button>
              </div>
            )}
            {andriod === true && !(swipping === "information") && (
              <div
                ref={detailsRef} // Assign ref to the details portion
                className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
                  showDetails ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ height: "90%" }}
              >
                {emulaterdetailContent}
              </div>
            )}
          </div>
        </div>
        <img
          src={
            MbBanner && andriod ? "/assets/andriod.png" : "/assets/iphone.png"
          }
          alt="phone case"
          className="absolute h-full w-[100%] ms-1 pointer-events-none mt-2"
        />
      </div>
      <div className="flex"></div>
      {/* {!activeview && !onlyPhone && (
        <div className="w-full mt-4">
          <button
            className="w-full bg-gray-200 hover:bg-blue-500 hover:text-white text-[#898789] py-3 px-2 rounded-lg text-center disabled"
            disabled={navSteper?.setting === false}
            onClick={activecard}
          >
            {status !== true ? "Activate" : "Inactive"}
          </button>
          <div className="text-[#898789] w-full text-center mt-2">
            You can't issue more than 10 cards before the card template is activated
          </div>
        </div>
      )} */}
    </div>
  );
}

//   return (
//     <div className="w-[19rem] mx-auto">
//       {!activeview && (
//         <div className="w-full flex justify-center items-center mb-2">
//           <div className={`flex gap-1 my-2 justify-center items-center w-max rounded-full bg-gray-200 shadow px-4 py-1 text-xs ${
//             !onlyPhone && "mr-10"
//           }`}>
//             <div className={`${
//               status ? "bg-[#1DCD27]" : "bg-[#FF0030]"
//             } p-1 rounded-full`}></div>
//             <span>{status ? "Active" : "Inactive"}</span>
//           </div>
//         </div>
//       )}
//       <div className="relative w-full h-[500px] flex justify-center">
//         <div className="rounded-3xl bg-white flex justify-center items-center mt-4 h-[95%] w-[90%] overflow-hidden">
//           <div className="w-[100%] h-full relative">
//             {renderCardContent()}
//             <div
//               className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
//                 showDetails ? 'translate-y-0' : 'translate-y-full'
//               }`}
//               style={{ height: '50%' }}
//             >
//               {renderDetailsContent()}
//             </div>
//           </div>
//         </div>
//         <img
//           src={MbBanner && android ? "/assets/android.png" : "/assets/iphone.png"}
//           alt="phone case"
//           className="absolute h-full w-[99%] pointer-events-none"
//         />
//       </div>
//       {!activeview && !onlyPhone && (
//         <div className="w-full mt-4">
//           <button
//             className="w-full bg-gray-200 hover:bg-blue-500 hover:text-white text-[#898789] py-3 px-2 rounded-lg text-center disabled"
//             disabled={navSteper?.setting === false}
//             onClick={activecard}
//           >
//             {status !== true ? "Activate" : "Inactive"}
//           </button>
//           <div className="text-[#898789] w-full text-center mt-2">
//             You can't issue more than 10 cards before the card template is activated
//           </div>
//         </div>
//       )}
//     </div>
//   );

// return (
//   <div
//     className={`  top-0 p-2 w-[19rem] mx-auto items-center gap-4 rounded-md ${
//       onlyPhone ? "" : ""
//     }`}
//   >
//     {!activeview &&<div className=" w-full flex justify-center items-center">
//       <div
//         className={` flex gap-1 my-2  justify-center items-center w-max rounded-full bg-gray-200 shadow px-4 py-1 text-xs ${
//           !onlyPhone && "mr-10"
//         }`}
//       >
//         <div
//           className={` ${
//             status ? "bg-[#1DCD27]" : "bg-[#FF0030]"
//           }  p-1  rounded-full`}
//         ></div>
//         <span> {status ? "Active" : "Inactive"}</span>
//       </div>
//     </div>}
//     <div className="flex justify-center overflow-y-auto my-2 items-center gap-2  ">
//       <div className="relative w-full  h-[500px] flex justify-center  ">
//         <div
//           className={`rounded-3xl   bg-[#F2F2F7]  ${
//             // bg-[#F2F2F7] bg-[#D5D5DD]
//             MbBanner ? "" : ""
//           }  flex justify-center items-center mt-4 h-[95%]  w-[90%]`}
//         >
//           <div className="w-[100%] z-10">{emulatorContent}</div>
//         </div>
//         {MbBanner && andriod ? (
//           <img
//             src="/assets/andriod.png"
//             alt="phone case"
//             className="absolute   h-full w-[99%]"
//           />
//         ) : (
//           <img
//             src="/assets/iphone.png"
//             alt="phone case"
//             className="absolute  h-full w-[99%]"

//           />
//         )}

//       </div>

//     </div>

//     {!activeview && !onlyPhone && (
//       <div className="w-full">
//         <button   className="my-2  w-full bg-gray-200 hover:bg-blue-500 hover:text-white text-[#898789] py-3 px-2 rounded-lg  text-center  disabled"  disabled={navSteper?.setting ===false} onClick={()=>{
//           activecard();
//         }}>
//          {status!==true?"Activate":"Inactive"}
//         </button>
//         <div className="text-[#898789] w-full text-center ">
//           You cannot issue more than 10 cards before the card template is
//           activated
//         </div>
//       </div>
//     )}
//   </div>
// );

function NewComponents() {
  const { t } = useTranslation("phone");

  useEffect(() => {
    document.title = t("title");
  }, []);

  /* radio button */
  const [selectedOption, setSelectedOption] = useState(t("yes"));

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
    //// //console.log
  };

  return (
    <div>
      <BoxWithSwitch infoIcon={true} description={t("showLogoIssue")} />
      <BlackButton btnText={t("continue")} />
      <Container border={"both"}>{t("notUseful")}</Container>
      <Heading_Description
        heading={t("heading")}
        description={t("description")}
        infoIcon={true}
      />
      <DropDown />
      <InputBox
        onChange={handleInputChange}
        heading={t("farooqKhizar")}
        textPosition="left"
        text={t("limit")}
      />
      <IosSwitch />
      <NumberList number={18} heading={t("farooqKhizar")} />
      <BpRadio />
      <SelectColor heading={t("bgColor")} />
      <SelectImage title={t("logo")} description={t("logoDesc")} />
    </div>
  );
}

export default NewComponents;

// import React, { useState, useRef, useEffect } from 'react';
// import { ChevronUp, ChevronDown } from 'lucide-react';

// export function PhoneEmulator ({
//   MbBanner = true,
//   onlyPhone = false,
//   status,
//   android,
//   navSteper,
//   activecard,
//   activeview,
//     emulatorContent ,
//   emulaterdetailContent,
// }){
//   const [showDetails, setShowDetails] = useState(false);
//   const detailsRef = useRef(null);

//   const toggleDetails = () => {
//     setShowDetails(!showDetails);
//   };

//   useEffect(() => {
//     if (showDetails && detailsRef.current) {
//       detailsRef.current.scrollTop = 0;
//     }
//   }, [showDetails]);

//   const renderCardContent = () => (
//     <div className="flex flex-col h-full bg-black text-white p-4">
//       <div className="flex-grow">
//         <h2 className="text-lg font-bold mb-2">Stamp card №1</h2>
//         <p className="text-sm mb-4">Collect stamps to get rewards</p>
//         <div className="bg-white w-full h-16 mb-4"></div>
//         <div className="flex justify-between mb-4">
//           <span>6 stamps</span>
//           <span>No data</span>
//         </div>
//         <div className="grid grid-cols-5 gap-2">
//           {[...Array(10)].map((_, i) => (
//             <div key={i} className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
//               {i < 5 && <img src="/api/placeholder/32/32" alt="Coffee beans" className="w-full h-full object-cover" />}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div
//         className="mt-4 flex items-center justify-center cursor-pointer"
//         onClick={toggleDetails}
//       >
//         <span className="mr-2">Details</span>
//         {showDetails ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
//       </div>
//     </div>
//   );

//   const renderDetailsContent = () => (
//     <div
//       ref={detailsRef}
//       className="bg-white text-black p-4 rounded-t-2xl overflow-y-auto h-full"
//     >
//       <div className="space-y-4">
//         <div>
//           <h3 className="font-semibold">Member ID</h3>
//           <p>630120-816-306</p>
//         </div>
//         <div>
//           <h3 className="font-semibold">First name</h3>
//           <p>John</p>
//         </div>
//         <div>
//           <h3 className="font-semibold">Phone</h3>
//           <p>+1234567890</p>
//         </div>
//         <div>
//           <h3 className="font-semibold">Do odmeny</h3>
//           <p>10 stamps</p>
//         </div>
//         <div>
//           <h3 className="font-semibold">Accrued from the date of issue</h3>
//           <p>0 stamps</p>
//         </div>
//         <div>
//           <h3 className="font-semibold">Accrued from the date of issue</h3>
//           <p>0 rewards</p>
//         </div>
//         <div>
//           <h3 className="font-semibold">Not used</h3>
//           <p>0 rewards</p>
//         </div>
//         <div>
//           <h3 className="font-semibold">How to get a stamp</h3>
//           <p>Buy anything to get a stamp</p>
//         </div>
//         <div>
//           <h3 className="font-semibold">Reward details</h3>
//           <p>Reward details</p>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="w-[19rem] mx-auto">
//       {!activeview && (
//         <div className="w-full flex justify-center items-center mb-2">
//           <div className={`flex gap-1 my-2 justify-center items-center w-max rounded-full bg-gray-200 shadow px-4 py-1 text-xs ${
//             !onlyPhone && "mr-10"
//           }`}>
//             <div className={`${
//               status ? "bg-[#1DCD27]" : "bg-[#FF0030]"
//             } p-1 rounded-full`}></div>
//             <span>{status ? "Active" : "Inactive"}</span>
//           </div>
//         </div>
//       )}
//       <div className="relative w-full h-[500px] flex justify-center">
//         <div className="rounded-3xl bg-white flex justify-center items-center mt-4 h-[95%] w-[90%] overflow-hidden">
//           <div className="w-[100%] h-full relative">
//             {renderCardContent()}
//             <div
//               className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
//                 showDetails ? 'translate-y-0' : 'translate-y-full'
//               }`}
//               style={{ height: '50%' }}
//             >
//               {renderDetailsContent()}
//             </div>
//           </div>
//         </div>
//         <img
//           src={MbBanner && android ? "/assets/android.png" : "/assets/iphone.png"}
//           alt="phone case"
//           className="absolute h-full w-[99%] pointer-events-none"
//         />
//       </div>
//       {!activeview && !onlyPhone && (
//         <div className="w-full mt-4">
//           <button
//             className="w-full bg-gray-200 hover:bg-blue-500 hover:text-white text-[#898789] py-3 px-2 rounded-lg text-center disabled"
//             disabled={navSteper?.setting === false}
//             onClick={activecard}
//           >
//             {status !== true ? "Activate" : "Inactive"}
//           </button>
//           <div className="text-[#898789] w-full text-center mt-2">
//             You can't issue more than 10 cards before the card template is activated
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
