import React, { useEffect } from "react";
import { PhoneEmulator } from "../../Components/PhoneEmulator";
import CustomerInformation from "./CustomerInformation";
import {
  FaApple,
  FaStar,
  FaHeart,
  FaSmile,
  FaCoffee,
  FaAppleAlt,
  FaAnchor,
  FaBell,
  FaBook,
  FaBolt,
  FaCar,
  FaCheck,
  FaCloud,
  FaCogs,
  FaCompass,
  FaDesktop,
  FaDove,
  FaEye,
  FaFeather,
  FaFire,
  FaFlag,
  FaFlask,
  FaGift,
  FaGlobe,
  FaHammer,
  FaHeadphones,
  FaIceCream,
  FaKey,
  FaLeaf,
  FaLightbulb,
  FaLock,
  FaMagic,
  FaMobileAlt,
  FaMoon,
  FaPaintBrush,
  FaPaperPlane,
  FaPen,
  FaPhone,
  FaPlane,
  FaRocket,
  FaShoppingCart,
  FaSnowflake,
  FaSun,
  FaTabletAlt,
  FaTrophy,
  FaUmbrella,
  FaUser,
  FaVideo,
  FaWrench,
  FaYinYang,
} from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import { installationcard } from "../../api/createstamp";
import { Loader } from "../../Components/Loader/loader";
import { routeMa } from "../../data";
import ConfirmationModal from "../../Components/modal/Addamount";
// import Barcode from 'react-barcode';
import { createTransactions } from "../../api/transaction";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const CustomerrewardView = ({ data, setBarCodeData }) => {
  const { t } = useTranslation("customerrewardpreview");
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState();
  const [stampname, setStampName] = useState();
  const [alldata, setalldata] = useState();
  const [designformData, setdesignFormData] = useState();
  const [open, setOpen] = useState(false);

  function getSelectedNumber() {
    let gridNumber = designformData.selectedNumber;

    if (gridNumber <= 5) {
      return `grid-cols-${gridNumber}`;
    }

    if (gridNumber < 15) {
      //console.log("gridNumber < 15", designformData.selectedNumber);
      return `grid-cols-${Math.ceil(gridNumber / 2)}`;
    }
    if (gridNumber > 20 && gridNumber <= 21) {
      // New condition for values between 21 and 28
      //console.log("Handling values 21 to 28", designformData.selectedNumber);
      return `grid-cols-7`; // Adjusted to divide by 4 to control column count
    }
    if (gridNumber > 21 && gridNumber < 25) {
      // New condition for values between 21 and 28
      //console.log("Handling values 21 to 28", designformData.selectedNumber);
      return `grid-cols-8`;
    }
    if (gridNumber >= 25 && gridNumber < 28) {
      // New condition for values between 21 and 28
      //console.log("Handling values 21 to 28", designformData.selectedNumber);
      return `grid-cols-9`;
    }

    if (designformData.selectedNumber % 3 === 0) {
      //console.log("designformData.selectedNumber % 3 === 0", designformData.selectedNumber);
      return `grid-cols-${Math.ceil(gridNumber / 3)}`;
    }

    //console.log("designformData.selectedNumber", designformData.selectedNumber);
    //console.log("Calculated columns:", Math.ceil(designformData.selectedNumber / 3).toString().trim());
    return `grid-cols-${Math.ceil(gridNumber / 3)}`;
  }
  useEffect(() => {
    const get = async () => {
      try {
        setLoading(true);
        const response = await installationcard(data);
        // //console.log(response, "this is response data")
        if (response.status === 200 || response.status === 201) {
          // setinformationFormData(response?.data?.findcard)
          setdesignFormData(response?.data?.findcard);
          setCardType(response?.data?.findcard?.cardType);
          setStampName(response?.data?.findcard?.stampName);
          setalldata(response?.data?.customer);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    if (data) {
      get();
    }
  }, [data]);

  const activeStampList = [
    { icon: <FaStar />, name: "Star" },
    { icon: <FaHeart />, name: "Heart" },
    { icon: <FaSmile />, name: "Smile" },
    { icon: <FaCoffee />, name: "Coffee" },
    { icon: <FaAppleAlt />, name: "Apple" },
    { icon: <FaAnchor />, name: "Anchor" },
    { icon: <FaBell />, name: "Bell" },
    { icon: <FaBook />, name: "Book" },
    { icon: <FaBolt />, name: "Bolt" },
    { icon: <FaCar />, name: "Car" },
    { icon: <FaCheck />, name: "Check" },
    { icon: <FaCloud />, name: "Cloud" },
    { icon: <FaCogs />, name: "Cogs" },
    { icon: <FaCompass />, name: "Compass" },
    { icon: <FaDesktop />, name: "Desktop" },
    { icon: <FaDove />, name: "Dove" },
    { icon: <FaEye />, name: "Eye" },
    { icon: <FaFeather />, name: "Feather" },
    { icon: <FaFire />, name: "Fire" },
    { icon: <FaFlag />, name: "Flag" },
    { icon: <FaFlask />, name: "Flask" },
    { icon: <FaGift />, name: "Gift" },
    { icon: <FaGlobe />, name: "Globe" },
    { icon: <FaHammer />, name: "Hammer" },
    { icon: <FaHeadphones />, name: "Headphones" },
    { icon: <FaIceCream />, name: "Ice Cream" },
    { icon: <FaKey />, name: "Key" },
    { icon: <FaLeaf />, name: "Leaf" },
    { icon: <FaLightbulb />, name: "Lightbulb" },
    { icon: <FaLock />, name: "Lock" },
    { icon: <FaMagic />, name: "Magic" },
    { icon: <FaMobileAlt />, name: "Mobile" },
    { icon: <FaMoon />, name: "Moon" },
    { icon: <FaPaintBrush />, name: "Paint Brush" },
    { icon: <FaPaperPlane />, name: "Paper Plane" },
    { icon: <FaPen />, name: "Pen" },
    { icon: <FaPhone />, name: "Phone" },
    { icon: <FaPlane />, name: "Plane" },
    { icon: <FaRocket />, name: "Rocket" },
    { icon: <FaShoppingCart />, name: "Shopping Cart" },
    { icon: <FaSnowflake />, name: "Snowflake" },
    { icon: <FaSun />, name: "Sun" },
    { icon: <FaTabletAlt />, name: "Tablet" },
    { icon: <FaTrophy />, name: "Trophy" },
    { icon: <FaUmbrella />, name: "Umbrella" },
    { icon: <FaUser />, name: "User" },
    { icon: <FaVideo />, name: "Video" },
    { icon: <FaWrench />, name: "Wrench" },
    { icon: <FaYinYang />, name: "Yin Yang" },
  ];

  const disableStampList = [
    { icon: <FaStar className="disabled-icon" />, name: "Star" },
    { icon: <FaHeart className="disabled-icon" />, name: "Heart" },
    { icon: <FaSmile className="disabled-icon" />, name: "Smile" },
    { icon: <FaCoffee className="disabled-icon" />, name: "Coffee" },
    { icon: <FaAppleAlt className="disabled-icon" />, name: "Apple" },
    { icon: <FaAnchor className="disabled-icon" />, name: "Anchor" },
    { icon: <FaBell className="disabled-icon" />, name: "Bell" },
    { icon: <FaBook className="disabled-icon" />, name: "Book" },
    { icon: <FaBolt className="disabled-icon" />, name: "Bolt" },
    { icon: <FaCar className="disabled-icon" />, name: "Car" },
    { icon: <FaCheck className="disabled-icon" />, name: "Check" },
    { icon: <FaCloud className="disabled-icon" />, name: "Cloud" },
    { icon: <FaCogs className="disabled-icon" />, name: "Cogs" },
    { icon: <FaCompass className="disabled-icon" />, name: "Compass" },
    { icon: <FaDesktop className="disabled-icon" />, name: "Desktop" },
    { icon: <FaDove className="disabled-icon" />, name: "Dove" },
    { icon: <FaEye className="disabled-icon" />, name: "Eye" },
    { icon: <FaFeather className="disabled-icon" />, name: "Feather" },
    { icon: <FaFire className="disabled-icon" />, name: "Fire" },
    { icon: <FaFlag className="disabled-icon" />, name: "Flag" },
    { icon: <FaFlask className="disabled-icon" />, name: "Flask" },
    { icon: <FaGift className="disabled-icon" />, name: "Gift" },
    { icon: <FaGlobe className="disabled-icon" />, name: "Globe" },
    { icon: <FaHammer className="disabled-icon" />, name: "Hammer" },
    { icon: <FaHeadphones className="disabled-icon" />, name: "Headphones" },
    { icon: <FaIceCream className="disabled-icon" />, name: "Ice Cream" },
    { icon: <FaKey className="disabled-icon" />, name: "Key" },
    { icon: <FaLeaf className="disabled-icon" />, name: "Leaf" },
    { icon: <FaLightbulb className="disabled-icon" />, name: "Lightbulb" },
    { icon: <FaLock className="disabled-icon" />, name: "Lock" },
    { icon: <FaMagic className="disabled-icon" />, name: "Magic" },
    { icon: <FaMobileAlt className="disabled-icon" />, name: "Mobile" },
    { icon: <FaMoon className="disabled-icon" />, name: "Moon" },
    { icon: <FaPaintBrush className="disabled-icon" />, name: "Paint Brush" },
    { icon: <FaPaperPlane className="disabled-icon" />, name: "Paper Plane" },
    { icon: <FaPen className="disabled-icon" />, name: "Pen" },
    { icon: <FaPhone className="disabled-icon" />, name: "Phone" },
    { icon: <FaPlane className="disabled-icon" />, name: "Plane" },
    { icon: <FaRocket className="disabled-icon" />, name: "Rocket" },
    {
      icon: <FaShoppingCart className="disabled-icon" />,
      name: "Shopping Cart",
    },
    { icon: <FaSnowflake className="disabled-icon" />, name: "Snowflake" },
    { icon: <FaSun className="disabled-icon" />, name: "Sun" },
    { icon: <FaTabletAlt className="disabled-icon" />, name: "Tablet" },
    { icon: <FaTrophy className="disabled-icon" />, name: "Trophy" },
    { icon: <FaUmbrella className="disabled-icon" />, name: "Umbrella" },
    { icon: <FaUser className="disabled-icon" />, name: "User" },
    { icon: <FaVideo className="disabled-icon" />, name: "Video" },
    { icon: <FaWrench className="disabled-icon" />, name: "Wrench" },
    { icon: <FaYinYang className="disabled-icon" />, name: "Yin Yang" },
  ];

  const [points, setPoints] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [section, setSection] = useState("point");

  const handleAddPoint = () => {
    setIsAdding(true);
    setPoints((prevPoints) => prevPoints + 1);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleRedeemPoint = () => {
    setIsRedeeming(true);
    if (points > 0) {
      setPoints(points - 1);
    }
  };
  const openModal = () => {
    setOpen(true);
  };

  const updatepoint = async (data) => {
    try {
      setLoading(true);
      let cards = alldata?.cards;
      cards[0].remainingStamps =
        cards[0].remainingStamps - points < 0
          ? cards[0].totalStamps
          : cards[0].remainingStamps - points;
      cards[0].consumedStamps =
        cards[0].consumedStamps + points > cards[0].totalStamps
          ? 0
          : cards[0].consumedStamps + points;
      cards[0].rewards = cards[0].rewards + points;
      const response = await createTransactions({
        cardId: designformData?._id,
        customerId: alldata?._id,
        businessId: alldata?.businessId,
        customerBalance: data,
        customerAmount: data,
        cards: cards,
      });
      if (response.status === 200) {
        setLoading(false);
        setBarCodeData("");
        toast.success("Points updated successfully");
      }
    } catch (error) {
      toast.success("failed to update Points");
      setLoading(false);
    }
  };
  const updateredeem = async (data) => {
    try {
      setLoading(true);
      let cards = alldata?.cards;

      cards[0].rewards = cards[0].rewards - points;
      const response = await createTransactions({
        cardId: designformData?._id,
        customerId: alldata?._id,
        businessId: alldata?.businessId,
        // customerBalance: data,
        customerAmount: data,
        cards: cards,
      });
      if (response.status === 200) {
        setLoading(false);
        setBarCodeData("");
        toast.success("Points updated successfully");
      }
    } catch (error) {
      toast.success("failed to update Points");
      setLoading(false);
    }
  };
  return (
    <div>
      {alldata && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-7">
          {/* Customer Information */}
          <div className="text-center">
            <p className="font-bold text-xl">{t("custinfo")}</p>
            <div className="pt-10">
              <div className="p-6 w-full">
                <div className="grid sm:grid-cols-1 gap-5 text-start">
                  {alldata?.first_name && (
                    <div>
                      <label className="block text-gray-700 font-semibold">
                        {t("fname")}
                      </label>
                      <input
                        type="text"
                        placeholder="Testing"
                        value={alldata?.first_name}
                        disabled
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                  {alldata?.last_name && (
                    <div>
                      <label className="block text-gray-700 font-semibold">
                        {t("lname")}
                      </label>
                      <input
                        type="text"
                        placeholder="Tesimf"
                        value={alldata?.last_name}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        disabled
                      />
                    </div>
                  )}
                  {alldata?.date_of_birth && (
                    <div>
                      <label className="block text-gray-700 font-semibold">
                        {t("dob")}
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          value={
                            alldata?.date_of_birth
                              ? new Date(alldata?.date_of_birth)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          disabled
                        />
                      </div>
                    </div>
                  )}
                  {alldata?.email && (
                    <div>
                      <label className="block text-gray-700 font-semibold">
                        {t("email")}
                      </label>
                      <input
                        type="email"
                        placeholder="jakub.pitonak@ue-germany.de"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={alldata?.email}
                        disabled
                      />
                    </div>
                  )}
                  {alldata?.phone && (
                    <div>
                      <label className="block text-gray-700 font-semibold">
                        {t("phone")}
                      </label>
                      <input
                        type="text" // Changed type from 'email' to 'text' for phone numbers
                        placeholder="+1234567890"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={alldata?.phone}
                        disabled
                      />
                    </div>
                  )}
                  {alldata?.device && (
                    <div>
                      <label className="block text-gray-700 font-semibold">
                        {t("intondevice")}
                      </label>
                      <input
                        type="text" // Changed type from 'email' to 'text' for device names
                        placeholder="App Wallet"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={alldata?.device}
                        disabled
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="font-bold text-xl">{t("passpreview")}</p>
            <div className="mt-3 pt-10">
              {designformData && (
                <PhoneEmulator
                  activeview={true}
                  emulatorContent={
                    <div className="flex jsutify-content-center mx-1 rounded-lg ">
                      {
                        <div
                          className="hide-scrollbar h-[430px]  overflow-y-auto w-full px-2 mx-1 rounded-lg shadow-lg border"
                          style={{
                            backgroundColor: designformData?.bgColor,
                            color: designformData?.textColor,
                          }}
                        >
                          <div className="flex items-start justify-between text-sm  ">
                            <h2 className="text-[.8rem]  font-semibold py-3 pl-2">
                              {designformData?.logo ? (
                                <img
                                  src={
                                    designformData?.logo instanceof File ||
                                    designformData?.logo instanceof Blob
                                      ? URL.createObjectURL(designformData.logo)
                                      : designformData?.logo
                                  }
                                  alt={"something"}
                                  className="w-[113px] h-[36px] my-1  object-cover object-center   "
                                />
                              ) : (
                                designformData?.stampName
                              )}
                            </h2>
                            {routeMa[cardType]?.keys?.heading2 && (
                              <div>
                                <h2 className="text-[.7rem]  font-semibold py-1 ">
                                  {routeMa[cardType]?.keys?.heading2?.text1}
                                </h2>
                                <h4 className="text-center text-[.7rem]">
                                  {routeMa[cardType]?.keys?.heading2?.text2}
                                </h4>
                              </div>
                            )}
                          </div>
                          <div
                            id="cardImage"
                            style={{
                              backgroundColor: designformData?.stampbackground
                                ? ""
                                : (designformData?.cardType === "Stamp" &&
                                    designformData?.bgUnderStampsColor) ||
                                  designformData?.backgroundColorFortheCenterPart,
                              backgroundImage: designformData?.stampbackground
                                ? `url(${
                                    designformData?.stampbackground instanceof
                                      File ||
                                    designformData?.stampbackground instanceof
                                      Blob
                                      ? URL.createObjectURL(
                                          designformData?.stampbackground
                                        )
                                      : designformData?.stampbackground
                                  })`
                                : "",
                              backgroundPosition:
                                designformData?.stampbackground ? "center" : "",
                              backgroundSize: designformData?.stampbackground
                                ? "contain"
                                : "",
                              height: "110px",
                            }}
                            className=" p-1 flex  justify-center mb-3 "
                          >
                            {cardType === "Stamp" ? (
                              <div
                                className={
                                  designformData.selectedNumber == 2
                                    ? `flex   flex-wrap px-2  gap-1 w-full   strach justify-center`
                                    : `grid ${getSelectedNumber()} w-full gap-y-1 gap-x-1 h-full  items-center justify-items-center px-2 `
                                }
                              >
                                <>
                                  {Array.from({
                                    length:
                                      alldata?.cards[0]?.totalStamps >=
                                      alldata?.cards[0]?.remainingStamps
                                        ? alldata?.cards[0]?.consumedStamps
                                        : alldata?.cards[0]?.totalStamps,
                                  }).map((_, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        height:
                                          designformData?.selectedNumber <= 19
                                            ? Math.ceil(
                                                40 -
                                                  Math.floor(
                                                    designformData?.selectedNumber /
                                                      4
                                                  ) *
                                                    4
                                              )
                                            : "1.3rem",
                                        width:
                                          designformData?.selectedNumber <= 19
                                            ? Math.ceil(
                                                40 -
                                                  Math.floor(
                                                    designformData?.selectedNumber /
                                                      4
                                                  ) *
                                                    4
                                              )
                                            : "1.3rem",
                                        backgroundColor:
                                          designformData?.stampBgColor,
                                        borderColor:
                                          designformData?.outlineColor,
                                      }}
                                      className="border  flex justify-center  items-center rounded-full overflow-hidden"
                                    >
                                      {designformData?.activeStampImg ? (
                                        <img
                                          src={
                                            designformData?.activeStampImg instanceof
                                              File ||
                                            designformData?.activeStampImg instanceof
                                              Blob
                                              ? URL.createObjectURL(
                                                  designformData.activeStampImg
                                                )
                                              : designformData?.activeStampImg
                                          }
                                          alt="Selected"
                                          className="w-full h-full object-cover object-center"
                                        />
                                      ) : (
                                        <span
                                          style={{
                                            color:
                                              designformData.activeStampColor,
                                            fontSize:
                                              24 -
                                              Math.floor(
                                                alldata?.cards[0]?.totalStamps /
                                                  4
                                              ) *
                                                2,
                                          }}
                                        >
                                          {
                                            activeStampList[
                                              designformData.activeStampIcon
                                            ]?.icon
                                          }
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </>

                                {Array.from({
                                  length:
                                    alldata?.cards[0]?.totalStamps -
                                    alldata?.cards[0]?.consumedStamps,
                                }).map((_, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      height:
                                        designformData?.selectedNumber <= 19
                                          ? Math.ceil(
                                              40 -
                                                Math.floor(
                                                  designformData?.selectedNumber /
                                                    4
                                                ) *
                                                  4
                                            )
                                          : "1.3rem",
                                      width:
                                        designformData?.selectedNumber <= 19
                                          ? Math.ceil(
                                              40 -
                                                Math.floor(
                                                  designformData?.selectedNumber /
                                                    4
                                                ) *
                                                  4
                                            )
                                          : "1.3rem",
                                      backgroundColor:
                                        designformData?.stampBgColor,
                                      borderColor: designformData?.outlineColor,
                                    }}
                                    className="border flex justify-center  items-center rounded-full overflow-hidden"
                                    aria-disabled={true}
                                  >
                                    {designformData.inactiveStampImg ? (
                                      <img
                                        src={
                                          designformData?.inactiveStampImg instanceof
                                            File ||
                                          designformData?.inactiveStampImg instanceof
                                            Blob
                                            ? URL.createObjectURL(
                                                designformData.inactiveStampImg
                                              )
                                            : designformData?.inactiveStampImg
                                        }
                                        alt="Selected"
                                        className="w-full h-full object-cover object-center"
                                        // onLoad={(e) => URL.revokeObjectURL(routeMap["Stamp"].keys.activeStampImg)}
                                      />
                                    ) : (
                                      <span
                                        style={{
                                          color:
                                            designformData?.inActiveStampColor,
                                          fontSize:
                                            24 -
                                            Math.floor(
                                              designformData?.selectedNumber / 4
                                            ) *
                                              2,
                                        }}
                                        className="text-gray-400"
                                      >
                                        {
                                          disableStampList[
                                            designformData?.inactiveStampIcon
                                          ]?.icon
                                        }
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className=" py-6 text-xs">
                                <h2>{routeMa[cardType]?.keys?.bg}</h2>
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between px-2">
                            <div>
                              <p className="text-[9.6px] font-bold truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[108px]">
                                {designformData?.fields[0]?.fieldName}
                              </p>

                              {designformData?.cardType === "Stamp" &&
                              designformData?.fields[0]?.fieldName ===
                                "Stamps until the reward" ? (
                                <p className="text-[18.2px]">
                                  {"Stamps " + designformData.selectedNumber}
                                </p>
                              ) : (
                                <p className="text-[18.2px]">{t("nodata")}</p>
                              )}
                            </div>
                            <div>
                              <p className="text-[9.6px] font-bold truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[108px]">
                                {designformData?.fields[1]?.fieldName}
                              </p>

                              {designformData?.cardType === "Stamp" &&
                              designformData?.fields[1]?.fieldName ===
                                "Available Reward" ? (
                                <p className="text-[18.2px] float-right">
                                  {" "}
                                  {"Rewards " + designformData?.active}
                                </p>
                              ) : (
                                <p className="text-[18.2px] float-right">
                                  {" "}
                                  {t("nodata")}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-center items-end h-[140px]">
                            {alldata?.customerbarcode ? (
                              <img
                                src={alldata?.customerbarcode}
                                className="w-[90%] my-2"
                                alt="PDF417 Barcode"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      }
                    </div>
                  }
                />
              )}
            </div>
          </div>

          <div className="text-center">
            <p className="font-bold text-xl">{t("passsetting")}</p>
            {designformData && (
              <div className="pt-10 w-full max-w-md mx-auto">
                {/* Stamp Display */}
                <div className="mt-2">
                  <div className="flex mx-6 gap-1 gap-y-2 justify-evenly flex-wrap">
                    <>
                      {Array.from({
                        length:
                          alldata?.cards[0]?.totalStamps >=
                          alldata?.cards[0]?.remainingStamps
                            ? alldata?.cards[0]?.consumedStamps
                            : alldata?.cards[0]?.totalStamps,
                      }).map((_, index) => (
                        <div
                          key={index}
                          style={{
                            height:
                              48 -
                              Math.floor(alldata?.cards[0]?.totalStamps / 4) *
                                4,
                            width:
                              48 -
                              Math.floor(alldata?.cards[0]?.totalStamps / 4) *
                                4,
                            borderColor: designformData?.outlineColor,
                            backgroundColor: designformData?.stampBgColor,
                          }}
                          className="border border-[#595163] flex justify-center  items-center rounded-full overflow-hidden"
                        >
                          {designformData?.activeStampImg ? (
                            <img
                              src={
                                designformData?.activeStampImg instanceof
                                  File ||
                                designformData?.activeStampImg instanceof Blob
                                  ? URL.createObjectURL(
                                      designformData.activeStampImg
                                    )
                                  : designformData?.activeStampImg
                              }
                              alt="Selected"
                              className="w-full h-full object-cover object-center"
                            />
                          ) : (
                            <span
                              style={{
                                color: designformData.activeStampColor,
                                fontSize:
                                  24 -
                                  Math.floor(
                                    alldata?.cards[0]?.totalStamps / 4
                                  ) *
                                    2,
                              }}
                            >
                              {
                                activeStampList[designformData.activeStampIcon]
                                  ?.icon
                              }
                            </span>
                          )}
                        </div>
                      ))}
                    </>

                    {Array.from({
                      length:
                        alldata?.cards[0]?.totalStamps -
                        alldata?.cards[0]?.consumedStamps,
                    }).map((_, index) => (
                      <div
                        key={index}
                        style={{
                          height:
                            48 -
                            Math.floor(designformData?.selectedNumber / 4) * 4,
                          width:
                            48 -
                            Math.floor(designformData?.selectedNumber / 4) * 4,
                          borderColor: designformData?.outlineColor,
                          backgroundColor: designformData?.stampBgColor,
                        }}
                        className="border border-[#595163] flex justify-center  items-center rounded-full overflow-hidden"
                        aria-disabled={true}
                      >
                        {designformData.inactiveStampImg ? (
                          <img
                            src={
                              designformData?.inactiveStampImg instanceof
                                File ||
                              designformData?.inactiveStampImg instanceof Blob
                                ? URL.createObjectURL(
                                    designformData.inactiveStampImg
                                  )
                                : designformData?.inactiveStampImg
                            }
                            alt="Selected"
                            className="w-full h-full object-cover object-center"
                            // onLoad={(e) => URL.revokeObjectURL(routeMap["Stamp"].keys.activeStampImg)}
                          />
                        ) : (
                          <span
                            style={{
                              color: designformData?.inActiveStampColor,
                              fontSize:
                                24 -
                                Math.floor(designformData?.selectedNumber / 4) *
                                  2,
                            }}
                            className="text-gray-400"
                          >
                            {
                              disableStampList[
                                designformData?.inactiveStampIcon
                              ]?.icon
                            }
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mx-auto ">
                  <div className="flex my-8 ">
                    <button
                      className={`w-full py-2 ${
                        section === "point"
                          ? "text-white bg-black"
                          : "text-black"
                      }  rounded  transition`}
                      onClick={() => {
                        setSection("point");
                        setPoints(0);
                        // handleAddPoint();
                      }}
                    >
                      {t("addpoint")}
                    </button>
                    <button
                      className={`w-full py-2 ${
                        section === "redeem"
                          ? "text-white bg-black"
                          : "text-black"
                      }   transition`}
                      onClick={() => {
                        // Implement Redeem Point functionality if more complex logic is needed
                        // handleRedeemPoint();
                        setPoints(0);
                        setSection("redeem");
                      }}
                    >
                      {t("redempoint")}
                    </button>
                  </div>
                  <div className="flex bg-white mb-3 justify-between p-4 gap-2">
                    <button
                      className="flex justify-center items-center cursor-pointer p-3 rounded-3xl bg-gray-50 hover:bg-gray-100 transition"
                      onClick={handleRedeemPoint}
                    >
                      <FaMinus className="text-xl text-red-500" />
                    </button>
                    <p className="text-2xl">{points}</p>
                    <button
                      className="flex justify-center items-center cursor-pointer rounded-3xl p-3 bg-gray-50 hover:bg-gray-100 transition"
                      onClick={handleAddPoint}
                      disabled={isAdding}
                    >
                      <GoPlus className="text-2xl text-green-500" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1">
                  <button
                    disabled={
                      (points === 0 && section === "point") ||
                      (section === "redeem" &&
                        (points === 0 || points > alldata?.cards[0].rewards))
                    }
                    className={`w-full py-2 ${
                      (points === 0 && section === "point") ||
                      (section === "redeem" &&
                        (points === 0 || points > alldata?.cards[0].rewards))
                        ? "text-black bg-gray-200 hover:bg-gray-300"
                        : "text-white bg-black hover:bg-gray-900"
                    } rounded transition`}
                    onClick={() => {
                      openModal();
                    }}
                  >
                    {section === "redeem" ? "Redeem Point" : "Add Stamps"}
                  </button>
                </div>

                {/* Point and Visit Information */}
                <div className="mt-8">
                  <div className="flex justify-between text-gray-500 py-2">
                    <p>{t("activeStamps")}</p>
                    <p>{alldata?.cards[0]?.consumedStamps}</p>
                  </div>
                  <Divider />
                  <div className="flex justify-between text-gray-500 py-2">
                    <p>{t("avstamps")}</p>
                    <p>{alldata?.cards[0]?.remainingStamps}</p>
                  </div>
                  <Divider />
                  <div className="flex justify-between text-gray-500 py-2">
                    <p>{t("avrews")}</p>
                    <p>{alldata?.cards[0]?.rewards}</p>
                  </div>
                  <Divider />
                  {designformData.cardExpirationFixedTermDate && (
                    <div className="flex justify-between text-gray-500 py-2">
                      <p>{t("cardexpdate")}</p>
                      <p>
                        {new Date(
                          designformData?.cardExpirationFixedTermDate
                        ).toDateString()}
                      </p>
                    </div>
                  )}
                  <Divider />
                  <div className="flex justify-between text-gray-500 py-2">
                    <p>{t("cardinstdate")}</p>
                    <p>{new Date(alldata?.createdAt).toDateString()}</p>
                  </div>
                  <Divider />
                  <div className="flex justify-between text-gray-500 py-2">
                    <p>{t("lastaccural")}</p>
                    <p>
                      {new Date(alldata?.cards[0]?.updatedAt).toDateString()}
                    </p>
                  </div>
                  <Divider />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <ConfirmationModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        userName={alldata?.first_name + " " + alldata?.last_name}
        numberOfStamps={12}
        updatepoint={updatepoint}
        updateredeem={updateredeem}
        section={section}
      />
      <Loader loading={loading} />
    </div>
  );
};
export default CustomerrewardView;
