import React from "react";
import PreviewforMobile from "./PreviewforMobile";
import Keypad from "./Keypad";
import { useState } from "react";
import { AddNewtransaction } from "../../redux/transactionSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Loader } from "../../Components/Loader/loader";
import { createImage } from "../../Components/convertdata";
import { handleUpload } from "../../api/createstamp";
import { createTransactions } from "../../api/transaction";
import SuccessMessage from "./SuccesMessage";

const StampPage = ({ alldata, designformData, routeMa, activeStampList, disableStampList, setmessage }) => {
    const [tab, setTab] = useState(false);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const updatepoint = async (data, section1, points) => {
        let cards = alldata?.cards;
        try {
            let message;
            let event
            setLoading(true);
            if (section1 === "point") {
                //console.log(cards[0].pendding, "this is pendding data")
                const totalStamps = designformData?.selectedNumber;
                if (alldata?.cards[0]?.pendding === 0) {

                    const initialRemainingStamps = cards[0].remainingStamps + designformData?.selectedNumber;
                    const effectivePoints = points % totalStamps;
                    if (points + cards[0].consumedStamps >= totalStamps) {
                        cards[0].remainingStamps = 0
                        cards[0].pendding = (points + cards[0].consumedStamps) - totalStamps;
                        //console.log((points + cards[0].consumedStamps), "-", totalStamps, "=", cards[0].pendding)
                        cards[0].rewards = Math.floor((points + cards[0].consumedStamps) / totalStamps);
                        //console.log("these are rewards", Math.floor((points + cards[0].consumedStamps) / totalStamps))
                        cards[0].consumedStamps = totalStamps;
                    } else {
                        const stampsUsed = effectivePoints > initialRemainingStamps
                            ? totalStamps - (effectivePoints - initialRemainingStamps)
                            : initialRemainingStamps - effectivePoints;
                        const newdata = stampsUsed % totalStamps;
                        cards[0].remainingStamps = newdata;
                        // Update consumed stamps
                        cards[0].consumedStamps = totalStamps - cards[0].remainingStamps;
                    }

                    cards[0].availabletotalstamps = cards[0]?.pendding === 0 ? cards[0]?.consumedStamps : cards[0]?.pendding + cards[0]?.consumedStamps
                } else {
                    cards[0].rewards = Math.floor((cards[0].consumedStamps + cards[0]?.pendding + points) / cards[0]?.totalStamps)
                    cards[0].pendding = cards[0]?.pendding + points;
                    cards[0].availabletotalstamps = cards[0]?.pendding === 0 ? cards[0]?.consumedStamps : cards[0]?.pendding + cards[0]?.consumedStamps
                }
                // Set total stamps and message
                cards[0].totalStamps = totalStamps;
                message = designformData?.earnedStampMessage?.replace(/{#}/g, cards[0]?.remainingStamps);
                event = "Bonus points earned"
            } else {


                if (cards[0].pendding >= cards[0].totalStamps) {
                    cards[0].remainingStamps = 0;
                    cards[0].consumedStamps = cards[0].totalStamps;
                    cards[0].pendding = cards[0].pendding - cards[0].totalStamps;
                    cards[0].rewards = Math.floor((cards[0].pendding + cards[0].consumedStamps) / cards[0].totalStamps)
                    cards[0].availabletotalstamps = cards[0]?.pendding === 0 ? cards[0]?.consumedStamps : cards[0]?.pendding + cards[0]?.consumedStamps
                    //console.log(Math.floor((alldata?.cards[0]?.pendding + cards[0].consumedStamps) / cards[0].totalStamps), "this is pending data1")
                } else {
                    //console.log(cards[0].pendding, "this is pending data2")
                    cards[0].remainingStamps = cards[0].totalStamps - cards[0].pendding;
                    cards[0].consumedStamps = cards[0].pendding;
                    cards[0].pendding = 0;
                    cards[0].rewards = 0;
                    cards[0].availabletotalstamps = cards[0]?.pendding === 0 ? cards[0]?.consumedStamps : cards[0]?.pendding + cards[0]?.consumedStamps
                }
                message = designformData?.earnedRewardMessage;
                event = "Stamps redeemed"
                //console.log("how are my jan", event)
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            const imageBlob = await createImage("cardImage");
            const fileName = 'cardimage.jpg';
            const file = new File([imageBlob], fileName, { type: 'image/jpeg' });
            const image = await handleUpload(file);
            const imagecard = image.Location;
            const imagecardkey = image.Key;
            //console.log("imagecard", imagecard)
            const response = await createTransactions({
                cardId: designformData?._id,
                customerId: alldata?._id,
                businessId: alldata?.businessId,
                Balance: cards[0].rewards,
                Amount: data?.amount,
                Transactionamount: data?.amount,
                cards: cards,
                event: event,
                cardType: designformData?.cardType,
                message: message,
                totalStamps: cards[0]?.availabletotalstamps,
                remainingStamps: cards[0]?.remainingStamps,
                addedStamps: points,
                imagecard,
                imagecardkey
            })

            //console.log(response.data.data, "this is response data of transaction");
            if (response.status === 200) {
                if (response.data.data) {
                    setmessage({
                        SuccessMessage: true,
                        ErrorMessage: false,
                        messagetitle: "PRIDANÉ",
                        messagedescription: "Pečiatky sú na ceste zákazníkovy."
                    })
                    dispatch(AddNewtransaction(response.data.data));
                }
                setLoading(false);
                // setBarCodeData("")
                toast.success("Points updated successfully")
            }

        } catch (error) {
            toast.error("failed to update Points")
            setmessage({
                SuccessMessage: false,
                ErrorMessage: true
            })
            //console.log("error", error)
            setLoading(false);

        }
    }

    return (
        <div className="h-[88vh] w-screen bg-gray-100 flex flex-col justify-center items-center text-[#707070]">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Statistics Section */}
          <div className="flex items-center justify-center">
            <div className="flex justify-around w-full px-4 pt-10 text-center gap-2 w-full sm:max-w-[80vw]">
              <div className="bg-white rounded-lg shadow-md w-[28vw] h-[12.6vh] flex flex-col border border-[#DBDBDB] items-center justify-center">
                <p className="text-3xl font-semibold text-[#000000]">
                  {alldata?.cards[0]?.remainingStamps}
                </p>
                <p className="text-sm text-gray-500 mx-4">Do odmeny:</p>
              </div>
              <div className="bg-white rounded-lg shadow-md px-2 w-[28vw] h-[12.6vh] flex flex-col border border-[#DBDBDB] items-center justify-center">
                <p className="text-3xl font-semibold text-[#000000]">
                  {alldata?.cards[0]?.availabletotalstamps || 0}
                </p>
                <p className="text-sm text-gray-500">Počet pečiatok:</p>
              </div>
              <div className="bg-white rounded-lg px-2 shadow-md w-[28vw] h-[12.6vh] flex flex-col border border-[#DBDBDB] items-center justify-center">
                <p className="text-3xl font-semibold text-[#000000]">
                  {alldata?.cards[0]?.rewards}
                </p>
                <p className="text-sm text-gray-500 mx-4">Počet odmien:</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10">
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
        {tab ? (
          <div className="flex justify-center  bg-[#FFFFFF]  rounded-t-3xl">
            <div className="flex justify-center  w-full  sm:max-w-[90vw] h-[60vh]">
              <Keypad tab={tab} setTab={setTab} updatepoint={updatepoint} />
            </div>
          </div>
        ) : (
            <div className="flex justify-center  pb-20 pt-3 sm:max-w-[90vw] h-[53%] bg-[#FFFFFF] rounded-t-3xl border ">
            <div className="flex flex-wrap justify-center gap-x-[2vw] gap-y-[1vh]  pb-[10vh]">
              <div
                className="flex bg-[#36c6fa] hover:bg-[#0073a9] p-[2vh] rounded-xl flex-shrink-0 w-[45.9vw] h-[13.8vh] text-white text-center cursor-pointer shadow-md text-[6vh] justify-center items-center"
                onClick={() => {
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
                className="flex bg-[#ff3859] hover:bg-[#fc5873] p-[2vh] rounded-xl flex-shrink-0 w-[45.9vw] h-[13.8vh] text-white text-center text-[6vh] justify-center items-center cursor-pointer shadow-md"
                onClick={() => {
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
                className="bg-[#fec009] hover:bg-[#ffcf3f] p-[2vh] rounded-xl flex-shrink-0 w-[45.9vw] h-[13.8vh] text-white text-center flex text-[6vh] justify-center items-center cursor-pointer shadow-md"
                onClick={() => {
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
                className="bg-[#67be39] hover:bg-[#7aeb3d] p-[2vh] rounded-xl flex-shrink-0 w-[45.9vw] h-[13.8vh] text-white text-center text-[6vh] flex justify-center items-center cursor-pointer shadow-md"
                onClick={() => {
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
              <div
                className="bg-black hover:bg-[#7aeb3d] p-[2vh] rounded-xl flex-shrink-0 w-[45.9vw] h-[10.07vh] text-white text-center flex justify-center items-center cursor-pointer shadow-md"
                onClick={() => {
                  setTab(true);
                  
                }}
              >
                Viac bodov
              </div>
              <div
                className={`flex justify-center items-center border rounded-xl flex-shrink-0 w-[45.9vw] h-[10.07vh] border-2 text-center shadow-md ${
                  alldata?.cards[0].rewards === 0
                    ? "text-black bg-gray-200 hover:bg-gray-300"
                    : "text-white bg-black hover:bg-gray-900 cursor-pointer"
                }`}
                onClick={() => {
                  if (alldata?.cards[0].rewards !== 0) {
                    updatepoint(
                      {
                        amount: 0,
                        comment: "",
                      },
                      "redeemed",
                      4
                    );
                  }
                }}
              >
                Uplatniť zľavu
              </div>
            </div>
          </div>
          
        )}
        <Loader loading={loading} />
      </div>
      
    );
};

export default StampPage;
