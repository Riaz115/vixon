import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsQrCode } from "react-icons/bs";
import { CiCircleQuestion } from "react-icons/ci";
import { GoDash } from "react-icons/go";
import { CgEditMarkup } from "react-icons/cg";
import StylishLoader from "./modal/StylishLoader";
import { useTranslation } from "react-i18next";
const StampsNavigation = ({
  information,
  desginIconE,
  previewModel,
  design,
  settings,
  cardType,
  qrCode,
  routeMap,
  setglobalCard,
  setSwipping,
  swipping,
  setopenModel,
  generatePDF,
  stampName,
  setStampName,
  savedatapreview,
  data,
  loading,
}) => {
  const { t } = useTranslation("firstStampnavigation");

  const navigate = useNavigate();
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const generatedocument = async () => {
    setLoader(true);
    await generatePDF(data);
    setLoader(false);
  };

  return (
    <div className="hide-scrollbar fixed left-0 top-[4rem] w-full  overflow-auto  bg-[#2E2E2E] flex items-center gap-2 box-border px-4 py-6 z-30">
      <div className="pr-3">
        <CgEditMarkup className="text-white text-xl" />
      </div>

      <div className="px-3 text-nowrap bg-[#1F1E1F] border border-[#83838A] text-white h-[33px] flex flex-1 justify-center items-center rounded">
        <input
          type="text"
          value={stampName}
          onChange={(e) => setStampName(e.target.value)}
          className="bg-transparent border-none text-white text-center focus:outline-none"
        />
      </div>
      <GoDash className="text-white" />
      <button
        onClick={() => {
          setSwipping("cardtype");
        }}
        className={
          swipping === "cardtype"
            ? " px-3 text-nowrap bg-white text-black border border-[#83838A] h-[33px] flex flex-1 justify-center items-center rounded"
            : " px-3 text-nowrap bg-[#454545] text-white border border-[#83838A] h-[33px] flex flex-1 justify-center items-center rounded disabled"
        }
      >
        {t("cardtype")}
      </button>
      <GoDash className="text-white" />
      <button
        disabled={!settings}
        onClick={() => {
          setglobalCard(cardType);
          setSwipping(routeMap[cardType].settings);
        }}
        className={
          swipping === "setting"
            ? " px-3 text-nowrap bg-white text-black border border-[#83838A] h-[33px] flex flex-1 justify-center items-center rounded"
            : " px-3 text-nowrap bg-[#454545] text-white border border-[#83838A] h-[33px] flex flex-1 justify-center items-center rounded disabled"
        }
      >
        {t("settings")}
      </button>
      <GoDash className="text-white" />
      <button
        disabled={!design}
        onClick={() => {
          setglobalCard(cardType);
          setSwipping(routeMap[cardType].design);
        }}
        className={` 
          
          ${
            swipping === "design"
              ? `px-3 text-nowrap ${
                  desginIconE ? "bg-red-500 text-white" : "bg-white text-black"
                }   border border-[#83838A] h-[33px] flex flex-1 justify-center items-center rounded`
              : `px-3 text-nowrap bg-[#454545] text-white border border-[#83838A] h-[33px] flex flex-1 justify-center items-center rounded disabled ${
                  desginIconE ? "bg-red-500 text-white" : " text-black"
                } `
          } 
        `}
      >
        {t("design")}
      </button>
      <GoDash className="text-white" />
      <button
        disabled={!information}
        onClick={() => {
          setSwipping(routeMap[cardType].information);
          setglobalCard(cardType);
        }}
        className={
          swipping === "information"
            ? " px-3 text-nowrap bg-white text-black border border-[#83838A] h-[33px] flex flex-1 justify-center items-center rounded"
            : " px-3 text-nowrap bg-[#454545] text-white border border-[#83838A] h-[33px] flex flex-1 justify-center items-center rounded disabled"
        }
      >
        {t("information")}
      </button>
      <GoDash className="text-white" />
      {/* <NavLink className="text-nowrap bg-[#454545] text-white border border-[#83838A] h-[33px] flex px-3 justify-center items-center rounded">
        <CiCircleQuestion />
      </NavLink> */}
      {/* <GoDash className="text-white" /> */}

      <button
        disabled={!previewModel}
        onClick={() => savedatapreview()}
        className={
          swipping === "preview"
            ? "px-3 text-nowrap bg-white text-black border border-[#83838A] h-[33px] flex flex-1 justify-center items-center rounded"
            : "px-3 text-nowrap bg-[#454545] te xt-white border border-[#83838A] h-[33px] flex flex-1 justify-center items-center rounded disabled"
        }
      >
        {loading ? <span class="loader"></span> : t("saveprev")}
      </button>
      <GoDash className="text-white" />
      <button
        disabled={!qrCode}
        onClick={() => generatedocument()}
        className={`  ${
          qrCode ? "cursor-pointer text-white" : "cursor-not-allowed text-gray"
        } bg-[#454545]  border border-[#83838A] h-[33px] flex px-3 justify-center items-center rounded`}
      >
        {loader ? <StylishLoader size="sm" color="black" /> : <BsQrCode />}
      </button>
    </div>
  );
};

export default StampsNavigation;
