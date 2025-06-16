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
import { AiTwotoneDelete } from "react-icons/ai";
import InputBox from "../../UIComponents/InputBox";
import MapModal from "../../Components/MapModal";
import {
  daysList,
  timeList,
  seperators,
  languagesList,
  dateFormats,
  fieldTypes,
  rewardType,
} from "../../Components/utils";
import SimplifiedDropDown from "../../Components/newComponent/SimplifiedDropDown";
import DatePicker from "react-datepicker";

function JointSetting({ handleSelectSetting, cardName }) {
  const [selectedUpperRadio, setSelectedUpperRadio] = useState("fixed_term");
  const [selectedBottomRadio, setSelectedBottomRadio] = useState("unlimited");
  const [rewardSelectedUpperRadio, setRewardSelectedUpperRadio] =
    useState("spend");
  const [selectedCollectedPayment, setSelectedCollectedPayment] =
    useState("no");
  const [selectedAutoRenewal, setSelectedAutoRenewal] = useState("no");
  const [selectedMembershipExpiration, setSelectedMembershipExpiration] =
    useState("paid_period");
  const [phoneMask, setPhoneMask] = useState([]);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [state, setState] = useState({
    cardExpirationFixedTermDate: null,
    cardExpirationFixedTermAfterIssuingDays: "1",
    cardExpirationFixedTermAfterIssuingYears: "Days",
    selectedCollectedPayment: "",
    selectedAutoRenewal: "",
    selectedMembershipExpiration: "",
    stampLifeFixedTermDays: "1",
    stampLifeFixedTermYears: "Days",
    language: "Spanish es",
    dateFormat: "DD/MM/YYYY",
    thousandSeperator: "Space",
    decimalSeparator: "Comma",
    purchaseAmountIsRequiredSwitch: true,
    moneySpent: "1.00",
    pointsGained: "10",
    pointsPerVisit: "",
    givePointAfterEveryVisit: false,
    reward: [
      {
        levelName: "10€ off coupon for the next purchase",
        pointsEarned: "25",
        pointsType: "Order (€ OFF)",
        pointsValue: "25.00",
      },
      {
        levelName: "20€ off coupon for the next purchase",
        pointsEarned: "50",
        pointsType: "Order (€ OFF)",
        pointsValue: "50.00",
      },
      {
        levelName: "35€ off coupon for the next purchase",
        pointsEarned: "100",
        pointsType: "Order (€ OFF)",
        pointsValue: "100.00",
      },
      {
        levelName: "50€ off coupon for the next purchase",
        pointsEarned: "200",
        pointsType: "Order (€ OFF)",
        pointsValue: "200.00",
      },
      {
        levelName: "75€ off coupon for the next purchase",
        pointsEarned: "300",
        pointsType: "Order (€ OFF)",
        pointsValue: "300.00",
      },
    ],
    tiers: [
      {
        tierName: "Bronze",
        tierDescription: "Bronze",
        pricing: [
          {
            type: "Daily",
            typeSwitch: true,
            recommendedSwicth: false,
            value: "5.00",
            limit: "1",
          },
          {
            type: "Weekly",
            typeSwitch: true,
            recommendedSwicth: false,
            value: "10.00",
            limit: "2",
          },
          {
            type: "Monthly",
            typeSwitch: true,
            recommendedSwicth: true,
            value: "35.00",
            limit: "8",
          },
          {
            type: "Yearly",
            typeSwitch: true,
            recommendedSwicth: false,
            value: "350.00",
            limit: "96",
          },
        ],
        benefits: [],
      },
      {
        tierName: "Silver",
        tierDescription: "Silver",
        pricing: [
          {
            type: "Daily",
            typeSwitch: true,
            recommendedSwicth: false,
            value: "5.00",
            limit: "1",
          },
          {
            type: "Weekly",
            typeSwitch: true,
            recommendedSwicth: false,
            value: "10.00",
            limit: "2",
          },
          {
            type: "Monthly",
            typeSwitch: true,
            recommendedSwicth: true,
            value: "35.00",
            limit: "8",
          },
          {
            type: "Yearly",
            typeSwitch: true,
            recommendedSwicth: false,
            value: "350.00",
            limit: "96",
          },
        ],
        benefits: [],
      },
      {
        tierName: "Gold",
        tierDescription: "Gold",
        pricing: [
          {
            type: "Daily",
            typeSwitch: true,
            recommendedSwicth: false,
            value: "5.00",
            limit: "1",
          },
          {
            type: "Weekly",
            typeSwitch: true,
            recommendedSwicth: false,
            value: "10.00",
            limit: "2",
          },
          {
            type: "Monthly",
            typeSwitch: true,
            recommendedSwicth: true,
            value: "35.00",
            limit: "8",
          },
          {
            type: "Yearly",
            typeSwitch: true,
            recommendedSwicth: false,
            value: "350.00",
            limit: "96",
          },
        ],
        benefits: [],
      },
    ],
    cardIssuingForm: [
      {
        fieldType: "First Name",
        fieldName: "First Name",
        required: false,
        unique: false,
      },
      {
        fieldType: "Last Name",
        fieldName: "Last Name",
        required: false,
        unique: false,
      },
      { fieldType: "URL", fieldName: "URL", required: false, unique: false },
      { fieldType: "Date", fieldName: "Date", required: true, unique: false },
      {
        fieldType: "Number",
        fieldName: "Number",
        required: false,
        unique: true,
      },
    ],
    utm: "",
    phoneMask: "Luxembourg",
    privacyPolicySwitch: true,
    privacyPolicyText: "",
    concentToProcessingOfPrivateDateSwitch: true,
    googlewallet: true,
    cardIssuedLimit: "0",
    numberOfStampsWhenIssuingCard: "0",
    trackVisitWhenRedeemCard: false,
    earnPointsWhenRedeemReward: false,
    analyticsSwitch: false,
    purchaseAmountIsRequiredSwitch: false,
    analytics: "",
  });

  // reward functions
  const handleRewardChange = (index, name, value) => {
    setState((prevState) => {
      const updatedForm = [...prevState.reward];

      updatedForm[index] = {
        ...updatedForm[index],
        [name]: value,
      };

      return {
        ...prevState,
        reward: updatedForm,
      };
    });
  };

  const addReward = () => {
    setState((prev) => ({
      ...prev,
      reward: [
        ...prev.reward,
        {
          levelName: "",
          pointsEarned: "",
          pointsType: "",
          pointsValue: "",
        },
      ],
    }));
  };
  const handleNestedFieldName = (group, key, index) => (value) => {
    setState((prevState) => {
      const updatedLinks = [...prevState[group]];
      updatedLinks[index] = { ...updatedLinks[index], [key]: value };
      return { ...prevState, [group]: updatedLinks };
    });
  };
  const handleCheckBox = (field) => {
    setState((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

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
        {
          fieldType: "Text",
          fieldName: "Text",
          required: false,
          unique: false,
        },
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

  // radio functions

  const handleRewardChangeUpperRadio = (event) => {
    setRewardSelectedUpperRadio(event.target.value);
  };

  const handleChangeUpperRadio = (event) => {
    setSelectedUpperRadio(event.target.value);
  };

  const handleChangeBottomRadio = (event) => {
    setSelectedBottomRadio(event.target.value);
  };

  useEffect(() => {
    document.title = `${cardName} Settings`;
    ////// console.log   .clear();
    //// console.log   .table(state);
    //// console.log   .log("this data comming from join setting");
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
      .catch((error) =>  console.log   .error("Error:", error))
  }, []);

  return (
    <>
      <div>
        <div>
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
                {cardName === "Reward" ? (
                  <>
                    <Container border={"both"}>
                      <Heading_Description heading="Reward Program" />
                      <div>
                        <BpRadio1
                          label="Spend (Give points based on the customer spend)"
                          name="radioGroup1"
                          props={{
                            value: "spend",
                            checked: rewardSelectedUpperRadio === "spend",
                            onChange: handleRewardChangeUpperRadio,
                          }}
                        />
                        <BpRadio1
                          label="Visit (Give points based on the customer visits)"
                          name="radioGroup1"
                          props={{
                            value: "visit",
                            checked: rewardSelectedUpperRadio === "visit",
                            onChange: handleRewardChangeUpperRadio,
                          }}
                        />
                        <BpRadio1
                          label="Points (Give points based on your rules)"
                          name="radioGroup1"
                          props={{
                            value: "points",
                            checked: rewardSelectedUpperRadio === "points",
                            onChange: handleRewardChangeUpperRadio,
                          }}
                        />
                      </div>
                      <div
                        className={
                          rewardSelectedUpperRadio === "points" ? `` : `mt-9`
                        }
                      >
                        {rewardSelectedUpperRadio === "spend" ? (
                          <div>
                            {/* Spend */}
                            <Heading_Description
                              heading={"How do your customers earn points?"}
                              description={"Eg: 1 point for every 1€ spent"}
                            />
                            <div className="flex items-center">
                              <span className="w-full">
                                <InputBox
                                  textPosition={"left"}
                                  text={"€"}
                                  fieldName={"moneySpent"}
                                  value={state.moneySpent}
                                  onChange={handleStateChange}
                                />
                              </span>
                              <span className="mx-3">=</span>
                              <span className="w-full">
                                <InputBox
                                  textPosition={"right"}
                                  text={"Points"}
                                  fieldName={"pointsGained"}
                                  value={state.pointsGained}
                                  onChange={handleStateChange}
                                />
                              </span>
                            </div>
                          </div>
                        ) : selectedUpperRadio === "visit" ? (
                          <div>
                            {/* Visit */}
                            <Heading_Description
                              heading={"How do your customers earn points?"}
                              description={"Eg: 10 points for every visit"}
                            />
                            <div className="flex items-center">
                              <span className="w-full">
                                <InputBox
                                  placeHolder={"1"}
                                  disabled
                                  textPosition={"right"}
                                  text={"Visit"}
                                />
                              </span>
                              <span className="mx-3">=</span>
                              <span className="w-full">
                                <InputBox
                                  textPosition={"right"}
                                  text={"Points"}
                                  value={state.pointsPerVisit}
                                  onChange={handleStateChange}
                                  fieldName={"pointsPerVisit"}
                                />
                              </span>
                            </div>
                            <div className="my-2"></div>
                            <label htmlFor="checkbox">
                              <input
                                type="checkbox"
                                id="checkbox"
                                checked={state.givePointAfterEveryVisit}
                                onChange={() =>
                                  handleCheckBox("givePointAfterEveryVisit")
                                }
                              />
                              <span className="ml-2">
                                Give points after every visit
                              </span>
                            </label>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </Container>

                    <Container border={"bottom"}>
                      <Heading_Description
                        heading={"How do you want to reward your customers?"}
                        description={
                          "Eg: 1000 points gets a reward 10€. You can also create reward levels like silver or gold"
                        }
                      />
                      {state.reward.map((value, index) => {
                        return (
                          <Container
                            key={index}
                            padding={"low"}
                            border={"bottom"}
                          >
                            <div className="flex items-end gap-2">
                              <div className="w-full">
                                <Heading_Description
                                  heading={`${index + 1}. Reward level name`}
                                />
                                <input
                                  type="text"
                                  className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                                  value={state.reward[index].levelName}
                                  onChange={(e) =>
                                    handleRewardChange(
                                      index,
                                      "levelName",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <AiTwotoneDelete
                                className="text-2xl mb-[9px] mr-1 cursor-pointer"
                                onClick={() => {
                                  const newFields = state.reward.filter(
                                    (_, i) => i !== index
                                  );
                                  setState((prev) => ({
                                    ...prev,
                                    reward: newFields,
                                  }));
                                }}
                              />
                            </div>
                            <div className="mt-5 grid grid-cols-3 gap-2">
                              <div className="flex items-end gap-2">
                                <div className="w-full">
                                  <InputBox
                                    heading={"Reward points earned"}
                                    textPosition={"right"}
                                    text={"Points"}
                                    name={`reward[${index}].pointsEarned`}
                                    value={state.reward[index].pointsEarned}
                                    onChange={handleNestedFieldName(
                                      "reward",
                                      "pointsEarned",
                                      index
                                    )}
                                  />
                                </div>
                                <p className="text-2xl mb-[6px]">=</p>
                              </div>
                              <div>
                                <Heading_Description heading={"Reward Type"} />
                                <SimplifiedDropDown
                                  value={state.reward[index].pointsType}
                                  list={rewardType}
                                  name={"pointsType"}
                                  onChange={handleRewardChange}
                                  index={index}
                                />
                              </div>
                              <div>
                                <InputBox
                                  heading={"Reward value"}
                                  textPosition={"left"}
                                  text={"€"}
                                  name={`reward[${index}].pointsValue`}
                                  value={state.reward[index].pointsValue}
                                  onChange={handleNestedFieldName(
                                    "reward",
                                    "pointsValue",
                                    index
                                  )}
                                />
                              </div>
                            </div>
                          </Container>
                        );
                      })}
                      <br />
                      <br />
                      <span onClick={addReward}>
                        <BlackButton btnText="Add Reward" />
                      </span>
                    </Container>
                  </>
                ) : (
                  ""
                )}

                <Container border={"both"}>
                  <Heading_Description heading="Card expiration date" />
                  <div>
                    <BpRadio1
                      label="Unlimited"
                      name="radioGroup1"
                      props={{
                        value: "unlimited",
                        checked: selectedUpperRadio === "unlimited",
                        onChange: handleChangeUpperRadio,
                      }}
                    />
                    <BpRadio1
                      label="Fixed term"
                      name="radioGroup1"
                      props={{
                        value: "fixed_term",
                        checked: selectedUpperRadio === "fixed_term",
                        onChange: handleChangeUpperRadio,
                      }}
                    />
                    <BpRadio1
                      label="Fixed term after card issuing"
                      name="radioGroup1"
                      props={{
                        value: "fixed_term_after_card",
                        checked: selectedUpperRadio === "fixed_term_after_card",
                        onChange: handleChangeUpperRadio,
                      }}
                    />
                  </div>

                  {selectedUpperRadio === "fixed_term_after_card" ? (
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
                  ) : selectedUpperRadio === "fixed_term" ? (
                    <div className=" mt-7 w-full">
                      <Heading_Description heading="Terms" />
                      <DatePicker
                        selected={state.cardExpirationFixedTermDate}
                        onChange={(date) =>
                          handleStateChange("cardExpirationFixedTermDate", date)
                        }
                        placeholderText="choose some date"
                        className="sm:w-[600px] w-auto rounded-md border-0 p-4 outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#DFDFE5] sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  ) : null}
                </Container>

                {/* Card expiration date */}
                <Container border={"bottom"}>
                  <Heading_Description
                    heading={
                      cardName === "Stamp" ? "Stamp Life" : "LifeTime Points"
                    }
                  />
                  <div>
                    <BpRadio1
                      label="Unlimited"
                      name="radioGroup2"
                      props={{
                        value: "unlimited",
                        checked: selectedBottomRadio === "unlimited",
                        onChange: handleChangeBottomRadio,
                      }}
                    />
                    <BpRadio1
                      label={
                        cardName === "Stamp"
                          ? "Fixed term after stamps earned"
                          : "Fixed term after bonuses earned"
                      }
                      name="radioGroup2"
                      props={{
                        value: "fixed_term",
                        checked: selectedBottomRadio === "fixed_term",
                        onChange: handleChangeBottomRadio,
                      }}
                    />
                  </div>
                  {selectedBottomRadio === "fixed_term" ? (
                    <div className="grid md:grid-cols-2 gap-5 mt-7">
                      <div>
                        <Heading_Description heading="Term" />
                        <SimplifiedDropDown
                          value={state.stampLifeFixedTermDays}
                          onChange={handleStateChange}
                          name={"stampLifeFixedTermDays"}
                          list={daysList}
                        />
                      </div>
                      <div className="mt-6">
                        <Heading_Description heading="" />
                        <SimplifiedDropDown
                          value={state.stampLifeFixedTermYears}
                          onChange={handleStateChange}
                          name={"stampLifeFixedTermYears"}
                          list={timeList}
                        />
                      </div>
                    </div>
                  ) : null}
                </Container>

                {/* Locations */}
                <Container border={"bottom"}>
                  <Heading_Description heading="Locations" />
                  <div className="p-3 border border-gray-300 rounded">
                    <div className="text-center my-2">
                      You have not yet created any
                    </div>
                    <span onClick={toggleMapModal}>
                      <BlackButton btnText={"Add Location"} />
                    </span>
                    {isMapModalVisible && <MapModal onClose={toggleMapModal} />}
                  </div>
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
                      onClick={
                        state.cardIssuingForm.length + 1 < fieldTypes.length
                          ? addField
                          : {}
                      }
                    >
                      {state.cardIssuingForm.length + 1 < fieldTypes.length ? (
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
                  <input
                    type="text"
                    placeHolder={"Source Name"}
                    className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                    value={state.utm}
                    onChange={(e) => handleStateChange("utm", e.target.value)}
                  />
                  <div className="col-span-3 text-center bg-gray-200 text-gray-500 border border-gray-300 py-3 rounded-md my-5 cursor-pointer text-sm">
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
                    <textarea
                      type="text"
                      disabled={!state.privacyPolicySwitch}
                      placeHolder={"Privacy Policy"}
                      className="border border-[#D5D5DD] py-2 px-3  h-28 w-full focus:outline-none mb-5"
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

                {/* Limit the number of cards issued */}
                <Container border={"bottom"}>
                  <Heading_Description
                    heading="Limit the number of cards issued"
                    description={"0 - Unlimited"}
                  />
                  <input
                    type="Number"
                    className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                    value={state.cardIssuedLimit}
                    onChange={(e) =>
                      handleStateChange("cardIssuedLimit", e.target.value)
                    }
                  />
                </Container>

                {/* Number of stamps when issuing a card */}
                <Container border={"bottom"}>
                  <Heading_Description heading="Number of stamps when issuing a card" />
                  <input
                    type="Number"
                    className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                    value={state.numberOfStampsWhenIssuingCard}
                    onChange={(e) =>
                      handleStateChange(
                        "numberOfStampsWhenIssuingCard",
                        e.target.value
                      )
                    }
                  />
                </Container>

                {cardName === "Reward" ? (
                  <>
                    {/* Track visit button */}
                    <Container border={"bottom"}>
                      <Heading_Description heading="Track visit when redeem reward" />
                      <BoxWithSwitch1
                        isOn={state.trackVisitWhenRedeemCard}
                        setIsOn={handleStateChange}
                        name={"trackVisitWhenRedeemCard"}
                        description={"Track visit when redeem reward"}
                      />
                    </Container>

                    {/* Earn points when redeem button */}
                    <Container border={"bottom"}>
                      <Heading_Description heading="Earn points when redeem reward" />
                      <BoxWithSwitch1
                        setIsOn={handleStateChange}
                        name={"earnPointsWhenRedeemReward"}
                        isOn={state.earnPointsWhenRedeemReward}
                        description={"Earn points when redeem reward"}
                      />
                    </Container>
                  </>
                ) : (
                  ""
                )}

                {/* Analytics */}
                <Container border={"bottom"}>
                  <Heading_Description heading="Analytics" />
                  <textarea
                    type="text"
                    className="border border-[#D5D5DD] py-2 h-40 px-3 w-full focus:outline-none"
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

export default JointSetting;
