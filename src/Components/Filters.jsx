// Filters.jsx
import React, { useState, useEffect } from "react";
import { CiFilter } from "react-icons/ci";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { GiSatelliteCommunication } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import { styled } from "@mui/system";
import { Avatar } from "@mui/material";
import FilterModal from "./modal/FilterModal";
import { selectBusinesses } from "../redux/businessSlice";
import { useSelector } from "react-redux";
import { deleteFilter, getFilters } from "../api/filter";
import {
  changefilter,
  filtersComunication,
  filtersHealthy,
  Loyaltyfilters,
} from "../utils/filterfun";
import { Loader } from "./Loader/loader";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const SmallTextAvatar = styled(Avatar)({
  height: 33,
  width: 33,
  backgroundColor: "black",
  fontSize: "12px", // Adjust the font size here
});

function Filters({
  bg,
  customers,
  implementFilter,
  setimplementFilter,
  allstamp = [],
}) {
  const { t } = useTranslation("filter");

  // Added allstamp prop
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

  const business = useSelector(selectBusinesses);
  const [filters, setFilters] = useState();
  const [filtertype, setfilerType] = useState();
  const localStorageKey = `${business?.activeLocation}_filters`;

  // Initialize state from localStorage or with an empty array
  useEffect(() => {
    setimplementFilter(() => {
      const savedFilters = localStorage.getItem(localStorageKey);
      return savedFilters ? JSON.parse(savedFilters) : [];
    });
  }, [localStorageKey, setimplementFilter]);

  // Add a filter
  const addFilter = (filter) => {
    setimplementFilter((prev) => [...prev, filter]);
  };

  // Remove a filter
  const removeFilter = (filter) => {
    setimplementFilter((prev) => prev.filter((item) => item.id !== filter.id));
  };

  // Sync `implementFilter` state with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(implementFilter));
  }, [implementFilter, localStorageKey]);

  const returnFunction = () => {
    if (filtertype === "loyalty") return Loyaltyfilters(customers);
    else if (filtertype === "communication") {
      return filtersComunication(customers);
    } else if (filtertype === "healthy") {
      return filtersHealthy(customers);
    } else if (filtertype === "myfilter") {
      return changefilter(filters);
    }
  };

  const getData = async () => {
    try {
      const res = await getFilters(business?.activeLocation);
      if (res.status === 200) {
        setFilters(res.data.filters);
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [business?.activeLocation]);

  const deleteFilterFunc = async (id) => {
    // Renamed to avoid conflict with imported deleteFilter
    try {
      setLoading(true);
      const response = await deleteFilter(id);
      if (response.status === 200) {
        setLoading(false);
        getData();
        toast.success("Filter deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting filter:", error);
      setLoading(false);
    }
  };

  console.log(implementFilter, "implementFilter");

  return (
    <div>
      <div className="bg-white rounded-md shadow-sm border py-3 mt-2">
        <div className={`flex flex-wrap gap-2 px-2 py-4`}>
          <div
            className={`flex gap-3 items-center  ${
              filtertype === "myfilter"
                ? "bg-black text-white"
                : "bg-gray-100 text-[#616161]"
            } py-1 px-4 w-max rounded text-[#616161] hover:bg-black hover:text-white  cursor-pointer`}
            onClick={() => {
              setfilerType("myfilter");
            }}
          >
            <CiFilter />
            <span className="text-[14px]">{t("myfilter")}</span>
          </div>

          {/* Healthy */}
          <div
            className={`flex gap-3 items-center ${
              filtertype === "healthy"
                ? "bg-green-400 text-white"
                : " bg-gray-100 text-[#616161]"
            } py-1 px-4 w-max rounded  hover:bg-black hover:text-white cursor-pointer `}
            onClick={() => {
              setfilerType("healthy");
            }}
          >
            <MdOutlineHealthAndSafety />
            <span className="text-[14px]">{t("healthy")}</span>
          </div>

          {/* Loyalty */}
          <div
            className={`flex gap-3 items-center ${
              filtertype === "loyalty"
                ? "bg-blue-400 text-white"
                : " bg-gray-100 text-[#616161]"
            } py-1 px-4 w-max rounded text-[#616161] hover:bg-black hover:text-white cursor-pointer`}
            onClick={() => {
              setfilerType("loyalty");
            }}
          >
            <BsEmojiSmile />
            <span className="text-[14px]">{t("loyalty")}</span>
          </div>

          {/* Communication */}
          <div
            className={`flex gap-3 items-center  py-1 px-4 w-max rounded hover:bg-black hover:text-white cursor-pointer  ${
              filtertype === "communication"
                ? "bg-blue-700 text-white"
                : " bg-gray-100 text-[#616161]"
            }`}
            onClick={() => {
              setfilerType("communication");
            }}
          >
            <GiSatelliteCommunication />
            <span className="text-[14px]">{t("communication")}</span>
          </div>

          {/* Add Filter Button */}
          <button
            className={`flex gap-3 items-center bg-gray-200 py-1 px-2 w-max rounded text-[rgb(97,97,97)]`}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <IoMdAdd />
          </button>

          {/* Pass `allstamp` to FilterModal */}
          <FilterModal
            getdata={getData}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            allstamp={allstamp} // Ensure this prop is passed
            customer={customers}
          />
        </div>

        {/* Applied Filters Display */}
        <div className={`flex flex-wrap px-2`}>
          {returnFunction()
            ?.filter(
              (data) => !implementFilter.some((item) => item.id === data.id)
            )
            .map((item) => (
              <div
                key={item.id}
                className={`flex  gap-2  mr-1 items-center ${
                  filtertype === "healthy"
                    ? "bg-green-400 text-white"
                    : filtertype === "loyalty"
                    ? "bg-blue-400 text-white"
                    : filtertype === "myfilter"
                    ? "bg-black text-white"
                    : filtertype === "communication"
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100 text-[#616161]"
                } py-1 px-2 w-max rounded cursor-pointer`}
                onClick={() => {
                  addFilter(item);
                }}
              >
                <span className="text-[12px]">
                  {filtertype === "myfilter" ? (
                    <span>{item?.filterName}</span>
                  ) : (
                    <>
                      {item?.Andconditions?.map((condition, index) => (
                        <span key={index}>
                          {condition?.label}
                          {index < item?.Andconditions?.length - 1 &&
                            " && "}{" "}
                          {/* Add separator if not the last element */}
                        </span>
                      ))}
                      {item?.Orconditions.length > 0 && " || "}
                      {item?.Orconditions?.map((condition, index) => (
                        <span key={index}>
                          {condition?.label}
                          {index < item?.Orconditions?.length - 1 &&
                            " && "}{" "}
                          {/* Add separator if not the last element */}
                        </span>
                      ))}
                    </>
                  )}
                </span>

                {filtertype === "myfilter" && (
                  <button
                    className="text-black-500 hover:text-red-700 rounded-lg z-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFilterFunc(item?.id); // Use the renamed delete function
                    }}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
        </div>

        <Loader loading={loading} />
      </div>

      {/* Applied Filters in a Separate Section */}
      {implementFilter?.length > 0 && (
        <div className="bg-white rounded-md shadow-sm border py-6 mt-2">
          <h3 className="text-lg font-semibold px-2 mb-4">
            {t("activefilters")}
          </h3>{" "}
          {/* Added Header */}
          <div className={`flex flex-wrap px-2`}>
            {implementFilter?.map((item) => (
              <div
                key={item.id}
                className={`flex gap-4 mr-1 my-1 items-center ${
                  item.type === "healthy"
                    ? "bg-green-400 text-white"
                    : item?.type === "loyalty"
                    ? "bg-blue-400 text-white"
                    : item?.type === "myfilter"
                    ? "bg-black text-white"
                    : item?.type === "communication"
                    ? "bg-blue-700 text-white"
                    : "bg-black text-white"
                } py-1 px-2 w-max rounded cursor-pointer`}
              >
                <span className="text-[12px]">
                  {item?.Andconditions?.map((condition, index) => (
                    <span key={index}>
                      {condition?.label}
                      {index < item?.Andconditions?.length - 1 && " && "}{" "}
                      {/* Add separator if not the last element */}
                    </span>
                  ))}
                  {item?.Orconditions.length > 0 && " || "}
                  {item?.Orconditions?.map((condition, index) => (
                    <span key={index}>
                      {condition?.label}
                      {index < item?.Andconditions?.length - 1 && " && "}{" "}
                      {/* Add separator if not the last element */}
                    </span>
                  ))}
                </span>

                <button
                  className="text-black-500 hover:text-red-700 rounded-lg"
                  onClick={() => {
                    removeFilter(item);
                  }}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;
