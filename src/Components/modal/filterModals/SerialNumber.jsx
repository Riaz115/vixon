import React from 'react'
import { useState } from 'react';

const SerialNumber = ({ setConditiontype, conditiontype, currentView, setCurrentView, previousFilter, setPreviousFilter, setSelectedFilter, settype }) => {
    const conditions = [
        "Empty",
        "serial_includes",
    ];



    
    const [data, setData] = useState("")
    const [value, setValue] = useState("")

    const datafilter = {
        serial_includes: {
            title: "Includes",
            condition: "Includes",
            type: "Card serial number",
            label: "Card serial number Includes",
            variable:"cardId",
            value: value
        },
        Empty: {
            title: "Empty",
            condition: "Empty",
            type: "Card serial number",
            label: "Card serial number Includes",
            variable:"cardId",
            value: "empty"
        },

    }

    const submitdata = (condition) => {
        if (conditiontype && datafilter[condition]?.value?.length > 0) {
            setConditiontype((prev) => [
                ...prev,
                datafilter[condition]
            ]);
            setCurrentView("Multiple")
            setValue("");
        }
    };

    return (
        <div>
            {currentView === "Card serial number" && <div className="space-y-2">
                {conditions.map((condition, index) => (
                    <button
                        onClick={() => {
                            setCurrentView(datafilter[condition]?.label)
                            setPreviousFilter(currentView)
                            setSelectedFilter(datafilter[condition]?.label)
                            setData(condition);
                            if (datafilter[condition]?.title === "Empty") {

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

            {currentView === "Card serial number Includes" && <div className="space-y-2 py-3">
                <div>
                    <div className="flex flex-warp">
                        <input
                            type="text"
                            placeholder={datafilter[data]?.title}
                            onChange={(e) => {
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


        </div>
    )
}

export default SerialNumber;