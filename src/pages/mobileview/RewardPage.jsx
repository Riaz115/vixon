import React from "react";
import PreviewforMobile from "./PreviewforMobile";
import Keypad from "./Keypad";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { AddNewtransaction } from "../../redux/transactionSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Loader } from "../../Components/Loader/loader";
import { createImage } from "../../Components/convertdata";
import { handleUpload } from "../../api/createstamp";
import { createTransactions } from "../../api/transaction";

const RewardPage = ({ alldata, designformData, routeMa, activeStampList, disableStampList, setmessage }) => {
    //console.log("designformData", designformData);

    const [tab, setTab] = useState(true);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState();
    const updatepoint = async (data, section1, points) => {

        let cards = alldata?.cards;
        try {
            let message;
            let event
            setLoading(true);
            if (section1 === "point") {
                cards[0].rewards = cards[0].rewards + points
                event = "Reward points earned"
            } else {

                cards[0].rewards = cards[0].rewards - points
                message = designformData?.earnedRewardMessage;
                event = "Bonus points redeemed"
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
                imagecard,
                imagecardkey
            })

            //console.log(response.data.data, "this is response data of transaction");
            if (response.status === 200) {
                if (response.data.data) {

                    dispatch(AddNewtransaction(response.data.data));
                    setSelected()
                }
                setLoading(false);
                setmessage({
                    SuccessMessage: true,
                    ErrorMessage: false,
                    messagetitle: "PRIDANÉ!",
                    messagedescription: "Body sú na ceste zákazníkovy."
                })
                // setBarCodeData("")
                toast.success("Points updated successfully")
            }

        } catch (error) {
            toast.error("failed to update Points")
            //console.log("error", error)
            setLoading(false);
            setmessage({
                SuccessMessage: false,
                ErrorMessage: true,
               
            })

        }
    }

    function floatToIntFloor(floatNum) {
        return Math.floor(floatNum);
    }

    const calculatePoints = (moneySpent, moneyForPoints, pointsGiven) => {
        const pointsPerDollar = pointsGiven / moneyForPoints;
        return floatToIntFloor(moneySpent * pointsPerDollar);
    };

    const onChangepoints = (data, section1, points) => {
        //console.log("these are points for reqard", designformData)
        if (designformData?.UpperRadio === "spend") {
            let pointdata;
            const moneySpent = parseFloat(points);
            pointdata = calculatePoints(moneySpent, designformData?.spend?.moneySpent, designformData?.spend?.pointsGained) || 0;
            updatepoint(data, section1, pointdata);
        } else if (designformData?.UpperRadio === "points") {
            updatepoint(data, section1, points);
        } else {
            updatepoint(data, section1, Number(designformData?.visit?.pointsPerVisit || 0))
        }
    };




    return (
        <div
        className="h-[90vh] w-[100vw] bg-gray-100 flex flex-col justify-center items-center text-[#707070]"
      >
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto w-full sm:max-w-[400px] scrollbar-hide">
          <div className="grid w-full grid-cols-2 gap-2 my-5 px-4">
            <div className="h-[16vh] flex flex-col gap-2 bg-white border rounded-2xl text-center shadow-sm p-4">
              <span>Bonusový zostatok:</span>
              <span className="text-3xl font-bold">
                {alldata?.cards[0]?.rewards || 0}
              </span>
            </div>
            <div className="h-[16vh] flex flex-col gap-2 bg-white border rounded-2xl text-center shadow-sm p-4">
              <span>Meno:</span>
              <span className="text-3xl font-bold">{alldata?.first_name}</span>
            </div>
          </div>
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
        <div className="flex flex-col justify-center items-center w-full sm:w-[430px] bg-[#FFFFFF] rounded-t-3xl pb-[10vh] border">
          <div className="grid w-full grid-cols-2 gap-2 px-6 mt-3">
            <button
              onClick={() => {
                setTab(true);
                setSelected();
              }}
              className={`w-full h-[8vh] ${
                tab ? "bg-[#1D1D1D] text-white" : "bg-[#FAFAFA]"
              } border rounded-2xl shadow-sm text-lg font-semibold`}
            >
              Pridať
            </button>
            <button
              onClick={() => {
                setTab(false);
              }}
              className={`w-full h-[8vh] ${
                !tab ? "bg-[#1D1D1D] text-white" : "bg-[#FAFAFA]"
              } border rounded-2xl shadow-sm text-lg font-semibold`}
            >
              Uplatniť
            </button>
          </div>
      
          {tab ? (
            designformData?.UpperRadio === "visit" ? (
              <div className="w-full px-6 py-10 mt-4">
                <button
                  onClick={() =>
                    onChangepoints(
                      {
                        amount: 0,
                        comment: "",
                      },
                      "point",
                      0
                    )
                  }
                  className="w-full bg-[#1D1D1D] text-white py-3 rounded-xl text-lg"
                >
                  Odmena za každú návštevu ${designformData?.visit?.pointsPerVisit}
                </button>
              </div>
            ) : (
              <div className="h-[50vh] mt-2">
                <Keypad tab={tab} setTab={setTab} updatepoint={onChangepoints} />
              </div>
            )
          ) : (
            <div className="flex flex-wrap w-full justify-center gap-x-4 gap-y-2 pt-1 rounded-t-3xl h-[30.5vh]">
              <div className="w-full px-6 mt-4">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={3}
                  className="my-swiper"
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                >
                  {designformData?.reward?.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      className={`relative flex flex-col gap-2 items-center justify-center border rounded-2xl shadow-sm p-4 ${
                        selected === index
                          ? "border-[#36C6FA] bg-[#36C6FA] text-white"
                          : ""
                      } ${
                        alldata?.cards[0].rewards >= item?.pointsEarned
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }`}
                      disabled={alldata?.cards[0].rewards < item?.pointsEarned}
                    >
                      <div
                        className={`flex flex-col items-center text-center`}
                        disabled={true}
                        onClick={() => {
                          if (alldata?.cards[0].rewards < item?.pointsEarned) {
                            return;
                          }
                          setSelected(index);
                        }}
                      >
                        <label className="absolute top-1 left-1">
                          <input
                            type="checkbox"
                            className="hidden peer"
                            name="reward"
                            checked={selected === index}
                          />
                          <span className="w-3 h-3 rounded-full border-2 border-gray-400 bg-white inline-flex items-center justify-center peer-checked:border-black peer-checked:bg-black"></span>
                        </label>
                        <span className="text-sm">{item?.pointsEarned} bodov</span>
                        <span className="text-xl font-bold mt-2">
                          {item?.pointsType==="Order (€ OFF)"? `${item?.pointsValue}€`:(item?.pointsType==="Order (% OFF)")?`%${item?.pointsValue}`:item?.pointsValue} Zľava
                        </span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="w-full px-6 ">
                <button
                  className={`w-full ${
                    selected >= 0
                      ? "bg-[#1D1D1D] text-white"
                      : "bg-white text-black border"
                  } py-3 rounded-xl text-lg`}
                  disabled={!(selected >= 0)}
                  onClick={() => {
                    const data2 =
                      designformData?.reward[selected]?.pointsEarned || 0;
                    //console.log(data2, "this is data");
                    updatepoint({ amount: 0, comment: "" }, "redeemed", data2);
                  }}
                >
                  Uplatniť odmenu
                </button>
              </div>
            </div>
          )}
        </div>
        <Loader loading={loading} />
      </div>
      
    );
};

export default RewardPage;
