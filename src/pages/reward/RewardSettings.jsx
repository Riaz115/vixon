import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Heading_Description from "../../UIComponents/Heading_Description";
import Container from "../../UIComponents/Container";
import BpRadio1 from "../../UIComponents/RadioBtn";
import { pageVariants } from "../../Animation";
import { PhoneEmulator } from "../../Components/PhoneEmulator";
// import Barcode from "react-barcode";
import BlackButton from "../../UIComponents/BlackButton";
import BoxWithSwitch1 from "../../UIComponents/BoxWithSwitch";
import InputBox from "../../UIComponents/InputBox";
import { MdDelete } from "react-icons/md";
import IosSwitch from "../../UIComponents/IosSwitch";
import { FaStar } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { fieldTypes, rewardType } from "../../Components/utils";
import MapModal from "../../Components/MapModal";
import SimplifiedDropDown from "../../Components/newComponent/SimplifiedDropDown";
import { Box, Typography, Button } from "@mui/material";
import toast from "react-hot-toast";
import { getLocations } from "../../api/location";
import { PiPlus } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";
import { Chip, Popover } from "@mui/material";
import { useSelector } from "react-redux";
import { selectBusinesses } from "../../redux/businessSlice";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Basic styling
import "tippy.js/themes/material.css"; // Example theme
import { IoInformationCircleOutline } from "react-icons/io5";
function RewardSettings({
  handleSelectSetting,
  state,
  setState,
  errors,
  setErrors,
  t,
}) {
  const [phoneMasks, setPhoneMasks] = useState([]);
  const business = useSelector(selectBusinesses);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [copy, setCopy] = useState(false);
  const [showUtmField, setShowUtmField] = useState(false);
  const [cardIssuingError, setCardIssuingError] = useState(false);
  const [duplicationError, setDuplicationError] = useState(false);
  const [locations, setLocations] = useState();
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await getLocations({
          businessId: business?.activeLocation,
        });
        if (res.status === 200) {
          // //console.log(res.data.locations, "this is response data")
          setLocations(res.data.locations);
        }
      } catch (error) {
        // //console.log("these are error for card", error)
      }
    };
    getdata();
  }, []);
  const [popupAnchor, setPopupAnchor] = useState(null);

  const handlePopupOpen = (event) => {
    setPopupAnchor(event.currentTarget);
  };

  const handlePopupClose = () => {
    setPopupAnchor(null);
  };

  const isPopupOpen = Boolean(popupAnchor);
  const popupId = isPopupOpen ? "location-popover" : undefined;

  //// //console.log   .log(state, "this is State data for reward setting component");

  const handleCopyClick = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopy(true);
        toast.success(t("textcopied"));

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
    //console.log(emailField,phoneField,"these are feilds")

    if (!phoneField?.unique && !emailField?.unique) {
      //console.log("how are you")
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

  const handleFieldChange = (index, name, value) => {
    // Update the form data state
    setState((prevState) => {
      const updatedForm = [...prevState.cardIssuingForm];

      // Update the specific field by index
      updatedForm[index] = {
        ...updatedForm[index],
        [name]: value,
      };

      // Create a new object to hold validation errors
      const newErrors = { cardIssuingForm: [] };

      // Validate fields in the updatedForm (not the old state)
      updatedForm.forEach((field, i) => {
        if (!field.fieldName || field.fieldName.trim() === "") {
          // Ensure the index exists in the errors array
          newErrors.cardIssuingForm[i] = newErrors.cardIssuingForm[i] || {};

          // Set the error message for fieldName
          newErrors.cardIssuingForm[i].fieldName = `${field.fieldType} ${t(
            "isrequire"
          )}`;
        } else {
          // If no error, ensure we clear the error at this index
          newErrors.cardIssuingForm[i] = { fieldName: "" };
        }
      });

      // Update errors and return updated state
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardIssuingForm: newErrors.cardIssuingForm,
      }));

      // Return the updated state
      return {
        ...prevState,
        cardIssuingForm: updatedForm,
      };
    });
  };

  useEffect(() => {
    checkCardIssuing();
    if (!checkForDuplicates()) {
      setDuplicationError(true);
    } else {
      setDuplicationError(false);
    }
  }, [state]);

  const handleCheckBox = (field) => {
    setState((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handlerewardchange = (obj, key, value) => {
    //console.log(obj, key, value, "these are all things");

    setState((prevState) => ({
      ...prevState,
      [obj]: {
        ...prevState[obj],
        [key]: value,
      },
    }));
  };

  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    if (value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: `${key}  ${t("isrequire")}`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: "",
      }));
    }
  };
  const handleChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      purchaseAmountIsRequiredSwitch: value,
    }));
  };
  const handleRewardChange = (index, name, value) => {
    setState((prevState) => {
      const updatedForm = [...prevState.reward];

      updatedForm[index] = {
        ...updatedForm[index],
        [name]: value,
      };

      const newErrors = { reward: [] };

      // //console.log(updatedForm, "this is updatedform data", name, "this is name of the filed")

      updatedForm.forEach((field, i) => {
        if (!field[name] || field[name].trim() === "") {
          newErrors.reward[i] = newErrors.reward[i] || {};

          newErrors.reward[i][name] = `${name}  ${t("isrequire")}`;
        }
      });

      // Update errors and return updated state
      setErrors((prevErrors) => ({
        ...prevErrors,
        reward: newErrors.reward,
      }));

      return {
        ...prevState,
        reward: updatedForm,
      };
    });
  };

  const handleCardIssuingChange = (index, name, value) => {
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

  const handleNestedFieldName = (group, key, index) => (value) => {
    setState((prevState) => {
      const updatedLinks = [...prevState[group]];
      updatedLinks[index] = { ...updatedLinks[index], [key]: value };
      const newErrors = { reward: [] };
      // //console.log(updatedLinks, "this is updatedform data", key, "this is name of the filed")
      // Validate fields in the updatedLinks
      updatedLinks.forEach((field, i) => {
        // Ensure that newErrors.reward[i] exists
        if (!newErrors.reward[i]) {
          newErrors.reward[i] = {}; // Initialize as an empty object
        }

        if (!field[key]) {
          newErrors.reward[i][key] = `${key}  ${t("isrequire")}`;
        }
      });

      // Update errors and return updated state
      setErrors((prevErrors) => ({
        ...prevErrors,
        reward: [
          ...newErrors.reward, // Use newErrors.reward to override previous errors
        ],
      }));

      return { ...prevState, [group]: updatedLinks };
    });
  };

  const toggleMapModal = () => {
    setIsMapModalVisible(!isMapModalVisible);
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

  /* Old states */
  const handleChangeUpperRadio = (event) => {
    setState((prew) => {
      return {
        ...prew,
        UpperRadio: event.target.value,
      };
    });
    // setSelectedUpperRadio(event.target.value);
    // //// //console.log   .log(selectedUpperRadio);
  };

  const handleChangeBottomRadio = (event) => {
    setState((prew) => {
      return {
        ...prew,
        selectedBottomRadio: event.target.value,
      };
    });
    // setSelectedBottomRadio(event.target.value);
  };

  useEffect(() => {
    document.title = t("rewtitle");
  }, []);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
      .then((response) => response.json())
      .then((data) => {
        // Map the data to extract name and code
        const countryList = data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));

        // Sort the countryList alphabetically by name (A-Z)
        const sortedCountryList = [...countryList].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        // Update the state with the sorted list
        setPhoneMasks(sortedCountryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    ////// //console.log   .clear();
    //// //console.log   .table(state);
  }, [state]);
  const handleDelete = (indexToDelete) => {
    // Create a new array excluding the location at the specified index
    const updatedLocations = state.modaldata.filter(
      (_, index) => index !== indexToDelete
    );
    // Update the state with the new array
    setState((prevState) => ({
      ...prevState,
      modaldata: updatedLocations,
    }));
  };

  const handleisAnalaytics = (value) => {
    // //console.log(value)
    setState((prevState) => ({
      ...prevState,
      ["isAnalytics"]: value,
    }));
  };
  // //console.log(state?.reward,"how are you")
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
            {/* Settings Heading */}
            <div className="flex gap-3">
              <Heading_Description heading={t("setting")} />

              <Tippy content={"c"}>
                <button>
                  <IoInformationCircleOutline className="text-[20px]" />
                </button>
              </Tippy>
            </div>

            <Container border={"both"}>
              <Heading_Description heading={t("rewhead")} />
              <div>
                <BpRadio1
                  label={t("brlabel")}
                  name="radioGroup1"
                  props={{
                    value: "spend",
                    checked: state?.UpperRadio === "spend",
                    onChange: handleChangeUpperRadio,
                  }}
                />
                <BpRadio1
                  label={t("visitleb")}
                  name="radioGroup1"
                  props={{
                    value: "visit",
                    checked: state?.UpperRadio === "visit",
                    onChange: handleChangeUpperRadio,
                  }}
                />
                <BpRadio1
                  label={t("plabel")}
                  name="radioGroup1"
                  props={{
                    value: "points",
                    checked: state.UpperRadio === "points",
                    onChange: handleChangeUpperRadio,
                  }}
                />
              </div>
              <div
                className={state.selectedUpperRadio === "points" ? `` : `mt-9`}
              >
                {state.UpperRadio === "spend" ? (
                  <div>
                    {/* Spend */}
                    <Heading_Description
                      heading={t("theading")}
                      description={t("tdesc")}
                    />
                    <div className="flex items-center">
                      <span className="w-full">
                        <InputBox
                          textType={"number"}
                          textPosition={"left"}
                          text={"€"}
                          fieldName={"moneySpent"}
                          value={state?.spend?.moneySpent}
                          onChange={(key, value) => {
                            const validatedValue =
                              value === "" ? 0 : Math.max(0, value);
                            handlerewardchange("spend", key, validatedValue);
                          }}
                        />
                      </span>
                      <span className="mx-3">=</span>
                      <span className="w-full">
                        <InputBox
                          textType={"number"}
                          textPosition={"right"}
                          text={"Points"}
                          fieldName={"pointsGained"}
                          value={state?.spend?.pointsGained}
                          onChange={(key, value) => {
                            const validatedValue =
                              value === "" ? 0 : Math.max(0, value);
                            handlerewardchange("spend", key, validatedValue);
                          }}
                        />
                      </span>
                    </div>
                  </div>
                ) : state.UpperRadio === "visit" ? (
                  <div>
                    {/* Visit */}
                    <Heading_Description
                      heading={t("visithead")}
                      description={t("visitdesc")}
                    />
                    <div className="flex items-center">
                      <span className="w-full">
                        <InputBox
                          placeHolder={"1"}
                          disabled
                          value={1}
                          textPosition={"right"}
                          text={"Visit"}
                        />
                      </span>
                      <span className="mx-3">=</span>
                      <span className="w-full">
                        <InputBox
                          textPosition={"right"}
                          text={"Points"}
                          textType={"number"}
                          value={state?.visit?.pointsPerVisit}
                          onChange={(key, value) => {
                            const validatedValue =
                              value === "" ? 0 : Math.max(0, value);
                            handlerewardchange("visit", key, validatedValue);
                          }}
                          fieldName={"pointsPerVisit"}
                        />
                      </span>
                    </div>
                    <div className="my-2"></div>
                    <label htmlFor="checkbox">
                      <input
                        type="checkbox"
                        id="checkbox"
                        checked={
                          state?.visit?.givePointAfterEveryVisit || false
                        }
                        onChange={(e) => {
                          const newValue = e.target.checked;
                          // //console.log("this is visit value", newValue);
                          handlerewardchange(
                            "spend",
                            "givePointAfterEveryVisit",
                            newValue
                          );
                        }}
                      />
                      <span className="ml-2">{t("givepoint")}</span>
                    </label>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Container>

            <Container border={"bottom"}>
              <Heading_Description
                heading={t("hhead")}
                description={t("hdesc")}
              />
              {state?.reward?.map((value, index) => {
                return (
                  <Container key={index} padding={"low"} border={"bottom"}>
                    <div className="flex items-end gap-2">
                      <div className="w-full">
                        <Heading_Description
                          heading={`${index + 1}. ${t("rewname")}`}
                        />
                        <input
                          type="text"
                          className={`border py-2 px-3 w-full focus:outline-none ${
                            errors?.reward?.[index]?.levelName
                              ? "border-red-500"
                              : "border-[#D5D5DD]"
                          }`}
                          value={state.reward[index].levelName}
                          onChange={(e) =>
                            handleRewardChange(
                              index,
                              "levelName",
                              e.target.value
                            )
                          }
                        />
                        {errors?.reward?.[index]?.levelName && (
                          <span className="text-red-500">
                            {errors.reward[index].levelName}
                          </span>
                        )}
                      </div>
                      {index != 0 && (
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

                            // // Optional: Clear errors for the deleted reward
                            // setErrors((prevErrors) => {
                            //   const updatedErrors = { ...prevErrors };
                            //   delete updatedErrors?.reward[index]; // Remove errors for the deleted field
                            //   return updatedErrors;
                            // });
                          }}
                        />
                      )}
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <div className="flex items-end gap-2">
                        <div className="w-full">
                          <InputBox
                            heading={t("pointhead")}
                            textType={"number"}
                            textPosition={"right"}
                            text={"Points"}
                            name={`pointsEarned`}
                            value={state.reward[index].pointsEarned}
                            onChange={handleNestedFieldName(
                              "reward",
                              "pointsEarned",
                              index
                            )}
                          />
                          {errors?.reward?.[index]?.pointsEarned && (
                            <span className="text-red-500">
                              {errors.reward[index].pointsEarned}
                            </span>
                          )}
                        </div>
                        <p className="text-2xl mb-[6px]">=</p>
                      </div>
                      <div>
                        <Heading_Description heading={t("rewtype")} />
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
                          heading={t("rewvalue")}
                          textPosition={"left"}
                          textType={"number"}
                          text={
                            value.pointsType === "Order (€ OFF)"
                              ? `€`
                              : value?.pointsType === "Order (% OFF)"
                              ? `%`
                              : ""
                          }
                          name={`reward[${index}].pointsValue`}
                          value={state?.reward[index]?.pointsValue}
                          onChange={handleNestedFieldName(
                            "reward",
                            "pointsValue",
                            index
                          )}
                        />
                        {errors?.reward?.[index]?.pointsValue && (
                          <span className="text-red-500">
                            {errors.reward[index].pointsValue}
                          </span>
                        )}
                      </div>
                    </div>
                  </Container>
                );
              })}

              <br />
              <br />
              <span onClick={addReward}>
                <BlackButton btnText={t("addrew")} />
              </span>
            </Container>

            <Container>
              {/* <div className="flex gap-3">
                <Heading_Description heading="Settings" />

                <Tippy content={"Card setting and card installation form"}>
                  <button>
                    <IoInformationCircleOutline className="text-[20px]" />
                  </button>
                </Tippy>
              </div> */}
              {/* <div>
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
                    <div className="flex gap-3">
                      <Heading_Description heading="Term" />

                      <Tippy
                        content={"Card expiration date terms"}
                      >
                        <button>
                          <IoInformationCircleOutline className="text-[20px]" />
                        </button>
                      </Tippy>

                    </div>
                    <SimplifiedDropDown
                      value={state.cardExpirationFixedTermAfterIssuingDays}
                      onChange={handleStateChange}
                      name={"cardExpirationFixedTermAfterIssuingDays"}
                      list={daysList}
                    />
                  </div>
                  <div className="mt-6">
                    <Heading_Description heading="" />
                    <SimplifiedDropDown
                      value={state.cardExpirationFixedTermAfterIssuingYears}
                      onChange={handleStateChange}
                      name={"cardExpirationFixedTermAfterIssuingYears"}
                      list={timeList}
                    />
                  </div>
                </div>
              ) : state.selectedUpperRadio === "fixed_term" ? (
                <div className=" mt-7">
                  <div className="flex gap-3">
                    <Heading_Description heading="Term" />

                    <Tippy
                      content={"Card expiration date terms"}
                    >
                      <button>
                        <IoInformationCircleOutline className="text-[20px]" />
                      </button>
                    </Tippy>

                  </div>
                  <input
                    placeholder="02-08-2024"
                    type="text"
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
              ) : null} */}
            </Container>

            {/* Card expiration date */}
            {/* <Container border={"bottom"}>
              <div className="flex gap-3">
                <Heading_Description heading="Stamp Life" />

                <Tippy
                  content={"Stamp expiration date"}
                >
                  <button>
                    <IoInformationCircleOutline className="text-[20px]" />
                  </button>
                </Tippy>

              </div>
              <div>
                <BpRadio1
                  label="Unlimited"
                  name="radioGroup2"
                  props={{
                    value: "unlimited",
                    checked: state.selectedBottomRadio === "unlimited",
                    onChange: handleChangeBottomRadio,
                  }}
                />
                <BpRadio1
                  label="Fixed term after bonuses earned"
                  name="radioGroup2"
                  props={{
                    value: "fixed_term",
                    checked: state.selectedBottomRadio === "fixed_term",
                    onChange: handleChangeBottomRadio,
                  }}
                />
              </div>

              {state.selectedBottomRadio === "fixed_term" ? (
                <div className="grid md:grid-cols-2 gap-5 mt-7">
                  <div>
                    <Heading_Description heading="Term" />
                    <SimplifiedDropDown
                      value={state.lifeTimePointsFixedTermAfterBonusEarnedDays}
                      onChange={handleStateChange}
                      name={"lifeTimePointsFixedTermAfterBonusEarnedDays"}
                      list={daysList}
                    />
                  </div>
                  <div className="mt-6">
                    <Heading_Description heading="" />
                    <SimplifiedDropDown
                      value={state.lifeTimePointsFixedTermAfterBonusEarnedYears}
                      onChange={handleStateChange}
                      name={"lifeTimePointsFixedTermAfterBonusEarnedYears"}
                      list={timeList}
                    />
                  </div>
                </div>
              ) : null}
            </Container> */}

            {/* Locations */}
            <Container border={"bottom"}>
              <div className="flex gap-3">
                <Heading_Description heading={t("locations")} />

                <Tippy content={t("loclincard")}>
                  <button>
                    <IoInformationCircleOutline className="text-[20px]" />
                  </button>
                </Tippy>
              </div>
              <div className="p-3 border border-gray-300 rounded">
                <button>
                  {Array.isArray(state?.modaldata) &&
                  state?.modaldata.length > 0 ? (
                    state.modaldata.map((loc, index) => (
                      <span key={index} className="my-2 inline-block">
                        {loc?.locationname ? loc?.locationname : "unKnown"}
                        <RiCloseLine
                          className="mx-4 m-2 bg-gray-500 cursor-pointer  text-[20px] rounded text-black-500 inline-block"
                          onClick={() => handleDelete(index)}
                          // title="Delete"
                        />
                      </span>
                    ))
                  ) : (
                    <span className="my-2 inline-block">
                      {t("notingselect")}
                    </span>
                  )}
                </button>

                <button className="inline-block">
                  <RiCloseLine
                    className=" mx-2 bg-gray-300 cursor-pointer  text-[30px] rounded text-black-500 inline-block"
                    onClick={handlePopupClose}
                    // title="Delete"
                  />
                </button>
                <button className="inline-block">
                  <PiPlus
                    className="  bg-gray-300 cursor-pointer  text-[30px] rounded text-black-500 inline-block"
                    onClick={handlePopupOpen}
                    // title="Delete"
                  />
                </button>

                <Popover
                  id={popupId}
                  open={isPopupOpen}
                  anchorEl={popupAnchor}
                  onClose={handlePopupClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Box sx={{ p: 2, width: 400 }}>
                    <Box sx={{ gap: 1, mb: 2, mr: 2 }}>
                      {locations
                        ?.filter(
                          (loc) =>
                            !state.modaldata.some(
                              (l) =>
                                l.locationname === loc.location?.locationname
                            )
                        )
                        .map((item) => {
                          return (
                            <Chip
                              key={item.location?.locationname} // Add a unique key for better React rendering
                              sx={{ mx: 1, my: 1 }}
                              label={item?.location?.locationname} // The name displayed on the chip
                              onClick={() => {
                                // Add the clicked location to modaldata in the state
                                setState({
                                  ...state,
                                  modaldata: [
                                    ...state.modaldata,
                                    item?.location,
                                  ],
                                });
                              }}
                              deleteIcon={<PiPlus className="text-white" />} // Custom delete icon
                            />
                          );
                        })}
                    </Box>

                    {/* Add Button */}
                    <Button
                      variant="outlined"
                      fullWidth
                      style={{
                        borderColor: "grey",
                        color: "white",
                        backgroundColor: "black",
                      }}
                      onClick={() => {
                        toggleMapModal();
                        handlePopupClose();
                      }}
                    >
                      {t("add")}
                    </Button>
                  </Box>
                </Popover>
                {isMapModalVisible && (
                  <MapModal
                    onClose={toggleMapModal}
                    state={state}
                    setState={setState}
                  />
                )}
              </div>
            </Container>

            {/* Language */}
            {/* <Container border={"bottom"}>
              <div className="flex gap-3">
                <Heading_Description heading="Language" />

                <Tippy
                  content={
                    "Language in which the card information will be displayed "
                  }
                >
                  <button>
                    <IoInformationCircleOutline className="text-[20px]" />
                  </button>
                </Tippy>
              </div>
              <SimplifiedDropDown
                value={state.language}
                onChange={handleStateChange}
                name={"language"}
                list={languagesList}
              />
            </Container> */}

            {/* Date format */}
            {/* <Container border={"bottom"}>
              <Heading_Description heading="Date format" />
              <SimplifiedDropDown
                value={state.dateFormat}
                onChange={handleStateChange}
                name={"dateFormat"}
                list={dateFormats}
              />
            </Container> */}

            {/* Thousand and Decimal Separator */}
            {/* <Container border={"bottom"}>
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
                    list={seperators}
                    name={"decimalSeparator"}
                  />
                </div>
              </div>
            </Container> */}

            {/* Scanner Switch */}
            <Container border={"bottom"}>
              <Heading_Description heading={t("prcamt")} />
              <BoxWithSwitch1
                isOn={state.purchaseAmountIsRequiredSwitch}
                setIsOn={handleChange}
                name={"purchaseAmountIsRequiredSwitch"}
                description={t("reqam")}
              />
            </Container>

            {/* Card issuing form */}
            <Container border={"bottom"}>
              <div className="flex gap-3">
                <Heading_Description heading={t("cardissue")} />

                <Tippy content={t("filcont")}>
                  <button>
                    <IoInformationCircleOutline className="text-[20px]" />
                  </button>
                </Tippy>
              </div>
              <div className="overflow-auto">
                <div className="min-w-[700px] grid grid-cols-11 gap-5">
                  <Heading_Description
                    classname={"col-span-4"}
                    description={t("fieldtype")}
                  />
                  <Heading_Description
                    classname={"col-span-4"}
                    description={t("fieldname")}
                  />
                  <Heading_Description
                    classname={"col-span-1"}
                    description={t("require")}
                  />
                  <Heading_Description
                    classname={"col-span-1"}
                    description={t("unique")}
                  />
                  <div className="col-span-1"></div>
                  {cardIssuingError ? (
                    <Box className="p-5 rounded-lg bg-[#f19319] col-span-11 ">
                      <Typography className="text-white">
                        {t("uniquefield")}
                      </Typography>
                    </Box>
                  ) : (
                    ""
                  )}
                  {duplicationError ? (
                    <Box className="p-5 rounded-lg bg-[#f19319] col-span-11 ">
                      <Typography className="text-white">
                        {t("nodupval")}
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
                          className={`border py-2 px-3 w-full focus:outline-none ${
                            errors?.cardIssuingForm?.[index]?.fieldName
                              ? "border-red-500"
                              : "border-[#D5D5DD]"
                          }`}
                          value={state.cardIssuingForm[index].fieldName}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              "fieldName",
                              e.target.value
                            )
                          }
                        />
                        {errors?.cardIssuingForm?.[index]?.fieldName && (
                          <span className="text-red-500">
                            {errors.cardIssuingForm[index].fieldName}
                          </span>
                        )}
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
                      {t("addfield")}
                    </button>
                  )}
                </span>
              </div>
            </Container>

            {/* UTM */}
            {/* <Container border={"bottom"}>
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
            </Container> */}

            {/* Phone Mask */}
            {/* <Container border={"bottom"}>
              <div className="flex gap-3">
                <Heading_Description heading="Phone Mask" />

                <Tippy
                  content={"Select the phone Mask depending on the country of use of the card. For card installation form"}
                >
                  <button>
                    <IoInformationCircleOutline className="text-[20px]" />
                  </button>
                </Tippy>

              </div>                  <SimplifiedDropDown
                name={"phoneMask"}
                value={state.phoneMask}
                onChange={handleStateChange}
                list={phoneMasks}
              />
              <div className="mt-9">
                <div className="mb-1 flex justify-between">
                  <div className="flex gap-3">
                    <Heading_Description heading="Privacy Policy" />

                    <Tippy
                      content={"You can specify the text of the privacy policy ,as well as enable/disabled the display of text "}
                    >
                      <button>
                        <IoInformationCircleOutline className="text-[20px]" />
                      </button>
                    </Tippy>

                  </div>                      <IosSwitch
                    isOn={state.privacyPolicySwitch}
                    setIsOn={(value) => { handleStateChange("privacyPolicySwitch", value) }}

                    name={"privacyPolicySwitch"}
                  />
                </div>
                <textarea
                  type="text"
                  disabled={!state.privacyPolicySwitch}
                  placeHolder={"Privacy Policy"}
                  className={`border py-2 h-40 px-3 w-full focus:outline-none ${errors["privacyPolicyText"] ? "border-red-500" : "border-[#D5D5DD]"
                    }`}
                  value={state.privacyPolicyText}
                  onChange={(e) =>
                    handleStateChange("privacyPolicyText", e.target.value)
                  }
                />
                {errors["privacyPolicyText"] && <span className="text-red-500">{errors["privacyPolicyText"]}</span>}
                <br />
                <BoxWithSwitch1
                  isOn={state.concentToProcessingOfPrivateDateSwitch}
                  setIsOn={(value) => { handleStateChange("concentToProcessingOfPrivateDateSwitch", value) }}

                  name={"concentToProcessingOfPrivateDateSwitch"}
                  description={"Consent to the processing of personal data"}
                />
              </div>
            </Container> */}

            {/*/!* Google wallet installation button *!/*/}
            {/*<Container border={"bottom"}>*/}
            {/*  <Heading_Description heading="Google wallet installation button" />*/}
            {/*  <BoxWithSwitch1*/}
            {/*    isOn={state.googlewallet}*/}
            {/*    setIsOn={(value) => {*/}
            {/*      handleStateChange("googlewallet", value);*/}
            {/*    }}*/}
            {/*    name={"googlewallet"}*/}
            {/*    description={*/}
            {/*      "Display the Google Wallet button in the card install form"*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Container>*/}

            {/* Limit the number of cards issued */}
            {/* <Container border={"bottom"}>
              <Heading_Description
                heading="Limit the number of cards issued"
                description={"0 - Unlimited"}
              />
              <input
                type="text"
                className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                value={state.cardIssuedLimit}
                onChange={(e) =>
                  handleStateChange("cardIssuedLimit", e.target.value)
                }
              />
            </Container> */}

            {/* Number of stamps when issuing a card */}

            {/* Track visit button */}
            <Container border={"bottom"}>
              <Heading_Description heading={t("rtmhead")} />
              <BoxWithSwitch1
                isOn={state.trackVisitWhenRedeemCard}
                setIsOn={(value) => {
                  handleStateChange("trackVisitWhenRedeemCard", value);
                }}
                name={"trackVisitWhenRedeemCard"}
                description={t("rtmhead")}
              />
            </Container>

            {/* Earn points when redeem button */}
            <Container border={"bottom"}>
              <Heading_Description heading={t("earnrew")} />
              <BoxWithSwitch1
                setIsOn={(value) => {
                  handleStateChange("earnPointsWhenRedeemReward", value);
                }}
                name={"earnPointsWhenRedeemReward"}
                isOn={state.earnPointsWhenRedeemReward}
                description={t("earnrew")}
              />
            </Container>

            {/* <Container border={"bottom"}>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Heading_Description heading="Analytics" />

                  <Tippy
                    content={"This is where you can place analytics scripts, such as Google Tag Mnager. These will be added to the card installation pages"}
                  >
                    <button>
                      <IoInformationCircleOutline className="text-[20px]" />
                    </button>
                  </Tippy>

                </div>

                <IosSwitch
                  isOn={state.isAnalytics}
                  setIsOn={handleisAnalaytics}
                // name={"isAnalytics"}
                />
              </div>
              <textarea
                disabled={!state.isAnalytics}
                type="text"
                className={`border py-2 h-40 px-3 w-full focus:outline-none ${errors["analytics"] ? "border-red-500" : "border-[#D5D5DD]"
                  }`}
                value={state.analytics}
                onChange={(e) => handleStateChange("analytics", e.target.value)}
              />
              {errors["analytics"] && <span className="text-red-500">{errors["analytics"]}</span>}
            </Container> */}
            <br />
            <BlackButton
              btnText={t("continue")}
              handelCLick={() => {
                handleSelectSetting("Reward");
              }}
            />
          </div>

          {/* <PhoneEmulator>
            <div className='w-full shadow bg-white rounded-md'>
              <div className='flex justify-between items-center px-2 pt-1 mb-1'>
                <p className='text-[14.6px] font-semibold py-3'>Stamp card № 2</p>
                {selectedUpperRadio !== "unlimited" && (
                  <div>
                    <p className="text-[10px] text-right">Expiration</p>
                    <p className="text-[14px]">00.00.0000</p>
                  </div>
                )}
              </div>
              <div className="bg-[#F6F6F6] p-1 flex justify-center mb-3">
                <div className=" flex gap-2 justify-evenly flex-wrap">
                  <div className="border border-[#595163] w-max p-2 rounded-full">
                    <FaStar />
                  </div>
                  <div className="border border-[#595163] w-max p-2 rounded-full">
                    <FaStar />
                  </div>
                  <div className="border border-[#595163] w-max p-2 rounded-full">
                    <FaStar />
                  </div>
                  <div className="border border-[#595163] w-max p-2 rounded-full">
                    <FaStar />
                  </div>
                  <div className="border border-[#595163] w-max p-2 rounded-full">
                    <FaStar />
                  </div>
                  <div className="border border-[#595163] w-max p-2 rounded-full">
                    <FaStar />
                  </div>
                  <div className="border border-[#595163] w-max p-2 rounded-full">
                    <FaStar />
                  </div>
                  <div className="border border-[#595163] w-max p-2 rounded-full">
                    <FaStar />
                  </div>
                  <div className="border border-[#595163] w-max p-2 rounded-full">
                    <FaStar />
                  </div>
                  <div className="border border-[#595163] w-max p-2 rounded-full">
                    <FaStar />
                  </div>
                </div>
              </div>
              <div className="flex justify-between px-2">
                <div>
                  <p className="text-[9.6px] font-bold truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[108px]">
                    Stamps until the rewa...
                  </p>
                  <p className="text-[18.2px]">10 stamps</p>
                </div>
                <div>
                  <p className="text-[9.6px] font-bold truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[108px]">
                    Available Rewards
                  </p>
                  <p className="text-[18.2px] float-right">2 rewards</p>
                </div>
              </div>
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

export default RewardSettings;
