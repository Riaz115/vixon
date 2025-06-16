import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Heading_Description from "../../UIComponents/Heading_Description";
import Container from "../../UIComponents/Container";
import { pageVariants } from "../../Animation";
import BlackButton from "../../UIComponents/BlackButton";
import BoxWithSwitch1 from "../../UIComponents/BoxWithSwitch";
import { MdDelete } from "react-icons/md";
import IosSwitch from "../../UIComponents/IosSwitch";
import MapModal from "../../Components/MapModal";
import { fieldTypes } from "../../Components/utils";
import SimplifiedDropDown from "../../Components/newComponent/SimplifiedDropDown";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { PiPlus } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";
import { Button, Chip, Popover } from "@mui/material";
import { getLocations } from "../../api/location";
import { useSelector } from "react-redux";
import { selectBusinesses } from "../../redux/businessSlice";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Basic styling
import "tippy.js/themes/material.css"; // Example theme
import { IoInformationCircleOutline } from "react-icons/io5";
import { FormControl, MenuItem, Select } from "@mui/material";
import { selectstamps } from "../../redux/stampSlice";
function CouponSettings({ handleSelectSetting, state, setState, t }) {
  const cards = useSelector(selectstamps);
  const [selectedBottomRadio, setSelectedBottomRadio] = useState("unlimited");
  const business = useSelector(selectBusinesses);
  const [phoneMask, setPhoneMask] = useState([]);
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [copy, setCopy] = useState(false);
  // const [showUtmField, setShowUtmField] = useState(false);
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

  const handleStateChange = (key, value) => {
    // //console.log(key, value);
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
  const handleChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      purchaseAmountIsRequiredSwitch: value,
    }));
  };

  useEffect(() => {
    document.title = t("ctitle");
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
                {/* List card Template */}
                <Container border={"bottom"}>
                  <Heading_Description
                    heading={t("lhead")}
                    description={t("ldesc")}
                  />
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={state.linkedCardTemplate}
                      onChange={(e) =>
                        handleStateChange("linkedCardTemplate", e.target.value)
                      }
                      sx={{ height: 40, backgroundColor: "white" }}
                    >
                      <MenuItem
                        //  key="nothing"
                        value="without"
                        sx={{ borderBottom: "1px solid #d7d8d9" }}
                      >
                        <div className="flex items-center gap-2">
                          <p className="mt-[2px]">{t("wtext")}</p>
                        </div>
                      </MenuItem>
                      {cards?.map((item, index) => (
                        <MenuItem
                          key={index}
                          value={item?._id}
                          sx={{ borderBottom: "1px solid #d7d8d9" }}
                        >
                          <div className="flex items-center gap-2">
                            <p className="mt-[2px]">{item?.stampName}</p>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Container>

                <Container>
                  <div className="flex items-center gap-2">
                    <Heading_Description heading={t("rhead")} />
                    <Tippy content={t("rdesc")}>
                      <button type="button" className="cursor-pointer">
                        <IoInformationCircleOutline className="text-[20px]" />
                      </button>
                    </Tippy>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength="30"
                      className="border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none"
                      value={state.rewardForTheFirstVisit}
                      onChange={(e) =>
                        handleStateChange(
                          "rewardForTheFirstVisit",
                          e.target.value
                        )
                      }
                    />
                    {state.rewardForTheFirstVisit.length >= 30 && (
                      <span className="text-red-500 text-xs absolute right-0 top-full mt-1 pointer-events-none">
                        {t("rdesc")}
                      </span>
                    )}
                  </div>
                </Container>

                {/*<Container border={"bottom"}>*/}
                {/*  <Heading_Description heading="Purchase amount when charging" />*/}
                {/*  <BoxWithSwitch1*/}
                {/*    isOn={state.purchaseAmountIsRequiredSwitch}*/}
                {/*    setIsOn={handleChange}*/}
                {/*    name="purchaseAmountIsRequiredSwitch"*/}
                {/*    description={"Purchase amount is required in Scanner App"}*/}
                {/*  />*/}
                {/*</Container>*/}

                {/* Card issuing form */}
                <Container border={"bottom"}>
                  <div className="flex gap-3">
                    <Heading_Description heading={t("cardissue")} />

                    <Tippy content={t("filcont")}>
                      <button>
                        <IoInformationCircleOutline className="text-[20px]" />
                      </button>
                    </Tippy>
                  </div>{" "}
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

export default CouponSettings;
