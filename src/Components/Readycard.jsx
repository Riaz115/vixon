import React from 'react';


const Readycard = () => {
    return (
        <div className="flex flex-col bg-gray-150 ">
            {/* Header */}
            <div className="w-full bg-white shadow text-center py-5">
                <h1 className="text-sm ">Cashback card Nº 1</h1>
            </div>

            <div className="text-center mt-8 z-10">
                <p className="text-gray-700 mt-1 font-bold">Your card is ready</p>
                <p className="text-gray-700  font-bold">Install into your e-wallet</p>
            </div>
            <div className="flex-grow flex my-auto justify-center  items-center mt-4 z-50">
                <div className="w-[280px] h-80 rounded-xl flex flex-col justify-center items-center relative">
                    <div
                        className="absolute inset-0 opacity-50"
                        style={{
                            backgroundImage: `url('/assets/ios.svg')`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>
                    {/* Grid of Small Boxes */}
                    <div className="grid grid-cols-4 gap-5 z-10 mt-7">
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex justify-center items-center">
                            <img
                                src="/assets/ios-icon.svg"
                                alt="Card Icon"
                                className="w-10 h-10"
                            />
                        </div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                        <div className="w-10 h-10 bg-white rounded-lg flex justify-center items-center"></div>
                       

                    </div>

                    {/* Text Below */}

                </div>
            </div>

            {/* Footer - Retry link */}
            <div className="text-center py-4">
                <p className="text-sm text-gray-600 underline">Can't find the card?</p>
                <button className="text-gray-600 underline">Try to add again</button>
            </div>
        </div>
    );
};

export default Readycard;
