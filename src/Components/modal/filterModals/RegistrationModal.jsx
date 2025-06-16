import React, { useEffect } from 'react'
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main CSS file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file
const RegistrationModal = ({ setConditiontype, conditiontype, currentView, setCurrentView, previousFilter, setPreviousFilter, setSelectedFilter }) => {
    const conditions = [
        "R_Greater",
        "R_Greater_equal",
        "R_Less",
        "R_Less_equal",
        "R_Equal",
        "R_Not_equal",
        "R_Between",
        "R_Week",
    ];


    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const [data, setData] = useState("")
    const [value, setValue] = useState("")
    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    const handleSelect = (ranges) => {
        setSelectionRange(ranges.selection);
        const formatted = `${formatDate(ranges?.selection?.startDate)} - ${formatDate(ranges?.selection?.endDate)}`;
        setValue(formatted);
    };


    const datafilter = {
        R_Greater: {
            title: "Greater",
            type: "Registration date",
            label: "Registration date Greater",
            condition: "Greater",
            variable:"createdAt",
            value: value
        },
        R_Greater_equal: {
            title: "Greater than equal to",
            type: "Registration date",
            label: "Registration date Greater than or equal to",
            condition: "Greater than equal to",
            variable:"createdAt",
            value: value

        },
        R_Less: {
            title: "Less",
            type: "Registration date",
            label: "Registration date Less",
            condition: "Less",
            variable:"createdAt",
            value: value

        },
        R_Less_equal: {
            title: "Less than equal to",
            type: "Registration date",
            label: "Registration date Less than or equal to",
            condition: "Less than equal to",
            variable:"createdAt",
            value: value

        },
        R_Equal: {
            title: "Equal",
            type: "Registration date",
            label: "Registration date equal",
            condition: "Equal",
            variable:"createdAt",
            value: value
        },
        R_Not_equal: {
            title: "Not equal",
            type: "Registration date",
            label: "Registration date Not equal",
            condition: "Not equal",
            variable:"createdAt",
            value: value
        },
        R_Between: {
            title: "Between",
            type: "Registration date",
            label: "Registration date Between",
            condition: "Between",
            variable:"createdAt",
            value: value
        },
        R_Week: {
            title: "Week",
            type: "Registration date",
            label: "Registration date Week",
            condition: "week",
            variable:"createdAt",
            value: "week"
        }
    }


    const submitdata = () => {
        if (conditiontype && datafilter[data]?.value?.length) {
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
            {currentView === "Registration date" && <div className="space-y-2 ">
                {conditions.map((condition, index) => (
                    <button
                        onClick={() => {
                            setPreviousFilter(currentView)
                            setSelectedFilter(datafilter[condition]?.label)
                            setData(condition);
                            if (datafilter[condition]?.title === "Week") {

                                setTimeout(() => {
                                    if (!conditiontype) {
                                        settype("and")
                                    }
                                    submitdata(condition);
                                }, 1000);
                            }
                            setCurrentView(datafilter[condition]?.label)

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

            {currentView === datafilter[data]?.label && datafilter[data]?.tile !== "Week" && <div className=" flex justify-center w-full">
                <div className='w-full '>
                    {currentView !== "Registration date Between" ? <input
                        type="date"
                        placeholder={datafilter[data]?.title}
                        className="border border-gray-300 px-4 py-2 rounded w-full mb-4"
                        onChange={(e) => {
                            setValue(e.target?.value)

                        }}
                    /> :
                        <DateRange
                            className='mx-auto w-full'
                            ranges={[selectionRange]}
                            onChange={handleSelect}
                        />}
                    <button className="bg-black text-white px-4 py-2 rounded-md w-full" onClick={submitdata}>
                        Apply
                    </button>
                </div>

            </div>}


        </div>
    )
}

export default RegistrationModal;