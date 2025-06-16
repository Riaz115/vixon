import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const OnScreen = ({step, setStep, setPrevious,setNav,nav}) => {
  
  const navigate = useNavigate();
  // Images for each step
  const stepImages = {
    1: "/assets/Setting.png",
    2: "/assets/Step2.png",
    3: "/assets/Step3.png",
    4: "/assets/Step4.png",
    5: "/assets/Step5.png",
    6: "/assets/Step6.png",
  };

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    //   {/* Label */}

    // </div>
    <div className="bg-[#FAFAFA]">

    <div className=" flex items-center justify-center b  ">
      {/* Container */}
      <div className="w-full sm:max-w-lg   rounded-lg  border-t border-gray-300">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2">
          <img className="cursor-pointer" onClick={() => {
            setStep(7)
          }} src="/assets/iconhome.svg" alt="" />
          <h1 className="text-gray-800 font-medium mx-6 text-center">{step > 3 ? "Pridanie na domovskú obrazovku" : "Pripojenie Skenneru"}</h1>
          <button className="p-1" onClick={() => {
            setStep(8)
            setPrevious(step)
            }}>
            <img src="/assets/Group_1.svg" alt="" />
          </button>
        </div>

{
      step===0?  <div className="mt-5 border-t-2 rounded-2xl border-[#AAAAA]"> 
          <div className="relative mt-20 flex items-center justify-center">
            {/* Label */}
            <div className="absolute w-[180px] z-10 bottom-0 bg-white text-center text-sm font-medium text-black px-4 py-2 rounded-lg shadow-md">
              NASKENUJ MA FYZICKÝM SKENEROM
            </div>
            {/* Pointer Triangle */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-8 h-8 bg-[#36C6FA] rotate-45"></div>
          </div>
          <div className="mt-6 p-4   relative mx-8">

            <div className="absolute top-1 left-1 w-8 h-8 border-t-2 border-l-2 border-[#36C6FA] rounded-tl-lg "></div>
            <div className="absolute top-1 right-1 w-8 h-8 border-t-2 border-r-2 border-[#36C6FA] rounded-tr-lg"></div>
            <div className="absolute bottom-1 left-1 w-8 h-8 border-b-2 border-l-2 border-[#36C6FA] rounded-bl-lg"></div>
            <div className="absolute bottom-1 right-1 w-8 h-8 border-b-2 border-r-2 border-[#36C6FA] rounded-br-lg"></div>
            <img
              src="/assets/Qrcode.svg"
              alt="QR Code"
              className="w-full  object-contain "
            />
          </div>

        </div>: <div className="mt-5 border-t-2 rounded-2xl border-[#AAAAA]">
          <div className="border-2 mt-6 mx-4 rounded-lg border-[#AAAAA] bg-[#FAFAFA]">
            <div className="flex items-center justify-between max-w-sm mx-auto px-10 mt-4">
            
              <div className="flex items-center space-x-2">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-6 h-6 border-2 rounded-full font-bold ${(step > 1 && step < 4) || (step > 4 && step < 7)
                        ? "border-[#36C6FA] bg-[#36C6FA] text-white"
                        : step === 1 || step === 4
                          ? "border-[#36C6FA] text-[#36C6FA]"
                          : "border-black text-black"
                      }`}
                  >
                    1
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${(step > 1 && step < 4) || (step > 4 && step < 7) || step === 1 || step === 4
                        ? "text-[#36C6FA]"
                        : "text-black"
                      }`}
                  >
                    Krok 1
                  </span>
                </div>
              </div>


              <div className="flex-1 h-px mt-4 my-auto bg-black"></div>

         
              <div className="flex items-center space-x-2">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-6 h-6 border-2 rounded-full font-bold ${step === 2 || step === 5
                      ? "border-[#36C6FA] text-[#36C6FA]"
                      : step > 2 && step < 4 || step > 5 && step < 7
                        ? "border-[#36C6FA] bg-[#36C6FA] text-white"
                        : "border-black text-black"
                      }`}
                  >
                    2
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${step === 2 || step === 5 || (step > 2 && step < 4) || (step > 5 && step < 7)
                      ? "text-[#36C6FA]"
                      : "text-black"
                      }`}
                  >
                    Krok 2
                  </span>
                </div>
              </div>


              <div className="flex-1 h-px mt-4 my-auto bg-black"></div>

             
              <div className="flex items-center space-x-2">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-6 h-6 border-2 rounded-full font-bold ${step === 3 || step === 6
                      ? "border-[#36C6FA] text-[#36C6FA]"
                      : "border-black text-black"
                      }`}
                  >
                    3
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${step === 3 || step === 6 ? "text-[#36C6FA]" : "text-black"
                      }`}
                  >
                    Krok 3
                  </span>
                </div>
              </div>
            </div>

           
            <div className="px-4 pt-4 mt-1 flex justify-center">
              <img
                src={stepImages[step]}
                alt={`Step ${step}`}
                className="rounded-t-md border border-gray-200 h-[360px] sm:h-[40vh] lg:h-[30vh]"
              />
            </div>
          </div>
        </div>}
        <div className="flex flex-col items-center justify-center  bg-gray-100">
          <div className=" absolute flex justify-between items-center px-4 py-3 bottom-0 left-0 w-full">
            <button
              className="font-semibold"
              onClick={() => {
                if(nav && (step === 1 || step === 4 || step===0)){

                }else{
                  
                  setStep((prev) => Math.max(prev - 1, 0))}}
                }
            >
              ← Späť
            </button>
            <button
              className="font-semibold"
              onClick={() => {
                if(nav && (step === 6 ||step ===  3 || step===0)){
                  setStep(nav);
                  setNav()
                  if (step === 0) {
                    localStorage.setItem("stepno", "true");
                    // navigate("/mobilescanner");
                  }
                }else{

                  setStep((prev) => Math.min(prev + 1, 7))
                }
              }}
            >
              Ďalej →
            </button>
          </div>

        </div>
        {/* Footer Buttons */}
      </div>
    </div>
    </div>
  );
};

export default OnScreen;
