import React from "react";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";

const CouponPreview = ({ alldata, designformData, openModal }) => {
  const { t } = useTranslation("couponpreview");
  return (
    <div>
      <div className="text-center">
        <p className="font-bold text-xl">{t("passSetting")}</p>
        {designformData && (
          <div className="pt-10 w-full max-w-md mx-auto">
            {/* Stamp Display */}
            <div className="mb-6 font-bold ">
              <p className="text-center text-4xl">
                {alldata?.cards[0].couponstatus}
              </p>
              <p className="text-center text-gray-600">{t("coupnstatus")}</p>
            </div>

            <div className="flex gap-1">
              <button
                disabled={alldata?.cards[0]?.couponstatus === "redeemed"}
                className={`w-full py-2 ${
                  alldata?.cards[0]?.couponstatus === "redeemed"
                    ? "text-black bg-gray-200 hover:bg-gray-300"
                    : "text-white bg-black hover:bg-gray-900"
                } rounded transition`}
                onClick={() => {
                  openModal("point");
                }}
              >
                {t("redeemcoupon")}
              </button>
            </div>
            <div className="mt-8">
              {designformData.cardExpirationFixedTermDate && (
                <div className="flex justify-between text-gray-500 py-2">
                  <p>{t("rewforfirstvisit")}</p>
                  <p>{designformData?.rewardForTheFirstVisit}</p>
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

export default CouponPreview;
