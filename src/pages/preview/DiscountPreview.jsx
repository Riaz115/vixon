import React from "react";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";

const DiscountPreview = ({
  alldata,
  designformData,
  points,
  setPoints,
  openModal,
  section,
  handleAddPoint,
  settotaldata,
  handleupdatediscount,
}) => {
  const { t } = useTranslation("discountpreview");
  const Transactionamount = alldata?.cards[0]?.discount?.Transactionamount;
  // //console.log(Transactionamount, "this is all data");

  const getMatchingTier = (amount) => {
    return designformData?.tiers
      ?.sort((a, b) => a.spendToAchieve - b.spendToAchieve)
      .findLast((tier) => amount >= tier.spendToAchieve);
  };
  const getNextTier = (amount) => {
    return designformData?.tiers?.find((tier) => amount < tier.spendToAchieve);
  };

  const matchedTier = getMatchingTier(Transactionamount);
  const nextTier = getNextTier(Transactionamount);

  // Calculate the savings based on entered points and the discount percentage
  const calculateSavings = (points, discountPercentage) => {
    if (points > 0 && discountPercentage > 0) {
      return (points * discountPercentage) / 100; // Calculate savings based on discount
    }
    return 0;
  };

  const savings = calculateSavings(points, matchedTier?.percentage);
  // //console.log(matchedTier, "Current Matched Tier");
  // //console.log(nextTier, "Next Tier");
  // //console.log(savings, "Calculated Savings");

  const adddiscount = () => {
    const match = getMatchingTier(Transactionamount + points);
    handleupdatediscount({
      discount: {
        discountstatus: match?.tierName,
        discountlevel: match?.percentage,
        totalsavings: alldata?.cards[0]?.discount.totalsavings + savings,
        Transactionamount:
          alldata?.cards[0]?.discount?.Transactionamount + Number(points),
      },
      Transactionamount: Number(points),
      saving: savings,
      discountstatus: matchedTier?.tierName,
    });
  };

  return (
    <div>
      <div className="text-center">
        <p className="font-bold text-xl">{t("passSetting")}</p>
        {designformData && (
          <div className="pt-10 w-full max-w-md mx-auto">
            {/* Stamp Display */}
            <div className="mb-6 font-bold ">
              <p className="text-center text-4xl">{matchedTier?.percentage}</p>
              <p className="text-center text-gray-600">{t("disclevel")}</p>
            </div>
            <div className="mx-auto flex flex-row bg-white mb-3 p-4">
              <div className="w-100 mx-auto">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={points}
                  onChange={(e) => {
                    setPoints(e.target.value);
                  }}
                  className="w-100 p-3 text-2xl text-center bg-gray-50 border-none rounded-3xl appearance-none focus:outline-none focus:ring-0"
                  placeholder={t("fillpuramount")}
                />
                <p>{t("fillpuramount")}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                disabled={points <= 0}
                className={`w-full py-2 ${
                  points === 0 && section === "point"
                    ? "text-black bg-gray-200 hover:bg-gray-300"
                    : "text-white bg-black hover:bg-gray-900"
                } rounded transition`}
                onClick={() => {
                  // openModal("point");
                  adddiscount();
                }}
              >
                {t("addpoints")}
              </button>
            </div>

            {/* Display the calculated savings */}
            <div className="mt-6 text-center text-gray-700">
              {points > 0 && matchedTier?.percentage > 0 && (
                <p>
                  {t("youwillsave")}: <strong>{savings.toFixed(2)}</strong>
                </p>
              )}
            </div>

            <div className="mt-8">
              <div className="flex justify-between text-gray-500 py-2">
                <p>{t("descstatus")}</p>
                <p>{matchedTier?.tierName}</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-500 py-2">
                <p>{t("currdesclevel")}</p>
                <p>{matchedTier?.percentage}%</p>
              </div>
              <Divider />
              {nextTier ? (
                <div className="flex justify-between text-gray-500 py-2">
                  <p>{t("tonextdislevel")}</p>
                  <p>{nextTier.spendToAchieve - Transactionamount} </p>
                </div>
              ) : (
                <div className="flex justify-between text-gray-500 py-2">
                  <p>{t("tonextdislevel")}</p>
                  <p>---</p>
                </div>
              )}
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

export default DiscountPreview;
