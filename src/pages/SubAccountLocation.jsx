import { Checkbox, TextField } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { PiPlus } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import { pageVariants } from "../Animation";
import { motion } from "framer-motion";
import Heading_Description from "../UIComponents/Heading_Description";
import BlackButton from "../UIComponents/BlackButton";
import InputBox from "../UIComponents/InputBox";
import IosSwitch from "../UIComponents/IosSwitch";
import { PhoneEmulator } from "../Components/PhoneEmulator";
import { createLocation } from "../api/location";
import { Popover, IconButton, Box } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";
import App from "../Components/Autogooglecomplete";
import { selectstamps } from "../redux/stampSlice";
import { useSelector } from "react-redux";
import { Loader } from "../Components/Loader/loader";
import toast from "react-hot-toast";
import { updateLocationforcard } from "../api/location";
import { getLocations } from "../api/location";
import { deleteLocation } from "../api/location";
import { selectBusinesses } from "../redux/businessSlice";
import { API_KEY } from "../config";
import { useTranslation } from "react-i18next";

const libraries = ["places", "marker"];
function SubAccountLocation() {
  const { t } = useTranslation("location");

  const [showLocationForm, setShowLocationForm] = useState(false);
  const [showupdateLocationForm, setShowupdateLocationForm] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [locationname, setLocationname] = useState();
  const business = useSelector(selectBusinesses);
  const [pushMessage, setPushMessage] = useState(t("pushMsg"));
  const [loading, setLoading] = useState(false);
  const [updatelocationname, setupdateLocationname] = useState();
  const [locations, setLocations] = useState();
  const allcards = useSelector(selectstamps);
  const [selectedCard, setSelectedCard] = useState([]);
  const [selectedupdateCard, setupdateSelectedCard] = useState([]);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [updateisOn, setupdateIsOn] = useState(false);
  const [selectlocation, setselectlocation] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleCardSelect = (card) => {
    setSelectedCard((prevSelectedCards) => {
      const cardExists = prevSelectedCards?.some(
        (selectedCard) => selectedCard === card
      );
      if (cardExists) {
        return prevSelectedCards;
      }
      return [...prevSelectedCards, card];
    });

    handleClose();
  };
  const handleupdateCardSelect = (card) => {
    setupdateSelectedCard((prevSelectedCards) => {
      const cardExists = prevSelectedCards?.some(
        (selectedCard) => selectedCard === card
      );
      if (cardExists) {
        return prevSelectedCards;
      }
      return [...prevSelectedCards, card];
    });

    handleClose();
  };

  const deletecard = (card) => {
    const cardExists = selectedCard?.filter(
      (selectedCard) => selectedCard !== card
    );
    setSelectedCard(cardExists);

    handleClose();
  };
  const deletecard1 = (card) => {
    const cardExists = selectedupdateCard?.filter(
      (selectedCard) => selectedCard !== card
    );
    setupdateSelectedCard(cardExists);
    handleClose();
  };
  const open = Boolean(anchorEl);
  const id = open ? "card-popover" : undefined;
  const open1 = Boolean(anchorEl1);
  const id1 = open ? "card-popover" : undefined;

  const [updatepushMessage, setupdatePushMessage] = useState(
    t("updatePushMsg")
  );
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
    name: "",
    address: "",
  });
  const [updatelocation, setupdateLocation] = useState({
    lat: 0,
    lng: 0,
    name: "",
    address: "",
  });

  const mapRef = useRef(null);
  const map1Ref = useRef(null);

  useEffect(() => {
    document.title = t("title");
  }, []);

  function handlePushMessage(e) {
    setPushMessage(e);
  }
  function handleupdatePushMessage(e) {
    setupdatePushMessage(e);
  }

  const filtercard = (id) => {
    const card = allcards.find((item) => item._id === id);
    return card?.stampName;
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const submitlocation = async () => {
    try {
      setLoading(true);
      const response = await createLocation({
        location: {
          location,
          message: pushMessage,
          locationname: locationname,
          display: isOn,
        },
        cards: selectedCard,
        businessId: business.activeLocation,
      });
      if (response.status === 200) {
        // //console.log(response?.data?.location)
        setLoading(false);
        setLocations([...locations, response?.data.location]);
        setShowLocationForm(false);
        toast.success(t("succMsg"));
      }
    } catch (error) {
      setLoading(false);
      // //console.log(error, "these are errors ")
    }
  };
  const updatedatalocation = async () => {
    try {
      setLoading(true);
      const response = await updateLocationforcard(
        {
          location: {
            location: updatelocation,
            message: updatepushMessage,
            locationname: updatelocationname,
            display: updateisOn,
          },
          cards: selectedupdateCard,
        },
        selectlocation
      );
      if (response.status === 200) {
        setLoading(false);
        const updatedLocations = locations.map((location) =>
          location._id === selectlocation
            ? response.data?.locationdata
            : location
        );
        setselectlocation();
        setLocations(updatedLocations);
        toast.success(t("updateSuccMsg"));
      }
    } catch (error) {
      setLoading(false);
      // //console.log(error, "these are errors ")
    }
  };
  const updatedisplay = async (display, data) => {
    try {
      setLoading(true);
      const response = await updateLocationforcard(
        {
          location: {
            location: data?.location?.location,
            message: data?.location?.message,
            locationname: data?.location?.locationname,
            display: display,
          },
          cards: data?.cards,
        },
        data?._id
      );
      if (response.status === 200) {
        setLoading(false);
        // //console.log(response.data?.locationdata, "this is locationdata id")
        const updatedLocations = locations.map((location) =>
          location._id === data?._id ? response.data?.locationdata : location
        );
        setselectlocation();
        setLocations(updatedLocations);
        toast.success(t("updateSuccMsg"));
      }
    } catch (error) {
      setLoading(false);
      // //console.log(error, "these are errors ")
    }
  };
  const deletelocation = async () => {
    try {
      setLoading(true);
      const response = await deleteLocation(selectlocation);
      if (response.status === 200) {
        setLoading(false);
        setShowLocationForm(false);
        const updatedLocations = locations.filter(
          (location) => location._id !== selectlocation
        );
        setLocations(updatedLocations);
        toast.success(t("delMsg"));
      }
    } catch (error) {
      setLoading(false);
      // //console.log(error, "these are errors ")
    }
  };

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

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const mapOptions = {
        zoom: 14,
        center: location,
        mapId: "map1",
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      const { AdvancedMarkerElement } = window.google.maps.marker;

      const marker = new AdvancedMarkerElement({
        map,
        position: location,
        title: t("selectedLocation"),
      });

      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: location,
        radius: 500,
      });

      marker.position = location;

      return () => {
        marker.setMap(null);
      };
    }
  }, [location?.lat, isLoaded, showLocationForm]);

  useEffect(() => {
    if (isLoaded && map1Ref.current) {
      const mapOptions = {
        zoom: 14,
        center: updatelocation,
        mapId: "map2",
      };

      const map = new window.google.maps.Map(map1Ref.current, mapOptions);

      const { AdvancedMarkerElement } = window.google.maps.marker;

      const marker = new AdvancedMarkerElement({
        map,
        position: updatelocation,
        title: t("selectedLocation"),
      });

      new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: updatelocation,
        radius: 500,
      });

      marker.position = updatelocation;

      return () => {
        marker.setMap(null);
      };
    }
  }, [updatelocation, isLoaded, showupdateLocationForm]);

  if (loadError) return <div>{t("errLoadingMaps")}</div>;
  if (!isLoaded) return <div>{t("loadingMaps")}</div>;

  return (
    <>
      <div className="  grid grid-cols-6 gap-2 ">
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div className="w-64 max-h-60 overflow-y-auto">
            <Box className="">
              {allcards?.map((card, index) => (
                <button
                  key={index}
                  button
                  onClick={() => handleCardSelect(card._id)}
                  className="hover:bg-gray-100 mx-2"
                >
                  {card.stampName}
                </button>
              ))}
            </Box>
          </div>
          <div className="p-2 bg-gray-100 border-t border-gray-300 flex justify-between items-center">
            <IconButton onClick={handleClose} size="small">
              {/* <CloseIcon fontSize="small" /> */}
            </IconButton>
          </div>
        </Popover>

        <Popover
          id={id1}
          open={open1}
          anchorEl={anchorEl1}
          onClose={handleClose1}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div className="w-64 max-h-60 overflow-y-auto">
            <Box className="">
              {allcards?.map((card, index) => (
                <button
                  key={index}
                  button
                  onClick={() => handleupdateCardSelect(card._id)}
                  className="hover:bg-gray-100 mx-2"
                >
                  {card.stampName}
                </button>
              ))}
            </Box>
          </div>
          <div className="p-2 bg-gray-100 border-t border-gray-300 flex justify-between items-center">
            <IconButton onClick={handleClose} size="small">
              {/* <CloseIcon fontSize="small" /> */}
            </IconButton>
          </div>
        </Popover>

        <div className="col-span-6 lg:col-span-4 pt-4">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <div className="grid grid-cols-6 gap-2">
              <div className="col-span-6 lg:col-span-5 mt-5">
                <div className="mb-9 border-b border-[#D5D5DD]">
                  <Heading_Description
                    heading={t("locations")}
                    description={t("description")}
                  />
                </div>
                <span onClick={() => setShowLocationForm(!showLocationForm)}>
                  <BlackButton
                    btnText={
                      showLocationForm ? t("hideLocation") : t("addLocation")
                    }
                  />
                </span>
                {showLocationForm && (
                  <div className="border border-gray-300 box-borderrounded mt-10 rounded">
                    <div className="border-b border-gray-300 p-1 flex justify-between">
                      <p className="font-semibold text-[18px]">
                        {t("sendpush")}
                      </p>
                      <IosSwitch name="display" isOn={isOn} setIsOn={setIsOn} />
                    </div>

                    <div className="p-3">
                      <InputBox
                        value={locationname}
                        onChange={setLocationname}
                        placeHolder={t("locationname")}
                      />
                      <div className="py-2"></div>
                      <div className="my-2">
                        {showLocationForm && (
                          <App location={location} setlocation={setLocation} />
                        )}
                      </div>

                      {location && (
                        <div
                          id="map1"
                          ref={mapRef} // Reference the map div correctly
                          style={{ width: "100%", height: "400px" }}
                        ></div>
                      )}

                      <p className="mt-5 text-sm pb-2 text-[#656565]">
                        {t("selectCards")}
                      </p>
                      <div className="flex items-center p-3 rounded-md border border-gray-300">
                        <div>
                          {selectedCard?.map((item, index) => {
                            return (
                              <button key={index} className="text-[15px]  mx-2">
                                <span className="flex">
                                  {filtercard(item)}{" "}
                                  <RiCloseLine
                                    onClick={() => {
                                      deletecard(item);
                                    }}
                                    className="text-sm m-1"
                                  />
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex gap-2">
                          <div
                            className="w-max p-2 rounded-md bg-gray-200 cursor-pointer"
                            onClick={handleClick}
                          >
                            <PiPlus className="text-sm " />
                          </div>
                          <div
                            className="w-max p-2 rounded-md bg-gray-200 cursor-pointer"
                            onClick={handleClick}
                          >
                            <RiCloseLine className="text-sm" />
                          </div>
                        </div>
                      </div>
                      <div className="py-2"></div>
                      <p className="text-sm pb-2 text-[#656565]">
                        {t("pushMessage")}
                      </p>
                      <InputBox
                        value={pushMessage}
                        onChange={handlePushMessage}
                        placeHolder={"Enter your message"}
                        rows={3}
                      />
                      <div
                        className="rounded bg-black text-white w-max px-7 py-2 mt-4 cursor-pointer"
                        onClick={() => {
                          submitlocation();
                        }}
                      >
                        {t("add")}
                      </div>
                    </div>
                  </div>
                )}
                {locations?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="flex justify-between p-3 bg-white rounded-md mt-5 border border-gray-300">
                        <div
                          onClick={() => {
                            setselectlocation(item._id);
                            setupdateLocationname(item?.location?.locationname);
                            setupdateLocation(item?.location?.location);
                            setupdatePushMessage(item?.location?.message);
                            setupdateSelectedCard(item?.cards);
                            setupdateIsOn(item?.location?.display);
                          }}
                          className="cursor-pointer py-2"
                        >
                          <p className="font-semibold text-[18px]">
                            {item?.location?.locationname}
                          </p>
                          <p className="text-xs pt-1 text-[#656565]">
                            {item?.location?.location?.address}
                          </p>
                        </div>
                        <IosSwitch
                          isOn={item?.location?.display}
                          setIsOn={(e) => {
                            updatedisplay(e, item);
                          }}
                        />
                      </div>
                      {selectlocation === item?._id && (
                        <div className="border border-gray-300 box-borderrounded mt-10 rounded">
                          <div className="border-b border-gray-300 p-1 flex justify-between">
                            <p className="font-semibold text-[18px]">
                              {t("sendpush")}
                            </p>
                            <IosSwitch
                              name="display"
                              isOn={updateisOn}
                              setIsOn={setupdateIsOn}
                            />
                          </div>

                          <div className="p-3">
                            <InputBox
                              value={updatelocationname}
                              onChange={setupdateLocationname}
                              placeHolder={t("locationName")}
                            />
                            <div className="py-2"></div>
                            <div className="my-2">
                              <App
                                location={updatelocation}
                                setlocation={setupdateLocation}
                              />
                            </div>

                            {updatelocation && (
                              <div
                                id="map2"
                                ref={map1Ref} // Reference the map div correctly
                                style={{ width: "100%", height: "400px" }}
                              ></div>
                            )}

                            {/* <p className="mt-5 text-sm pb-2 text-[#656565]">
                            Select cards
                          </p>
                          <div className="flex items-center p-3 rounded-md border border-gray-300">
                            <div>

                              {selectedupdateCard?.map((item, index) => {
                                return <button key={index} className="text-[15px]  mx-2"><span className="flex">{filtercard(item)} <RiCloseLine onClick={() => {
                                  deletecard1(item)
                                }} className="text-sm m-1" /></span></button>
                              })}
                            </div>
                            <div className="flex gap-2">
                              <div className="w-max p-2 rounded-md bg-gray-200 cursor-pointer" onClick={handleClick1}>
                                <PiPlus className="text-sm " />
                              </div>
                              <div className="w-max p-2 rounded-md bg-gray-200 cursor-pointer" onClick={handleClick1}>
                                <RiCloseLine className="text-sm" />
                              </div>

                            </div>
                          </div> */}
                            <div className="py-2"></div>
                            <p className="text-sm pb-2 text-[#656565]">
                              {t("pushMessage")}
                            </p>
                            <InputBox
                              value={updatepushMessage}
                              onChange={handleupdatePushMessage}
                              placeHolder={t("enterMsg")}
                              rows={3}
                            />
                            <div className="flex justify-between">
                              <div
                                className="rounded bg-black text-white w-max px-7 py-2 mt-4 cursor-pointer"
                                onClick={() => {
                                  updatedatalocation();
                                }}
                              >
                                {t("save")}
                              </div>
                              <div
                                className="mt-7 cursor-pointer"
                                onClick={() => {
                                  deletelocation();
                                }}
                              >
                                <RiDeleteBinLine />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="col-span-6 lg:col-span-2 ">
          <div className="text-center  p-6 sticky top-20">
            <div
              className={`flex gap-1 my-2 mx-auto  items-center  w-max rounded-full bg-gray-200 shadow px-4 py-1 text-xs`}
            >
              <div className={` ${"bg-[#1DCD27]"}  p-1  rounded-full`}></div>
              <span> {status ? t("active") : t("inactive")}</span>
            </div>
            <PhoneEmulator
              activeview={true}
              emulatorContent={
                <div className="bg-[#1111118c] text-white p-3 rounded-md mx-2 mt-40">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://imgv3.fotor.com/images/videoImage/unblur-image-online-instantly-with-Fotor-blur-remover.jpg"
                        alt="icon"
                        className="w-5 h-5 rounded-md"
                      />
                      <span className="text-[11px] font-light">
                        {t("companyname")}
                      </span>
                    </div>
                    <div className="text-[11px] font-light">{t("now")}</div>
                  </div>
                  <div className="mt-1">
                    <p className="text-[11px]">{pushMessage}</p>
                  </div>
                </div>
              }
            ></PhoneEmulator>
          </div>
        </div>
        <Loader loading={loading} />
      </div>
    </>
  );
}
export default SubAccountLocation;
