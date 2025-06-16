import React from 'react'
import { useState } from 'react';
const NumberOfUses = ({ setConditiontype, conditiontype, currentView, setCurrentView, previousFilter, setPreviousFilter, setSelectedFilter }) => {
    const conditions = [
        "N_Greater",
        "N_Greater_equal",
        "N_Less",
        "N_Less_equal",
        "N_Equal",
        "N_Not_equal",
    ];
    const [data, setData] = useState("")
    const [value,setValue]=useState("")
    

    const datafilter = {
        N_Greater: {
            title: "Greater",
            type: "Current number of uses",
            label: "Current number of uses Greater",
            condition: "Greater",
            variable:"consumedStamps",
            value: value
        },
        N_Greater_equal: {
            title: "Greater than equal to",
            type: "Current number of uses",
            label: "Current number of uses Greater than or equal to",
            condition: "Greater than equal to",
            variable:"consumedStamps",
            value: value

        },
        N_Less: {
            title: "Less",
            type: "Current number of uses",
            label: "Current number of uses Less",
            condition: "Less",
            variable:"consumedStamps",
            value: value

        },
        N_Less_equal: {
            title: "Less than equal to",
            type: "Current number of uses",
            label: "Current number of uses Less than or equal to",
            condition: "Less than equal to",
            variable:"consumedStamps",
            value: value

        },
        N_Equal: {
            title: "Equal",
            type: "Current number of usese",
            label: "Current number of uses equal",
            condition: "Equal",
            variable:"consumedStamps",
            value: value
        },
        N_Not_equal: {
            title: "Not equal",
            type: "Current number of uses",
            label: "Current number of uses Not equal",
            condition: "Not equal",
            variable:"consumedStamps",
            value: value
        }
    }
    const submitdata = () => {
        if (conditiontype && datafilter[data]?.value) {
            setConditiontype((prev) => [
                ...prev,
                datafilter[data]
            ]);
            setCurrentView("Multiple")
            setValue("")
        }
    };
    return (
        <div>
            {currentView === "Current number of uses" && <div className="space-y-2">
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
                    <input
                        type="number"
                        placeholder={datafilter[data]?.title}
                        className="border border-gray-300 px-4 py-2 rounded w-full mb-4"
                        onChange={(e)=>{
                            setValue(e.target.value);
                        }}
                    />
                    <button className="bg-black text-white px-4 py-2 rounded-md w-full" onClick={submitdata}>
                        Apply
                    </button>
                </div>

            </div>}


        </div>
    )
}

export default NumberOfUses;