import React from 'react'
import { useState } from 'react';

const UnusedModal = ({ setConditiontype, conditiontype, currentView, setCurrentView, previousFilter, setPreviousFilter, setSelectedFilter }) => {
    const conditions = [
        "Greater_unused",
        "Greater_equal_unused",
        "Less_unused",
        "Less_equal_unused",
        "Equal_unused",
        "Not_equal_unused",
    ];
    const [data, setData] = useState("")
    const [value, setValue] = useState("")

    const datafilter = {
        Greater_unused: {
            title: "Greater",
            type: "Unused rewards",
            label: "Unused rewards Greater",
            condition: "Greater",
            value: value,
            variable:"rewards"
        },
        Greater_equal_unused: {
            title: "Greater than equal to",
            type: "Unused rewards",
            label: "Unused rewards Greater than or equal to",
            condition: "Greater than equal to",
            value: value,
            variable:"rewards"

        },
        Less_unused: {
            title: "Less",
            type: "Unused rewards",
            label: "Unused rewards Less",
            condition: "Less",
            value: value,
            variable:"rewards"

        },
        Less_equal_unused: {
            title: "Less than equal to",
            type: "Unused rewards",
            label: "Unused rewards Less than or equal to",
            condition: "Less than equal to",
            value: value,
            variable:"rewards"

        },
        Equal_unused: {
            title: "Equal",
            type: "Unused rewards",
            label: "Unused rewards balance equal",
            condition: "Equal",
            value: value,
            variable:"rewards"
        },
        Not_equal_unused: {
            title: "Not equal",
            type: "Unused rewards",
            label: "Unused rewards Not equal",
            condition: "Not equal",
            variable:"rewards",
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
            {currentView === "Unused rewards" && <div className="space-y-2">
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
                        <span className="text-gray-700">{datafilter[condition]?.label}</span>
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
                        placeholder={datafilter[data]?.label}
                        onChange={(e)=>{
                            setValue(e.target.value);
                        }}
                        className="border border-gray-300 px-4 py-2 rounded w-full mb-4"
                    />
                    <button className="bg-black text-white px-4 py-2 rounded-md w-full" onClick={submitdata}>
                        Apply
                    </button>
                </div>

            </div>}
        </div>
    )
}

export default UnusedModal