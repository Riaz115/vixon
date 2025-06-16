import React from "react";
import CardType from "./CardType";
import StampsSettingsRebuild from "./stamps/StampsSettingsRebuild";
import RewardSettings from "./reward/RewardSettings";
import DiscountSettings from "./discount/DiscountSettings";
import CouponSettings from "./coupon/CouponSettings";
import MembershipSettingsRebuild from "./membership/MembershipSettingsRebuild";
import GiftSettings from "./gift/GiftSettings";
import JointInformation from "./JointPages/JointInformation";
import JointDesign from "./JointPages/JointDesign";
const Stepperview = ({ data, t }) => {
  switch (data.stepper) {
    case "cardtype":
      return (
        <CardType
          globalCard={data.globalCard}
          handleSelectCardType={data.handleSelectCardType}
          handleSelect={data.handleSelect}
          cardsActive={data.cardsActive}
          setCardsActive={data.setCardsActive}
          CardType={data.component}
        />
      );
    case "setting":
      return (
        <>
          {data.component === "Stamp" ? (
            <StampsSettingsRebuild
              t={t}
              handleSelectSetting={data.handleSelectSetting}
              state={data.designdata}
              setState={data.setDesigndata}
              errors={data?.errors}
              setErrors={data?.setErrors}
              cardid={data?.cardid}
              id={data?.id}
            />
          ) : data.component === "Reward" ? (
            <RewardSettings
              t={t}
              handleSelectSetting={data.handleSelectSetting}
              state={data.designdata}
              setState={data.setDesigndata}
              errors={data?.errors}
              setErrors={data?.setErrors}
              cardid={data?.cardid}
              id={data?.id}
            />
          ) : data.component === "Discount" ? (
            <DiscountSettings
              t={t}
              handleSelectSetting={data.handleSelectSetting}
              state={data.designdata}
              setState={data.setDesigndata}
              cardid={data?.cardid}
              id={data?.id}
            />
          ) : (
            <CouponSettings
              t={t}
              handleSelectSetting={data.handleSelectSetting}
              state={data.designdata}
              setState={data.setDesigndata}
              cardid={data?.cardid}
              id={data?.id}
            />
          )}
        </>
      );
    case "design":
      return (
        <JointDesign
          t={t}
          cardName={data.component}
          handleSelectDesign={data.handleSelectDesign}
          state={data.designdata}
          setState={data.setDesigndata}
        />
      );
    case "information":
      return (
        <>
          {
            <JointInformation t={t}
              cardName={data.component}
              state={data.designdata}
              setState={data.setDesigndata}
              countrydata={data?.countrydata}
              handleSelectInformation={data.handleSelectInformation}
            />
          }
        </>
      );

    case "preview":
      return <>{t("firstprv")}</>;
    default:
      return <>{t("secondprv")}</>;
  }
};

export default Stepperview;
