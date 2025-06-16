import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { BsEmojiSmile } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { activeLinks, services } from "../../Components/utils";
import { TextField } from "@mui/material";
import Heading_Description from "../../UIComponents/Heading_Description";
import SimplifiedDropDown from "../../Components/newComponent/SimplifiedDropDown";
import IosSwitch from "../../UIComponents/IosSwitch";
import PhoneInput from "react-phone-number-input";
import Container from "../../UIComponents/Container";
import BpRadio1 from "../../UIComponents/RadioBtn";
import NumberList from "../../UIComponents/NumberList";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Basic styling
import "tippy.js/themes/material.css"; // Example theme
import { IoInformationCircleOutline } from "react-icons/io5";

function JointInformation({
  handleSelectInformation,
  cardName,
  state,
  setState,
  countrydata,
  t,
}) {
  //console.log(countrydata,"this is country code")
  const [showEmojiPicker, setShowEmojiPicker] = useState({
    cardDescription: false,
    howToEarnStamp: false,
    companyName: false,
    rewardDetails: false,
    earnedStampMessage: false,
    earnedRewardMessage: false,
    activeLinks: {},
  });

  const navigate = useNavigate();
  const styinput =
    "block w-full rounded-md border-0  p-4 bg-white outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#DFDFE5]  sm:text-sm sm:leading-6";

  const handleStateChange = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleChangeterm = (value) => {
    setState((prev) => ({
      ...prev,
      ["termsOfUseSwitch"]: value,
    }));
  };

  const addLinks = () => {
    setState((prev) => ({
      ...prev,
      activeLinks: [...prev.activeLinks, { type: "", link: "", text: "" }],
    }));
  };

  const addFeedBackLinks = () => {
    setState((prev) => ({
      ...prev,
      feedBackLinks: [
        ...prev.feedBackLinks,
        { service: "", link: "", text: "" },
      ],
    }));
  };

  const handleActiveLinksChange = (index, name, value) => {
    setState((prevState) => {
      const updatedForm = [...prevState.activeLinks];
      updatedForm[index] = {
        ...updatedForm[index],
        [name]: value,
      };
      return { ...prevState, activeLinks: updatedForm };
    });
  };

  const handleFeedbackLinksChange = (index, name, value) => {
    setState((prevState) => {
      const updatedForm = [...prevState.feedBackLinks];
      updatedForm[index] = {
        ...updatedForm[index],
        [name]: value,
      };
      return {
        ...prevState,
        feedBackLinks: updatedForm,
      };
    });
  };

  const handleEmojiSelect = (emoji, field, index = null) => {
    let valueToUpdate;
    if (index !== null) {
      const updatedLinks = [...state.activeLinks];
      updatedLinks[index][field] += emoji;
      valueToUpdate = updatedLinks;
      handleStateChange("activeLinks", valueToUpdate);
    } else {
      handleStateChange(field, state[field] + emoji);
    }
  };

  const toggleEmojiPicker = (field, index = null) => {
    if (index !== null) {
      setShowEmojiPicker((prev) => ({
        ...prev,
        activeLinks: {
          ...prev.activeLinks,
          [index]: !prev.activeLinks[index],
        },
      }));
    } else {
      setShowEmojiPicker((prev) => ({
        ...prev,
        [field]: !prev[field],
      }));
    }
  };

  useEffect(() => {
    document.title = `${cardName} ${t("information")}`;
  }, [cardName]);

  useEffect(() => {
    // Logging state for debugging
    // console.table(state);
  }, [state]);

  return (
    <>
      <div>
        <div>
          {/* Information Section */}
          <div className="pt-8 pb-5 border-b border-gray-300">
            <div className="flex gap-3">
              <Heading_Description heading={t("information")} />

              <Tippy content={t("sinfo")}>
                <button>
                  <IoInformationCircleOutline className="text-[20px]" />
                </button>
              </Tippy>
            </div>
          </div>

          <div className="border-b border-gray-300 pb-16">
            {/* Card Description Field */}
            <div className="flex gap-3">
              <Heading_Description heading={t("carddescrip")} />

              <Tippy content={t("fordesc")}>
                <button>
                  <IoInformationCircleOutline className="text-[20px]" />
                </button>
              </Tippy>
            </div>

            <div className="relative" id="talha">
              <input
                placeholder={t("colinfo")}
                type="text"
                className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                value={state.cardDescription}
                onChange={(e) =>
                  handleStateChange("cardDescription", e.target.value)
                }
              />
              <BsEmojiSmile
                className="absolute top-[10px] right-2 text-gray-500 text-lg"
                onClick={() => toggleEmojiPicker("cardDescription")}
              />
              {showEmojiPicker.cardDescription && (
                <div className="absolute z-50 top-14 right-0">
                  <EmojiPicker
                    onEmojiClick={(event, emojiObject) =>
                      handleEmojiSelect(event.emoji, "cardDescription")
                    }
                  />
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Heading_Description heading={t("comapnyname")} />

              <Tippy content={t("entcmpnyname")}>
                <button>
                  <IoInformationCircleOutline className="text-[20px]" />
                </button>
              </Tippy>
            </div>
            <div className="relative">
              <input
                placeholder={t("comapnyname")}
                type="text"
                className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                value={state.companyName}
                onChange={(e) =>
                  handleStateChange("companyName", e.target.value)
                }
              />
              <BsEmojiSmile
                className="absolute top-[10px] right-2 text-gray-500 text-lg"
                onClick={() => toggleEmojiPicker("companyName")}
              />
              {showEmojiPicker.companyName && (
                <div className="absolute z-50 top-14 right-0">
                  <EmojiPicker
                    onEmojiClick={(event, emojiObject) =>
                      handleEmojiSelect(event.emoji, "companyName")
                    }
                  />
                </div>
              )}
            </div>

            {/* Conditionally render additional fields based on cardName */}
            {cardName === "Stamp" ? (
              <>
                {/* How to earn a stamp field */}
                {/* <Heading_Description heading={"How to earn a stamp"} classname={"mt-7"} />
                <div className="relative">
                  <input
                    placeholder={"Collect Stamps to get rewards"}
                    type="text"
                    className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                    value={state.howToEarnStamp}
                    onChange={(e) => handleStateChange("howToEarnStamp", e.target.value)}
                  />
                  <BsEmojiSmile
                    className="absolute top-[10px] right-2 text-gray-500 text-lg"
                    onClick={() => toggleEmojiPicker("howToEarnStamp")}
                  />
                  {showEmojiPicker.howToEarnStamp && (
                    <div className="absolute z-50 top-14 right-0">
                      <EmojiPicker onEmojiClick={(event, emojiObject) => handleEmojiSelect(event.emoji, "howToEarnStamp")} />
                    </div>
                  )}
                </div> */}

                {/* Company Name */}

                {/* Reward Details */}
                {/* <Heading_Description heading={"Reward Details"} classname={"mt-7"} />
                <div className="relative">
                  <input
                    placeholder={"Reward Details"}
                    type="text"
                    className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                    value={state.rewardDetails}
                    onChange={(e) => handleStateChange("rewardDetails", e.target.value)}
                  />
                  <BsEmojiSmile
                    className="absolute top-[10px] right-2 text-gray-500 text-lg"
                    onClick={() => toggleEmojiPicker("rewardDetails")}
                  />
                  {showEmojiPicker.rewardDetails && (
                    <div className="absolute z-50 top-14 right-0">
                      <EmojiPicker onEmojiClick={(event, emojiObject) => handleEmojiSelect(event.emoji, "rewardDetails")} />
                    </div>
                  )}
                </div> */}

                {/* Earned Stamp Message */}
                <Heading_Description heading={t("erntxt")} classname={"mt-7"} />
                <small>{"The tag {#} is required"}</small>
                <div className="relative">
                  <input
                    placeholder={t("erntxt")}
                    type="text"
                    className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                    value={state.earnedStampMessage}
                    onChange={(e) =>
                      handleStateChange("earnedStampMessage", e.target.value)
                    }
                  />
                  <BsEmojiSmile
                    className="absolute top-[10px] right-2 text-gray-500 text-lg"
                    onClick={() => toggleEmojiPicker("earnedStampMessage")}
                  />
                  {showEmojiPicker.earnedStampMessage && (
                    <div className="absolute z-50 top-14 right-0">
                      <EmojiPicker
                        onEmojiClick={(event, emojiObject) =>
                          handleEmojiSelect(event.emoji, "earnedStampMessage")
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Earned Reward Message */}
                <Heading_Description heading={t("ernrew")} classname={"mt-7"} />
                <div className="relative">
                  <input
                    placeholder={t("ernrew")}
                    type="text"
                    className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                    value={state.earnedRewardMessage}
                    onChange={(e) =>
                      handleStateChange("earnedRewardMessage", e.target.value)
                    }
                  />
                  <BsEmojiSmile
                    className="absolute top-[10px] right-2 text-gray-500 text-lg"
                    onClick={() => toggleEmojiPicker("earnedRewardMessage")}
                  />
                  {showEmojiPicker.earnedRewardMessage && (
                    <div className="absolute z-50 top-14 right-0">
                      <EmojiPicker
                        onEmojiClick={(event, emojiObject) =>
                          handleEmojiSelect(event.emoji, "earnedRewardMessage")
                        }
                      />
                    </div>
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </div>

          {/* Active Links Section */}
          {/* {state?.activeLinks?.map((field, index) => (
            <div className="space-y-2" key={index}>
              <div className="grid grid-cols-12 gap-2 pt-1">
                <div className="col-span-12 lg:col-span-3 2xl:col-span-1 ">
                  <span className="text-sm leading-8">Type</span>
                  <SimplifiedDropDown
                    index={index}
                    list={activeLinks}
                    value={state.activeLinks[index].type}
                    name={"type"}
                    onChange={handleActiveLinksChange}
                  />
                </div>
                <div className="relative col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-5">
                  <span className="text-sm leading-8">Link</span>
                  <TextField
                    value={state.activeLinks[index].link}
                    onChange={(e) => handleActiveLinksChange(index, "link", e.target.value)}
                    fullWidth
                    variant="outlined"
                    placeholder={"placeholder"}
                    InputProps={{
                      sx: {
                        height: "40px",
                        padding: "0 14px",
                        fontSize: "15px",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "40px",
                        "& input": {
                          padding: "10px 0px",
                        },
                      },
                    }}
                  />
                </div>
                <div className="relative col-span-11 sm:col-span-5 lg:col-span-4 2xl:col-span-5">
                  <span className="text-sm leading-8">Text</span>
                  <TextField
                    value={state.activeLinks[index].text}
                    onChange={(e) => handleActiveLinksChange(index, "text", e.target.value)}
                    fullWidth
                    variant="outlined"
                    placeholder={"placeholder"}
                    InputProps={{
                      sx: {
                        height: "40px",
                        padding: "0 14px",
                        fontSize: "15px",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "40px",
                        "& input": {
                          padding: "10px 0px",
                        },
                      },
                    }}
                  />
                  <BsEmojiSmile
                    className="absolute top-[43px] right-2 text-gray-500 text-lg"
                    onClick={() => toggleEmojiPicker("activeLinks", index)}
                  />
                  {showEmojiPicker.activeLinks[index] && (
                    <div className="absolute z-50 top-14 right-0">
                      <EmojiPicker onEmojiClick={(event, emojiObject) => handleEmojiSelect(event.emoji, "text", index)} />
                    </div>
                  )}
                </div>
                <div className="flex justify-center items-center mt-8">
                  <MdDeleteForever
                    className="text-2xl cursor-pointer"
                    onClick={() => {
                      const newFields = state.activeLinks.filter((_, i) => i !== index);
                      setState((prev) => ({
                        ...prev,
                        activeLinks: newFields,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
          ))} */}

          {/* <div className="pt-4 pb-10">
            <button
              type="button"
              className="bg-black text-white px-4 py-2 rounded w-full"
              onClick={addLinks}
            >
              Add link
            </button>
          </div> */}

          {/* Feedback Links Section */}
          <div className="space-y-2 border-y border-gray-300 py-14">
            <h2 className="text-lg font-medium">{t("feebacklinks")}</h2>
            {state.feedBackLinks?.map((field, index) => (
              <div className="space-y-2" key={index}>
                <div className="grid grid-cols-12 gap-2 pt-1">
                  <div className="col-span-12 lg:col-span-3 2xl:col-span-1 ">
                    <SimplifiedDropDown
                      index={index}
                      list={services}
                      value={state.feedBackLinks[index].service}
                      name={"service"}
                      onChange={handleFeedbackLinksChange}
                    />
                  </div>
                  <div className="relative col-span-12 sm:col-span-4 lg:col-span-8">
                    <TextField
                      value={state.feedBackLinks[index].link}
                      onChange={(e) =>
                        handleFeedbackLinksChange(index, "link", e.target.value)
                      }
                      fullWidth
                      variant="outlined"
                      placeholder={"https://"}
                      InputProps={{
                        sx: {
                          height: "40px",
                          padding: "0 14px",
                          fontSize: "15px",
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "40px",
                          "& input": {
                            padding: "10px 0px",
                          },
                        },
                      }}
                    />
                  </div>
                  {/*<div className="relative col-span-11 sm:col-span-5 lg:col-span-4 2xl:col-span-5">*/}
                  {/*  <TextField*/}
                  {/*    value={state.feedBackLinks[index].service}*/}
                  {/*    disabled*/}
                  {/*    fullWidth*/}
                  {/*    variant="outlined"*/}
                  {/*    placeholder={""}*/}
                  {/*    InputProps={{*/}
                  {/*      sx: {*/}
                  {/*        height: "40px",*/}
                  {/*        padding: "0 14px",*/}
                  {/*        fontSize: "15px",*/}
                  {/*      },*/}
                  {/*    }}*/}
                  {/*    sx={{*/}
                  {/*      "& .MuiOutlinedInput-root": {*/}
                  {/*        height: "40px",*/}
                  {/*        "& input": {*/}
                  {/*          padding: "10px 0px",*/}
                  {/*        },*/}
                  {/*      },*/}
                  {/*    }}*/}
                  {/*  />*/}

                  {/*</div>*/}
                  <div className="flex justify-center items-center ">
                    <MdDeleteForever
                      className="text-2xl cursor-pointer"
                      onClick={() => {
                        const newFields = state.feedBackLinks.filter(
                          (_, i) => i !== index
                        );
                        setState((prev) => ({
                          ...prev,
                          feedBackLinks: newFields,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="bg-black text-white px-4 py-2 rounded w-full"
              onClick={addFeedBackLinks}
            >
              {t("addlink")}
            </button>
          </div>

          {/* Terms of Use Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Heading_Description heading={t("termofuse")} />

                <Tippy content={t("tipcont")}>
                  <button>
                    <IoInformationCircleOutline className="text-[20px]" />
                  </button>
                </Tippy>
              </div>
              <IosSwitch
                isOn={state.termsOfUseSwitch}
                setIsOn={handleChangeterm}
                name={"termsOfUseSwitch"}
              />
            </div>
            <textarea
              wrap="hard"
              className="border border-gray-300 p-2 rounded w-full text-sm"
              rows="6"
              disabled={!state.termsOfUseSwitch}
              value={state.termsOfUse}
              onChange={(e) => handleStateChange("termsOfUse", e.target.value)}
              style={{
                whiteSpace: "pre-wrap", // Ensures newlines and spaces are displayed
                wordWrap: "break-word", // Wraps long words properly
              }}
            />
          </div>

          {/* Link to Full Terms and Conditions Section */}
          {/* <div className="space-y-2 pb-10">
       
            <div className="flex gap-3">
              <Heading_Description heading="Link to the  full terms and conditions" />

              <Tippy
                content={"Link ot the full text of the terms and conditions of the card"}
              >
                <button>
                  <IoInformationCircleOutline className="text-[20px]" />
                </button>
              </Tippy>

            </div>
            <input
              type="link"
              value={state.linkToTheFullTermsAndConditions}
              onChange={(e) =>
                handleStateChange(
                  "linkToTheFullTermsAndConditions",
                  e.target.value
                )
              }
              placeholder="Enter the URL address of the link to the rules of using the service on your site"
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div> */}

          {/* Issuer Information Section */}
          <div className="space-y-2 border-t border-gray-300 pt-12">
            <div className="flex gap-3">
              <Heading_Description heading={t("isrinfo")} />

              <Tippy content={t("isrdesc")}>
                <button>
                  <IoInformationCircleOutline className="text-[20px]" />
                </button>
              </Tippy>
            </div>
            <input
              value={state.issuerCompanyName}
              onChange={(e) =>
                handleStateChange("issuerCompanyName", e.target.value)
              }
              type="text"
              placeholder={t("comapnyname")}
              className="border border-gray-300 p-2 rounded w-full"
            />
            <input
              value={state.issuerEmail}
              onChange={(e) => handleStateChange("issuerEmail", e.target.value)}
              type="email"
              placeholder={t("email")}
              className="border border-gray-300 p-2 rounded w-full"
            />
            <PhoneInput
              value={state.issuerPhone}
              defaultCountry={countrydata?.countrydata || "SK"}
              onChange={(value) => handleStateChange("issuerPhone", value)}
              onFocus={false}
              className={`${styinput}`}
              international
              placeholder={t("enterphone")}
            />
          </div>

          {/* Submit Button */}
          <div
            onClick={() => {
              handleSelectInformation();
            }}
            className="col-span-3 text-center bg-black text-white py-3 rounded-md my-5 cursor-pointer"
          >
            {t("finish")}
          </div>
        </div>
      </div>
    </>
  );
}

export default JointInformation;
