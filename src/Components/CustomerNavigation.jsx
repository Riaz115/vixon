import React from "react";
import { NavLink } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function CustomerNavigation({ customerid }) {
  const { t } = useTranslation("customernavigation");
  return (
    <div className="fixed top-16 left-0 w-full overflow-auto bg-[#2E2E2E] flex items-center gap-2 box-border px-4 py-3 pt-6 z-30">
      <div className="pr-3">
        <FaRegUserCircle className="text-2xl text-white" />
      </div>

      <NavLink
        to={`/customer/profile/${customerid}`}
        className={({ isActive }) =>
          isActive
            ? " px-4 text-nowrap bg-white text-black border border-[#83838A] h-[33px] flex justify-center items-center rounded"
            : " px-4 text-nowrap bg-[#454545] text-white border border-[#83838A] h-[33px] flex justify-center items-center rounded"
        }
      >
        {t("profile")}
      </NavLink>
      <NavLink
        to={`/customer/send-push/${customerid}`}
        className={({ isActive }) =>
          isActive
            ? " px-4 text-nowrap bg-white text-black border border-[#83838A] h-[33px] flex justify-center items-center rounded"
            : " px-4 text-nowrap bg-[#454545] text-white border border-[#83838A] h-[33px] flex justify-center items-center rounded"
        }
      >
        {t("sendpush")}
      </NavLink>
      <NavLink
        to={`/customer/information/${customerid}`}
        className={({ isActive }) =>
          isActive
            ? " px-4 text-nowrap bg-white text-black border border-[#83838A] h-[33px] flex justify-center items-center rounded"
            : " px-4 text-nowrap bg-[#454545] text-white border border-[#83838A] h-[33px] flex justify-center items-center rounded"
        }
      >
        {t("info")}
      </NavLink>
    </div>
  );
}

export default CustomerNavigation;
