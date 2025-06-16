import React from 'react'
import { useState } from 'react';

const NumberModal = ({ setConditiontype, conditiontype, currentView, setCurrentView, previousFilter, setPreviousFilter, setSelectedFilter }) => {
    const conditions = [
        "Greater_number",
        "Greater_equal_number",
        "Less_number",
        "Less_equal_number",
        "Equal_number",
        "Not_equal_number",
    ];

    


    const [data, setData] = useState("")
    const [value, setValue] = useState("")
    const datafilter = {
        Greater_number :{
            title: "Greater",
            type: "Number of stamps",
            label: "Number of stamps Greater",
            condition: "Greater",
            value: value,
            variable:"totalStamps"
        },
        Greater_equal_number: {
            title: "Greater than equal to",
            type: "Number of stamps",
            label: "Number of stamps Greater than or equal to",
            condition: "Greater than equal to",
            value: value,
            variable:"totalStamps"

        },
        Less_number: {
            title: "Less",
            type: "Number of stamps",
            label: "Number of stamps Less",
            condition: "Less",
            value: value,
            variable:"totalStamps"

        },
        Less_equal_number: {
            title: "Less than equal to",
            type: "Number of stamps",
            label: "Number of stamps Less than or equal to",
            condition: "Less than equal to",
            value:value,
            variable:"totalStamps"

        },
        Equal_number: {
            title: "Equal",
            type: "Number of stamps",
            label: "Number of stamps balance equal",
            condition: "Equal",
            value:value,
            variable:"totalStamps"
        },
        Not_equal_number: {
            title: "Not equal",
            type: "Number of stamps",
            label: "Number of stamps Not equal",
            condition: "Not equal",
            value:value,
            variable:"totalStamps"
        }
    }

    const submitdata = () => {
        if (conditiontype  && datafilter[data]?.value) {
            setConditiontype((prev) => [
                ...prev,
                datafilter[data]
            ]);
            setCurrentView("Multiple")
            setValue("");
        }
    };



    return (
        <div>
            {currentView === "Number of stamps" && <div className="space-y-2">
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
                            setValue(e.target.value)
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

export default NumberModal