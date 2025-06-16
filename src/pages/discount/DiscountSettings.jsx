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
import SimplifiedDropDown from "../../Components/newComponent/SimplifiedDropDown";
import {
  daysList,
  timeList,
  seperators,
  languagesList,
  dateFormats,
  fieldTypes,
} from "../../Components/utils";
import { Box, Typography } from "@mui/material";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdCopy } from "react-icons/io";
import downloadFile from "../../Components/downloadFile";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { PiPlus } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";

import { Button, Chip, Popover } from "@mui/material";
import { getLocations } from "../../api/location";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Basic styling
import "tippy.js/themes/material.css"; // Example theme
import { IoInformationCircleOutline } from "react-icons/io5";
import { selectBusinesses } from "../../redux/businessSlice";
import { useSelector } from "react-redux";
function DiscountSettings({ handleSelectSetting, state, setState, t }) {
  const [selectedBottomRadio, setSelectedBottomRadio] = useState("unlimited");
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
          // //console.log(res.data.locations, "this is response data")
          setLocations(res.data.locations);
        }
      } catch (error) {
        // //console.log("these are error for card", error)
      }
    };
    getdata();
  }, [business]);

  //console.log("loaction data", locations);

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

    //console.log(phoneField, "this is data")
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

  const addField = () => {
    setState((prev) => ({
      ...prev,
      cardIssuingForm: [
        ...prev.cardIssuingForm,
        { fieldType: "", fieldName: "", required: false, unique: false },
      ],
    }));
  };

  const addTier = () => {
    setState((prev) => {
      // Find the maximum values for "spendToAchieve" and "percentage"
      const maxSpendToAchieve = Math.max(
        ...prev.tiers.map((tier) => Number(tier.spendToAchieve) || 0)
      );
      const maxPercentage = Math.max(
        ...prev.tiers.map((tier) => Number(tier.percentage) || 0)
      );

      return {
        ...prev,
        tiers: [
          ...prev.tiers,
          {
            tierName: "",
            spendToAchieve: maxSpendToAchieve + 1,
            percentage: maxPercentage + 1,
          },
        ],
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
  const handleTierChange = (index, name, value) => {
    setState((prevState) => {
      const updatedForm = [...prevState.tiers];

      // Ensure value is a number for comparison if the field is "percentage" or "spendToAchieve"
      const newValue =
        name === "percentage" || name === "spendToAchieve"
          ? Number(value)
          : value;

      updatedForm[index] = {
        ...updatedForm[index],
        [name]: newValue,
      };

      return {
        ...prevState,
        tiers: updatedForm,
      };
    });
  };

  const handleBlur = (index, name, value) => {
    const numericValue = Number(value);

    // Check if the value already exists in another tier
    const isDuplicate = state.tiers.some(
      (tier, i) => i !== index && tier[name] === numericValue
    );

    if (isDuplicate) {
      alert(`${name} ${t("valunq")}`);
      setState((prevState) => {
        const updatedForm = [...prevState.tiers];

        // Find the maximum value for the field in the array
        const maxValue = Math.max(
          ...prevState.tiers.map((tier) => Number(tier[name]) || 0)
        );

        // Set the value to maxValue + 1
        updatedForm[index] = {
          ...updatedForm[index],
          [name]: maxValue + 1,
        };

        return {
          ...prevState,
          tiers: updatedForm,
        };
      });
    }
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
    setSelectedBottomRadio(event.target.value);
  };

  useEffect(() => {
    document.title = t("desctitle");
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
  const handleChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      purchaseAmountIsRequiredSwitch: value,
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
                {/* Settings Heading */}
                <div className="flex gap-3">
                  <Heading_Description heading={t("settings")} />

                  <Tippy content={t("cardsetting")}>
                    <button>
                      <IoInformationCircleOutline className="text-[20px]" />
                    </button>
                  </Tippy>
                </div>

                {/* Locations */}
                <Container border={"bottom"}>
                  <div className="flex gap-3">
                    <Heading_Description heading={t("locations")} />

                    <Tippy content={t("loclincard")}>
                      <button>
                        <IoInformationCircleOutline className="text-[20px]" />
                      </button>
                    </Tippy>
                  </div>{" "}
                  <div className="p-3 border border-gray-300 rounded">
                    <button>
                      {Array.isArray(state?.modaldata) &&
                      state?.modaldata.length > 0 ? (
                        state.modaldata.map((loc, index) => (
                          <span key={index} className="my-2 inline-block">
                            {loc?.locationname ? loc?.locationname : "unknown"}
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
                <Container border={"bottom"}>
                  <Heading_Description heading={t("cardh")} />
                  <div className="grid grid-cols-12 gap-5 mt-7">
                    <span className="col-span-5">
                      <Heading_Description description={t("tiername")} />
                    </span>
                    <span className="col-span-3">
                      <Heading_Description description={t("spendachieve")} />
                    </span>
                    <span className="col-span-3">
                      <Heading_Description description={t("percent")} />
                    </span>
                    <span className="col-span-1"></span>
                  </div>

                  {state.tiers.map((tier, index) => (
                    <div className="grid grid-cols-12 gap-5 mt-2" key={index}>
                      <span className="col-span-5">
                        <input
                          type="text"
                          placeholder={t("tiername")}
                          className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                          value={state.tiers[index].tierName}
                          onChange={(e) =>
                            handleTierChange(index, "tierName", e.target.value)
                          }
                        />
                      </span>
                      <span className="col-span-3">
                        <input
                          type="number"
                          disabled={index === 0}
                          placeholder="Spend Achieve"
                          className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                          value={state.tiers[index].spendToAchieve}
                          onChange={(e) =>
                            handleTierChange(
                              index,
                              "spendToAchieve",
                              Number(e.target.value)
                            )
                          }
                          min={0}
                          onBlur={(e) =>
                            handleBlur(index, "spendToAchieve", e.target.value)
                          }
                        />
                      </span>
                      <span className="col-span-3">
                        <input
                          type="number"
                          placeholder="Percentage"
                          className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                          value={state.tiers[index].percentage}
                          min={0}
                          onChange={(e) =>
                            handleTierChange(
                              index,
                              "percentage",
                              Number(e.target.value)
                            )
                          }
                          onBlur={(e) =>
                            handleBlur(index, "percentage", e.target.value)
                          }
                        />
                      </span>
                      <span className="col-span-1">
                        <MdDelete
                          className={
                            index === 0
                              ? "text-2xl mt-2"
                              : "text-2xl cursor-pointer mt-2"
                          }
                          onClick={
                            index === 0
                              ? null
                              : () => {
                                  const newFields = state.tiers.filter(
                                    (_, i) => i !== index
                                  );
                                  setState((prev) => ({
                                    ...prev,
                                    tiers: newFields,
                                  }));
                                }
                          }
                        />
                      </span>
                    </div>
                  ))}

                  <div className="mt-3" onClick={addTier}>
                    <BlackButton btnText={t("addtier")} />
                  </div>
                </Container>

                {/* Scanner Switch */}
                {/* <Container border={"bottom"}>
                  <Heading_Description heading="Purchase amount when charging" />
                  <BoxWithSwitch1
                    isOn={state.purchaseAmountIsRequiredSwitch}
                    setIsOn={handleChange}
                    name="purchaseAmountIsRequiredSwitch"
                    description={"Purchase amount is required in Scanner App"}
                  />
                </Container> */}

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

                <Container border={"bottom"}>
                  <Heading_Description heading={t("ghead")} />
                  <BoxWithSwitch1
                    isOn={state.googlewallet}
                    setIsOn={(value) => {
                      handleStateChange("googlewallet", value);
                    }}
                    name={"googlewallet"}
                    description={t("gdesc")}
                  />
                </Container>

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

export default DiscountSettings;
