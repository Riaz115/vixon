import React from "react";
import { TextField, Autocomplete } from "@mui/material";
import PropTypes from "prop-types";
import Heading_Description from "./Heading_Description";

export default function AutoCompleteInput({
  heading,
  description,
  list = [],
  onChange,
  value,
}) {
  const handleChange = (event, newValue) => {
    if (onChange) {
      // Pass the index of the selected item instead of the object
      const selectedIndex = list.findIndex((item) => item.name === newValue?.name);
      onChange(selectedIndex);
    }
  };

  return (
    <div>
      {heading && (
        <Heading_Description heading={heading} description={description} />
      )}
      <div className="w-full relative inline-block mb-4">
        <Autocomplete
          value={list[value] || null} // Set the value based on the index
          onChange={handleChange}
          options={list}
          getOptionLabel={(option) => option.name || ""}
          renderOption={(props, option) => (
            <li {...props} key={option.name}>
              <div className="flex items-center gap-2">
                {option.icon} <p className="mt-[2px]">{option.name}</p>
              </div>
            </li>
          )}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Item"
              variant="outlined"
            
              sx={{  backgroundColor: "white" }}
            />
          )}
        />
      </div>
    </div>
  );
}

AutoCompleteInput.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  list: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.number, // Value is now an index (number)
};
