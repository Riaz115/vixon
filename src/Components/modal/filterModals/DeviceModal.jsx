import React from 'react'
import { useState } from 'react';
import { PiPlus } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";
import { Chip, Popover, Box } from "@mui/material";
const DeviceModal = ({ currentView, setCurrentView, previousFilter, setPreviousFilter, setSelectedFilter, setConditiontype, conditiontype }) => {
    const conditions = [
        "Includes",

    ];
    const [selected, setSelected] = useState([]);

    const [data, setData] = useState("")

    const datafilter = {
        Includes: {
            title: "Includes",
            label: "Device type Includes",
            type: "Device type",
            variable:"device",
            condition: selected?.length > 0 ? selected.join(",") : "",
            value: selected || [],
        }

    }
    const submitdata = () => {
        if (conditiontype && datafilter[data]?.value?.length > 0) {
            setConditiontype((prev) => [
                ...prev,
                datafilter[data]
            ]);
            setCurrentView("Multiple")
            setSelected([])
            setData("")
        }
    };
    const [popupAnchor, setPopupAnchor] = useState(null);
    const handlePopupOpen = (event) => {
        setPopupAnchor(event.currentTarget);
    };
    const handlePopupClose = () => {
        setPopupAnchor(null);
    };
    const handleDelete = (index) => {
        const datafordelete = selected[index];
        const filterindex = selected.filter((item) => item !== datafordelete)
        setSelected(filterindex)
    }
    const isPopupOpen = Boolean(popupAnchor);
    const popupId = isPopupOpen ? "location-popover" : undefined;

    // //console.log(selected, "this is selected data")

    return (
        <div>
            {currentView === "Device type" && <div className="space-y-2">
                {conditions.map((condition, index) => (
                    <button
                        onClick={() => {
                            setCurrentView(datafilter[condition]?.label)
                            setPreviousFilter(currentView)
                            setSelectedFilter(datafilter[condition]?.label)
                            setData(condition);
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
            </div>}

            {currentView === datafilter[data]?.label && <div className="space-y-2">
                <div>
                    <div className="p-2 flex flex-warp border border-gray-300 rounded">
                        <button>
                            {
                                selected.length > 0 ? (
                                    selected.map((loc, index) => (
                                        <span key={index} className=" inline-block">
                                            {loc}
                                            <RiCloseLine
                                                className="mx-4 m-2 bg-gray-500 cursor-pointer  text-[20px] rounded text-black-500 inline-block hover:bg-red-600 hover:text-white"
                                                onClick={() => handleDelete(index)}
                                                title="Delete"
                                            />
                                        </span>
                                    ))
                                ) :
                                    (
                                        <span className="my-2 inline-block">Nothing selected</span>
                                    )}
                        </button>

                        <button className="">
                            <RiCloseLine
                                className=" mx-2 bg-gray-300 cursor-pointer  text-[30px] rounded text-black-500 hover:bg-red-600 hover:text-white"
                                onClick={() => {
                                    setSelected([])
                                }}
                            // title="Delete"
                            />
                        </button>
                        <button className="">
                            <PiPlus
                                className="  bg-gray-300 cursor-pointer  text-[30px] rounded text-black-500  hover:bg-black hover:text-white"
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
                                    {
                                        ["apple wallet", "pwa", "Wallet Passes"].map((item) => {
                                            return (
                                                <Chip
                                                    key={item} // Add a unique key for better React rendering
                                                    sx={{ mx: 1, my: 1 }}

                                                    label={item} // The name displayed on the chip
                                                    onClick={() => {

                                                        if (!selected.includes(item)) {

                                                            setSelected([
                                                                ...(selected || []), // Use an empty array as a fallback
                                                                item
                                                            ]);
                                                        }
                                                    }}

                                                />
                                            );
                                        })}
                                </Box>
                            </Box>
                        </Popover>

                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded-md w-full mt-3 " onClick={() => {
                        submitdata();
                    }}>
                        Apply
                    </button>
                </div>

            </div>}


        </div>
    )
}

export default DeviceModal;