import React, { useEffect, useState } from "react";
import StampPage from "./StampPage";
import { installationcard } from "../../api/createstamp";
import { Loader } from "../../Components/Loader/loader";
import Alertmessage from "./Alertmessage";
import toast from "react-hot-toast";
import {
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
import { routeMa } from "../../data";
import RewardPage from "./RewardPage";
import CouponPage from "./CouponPage";
import DiscountPage from "./DiscountPage";
import { useNavigate } from "react-router-dom";
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
const Mobilecustomerview = ({ data, setmessage,setBarCodeData }) => {
    //console.log(data, "this is data form QR code")
    const [loading, setLoading] = useState(false);
    const [alldata, setalldata] = useState();
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const [designformData, setdesignFormData] = useState();
    useEffect(() => {
        const get = async () => {
            try {
                setLoading(true);
                const response = await installationcard(data);
                if (response.status === 200 || response.status === 201) {
                    setdesignFormData(response?.data?.findcard);
                    setalldata(response?.data?.customer);
                    setLoading(false);
                } else if (response.status === 401) {
                    setLoading(false);
                    localStorage.removeItem("mytoken")
                    navigate("/User-login")
                } else if (response.status === 400) {
                    setLoading(false);
                    setMessage(error?.response?.data?.message);
                    // setBarCodeData()
                }

            } catch (error) {
                setLoading(false);
                if (error.response.status === 401) {

                    localStorage.removeItem("mytoken")
                    navigate("/User-login")
                } else if (error.response.status === 400) {
                    setMessage(error?.response?.data?.message);
                    // setBarCodeData()
                }
                toast.error(error?.response?.data?.message);
            }
        }
        if (data) {
            get();
        }
    }, [data])
    return (
        <>
            {!message ? <div>
                {designformData?.cardType === "Stamp" ? (<StampPage alldata={alldata} designformData={designformData} routeMa={routeMa} activeStampList={activeStampList} disableStampList={disableStampList} setmessage={setmessage} />
                )
                    : designformData?.cardType === "Reward" ? (<RewardPage alldata={alldata} designformData={designformData} routeMa={routeMa} activeStampList={activeStampList} disableStampList={disableStampList} setmessage={setmessage} />
                    )
                        : designformData?.cardType === "Coupon" ? (<CouponPage alldata={alldata} designformData={designformData} routeMa={routeMa} activeStampList={activeStampList} disableStampList={disableStampList} setmessage={setmessage} />)
                            : (<DiscountPage alldata={alldata} designformData={designformData} routeMa={routeMa} activeStampList={activeStampList} disableStampList={disableStampList} setmessage={setmessage} />
                            )}

                <Loader loading={loading} />


            </div> :
                <Alertmessage message={message} setMessage={setMessage} setBarCodeData={setBarCodeData} />}
        </>
    );
};

export default Mobilecustomerview;