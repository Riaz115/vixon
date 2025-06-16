import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SidebarModal = ({ setStep, previous, setNav }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-white flex flex-col px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button className="text-black " onClick={() => {
          setStep(previous)
        }}>
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-lg  mx-auto font-semibold">Nastavenia</h1>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* General Section */}
        <div className="mb-6">
          <h2 className="text-gray-600 font-medium mb-2">Všeobecné</h2>
          <div className="space-y-3">
            {/* Option 1 */}
            <div className="flex items-center bg-white p-4 rounded-lg shadow border cursor-pointer" onClick={() => {
              setStep(1)
              setNav(7)
            }}>
              <img src="/assets/bluetooth.svg" className="text-[#36C6FA] mr-3" />
              <span className="text-black font-medium">Pripojenie skeneru</span>
            </div>
            {/* Option 2 */}
            <div className="flex items-center bg-white p-4 rounded-lg shadow-md border cursor-pointer" onClick={() => {
              setStep(4)
              setNav(7)
            }}>
              <img src="/assets/share.svg" className="text-[#36C6FA] mr-3" />
              <span className="text-black font-medium">Pridať na domovskú obrazovku</span>
            </div>
            {/* Option 3 */}
            <div className="flex items-center bg-white p-4 rounded-lg shadow-md border cursor-pointer" onClick={() => {
              setStep(0)
              setNav(7)
            }}>
              <img src="/assets/qrcodeicon.svg" className="text-[#36C6FA] mr-3" />
              <span className="text-black font-medium">QR kód - Párovací mód</span>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mb-6">
          <h2 className="text-gray-600 font-medium mb-2">Podpora</h2>
          <div className="space-y-3">
            {/* Phone */}
            <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
              <img src="/assets/callicon.svg" className="text-[#36C6FA] mr-3" alt="Call Icon" />
              <a
                href="tel:+421948777490"
                className="text-black font-medium hover:underline"
              >
                +421 948 777 490
              </a>
            </div>
            {/* Email */}
            <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
              <img src="/assets/mailicon.svg" className="text-[#36C6FA] mr-3" alt="Mail Icon" />
              <a
                href="mailto:jakub@vexioncards.one"
                className="text-black font-medium hover:underline"
              >
                jakub@vexioncards.one
              </a>
            </div>
          </div>
        </div>


        {/* Logout Section */}
        <div>
          <h2 className="text-gray-600 font-medium mb-2">Odhlásenie</h2>
          <div className="flex items-center bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={() => {
            localStorage.removeItem("mytoken")
            navigate("/User-login")
          }}>
            <img src="/assets/exiticon.svg" className="text-[#36C6FA] mr-3" />
            <span className="text-black font-medium">Odhlásiť</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarModal;
