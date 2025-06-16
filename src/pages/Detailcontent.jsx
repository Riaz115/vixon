import React, { useRef, useEffect, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";

const Defaultcontent = ({
  designformData,
  activeStampList,
  disableStampList,
  cardType,
  routeMap,
  alldata,
}) => {
  const { t } = useTranslation("androiddetail");
  function getFieldValueByName(customer, fieldName, data) {
    const Transactionamount = customer?.cards[0]?.discount?.Transactionamount;
    const getNextTier = (amount) => {
      return data?.tiers?.find((tier) => amount < tier.spendToAchieve);
    };

    const nextTier = getNextTier(Transactionamount);
    switch (fieldName) {
      case "First Name":
        return "Tester";
      case "Last Name":
        return "Vexion";
      case "Email":
        return customer?.email || "example@gmail.com";
      case "Phone":
        return customer?.phone || "9128374651212";
      case "Date of Birth":
        return new Date(customer?.date_of_birth)?.toLocaleDateString() || "N/A";
      case "Available Reward":
        return "0";
      case "Reward":
        return "0";
      case "Summary stamps count":
        return "0";
      case "Stamps until the reward":
        return "0";
      case "Expiration Date":
        return (
          ` ${new Date(
            data?.cardExpirationFixedTermDate
          )?.toLocaleDateString()}` || "--------"
        );

      case "Spend to rich next level":
        return `${nextTier?.spendToAchieve - Transactionamount}` || "0";
      case "Discount status":
        return (
          ` ${customer?.cards[0]?.discount?.discountstatus}` ||
          `${data?.tiers[0]?.tierName}`
        );
      case "Discount percentage":
        return (
          `${customer?.cards[0]?.discount?.discountlevel}%` ||
          `${data?.tiers[0]?.percentage}%`
        );
      case "Reward for the first visit":
        return `${data?.rewardForTheFirstVisit}` || "1";
      default:
        return "N/A";
    }
  }

  function getSelectedNumber() {
    let gridNumber = designformData.selectedNumber;

    if (gridNumber <= 5) {
      return `grid-cols-${gridNumber}`;
    }

    if (gridNumber < 15) {
      //console.log("gridNumber < 15", designformData.selectedNumber);
      return `grid-cols-${Math.ceil(gridNumber / 2)}`;
    }
    if (gridNumber > 20 && gridNumber <= 21) {
      // New condition for values between 21 and 28
      //console.log("Handling values 21 to 28", designformData.selectedNumber);
      return `grid-cols-7`; // Adjusted to divide by 4 to control column count
    }
    if (gridNumber > 21 && gridNumber < 25) {
      // New condition for values between 21 and 28
      //console.log("Handling values 21 to 28", designformData.selectedNumber);
      return `grid-cols-8`;
    }
    if (gridNumber >= 25 && gridNumber < 28) {
      // New condition for values between 21 and 28
      //console.log("Handling values 21 to 28", designformData.selectedNumber);
      return `grid-cols-9`;
    }

    if (designformData.selectedNumber % 3 === 0) {
      //console.log("designformData.selectedNumber % 3 === 0", designformData.selectedNumber);
      return `grid-cols-${Math.ceil(gridNumber / 3)}`;
    }

    //console.log("designformData.selectedNumber", designformData.selectedNumber);
    //console.log("Calculated columns:", Math.ceil(designformData.selectedNumber / 3).toString().trim());
    return `grid-cols-${Math.ceil(gridNumber / 3)}`;
  }
  const containerRef = useRef(null);
  const [stampSize, setStampSize] = useState(50);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      // Adjust the stamp size based on container height, you can modify this logic
      const newStampSize = Math.min(containerHeight / 5, 50);
      setStampSize(newStampSize);
    }
  }, [containerRef.current]);

  //console.log(designformData, "this is design form data")

  return (
    <div className="flex jsutify-content-center mx-1 rounded-lg h-full ">
      <div
        style={{ color: "black", backgroundColor: "white" }}
        className="hide-scrollbar   w-full overflow-y-auto w-full rounded-lg px-2"
      >
        <p className="text-[13px] font-bold m-2">{t("detail")}</p>

        <div className="">
          <div
            id="cardImage"
            style={{
              backgroundColor: designformData?.stampbackground
                ? ""
                : (designformData?.cardType === "Stamp" &&
                    designformData?.bgUnderStampsColor) ||
                  designformData?.backgroundColorFortheCenterPart,
              backgroundImage: designformData?.stampbackground
                ? `url(${
                    designformData?.stampbackground instanceof File ||
                    designformData?.stampbackground instanceof Blob
                      ? URL.createObjectURL(designformData?.stampbackground)
                      : designformData?.stampbackground
                  })`
                : "",
              backgroundPosition: designformData?.stampbackground
                ? "center"
                : "",
              backgroundSize: designformData?.stampbackground ? "contain" : "",
              height: "110px",
            }}
            className="py-1 flex justify-center"
          >
            {cardType === "Stamp" ? (
              <div
                className={
                  designformData.selectedNumber == 2
                    ? `flex   flex-wrap px-2  gap-1 w-full   strach justify-center`
                    : `grid ${getSelectedNumber()} w-full gap-y-1 gap-x-1 h-full  items-center justify-items-center px-2 `
                }
              >
                {/* Active Stamps */}
                {Array.from({
                  length:
                    designformData.selectedNumber >= designformData.active
                      ? designformData.active
                      : designformData.selectedNumber,
                }).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      height:
                        designformData?.selectedNumber <= 19
                          ? Math.ceil(
                              42 -
                                Math.floor(designformData?.selectedNumber / 4) *
                                  4
                            )
                          : "1.3rem",
                      width:
                        designformData?.selectedNumber <= 19
                          ? Math.ceil(
                              42 -
                                Math.floor(designformData?.selectedNumber / 4) *
                                  4
                            )
                          : "1.3rem",
                      backgroundColor: designformData?.stampBgColor,
                      borderColor: designformData?.outlineColor,
                    }}
                    className="border  flex justify-center items-center rounded-full overflow-hidden"
                  >
                    {designformData?.activeStampImg ? (
                      <img
                        src={
                          designformData?.activeStampImg instanceof File ||
                          designformData?.activeStampImg instanceof Blob
                            ? URL.createObjectURL(designformData.activeStampImg)
                            : designformData?.activeStampImg
                        }
                        alt="Selected"
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <span
                        style={{
                          color: designformData.activeStampColor,
                          fontSize: `${
                            24 -
                            Math.floor(designformData?.selectedNumber / 4) * 2
                          }px`,
                        }}
                      >
                        {activeStampList[designformData.activeStampIcon]?.icon}
                      </span>
                    )}
                  </div>
                ))}

                {/* Inactive Stamps */}
                {Array.from({
                  length:
                    designformData.selectedNumber > designformData.active
                      ? designformData.selectedNumber - designformData?.active
                      : 0,
                }).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      height:
                        designformData?.selectedNumber <= 19
                          ? Math.ceil(
                              42 -
                                Math.floor(designformData?.selectedNumber / 4) *
                                  4
                            )
                          : "1.3rem",
                      width:
                        designformData?.selectedNumber <= 19
                          ? Math.ceil(
                              42 -
                                Math.floor(designformData?.selectedNumber / 4) *
                                  4
                            )
                          : "1.3rem",
                      backgroundColor: designformData?.stampBgColor,
                      borderColor: designformData?.outlineColor,
                    }}
                    className="border  flex justify-center items-center rounded-full overflow-hidden "
                    aria-disabled={true}
                  >
                    {designformData.inactiveStampImg ? (
                      <img
                        src={
                          designformData?.inactiveStampImg instanceof File ||
                          designformData?.inactiveStampImg instanceof Blob
                            ? URL.createObjectURL(
                                designformData.inactiveStampImg
                              )
                            : designformData?.inactiveStampImg
                        }
                        alt="Inactive"
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <span
                        style={{
                          color: designformData?.inActiveStampColor,
                          fontSize: `${
                            24 -
                            Math.floor(designformData?.selectedNumber / 4) * 2
                          }px`,
                        }}
                        className="text-gray-400"
                      >
                        {
                          disableStampList[designformData?.inactiveStampIcon]
                            ?.icon
                        }
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-xs sm:text-sm md:text-base lg:text-xs">
                <h2>{routeMap[cardType]?.keys?.bg}</h2>
              </div>
            )}
          </div>
        </div>

        <div className="py-4 px-3 mt-2  rounded-md">
          <hr className="my-4" />
          <p className="font-bold text-[12px]">{t("firstname")}</p>
          <p className="text-[12px]">
            {getFieldValueByName(alldata, "First Name", designformData)}
          </p>
          <hr className="my-4" />
          <p className="font-bold text-[12px]">{t("last")}</p>
          <p className="text-[12px]">
            {getFieldValueByName(alldata, "Last Name", designformData)}
          </p>
          <hr className="my-4" />
          <p className="font-bold text-[12px]">{t("phone")}</p>
          <p className="text-[12px]">
            {getFieldValueByName(alldata, "Phone", designformData)}
          </p>
          <hr className="my-4" />
          <p className="font-bold text-[12px]">{t("email")}</p>
          <p className="text-[12px]">
            {getFieldValueByName(alldata, "Email", designformData)}
          </p>

          {cardType === "Stamp" ? (
            <div>
              <hr className="my-4" />
              <p className="font-bold text-[12px]">{t("sumstamcount")}</p>
              <p className="text-[12px]">0</p>
              <hr className="my-4" />
              <p className="font-bold text-[12px]">{t("stampuntilrew")}</p>
              <p className="text-[12px]">
                {designformData?.selectedNumber || "0"}
              </p>
              <hr className="my-4" />
              <p className="font-bold text-[12px]">{t("avialablereward")}</p>
              <p className="text-[12px]">{alldata?.cards[0]?.rewards || "0"}</p>
            </div>
          ) : cardType === "Discount" ? (
            <div>
              <hr className="my-4" />
              <p className="font-bold text-[12px]">{t("descstatus")}</p>
              <p className="text-[12px]">
                {designformData?.tiers[0]?.tierName}
              </p>

              <hr className="my-4" />
              <p className="font-bold text-[12px]">{t("descper")}</p>
              <p className="text-[12px]">
                {designformData?.tiers[0]?.percentage}%
              </p>
            </div>
          ) : cardType === "Coupon" ? (
            <div>
              <hr className="my-4" />
              <p className="font-bold text-[12px]">{t("rewforfirstvisit")}</p>
              <p className="text-[12px]">
                {getFieldValueByName(
                  alldata,
                  "Reward for the first visit",
                  designformData
                )}
              </p>
            </div>
          ) : (
            <div>
              <hr className="my-4" />
              <p className="font-bold text-[12px]">{t("avialablereward")}</p>
              {/* <p className="text-[12px]">{alldata?.cards[0]?.rewards}</p> */}
            </div>
          )}

          <p className="text-[12px] mt-3">
            {" "}
            <a href="talha">{t("companyname")}</a>{" "}
          </p>
          <p className="text-[13px] text-gray-400  hover:text-gray-800">
            {designformData?.companyName}
          </p>
          {/* <p className="text-[12px] mt-3">Reward details</p>
                    <p className="text-[13px] text-gray-400  hover:text-gray-800">{designformData?.rewardDetails}</p> */}
          <p className="text-[12px] mt-3">{t("earnstampmsgs")}</p>
          <p className="text-[13px] text-gray-400  hover:text-gray-800">
            {designformData?.earnedStampMessage}
          </p>
          <p className="text-[12px] mt-3">{t("earnrewmsg")}</p>
          <p className="text-[13px] text-gray-400  hover:text-gray-800">
            {designformData?.earnedRewardMessage}
          </p>
          <hr className="my-4" />

          {/* <p className="font-bold text-[12px] mt-3">Referral program</p>
          <p className="text-[12px]">{designformData?.referralProgram}</p> */}

          {/* {designformData?.referralProgram === "active" ? (
            <>
              <p className="font-bold text-[12px] mt-3">
                Get bonus at the moment when
              </p>
              <p className="text-[12px]">
                {designformData?.bonusMoment === "first_visit" ? (
                  <>First visit / card use by a new customer</>
                ) : designformData?.bonusMoment === "new_customer" ? (
                  <>Card issuing to a new customer</>
                ) : (
                  <>select radio button</>
                )}
              </p>
            </>
          ) : (
            <></>
          )} */}
          {/* <hr className="my-4" />

          {designformData?.activeLinks?.length > 0 && <p className="font-bold text-[12px] mt-3">Active Links</p>}
          <p className="text-[12px]">
            {designformData?.activeLinks?.map((value, index) => {
              return (
                <div key={index}>
                  <a
                    className="text-blue-400"
                    href={ensureProtocol(value.link)}
                    target="_blank"
                    rel="noopener noreferrer"

                  >
                    {value.text}
                  </a>
                  <br />
                </div>
              );
            })}
          </p> */}
          {/* <hr className="my-4" /> */}
          {designformData?.termsOfUseSwitch === false ? (
            ""
          ) : (
            <p className="text-[12px] mt-3">{t("termofuse")}</p>
          )}

          {designformData?.termsOfUseSwitch === false ? (
            ""
          ) : (
            <p
              style={{
                whiteSpace: "pre-wrap", // Preserves newlines and spaces
                wordWrap: "break-word", // Ensures long words wrap properly
              }}
              className="text-[13px] text-gray-400  hover:text-gray-800"
            >
              {designformData?.termsOfUse}
            </p>
          )}

          {/* {designformData?.feedBackLinks?.length > 0 && <p className="font-bold text-[12px] mt-3">Feedback Links</p>}
          <p className="text-[12px]">
            {designformData?.feedBackLinks?.map((value, index) => {
              return (
                <>
                  <a
                    className="text-blue-400"
                    href={ensureProtocol(value.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    {value.service}
                  </a>
                  <br />
                </>
              );
            })}
          </p> */}
          {/* <hr className="my-4" />


          <hr className="my-4" /> */}

          {designformData?.issuerCompanyName && (
            <p className="text-[12px] mt-3">{t("isrinfo")}</p>
          )}
          <p className="text-[12px] text-blue-400">
            {designformData?.issuerCompanyName}
            <br />
            {designformData?.issuerEmail}
            <br />
            {designformData?.issuerPhone}
          </p>
          <hr className="my-4" />

          <p className="text-[12px] text-center">{t("tapformoredetail")}</p>
        </div>
      </div>
    </div>
  );
};

export default Defaultcontent;
