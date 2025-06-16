import React from 'react'
import { useState } from 'react';

const NameModal = ({ setConditiontype, conditiontype, currentView, setCurrentView, previousFilter, setPreviousFilter, setSelectedFilter, settype }) => {
    const conditions = [
        "Empty_n",
        "Not_empty_n",
        "includes_n",
    ];






    
    const [data, setData] = useState("")
    const [value, setValue] = useState("")
    const datafilter = {
        includes_n: {
            title: "Includes",
            condition: "Includes",
            type: "Name",
            label: "Name Includes",
            value:value,
            variable:"first_name"
        },
        Empty_n: {
            title: "Empty",
            condition: "Empty",
            type: "Name",
            label: "Multiple",
            value:"Empty",
            variable:"first_name"
        },
        Not_empty_n: {
            title: "Not empty",
            condition: "Not empty",
            type: "Name",
            label: "Multiple",
            value:"Not empty",
            variable:"first_name"
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
            {currentView === "Name" && <div className="space-y-2">
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

            {currentView === "Name Includes" && <div className="space-y-2 py-3">
                <div>
                    <div className="flex flex-warp">
                        <input
                            type="text"
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


        </div>
    )
}

export default NameModal;