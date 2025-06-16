import React, { useEffect, useState } from "react";
import { pageVariants } from "../../Animation";
import { motion } from "framer-motion";
import NumberList from "../../UIComponents/NumberList";
import Container from "../../UIComponents/Container";
import Heading_Description from "../../UIComponents/Heading_Description";
import DropDown from "../../UIComponents/DropDown";
import SelectImage from "../../UIComponents/SelectImage";
import SelectColor from "../../UIComponents/SelectColor";
import BoxWithSwitch1 from "../../UIComponents/BoxWithSwitch";
import BlackButton from "../../UIComponents/BlackButton";
import { fieldName, fieldTypes } from "../../Components/utils";
import { fieldNames } from "../../Components/utils";
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

import SimplifiedDropDown from "../../Components/newComponent/SimplifiedDropDown";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Basic styling
import "tippy.js/themes/material.css"; // Example theme
import { IoInformationCircleOutline } from "react-icons/io5";
export default function JointDesign({
  handleSelectDesign,
  cardName,
  state,
  setState,
  t,
}) {
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

  const handleStateChange = (key, value) => {
    // //console.log(key, value)
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFileSelect = (key) => (file) => {
    // updateIcon(cardName, key, file);
    setState((prevState) => ({ ...prevState, [key]: file }));
  };

  const handleDrop = (key) => (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setState((prevState) => ({ ...prevState, [key]: file }));
    } else {
      alert(t("nfselect"));
    }
  };
  const handleFieldChange = (index, name, value) => {
    setState((prevState) => {
      const updatedForm = [...prevState.fields];

      updatedForm[index] = {
        ...updatedForm[index],
        [name]: value,
      };

      return {
        ...prevState,
        fields: updatedForm,
      };
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleColorChange = (key) => (newColor) => {
    // updateIcon(cardName, key, newColor);
    setState((prevState) => ({ ...prevState, [key]: newColor }));
  };

  const handleIconChange = (key) => (value) => {
    // updateIcon(cardName, key, value);
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleFieldName = (key) => (value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: {
        name: fieldName[value].name,
        option: fieldName[value].value,
      },
    }));
  };

  const handleFieldInput = (key) => (value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        name: value,
      },
    }));
  };

  const handleToggleChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSelectNumber = (number) => {
    // //console.log(number ,"these are number")
    // updateStamps(cardName, number);
    setState((prevState) => ({ ...prevState, selectedNumber: number }));
  };

  useEffect(() => {
    document.title = `${cardName} ${t("design")}`;
  }, []);

  useEffect(() => {
    ////// //console.log   .clear();
    //// //console.log   .table(state);
    //// //console.log   .log("this data coming from join design file");
  }, [state]);

  const {
    active,
    selectedNumber,
    activeStampIcon,
    inactiveStampIcon,
    textColor,
    bgColor,
    activeStampColor,
    inActiveStampColor,
    outlineColor,
    stampBgColor,
    bgUnderStampsColor,
    activeStampImg,
    inactiveStampImg,
    logo,
    stampbackground,
    showLogoAtCardIssuingForm,
    showBackgroundColorOnCardIssuingForm,
    backgroundColorFortheCenterPart,
    icon,
  } = state;

  return (
    <>
      <div
      // className="  grid grid-cols-6 gap-2 overflow-y-hidden "
      >
        <div
        // className="col-span-6 lg:col-span-4  pt-4"
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <div className=" gap-2 text-[#333333]">
              <div className=" ">
                <div className="flex gap-3">
                  <Heading_Description heading={t("design")} />

                  <Tippy content={t("shead")}>
                    <button>
                      <IoInformationCircleOutline className="text-[20px]" />
                    </button>
                  </Tippy>
                </div>

                {cardName === "Stamp" ? (
                  <>
                    <Container border={"both"}>
                      <NumberList
                        heading={`${t("stempcount")} ${selectedNumber}`}
                        number={30}
                        selectedNumber={selectedNumber}
                        onSelectNumber={handleSelectNumber}
                      />
                    </Container>
                    <Container border={"bottom"}>
                      <div className="grid grid-cols-2 gap-5 text-[#333333]">
                        <div>
                          <DropDown
                            value={activeStampIcon}
                            heading={t("activestamp")}
                            list={activeStampList}
                            onChange={handleIconChange("activeStampIcon")}
                          />
                          <SelectImage
                            description={t("mdesc")}
                            onFileSelect={handleFileSelect("activeStampImg")}
                            stateValue={activeStampImg}
                            id={"activeStamp"}
                            cropSize={{ width: 200, height: 200 }}
                          />
                        </div>
                        <div>
                          <DropDown
                            value={inactiveStampIcon}
                            heading="Inactive Stamp"
                            list={activeStampList}
                            onChange={handleIconChange("inactiveStampIcon")}
                          />
                          <SelectImage
                            description={t("mdesc")}
                            onFileSelect={handleFileSelect("inactiveStampImg")}
                            stateValue={inactiveStampImg}
                            id={"inactiveStamp"}
                            cropSize={{ width: 200, height: 200 }}
                          />
                        </div>
                      </div>
                    </Container>
                  </>
                ) : (
                  ""
                )}
                <Container border={"top"}>
                  <div className="grid grid-cols-2 gap-5 text-[#333333]">
                    <div>
                      <div className="flex gap-3">
                        <Heading_Description heading={t("logo")} />

                        <Tippy content={t("mcont")}>
                          <button>
                            <IoInformationCircleOutline className="text-[20px]" />
                          </button>
                        </Tippy>
                      </div>
                      <SelectImage
                        description={t("zdesc")}
                        onFileSelect={handleFileSelect("logo")}
                        stateValue={logo}
                        id={"logo"}
                        cropSize={{ width: 480, height: 150 }}
                      />
                    </div>
                    <div>
                      <div className="flex gap-3">
                        <Heading_Description heading={t("bgcenter")} />

                        <Tippy content={t("bgunder")}>
                          <button>
                            <IoInformationCircleOutline className="text-[20px]" />
                          </button>
                        </Tippy>
                      </div>

                      <SelectImage
                        description={t("zcont")}
                        onFileSelect={handleFileSelect("stampbackground")}
                        stateValue={stampbackground}
                        id={"stampbackground"}
                        cropSize={{ width: 1125, height: 432 }}
                      />
                    </div>
                    <div>
                      <div className="flex gap-3">
                        <Heading_Description heading={t("icon")} />

                        <Tippy content={t("ycont")}>
                          <button>
                            <IoInformationCircleOutline className="text-[20px]" />
                          </button>
                        </Tippy>
                      </div>

                      <SelectImage
                        description={t("tcont")}
                        onFileSelect={handleFileSelect("icon")}
                        stateValue={icon}
                        id={"icon"}
                        cropSize={{ width: 512, height: 512 }}
                      />
                    </div>
                  </div>
                </Container>
                {cardName === "Stamp" ? (
                  <Container border={"bottom"}>
                    <div className="flex gap-3">
                      <Heading_Description heading={t("colors")} />

                      <Tippy content={t("cardcont")}>
                        <button>
                          <IoInformationCircleOutline className="text-[20px]" />
                        </button>
                      </Tippy>
                    </div>
                    <div className="grid grid-cols-2 gap-5 text-[#333333]">
                      <div>
                        <SelectColor
                          heading={t("textColor")}
                          color={textColor}
                          onColorChange={handleColorChange("textColor")}
                        />
                      </div>
                      <div>
                        <SelectColor
                          heading={t("cardBackground")}
                          color={bgColor}
                          onColorChange={handleColorChange("bgColor")}
                        />
                      </div>
                      <div>
                        <SelectColor
                          heading={t("stampBackground")}
                          color={stampBgColor}
                          onColorChange={handleColorChange("stampBgColor")}
                        />
                      </div>
                      <div>
                        <SelectColor
                          heading={t("outlineColor")}
                          color={outlineColor}
                          onColorChange={handleColorChange("outlineColor")}
                        />
                      </div>
                      <div>
                        <SelectColor
                          heading={t("activeStamp")}
                          color={activeStampColor}
                          onColorChange={handleColorChange("activeStampColor")}
                        />
                      </div>
                      <div>
                        <SelectColor
                          heading={t("inactiveStamp")}
                          color={inActiveStampColor}
                          onColorChange={handleColorChange(
                            "inActiveStampColor"
                          )}
                        />
                      </div>
                      <div>
                        <SelectColor
                          heading={t("bgUnderStamps")}
                          color={bgUnderStampsColor}
                          onColorChange={handleColorChange(
                            "bgUnderStampsColor"
                          )}
                        />
                      </div>
                    </div>
                  </Container>
                ) : (
                  <Container border={"bottom"}>
                    <div className="flex gap-3">
                      <Heading_Description heading={t("colors")} />

                      <Tippy content={t("cardcont")}>
                        <button>
                          <IoInformationCircleOutline className="text-[20px]" />
                        </button>
                      </Tippy>
                    </div>
                    <div className="grid grid-cols-2 gap-5 text-[#333333]">
                      <div>
                        <SelectColor
                          heading={t("cardBackground")}
                          color={bgColor}
                          onColorChange={handleColorChange("bgColor")}
                        />
                      </div>
                      <div>
                        <SelectColor
                          heading={t("textColor")}
                          color={textColor}
                          onColorChange={handleColorChange("textColor")}
                        />
                      </div>
                      <div>
                        <SelectColor
                          heading={t("backgroundColorForCenterPart")}
                          color={backgroundColorFortheCenterPart}
                          onColorChange={handleColorChange(
                            "backgroundColorFortheCenterPart"
                          )}
                        />
                      </div>
                    </div>
                  </Container>
                )}
                {cardName === "Membership" ? (
                  <Container border={"bottom"}>
                    <BoxWithSwitch1
                      description={t("showcard")}
                      isOn={state.showNameOnTheCard}
                      setIsOn={(value) => {
                        handleStateChange("showNameOnTheCard", value);
                      }}
                      name={"showNameOnTheCard"}
                    />
                    <br />
                    <BoxWithSwitch1
                      description={t("showphoto")}
                      isOn={state.showPhotoOnTheCard}
                      setIsOn={(value) => {
                        handleStateChange("showPhotoOnTheCard", value);
                      }}
                      name={"showPhotoOnTheCard"}
                    />
                  </Container>
                ) : (
                  ""
                )}
                {/* <Container border={"bottom"}>
                <div className="flex gap-3">
                      <Heading_Description heading="Fields name" />

                      <Tippy
                        content={"Setting the fields to display on the front of the card"}
                      >
                        <button>
                          <IoInformationCircleOutline className="text-[20px]" />
                        </button>
                      </Tippy>

                    </div>
                  <div className="grid grid-cols-2 gap-5">
                    <Heading_Description description={"Field"} />
                    <Heading_Description description={"Field Name"} />
                    {state.fields.map((field, index) => (
                      <>
                        <SimplifiedDropDown
                          value={state.fields[index].fieldType}
                          list={fieldNames[cardName]}
                          onChange={handleFieldChange}
                          name={"fieldType"}
                          index={index}
                        />
                        <input
                          type="text"
                          placeHolder={"Privacy Policy"}
                          className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none mb-5"
                          value={state.fields[index].fieldName}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              "fieldName",
                              e.target.value
                            )
                          }
                        />
                      </>
                    ))}
                  </div>
                </Container> */}
                <Container border={"bottom"}>
                  <BoxWithSwitch1
                    isOn={showLogoAtCardIssuingForm}
                    setIsOn={(value) => {
                      handleStateChange("showLogoAtCardIssuingForm", value);
                    }}
                    name={"showLogoAtCardIssuingForm"}
                    description={
                      <div className="flex gap-3">
                        <p>{t("showlogo")}</p>

                        <Tippy content={t("logocont")}>
                          <button>
                            <IoInformationCircleOutline className="text-[20px]" />
                          </button>
                        </Tippy>
                      </div>
                    }
                  />
                  <br />
                  <BoxWithSwitch1
                    isOn={showBackgroundColorOnCardIssuingForm}
                    name={"showBackgroundColorOnCardIssuingForm"}
                    setIsOn={(value) => {
                      handleStateChange(
                        "showBackgroundColorOnCardIssuingForm",
                        value
                      );
                    }}
                    description={
                      <div className="flex gap-3">
                        <p>{t("showbg")}</p>

                        <Tippy content={t("showclr")}>
                          <button>
                            <IoInformationCircleOutline className="text-[20px]" />
                          </button>
                        </Tippy>
                      </div>
                    }
                  />
                </Container>
                <br />
                <BlackButton
                  handelCLick={handleSelectDesign}
                  btnText={t("continue")}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
