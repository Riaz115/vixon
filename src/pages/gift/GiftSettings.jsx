import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Heading_Description from "../../UIComponents/Heading_Description";
import Container from "../../UIComponents/Container";
import BpRadio1 from "../../UIComponents/RadioBtn";
import { pageVariants } from "../../Animation";
import BlackButton from "../../UIComponents/BlackButton";
import BoxWithSwitch1 from "../../UIComponents/BoxWithSwitch";
import { MdDelete } from "react-icons/md";
import IosSwitch from "../../UIComponents/IosSwitch";
import MapModal from "../../Components/MapModal";
import {
  daysList,
  timeList,
  seperators,
  languagesList,
  dateFormats,
  fieldTypes,
  linkedCardTemplateList,
} from "../../Components/utils";
import SimplifiedDropDown from "../../Components/newComponent/SimplifiedDropDown";
import { Box, Typography } from "@mui/material";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaTrash } from 'react-icons/fa';
import { IoMdCopy } from "react-icons/io";
import downloadFile from "../../Components/downloadFile";
import toast from "react-hot-toast";

function GiftSettings({ handleSelectSetting, state, setState }) {

  const [selectedBottomRadio, setSelectedBottomRadio] = useState("unlimited");
  const [phoneMask, setPhoneMask] = useState([]);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [copy, setCopy] = useState(false);
  const [showUtmField, setShowUtmField] = useState(false);
  const [cardIssuingError, setCardIssuingError] = useState(false);
  const [duplicationError, setDuplicationError] = useState(false);

  const handleRedemptionRulesRadio = (event) => {
    setState((prew) => {
      return {
        ...prew,
        redemptionRulesRadio: event.target.value,
      };
    });

  };

  const handleCopyClick = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopy(true);
        toast.success("Text Copied");

        setTimeout(() => {
          setCopy(false);
        }, 2000); // Reset after 3 seconds
      })
      .catch((err) => {
        //// //console.log   .error("Failed to copy text: ", err);
      });
  };

  const checkCardIssuing = () => {
    const phoneField = state.cardIssuingForm.find(
      (field) => field.fieldType === "phone"
    );
    const emailField = state.cardIssuingForm.find(
      (field) => field.fieldType === "email"
    );
    if (!phoneField?.unique && !emailField?.unique) {
      setCardIssuingError(true);
    } else {
      setCardIssuingError(false);
    }
  };

  const checkForDuplicates = () => {
    const values = state.cardIssuingForm.map((field) =>
      field.fieldType.toLowerCase().trim()
    );
    const uniqueValues = new Set(values);
    return values.length === uniqueValues.size;
  };

  useEffect(() => {
    checkCardIssuing();
    if (!checkForDuplicates()) {
      setDuplicationError(true);
    } else {
      setDuplicationError(false);
    }
  }, [state]);

  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const addField = () => {
    setState((prev) => ({
      ...prev,
      cardIssuingForm: [
        ...prev.cardIssuingForm,
        { fieldType: "", fieldName: "", required: false, unique: false },
      ],
    }));
  };

  const handleFieldChange = (index, name, value) => {
    setState((prevState) => {
      const updatedForm = [...prevState.cardIssuingForm];

      updatedForm[index] = {
        ...updatedForm[index],
        [name]: value,
      };

      return {
        ...prevState,
        cardIssuingForm: updatedForm,
      };
    });
  };

  const toggleMapModal = () => {
    setIsMapModalVisible(!isMapModalVisible);
  };

  const handleChangeUpperRadio = (event) => {
    setState((prew) => {
      return {
        ...prew,
        selectedUpperRadio: event.target.value,
      };
    });
  };

  const handleChangeBottomRadio = (event) => {
    setSelectedBottomRadio(event.target.value);
  };

  useEffect(() => {
    document.title = "Gift Settings";
  }, [state]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map((country) => ({
          name: country.name.common,
        }));
        setPhoneMask(countryList);
      })
      .catch((error) => 
       console.log.error("Error:", error));
  }, []);
  const handleDelete = (indexToDelete) => {
    // Create a new array excluding the location at the specified index
    const updatedLocations = state.modaldata.filter((_, index) => index !== indexToDelete);
    // Update the state with the new array
    setState((prevState) => ({
      ...prevState,
      modaldata: updatedLocations,
    }));
  };


  return (
    <>
      <div
      
      >
        <div
    
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <div className=" text-[#333333]">
              <div className=" ">
                {/* Settings Heading */}
                <Heading_Description heading="Settings" />

                <Container border={"top"}>
                  <Heading_Description heading={"Redemption Rules"} />
                  <div>
                    <BpRadio1
                      label="Multiple use (Customer can redeem gift balance in multiple transactions)"
                      name="radioGroup1"
                      props={{
                        value: "multiple",
                        checked: state.redemptionRulesRadio === "multiple",
                        onChange: handleRedemptionRulesRadio,
                      }}
                    />
                    <BpRadio1
                      label="Single use (Customer can redeem gift balance just in one transaction)"
                      name="radioGroup1"
                      props={{
                        value: "single",
                        checked: state.redemptionRulesRadio === "single",
                        onChange: handleRedemptionRulesRadio,
                      }}
                    />
                  </div>
                </Container>
                <Container border={"both"}>
                  <Heading_Description heading="Card expiration date" />
                  <div>
                    <BpRadio1
                      label="Unlimited"
                      name="radioGroup1"
                      props={{
                        value: "unlimited",
                        checked: state.selectedUpperRadio === "unlimited",
                        onChange: handleChangeUpperRadio,
                      }}
                    />
                    <BpRadio1
                      label="Fixed term"
                      name="radioGroup1"
                      props={{
                        value: "fixed_term",
                        checked: state.selectedUpperRadio === "fixed_term",
                        onChange: handleChangeUpperRadio,
                      }}
                    />
                    <BpRadio1
                      label="Fixed term after card issuing"
                      name="radioGroup1"
                      props={{
                        value: "fixed_term_after_card",
                        checked:
                          state.selectedUpperRadio === "fixed_term_after_card",
                        onChange: handleChangeUpperRadio,
                      }}
                    />
                  </div>

                  {state.selectedUpperRadio === "fixed_term_after_card" ? (
                    <div className="grid md:grid-cols-2 gap-5 mt-7">
                      <div>
                        <Heading_Description heading="Term" />
                        <SimplifiedDropDown
                          value={state.cardExpirationFixedTermAfterIssuingDays}
                          name={"cardExpirationFixedTermAfterIssuingDays"}
                          onChange={handleStateChange}
                          list={daysList}
                        />
                      </div>
                      <div className="mt-6">
                        <Heading_Description heading="" />
                        <SimplifiedDropDown
                          value={state.cardExpirationFixedTermAfterIssuingYears}
                          name={"cardExpirationFixedTermAfterIssuingYears"}
                          onChange={handleStateChange}
                          list={timeList}
                        />
                      </div>
                    </div>
                  ) : state.selectedUpperRadio === "fixed_term" ? (
                    <div className=" mt-7">
                      <Heading_Description heading="Terms" />
                      <input
                        type="text"
                        placeHolder={"02-01-2022"}
                        className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                        value={state.cardExpirationFixedTermDate}
                        onChange={(e) =>
                          handleStateChange(
                            "cardExpirationFixedTermDate",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ) : null}
                </Container>

                {/* Locations */}
                <Container border={"bottom"}>
                  <Heading_Description heading="Locations" />
                  <div className="p-3 border border-gray-300 rounded">
                    {Array.isArray(state?.modaldata) && state?.modaldata.length > 0 ? (
                      state.modaldata.map((loc, index) => (
                        <div key={index} className="text-center my-2 flex items-center justify-center">
                          <div>{loc?.address ? loc?.address : "You have not yet created any"}</div>
                          <FaTrash
                            className="ml-2 cursor-pointer text-black-500"
                            onClick={() => handleDelete(index)}
                            title="Delete"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="text-center my-2">You have not yet created any</div>
                    )}

                    <span onClick={toggleMapModal}>
                      <BlackButton btnText={"Add Location"} />
                    </span>
                    {isMapModalVisible && <MapModal onClose={toggleMapModal} setState={setState} />}
                  </div>
                </Container>
              

                <Container>
                  <Heading_Description heading={"Reward for the first visit"} />
                  <input
                    type="text"
                    className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                    value={state.rewardForTheFirstVisit}
                    onChange={(e) =>
                      handleStateChange(
                        "rewardForTheFirstVisit",
                        e.target.value
                      )
                    }
                  />
                </Container>
                {/* Language */}
                <Container border={"bottom"}>
                  <Heading_Description heading="Language" />
                  <SimplifiedDropDown
                    value={state.language}
                    onChange={handleStateChange}
                    name={"language"}
                    list={languagesList}
                  />
                </Container>

                {/* Date format */}
                <Container border={"bottom"}>
                  <Heading_Description heading="Date format" />
                  <SimplifiedDropDown
                    value={state.dateFormat}
                    onChange={handleStateChange}
                    name={"dateFormat"}
                    list={dateFormats}
                  />
                </Container>

                {/* Thousand and Decimal Separator */}
                <Container border={"bottom"}>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Heading_Description heading="Thousand Separator" />
                      <SimplifiedDropDown
                        value={state.thousandSeperator}
                        onChange={handleStateChange}
                        name={"thousandSeperator"}
                        list={seperators}
                      />
                    </div>
                    <div>
                      <Heading_Description heading="Decimal Separator" />
                      <SimplifiedDropDown
                        value={state.decimalSeparator}
                        onChange={handleStateChange}
                        name={"decimalSeparator"}
                        list={seperators}
                      />
                    </div>
                  </div>
                </Container>

                {/* Scanner Switch */}
                <Container border={"bottom"}>
                  <BoxWithSwitch1
                    isOn={state.purchaseAmountIsRequiredSwitch}
                    setIsOn={handleStateChange}
                    name="purchaseAmountIsRequiredSwitch"
                    description={"Purchase amount is required in Scanner App"}
                  />
                </Container>

                {/* Card issuing form */}
                <Container border={"bottom"}>
                  <Heading_Description heading="Card issuing form" />
                  <div className="overflow-auto">
                    <div className="min-w-[700px] grid grid-cols-11 gap-5">
                      <Heading_Description
                        classname={"col-span-4"}
                        description="Field Type"
                      />
                      <Heading_Description
                        classname={"col-span-4"}
                        description="Field Name"
                      />
                      <Heading_Description
                        classname={"col-span-1"}
                        description="Required"
                      />
                      <Heading_Description
                        classname={"col-span-1"}
                        description="Unique"
                      />
                      <div className="col-span-1"></div>
                      {cardIssuingError ? (
                        <Box className="p-5 rounded-lg bg-[#f19319] col-span-11 ">
                          <Typography className="text-white">
                            Form must include at least one unique field
                            Telephone or Email
                          </Typography>
                        </Box>
                      ) : (
                        ""
                      )}
                      {duplicationError ? (
                        <Box className="p-5 rounded-lg bg-[#f19319] col-span-11 ">
                          <Typography className="text-white">
                            No duplication of fields allowed
                          </Typography>
                        </Box>
                      ) : (
                        ""
                      )}
                      {state.cardIssuingForm.map((field, index) => (
                        <div
                          key={index}
                          className="col-span-11 grid grid-cols-11 gap-5"
                        >
                          <div className="col-span-4">
                            <SimplifiedDropDown
                              onChange={handleFieldChange}
                              name={"fieldType"}
                              index={index}
                              list={fieldTypes}
                              value={state.cardIssuingForm[index].fieldType}
                            />
                          </div>
                          <div className="col-span-4">
                            <input
                              type="text"
                              className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                              value={state.cardIssuingForm[index].fieldName}
                              onChange={(e) =>
                                handleFieldChange(
                                  index,
                                  "fieldName",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="flex items-center">
                            <IosSwitch
                              isOn={state.cardIssuingForm[index].required}
                              name={"required"}
                              index={index}
                              setIsOn={handleFieldChange}
                            />
                          </div>
                          <div className="flex items-center">
                            <IosSwitch
                              isOn={state.cardIssuingForm[index].unique}
                              name={"unique"}
                              index={index}
                              setIsOn={handleFieldChange}
                            />
                          </div>
                          <div className="flex items-center">
                            <MdDelete
                              className="text-2xl cursor-pointer"
                              onClick={() => {
                                const newFields = state.cardIssuingForm.filter(
                                  (_, i) => i !== index
                                );
                                setState((prev) => ({
                                  ...prev,
                                  cardIssuingForm: newFields,
                                }));
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <br />
                    <span
                      onClick={state.cardIssuingForm.length < 6 ? addField : {}}
                    >
                      {state.cardIssuingForm.length < 6 ? (
                        <BlackButton btnText={"Add Field"} />
                      ) : (
                        <button className="w-full bg-white text-[#898789] py-3 rounded-md text-base my-1">
                          Add Field
                        </button>
                      )}
                    </span>
                  </div>
                </Container>
                {/* UTM */}
                <Container border={"bottom"}>
                  <Heading_Description heading="UTM" />
                  {showUtmField && (
                    <Box className="flex flex-col" sx={{ color: "#656565" }}>
                      <Box className="flex flex-row justify-between p-5">
                        <Typography sx={{ fontSize: "14px" }}>
                          Source name
                        </Typography>
                        <Typography sx={{ fontSize: "14px" }}>Link</Typography>
                        <Typography sx={{ fontSize: "14px" }}>
                          Download QR
                        </Typography>
                      </Box>
                      <Box className="flex flex-row justify-between px-5 mb-5">
                        <Typography>{state.utm}</Typography>
                        <Typography
                          onClick={() =>
                            handleCopyClick("https://take.cards/sX5aO")
                          }
                          className={`flex cursor-pointer flex-row gap-2 items-center ${copy ? "text-green-300" : "text-[#656565]"
                            }`}
                        >
                          <IoMdCopy className="cursor-pointer" />{" "}
                          https://take.cards/sX5aO
                        </Typography>
                        <Typography className="flex flex-row gap-6">
                          {" "}
                          <MdOutlineFileDownload
                            style={{ cursor: "pointer" }}
                            size={22}
                            onClick={() => downloadFile("/favicon.png")}
                          />
                          <RiDeleteBin6Line
                            size={22}
                            onClick={() => setShowUtmField(false)}
                            className="cursor-pointer"
                          />
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <input
                    type="text"
                    disabled={showUtmField}
                    placeHolder={"Source Name"}
                    className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                    value={state.utm}
                    onChange={(e) => handleStateChange("utm", e.target.value)}
                  />
                  <div
                    onClick={() => setShowUtmField(true)}
                    className={`col-span-3 text-center ${state.utm && !showUtmField
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-500"
                      } border border-gray-300 py-3 rounded-md my-5 cursor-pointer text-sm`}
                  >
                    Add a link with a UTM tag
                  </div>
                </Container>

                {/* Phone Mask */}
                <Container border={"bottom"}>
                  <Heading_Description heading="Phone Mask" />
                  <SimplifiedDropDown
                    name={"phoneMask"}
                    value={state.phoneMask}
                    onChange={handleStateChange}
                    list={phoneMask}
                  />
                  <div className="mt-9">
                    <div className="mb-1 flex justify-between">
                      <Heading_Description heading={"Privacy Policy"} />
                      <IosSwitch
                        isOn={state.privacyPolicySwitch}
                        setIsOn={handleStateChange}
                        name={"privacyPolicySwitch"}
                      />
                    </div>
                    <input
                      type="text"
                      disabled={!state.privacyPolicySwitch}
                      placeHolder={"Privacy Policy"}
                      className="border border-[#D5D5DD] py-2 h-28 px-3 w-full focus:outline-none mb-2"
                      value={state.privacyPolicyText}
                      onChange={(e) =>
                        handleStateChange("privacyPolicyText", e.target.value)
                      }
                    />
                    <br />
                    <BoxWithSwitch1
                      isOn={state.concentToProcessingOfPrivateDateSwitch}
                      setIsOn={handleStateChange}
                      name={"concentToProcessingOfPrivateDateSwitch"}
                      description={"Consent to the processing of personal data"}
                    />
                  </div>
                </Container>

                {/* Google wallet installation button */}
                <Container border={"bottom"}>
                  <Heading_Description heading="Google wallet installation button" />
                  <BoxWithSwitch1
                    isOn={state.googlewallet}
                    setIsOn={handleStateChange}
                    name={"googlewallet"}
                    description={
                      "Display the Google Wallet button in the card install form"
                    }
                  />
                </Container>

         

                {/* Analytics */}
                <Container border={"bottom"}>
                  <Heading_Description heading="Analytics" />
                  <textarea
                    type="text"
                    className="border border-[#D5D5DD] py-2 px-3 h-40 w-full focus:outline-none"
                    value={state.analytics}
                    onChange={(e) =>
                      handleStateChange("analytics", e.target.value)
                    }
                  />
                </Container>
                <br />
                <BlackButton
                  handelCLick={handleSelectSetting}
                  btnText={"Continue"}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default GiftSettings;
