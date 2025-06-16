import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { BsEmojiSmile } from "react-icons/bs";
import { Circle, useLoadScript } from '@react-google-maps/api';
import EmojiPicker from 'emoji-picker-react';
import App from "./Autogooglecomplete";
import IosSwitch from "../UIComponents/IosSwitch";
import { createLocation } from "../api/location";
import toast from "react-hot-toast";
import { selectBusinesses } from "../redux/businessSlice";
import { useSelector } from "react-redux";

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const defaultCenter = {
  lat: 32.4598856,
  lng: 74.5111606,
};

const libraries = ["places", "marker"];

function MapModal({ onClose, setState, state }) {
  const business = useSelector(selectBusinesses)

  const [isOn, setIsOn] = useState(false);
  const [locationname, setLocationname] = useState('');
  const [pushMessage, setPushMessage] = useState(
    "Push text in a side preview of the service with emojies 👀 🎫 💬 😍"
  );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to control emoji picker visibility
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
    name: "",
    address: "",
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAKvdlFxvlpSyw9yujztHP1tfmtXDnFe6g', // Replace with your API Key
    libraries,
  });

  // Handle emoji selection
  const handleEmojiSelect = (event) => {
    // //console.log(event,"data"); 
    const emoji = event.emoji;

    if (emoji) {
      setPushMessage(pushMessage + emoji);
    } else {
      console.error('Emoji object does not contain a valid emoji');
    }

    setShowEmojiPicker(false); // Close emoji picker after selection
  };

  const submitLocation = async () => {
    try {
     

      // setLoading(true)
      const response = await createLocation({ location: { location, message: pushMessage, locationname: locationname, display: isOn }, businessId: business.activeLocation })
      if (response.status === 200) {
        // //console.log(response?.data?.location)
        // setLoading(false)
        toast.success("Location add successfully")
        setState({
          ...state,
          modaldata: [
            ...state?.modaldata,
            {
              location: location,
              locationname: locationname,
              message: pushMessage,
              display: isOn,
            },
          ],
        });
      }
    } catch (error) {
      // setLoading(false)
      //console.log("location error", error)
      //console.log("location error", error?.response)
      if (error?.response && error?.response?.data?.status === 'error' && error?.response?.data?.message) {
        const { message } = error.response?.data;
        // Check if the error is related to locationname length
        if (message["location.locationname"]) {
          const errorMessage = message["location.locationname"][0];
          // toast.error(errorMessage); // Display error message
          toast.error("location name is too lengthy!"); // Display error message
          toast.error("location name maximum allowed length is (30)."); // Display error message
        } else {
          // If it's a different error, display it
          toast.error("An error occurred while adding the location.");
        }
      } else {
        // Generic error handling
        //console.log("location error", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      onClose();

    }


  };

  useEffect(() => {
    if (isLoaded) {
      const mapOptions = {
        zoom: 14,
        center: location,
        mapId: 'map',
      };

      const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);

      const { AdvancedMarkerElement } = window.google.maps.marker;

      const marker = new AdvancedMarkerElement({
        map,
        position: location,
        title: "Selected Location",
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
  }, [location?.lat, isLoaded]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div
      className="bg-[#00000048] fixed backdrop-blur-[1px] w-full h-full z-10 top-0 left-0 flex justify-center items-center overflow-y-auto"
      style={{ zIndex: 100 }}
    >
      <div className="bg-white w-[600px]  sm:h-auto p-4 rounded-lg box-border shadow-lg overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-semibold text-lg">Add location</span>
          <RxCross2 className="text-xl cursor-pointer" onClick={onClose} />
        </div>

        <TextField
          label="Location Name"
          value={locationname}
          onChange={(e) => setLocationname(e.target.value)}
          fullWidth
        />

        <div className="my-2">
          <App location={location} setlocation={setLocation} />
        </div>

        {location && (
          <div id="map" style={mapContainerStyle}></div>
        )}

        <Circle
          center={{ lat: Number(location.lat), lng: Number(location.lng) }}
          radius={3000}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
          }}
        />

        <span className="relative">
          <div className="border-b border-gray-300 p-1 flex justify-between">
            <p className="font-semibold text-[18px]">Push message</p>
            <IosSwitch name="display" isOn={isOn} setIsOn={setIsOn} />
          </div>

          <TextField
            fullWidth
            multiline
            value={pushMessage}
            onChange={(e) => setPushMessage(e.target.value)}
            name="message"
            rows={2}
          />

          <BsEmojiSmile
            className="absolute top-11 right-2 text-gray-400 hover:text-blue-600 mt-3 cursor-pointer"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />

          {showEmojiPicker && (
            <div className="absolute z-50 top-14 right-0">
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </div>
          )}
        </span>

        <div className="my-4">
          <button
            className="bg-black text-white text-sm py-2 px-8 rounded"
            onClick={submitLocation}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapModal;
