// CardName.jsx
import React, { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import { RiCloseLine } from "react-icons/ri"; // Ensure all necessary imports are included
import { PiPlus } from "react-icons/pi"; // Ensure all necessary imports are included
import { Chip, Popover, Box } from "@mui/material";

const CardName = ({
                    setConditiontype,
                    conditiontype,
                    currentView,
                    setCurrentView,
                    previousFilter,
                    setPreviousFilter,
                    setSelectedFilter,
                    cardNames // Array of stamp names
                  }) => {
  const conditions = [
    "Empty",
    "cardName_includes",
  ];

  const datafilter = {
    cardName_includes: {
      title: "Includes",
      condition: "Includes",
      type: "Card name",
      label: "Card name Includes", // Unique label
      variable: "cardName",
      value: [] // Will be set based on selection
    },
    Empty: {
      title: "Empty",
      condition: "Empty",
      type: "Card name",
      label: "Card name Is Empty", // Unique label
      variable: "cardName",
      value: "empty"
    },
  };

  const [selectedCardNames, setSelectedCardNames] = useState([]);
  const [popupAnchor, setPopupAnchor] = useState(null);

  const handlePopupOpen = (event) => {
    setPopupAnchor(event.currentTarget);
  };
  const handlePopupClose = () => {
    setPopupAnchor(null);
  };
  const isPopupOpen = Boolean(popupAnchor);
  const popupId = isPopupOpen ? "card-name-popover" : undefined;

  const submitdata = (condition) => {
    if (condition === "cardName_includes" && selectedCardNames.length > 0) {
      setConditiontype((prev) => [
        ...prev,
        {
          ...datafilter.cardName_includes,
          value: selectedCardNames
        }
      ]);
      setCurrentView("Multiple");
      setSelectedFilter("Card name Includes");
      setSelectedCardNames([]);
    } else if (condition === "Empty") {
      setConditiontype((prev) => [
        ...prev,
        datafilter.Empty
      ]);
      setCurrentView("Multiple");
      setSelectedFilter("Card name Is Empty");
    }
  };

  console.log("CardName - currentView:", currentView);
  console.log("CardName - selectedCardNames:", selectedCardNames);
  console.log("CardName - cardNames:", cardNames);
  console.log(cardNames, "halo halo debil");

  const handleDelete = (index) => {
    const datafordelete = selectedCardNames[index];
    const updatedCardNames = selectedCardNames.filter((item, i) => i !== index);
    setSelectedCardNames(updatedCardNames);
  };

  return (
    <div>
      {/* Main View: "Card name" */}
      {currentView === "Card name" && (
        <div className="space-y-2">
          {conditions.map((condition, index) => (
            <button
              onClick={() => {
                setCurrentView(datafilter[condition]?.label);
                setPreviousFilter(currentView);
                setSelectedFilter(datafilter[condition]?.label);
                if (condition === "Empty") {
                  submitdata(condition);
                }
              }}
              key={index}
              className="w-full text-left px-4 py-3 border rounded-md hover:bg-gray-100 transition duration-200 flex items-center justify-between"
            >
              <span className="text-gray-700">{datafilter[condition]?.title}</span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>
      )}

      {/* Sub-View: "Card name Includes" */}
      {currentView === "Card name Includes" && (
        <div className="space-y-2 py-3">
          <FormControl fullWidth>
            <InputLabel id="card-name-label">Select Card Names</InputLabel>
            <Select
              labelId="card-name-label"
              id="card-name-select"
              multiple
              value={selectedCardNames}
              onChange={(e) => {
                setSelectedCardNames(e.target.value);
                console.log("Selected card names:", e.target.value); // Added log
              }}
              renderValue={(selected) => selected.join(', ')}
            >
              {cardNames.map((name, index) => (
                <MenuItem key={index} value={name}>
                  <Checkbox checked={selectedCardNames.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>

          </FormControl>
          <button
            className="bg-black text-white px-4 py-2 rounded-md w-full mt-3"
            onClick={() => submitdata("cardName_includes")}
          >
            Apply
          </button>
        </div>
      )}

      {/* Optionally, handle "Multiple" view or other sub-views here */}
    </div>
  );
};

export default CardName;
