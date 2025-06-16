import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import Heading_Description from "./Heading_Description";

export default function   ({
  index,
  pricingIndex,
  name,
  onChange,
  heading,
  description,
  infoIcon,
  textPosition,
  text,
  emoji,
  placeHolder,
  fieldName,
  rows,
  value,
  textType,
  className,
  ...props
}) {
  const handleChange = (e) => {
    if (pricingIndex) {
      onChange(index, name, e.target.value, pricingIndex);
    } else if (
      fieldName === "moneySpent" ||
      fieldName === "pointsGained" ||
      fieldName === "pointsPerVisit"
    ) {
      onChange(fieldName, e.target.value);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      {(heading || description) && (
        <Heading_Description
          heading={heading}
          description={description}
          infoIcon={infoIcon}
        />
      )}
      <div
        className={`flex relative ${
          textPosition === "left"
            ? "flex-row"
            : textPosition === "right"
            ? "flex-row-reverse"
            : ""
        }`}
      >
        {textPosition && (
          <div
            className={`text-[#1F1E1F] text-[16.8px] bg-[#F7F7F8] border-y border-[#D5D5DD] shadow-inner px-4 flex justify-center items-center ${
              textPosition === "left"
                ? "rounded-l-md border-l"
                : textPosition === "right"
                ? "rounded-r-md border-r"
                : ""
            }`}
          >
            {text}
          </div>
        )}

        {rows ? (
          <textarea
            value={value}
            onChange={handleChange}
            placeholder={placeHolder}
            rows={rows}
            className={`border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none resize-none ${
              textPosition === "left"
                ? "rounded-r-md"
                : textPosition === "right"
                ? "rounded-l-md"
                : "rounded-md"
            }`}
          />
        ) : (
          <input
            value={value}
            onChange={handleChange}
            // type="text"
            type={textType||"text"}
            placeholder={placeHolder}
            {...props}
            className={`border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none ${
              textPosition === "left"
                ? "rounded-r-md"
                : textPosition === "right"
                ? "rounded-l-md"
                : "rounded-md"
            }`}
          />
        )}

        {textPosition ? (
          <></>
        ) : (
          emoji && <BsEmojiSmile className="absolute right-3 top-3 text-lg" />
        )}
      </div>
    </div>
  );
}
