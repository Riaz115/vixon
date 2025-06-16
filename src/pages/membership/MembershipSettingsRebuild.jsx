import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { pageVariants } from "../../Animation";
import { motion } from "framer-motion";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import MapModal from "../../Components/MapModal";
import BlackButton from "../../UIComponents/BlackButton";
import BoxWithSwitch1 from "../../UIComponents/BoxWithSwitch";
import Container from "../../UIComponents/Container";
import { MdDelete } from "react-icons/md";
import Heading_Description from "../../UIComponents/Heading_Description";
import IosSwitch from "../../UIComponents/IosSwitch";
import BpRadio1 from "../../UIComponents/RadioBtn";
import {
  daysList,
  timeList,
  seperators,
  languagesList,
  dateFormats,
  fieldTypes,
} from "../../Components/utils";
import SimplifiedDropDown from "../../Components/newComponent/SimplifiedDropDown";
import { Box, Typography } from "@mui/material";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdCopy } from "react-icons/io";
import downloadFile from "../../Components/downloadFile";
import toast from "react-hot-toast";
import { FaTrash } from 'react-icons/fa';

export default function MembershipSettingsRebuild({
  handleSelectSetting,
  state,
  setState,
}) {

  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [phoneMasks, setPhoneMasks] = useState([]);
  const [copy, setCopy] = useState(false);
  const [showUtmField, setShowUtmField] = useState(false);
  const [cardIssuingError, setCardIssuingError] = useState(false);
  const [duplicationError, setDuplicationError] = useState(false);


  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
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

  const addTier = () => {
    setState((prevState) => {
      const newTier = {
        tierName: "",
        tierDescription: "",
        pricing: [
          {
            type: "Daily",
            typeSwitch: false,
            recommendedSwicth: false,
            value: "",
            limit: "",
          },
          {
            type: "Weekly",
            typeSwitch: false,
            recommendedSwicth: false,
            value: "",
            limit: "",
          },
          {
            type: "Monthly",
            typeSwitch: false,
            recommendedSwicth: false,
            value: "",
            limit: "",
          },
          {
            type: "Yearly",
            typeSwitch: false,
            recommendedSwicth: false,
            value: "",
            limit: "",
          },
        ],
        benefits: [],
      };

      return {
        ...prevState,
        tiers: [...prevState.tiers, newTier],
      };
    });
  };

  const deleteTier = (tierIndex) => {
    setState((prevState) => {
      const updatedTiers = [...prevState.tiers];
      updatedTiers.splice(tierIndex, 1);

      return {
        ...prevState,
        tiers: updatedTiers,
      };
    });
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

  const addBenifit = (tierIndex) => {
    setState((prevState) => {
      const updatedTiers = [...prevState.tiers];
      const updatedbenefits = [
        ...updatedTiers[tierIndex].benefits,
        { inputValue: "" },
      ];

      updatedTiers[tierIndex] = {
        ...updatedTiers[tierIndex],
        benefits: updatedbenefits,
      };

      return {
        ...prevState,
        tiers: updatedTiers,
      };
    });
  };

  const handleBenifitChange = (tierIndex, benifitIndex, value) => {
    setState((prevState) => {
      const updatedTiers = [...prevState.tiers];
      const updatedbenefits = [...updatedTiers[tierIndex].benefits];

      updatedbenefits[benifitIndex] = {
        ...updatedbenefits[benifitIndex],
        inputValue: value,
      };

      updatedTiers[tierIndex] = {
        ...updatedTiers[tierIndex],
        benefits: updatedbenefits,
      };

      return {
        ...prevState,
        tiers: updatedTiers,
      };
    });
  };

  const deleteBenifit = (tierIndex, benifitIndex) => {
    setState((prevState) => {
      const updatedTiers = [...prevState.tiers];
      const updatedbenefits = [...updatedTiers[tierIndex].benefits];

      // Remove the benefit at the specified index
      updatedbenefits.splice(benifitIndex, 1);

      updatedTiers[tierIndex] = {
        ...updatedTiers[tierIndex],
        benefits: updatedbenefits,
      };

      return {
        ...prevState,
        tiers: updatedTiers,
      };
    });
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

  const handleTierFieldChange = (
    tierIndex,
    fieldName,
    value,
    pricingIndex = null
  ) => {
    setState((prevState) => {
      const updatedTiers = [...prevState.tiers];

      if (pricingIndex !== null) {
        const updatedPricing = [...updatedTiers[tierIndex].pricing];
        updatedPricing[pricingIndex] = {
          ...updatedPricing[pricingIndex],
          [fieldName]: value,
        };
        updatedTiers[tierIndex] = {
          ...updatedTiers[tierIndex],
          pricing: updatedPricing,
        };
      } else {
        updatedTiers[tierIndex] = {
          ...updatedTiers[tierIndex],
          [fieldName]: value,
        };
      }

      return {
        ...prevState,
        tiers: updatedTiers,
      };
    });
  };

  useEffect(() => {
    ////// //console.log   .clear();
    //// //console.log   .table(state);
  }, [state]);

  const handleChangeUpperRadio = (event) => {
    setState((prew) => {
      return {
        ...prew,
        selectedUpperRadio: event.target.value,
      };
    });
    // setSelectedUpperRadio(event.target.value);
  };
  const toggleMapModal = () => {
    setIsMapModalVisible(!isMapModalVisible);
  };

  const handleChange_CollectPayment = (event) => {
    setState((prew) => {
      return {
        ...prew,
        selectedCollectedPayment: event.target.value,
      };
    });
    // setSelectedCollectedPayment(event.target.value);
  };
  const handleChange_AutoRenewal = (event) => {
    setState((prew) => {
      return {
        ...prew,
        selectedAutoRenewal: event.target.value,
      };
    });
    // setSelectedAutoRenewal(event.target.value);
  };
  const handleChange_MembershipExpiration = (event) => {
    setState((prew) => {
      return {
        ...prew,
        selectedMembershipExpiration: event.target.value,
      };
    });
    // setSelectedMembershipExpiration(event.target.value);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data?.map((country) => ({
          name: country.name.common,
        }));
        setPhoneMasks(countryList);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    document.title = "Membership Settings";
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
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <div>
          <div>
            <Heading_Description heading={"Design"} />
            <Container border={"both"}>
              <Heading_Description heading="Collect payments" />
              <div>
                <BpRadio1
                  label="Yes (if you want charge your customers in the system)"
                  name="radioGroup1"
                  props={{
                    value: "yes",
                    checked: state.selectedCollectedPayment === "yes",
                    onChange: handleChange_CollectPayment,
                  }}
                />
                <BpRadio1
                  label="No (if you want to distribute cards without collecting payments)"
                  name="radioGroup1"
                  props={{
                    value: "no",
                    checked: state.selectedCollectedPayment === "no",
                    onChange: handleChange_CollectPayment,
                  }}
                />
              </div>
              <div className="mt-7"></div>
              {state.selectedCollectedPayment === "yes" && (
                <Container border={"top"}>
                  <Heading_Description heading="Payment Gateway" />
                  <div className="text-sm bg-red-600 border border-gray-200 text-white rounded-md p-3 mt-2">
                    It is necessary to connect the payment method if payment
                    collection is enabled
                  </div>
                  <div className="my-3"></div>
                  <div className="border border-gray-200 rounded-md p-4 mt-2 bg-white flex justify-between">
                    <div className="flex gap-3 items-center">
                      <img
                        src="/assets/service-Stripe.svg"
                        alt="stripe logo"
                        className="w-16 "
                      />
                      <span className="bg-gray-200 w-max px-3 h-[25px] rounded-full flex items-center gap-1 text-[11px]">
                        <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                        Disconnected
                      </span>
                    </div>
                    <div className="text-center text-white bg-black w-[150px] py-2 rounded-md">
                      Connect
                    </div>
                  </div>
                </Container>
              )}
            </Container>
            <Container border={"bottom"}>
              <Heading_Description heading="Auto-renewal" />
              <div>
                <BpRadio1
                  label="Yes (if you want setup subscriptions with recurring renewals)"
                  name="radioGroup1"
                  props={{
                    value: "yes",
                    checked: state.selectedAutoRenewal === "yes",
                    onChange: handleChange_AutoRenewal,
                  }}
                />
                <BpRadio1
                  label="No (if you want to offer lifetime memberships)"
                  name="radioGroup1"
                  props={{
                    value: "no",
                    checked: state.selectedAutoRenewal === "no",
                    onChange: handleChange_AutoRenewal,
                  }}
                />
              </div>
            </Container>
            {state.selectedAutoRenewal === "yes" && (
              <Container border={"bottom"}>
                <Heading_Description heading="Membership expiration" />
                <div>
                  <BpRadio1
                    label="Based on paid period"
                    name="radioGroup1"
                    props={{
                      value: "paid_period",
                      checked:
                        state.selectedMembershipExpiration === "paid_period",
                      onChange: handleChange_MembershipExpiration,
                    }}
                  />
                  <BpRadio1
                    label="Specific time and date (only for memberships without auto renewals)"
                    name="radioGroup1"
                    props={{
                      value: "specific_time",
                      checked:
                        state.selectedMembershipExpiration === "specific_time",
                      onChange: handleChange_MembershipExpiration,
                    }}
                  />
                </div>
              </Container>
            )}
            {state.selectedMembershipExpiration === "specific_time" && (
              <Container border={"bottom"}>
                <Heading_Description heading="Card expiration date" />
                <div>
                  <BpRadio1
                    label="Unlimited"
                    name="radioGroup1"
                    props={{
                      value: "unlimited",
                      checked: state?.selectedUpperRadio === "unlimited",
                      onChange: handleChangeUpperRadio,
                    }}
                  />
                  <BpRadio1
                    label="Fixed term"
                    name="radioGroup1"
                    props={{
                      value: "fixed_term",
                      checked: state?.selectedUpperRadio === "fixed_term",
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
                        list={daysList}
                        onChange={handleStateChange}
                        name={"cardExpirationFixedTermAfterIssuingDays"}
                      />
                    </div>
                    <div className="mt-8">
                      <SimplifiedDropDown
                        value={state.cardExpirationFixedTermAfterIssuingYears}
                        list={timeList}
                        onChange={handleStateChange}
                        name={"cardExpirationFixedTermAfterIssuingYears"}
                      />
                    </div>
                  </div>
                ) : state.selectedUpperRadio === "fixed_term" ? (
                  <div className=" mt-7">
                    <Heading_Description heading="Terms" />
                    <input
                      type="text"
                      placeholder="02-08-24"
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
            )}

            {/* Section One */}
            {state?.tiers?.map((field, index) => (
              <Container border={"bottom"} key={index}>
                <div className="flex items-end gap-3">
                  <div className="w-full">
                    <Heading_Description heading={`${index + 1}. Tier Name`} />
                    <input
                      type="text"
                      className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                      value={state.tiers[index].tierName}
                      onChange={(e) =>
                        handleTierFieldChange(index, "tierName", e.target.value)
                      }
                    />
                  </div>
                  <div className="h-max flex justify-center items-center gap-3 mb-[2px]">
                    <div className="h-full flex items-center border border-gray-300 p-[10px] rounded">
                      <FaRegCopy className="cursor-pointer" />
                    </div>

                    {index === 0 ? (
                      ""
                    ) : (
                      <div className="h-full flex items-center border border-gray-300 p-[10px] rounded">
                        <IoTrashBinOutline
                          onClick={() => deleteTier(index)}
                          className="cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <br />
                <input
                  type="text"
                  className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                  value={state.tiers[index].tierDescription}
                  onChange={(e) =>
                    handleTierFieldChange(
                      index,
                      "tierDescription",
                      e.target.value
                    )
                  }
                />
                <br />
                <br />
                <br />
                <Heading_Description
                  heading={"Pricing"}
                  description={
                    "Select renewal periods and set prices and limits"
                  }
                />
                <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                  {field?.pricing?.map((pair, pricingindex) => {
                    return (
                      <>
                        <div>
                          <div className="py-2 flex gap-2">
                            <IosSwitch
                              isOn={pair.typeSwitch}
                              name={"typeSwitch"}
                              setIsOn={handleTierFieldChange}
                              index={index}
                              pricingIndex={pricingindex}
                            />
                            {pair.type}
                          </div>

                          {pair.typeSwitch ? (
                            <div className={`flex relative flex-row`}>
                              <div className="text-[#1F1E1F] text-[16.8px] bg-[#F7F7F8] border-y border-[#D5D5DD] shadow-inner px-4 flex justify-center items-center rounded-l-md border-l">
                                $
                              </div>

                              <input
                                value={pair.value}
                                onChange={(e) =>
                                  handleTierFieldChange(
                                    index,
                                    "value",
                                    e.target.value,
                                    pricingindex
                                  )
                                }
                                type="text"
                                className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none rounded-r-md"
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="float-right py-2 flex gap-2">
                            <IosSwitch
                              isOn={
                                pair.typeSwitch ? pair.recommendedSwicth : false
                              }
                              name={"recommendedSwicth"}
                              setIsOn={
                                pair.typeSwitch ? handleTierFieldChange : ""
                              }
                              index={index}
                              pricingIndex={pricingindex}
                            />
                            Recommended
                          </div>
                          <div className="w-full">
                            {pair.typeSwitch ? (
                              <div className={`flex relative flex-row`}>
                                <div className="text-[#1F1E1F] text-[16.8px] bg-[#F7F7F8] border-y border-[#D5D5DD] shadow-inner px-4 flex justify-center items-center rounded-l-md border-l">
                                  Limit
                                </div>

                                <input
                                  value={pair.limit}
                                  onChange={(e) =>
                                    handleTierFieldChange(
                                      index,
                                      "limit",
                                      e.target.value,
                                      pricingindex
                                    )
                                  }
                                  type="text"
                                  className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none rounded-r-md"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <br />
                <br />
                <Heading_Description heading={"Benefits"} />
                <div className="mb-3">
                  {field?.benefits?.map((value, benifitIndex) => {
                    return (
                      <div className="my-3 flex gap-4" key={benifitIndex}>
                        <div className="w-full">
                          <input
                            value={value.inputValue}
                            onChange={(e) =>
                              handleBenifitChange(
                                index,
                                benifitIndex,
                                e.target.value
                              )
                            }
                            type="text"
                            className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none rounded-r-md"
                          />
                        </div>
                        <div className="mr-3 flex items-center">
                          <AiTwotoneDelete
                            className="text-2xl"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteBenifit(index, benifitIndex)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  className="text-center rounded-md py-2 border border-gray-300 cursor-pointer"
                  onClick={() => addBenifit(index)}
                >
                  Add Benefits
                </div>
              </Container>
            ))}
            <button
              className="w-full bg-[black] text-white py-2 rounded-md text-base my-1"
              onClick={addTier}
            >
              Add Tier
            </button>
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
                        Form must include at least one unique field Telephone or
                        Email
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
                  {state.cardIssuingForm?.map((field, index) => (
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
                            const newFields = state.cardIssuingForm?.filter(
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
                  onClick={state.cardIssuingForm?.length < 6 ? addField : {}}
                >
                  {state.cardIssuingForm?.length < 6 ? (
                    <BlackButton btnText={"Add Field"} />
                  ) : (
                    <button className="w-full bg-white text-[#898789] py-3 rounded-md text-base my-1">
                      Add Field
                    </button>
                  )}
                </span>
              </div>
            </Container>
            <Container border={"bottom"}>
              <h1 className="block pb-5 text-xl">Locations</h1>
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
            <Container border={"bottom"}>
              <Heading_Description heading={"Language"} />
              <SimplifiedDropDown
                list={languagesList}
                onChange={handleStateChange}
                value={state.language}
                name={"language"}
              />
            </Container>
            <Container border={"bottom"}>
              <Heading_Description heading={"Date format"} />
              <SimplifiedDropDown
                list={dateFormats}
                onChange={handleStateChange}
                value={state.dateFormat}
                name={"dateFormat"}
              />
            </Container>
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
            <Container border={"bottom"}>
              <Heading_Description heading={"Purchase amount when charging"} />
              <BoxWithSwitch1
                description={"Purchase amount is requred in Scanner App"}
                isOn={state.purchaseAmountIsRequiredSwitch}
                setIsOn={handleStateChange}
                name={"purchaseAmountIsRequiredSwitch"}
              />
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
            <Container border={"bottom"}>
              <Heading_Description heading={"Phone mask"} />
              <SimplifiedDropDown
                list={phoneMasks}
                onChange={handleStateChange}
                name={"phoneMask"}
                value={state.phoneMask}
              />
            </Container>
            <Container border={"bottom"}>
              <div className="flex justify-between">
                <Heading_Description heading={"Privacy Policy"} />
                <IosSwitch
                  isOn={state.privacyPolicySwitch}
                  setIsOn={handleStateChange}
                  name={"privacyPolicySwitch"}
                />
              </div>
              <textarea
                type="text"
                disabled={!state.privacyPolicySwitch}
                className="border border-[#D5D5DD] py-2 px-3 h-40 w-full focus:outline-none"
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
            </Container>
            <Container border={"bottom"}>
              <Heading_Description
                heading={"Google wallet installation button"}
              />
              <BoxWithSwitch1
                isOn={state.googlewallet}
                setIsOn={handleStateChange}
                name={"googlewallet"}
                description={
                  "Display the Google Wallet button in the card install form"
                }
              />
            </Container>
            <Container border={"bottom"}>
              <Heading_Description
                heading={"Limit the number of cards issued"}
                description={"0 - unlimited"}
              />
              <input
                placeholder="0"
                type="number"
                className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                value={state.cardIssuedLimit}
                onChange={(e) =>
                  handleStateChange("cardIssuedLimit", e.target.value)
                }
              />
            </Container>
            {/* <Container border={"bottom"}>
              <Heading_Description
                heading={"Number of stamps when issuing a card"}
              />
              <input
                placeholder="0"
                type="number"
                className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                value={state.numberOfStampsWhenIssuingCard}
                onChange={(e) =>
                  handleStateChange(
                    "numberOfStampsWhenIssuingCard",
                    e.target.value
                  )
                }
              />
            </Container> */}
            <Container border={"bottom"}>
              <div className="flex justify-between">
                <Heading_Description heading={"Analytics"} />
                <IosSwitch
                  isOn={state.analyticsSwitch}
                  setIsOn={handleStateChange}
                  name={"analyticsSwitch"}
                />
              </div>
              <textarea
                type="text"
                disabled={!state.analyticsSwitch}
                className="border border-[#D5D5DD] py-2 px-3 h-40 w-full focus:outline-none"
                value={state.analytics}
                onChange={(e) => handleStateChange("analytics", e.target.value)}
              />
              <br />
              <BlackButton
                btnText={"Continue"}
                handelCLick={() => handleSelectSetting("Membership")}
              />
            </Container>
          </div>

          {/* <PhoneEmulator>
            <div className="w-full shadow bg-white rounded-md">
              <div className="flex justify-center items-end h-[140px]">
                <Barcode
                  value={"1489276542312312"}
                  width={0.9}
                  height={30}
                  format="CODE128"
                  displayValue={true}
                  fontOptions="bold"
                  font="Arial"
                  textAlign="center"
                  textPosition="bottom"
                  textMargin={5}
                  fontSize={15}
                  background="#ffffff"
                  lineColor="#000000"
                  margin={10}
                />
              </div>
            </div>
          </PhoneEmulator> */}
        </div>
      </motion.div>
    </>
  );
}
