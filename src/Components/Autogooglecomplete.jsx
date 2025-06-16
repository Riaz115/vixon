import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { TextField, Box, Button } from "@mui/material";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { RiMapPinUserLine } from "react-icons/ri";
import InputAdornment from '@mui/material/InputAdornment';
import { API_KEY } from "../config";


const App = ({ errors, location, setlocation }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
// //console.log()
  const [inputValue, setInputValue] = useState(location?.address);

  // Function to handle auto-detect location
  const handleAutoDetectLocation = () => {
    if (navigator.geolocation && !location?.lat) {
      navigator.geolocation.getCurrentPosition(

        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const geocoder = new window.google.maps.Geocoder();
          const latlng = { lat: lat, lng: lng };

          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK" && results[0]) {
              const address = results[0].formatted_address;
              const addressComponents = results[0].address_components;
              const countryComponent = addressComponents.find(component =>
                component.types.includes("country")
              );
              const countryCode = countryComponent ? countryComponent.short_name : '';

              setlocation({
                name: "Current Location",
                address: address,
                lat: lat,
                lng: lng,
                countryName: countryCode,
              });

              setInputValue(address);

              setSelectedPlace({
                name: "Current Location",
                formatted_address: address,
                geometry: {
                  location: {
                    lat: () => lat,
                    lng: () => lng,
                  },
                },
                address_components: addressComponents,
              });
            } else {
               //console.log("Geocoder failed due to: " + status);
            }
          });
        },
        (error) => {
          //console.log("Error detecting location:", error);
        }
      );
    } else {
      //console.log("Geolocation is not supported by this browser.");
    }
  };

  
  useEffect(() => {
    if (selectedPlace) {
      const fetchPlaceData = () => {
        if (!selectedPlace.address_components) {
          setTimeout(fetchPlaceData, 100); // Retry after a short delay
          return;
        }
        
        const formattedAddress = selectedPlace.formatted_address;
        const addressParts = formattedAddress.split(', ');
        const countryName = addressParts[addressParts.length - 1];
        const addressComponents = selectedPlace.address_components;
        const countryComponent = addressComponents.find(component =>
          component.types.includes("country")
        );
        const countryCode = countryComponent ? countryComponent.short_name : '';
        
        setlocation({
          name: selectedPlace.name,
          address: selectedPlace.formatted_address,
          lat: selectedPlace.geometry.location.lat(),
          lng: selectedPlace.geometry.location.lng(),
          countryName: countryCode,
        });

        setInputValue(selectedPlace.formatted_address);
      };

      fetchPlaceData();
    }
  }, [selectedPlace]);
  
  useEffect(() => {
    handleAutoDetectLocation(); // Automatically detect location on mount
  }, []);
  return (
    <APIProvider
      apiKey={API_KEY}
      solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
    >
      <Box sx={{ position: 'relative', zIndex: 1300 }}>
        <PlaceAutocomplete 
          onPlaceSelect={setSelectedPlace} 
          value={inputValue} 
          onInputChange={setInputValue}
        />
      </Box>
    </APIProvider>
  );
};

const PlaceAutocomplete = ({ onPlaceSelect, value, onInputChange }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address", "address_components"]
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;
    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  const handleInputChange = (event) => {
    onInputChange(event.target.value);
  };

  return (
    <Box className="autocomplete-container">
      <TextField
        inputRef={inputRef}
        value={value}
        onChange={handleInputChange}
        label='Location address'
        variant="outlined"
        fullWidth
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <RiMapPinUserLine className="absolute right-3 top-[11px] text-xl" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

// Example usage of App component with dummy props
const root = createRoot(document.getElementById('root'));
root.render(
  // <App
  //   errors={{ general: {} }}
  // />
);

export default App;
