import React from "react";
import toast from "react-hot-toast";
import {
  IoIosArrowRoundDown,
  IoIosArrowRoundUp,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { IoRemoveOutline } from "react-icons/io5";

function Card({ heading, rightOption, profit, children }) {
  return (
    <div className="bg-white shadow box-border px-4 py-3 rounded ">
      <div className="card-head flex justify-between items-center">
        <span className="text-[#333333] text-lg">{heading}</span>
        {rightOption === "nothing" ? (
          ""
        ) : rightOption === "icon" ? (
          <IoIosInformationCircleOutline className="text-xl mt-1 text-[#33333397]" />
        ) : (
          <>
            <RightSideComponent profit={profit} value={rightOption} />
          </>
        )}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

function RightSideComponent({ value, profit }) {
  return (
    <div className="flex flex-col justify-between items-center">
      {profit === "positive" ? (
        <>
          <span className="flex justify-center bg-[#1dcd262f] p-1 rounded-full mt-2">
            <IoIosArrowRoundUp className="text-[#1dcd26] text-xl" />
          </span>
          <span className="text-[#1DCD27] xl:text-[14px] 2xl:text-[16px]">
            {value}
          </span>
        </>
      ) : profit === "neutral" ? (
        <>
          <span className="flex justify-center bg-[#FEF1E1] p-1 rounded-full mt-2">
            <IoRemoveOutline className="text-[#C57B21] text-xl" />
          </span>
          <span className="text-[#C57B21] xl:text-[14px] 2xl:text-[16px]">
            {value}
          </span>
        </>
      ) : profit === "negative" ? (
        <>
          <span className="flex justify-center bg-[#ffdadabb] p-1 rounded-full mt-2">
            <IoIosArrowRoundDown className="text-[#ff5656] text-xl" />
          </span>
          <span className="text-[#ff5656] xl:text-[14px] 2xl:text-[16px]">
            {value}
          </span>
        </>
      ) : (
        <>Data not added</>
      )}
    </div>
  );
}

export default Card;
