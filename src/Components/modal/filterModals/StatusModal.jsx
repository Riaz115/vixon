import { Equal } from 'lucide-react';
import React from 'react'
import { useState } from 'react';

const StatusModal = ({ setConditiontype, conditiontype, currentView, setCurrentView, previousFilter, setPreviousFilter, setSelectedFilter, settype }) => {
    const conditions = [
        "Equal",
    ];

    const [selected, setSelected] = useState();

    const [data, setData] = useState("")

    const datafilter = {
        Equal: {
            title: "Equal",
            type: "Card status",
            label: "Equal",
            variable:"status",
            condition: selected ? selected : "",
            value:selected 
        },
    }
    const submitdata = () => {
        if (conditiontype && datafilter[data]?.value) {
            setConditiontype((prev) => [
                ...prev,
                datafilter[data]
            ]);
            setCurrentView("Multiple")
            setSelected("")
        }
    };








    return (
        <div>
            {currentView === "Card status" && <div className="space-y-2">
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

            {currentView === "Equal" && <div className="space-y-2 py-3">
                <div>
                    <div className="flex flex-warp">
                        <select
                            className="border border-gray-300  py-2  rounded w-full mb-4"
                            onChange={(e) => {
                                setSelected(e.target.value);
                            }}
                        >
                            <option value="" disabled selected>
                                {datafilter[data]?.title || "Select an option"}
                            </option>
                            <option value="installed">Installed</option>
                            <option value="Not installed">Not installed</option>
                        </select>

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

export default StatusModal;