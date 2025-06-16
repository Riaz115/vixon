import React from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full sm:w-[24rem]">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        <span className="text-black">VEX</span>
                        <span className="text-[#36C6FA]">i</span>ON{" "}
                        <span className="text-[#36C6FA]">cards</span>
                    </h1>
                    <h2 className="mt-[10rem] md:mt-6 lg:mt-6 xl:mt-6 text-3xl font-semibold">
                        Vitajte späť
                    </h2>
                    <p className="mt-[2rem] lg:mt-2 md:mt-2 text-gray-600">
                        <span className="font-bold">Prihláste </span>sa do svojho účtu
                    </p>
                </div>

                <div className="border-t-2 border-[#AAAAAA] rounded-t-2xl sm:border-none lg:border-none md:mt-1 mt-[2rem]">
                    <div className="mt-4 mx-4 flex flex-col justify-center items-center gap-3">
                        <button
                            onClick={() => navigate("/resetsendmail")}
                            className="w-full px-4 py-2 text-sm text-white bg-[#36C6FA] rounded-md"
                            >
                            Prvýkrát prihlásiť
                        </button>
                        <button
                            onClick={() => navigate("/User-login")}
                            className="w-full px-4 py-2 text-sm text-white bg-black rounded-md "
                        >
                            Prihlásiť sa s heslom
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Redirect;