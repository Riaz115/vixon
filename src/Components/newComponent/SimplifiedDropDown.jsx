import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

const SimplifiedDropDown = ({ name, value, onChange, list, index }) => {
  const handleChange = (event) => {
    if (
      name === "fieldName" ||
      name === "pointsType" ||
      name === "type" ||
      name === "service"
    ) {
      onChange(index, name, event);
    } else if (name === "fieldType") {
      onChange(index, name, event);
      onChange(index, "fieldName", event);
    } else {
      onChange(name, event);
    }
  };
  return (
    <div>
      <div className="w-full relative inline-block">
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            sx={{ height: 40, backgroundColor: "white" }}
          >
            {list.map((item, index) => (
              <MenuItem
                key={index}
                value={item.name}
                sx={{ borderBottom: "1px solid #d7d8d9" }}
              >
                <div className="flex items-center gap-2">
                  {item.icon} <p className="mt-[2px]">{item.name}</p>
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default SimplifiedDropDown;
