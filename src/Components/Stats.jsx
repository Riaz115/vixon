import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoRemoveOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import toast from "react-hot-toast";

function Stats({ heading, amount, change, profit, border=false, rating }) {
  return rating ? (
    <Rating_Stat heading={heading} rating={rating} />
  ) : (
    <Digital_Stat
      heading={heading}
      amount={amount}
      change={change}
      border={border}
      profit={profit}
    />
  );
}

function Rating_Stat({ heading, rating }) {
  return (
    <div className="flex justify-between border border-gray-200 shadow bg-white rounded box-border p-4 ">
      <div>
        <span className="text-3xl 2xl:text-4xl text-[#333333] flex relative right-1">
          <CiStar className="text-[#D5D5DD]" />
          <CiStar className="text-[#D5D5DD]" />
          <CiStar className="text-[#D5D5DD]" />
          <CiStar className="text-[#D5D5DD]" />
          <CiStar className="text-[#D5D5DD]" />
        </span>
        <div className="my-1"></div>
        <span className="text-[12px] 2xl:text-[14px] text-[#656565]">
          {heading}
        </span>
      </div>
      <div>
        <span className="flex justify-center rounded-full">
          <IoIosInformationCircleOutline className="text-xl" />
        </span>
      </div>
    </div>
  );
}
function Digital_Stat({ heading, amount, change, border, profit }) {
  return (
    <div
      className={`flex justify-between bg-white rounded box-border p-4 ${
        border ? "border border-gray-200 shadow" : ""
      }`}
    >
      <div>
        <span className="text-3xl 2xl:text-4xl text-[#333333]">{amount}</span>
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
              <IoRemoveOutline className="text-[#D2711E] text-xl" />
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
          <>
            Data not added
            {(() => {
              toast.error("Please pass all the props that is required");
              return "";
            })()}
          </>
        )}
      </div>
    </div>
  );
}

export default Stats;
