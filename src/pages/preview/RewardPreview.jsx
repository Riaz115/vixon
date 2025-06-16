import React, { useEffect, useTransition } from "react";
import { FaMinus } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const RewardPreview = ({
  alldata,
  designformData,
  points,
  setPoints,
  setSection,
  openModal,
  section,
  handleAddPoint,
  isAdding,
  handleRedeemPoint,
  purchaseAmount,
  setPurchaseAmount,
}) => {
  const { t } = useTranslation("rewardpreview");

  const [selectedIndex, setSelectedIndex] = useState(null);
  function floatToIntFloor(floatNum) {
    return Math.floor(floatNum);
  }

  const calculatePoints = (moneySpent, moneyForPoints, pointsGiven) => {
    const pointsPerDollar = pointsGiven / moneyForPoints;
    return floatToIntFloor(moneySpent * pointsPerDollar);
  };

  // Update both the purchase amount and the calculated points
  const onChangepoints = (e) => {
    const value = e.target.value;
    // Update the entered purchase amount (make sure to parse as number)
    const moneySpent = parseFloat(value) || 0;
    setPurchaseAmount(moneySpent);
    if (designformData?.UpperRadio === "spend") {
      const pointdata = calculatePoints(
        moneySpent,
        designformData?.spend.moneySpent,
        designformData?.spend.pointsGained
      );
      setPoints(pointdata);
    }
  };
  //console.log(designformData?.reward)

  useEffect(() => {
    setSelectedIndex(null);
  }, [section]);
  return (
    <div>
      <div className="text-center">
        <p className="font-bold text-xl">{t("rewSetting")}</p>
        {designformData && (
          <div className="pt-10 w-full max-w-md mx-auto">
            {/* Stamp Display */}
            <div className="mt-2">
              <div className="text-center">
                <p className="text-center text-bold text-[40px]">
                  {alldata?.cards[0]?.rewards}
                </p>
                <small className="text-center">{t("bonusbalance")}</small>
              </div>
            </div>

            <div className="mx-auto ">
              <div className="flex my-8 ">
                <button
                  className={`w-full py-2 ${
                    section === "point" ? "text-white bg-black" : "text-black"
                  }  rounded  transition`}
                  onClick={() => {
                    setSection("point");
                    setPoints(0);
                    // handleAddPoint();
                  }}
                >
                  {t("add")}
                </button>
                <button
                  className={`w-full py-2 ${
                    section === "redeem" ? "text-white bg-black" : "text-black"
                  }   transition`}
                  onClick={() => {
                    // Implement Redeem Point functionality if more complex logic is needed
                    // handleRedeemPoint();
                    setPoints(0);
                    setSection("redeem");
                  }}
                >
                  {t("redeem")}
                </button>
              </div>
              {section === "point" ? (
                <div>
                  <div className='flex bg-white mb-3 justify-between p-4 gap-2"'>
                    {designformData?.UpperRadio === "spend" ? (
                      <input
                        type="number"
                        step="0.01"
                        min={"0"}
                        // value={points}
                        value={purchaseAmount}
                        onChange={onChangepoints}
                        className="w-full p-3 text-2xl text-center bg-gray-50 border-none rounded-3xl appearance-none focus:outline-none focus:ring-0"
                        placeholder="Zadajte sumu nákupu"
                      />
                    ) : designformData.UpperRadio === "points" ? (
                      <input
                        type="number"
                        step="0.01"
                        min={"0"}
                        value={points}
                        onChange={(e) => {
                          setPoints(e.target.value);
                        }}
                        className="w-full p-3 text-2xl text-center bg-gray-50 border-none rounded-3xl appearance-none focus:outline-none focus:ring-0"
                        placeholder="Fill in the purchase Points"
                      />
                    ) : (
                      <>
                        <button
                          className="flex justify-center items-center cursor-pointer p-3 rounded-3xl bg-gray-50 hover:bg-gray-100 transition"
                          onClick={handleRedeemPoint}
                        >
                          <FaMinus className="text-xl text-red-500" />
                        </button>
                        <p className="text-2xl">{points}</p>
                        <button
                          className="flex justify-center items-center cursor-pointer rounded-3xl p-3 bg-gray-50 hover:bg-gray-100 transition"
                          onClick={handleAddPoint}
                          disabled={isAdding}
                        >
                          <GoPlus className="text-2xl text-green-500" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {designformData?.reward?.map((item, index) => {
                    const isSelected = selectedIndex === index;
                    return (
                      <div
                        key={index}
                        className={`border border-gray-200 rounded-lg p-4 flex justify-between items-center mb-4 
                                            ${
                                              isSelected
                                                ? "bg-blue-500 text-white"
                                                : "bg-white text-gray-900"
                                            } ${
                          item?.pointsEarned > alldata.cards[0]?.rewards
                            ? "hidden"
                            : ""
                        } cursor-pointer `}
                        onClick={() => {
                          setSelectedIndex(index);
                          setPoints(item?.pointsEarned);
                        }}
                      >
                        <div>
                          <p
                            className={`text-gray-900 ${
                              isSelected ? "text-white" : ""
                            }`}
                          >
                            {item?.pointsType === "Order (€ OFF)"
                              ? `$${item?.pointsValue} OFF`
                              : item?.pointsType === "Order (% OFF)"
                              ? `%${item?.pointsValue} OFF`
                              : item?.pointsValue}
                          </p>
                        </div>
                        <span
                          className={`text-gray-500 ${
                            isSelected ? "text-white" : ""
                          }`}
                        >
                          {item?.pointsEarned} {t("points")}
                        </span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <div className="flex gap-1">
              <button
                disabled={
                  (points === 0 && section === "point") ||
                  (points === 0 &&
                    section === "point" &&
                    designformData?.UpperRadio === "points") ||
                  (section === "point" &&
                    designformData?.UpperRadio === "visit" &&
                    designformData?.visit?.pointsPerVisit > points) ||
                  (section === "redeem" &&
                    points > alldata?.cards[0].rewards) ||
                  !points
                }
                className={`w-full py-2 ${
                  (points === 0 && section === "point") ||
                  (section === "redeem" &&
                    points > alldata?.cards[0].rewards) ||
                  points === 0 ||
                  (section === "point" &&
                    designformData?.UpperRadio === "visit" &&
                    designformData?.visit?.pointsPerVisit > points)
                    ? "text-black bg-gray-200 hover:bg-gray-300"
                    : "text-white bg-black hover:bg-gray-900"
                } rounded transition`}
                onClick={() => {
                  openModal(section);
                }}
              >
                {section === "redeem" ? t("redempoints") : t("addpoints")}
              </button>
            </div>

            <div className="mt-8">
              {designformData?.reward?.map((item, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <div>
                    <div
                      key={index}
                      className={`flex justify-between text-gray-500 py-2
                                            ${
                                              item?.pointsEarned >
                                              alldata.cards[0]?.rewards
                                                ? "hidden"
                                                : ""
                                            }`}
                    >
                      <div>
                        <p>{item?.levelName}</p>
                      </div>
                      <span>
                        {item?.pointsEarned}
                        {t("points")}
                      </span>
                    </div>
                    <Divider />
                  </div>
                );
              })}

              <div className="flex justify-between text-gray-500 py-2">
                <p>{t("avbalance")}</p>
                <p>{alldata?.cards[0]?.rewards}</p>
              </div>
              <Divider />
              {designformData.cardExpirationFixedTermDate && (
                <div className="flex justify-between text-gray-500 py-2">
                  <p>{t("cardexpdate")}</p>
                  <p>
                    {new Date(
                      designformData?.cardExpirationFixedTermDate
                    ).toDateString()}
                  </p>
                </div>
              )}
              <Divider />
              <div className="flex justify-between text-gray-500 py-2">
                <p>{t("cardinstdate")}</p>
                <p>{new Date(alldata?.createdAt).toDateString()}</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-500 py-2">
                <p>{t("lastaccural")}</p>
                <p>{new Date(alldata?.cards[0]?.updatedAt).toDateString()}</p>
              </div>
              <Divider />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardPreview;
