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
} from "../../Components/utils";
import SimplifiedDropDown from "../../Components/newComponent/SimplifiedDropDown";
import DatePicker from "react-datepicker";
import { Box, Typography } from "@mui/material";

import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { PiPlus } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";
import { serverUrl } from "../../config";
import { Button, Chip, Popover } from "@mui/material";
import { getLocations } from "../../api/location";
import { useSelector } from "react-redux";
import { IoInformationCircleOutline } from "react-icons/io5";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Basic styling
import "tippy.js/themes/material.css"; // Example theme
import { selectBusinesses } from "../../redux/businessSlice";
function StampsSettingsRebuild({
  handleSelectSetting,
  state,
  setState,
  setErrors,
  errors,
  t,
}) {
  const business = useSelector(selectBusinesses);
  const [phoneMask, setPhoneMask] = useState([]);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [copy, setCopy] = useState(false);

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
          //console.log(res.data.locations, "this is response data");
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

  const handleStateChange = (key, value) => {
    // //console.log(key, value)

    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
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

  const handleCopyClick = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopy(true);
        toast.success(t("textcopied"));

        setTimeout(() => {
          setCopy(false);
        }, 2000);
      })
      .catch((err) => {});
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
      const newErrors = { cardIssuingForm: [] };
      updatedForm.forEach((field, i) => {
        if (!field.fieldName || field.fieldName.trim() === "") {
          newErrors.cardIssuingForm[i] = newErrors.cardIssuingForm[i] || {};
          newErrors.cardIssuingForm[i].fieldName = `${field.fieldType} ${t(
            "isrequire"
          )}`;
        } else {
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
    // setSelectedUpperRadio(event.target.value);
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
    document.title = t("title");
    ////// //console.log   .clear();
    //// //console.log   .table(state);
  }, [state]);

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
        setPhoneMask(sortedCountryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      purchaseAmountIsRequiredSwitch: value,
    }));
  };

  // //console.log(state.isAnalytics, "this is code")

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
            <div className=" text-[#333333]">
              <div className=" ">
                {/*<div className="flex gap-3">*/}
                {/*  <Heading_Description heading="Settings" />*/}

                {/*  <Tippy content={"Card setting and card installation form"}>*/}
                {/*    <button>*/}
                {/*      <IoInformationCircleOutline className="text-[20px]" />*/}
                {/*    </button>*/}
                {/*  </Tippy>*/}
                {/*</div>*/}
                {/* <Container border={"both"}>
                  <div className="flex gap-3">
                    <Heading_Description heading="Card expiration date" />

                    <Tippy
                      content={"Select the expiry date of the card"}
                    >
                      <button>
                        <IoInformationCircleOutline className="text-[20px]" />
                      </button>
                    </Tippy>

                  </div>
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
                    <div className=" mt-7 w-full">
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
                      <DatePicker
                        selected={state?.cardExpirationFixedTermDate}
                        onChange={(date) =>
                          handleStateChange("cardExpirationFixedTermDate", date)
                        }
                        placeholderText="choose some date"
                        className="sm:w-[600px] w-auto rounded-md border-0 p-4 outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#DFDFE5] sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  ) : null}
                </Container> */}

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
                      label="Fixed term after stamps earned"
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
                </Container> */}

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
                            {loc?.locationname ? loc?.locationname : t("noloc")}
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
                                    l.locationname ===
                                    loc.location?.locationname
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
                    <Heading_Description heading="Language " />

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
                        name={"decimalSeparator"}
                        list={seperators}
                      />
                    </div>
                  </div>
                </Container> */}

                {/* Scanner Switch */}
                <Container border={"bottom"}>
                  <Heading_Description heading={t("perchheading")} />
                  <BoxWithSwitch1
                    isOn={state.purchaseAmountIsRequiredSwitch}
                    setIsOn={handleChange}
                    name="purchaseAmountIsRequiredSwitch"
                    description={t("purchdesc")}
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
                              className={`border py-2 px-3 w-full focus:outline-none ${"border-[#D5D5DD]"}`}
                              value={state.cardIssuingForm[index].fieldName}
                              onChange={(e) =>
                                handleFieldChange(
                                  index,
                                  "fieldName",
                                  e.target.value
                                )
                              }
                            />
                            {/* {errors?.cardIssuingForm?.[index]?.fieldName && (
                              <span className="text-red-500">
                                {errors.cardIssuingForm[index].fieldName}
                              </span>
                            )} */}
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
                        <BlackButton btnText={t("addfield")} />
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

                  </div>

                  <SimplifiedDropDown
                    name={"phoneMask"}
                    value={state.phoneMask}
                    onChange={handleStateChange}
                    list={phoneMask}
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

                      </div>

                      <IosSwitch
                        isOn={state.privacyPolicySwitch}
                        setIsOn={(value) => { handleStateChange("privacyPolicySwitch", value) }}
                        name={"privacyPolicySwitch"}
                      />
                    </div>
                    <textarea
                      type="text"
                      disabled={!state.privacyPolicySwitch}
                      placeHolder={"Privacy Policy"}
                      className={`border py-2 h-40 px-3 w-full focus:outline-none ${"border-[#D5D5DD]"
                        }`}
                      value={state.privacyPolicyText}
                      onChange={(e) =>
                        handleStateChange("privacyPolicyText", e.target.value)
                      }
                    />

                    <br />
                    <BoxWithSwitch1
                      isOn={state.concentToProcessingOfPrivateDateSwitch}
                      setIsOn={(value) => { handleStateChange("concentToProcessingOfPrivateDateSwitch", value) }}
                      name={"concentToProcessingOfPrivateDateSwitch"}
                      description={"Consent to the processing of personal data"}
                    />
                  </div>
                </Container> */}

                {/* Google wallet installation button */}
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
                <Container border={"bottom"}>
                  <Heading_Description
                    heading={t("limhead")}
                    description={t("unlimdesc")}
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
                  <div className="flex gap-3">
                    <Heading_Description heading={t("numhead")} />

                    <Tippy content={t("howcreditcard")}>
                      <button>
                        <IoInformationCircleOutline className="text-[20px]" />
                      </button>
                    </Tippy>
                  </div>

                  <input
                    type="Number"
                    className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                    value={state.numberOfStampsWhenIssuingCard}
                    max={state?.selectedNumber}
                    onChange={(e) => {
                      const value = Math.min(
                        Number(e.target.value),
                        state?.selectedNumber
                      ); // Restrict input to maxStamps
                      handleStateChange("numberOfStampsWhenIssuingCard", value);
                    }}
                  />
                </Container>

                {/* Analytics */}
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
                    className={`border py-2 h-40 px-3 w-full focus:outline-none ${"border-[#D5D5DD]"
                      }`}
                    value={state.analytics}
                    onChange={(e) => handleStateChange("analytics", e.target.value)}
                  />
               
                </Container> */}
                <br />
                <BlackButton
                  handelCLick={handleSelectSetting}
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

export default StampsSettingsRebuild;
