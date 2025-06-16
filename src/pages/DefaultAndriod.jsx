import React, { useRef, useEffect, useState } from "react";

import QRCode from "react-qr-code";

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
import { useTranslation } from "react-i18next";
const ensureProtocol = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return "http://" + url;
  }
  return url;
};
const activeLink_list = [
  {
    name: "Email",
  },
  {
    name: "Facebook",
  },
  {
    name: "Weapon",
  },
  {
    name: "LGBTQ",
  },
  {
    name: "LGBTQIA+",
  },
];
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
  { icon: <FaShoppingCart className="disabled-icon" />, name: "Shopping Cart" },
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
const DefaultAndriod = ({
  designformData,
  pushMessage,
  routeMap,
  chat,
  swipping,
  cardType,
  stampName,
  barcode,
  alldata,
}) => {
  const { t } = useTranslation("defaultandriod");

  const containerRef = useRef(null);
  const [stampSize, setStampSize] = useState(50);

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
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      // Adjust the stamp size based on container height, you can modify this logic
      const newStampSize = Math.min(containerHeight / 5, 50);
      setStampSize(newStampSize);
    }
  }, [containerRef.current]);

  function getFieldValueByName(customer, fieldName, data) {
    const Transactionamount = customer?.cards[0]?.discount?.Transactionamount;
    const getNextTier = (amount) => {
      return data?.tiers?.find((tier) => amount < tier.spendToAchieve);
    };

    const nextTier = getNextTier(Transactionamount);
    switch (fieldName) {
      case "First Name":
        return "Tester";
      case "Last Name":
        return "Vexion";
      case "Email":
        return customer?.email || t("exemail");
      case "Phone":
        return customer?.phone || t("phoneno");
      case "Date of Birth":
        return new Date(customer?.date_of_birth)?.toLocaleDateString() || "N/A";
      case "Available Reward":
        return "0";
      case "Reward":
        return "0";
      case "Summary stamps count":
        return "0";
      case "Stamps until the reward":
        return "0";
      case "Expiration Date":
        return (
          ` ${new Date(
            data?.cardExpirationFixedTermDate
          )?.toLocaleDateString()}` || "--------"
        );

      case "Spend to rich next level":
        return `${nextTier?.spendToAchieve - Transactionamount}` || "0";
      case "Discount status":
        return (
          ` ${customer?.cards[0]?.discount?.discountstatus}` ||
          `${data?.tiers[0]?.tierName}`
        );
      case "Discount percentage":
        return (
          `${customer?.cards[0]?.discount?.discountlevel}%` ||
          `${data?.tiers[0]?.percentage}%`
        );
      case "Reward for the first visit":
        return `${data?.rewardForTheFirstVisit}` || "1";
      default:
        return "N/A";
    }
  }

  return (
    <div className="flex jsutify-content-center rounded-lg ">
      {chat ? (
        <div
          style={{ backgroundColor: "gray", color: "white" }}
          className="text-white p-3 rounded-md"
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              {designformData?.icon ? (
                <img
                  src={
                    designformData?.icon instanceof File
                      ? URL.createObjectURL(designformData?.icon)
                      : designformData?.icon
                  }
                  alt="icon"
                  className="w-5 h-5 rounded-md"
                />
              ) : (
                <img
                  src="/assets/logo.svg"
                  alt="icon"
                  className="w-5 h-5 rounded-md"
                />
              )}
              <span className="text-[11px] font-light">
                {designformData?.companyName
                  ? designformData?.companyName
                  : t("companyname")}
              </span>
            </div>
            <div className="text-[11px] font-light">{t("now")}</div>
          </div>
          <div className="mt-1">
            <p className="text-[11px]">{pushMessage}</p>
          </div>
        </div>
      ) : swipping !== "information" ? (
        <div
          className="hide-scrollbar max-h-[410px]  overflow-y-auto w-full  mx-1 rounded-lg shadow-lg border"
          style={{
            backgroundColor: designformData?.bgColor,
            color: designformData?.textColor,
          }}
        >
          <div className="flex items-start justify-between text-sm">
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
                  className="w-[113px] h-[36px] my-1  object-cover object-center  "
                />
              ) : (
                stampName
              )}
            </h2>
            {routeMap[cardType]?.keys?.heading2 && (
              <div>
                <h2 className="text-[.7rem]  font-semibold py-1 ">
                  {routeMap[cardType]?.keys?.heading2?.text1}
                </h2>
                <h4 className="text-center text-[.7rem]">
                  {routeMap[cardType]?.keys?.heading2?.text2}
                </h4>
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
              designformData?.fields[1]?.fieldName === "Available Reward" ? (
                <p className="text-[18.2px] float-right">
                  {" "}
                  {"Rewards " + designformData?.active}
                </p>
              ) : (
                <p className="text-[18.2px] float-right"> {t("nodata")}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center items-end h-[100px] mb-10">
            {barcode ? (
              <img
                src={barcode}
                className="w-[90%] my-2 "
                alt="PDF417 Barcode"
              />
            ) : (
              <div
                className="flex flex-col justify-center items-center mb-[-30px]"
                style={{
                  padding: "10px",
                  borderRadius: "3px",
                  backgroundColor: "white",
                }}
              >
                {/* //     <Barcode
                        //     value={"1489276542312312"}
                        //     width={0.9}
                        //     height={30}
                        //     format="CODE128"
                        //     displayValue={true}
                        //     fontOptions="bold"
                        //     font="Arial"
                        //     textAlign="center"
                        //     textPosition="bottom"
                        //     textMargin={5}
                        //     fontSize={15}
                        //     background="#ffffff"
                        //     lineColor="#000000"
                        //     margin={10}
                        //     className="rounded"
                        // /> */}

                <QRCode value="1489276542312312" size={70} />

                {/*<p style={{ marginTop: "10px", fontWeight: "bold", fontSize: "15px" }}>*/}
                {/*    1489276542312312*/}
                {/*</p>*/}
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
                    designformData?.stampbackground instanceof File ||
                    designformData?.stampbackground instanceof Blob
                      ? URL.createObjectURL(designformData?.stampbackground)
                      : designformData?.stampbackground
                  })`
                : "",
              backgroundPosition: designformData?.stampbackground
                ? "center"
                : "",

              backgroundSize: designformData?.stampbackground ? "cover" : "",
              backgroundRepeat: designformData?.stampbackground
                ? "no-repeat"
                : "",
              height: "100px",
            }}
            className="px-1 flex  justify-center"
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
                      designformData.selectedNumber >= designformData.active
                        ? designformData.active
                        : designformData.selectedNumber,
                  }).map((_, index) => (
                    <div
                      key={index}
                      style={{
                        height:
                          designformData?.selectedNumber <= 19
                            ? Math.ceil(
                                38 -
                                  Math.floor(
                                    designformData?.selectedNumber / 4
                                  ) *
                                    4
                              )
                            : "1.3rem",
                        width:
                          designformData?.selectedNumber <= 19
                            ? Math.ceil(
                                40 -
                                  Math.floor(
                                    designformData?.selectedNumber / 4
                                  ) *
                                    4
                              )
                            : "1.3rem",
                        backgroundColor: designformData?.stampBgColor,
                        borderColor: designformData?.outlineColor,
                      }}
                      className="border  flex justify-center  items-center rounded-full overflow-hidden"
                    >
                      {designformData?.activeStampImg ? (
                        <img
                          src={
                            designformData?.activeStampImg instanceof File ||
                            designformData?.activeStampImg instanceof Blob
                              ? URL.createObjectURL(
                                  designformData.activeStampImg
                                )
                              : designformData?.activeStampImg
                          }
                          alt="Selected"
                          className="w-full h-full object-cover object-center "
                        />
                      ) : (
                        <span
                          style={{
                            color: designformData.activeStampColor,
                            fontSize:
                              24 -
                              Math.floor(designformData?.selectedNumber / 4) *
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
                    designformData.selectedNumber > designformData.active
                      ? designformData.selectedNumber - designformData?.active
                      : 0,
                }).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      height:
                        designformData?.selectedNumber <= 19
                          ? Math.ceil(
                              40 -
                                Math.floor(designformData?.selectedNumber / 4) *
                                  4
                            )
                          : "1.3rem",
                      width:
                        designformData?.selectedNumber <= 19
                          ? Math.ceil(
                              40 -
                                Math.floor(designformData?.selectedNumber / 4) *
                                  4
                            )
                          : "1.3rem",
                      backgroundColor: designformData?.stampBgColor,
                      borderColor: designformData?.outlineColor,
                    }}
                    className="border  flex justify-center items-center rounded-full overflow-hidden text-gray-400"
                    aria-disabled={true}
                  >
                    {designformData.inactiveStampImg ? (
                      <img
                        src={
                          designformData?.inactiveStampImg instanceof File ||
                          designformData?.inactiveStampImg instanceof Blob
                            ? URL.createObjectURL(
                                designformData.inactiveStampImg
                              )
                            : designformData?.inactiveStampImg
                        }
                        alt="Selected"
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <span
                        style={{
                          color: designformData?.inActiveStampColor,
                          fontSize:
                            24 -
                            Math.floor(designformData?.selectedNumber / 4) * 2,
                        }}
                      >
                        {
                          disableStampList[designformData?.inactiveStampIcon]
                            ?.icon
                        }
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className=" py-6 text-xs">
                <h2>{routeMap[cardType]?.keys?.bg}</h2>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{ color: "black", backgroundColor: "white" }}
            className={`hide-scrollbar max-h-[560px]   w-full overflow-y-auto w-full rounded-lg px-2 absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out ${"translate-y-0"}`}
          >
            <div
              style={{ color: "black", backgroundColor: "white" }}
              className="hide-scrollbar   w-full overflow-y-auto w-full rounded-lg px-2"
            >
              <p className="text-[13px] font-bold m-2">{t("detail")}</p>

              <div className="">
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
                          designformData?.stampbackground instanceof File ||
                          designformData?.stampbackground instanceof Blob
                            ? URL.createObjectURL(
                                designformData?.stampbackground
                              )
                            : designformData?.stampbackground
                        })`
                      : "",
                    backgroundPosition: designformData?.stampbackground
                      ? "center"
                      : "",
                    backgroundSize: designformData?.stampbackground
                      ? "contain"
                      : "",
                  }}
                  className="p-1 border flex justify-center"
                >
                  {cardType === "Stamp" ? (
                    <div
                      className={
                        designformData.selectedNumber == 2
                          ? `flex   flex-wrap px-2  gap-1 w-full   strach justify-center`
                          : `grid ${getSelectedNumber()} w-full gap-y-1 gap-x-1 h-full  items-center justify-items-center px-2 `
                      }
                    >
                      {/* Active Stamps */}
                      {Array.from({
                        length:
                          designformData.selectedNumber >= designformData.active
                            ? designformData.active
                            : designformData.selectedNumber,
                      }).map((_, index) => (
                        <div
                          key={index}
                          style={{
                            height:
                              designformData?.selectedNumber <= 19
                                ? Math.ceil(
                                    40 -
                                      Math.floor(
                                        designformData?.selectedNumber / 4
                                      ) *
                                        4
                                  )
                                : "1.3rem",
                            width:
                              designformData?.selectedNumber <= 19
                                ? Math.ceil(
                                    40 -
                                      Math.floor(
                                        designformData?.selectedNumber / 4
                                      ) *
                                        4
                                  )
                                : "1.3rem",
                            backgroundColor: designformData?.stampBgColor,
                            borderColor: designformData?.outlineColor,
                          }}
                          className="border flex justify-center items-center rounded-full overflow-hidden mb-2 sm:mb-1"
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
                                fontSize: `${
                                  24 -
                                  Math.floor(
                                    designformData?.selectedNumber / 4
                                  ) *
                                    2
                                }px`,
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

                      {/* Inactive Stamps */}
                      {Array.from({
                        length:
                          designformData.selectedNumber > designformData.active
                            ? designformData.selectedNumber -
                              designformData?.active
                            : 0,
                      }).map((_, index) => (
                        <div
                          key={index}
                          style={{
                            height:
                              designformData?.selectedNumber <= 19
                                ? Math.ceil(
                                    40 -
                                      Math.floor(
                                        designformData?.selectedNumber / 4
                                      ) *
                                        4
                                  )
                                : "1.3rem",
                            width:
                              designformData?.selectedNumber <= 19
                                ? Math.ceil(
                                    40 -
                                      Math.floor(
                                        designformData?.selectedNumber / 4
                                      ) *
                                        4
                                  )
                                : "1.3rem",
                            backgroundColor: designformData?.stampBgColor,
                            borderColor: designformData?.outlineColor,
                          }}
                          className="border  flex justify-center items-center rounded-full overflow-hidden mb-2 sm:mb-1"
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
                              alt="Inactive"
                              className="w-full h-full object-cover object-center"
                            />
                          ) : (
                            <span
                              style={{
                                color: designformData?.inActiveStampColor,
                                fontSize: `${
                                  24 -
                                  Math.floor(
                                    designformData?.selectedNumber / 4
                                  ) *
                                    2
                                }px`,
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
                    <div className="py-6 text-xs sm:text-sm md:text-base lg:text-xs">
                      <h2>{routeMap[cardType]?.keys?.bg}</h2>
                    </div>
                  )}
                </div>
              </div>

              <div className="py-4 px-3 mt-2  rounded-md">
                <hr className="my-4" />
                <p className="font-bold text-[12px]">{t("firstname")}</p>
                <p className="text-[12px]">
                  {getFieldValueByName(alldata, "First Name", designformData)}
                </p>
                <hr className="my-4" />
                <p className="font-bold text-[12px]">Last</p>
                <p className="text-[12px]">
                  {getFieldValueByName(alldata, "Last Name", designformData)}
                </p>
                <hr className="my-4" />
                <p className="font-bold text-[12px]">{t("phone")}</p>
                <p className="text-[12px]">
                  {getFieldValueByName(alldata, "Phone", designformData)}
                </p>
                <hr className="my-4" />
                <p className="font-bold text-[12px]">{t("email")}</p>
                <p className="text-[12px]">
                  {getFieldValueByName(alldata, "Email", designformData)}
                </p>

                {cardType === "Stamp" ? (
                  <div>
                    <hr className="my-4" />
                    <p className="font-bold text-[12px]">
                      {t("sumstampcount")}
                    </p>
                    <p className="text-[12px]">0</p>
                    <hr className="my-4" />
                    <p className="font-bold text-[12px]">
                      {t("stampuntilreward")}
                    </p>
                    <p className="text-[12px]">
                      {designformData?.selectedNumber || "0"}
                    </p>
                    <hr className="my-4" />
                    <p className="font-bold text-[12px]">
                      {t("avialablereward")}
                    </p>
                    <p className="text-[12px]">
                      {alldata?.cards[0]?.rewards || "0"}
                    </p>
                  </div>
                ) : cardType === "Discount" ? (
                  <div>
                    <hr className="my-4" />
                    <p className="font-bold text-[12px]">{t("descstatus")}</p>
                    <p className="text-[12px]">
                      {designformData?.tiers[0]?.tierName}
                    </p>

                    <hr className="my-4" />
                    <p className="font-bold text-[12px]">{t("discpage")}</p>
                    <p className="text-[12px]">
                      {designformData?.tiers[0]?.percentage}%
                    </p>
                  </div>
                ) : cardType === "Coupon" ? (
                  <div>
                    <hr className="my-4" />
                    <p className="font-bold text-[12px]">{t("rewdata")}</p>
                    <p className="text-[12px]">
                      {getFieldValueByName(
                        alldata,
                        "Reward for the first visit",
                        designformData
                      )}
                    </p>
                  </div>
                ) : (
                  <div>
                    <hr className="my-4" />
                    <p className="font-bold text-[12px]">
                      {t("avialablereward")}
                    </p>
                    {/* <p className="text-[12px]">{alldata?.cards[0]?.rewards}</p> */}
                  </div>
                )}

                <p className="text-[12px] mt-3">
                  {" "}
                  <a href="talha">{t("companyname")}</a>{" "}
                </p>
                <p className="text-[13px] text-gray-400  hover:text-gray-800">
                  {designformData?.companyName}
                </p>
                {/* <p className="text-[12px] mt-3">Reward details</p>
                                <p className="text-[13px] text-gray-400  hover:text-gray-800">{designformData?.rewardDetails}</p> */}
                {cardType === "Stamp" && (
                  <span>
                    <p className="text-[12px] mt-3">{t("ernstmpmsg")}</p>
                    <p className="text-[13px] text-gray-400  hover:text-gray-800">
                      {designformData?.earnedStampMessage}
                    </p>
                    <p className="text-[12px] mt-3">{t("earnrewmsg")}</p>
                    <p className="text-[13px] text-gray-400  hover:text-gray-800">
                      {designformData?.earnedRewardMessage}
                    </p>
                    <hr className="my-4" />
                  </span>
                )}

                {/* <p className="font-bold text-[12px] mt-3">Referral program</p>
          <p className="text-[12px]">{designformData?.referralProgram}</p> */}

                {/* {designformData?.referralProgram === "active" ? (
            <>
              <p className="font-bold text-[12px] mt-3">
                Get bonus at the moment when
              </p>
              <p className="text-[12px]">
                {designformData?.bonusMoment === "first_visit" ? (
                  <>First visit / card use by a new customer</>
                ) : designformData?.bonusMoment === "new_customer" ? (
                  <>Card issuing to a new customer</>
                ) : (
                  <>select radio button</>
                )}
              </p>
            </>
          ) : (
            <></>
          )} */}
                {/* <hr className="my-4" />

          {designformData?.activeLinks?.length > 0 && <p className="font-bold text-[12px] mt-3">Active Links</p>}
          <p className="text-[12px]">
            {designformData?.activeLinks?.map((value, index) => {
              return (
                <div key={index}>
                  <a
                    className="text-blue-400"
                    href={ensureProtocol(value.link)}
                    target="_blank"
                    rel="noopener noreferrer"

                  >
                    {value.text}
                  </a>
                  <br />
                </div>
              );
            })}
          </p> */}
                {/* <hr className="my-4" /> */}
                {designformData?.termsOfUseSwitch === false ? (
                  ""
                ) : (
                  <p className="text-[12px] mt-3">{t("termofuse")}</p>
                )}

                {designformData?.termsOfUseSwitch === false ? (
                  ""
                ) : (
                  <p
                    style={{
                      whiteSpace: "pre-wrap", // Preserves newlines and spaces
                      wordWrap: "break-word", // Ensures long words wrap properly
                    }}
                    className="text-[13px] text-gray-400  hover:text-gray-800"
                  >
                    {designformData?.termsOfUse}
                  </p>
                )}

                {/* {designformData?.feedBackLinks?.length > 0 && <p className="font-bold text-[12px] mt-3">Feedback Links</p>}
          <p className="text-[12px]">
            {designformData?.feedBackLinks?.map((value, index) => {
              return (
                <>
                  <a
                    className="text-blue-400"
                    href={ensureProtocol(value.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    {value.service}
                  </a>
                  <br />
                </>
              );
            })}
          </p> */}
                {/* <hr className="my-4" />


          <hr className="my-4" /> */}

                {designformData?.issuerCompanyName && (
                  <p className="text-[12px] mt-3">{t("isrinfo")}</p>
                )}
                <p className="text-[12px] text-blue-400">
                  {designformData?.issuerCompanyName}
                  <br />
                  {designformData?.issuerEmail}
                  <br />
                  {designformData?.issuerPhone}
                </p>
                <hr className="my-4" />

                <p className="text-[12px] text-center">
                  {t("tapformoredetail")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DefaultAndriod;
