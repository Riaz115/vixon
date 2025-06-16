import React, { useEffect, useState } from "react";
import Transactions from "../../Components/table/Transactions";
import { LiaEdit } from "react-icons/lia";
import Stats from "../../Components/Stats";
import { IoRemoveOutline } from "react-icons/io5";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { Avatar, styled } from "@mui/material";
import { motion } from "framer-motion";
import { pageVariants } from "../../Animation";
import { useOutletContext } from "react-router-dom";
import { frontendUrl } from "../../config";
import { selecttransactions } from "../../redux/transactionSlice";
import { selectstamps } from "../../redux/stampSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
function CustomerProfile() {
  const { t } = useTranslation("customerprofile");
  const single = useOutletContext();
  const transactiondata = useSelector(selecttransactions);
  const [cardtransation, setCardtransation] = useState();
  const allstamps = useSelector(selectstamps);
  //console.log(single,"this is single customer")

  useEffect(() => {
    const data = transactiondata?.filter(
      (item) => item?.customerId?._id === single?._id
    );
    // //console.log(data,"this is data")
    setCardtransation(data);
  }, [transactiondata, single]);
  // //console.log(single, "this is single data")

  const findcard = (id) => {
    const finddata = allstamps?.find((item) => item?._id === id);
    // //console.log(finddata,"this is find card data")
    return finddata;
  };
  useEffect(() => {
    document.title = t("title");
  }, []);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="pt-5">
        <h2 className="text-2xl mb-6">{t("info")}</h2>
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-7 md:col-span-4 lg:col-span-5 bg-white p-4 box-border rounded shadow border flex items-center">
            <SmallTextAvatar className="mr-2">{t("fa")}</SmallTextAvatar>
            <div className="ml-3">
              <div className=" text-3xl 2xl:text-4xl text-[#333333]">
                {single?.first_name + " " + single?.last_name}
              </div>
              <div className="text-sm text-[#656565] mt-1">{t("name")}</div>
            </div>
          </div>
          <div className="col-span-7 md:col-span-3 lg:col-span-2">
            <StatCard
              title={t("cardisdate")}
              value={new Date(single?.createdAt)?.toLocaleDateString()}
            />
          </div>
        </div>
        <div className="mt-7 mb-8">
          <h2 className="text-2xl mb-2">{t("customercard")}</h2>
          {single?.cards?.map((item, index) => {
            return (
              <span
                key={index}
                className="text-white bg-black py-1 px-4 text-sm mr-2 rounded"
              >
                {findcard(item?.cardId)?.stampName}
              </span>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <StatWithIncrementDecrement
            amount={1}
            change={"+1"}
            heading={t("totalvisit")}
            profit={"positive"}
            border={true}
          />
          <StatCard
            title={t("status")}
            text={"green"}
            value={single?.cards[0]?.status}
          />
          <StatCard
            title={t("cardexpdate")}
            value={
              findcard(single?.cards[0]?.cardId)?.cardExpirationFixedTermDate
            }
          />
          <StatCard title={t("cardvaldate")} value={t("nodata")} />
          <div className="bg-white p-3 box-border rounded shadow border flex flex-col justify-between">
            <div className="flex gap-1 my-2 flex-wrap mb-2">
              <span className="text-white bg-black py-1 px-4 text-sm mr-2 rounded">
                {t("rmfcamp")}
              </span>
              <span className="text-white bg-black py-1 px-4 text-sm mr-2 rounded">
                {t("cardinstalled")}
              </span>
              <span className="text-white bg-black py-1 px-4 text-sm mr-2 rounded">
                {t("appwalet")}
              </span>
            </div>
            <span className="text-sm text-[#656565] pl-1">{t("segments")}</span>
          </div>
          <Stats heading={t("feedrating")} rating={4} />
          <StatCard title={t("cardserno")} value={single?.cards[0]?._id} />
          <StatCard title={t("instondev")} value={single?.cards[0]?.device} />
          <Stats
            amount={1}
            change={"+1"}
            heading={t("totalvisit")}
            profit={"positive"}
            border={true}
          />
          <div className="bg-white p-3 box-border rounded shadow border flex flex-col justify-between">
            <div className="text-white bg-[#25CF43] w-max py-2 px-3 rounded">
              {single?.cards[0]?.device}
            </div>
            <span className="text-sm text-[#656565] pl-1">{t("umt")}</span>
          </div>

          <StatCard
            title={t("cardisdate")}
            value={new Date(single?.createdAt)?.toLocaleDateString()}
          />
          {/* <div className='bg-white p-3 box-border rounded shadow border  flex flex-col justify-between'>
            <div className='border border-gray-300 rounded text-center text-lg p-[5px] mb-1 mx-2 text-[#1F1E1F]'>
              View custom fields
            </div>
          
          </div> */}
        </div>
        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-5 box-border rounded shadow border flex justify-between">
            <div>
              <p className="text-2xl text-[#333333] truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] sm:max-w-[300px]">
                {frontendUrl}
                {t("cardinst")}
                {single?._id}
              </p>
              <p className="text-sm text-[#656565] mt-1">{t("cardinstlink")}</p>
            </div>
            <div
              className="text-white bg-black rounded-md flex justify-center items-center px-8 cursor-pointer"
              onClick={() => {
                const link = `${frontendUrl}/cardinstallation/${single?._id}`;
                handleCopy(link);
              }}
            >
              {t("copy")}
            </div>
          </div>
        </div>
        <h2 className="text-2xl mb-2 mt-7">{t("lastrans")}</h2>
        <Transactions setCsvdata={() => {}} cardtransation={cardtransation} />
      </div>
    </motion.div>
  );
}
const SmallTextAvatar = styled(Avatar)({
  height: 65,
  width: 65,
  backgroundColor: "black",
  fontSize: "17px", // Adjust the font size here
});

function StatCard({ title, value, icon, text }) {
  return (
    <div className="bg-white p-3 box-border rounded shadow border">
      <div className="flex justify-between mb-2">
        {text === "green" ? (
          <span className="text-4xl 2xl:text-5xl font-light text-[#1DCD27] truncate">
            {value}
          </span>
        ) : (
          <span className="text-4xl 2xl:text-5xl font-light truncate">
            {value}
          </span>
        )}

        <span>
          <LiaEdit className="text-[#656565] text-xl" />
        </span>
      </div>
      <span className="text-sm text-[#656565]">{title}</span>
    </div>
  );
}

function StatWithIncrementDecrement({
  heading,
  amount,
  change,
  border,
  profit,
}) {
  const [value, setValue] = React.useState(amount);
  return (
    <div
      className={`flex justify-between bg-white rounded box-border p-4 ${
        border ? "border border-gray-200 shadow" : ""
      }`}
    >
      <div>
        <span className="flex gap-2">
          <div className="border flex flex-col rounded-lg w-[40px]">
            <div
              className="border-b w-full text-center cursor-pointer"
              onClick={() => setValue((prev) => prev + 1)}
            >
              +
            </div>
            <div
              className="w-full text-center cursor-pointer"
              onClick={() => setValue((prev) => prev - 1)}
            >
              -
            </div>
          </div>
          <span className="text-3xl 2xl:text-4xl text-[#333333]">{value}</span>
        </span>
        <div className="my-1"></div>
        <span className="text-[12px] 2xl:text-[14px] text-[#656565]">
          {heading}
        </span>
      </div>
      <div className="flex flex-col justify-between items-center">
        {profit === "positive" ? (
          <>
            <span className="flex justify-center bg-[#1dcd262f] p-1 rounded-full mt-2">
              <IoIosArrowRoundUp className="text-[#1dcd26] text-xl" />
            </span>
            <span className="text-[#1DCD27] xl:text-[14px] 2xl:text-[16px]">
              {change}
            </span>
          </>
        ) : profit === "neutral" ? (
          <>
            <span className="flex justify-center bg-[#FEF1E1] p-1 rounded-full mt-2">
              <IoRemoveOutline className="text-[#C57B21] text-xl" />
            </span>
            <span className="text-[#C57B21] xl:text-[14px] 2xl:text-[16px]">
              {change}
            </span>
          </>
        ) : profit === "negative" ? (
          <>
            <span className="flex justify-center bg-[#ffdadabb] p-1 rounded-full mt-2">
              <IoIosArrowRoundDown className="text-[#ff5656] text-xl" />
            </span>
            <span className="text-[#ff5656] xl:text-[14px] 2xl:text-[16px]">
              {change}
            </span>
          </>
        ) : (
          <>{t("datanotadded")}</>
        )}
      </div>
    </div>
  );
}

const handleCopy = (text) => {
  if (window.self !== window.top) {
    // Send message to parent window if in iframe
    window.parent.postMessage({ action: "copyToClipboard", text }, "*");
    toast.success(t("toastsendpar"));
  } else {
    // Copy directly if not in iframe
    navigator.clipboard.writeText(text).then(() => {
      toast.success(t("copytoclip"));
    });
  }
};
export default CustomerProfile;
