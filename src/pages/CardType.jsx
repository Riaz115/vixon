import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { CiDiscount1 } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { GiRoundShield } from "react-icons/gi";
import { GoGift } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RiCoupon3Line } from "react-icons/ri";
import { TfiGift } from "react-icons/tfi";
import { PhoneEmulatorContext } from "../contexts/PhoneEmulatorContext";
import { useTranslation } from "react-i18next";
function CardType({
  globalCard,
  handleSelectCardType,
  handleSelect,
  cardsActive,
  setCardsActive,
  CardType,
}) {
  const { t } = useTranslation("cardtype");

  const { setNavsteper } = useContext(PhoneEmulatorContext);
  // // //console.log(CardType,"this is  card type for use");
  const [currentActive, setCurrentActive] = useState(CardType);

  const isActive = (Key) => {
    return CardType === Key;
  };
  // useEffect(() => {
  //   document.title = "Card Type";
  //   setNavsteper({
  //     design: false,
  //     setting: false,
  //     preview: false,
  //     information: false,
  //   })
  // }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    setCurrentActive(CardType);
  }, [CardType]);

  // //console.log(currentActive, "this is current activ etab")

  return (
    <div>
      <div className=" ">
        <div className="">
          <div className="mb-6 pb-4 mt-3 border-b border-[#D5D5DD] gap-4  flex justify-start items-center">
            <h1 className="text-2xl  ">{t("cardtype")}</h1>
            <IoIosInformationCircleOutline className="text-2xl cursor-pointer" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <Card
              icon={GiRoundShield}
              buttonText={"High Retention"}
              title={"Stamp"}
              cardsActive={cardsActive}
              active={isActive("Stamp")}
              handelActive={handleSelectCardType}
              setCurrentActive={setCardsActive}
              setCurrent={setCurrentActive}
              setNavsteper={setNavsteper}
            />
            <Card
              icon={GoGift}
              buttonText={"High Retention"}
              title={"Reward"}
              cardsActive={cardsActive}
              active={isActive("Reward")}
              handelActive={handleSelectCardType}
              setCurrentActive={setCardsActive}
              setCurrent={setCurrentActive}
              setNavsteper={setNavsteper}
            />
            {/* <Card
              icon={FiUsers}
              buttonText={"High Retention"}
              title={"Membership"}
              active={isActive("Membership")}
              handelActive={handleSelectCardType}
              setCurrentActive={setCardsActive}
              setCurrent={setCurrentActive}
              setNavsteper={setNavsteper}
            /> */}
            <Card
              icon={CiDiscount1}
              buttonText={"High Retention"}
              title={"Discount"}
              active={isActive("Discount")}
              handelActive={handleSelectCardType}
              cardsActive={cardsActive}
              setCurrentActive={setCardsActive}
              setCurrent={setCurrentActive}
              setNavsteper={setNavsteper}
            />
            <Card
              icon={RiCoupon3Line}
              buttonText={"Best for acquisition"}
              title={"Coupon"}
              active={isActive("Coupon")}
              cardsActive={cardsActive}
              handelActive={handleSelectCardType}
              setCurrentActive={setCardsActive}
              setCurrent={setCurrentActive}
              setNavsteper={setNavsteper}
            />
            {/* <Card
              icon={TfiGift}
              buttonText={"Best for acquisition"}
              title={"Gift"}
              active={isActive("Gift")}
              handelActive={handleSelectCardType}
              setCurrentActive={setCardsActive}
              setCurrent={setCurrentActive}
              setNavsteper={setNavsteper}
            /> */}
          </div>
          <div
            onClick={() => {
              if (!currentActive) {
                return toast.info("Please Select Card Type");
              }
              handleSelect(currentActive);
              //// //console.log   .log(currentActive,"this is for active tab");
            }}
            className="col-span-3 text-center bg-black text-white py-3 rounded-md my-5 cursor-pointer"
          >
            {t("continue")}
          </div>
        </div>
      </div>
    </div>
  );
}
function Card({
  icon,
  title,
  buttonText,
  active,
  cross,
  handelActive,
  setCurrent,
  setNavsteper,
  cardsActive,
}) {
  return (
    <div
      className={`relative flex flex-col justify-center items-center px-3 py-10 gap-2 rounded-md border border-[#D5D5DD]   ${
        cardsActive[title] === true
          ? "cursor-pointer"
          : "opacity-50 cursor-not-allowed"
      }  ${
        active
          ? "bg-[#1F1E1F] text-white"
          : "bg-white shadow-md hover:shadow-none transition-shadow duration-300 hover:bg-[#EAEAED]"
      }    `}
      onClick={() => {
        if (cardsActive[title] === true) {
          setNavsteper({
            design: false,
            setting: false,
            preview: false,
            information: false,
          });
          setCurrent(title);
          handelActive(title);
        }
      }}
    >
      {cross && (
        <>
          <div className="border border-red-600 rotate-[27deg] w-full absolute"></div>
          <div className="border border-red-600 rotate-[333deg] w-full absolute"></div>
        </>
      )}
      {React.createElement(icon, { className: "text-4xl" })}
      <span className="text-medium">{title}</span>
      <div
        // to={link}
        className={`w-max text-xs border px-3 py-1 rounded-full cursor-pointer ${
          buttonText === "Best for acquisition"
            ? active
              ? "bg-[#4361ee] text-white border-blue-700"
              : "border-blue-700 text-blue-700 bg-[#a2d2ff]" // Light blue background and blue text/border
            : active
            ? "bg-[#1DCD27] text-white border-[#1DCD27]"
            : "border-[#1DCD27] text-[#1DCD27] bg-[#e4ffeb]"
        }`}
      >
        {buttonText}
      </div>
    </div>
  );
}

export default CardType;
