import React, { useEffect } from "react";
import {
  FaApple,
  FaStar,
  FaHeart,
  FaSmile,
  FaCoffee,
  FaAppleAlt,
  FaAnchor,
  FaBell,
  FaBook,
  FaBolt,
  FaCar,
  FaCheck,
  FaCloud,
  FaCogs,
  FaCompass,
  FaDesktop,
  FaDove,
  FaEye,
  FaFeather,
  FaFire,
  FaFlag,
  FaFlask,
  FaGift,
  FaGlobe,
  FaHammer,
  FaHeadphones,
  FaIceCream,
  FaKey,
  FaLeaf,
  FaLightbulb,
  FaLock,
  FaMagic,
  FaMobileAlt,
  FaMoon,
  FaPaintBrush,
  FaPaperPlane,
  FaPen,
  FaPhone,
  FaPlane,
  FaRocket,
  FaShoppingCart,
  FaSnowflake,
  FaSun,
  FaTabletAlt,
  FaTrophy,
  FaUmbrella,
  FaUser,
  FaVideo,
  FaWrench,
  FaYinYang,
} from "react-icons/fa";

const activeStampList = [
  { icon: <FaStar />, name: "Star" },
  { icon: <FaHeart />, name: "Heart" },
  { icon: <FaSmile />, name: "Smile" },
  { icon: <FaCoffee />, name: "Coffee" },
  { icon: <FaAppleAlt />, name: "Apple" },
  { icon: <FaAnchor />, name: "Anchor" },
  { icon: <FaBell />, name: "Bell" },
  { icon: <FaBook />, name: "Book" },
  { icon: <FaBolt />, name: "Bolt" },
  { icon: <FaCar />, name: "Car" },
  { icon: <FaCheck />, name: "Check" },
  { icon: <FaCloud />, name: "Cloud" },
  { icon: <FaCogs />, name: "Cogs" },
  { icon: <FaCompass />, name: "Compass" },
  { icon: <FaDesktop />, name: "Desktop" },
  { icon: <FaDove />, name: "Dove" },
  { icon: <FaEye />, name: "Eye" },
  { icon: <FaFeather />, name: "Feather" },
  { icon: <FaFire />, name: "Fire" },
  { icon: <FaFlag />, name: "Flag" },
  { icon: <FaFlask />, name: "Flask" },
  { icon: <FaGift />, name: "Gift" },
  { icon: <FaGlobe />, name: "Globe" },
  { icon: <FaHammer />, name: "Hammer" },
  { icon: <FaHeadphones />, name: "Headphones" },
  { icon: <FaIceCream />, name: "Ice Cream" },
  { icon: <FaKey />, name: "Key" },
  { icon: <FaLeaf />, name: "Leaf" },
  { icon: <FaLightbulb />, name: "Lightbulb" },
  { icon: <FaLock />, name: "Lock" },
  { icon: <FaMagic />, name: "Magic" },
  { icon: <FaMobileAlt />, name: "Mobile" },
  { icon: <FaMoon />, name: "Moon" },
  { icon: <FaPaintBrush />, name: "Paint Brush" },
  { icon: <FaPaperPlane />, name: "Paper Plane" },
  { icon: <FaPen />, name: "Pen" },
  { icon: <FaPhone />, name: "Phone" },
  { icon: <FaPlane />, name: "Plane" },
  { icon: <FaRocket />, name: "Rocket" },
  { icon: <FaShoppingCart />, name: "Shopping Cart" },
  { icon: <FaSnowflake />, name: "Snowflake" },
  { icon: <FaSun />, name: "Sun" },
  { icon: <FaTabletAlt />, name: "Tablet" },
  { icon: <FaTrophy />, name: "Trophy" },
  { icon: <FaUmbrella />, name: "Umbrella" },
  { icon: <FaUser />, name: "User" },
  { icon: <FaVideo />, name: "Video" },
  { icon: <FaWrench />, name: "Wrench" },
  { icon: <FaYinYang />, name: "Yin Yang" },
];

const disableStampList = [
  { icon: <FaStar className="disabled-icon" />, name: "Star" },
  { icon: <FaHeart className="disabled-icon" />, name: "Heart" },
  { icon: <FaSmile className="disabled-icon" />, name: "Smile" },
  { icon: <FaCoffee className="disabled-icon" />, name: "Coffee" },
  { icon: <FaAppleAlt className="disabled-icon" />, name: "Apple" },
  { icon: <FaAnchor className="disabled-icon" />, name: "Anchor" },
  { icon: <FaBell className="disabled-icon" />, name: "Bell" },
  { icon: <FaBook className="disabled-icon" />, name: "Book" },
  { icon: <FaBolt className="disabled-icon" />, name: "Bolt" },
  { icon: <FaCar className="disabled-icon" />, name: "Car" },
  { icon: <FaCheck className="disabled-icon" />, name: "Check" },
  { icon: <FaCloud className="disabled-icon" />, name: "Cloud" },
  { icon: <FaCogs className="disabled-icon" />, name: "Cogs" },
  { icon: <FaCompass className="disabled-icon" />, name: "Compass" },
  { icon: <FaDesktop className="disabled-icon" />, name: "Desktop" },
  { icon: <FaDove className="disabled-icon" />, name: "Dove" },
  { icon: <FaEye className="disabled-icon" />, name: "Eye" },
  { icon: <FaFeather className="disabled-icon" />, name: "Feather" },
  { icon: <FaFire className="disabled-icon" />, name: "Fire" },
  { icon: <FaFlag className="disabled-icon" />, name: "Flag" },
  { icon: <FaFlask className="disabled-icon" />, name: "Flask" },
  { icon: <FaGift className="disabled-icon" />, name: "Gift" },
  { icon: <FaGlobe className="disabled-icon" />, name: "Globe" },
  { icon: <FaHammer className="disabled-icon" />, name: "Hammer" },
  { icon: <FaHeadphones className="disabled-icon" />, name: "Headphones" },
  { icon: <FaIceCream className="disabled-icon" />, name: "Ice Cream" },
  { icon: <FaKey className="disabled-icon" />, name: "Key" },
  { icon: <FaLeaf className="disabled-icon" />, name: "Leaf" },
  { icon: <FaLightbulb className="disabled-icon" />, name: "Lightbulb" },
  { icon: <FaLock className="disabled-icon" />, name: "Lock" },
  { icon: <FaMagic className="disabled-icon" />, name: "Magic" },
  { icon: <FaMobileAlt className="disabled-icon" />, name: "Mobile" },
  { icon: <FaMoon className="disabled-icon" />, name: "Moon" },
  { icon: <FaPaintBrush className="disabled-icon" />, name: "Paint Brush" },
  { icon: <FaPaperPlane className="disabled-icon" />, name: "Paper Plane" },
  { icon: <FaPen className="disabled-icon" />, name: "Pen" },
  { icon: <FaPhone className="disabled-icon" />, name: "Phone" },
  { icon: <FaPlane className="disabled-icon" />, name: "Plane" },
  { icon: <FaRocket className="disabled-icon" />, name: "Rocket" },
  { icon: <FaShoppingCart className="disabled-icon" />, name: "Shopping Cart" },
  { icon: <FaSnowflake className="disabled-icon" />, name: "Snowflake" },
  { icon: <FaSun className="disabled-icon" />, name: "Sun" },
  { icon: <FaTabletAlt className="disabled-icon" />, name: "Tablet" },
  { icon: <FaTrophy className="disabled-icon" />, name: "Trophy" },
  { icon: <FaUmbrella className="disabled-icon" />, name: "Umbrella" },
  { icon: <FaUser className="disabled-icon" />, name: "User" },
  { icon: <FaVideo className="disabled-icon" />, name: "Video" },
  { icon: <FaWrench className="disabled-icon" />, name: "Wrench" },
  { icon: <FaYinYang className="disabled-icon" />, name: "Yin Yang" },
];

import { useState } from "react";
import { handleUpload, installationcard } from "../../api/createstamp";
import { Loader } from "../../Components/Loader/loader";
import { routeMa } from "../../data";
import ConfirmationModal from "../../Components/modal/Addamount";
import { createTransactions } from "../../api/transaction";
import toast from "react-hot-toast";
import CustomerPreview from "../preview/CustomerPreview";
import StampPreview from "../preview/StampPreview";
import RewardPreview from "../preview/RewardPreview";
import DiscountPreview from "../preview/DiscountPreview";
import CouponPreview from "../preview/CouponPreview";
import { AddNewtransaction } from "../../redux/transactionSlice";
import { useDispatch } from "react-redux";
import Cardpreview from "../preview/preview";
import { createImage } from "../../Components/convertdata";

const CustomerdetailView = ({ data, setBarCodeData }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [alldata, setalldata] = useState();
  const [designformData, setdesignFormData] = useState();
  useEffect(() => {
    const get = async () => {
      try {
        setLoading(true);
        const response = await installationcard(data);
        // console.log(response, "this is response data")
        if (response.status === 200 || response.status === 201) {
          // setinformationFormData(response?.data?.findcard)
          setdesignFormData(response?.data?.findcard);

          setalldata(response?.data?.customer);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "these are errors");
        toast.error(error?.response?.data?.message);
        setBarCodeData("");
        setLoading(false);
      }
    };
    if (data) {
      get();
    }
  }, [data]);

  //console.log(alldata,"this is all data response")

  const [points, setPoints] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [section, setSection] = useState("point");

  const [totaldata, settotaldata] = useState();
  const handleAddPoint = () => {
    setIsAdding(true);
    setPoints((prevPoints) => prevPoints + 1);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleRedeemPoint = () => {
    setIsRedeeming(true);
    if (points > 0) {
      setPoints(points - 1);
    }
  };
  const openModal = (section1) => {
    if (designformData?.purchaseAmountIsRequiredSwitch === false) {
      if (section1 === "point") {
        if (designformData?.cardType === "Discount") {
          // //console.log(designformData?.cardType)
          handleupdatediscount(totaldata);
        } else if (designformData?.cardType === "Coupon") {
          handleupdatdcoupon({
            Amount: 0,
          });
        } else {
          setSection(section1);
          updatepoint(
            {
              amount:
                designformData?.UpperRadio === "spend" ? purchaseAmount : "",
              comment: "",
            },
            section1
          );
        }
      } else {
        updateredeem(
          {
            amount: 0,
            comment: "",
            cardType: designformData?.cardType,
            earnPointsWhenRedeemReward:
              designformData?.earnPointsWhenRedeemReward,
          },
          section1
        );
      }
    } else {
      setSection(section1);
      setOpen(true);
    }
  };

  const hostkey = async (data, section1, pointdata) => {
    let cards = alldata?.cards;
    //console.log(section, cards[0].pendding)
    try {
      let message;
      setLoading(true);
      if (designformData.cardType === "Stamp" && section1 === "point") {
        //console.log(cards[0].pendding, "this is pendding data")
        // Extract initial data
        const totalStamps = designformData?.selectedNumber;
        if (alldata?.cards[0]?.pendding === 0) {
          const initialRemainingStamps =
            cards[0].remainingStamps + designformData?.selectedNumber;
          const effectivePoints = pointdata % totalStamps;
          if (pointdata + cards[0].consumedStamps >= totalStamps) {
            cards[0].remainingStamps = 0;
            cards[0].pendding =
              pointdata + cards[0].consumedStamps - totalStamps;
            //console.log((pointdata + cards[0].consumedStamps) ,"-", totalStamps,"=",cards[0].pendding)
            cards[0].rewards = Math.floor(
              (pointdata + cards[0].consumedStamps) / totalStamps
            );
            //console.log("these are rewards",Math.floor((pointdata + cards[0].consumedStamps)/totalStamps))
            cards[0].consumedStamps = totalStamps;
          } else {
            const stampsUsed =
              effectivePoints > initialRemainingStamps
                ? totalStamps - (effectivePoints - initialRemainingStamps)
                : initialRemainingStamps - effectivePoints;
            const newdata = stampsUsed % totalStamps;
            cards[0].remainingStamps = newdata;
            // Update consumed stamps
            cards[0].consumedStamps = totalStamps - cards[0].remainingStamps;
          }

          cards[0].availabletotalstamps =
            cards[0]?.pendding === 0
              ? cards[0]?.consumedStamps
              : cards[0]?.pendding + cards[0]?.consumedStamps;
        } else {
          cards[0].rewards = Math.floor(
            (cards[0].consumedStamps + cards[0]?.pendding + pointdata) /
              cards[0]?.totalStamps
          );
          cards[0].pendding = cards[0]?.pendding + pointdata;
          cards[0].availabletotalstamps =
            cards[0]?.pendding === 0
              ? cards[0]?.consumedStamps
              : cards[0]?.pendding + cards[0]?.consumedStamps;
        }
        // Set total stamps and message
        cards[0].totalStamps = totalStamps;
        message = designformData?.earnedStampMessage?.replace(
          /{#}/g,
          cards[0]?.remainingStamps
        );

        //console.log("used stamps", cards[0].consumedStamps)
      } else {
        cards[0].rewards = cards[0].rewards + pointdata;
      }
      // await new Promise(resolve => setTimeout(resolve, 1000))
      const imageBlob = await createImage("cardImage");
      const fileName = "cardimage.jpg";
      const file = new File([imageBlob], fileName, { type: "image/jpeg" });
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
        event: "Bonus points earned",
        cardType: designformData?.cardType,
        message: message,
        totalStamps: cards[0]?.availabletotalstamps,
        remainingStamps: cards[0]?.remainingStamps,
        addedStamps: pointdata,
        imagecard,
        imagecardkey,
      });

      //console.log(response.data.data, "this is response data of transaction");
      if (response.status === 200) {
        if (response.data.data) {
          dispatch(AddNewtransaction(response.data.data));
        }
        setLoading(false);
        setBarCodeData("");
        toast.success("Points updated successfully");
      }
    } catch (error) {
      toast.error("failed to update Points");
      //console.log("error", error)
      setLoading(false);
    }
  };

  const updatepoint = async (data, section1) => {
    let cards = alldata?.cards;
    //console.log(section, cards[0].pendding)
    try {
      let message;
      setLoading(true);
      if (designformData.cardType === "Stamp" && section1 === "point") {
        //console.log(cards[0].pendding, "this is pendding data")
        // Extract initial data
        const totalStamps = designformData?.selectedNumber;
        if (alldata?.cards[0]?.pendding === 0) {
          const initialRemainingStamps =
            cards[0].remainingStamps + designformData?.selectedNumber;
          const effectivePoints = points % totalStamps;
          if (points + cards[0].consumedStamps >= totalStamps) {
            cards[0].remainingStamps = 0;
            cards[0].pendding = points + cards[0].consumedStamps - totalStamps;
            //console.log((points + cards[0].consumedStamps) ,"-", totalStamps,"=",cards[0].pendding)
            cards[0].rewards = Math.floor(
              (points + cards[0].consumedStamps) / totalStamps
            );
            //console.log("these are rewards",Math.floor((points + cards[0].consumedStamps)/totalStamps))
            cards[0].consumedStamps = totalStamps;
          } else {
            const stampsUsed =
              effectivePoints > initialRemainingStamps
                ? totalStamps - (effectivePoints - initialRemainingStamps)
                : initialRemainingStamps - effectivePoints;
            const newdata = stampsUsed % totalStamps;
            cards[0].remainingStamps = newdata;
            // Update consumed stamps
            cards[0].consumedStamps = totalStamps - cards[0].remainingStamps;
          }

          cards[0].availabletotalstamps =
            cards[0]?.pendding === 0
              ? cards[0]?.consumedStamps
              : cards[0]?.pendding + cards[0]?.consumedStamps;
        } else {
          cards[0].rewards = Math.floor(
            (cards[0].consumedStamps + cards[0]?.pendding + points) /
              cards[0]?.totalStamps
          );
          cards[0].pendding = cards[0]?.pendding + points;
          cards[0].availabletotalstamps =
            cards[0]?.pendding === 0
              ? cards[0]?.consumedStamps
              : cards[0]?.pendding + cards[0]?.consumedStamps;
        }
        // Set total stamps and message
        cards[0].totalStamps = totalStamps;
        message = designformData?.earnedStampMessage?.replace(
          /{#}/g,
          cards[0]?.remainingStamps
        );

        //console.log("used stamps", cards[0].consumedStamps)
      } else {
        cards[0].rewards = cards[0].rewards + points;
      }
      // await new Promise(resolve => setTimeout(resolve, 1000))
      const imageBlob = await createImage("cardImage");
      const fileName = "cardimage.jpg";
      const file = new File([imageBlob], fileName, { type: "image/jpeg" });
      const image = await handleUpload(file);
      const imagecard = image.Location;
      const imagecardkey = image.Key;
      console.log(data, "this is data");
      console.log(cards[0], "this is card data");
      const response = await createTransactions({
        cardId: designformData?._id,
        customerId: alldata?._id,
        businessId: alldata?.businessId,
        Balance: cards[0].rewards,
        Amount: data?.amount,
        Transactionamount: data?.amount,
        cards: cards,
        event: "Bonus points earned",
        cardType: designformData?.cardType,
        message: message,
        totalStamps: cards[0]?.availabletotalstamps,
        remainingStamps: cards[0]?.remainingStamps,
        addedStamps: points,
        imagecard,
        imagecardkey,
      });

      //console.log(response.data.data, "this is response data of transaction");
      if (response.status === 200) {
        if (response.data.data) {
          dispatch(AddNewtransaction(response.data.data));
        }
        setLoading(false);
        setBarCodeData("");
        toast.success("Points updated successfully");
      }
    } catch (error) {
      toast.error("failed to update Points");
      //console.log("error", error)
      setLoading(false);
    }
  };
  const updateredeem = async (data, section1) => {
    try {
      setLoading(true);
      let cards = alldata?.cards;
      cards[0].rewards = cards[0].rewards - points;
      if (
        data?.earnPointsWhenRedeemReward === true ||
        data?.cardType === "Reward"
      ) {
        cards[0].rewards = Number(cards[0].rewards) + Number(data?.amount);
      } else if (designformData.cardType === "Stamp" && section1 === "redeem") {
        if (cards[0].pendding >= cards[0].totalStamps) {
          cards[0].remainingStamps = 0;
          cards[0].consumedStamps = cards[0].totalStamps;
          cards[0].pendding = cards[0].pendding - cards[0].totalStamps;
          cards[0].rewards = Math.floor(
            (cards[0].pendding + cards[0].consumedStamps) / cards[0].totalStamps
          );
          cards[0].availabletotalstamps =
            cards[0]?.pendding === 0
              ? cards[0]?.consumedStamps
              : cards[0]?.pendding + cards[0]?.consumedStamps;
          //console.log(Math.floor((alldata?.cards[0]?.pendding+cards[0].consumedStamps)/cards[0].totalStamps), "this is pending data1")
        } else {
          //console.log(cards[0].pendding, "this is pending data2")
          cards[0].remainingStamps = cards[0].totalStamps - cards[0].pendding;
          cards[0].consumedStamps = cards[0].pendding;
          cards[0].pendding = 0;
          cards[0].rewards = 0;
          cards[0].availabletotalstamps =
            cards[0]?.pendding === 0
              ? cards[0]?.consumedStamps
              : cards[0]?.pendding + cards[0]?.consumedStamps;
        }
      }
      // await new Promise(resolve => setTimeout(resolve, 1000))

      const imageBlob = await createImage("cardImage");
      const fileName = "cardimage.jpg";
      const file = new File([imageBlob], fileName, { type: "image/jpeg" });
      const image = await handleUpload(file);
      const imagecard = image.Location;
      const imagecardkey = image.Key;
      let response = await createTransactions({
        cardId: designformData?._id,
        customerId: alldata?._id,
        businessId: alldata?.businessId,
        Balance: cards[0].rewards,
        Amount: data?.amount,
        Transactionamount: data?.amount,
        cards: cards,
        cardType: designformData?.cardType,
        event: "Bonus points redeemed",
        usedpoints: points,
        message: designformData?.earnedRewardMessage,
        totalStamps: cards[0]?.availabletotalstamps,
        remainingStamps: cards[0]?.remainingStamps,
        imagecard,
        imagecardkey,
      });

      if (response.status === 200) {
        if (response.data.data) {
          dispatch(AddNewtransaction(response.data.data));
        }

        setLoading(false);
        setBarCodeData("");
        toast.success("Reward updated successfully");
      }
    } catch (error) {
      toast.success("failed to update Points");
      //console.log(error, "this is error")
      setLoading(false);
    }
  };

  const handleupdatediscount = async (data) => {
    // //console.log(data)
    try {
      setLoading(true);
      let cards = alldata?.cards;

      cards[0].discount = data?.discount;

      const response = await createTransactions({
        cardId: designformData?._id,
        customerId: alldata?._id,
        businessId: alldata?.businessId,
        Amount: points,
        Transactionamount: points,
        saving: data?.savings,
        discountstatus: data?.discountstatus,
        event: "Get discount",
        cardType: designformData?.cardType,
        cards: cards,
        Balance: cards[0]?.discount.Transactionamount,
      });
      if (response.status === 200) {
        if (response.data.data) {
          dispatch(AddNewtransaction(response.data.data));
        }
        setLoading(false);
        setBarCodeData("");
        toast.success("Points updated successfully");
      }
    } catch (error) {
      // //console.log(error, "these are error")
      toast.success("failed to update Points");
      setLoading(false);
    }
  };

  const handleupdatdcoupon = async (data) => {
    // //console.log(data)
    try {
      setLoading(true);
      let cards = [...alldata.cards];
      cards[0] =
        designformData?.linkedCardTemplate === "without"
          ? {
              ...cards[0],
              cardId: designformData?._id,
              couponstatus: "redeemed",
            }
          : {
              ...cards[0],
              cardId: designformData?.linkedCardTemplate?._id,
              rewards:
                designformData?.linkedCardTemplate
                  ?.numberOfStampsWhenIssuingCard ===
                designformData?.linkedCardTemplate?.selectedNumber
                  ? 1
                  : 0,
              consumedStamps:
                designformData?.linkedCardTemplate
                  ?.numberOfStampsWhenIssuingCard,
              availabletotalstamps:
                designformData?.linkedCardTemplate
                  ?.numberOfStampsWhenIssuingCard,
              remainingStamps:
                designformData?.linkedCardTemplate?.selectedNumber -
                designformData?.linkedCardTemplate
                  ?.numberOfStampsWhenIssuingCard,
              totalStamps: designformData?.linkedCardTemplate?.selectedNumber,
            };

      const response = await createTransactions({
        cardId:
          designformData?.linkedCardTemplate === "without"
            ? designformData?._id
            : designformData?.linkedCardTemplate?._id,
        customerId: alldata?._id,
        // businessId: alldata?.businessId,
        Transactionamount: data?.Amount,
        event: "Redeem Coupon",
        cardType: designformData?.cardType,
        cards: cards,
      });
      if (response.status === 200) {
        setLoading(false);
        if (response.data.data) {
          dispatch(AddNewtransaction(response.data.data));
        }
        setBarCodeData("");
        toast.success("Points updated successfully");
      }
    } catch (error) {
      // //console.log(error, "these are error")
      toast.success("failed to update Points");
      setLoading(false);
    }
  };

  console.log(alldata?.cards, "thia is all data");

  // console.log(designformData,"thiss")

  return (
    <div>
      {alldata && (
        <div className="flex justify-around  gap-12  flex-col lg:flex-row mt-7">
          <CustomerPreview alldata={alldata} />
          <Cardpreview
            alldata={alldata}
            designformData={designformData}
            routeMa={routeMa}
            activeStampList={activeStampList}
            disableStampList={disableStampList}
          />
          {designformData?.cardType === "Stamp" ? (
            <StampPreview
              updatepoint={hostkey}
              alldata={alldata}
              designformData={designformData}
              activeStampList={activeStampList}
              disableStampList={disableStampList}
              points={points}
              handleAddPoint={handleAddPoint}
              handleRedeemPoint={handleRedeemPoint}
              setPoints={setPoints}
              setSection={setSection}
              isAdding={isAdding}
              openModal={openModal}
              section={section}
            />
          ) : designformData?.cardType === "Reward" ? (
            <RewardPreview
              alldata={alldata}
              designformData={designformData}
              activeStampList={activeStampList}
              disableStampList={disableStampList}
              points={points}
              handleAddPoint={handleAddPoint}
              handleRedeemPoint={handleRedeemPoint}
              setPoints={setPoints}
              setSection={setSection}
              isAdding={isAdding}
              openModal={openModal}
              section={section}
              purchaseAmount={purchaseAmount}
              setPurchaseAmount={setPurchaseAmount}
            />
          ) : designformData?.cardType === "Coupon" ? (
            <CouponPreview
              alldata={alldata}
              designformData={designformData}
              activeStampList={activeStampList}
              disableStampList={disableStampList}
              points={points}
              handleAddPoint={handleAddPoint}
              handleRedeemPoint={handleRedeemPoint}
              setPoints={setPoints}
              setSection={setSection}
              isAdding={isAdding}
              openModal={openModal}
              section={section}
            />
          ) : (
            <DiscountPreview
              handleupdatediscount={handleupdatediscount}
              alldata={alldata}
              designformData={designformData}
              points={points}
              setPoints={setPoints}
              isAdding={isAdding}
              openModal={openModal}
              section={section}
              settotaldata={settotaldata}
            />
          )}
        </div>
      )}
      <ConfirmationModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        designformData={designformData}
        userName={alldata?.first_name + " " + alldata?.last_name}
        numberOfStamps={12}
        updatepoint={updatepoint}
        updateredeem={updateredeem}
        section={section}
        points={points}
        handleupdatediscount={handleupdatediscount}
        totaldata={totaldata}
        handleupdatdcoupon={handleupdatdcoupon}
      />
      <Loader loading={loading} />
    </div>
  );
};
export default CustomerdetailView;
