import React from 'react'
import { useState } from 'react';

const BalanceModal = ({ setConditiontype, conditiontype, currentView, setCurrentView, previousFilter, setPreviousFilter, setSelectedFilter }) => {
    const conditions = [
        "Greater",
        "Greater_equal",
        "Less",
        "Less_equal",
        "Equal",
        "Not_equal",
    ];
    const [data, setData] = useState("")

    const [value,setValue]=useState("")
    

    const datafilter = {
        Greater: {
            title: "Greater",
            type: "Card balance",
            label: "Card balance Greater",
            condition: "Greater",
            variable:"rewards",
            value: value
        },
        Greater_equal: {
            title: "Greater than equal to",
            type: "Card balance",
            label: "Card balance Greater than or equal to",
            condition: "Greater than equal to",
            variable:"rewards",
            value: value

        },
        Less: {
            title: "Less",
            type: "Card balance",
            label: "Card balance Less",
            variable:"rewards",
            condition: "Less",
            value: value

        },
        Less_equal: {
            title: "Less than equal to",
            type: "Card balance",
            label: "Card balance Less than or equal to",
            condition: "Less than equal to",
            variable:"rewards",
            value: value

        },
        Equal: {
            title: "Equal",
            type: "Card balance",
            label: "Card balance equal",
            variable:"rewards",
            condition: "Equal",
            value: value
        },
        Not_equal: {
            title: "Not equal",
            type: "Card balance",
            variable:"rewards",
            label: "Card balance Not equal",
            condition: "Not equal",
            value: value
        }
    }

    const submitdata = () => {
        if (conditiontype && datafilter[data]?.value ) {
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
            {currentView === "Card balance" && <div className="space-y-2">
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
                            setValue(e?.target?.value)
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

export default BalanceModal