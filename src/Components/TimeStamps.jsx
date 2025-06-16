import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";

const TimeStamps = ({
  heading,
  icon,
  tags = [],
  selectedPeriod,
  setSelectedPeriod,
}) => {
  const { t } = useTranslation("timestamps");

  const buttons = [t("day"), t("week"), t("month"), t("year"), t("all_time")];

  const [stamps, setStamps] = useState(window.innerWidth >= 640);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setStamps(true);
      } else {
        setStamps(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="py-4 flex gap-3 justify-between items-center flex-wrap">
      <div className="flex items-center gap-1 mr-10">
        <h1 className="text-2xl">{heading}</h1>
        {icon && (
          <IoIosInformationCircleOutline className="text-xl mt-1 text-[#33333397]" />
        )}
        <div
          className={`flex items-center gap-3 ml-3 mt-1 flex-wrap overflow-hidden`}
        >
          {tags.map((tag, index) => (
            <button
              className="text-[11px] bg-white text-[#656565] py-1 px-3 rounded shadow-sm"
              key={index}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <BsThreeDotsVertical
        onClick={(e) => setStamps(!stamps)}
        className="text-xl cursor-pointer sm:hidden"
      />
      <div
        className={`flex items-center gap-1 flex-wrap overflow-hidden ${
          stamps ? "h-auto" : "h-0"
        }`}
      >
        {buttons.map((button, index) => (
          <button
            className={`text-[11px] ${
              selectedPeriod === button
                ? "bg-gray-[500] text-[#656565] "
                : "bg-white text-[#656565]"
            } py-2 px-3 rounded shadow-sm`}
            key={index}
            onClick={() => {
              setSelectedPeriod(button);
            }}
          >
            {t(`${button}`)}
            {/* {button} */}
          </button>
        ))}
        {/* <button className="text-xs bg-gray-200 text-gray-800 py-2 px-4 rounded shadow-sm">
          Day
        </button> */}
      </div>
    </div>
  );
};

export default TimeStamps;
