import React, { useEffect } from "react";
import { FaMinus } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import Divider from "@mui/material/Divider";
// import TextField from '@mui/material/TextField';
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
const StampPreview = ({
  alldata,
  designformData,
  disableStampList,
  activeStampList,
  points,
  handleAddPoint,
  handleRedeemPoint,
  setPoints,
  setSection,
  isAdding,
  openModal,
  section,
  updatepoint,
}) => {
  const { t } = useTranslation("stamppreview");
  //console.log(alldata);

  useEffect(() => {
    // if (alldata?.cards[0]?.rewards === 1) {
    //     setSection("redeem")
    //     setPoints(1)
    // } else {
    //     setSection("point")
    //     setPoints(0)
    // }
  }, []);
  return (
    <div>
      <div className="text-center">
        <p className="font-bold text-xl">{t("passSetting")}</p>
        {designformData && (
          <div className="pt-10 w-full max-w-md mx-auto">
            {/* Stamp Display */}
            <div className="mt-2">
              {/* <div className="flex mx-6 gap-1 gap-y-2 justify-evenly flex-wrap">
                                <>
                                    {Array.from({ length: designformData?.selectedNumber >= alldata?.cards[0]?.remainingStamps + (designformData?.selectedNumber - alldata?.cards[0]?.totalStamps) ? alldata?.cards[0]?.consumedStamps : designformData?.selectedNumber }).map((_, index) => (
                                        <div key={index}

                                            style={{
                                                height: 48 - (Math.floor(designformData?.selectedNumber / 4) * 4),
                                                width: 48 - (Math.floor(designformData?.selectedNumber / 4) * 4),
                                                borderColor: designformData?.outlineColor,
                                                backgroundColor: designformData?.stampBgColor,
                                            }}
                                            className="border  flex justify-center  items-center rounded-full overflow-hidden">
                                            {designformData?.activeStampImg ?
                                                <img
                                                    src={designformData?.activeStampImg instanceof File || designformData?.activeStampImg instanceof Blob
                                                        ? URL.createObjectURL(designformData.activeStampImg)
                                                        : designformData?.activeStampImg}

                                                    alt="Selected"
                                                    className="w-full h-full object-cover object-center"

                                                />
                                                :
                                                <span
                                                    style={{ color: designformData.activeStampColor, fontSize: 24 - (Math.floor(designformData?.selectedNumber / 4) * 2), }}
                                                >{activeStampList[designformData.activeStampIcon]?.icon}</span>}

                                        </div>

                                    ))}
                                </>

                                {Array.from({ length: designformData?.selectedNumber - alldata?.cards[0]?.consumedStamps }).map((_, index) => (
                                    <div key={index}
                                        style={{
                                            height: 48 - (Math.floor(designformData?.selectedNumber / 4) * 4),
                                            width: 48 - (Math.floor(designformData?.selectedNumber / 4) * 4),
                                            borderColor: designformData?.outlineColor,
                                            backgroundColor: designformData?.stampBgColor,
                                        }}
                                        className="border  flex justify-center  items-center rounded-full overflow-hidden" aria-disabled={true}>
                                        {designformData.inactiveStampImg ? <img

                                            src={designformData?.inactiveStampImg instanceof File || designformData?.inactiveStampImg instanceof Blob
                                                ? URL.createObjectURL(designformData.inactiveStampImg)
                                                : designformData?.inactiveStampImg}
                                            alt="Selected"
                                            className="w-full h-full object-cover object-center"
                                        // onLoad={(e) => URL.revokeObjectURL(routeMap["Stamp"].keys.activeStampImg)}
                                        /> : <span
                                            style={{ color: designformData?.inActiveStampColor, fontSize: 24 - (Math.floor(designformData?.selectedNumber / 4) * 2) }}
                                            className="text-gray-400"
                                        >{disableStampList[designformData?.inactiveStampIcon]?.icon}</span>}
                                    </div>
                                ))}
                            </div> */}
              <div className="grid grid-cols-2 gap-2">
                <div
                  className="bg-[#36c6fa]  hover:bg-[#0073a9] p-8 rounded-xl w-[150px] text-white text-6xl cursor-pointer"
                  onClick={() => {
                    setPoints(1);
                    updatepoint(
                      {
                        amount: 0,
                        comment: "",
                      },
                      "point",
                      1
                    );
                  }}
                >
                  1
                </div>
                <div
                  className="bg-[#ff3859] hover:bg-[#fc5873] p-8 rounded-xl w-[150px] text-white text-6xl cursor-pointer"
                  onClick={() => {
                    setPoints(2);
                    updatepoint(
                      {
                        amount: 0,
                        comment: "",
                      },
                      "point",
                      2
                    );
                  }}
                >
                  2
                </div>
                <div
                  className="bg-[#fec009] hover:bg-[#ffcf3f] p-8 rounded-xl w-[150px] text-white text-6xl cursor-pointer"
                  onClick={() => {
                    setPoints(3);

                    updatepoint(
                      {
                        amount: 0,
                        comment: "",
                      },
                      "point",
                      3
                    );
                  }}
                >
                  3
                </div>
                <div
                  className="bg-[#67be39] hover:bg-[#7aeb3d] p-8 rounded-xl w-[150px] text-white text-6xl cursor-pointer"
                  onClick={() => {
                    setPoints(4);
                    updatepoint(
                      {
                        amount: 0,
                        comment: "",
                      },
                      "point",
                      4
                    );
                  }}
                >
                  4
                </div>
              </div>
            </div>

            <div className="mx-auto flex  gap-4">
              <div className="flex bg-[#eeeeef] mb-3 justify-center items-center p-4 gap-2 mt-10">
                <button
                  className="flex justify-center items-center cursor-pointer p-1 rounded-3xl transition"
                  onClick={handleRedeemPoint}
                  // disabled={section === "redeem"}
                >
                  <FaMinus className="text-xl text-red-500" />
                </button>

                <TextField
                  type="text"
                  value={points}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numbers and ensure the value is non-negative
                    if (/^\d*$/.test(value)) {
                      setPoints(Number(value));
                    }
                  }}
                  variant="standard"
                  inputProps={{
                    style: {
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "1.5rem",
                      textAlign: "center", // Center align text inside the field
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{
                    width: "60px", // Adjust width for proper spacing
                    textAlign: "center",
                  }}
                />

                <button
                  className="flex justify-center items-center cursor-pointer rounded-3xl p-1 transition"
                  onClick={() => {
                    setPoints(points + 1);
                  }}
                  // disabled={isAdding || section === "redeem"}
                >
                  <GoPlus className="text-2xl text-green-500" />
                </button>
              </div>

              <div
                onClick={() => {
                  // setPoints("point")
                  if (points > 0) {
                    setSection("point");
                    openModal("point");
                  }
                }}
                className="rounded-xl cursor-pointer  w-full bg-[#1f1e1f] flex justify-center items-center text-[#868686]   mb-3  p-4 gap-2 mt-10"
              >
                Uložiť
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1 mt-10">
              {/* <button
                                disabled={
                                    points === 0
                                }
                                className={`w-full py-2 ${(points === 0)
                                    ? "text-black bg-gray-200 hover:bg-gray-300"
                                    : "text-white bg-black hover:bg-gray-900"
                                    } rounded transition`}

                            >
                                Add Stamps
                            </button> */}
            </div>
            <div className="flex gap-1 mt-1">
              <button
                disabled={alldata?.cards[0].rewards === 0}
                className={`w-full py-2 ${
                  alldata?.cards[0].rewards === 0
                    ? "text-black bg-gray-200 hover:bg-gray-300"
                    : "text-white bg-black hover:bg-gray-900"
                } rounded transition`}
                onClick={() => {
                  setSection("redeem");
                  openModal("redeem");
                }}
              >
                {t("redemstemps")}
              </button>
            </div>

            {/* Point and Visit Information */}
            <div className="mt-8">
              {/* <div className='flex justify-between text-gray-500 py-2'>
                                <p>Active stamps</p>
                                <p>{alldata?.cards[0]?.consumedStamps}</p>
                            </div> */}
              <Divider />
              {/* <div className='flex justify-between text-gray-500 py-2'>
                                <p>Available stamps</p>
                                <p>{alldata?.cards[0]?.remainingStamps}</p>
                            </div> */}
              <Divider />
              <div className="flex justify-between text-gray-500 py-2">
                <p>{t("avreward")}</p>
                <p>{alldata?.cards[0].rewards}</p>
                {/* <p>{Math.floor((alldata?.cards[0]?.pendding + alldata?.cards[0]?.consumedStamps) / designformData?.selectedNumber)}</p> */}
              </div>
              <Divider />
              <div className="flex justify-between text-gray-500 py-2">
                <p>{t("avtotlstmps")}</p>
                <p>{`${alldata?.cards[0]?.availabletotalstamps || 0}/${
                  alldata?.cards[0]?.totalStamps || 0
                }`}</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-500 py-2">
                <p>{t("cardexdate")}</p>
                <p>---</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-500 py-2">
                <p>{t("serianlno")}</p>
                <p className="text-xs">{alldata?._id}</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-500 py-2">
                <p>{t("cardinstdate")}</p>
                <p>{new Date(alldata?.createdAt).toDateString()}</p>
              </div>
              <Divider />
              {/* <div className='flex justify-between text-gray-500 py-2'>
                                <p>Last accrual</p>
                                <p>{new Date(alldata?.cards[0]?.updatedAt).toDateString()}</p>
                            </div> */}
              <Divider />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StampPreview;
