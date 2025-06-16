
import React from 'react'
import { useState } from 'react';

const BirthdayModal = ({ setConditiontype, conditiontype, currentView, setCurrentView, previousFilter, setPreviousFilter, setSelectedFilter, settype }) => {
    const conditions = [
        "Empty_b",
        "Not_empty_b",
        "Equal_b",
        "day_b",
        "month_b",
        "year_b",
        "today_b",
        "currentmonth_b",
    ];
    
    const [data, setData] = useState("")
    const [value, setValue] = useState("")
    const datafilter = {
        Equal_b: {
            title: "Birth Equal",
            condition: "Equal",
            type: "Customer birthday",
            label: "Birthday equal",
            value:value,
            variable:"date_of_birth"
        },
        Empty_b: {
            title: "Empty",
            condition: "Empty",
            type: "Customer birthday",
            label: "Multiple",
            value:"Empty",
            variable:"date_of_birth"
        },
        Not_empty_b: {
            title: "Not empty",
            condition: "Not empty",
            type: "Customer birthday",
            label: "Multiple",
            value:"Not empty",
            variable:"date_of_birth"
        },
        day_b: {
            title: "Customer birthday Day",
            condition: "Day",
            type: "Customer birthday",
            label: "Day",
            value:value,
            variable:"date_of_birth"
        },
        month_b: {
            title: "Customer birthday Month",
            condition: "Month",
            type: "Customer birthday",
            label: "Month",
            value:value,
            variable:"date_of_birth"
        },
        year_b: {
            title: "Customer birthday Year",
            condition: "Year",
            type: "Customer birthday",
            label: "Year",
            value:value,
            variable:"date_of_birth"
        },
        today_b: {
            title: "Customer birthday Today",
            condition: "Today",
            type: "Customer birthday",
            label: "today",
            value:"today",
            variable:"date_of_birth"
        },
        currentmonth_b: {
            title: "Customer birthday Current month",
            condition: "Currentmonth",
            type: "Customer birthday",
            label: "currentmonth",
            value:"month",
            variable:"date_of_birth"
        },
    }

    const submitdata = (condition) => {
        if(datafilter[condition]){

            setConditiontype((prev) => [
                ...prev,
                datafilter[condition]
            ]);
            setCurrentView("Multiple")
        }
        setValue("")

    };






    return (
        <div>
            {currentView === "Customer birthday" && <div className="space-y-2">
                {conditions.map((condition, index) => (
                    <button
                        onClick={() => {
                            setCurrentView(datafilter[condition]?.label)
                            setPreviousFilter(currentView)
                            setSelectedFilter(datafilter[condition]?.label)
                            setData(condition);
                            if (datafilter[condition]?.title === "Empty" || datafilter[condition]?.title === "Not empty" || datafilter[condition]?.title==="Customer birthday Current month"|| datafilter[condition]?.title==="Customer birthday Today" ) {

                                setTimeout(() => {
                                    if (!conditiontype) {
                                        settype("and")
                                    }
                                    submitdata(condition);
                                }, 1000);
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
            </div>}

            {currentView === "Birthday equal" && <div className="space-y-2 py-3">
                <div>
                    <div className="flex flex-warp">
                        <input
                            type="date"
                            placeholder={datafilter[data]?.title}
                            onChange={(e)=>{
                                setValue(e.target.value);
                            }}
                            className="border border-gray-300 px-4 py-2 rounded w-full mb-4"
                        />
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded-md w-full mt-3 " onClick={() => {

                        submitdata(data)
                    }}>
                        Apply
                    </button>
                </div>

            </div>}


            {currentView === "Day" && (
                <div className="space-y-2 py-3">
                    <div>
                        {/* Day Number Select Input */}
                        <div className="flex flex-wrap">
                            <select
                                className="border border-gray-300 px-4 py-2 rounded w-full mb-4"
                                onChange={(e)=>{
                                    setValue(e.target.value);
                                }}// Handle selected day value
                            >
                                <option value="" disabled selected>
                                    Select Day
                                </option>
                                {Array.from({ length: 30 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Apply Button */}
                        <button
                            className="bg-black text-white px-4 py-2 rounded-md w-full mt-3"
                            onClick={() => {
                                submitdata(data); // Call submit function
                            }}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
            {currentView === "Month" && (
                <div className="space-y-2 py-3">
                    <div>
                        {/* Day Number Select Input */}
                        <div className="flex flex-wrap">
                            <select
                                className="border border-gray-300 px-4 py-2 rounded w-full mb-4"
                                onChange={(e)=>{
                                    setValue(e.target.value);
                                }} // Handle selected day value
                            >
                                <option value="" disabled selected>
                                    Select Month
                                </option>
                                {Array.from({ length: 12 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Apply Button */}
                        <button
                            className="bg-black text-white px-4 py-2 rounded-md w-full mt-3"
                            onClick={() => {
                                submitdata(data); // Call submit function
                            }}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
            {currentView === "Year" && (
                <div className="space-y-2 py-3">
                    <div>
                        {/* Day Number Select Input */}
                        <div className="flex flex-wrap">
                            <select
                                className="border border-gray-300 px-4 py-2 rounded w-full mb-4"
                                onChange={(e)=>{
                                    setValue(e.target.value);
                                }} // Handle selected year value
                            >
                                <option value="" disabled selected>
                                    Select Year
                                </option>
                                {Array.from(
                                    { length: new Date().getFullYear() - 1900 + 1 },
                                    (_, index) => (
                                        <option key={1900 + index} value={1900 + index}>
                                            {1900 + index}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        {/* Apply Button */}
                        <button
                            className="bg-black text-white px-4 py-2 rounded-md w-full mt-3"
                            onClick={() => {
                                submitdata(data); // Call submit function
                            }}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}


        </div>
    )
}

export default BirthdayModal;