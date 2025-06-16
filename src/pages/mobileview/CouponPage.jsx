import React from "react";
import PreviewforMobile from "./PreviewforMobile";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddNewtransaction } from "../../redux/transactionSlice";
import { createTransactions } from "../../api/transaction";
import { Loader } from "../../Components/Loader/loader";
import toast from "react-hot-toast";
const CouponPage = ({ alldata, designformData, routeMa, activeStampList, disableStampList, setmessage }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleupdatdcoupon = async (data) => {
        // //console.log(data)
        try {
            setLoading(true);
            let cards = [...alldata.cards];
            cards[0] = designformData?.linkedCardTemplate === "without" ? {
                ...cards[0],
                cardId: designformData?._id,
                couponstatus: "redeemed"
            } : {
                ...cards[0],
                cardId: designformData?.linkedCardTemplate?._id,
                rewards: designformData?.linkedCardTemplate?.numberOfStampsWhenIssuingCard === designformData?.linkedCardTemplate?.selectedNumber ? 1 : 0,
                consumedStamps: designformData?.linkedCardTemplate?.numberOfStampsWhenIssuingCard,
                availabletotalstamps: designformData?.linkedCardTemplate?.numberOfStampsWhenIssuingCard,
                remainingStamps: designformData?.linkedCardTemplate?.selectedNumber - designformData?.linkedCardTemplate?.numberOfStampsWhenIssuingCard,
                totalStamps: designformData?.linkedCardTemplate?.selectedNumber
            }
            const response = await createTransactions({
                cardId: designformData?.linkedCardTemplate === "without" ? designformData?._id : designformData?.linkedCardTemplate?._id,
                customerId: alldata?._id,
                // businessId: alldata?.businessId,
                Transactionamount: data?.Amount,
                event: "Redeem Coupon",
                cards: cards
            })
            if (response.status === 200) {
                setLoading(false);
                if (response.data.data) {
                    dispatch(AddNewtransaction(response.data.data));

                }
                setmessage({
                    SuccessMessage: true,
                    ErrorMessage: false,
                    messagetitle: "UPLATNENÉ",
                    messagedescription: "Kupón bol úspešne uplatnený."

                })
                // setBarCodeData("")
                toast.success("Points updated successfully")
            }

        } catch (error) {
            // //console.log(error, "these are error")
            toast.error("failed to update Points")
            setmessage({
                SuccessMessage: false,
                ErrorMessage: true,


            })
            setLoading(false);

        }

    }
    //console.log(alldata, "this is alldata of the user");
    return (
        <div className="h-[89vh] w-screen bg-gray-100 flex flex-col justify-center items-center  text-[#707070]" >
            <div className="flex-1 overflow-y-auto w-full sm:max-w-[400px] scrollbar-hide ">
                <div className="grid w-full grid-cols-2 gap-2 px-6 my-2 ">

                    <div
                        className="w-[42vw] flex flex-col gap-2  justify-center bg-white border rounded-2xl text-center shadow-sm p-2"
                    >
                        <span>
                            Dátum splatnosti:

                        </span>
                        <span className="text-xl text-center font-bold">
                            ----/----/----
                        </span>
                    </div>
                    <div

                        className="w-[42vw]  flex flex-col gap-2  bg-white border rounded-2xl text-center shadow-sm p-4"
                    >
                        <span>
                            Meno:

                        </span>
                        <span className="text-xl font-bold">
                            {alldata?.first_name} {alldata?.last_name}

                        </span>
                    </div>

                </div>
                <div className="flex justify-center">
                    <PreviewforMobile alldata={alldata} designformData={designformData} routeMa={routeMa} activeStampList={activeStampList} disableStampList={disableStampList} />
                </div>

            </div>

            {/* Fixed Bottom Section */}
            <div className="flex flex-col justify-center  w-full h-[47vh] sm:max-w-[400px] bg-[#FFFFFF] rounded-t-3xl">
                <div className=" flex  w-full ">

                    <div className="grid w-full  gap-10 px-6 mt-3">

                        <div


                            className={`w-full  py-3 px-5 bg-[#FAFAFA]  border rounded-xl shadow-sm `}
                        >
                            <span >ODMENA: </span>

                            <span className=" text-xl font-semibold"> {designformData?.rewardForTheFirstVisit || "Null"}</span>
                        </div>
                        <button
                            onClick={() => {
                                handleupdatdcoupon({
                                    Amount: 0
                                })
                            }}
                            disabled={alldata?.cards[0]?.couponstatus === "redeemed"}
                            className={`w-full py-6 ${alldata?.cards[0]?.couponstatus === "redeemed" ? "text-black bg-gray-200 hover:bg-gray-300"
                                : "text-white bg-black hover:bg-gray-900"
                                } rounded-lg text-xl transition`}
                        >
                            Uplatniť kupón
                        </button>

                    </div>
                </div>



            </div>
            <Loader loading={loading}/>
        </div>
    );
};

export default CouponPage;