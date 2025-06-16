import React from "react";
import PreviewforMobile from "./PreviewforMobile";
import Keypad from "./Keypad";
import { useState } from "react";
import 'swiper/css';
import { createTransactions } from "../../api/transaction";
import { AddNewtransaction } from "../../redux/transactionSlice";
import { Loader } from "../../Components/Loader/loader";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
const DiscountPage = ({ alldata, designformData, routeMa, activeStampList, disableStampList,setmessage }) => {
    const [tab, setTab] = useState(true);
    const dispatch=useDispatch()
    const [loading,setLoading] = useState(false);
    //console.log(alldata, "this is all data of the user")

    const Transactionamount = alldata?.cards[0]?.discount?.Transactionamount;
   

    const getMatchingTier = (amount) => {
        return designformData?.tiers
            ?.sort((a, b) => a.spendToAchieve - b.spendToAchieve)
            .findLast(tier => amount >= tier.spendToAchieve);

    };
    const getNextTier = (amount) => {
        return designformData?.tiers?.find(tier => amount < tier.spendToAchieve);
    };


    const matchedTier = getMatchingTier(Transactionamount);
    const nextTier = getNextTier(Transactionamount);
    // //console.log(matchedTier, "Current Matched Tier");
    // //console.log(designformData?.tiers, "Next Tier");
    const calculateSavings = (points, discountPercentage) => {
        if (points > 0 && discountPercentage > 0) {
            return (points * discountPercentage) / 100; // Calculate savings based on discount
        }
        return 0;
    };
    const adddiscount = (data, section, points) => {
        const match = getMatchingTier(Transactionamount + points);
        const savings = calculateSavings(points, matchedTier?.percentage);
        handleupdatediscount({
            discount: {
                discountstatus: match?.tierName,
                discountlevel: match?.percentage,
                totalsavings: alldata?.cards[0]?.discount.totalsavings + savings,
                Transactionamount: alldata?.cards[0]?.discount?.Transactionamount + Number(points)
            },
            Transactionamount: Number(points),
            saving: savings,
            discountstatus: matchedTier?.tierName
        })
    }
    const handleupdatediscount = async (data) => {
        // //console.log(data)
        try {
            setLoading(true);
            let cards = alldata?.cards;

            cards[0].discount = data?.discount

            const response = await createTransactions({
                cardId: designformData?._id,
                customerId: alldata?._id,
                businessId: alldata?.businessId,
                Amount: data?.Transactionamount,
                Transactionamount: data?.Transactionamount,
                saving: data?.savings,
                discountstatus: data?.discountstatus,
                event: "Get discount",
                cards: cards,
                Balance: cards[0]?.discount.Transactionamount,
            })
            if (response.status === 200) {

                if (response.data.data) {

                    dispatch(AddNewtransaction(response.data.data));
                }
                setLoading(false);
                setmessage({
                    SuccessMessage: true,
                    ErrorMessage: false,
                    messagetitle: "UPLATNENÁ",
                    messagedescription: "Zľava bola úspešne uplatnená"
          
                })
                toast.success("Points updated successfully")
            }

        } catch (error) {
            setmessage({
                SuccessMessage: false,
                ErrorMessage: true,
               
      
            })
            //console.log(error, "these are error")
            toast.error("failed to update Points")
            setLoading(false);

        }

    }

    return (
        <div className="h-[92vh] w-screen bg-gray-100 flex flex-col justify-center items-center text-[#707070]">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto w-full sm:max-w-[90vw] scrollbar-hide">
            {/* Tier Information */}
            <div className="grid w-full grid-cols-2 gap-2 px-8 gap-2 my-2">
                <div className="flex flex-col gap-2 w-[40vw] h-[15vh] bg-white border rounded-2xl text-center shadow-sm p-4">
                    <span>Bodov chýba:</span>
                    <span className="text-3xl text-center font-bold">
                        {nextTier ? nextTier.spendToAchieve - Transactionamount : "--------"}
                    </span>
                </div>
                <div className="flex flex-col gap-2 w-[40vw] h-[15vh] bg-white border rounded-2xl text-center shadow-sm p-4">
                    <span>Počet bodov:</span>
                    <span className="text-3xl font-bold">{Transactionamount || 0}</span>
                </div>
            </div>
    
            {/* Preview for Mobile */}
            <div className="flex justify-center">
                <PreviewforMobile
                    alldata={alldata}
                    designformData={designformData}
                    routeMa={routeMa}
                    activeStampList={activeStampList}
                    disableStampList={disableStampList}
                />
            </div>
        </div>
    
        {/* Fixed Bottom Section */}
        <div className="flex flex-col justify-center items-center w-full sm:max-w-[90vw] bg-[#FFFFFF] border-2 rounded-t-3xl">
            <div className="flex justify-center w-full pt-5">
                <div className="grid w-full grid-cols-2 gap-2 px-6">
                    <button
                        onClick={() => setTab(true)}
                        className={`w-full h-[7.58vh] ${tab ? "bg-[#1D1D1D] text-white" : "bg-[#FAFAFA]"} border rounded-2xl shadow-sm text-lg font-semibold`}
                    >
                        Pridať
                    </button>
                    <button
                        onClick={() => setTab(false)}
                        className={`w-full h-[7.58vh] ${!tab ? "bg-[#1D1D1D] text-white" : "bg-[#FAFAFA]"} border rounded-2xl shadow-sm text-lg font-semibold`}
                    >
                        Uplatniť
                    </button>
                </div>
            </div>
    
            {tab ? (
                <div className="h-[60vh]">
                    <Keypad tab={tab} setTab={setTab} updatepoint={adddiscount} />
                </div>
            ) : (
                <div className="flex flex-wrap w-full justify-center gap-x-4 gap-y-2 py-6 rounded-t-3xl sm:pb-6 h-[46vh]">
                    {/* Discount Information */}
                    <div className="w-full px-6 mt-4">
                        <div className="w-full flex justify-between px-5 bg-[#FAFAFA] text-center border py-5 rounded-xl text-lg">
                            <span>ZĽAVA:</span>
                            <span className="text-2xl font-semibold">{matchedTier?.percentage || 0}%</span>
                        </div>
                    </div>
                    <div className="w-full px-6 mt-4">
                        <button className="w-full bg-[#1D1D1D] text-white py-5 rounded-xl text-lg">
                            Uplatniť zľavu
                        </button>
                    </div>
                </div>
            )}
        </div>
        <Loader loading={loading} />
    </div>
    
    );
};

export default DiscountPage;
