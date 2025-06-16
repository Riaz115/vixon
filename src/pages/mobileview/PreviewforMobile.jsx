import React from 'react'

const PreviewforMobile = ({ alldata, designformData, routeMa, activeStampList, disableStampList }) => {
    const Transactionamount = alldata?.cards[0]?.discount?.Transactionamount;
    // //console.log(Transactionamount, "this is all data");    
    const getMatchingTier = (amount) => {
        return designformData?.tiers
            ?.sort((a, b) => a.spendToAchieve - b.spendToAchieve)
            ?.findLast(tier => amount >= tier.spendToAchieve);

    };
    const getNextTier = (amount) => {
        return designformData?.tiers?.find(tier => amount < tier.spendToAchieve);
    };

    const nextTier = getNextTier(Transactionamount);

    const matchedTier = getMatchingTier(Transactionamount);

    function getSelectedNumber() {
        let gridNumber = designformData.selectedNumber;

        if (gridNumber <= 5) {
            return `grid-cols-${gridNumber}`;
        }

        if (gridNumber < 15) {
            //console.log("gridNumber < 15", designformData.selectedNumber);
            return `grid-cols-${Math.ceil(gridNumber / 2)}`
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
    function getFieldValueByName(customer, fieldName) {
        switch (fieldName) {
            case 'First Name':
                return customer.first_name || "N/A";
            case 'Last Name':
                return customer.last_name || "N/A";
            case 'Email':
                return customer.email || "N/A";
            case 'Phone':
                return customer.phone;
            case 'Date of Birth':
                return new Date(customer.date_of_birth).toLocaleDateString() || "N/A"
            case 'Available Reward':
                return customer.cards[0]?.rewards || 'N/A';
            case 'Reward':
                return customer.cards[0]?.rewards || 'N/A';
            case 'Summary stamps count':
                return `${customer.cards[0].consumedStamps}/${customer.cards[0].remainingStamps + customer.cards[0].consumedStamps}` || "N/A";
            case 'Stamps until the reward':
                return ` ${customer.cards[0]?.remainingStamps} Stamps` || "N/A";
            case 'Expiration Date':
                return ` ${new Date(customer?.cardExpirationFixedTermDate)?.toLocaleDateString()}` || "--------";

            case 'Spend to rich next level':
                return ` ${nextTier.spendToAchieve - Transactionamount}` || "N/A";
            case 'Discount status':
                return ` ${matchedTier?.tierName}` || "N/A";
            case 'Discount percentage':
                return `${matchedTier?.percentage}%` || "N/A";
            case 'Reward for the first visit':
                return ` ${designformData?.rewardForTheFirstVisit}` || "N/A";
            default:
                return 'N/A';
        }
    }
    return (
        <div className='flex jsutify-content-center   rounded-lg w-[19rem]'>
            {(
                <div className="hide-scrollbar   overflow-y-auto w-full ms-2 mx-1 rounded-lg shadow-lg border" style={{ backgroundColor: designformData?.bgColor, color: designformData?.textColor }}>

                    <div className="flex items-start justify-between text-sm  ">
                        <h2 className="text-[.8rem]  font-semibold py-3 pl-2">

                            {
                                designformData?.logo ? (
                                    <img
                                        src={designformData?.logo instanceof File || designformData?.logo instanceof Blob
                                            ? URL.createObjectURL(designformData.logo)
                                            : designformData?.logo}
                                        alt={"something"}
                                        className="w-[113px] h-[36px] my-1  object-cover object-center"
                                    />
                                ) : (designformData?.stampName)
                            }
                        </h2>
                    </div>
                    <div
                        id='cardImage'
                        style={{
                            backgroundColor: designformData?.stampbackground ? "" :(designformData?.cardType==="Stamp" && designformData?.bgUnderStampsColor )|| designformData?.backgroundColorFortheCenterPart,
                            backgroundImage: designformData?.stampbackground ? `url(${designformData?.stampbackground instanceof File || designformData?.stampbackground instanceof Blob
                                ? URL.createObjectURL(designformData?.stampbackground)
                                : designformData?.stampbackground})` : "",
                            backgroundPosition: designformData?.stampbackground ? "center" : "",
                            backgroundSize: designformData?.stampbackground ? "contain" : "",
                            height: "100px"
                        }}
                        className=" flex  justify-center  mb-3 px-1.5 ">
                        {designformData?.cardType === "Stamp" ? (
                            <div className={designformData?.selectedNumber === 2 ? `flex   flex-wrap px-2  gap-1 w-full   strach justify-center` : `grid ${getSelectedNumber()} w-full  gap-x-1 h-full  items-center justify-items-center px-2 `}>
                                <>
                                    {Array.from({ length: designformData?.selectedNumber >= designformData?.selectedNumber ? alldata?.cards[0]?.consumedStamps : designformData?.selectedNumber }).map((_, index) => (
                                        <div key={index}

                                            style={{
                                                height: designformData?.selectedNumber <= 19 ? Math.ceil(40 - Math.floor(designformData?.selectedNumber / 4) * 4) : "1.3rem",
                                                width: designformData?.selectedNumber <= 19 ? Math.ceil(40 - Math.floor(designformData?.selectedNumber / 4) * 4) : "1.3rem",
                                                borderColor: designformData?.outlineColor,
                                                backgroundColor: designformData?.stampBgColor

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
                                            height: designformData?.selectedNumber <= 19 ? Math.ceil(40 - Math.floor(designformData?.selectedNumber / 4) * 4) : "1.3rem",
                                            width: designformData?.selectedNumber <= 19 ? Math.ceil(40 - Math.floor(designformData?.selectedNumber / 4) * 4) : "1.3rem",
                                            borderColor: designformData?.outlineColor,
                                            backgroundColor: designformData?.stampBgColor,
                                        }}
                                        className="border flex justify-center  items-center rounded-full overflow-hidden" aria-disabled={true}>
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


                            </div>
                        ) : (
                            <div className=" py-6 text-xs">
                                <h2>{routeMa[designformData?.cardType]?.keys?.bg}</h2>
                            </div>
                        )}
                    </div>
                { designformData?.cardType === "Coupon" &&   <div className="flex justify-between px-2 mt-4">
                        <div>
                            <p className="text-[9.6px] font-bold truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[108px]">
                                {designformData?.fields[0]?.fieldName}
                            </p>

                            {designformData?.cardType === "Stamp" && designformData?.fields[0]?.fieldName === "Stamps until the reward" ? <p className="text-[18.2px]">

                                {getFieldValueByName({ ...alldata, ...designformData }, designformData?.fields[0]?.fieldName)}
                            </p> :
                                <p className="text-[12.2px] longtext">
                                    {getFieldValueByName({ ...alldata, ...designformData }, designformData?.fields[0]?.fieldName)}
                                </p>}
                        </div>
                        <div>
                            <p className="text-[9.6px] font-bold truncate overflow-hidden text-ellipsis  max-w-[108px]">
                                {designformData?.fields[1]?.fieldName}
                            </p>

                            {designformData?.cardType === "Stamp" && designformData?.fields[1]?.fieldName === "Available Reward" ? <p className="text-[18.2px] float-right">
                                {" "}
                                {"Rewards " + getFieldValueByName(alldata, designformData?.fields[1]?.fieldName)}
                            </p> :
                                <p className="text-[12.2px] float-right text-[12.2px] longtext">
                                    {" "}
                                    {getFieldValueByName(alldata, designformData?.fields[1]?.fieldName)}
                                </p>}
                        </div>
                    </div>}
                    {/* <div className="flex justify-center items-end h-[140px] px-2">

                                                {alldata?.customerbarcode ? <div className=' bg-white  flex justify-center mb-[-50px]' >
                                                    <img src={alldata?.customerbarcode} className='w-[90%] my-2' alt="PDF417 Barcode" />
                                                </div> : <div style={{ marginBottom: "-50px" }}>
                 
                                                    <QRCode
                                                        value='1489276542312312'
                                                        size={100}
                                                    />
                                                </div>}
                                            </div> */}
                </div>
            )
            }</div>
    )
}

export default PreviewforMobile