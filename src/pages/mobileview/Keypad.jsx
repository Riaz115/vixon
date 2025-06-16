import React, { useState } from "react";

const Keypad = ({ tab, setTab, updatepoint }) => {
    const [value, setValue] = useState("");

    const handleButtonClick = (buttonValue) => {
        if (buttonValue === "clear") {
            setValue("");
        } else if (buttonValue === "-") {
            setValue((prev) => {
                if (!isNaN(prev) && Number(prev) > 0) {
                    return String(Number(prev) - 1);
                }
                return prev;
            });
        } else if (buttonValue === "+") {
            setValue((prev) => {
                if (!isNaN(prev)) {
                    return String(Number(prev) + 1);
                }
                return prev;
            });
        } else {
            setValue((prev) => prev + buttonValue); // Concatenate the button value
        }
    };


    return (
        <div className="w-full">
        <div className="px-3 py-2">
            {/* Top Section */}
            <div className="grid grid-cols-3 gap-3 mb-2">
                <button
                    onClick={() => handleButtonClick("clear")}
                    className="w-[29.5vw] h-[10.1vh] bg-[#FAFAFA] border rounded-2xl flex py-5 px-2 items-center justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                        <line x1="18" y1="9" x2="12" y2="15" color="#36C6FA" />
                        <line x1="12" y1="9" x2="18" y2="15" color="#36C6FA" />
                    </svg>
                </button>
                <div className="px-2 py-4 w-[29.5vw] h-[10.1vh] bg-[#FAFAFA] border rounded-2xl">
                    <input
                        type="text"
                        placeholder="0"
                        className="text-center font-semibold border-b-2 text-4xl w-full border-gray-400 focus:outline-none"
                        value={value}
                        readOnly
                    />
                </div>
                <button
                    disabled={!Number(value)}
                    className={`px-4 w-[29.5vw] h-[10.1vh] py-5 ${
                        !Number(value) ? "bg-[#FAFAFA] border" : "text-white bg-[#1D1D1D]"
                    } rounded-2xl`}
                    onClick={() => {
                        updatepoint(
                            {
                                amount: 0,
                                comment: "",
                            },
                            "point",
                            Number(value)
                        );
                        setTab(false);
                    }}
                >
                    Pridať
                </button>
            </div>
            {/* Keypad */}
            <div className="grid grid-cols-3 gap-1 w-full">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "-", 0, "+"].map((item) => (
                    <button
                        key={item}
                        onClick={() => handleButtonClick(item.toString())}
                        className="w-[29.5vw] h-[10.1vh] bg-[#FAFAFA] border rounded-2xl shadow-sm text-3xl font-semibold"
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    </div>
    
    );
};

export default Keypad;
