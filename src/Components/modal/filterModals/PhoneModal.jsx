import React from 'react'
import { useState } from 'react';

const PhoneModal = ({ setConditiontype, conditiontype, currentView, setCurrentView, previousFilter, setPreviousFilter, setSelectedFilter, settype }) => {
    const conditions = [
        "Empty_p",
        "Not_empty_p",
        "includes_p",
    ];
    const [data, setData] = useState("")
    const [value, setValue] = useState("")
    const datafilter = {
        includes_p: {
            title: "Includes",
            condition: "Includes",
            type: "Phone",
            label: "Phone Includes",
            variable:"phone",
            value:value

        },
        Empty_p: {
            title: "Empty",
            condition: "Empty",
            type: "Phone",
            label: "Multiple",
            value:"Empty",
            variable:"phone"
        },
        Not_empty_p: {
            title: "Not empty",
            condition: "Not empty",
            type: "Phone",
            label: "Multiple",
            value:"Not empty",
            variable:"phone"
        },

    }
    const submitdata = (condition) => {
        if(datafilter[condition]?.value){
            setConditiontype((prev) => [
                ...prev,
                datafilter[condition]
            ]);
            setCurrentView("Multiple")
        }

    };

    return (
        <div>
            {currentView === "Phone" && <div className="space-y-2">
                {conditions.map((condition, index) => (
                    <button
                        onClick={() => {
                            setCurrentView(datafilter[condition]?.label)
                            setPreviousFilter(currentView)
                            setSelectedFilter(datafilter[condition]?.label)
                            setData(condition);
                            if (datafilter[condition]?.title === "Empty" || datafilter[condition]?.title === "Not empty") {

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

            {currentView === "Phone Includes" && <div className="space-y-2 py-3">
                <div>
                    <div className="flex flex-warp">
                        <input
                            type="text"
                            placeholder={datafilter[data]?.title}
                            className="border border-gray-300 px-4 py-2 rounded w-full mb-4"
                            onChange={(e)=>{
                                setValue(e.target.value)
                            }}
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

export default PhoneModal;