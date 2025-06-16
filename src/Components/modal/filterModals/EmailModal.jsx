// EmailModal.jsx
import React, { useState, useEffect } from 'react';

const EmailModal = ({
                        setConditiontype,
                        conditiontype,
                        currentView,
                        setCurrentView,
                        previousFilter,
                        setPreviousFilter,
                        setSelectedFilter,
                        settype
                    }) => {
    const conditions = [
        "Empty_e",
        "Not_empty_e",
        "Includes_e",
    ];

    const [inputValue, setInputValue] = useState("");

    const datafilter = {
        Includes_e: {
            title: "Includes",
            condition: "Includes",
            type: "Email",
            label: "Email Includes",
            variable: "email",
            value: inputValue
        },
        Empty_e: {
            title: "Empty",
            condition: "Empty",
            type: "Email",
            label: "Email Is Empty",
            variable: "email",
            value: "Empty"
        },
        Not_empty_e: {
            title: "Not Empty",
            condition: "Not Empty",
            type: "Email",
            label: "Email Is Not Empty",
            variable: "email",
            value: "Not Empty"
        },
    };

    // Debugging: Log current state
    useEffect(() => {
        console.log("EmailModal - currentView:", currentView);
        console.log("EmailModal - inputValue:", inputValue);
    }, [currentView, inputValue]);

    const submitData = (condition) => {
        const filter = datafilter[condition];
        if (filter) {
            // Validate input for Includes condition
            if (condition === "Includes_e" && inputValue.trim() === "") {
                alert("Please enter a value to include.");
                return;
            }

            setConditiontype((prev) => [
                ...prev,
                {
                    type: filter.type,
                    label: filter.label,
                    condition: filter.condition,
                    value: condition === "Includes_e" ? inputValue : filter.value
                }
            ]);
            setCurrentView("Multiple");
            setSelectedFilter(filter.label);
            setInputValue("");
        }
    };

    return (
      <div>
          {/* Main View: "Email" */}
          {currentView === "Email" && (
            <div className="space-y-2">
                {conditions.map((condition, index) => (
                  <button
                    onClick={() => {
                        const selectedCondition = datafilter[condition];
                        setCurrentView(selectedCondition.label);
                        setPreviousFilter(currentView);
                        setSelectedFilter(selectedCondition.label);
                        if (selectedCondition.title === "Empty" || selectedCondition.title === "Not Empty") {
                            submitData(condition);
                        }
                    }}
                    key={index}
                    className="w-full text-left px-4 py-3 border rounded-md hover:bg-gray-100 transition duration-200 flex items-center justify-between"
                  >
                      <span className="text-gray-700">{datafilter[condition].title}</span>
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
            </div>
          )}

          {/* Sub-View: "Email Includes" */}
          {currentView === "Email Includes" && (
            <div className="space-y-2 py-3">
                <div>
                    <div className="flex flex-wrap">
                        <input
                          type="text"
                          placeholder="Enter email substring"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="border border-gray-300 px-4 py-2 rounded w-full mb-4"
                        />
                    </div>
                    <button
                      className="bg-black text-white px-4 py-2 rounded-md w-full mt-3"
                      onClick={() => submitData("Includes_e")}
                      disabled={inputValue.trim() === ""}
                    >
                        Apply
                    </button>
                </div>
            </div>
          )}
      </div>
    );
};

export default EmailModal;
