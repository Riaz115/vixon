import React, { useEffect, useState, useRef } from "react";
import { GoBell } from "react-icons/go";
import { GrLanguage } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { PiListLight } from "react-icons/pi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { HiChevronDown } from "react-icons/hi";
import { GoogleTranslate } from "./translater/Googletranslator";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import { selectstamps } from "../redux/stampSlice";
import { useSelector } from "react-redux";
import {
  IoAddOutline,
  IoStatsChartOutline,
  IoSettingsOutline,
  IoScanOutline,
  IoExitOutline,
} from "react-icons/io5";
import { useTranslation } from "react-i18next";

function Topbar({ businessdata }) {
  const [nav, setNav] = useState(window.innerWidth >= 640);
  const [showBellDropdown, setShowBellDropdown] = useState(false);
  const [showInfoDropdown, setShowInfoDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState("Stamp card N° 7");
  const allstamps = useSelector(selectstamps);

  //// //console.log   .log(allstamps,"this is stamp data")
  // Reference to the select element
  const selectRef = useRef(null);
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Sample card names array
  const cardNames = [
    "Gift card N° 1",
    "Stamp card N° 2",
    "Coupon N° 2",
    "Coupon N° 3",
    "Bags and Accessories",
    "Stamp card N° 4",
    "Reward card N° 1",
    "Reward card N° 2",
    "Stamp card N° 7",
  ];

  // Handle card selection from the dropdown
  const handleCardSelect = (e) => {
    setSelectedCard(e.target.value);
  };

  // Function to open the select dropdown
  const openSelect = () => {
    selectRef.current.focus();
    selectRef.current.click(); // This simulates a click to open the dropdown
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setNav(true);
      } else {
        setNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdownLan = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
    setShowBellDropdown(false);
    setShowInfoDropdown(false);
    setShowProfileDropdown(false);
  };
  const toggleDropdownAc = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowBellDropdown(false);
    setShowInfoDropdown(false);
    setShowLanguageDropdown(false);
  };
  const toggleDropdownNT = () => {
    setShowBellDropdown(!showBellDropdown);
    setShowInfoDropdown(false);
    setShowLanguageDropdown(false);
    setShowProfileDropdown(false);
  };
  const toggleDropdownIF = () => {
    setShowInfoDropdown(!showInfoDropdown);
    setShowBellDropdown(false);
    setShowLanguageDropdown(false);
    setShowProfileDropdown(false);
  };

  return (
    <div className="fixed z-50 w-full bg-[#1F1E1F]  flex gap-2 flex-wrap justify-between box-border px-3 items-center  text-white">
      <div className="flex items-center gap-9 py-4 sm:py-0   ">
        <Link to={"/"}>
          <img src="/assets/logo.svg" alt="Company Logo" className="h-7 " />
        </Link>
        <div
          className="text-xs py-5 px-2 w-32 cursor-pointer sm:flex items-center justify-between hover:bg-[#2e2e2e]"
          onClick={toggleDropdown}
        >
          <div>
            <span className="font-thin">Hi</span> <br />
            <b>{businessdata?.userName}</b>
          </div>
          {/* <HiChevronDown className="w-4 h-4" /> */}
        </div>
        <div className="w-64 relative">
          {/* Button to trigger the select dropdown */}
          {/* <button
            onClick={openSelect}
            className="bg-[#2e2e2e] text-white px-4 py-2 rounded w-full flex justify-between items-center"
          >
            Current card: {selectedCard}
            <HiChevronDown className="w-4 h-4" />
          </button> */}
        </div>
      </div>

      <PiListLight
        className="text-2xl  sm:hidden"
        onClick={() => setNav(!nav)}
      />
      <div
        className={`flex items-center  px-1  justify-end gap-1 sm:mt-0 sm:mr-2 w-full overflow-hidden sm:w-max ${
          nav ? "h-full " : "h-0"
        }`}
      >
        {/* <div className={`h-full px-4 py-4  hover:bg-[#2e2e2e] ${showBellDropdown ? 'bg-[#2e2e2e]' : 'bg-transparent'} `}>
          <GoBell
            className="text-2xl cursor-pointer"
            onClick={() => toggleDropdownNT()}
          />
          {showBellDropdown && (
            <div className="absolute right-0 mt-4 w-64 bg-[#2e2e2e] text-white  shadow-lg">
              <div className="p-4 border-b border-gray-700">Notification 1</div>
              <div className="p-4 border-b border-gray-700">Notification 2</div>
              <div className="p-4">Notification 3</div>
            </div>
          )}
        </div> */}
        {/* <div className={`h-full px-4 py-4  hover:bg-[#2e2e2e] ${showInfoDropdown ? 'bg-[#2e2e2e]' : 'bg-transparent'} `}>
          <IoIosInformationCircleOutline
            className="text-2xl cursor-pointer"
            onClick={() => toggleDropdownIF()}
          />
          {showInfoDropdown && (
            <div className="absolute right-0 mt-4 w-64 bg-[#2e2e2e] text-white  shadow-lg">
              <div className="p-4 border-b border-gray-700">Info 1</div>
              <div className="p-4 border-b border-gray-700">Info 2</div>
              <div className="p-4">Info 3</div>
            </div>
          )}
        </div> */}
        {/* <div className={`h-full px-4 py-4  hover:bg-[#2e2e2e] ${showLanguageDropdown ? 'bg-[#2e2e2e]':'bg-transparent'} `}>
          <GrLanguage
            className="text-2xl cursor-pointer"
            onClick={() => toggleDropdownLan()}
          />
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-4 w-64 bg-[#2e2e2e] text-white shadow-lg">
              <div className="p-4 border-b border-gray-700">English</div>
              <div className="p-4 border-b border-gray-700">Spanish</div>
              <div className="p-4">French</div>
            </div>
          )}
        </div> */}
        <GoogleTranslate onChange={changeLanguage} />

        {/* <div className={`h-full px-4 py-4  hover:bg-[#2e2e2e] ${showProfileDropdown ? 'bg-[#2e2e2e]' : 'bg-transparent'} `}>
          <CgProfile
            className="text-2xl cursor-pointer"
            onClick={() => toggleDropdownAc()}
          />
          {showProfileDropdown && (
            <div className="absolute right-0 mt-4 w-52 bg-[#2e2e2e]  shadow-lg py-1  z-[9999]">
              <div className="px-4 py-2 text-sm text-white border-b border-gray-700">
                <div className="flex items-center">
                  <CgProfile className="mr-2" />
                  My profile
                </div>
              </div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <IoAddOutline className="mr-2" />
                  Create card
                </div>
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                Discount card N° 1
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <IoStatsChartOutline className="mr-2" />
                  Statistics
                </div>
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <IoSettingsOutline className="mr-2" />
                  Settings
                </div>
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <IoScanOutline className="mr-2" />
                  Scanner App
                </div>
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <IoExitOutline className="mr-2" />
                  Log out
                </div>
              </a>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default Topbar;
