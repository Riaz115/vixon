import { useContext, useState, useEffect } from "react";

import { AiOutlineAndroid } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
// import { FaStar } from "react-icons/fa";
import { TfiApple } from "react-icons/tfi";
import { PhoneEmulator } from "../Components/PhoneEmulator";
import StampsNavigation from "../Components/StampsNavigation";
import { PhoneEmulatorContext } from "../contexts/PhoneEmulatorContext";
import Stepperview from "./Stepperview";
import { informationdata, designdata, routeMa, settingdata } from "../data";
import DefaultCardContent from "./DefaultCardContent";
import SaveAndPreview from "../Components/SaveAndPreview";
import { createStamp } from "../api/createstamp";
import { updateStamp } from "../api/createstamp";
import { Loader } from "../Components/Loader/loader";
import { useParams } from "react-router-dom";
import { viewPDF, generatePDF } from "../Components/convertdata";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { selectstamps } from "../redux/stampSlice";
import axios from "axios";
import { selectBusinesses } from "../redux/businessSlice";
import { serverUrl } from "../config";
import { useTranslation } from "react-i18next";

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
import { activeStamp } from "../api/createstamp";
import { updatestamps } from "../redux/stampSlice";
import { AddNewstamp } from "../redux/stampSlice";
import { useDispatch } from "react-redux";

import PDFPreViewser from "../utils/preView";
import DefaultAndriod from "./DefaultAndriod";
import Detailcontent from "./Detailcontent";
import { fieldNames } from "../Components/utils";
function Cards() {
  const { t } = useTranslation("forcards");

  const {
    updatePhoneData,
    emulatorContent,
    onlyPhone,
    setglobalCard,
    navSteper,
    setNavsteper,
  } = useContext(PhoneEmulatorContext);

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
  const [cardType, setCardType] = useState("Stamp");
  const [swipping, setSwipping] = useState("cardtype");
  const [previewModel, setPreviewModel] = useState(false);
  const [openModal, setopenModel] = useState(false);
  const [loading, setloading] = useState(false);
  const [qrCode, setQrCode] = useState(true);
  const [apple, setApple] = useState(true);
  const [andriod, setAndriod] = useState(false);
  const [chat, setChat] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [id, setId] = useState();
  const [stampName, setStampName] = useState("Stamp card № 3");
  const { cardid } = useParams();
  const [singledata, setSingledata] = useState();
  const [routeMap, setrouteMap] = useState(routeMa);
  const [desginIconE, setdesginIconE] = useState(false);
  const [ipnumber, setipnumber] = useState();
  const [countrydata, setcountrydata] = useState();

  const [cardsActive, setCardsActive] = useState({
    Stamp: true,
    Reward: true,
    Membership: true,
    Discount: true,
    Coupon: true,
    Gift: true,
  });

  const data = { ...designdata, ...informationdata, ...settingdata };
  const businessdata = useSelector(selectBusinesses);
  const page = useParams();
  const [designformData, setdesignFormData] = useState(data);
  const [pushMessage, setPushMessage] = useState(t("pushmsg"));

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    Object.keys(designformData).forEach((key) => {
      if (designformData[key] === "" && key !== "cardIssuingForm") {
        newErrors[key] = `${key} ${t("isrequire")}`;
      }
    });

    designformData.cardIssuingForm.forEach((field, index) => {
      if (field.required && !field.fieldName) {
        newErrors[`cardIssuingForm_${index}`] = `${field.fieldName} ${t(
          "isrequire"
        )}`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const [phoneMask, setPhoneMask] = useState();
  const stampdata = useSelector(selectstamps);
  const dispatch = useDispatch();

  const handleSelectqrcode = (qrcode) => {
    setQrCode(qrcode);
  };
  const toggelChat = () => {
    setChat(!chat);
    setAndriod(false);
    setApple(false);
  };
  const toggelAndriod = () => {
    setAndriod(!andriod);
    setChat(false);
    setApple(false);
  };
  const toggelApple = () => {
    setApple(!apple);
    setChat(false);
    setAndriod(false);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setPhoneMask(countryList);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    setCardType("Stamp");
    const updatedDesignFormData = { ...designformData };
    updatedDesignFormData.fields[0].fieldName = fieldNames["Stamp"][0].name;
    updatedDesignFormData.fields[0].fieldType = fieldNames["Stamp"][0].name;
    updatedDesignFormData.fields[1].fieldName = fieldNames["Stamp"][1].name;
    updatedDesignFormData.fields[1].fieldType = fieldNames["Stamp"][1].name;

    setdesignFormData(updatedDesignFormData);
  }, [page]);
  useEffect(() => {
    //console.log(ipnumber,"this is ip funcation")
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`${serverUrl}/get-country-info`, {
          headers: {
            "x-forwarded-for": ipnumber,
          },
        });
        //console.log("this is country name",response.data)
        if (
          response.data &&
          response.data.country &&
          cardid === "create" &&
          !id
        ) {
          setdesignFormData((prevState) => ({
            ...prevState,
            phoneMask: phoneMask?.find(
              (item) => item.code === response.data.country
            )?.name,
          }));
        }
        if (response.data.country) {
          setcountrydata(response.data.country);
        }
      } catch (error) {
        console.error("Error fetching country info:", error);
      }
    };
    if (ipnumber) {
      fetchCountry();
    }
  }, [phoneMask, phoneMask, cardid, ipnumber]);
  useEffect(() => {
    async function getUserIP() {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setipnumber(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    }

    getUserIP();
  }, []);

  useEffect(() => {
    if (cardid === "create") {
      const data = stampdata?.filter((item) => item.cardType === cardType);
      setStampName(cardType + " card " + "№" + (data?.length + 1));
      setCardType(cardType);
      // const updatedDesignFormData = { ...designformData };
      // updatedDesignFormData.fields[0].fieldName =
      //   fieldNames[cardType][0].name;
      // updatedDesignFormData.fields[0].fieldType =
      //   fieldNames[cardType][0].name;
      // updatedDesignFormData.fields[1].fieldName =
      //   fieldNames[cardType][1].name;
      // updatedDesignFormData.fields[1].fieldType =
      //   fieldNames[cardType][1].name;

      // setdesignFormData(updatedDesignFormData);
    } else {
      const finddata = stampdata.find((item) => item.id === cardid);
      if (finddata) {
        setSingledata(finddata);
        setdesignFormData(finddata);
        setCardType(finddata?.cardType);
        setId(finddata.id);
        setStampName(finddata?.stampName);
        setCardsActive({
          [finddata?.cardType]: true,
        });
        setNavsteper({
          design: true,
          setting: true,
          preview: true,
          information: true,
          qrCode: true,
        });
      }
    }
  }, [cardid, stampdata]);

  const handleSelectCardType = (selectedCardType) => {
    setCardType(selectedCardType);
    const updatedDesignFormData = { ...designformData };
    updatedDesignFormData.fields[0].fieldName =
      fieldNames[selectedCardType][0].name;
    updatedDesignFormData.fields[0].fieldType =
      fieldNames[selectedCardType][0].name;
    updatedDesignFormData.fields[1].fieldName =
      fieldNames[selectedCardType][1].name;
    updatedDesignFormData.fields[1].fieldType =
      fieldNames[selectedCardType][1].name;

    setdesignFormData(updatedDesignFormData);
    if (!id) {
      const data = stampdata?.filter(
        (item) => item.cardType === selectedCardType
      );
      setStampName(selectedCardType + " card " + "№" + (data?.length + 1));
    }
  };
  const handleSelectSetting = () => {
    setNavsteper({
      ...navSteper,
      design: true,
    });
    setSwipping(routeMap[cardType].design);
  };
  const handleSelectDesign = () => {
    setNavsteper({
      ...navSteper,
      information: true,
    });

    setSwipping(routeMap[cardType].information);
  };

  const handleSelectInformation = async () => {
    if (id) {
      const data = await updatedata();
      if (data === true) {
        toast.success(t("cardupdate"));
        setopenModel(true);
      }
    }
  };

  const handleSelect = (datatype) => {
    //// //console.log   .log(datatype);
    setNavsteper({
      // ...navSteper,
      design: true,
      setting: true,
      preview: true,
      information: true,
      qrCode: true,
    });
    if (!id) {
      submitStump();
    }
    setSwipping(routeMap[datatype].settings);
  };

  const submitStump = async () => {
    // setSwipping("design")
    try {
      // const swap=swipping;
      setloading(true);
      const data = await createStamp({
        ...designformData,
        cardType: cardType,
        stampName: stampName,
        businessId: businessdata?.activeLocation,
      });
      setNavsteper({
        design: true,
        setting: true,
        preview: true,
        information: true,
        qrCode: true,
      });
      // setSwipping(swap)
      setSingledata(data?.data?.data);
      setId(data?.data?.data?.id);
      setdesignFormData(data?.data?.data);
      setCardType(data?.data?.data?.cardType);
      setCardsActive({
        [data?.data?.data?.cardType]: true,
      });
      dispatch(AddNewstamp(data?.data?.data));
      setStampName(data?.data?.data?.stampName);
      setloading(false);
      return true;
    } catch (error) {
      setloading(false);
      return false;
    }
  };
  const updatedata = async () => {
    try {
      let datachat = chat;
      if (chat) {
        setChat(false);
      }
      setloading(true);
      const data = await updateStamp(
        { ...designformData, cardType: cardType, stampName: stampName, id: id },
        setdesignFormData
      );
      setCardsActive({
        [data?.data?.data?.cardType]: true,
      });
      if (datachat) {
        setChat(datachat);
      }
      setId(data?.data?.data?.id);
      setSingledata(data?.data?.data);
      setNavsteper({
        design: true,
        setting: true,
        preview: true,
        information: true,
        qrCode: true,
      });
      setdesignFormData(data?.data?.data);
      dispatch(updatestamps(data?.data?.data));
      setCardType(data?.data?.data?.cardType);
      setStampName(data?.data?.data?.stampName);
      setloading(false);
      return true;
    } catch (error) {
      //console.log(error,"this is error")
      let allErrorMessages = [];
      // //console.log(error)
      if (error.status === 400) {
        for (const field in error.response.data.message) {
          if (error.response.data.message.hasOwnProperty(field)) {
            // Concatenate the field name and each message
            const fieldErrors = error.response.data.message[field].map(
              (error) => `${error}`
            );
            allErrorMessages = allErrorMessages.concat(fieldErrors);
          }
        }

        const fullErrorMessage = allErrorMessages.join("\n");
        alert(fullErrorMessage);
      }
      setloading(false);
      return false;
    }
  };

  const activecard = async () => {
    if (id) {
      try {
        setloading(true);
        const response = await activeStamp(singledata);
        if (response.status === 201 || response.status === 200) {
          setId(response?.data?.data.id);
          setSingledata(response?.data?.data);
          setdesignFormData(response?.data?.data);
          setCardType(response?.data?.data?.cardType);
          setStampName(response?.data?.data?.stampName);
          setloading(false);

          toast.success(t("cardactivetost"));
        }
        setloading(false);
      } catch (error) {
        setloading(false);
      }
    }
  };
  const savedatapreview = async () => {
    if (id) {
      const data = await updatedata();
      if (data === true) {
        toast.success(t("cardupdate"));
        setopenModel(true);
      }
    }
  };
  return (
    <>
      <StampsNavigation
        desginIconE={desginIconE}
        routeMap={routeMap}
        cardType={cardType}
        setCardType={setCardType}
        settings={navSteper.setting}
        design={navSteper.design}
        setPreviewModel={setPreviewModel}
        previewModel={navSteper.preview}
        information={navSteper.information}
        qrCode={navSteper.qrCode}
        setQrCode={setQrCode}
        setglobalCard={setglobalCard}
        setSwipping={setSwipping}
        swipping={swipping}
        setopenModel={setopenModel}
        savedatapreview={savedatapreview}
        generatePDF={() => {
          setShowPdf(true);
        }}
        stampName={stampName}
        setStampName={setStampName}
        data={singledata}
        loading={loading}
      />

      <div className="pt-16 grid grid-cols-6 gap-2">
        <div className="col-span-6 lg:col-span-4 pt-4">
          <Stepperview
            t={t}
            data={{
              handleSelectCardType,
              handleSelect,
              handleSelectSetting,
              handleSelectDesign,
              handleSelectInformation,
              handleSelectqrcode,
              stepper: swipping,
              component: cardType,
              cardsActive,
              setCardsActive,
              designdata: designformData,
              setDesigndata: setdesignFormData,
              setErrors: setErrors,
              errors: errors,
              cardid: { cardid },
              id: { id },
              countrydata: { countrydata },
            }}
          />
        </div>

        <div className="flex items-start justify-center  gap-3 col-span-6 lg:col-span-2 my-2 p-6 bg-white">
          <div className="sticky top-20  self-start pt-6">
            <PhoneEmulator
              andriod={andriod}
              swipping={swipping}
              activecard={activecard}
              navSteper={navSteper}
              apple={apple}
              status={designformData.card_status}
              emulaterdetailContent={
                <Detailcontent
                  designformData={designformData}
                  pushMessage={pushMessage}
                  routeMap={routeMap}
                  activeStampList={activeStampList}
                  disableStampList={disableStampList}
                  chat={chat}
                  swipping={swipping}
                  cardType={cardType}
                  stampName={stampName}
                />
              }
              emulatorContent={
                <DefaultCardContent
                  designformData={designformData}
                  pushMessage={pushMessage}
                  routeMap={routeMap}
                  activeStampList={activeStampList}
                  disableStampList={disableStampList}
                  chat={chat}
                  swipping={swipping}
                  cardType={cardType}
                  stampName={stampName}
                />
              }
              emulaterDefaultAndriod={
                <DefaultAndriod
                  designformData={designformData}
                  pushMessage={pushMessage}
                  routeMap={routeMap}
                  activeStampList={activeStampList}
                  disableStampList={disableStampList}
                  chat={chat}
                  swipping={swipping}
                  cardType={cardType}
                  stampName={stampName}
                />
              }
            >
              {emulatorContent}
            </PhoneEmulator>
          </div>
          {!onlyPhone && (
            <div className="flex flex-col gap-2 sticky top-80 self-start">
              <span
                onClick={toggelApple}
                className={`${
                  apple ? "bg-black text-white" : "bg-gray-200 text-black"
                } cursor-pointer p-2 rounded-md`}
              >
                <TfiApple className="text-xl w-6 h-6" />
              </span>
              <span
                onClick={toggelAndriod}
                className={`${
                  andriod ? "bg-black text-white" : "bg-gray-200 text-black"
                } cursor-pointer p-2 rounded-md`}
              >
                <AiOutlineAndroid className="text-xl w-6 h-6" />
              </span>
              <span
                onClick={toggelChat}
                className={`${
                  chat ? "bg-black text-white" : "bg-gray-200 text-black"
                } cursor-pointer p-2 rounded-md`}
              >
                <BiMessageRounded className="text-xl w-6 h-6" />
              </span>
            </div>
          )}
        </div>
      </div>
      <SaveAndPreview
        isOn={openModal}
        setIsOn={setopenModel}
        generatePDF={generatePDF}
        singledata={singledata}
        activecard={activecard}
      />
      <Loader loading={loading} />
      {showPdf && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex  items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-3/4  xl:w-2/3 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowPdf(false)}
              className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="py-8 px-8 h-[58rem]">
              {/* PDF Viewer */}
              <div className="w-full h-full">
                <PDFPreViewser data={singledata} width="100%" height="100%" />
                {/* <PDFViewer width="100%" height="100%">
            <MyDocument data={singledata} />
          </PDFViewer> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {showPdf && (
        <div style={{ width: '100%', height: '500px', marginTop: '20px' }}>
          <PDFViewer width="100%" height="100%">
            <MyDocument data={singledata} />
          </PDFViewer>
        </div>
      )} */}
    </>
  );
}

export default Cards;
