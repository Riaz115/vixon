import React from "react";
import { BiSolidBuilding } from "react-icons/bi";
import { CiCircleQuestion } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function StampsNavigation2({ cardid }) {
  const { t } = useTranslation("stampnavigation");
  return (
    <div className="fixed left-0 top-16 w-full overflow-auto bg-[#2E2E2E] flex items-center justify-between gap-2 box-border px-4 py-5 pt-8 z-30">
      <div className="flex items-center gap-2">
        <div className="pr-3">
          <BiSolidBuilding className="text-2xl text-white" />
        </div>

        <NavLink
          to={`/pass/pass-settings/${cardid}`}
          className={({ isActive }) =>
            isActive
              ? " px-4 text-nowrap bg-white text-black border border-[#83838A] h-8 flex justify-center items-center rounded"
              : " px-4 text-nowrap bg-[#454545] text-white border border-[#83838A] h-8 flex justify-center items-center rounded"
          }
        >
          {t("information")}
        </NavLink>
        <NavLink
          to={`/pass/pass-customer/${cardid}`}
          className={({ isActive }) =>
            isActive
              ? " px-4 text-nowrap bg-white text-black border border-[#83838A]  h-8 flex justify-center items-center rounded"
              : " px-4 text-nowrap bg-[#454545] text-white border border-[#83838A]  h-8 flex justify-center items-center rounded"
          }
        >
          {t("customers")}
        </NavLink>
        <NavLink
          to={`/pass/pass-send-push/${cardid}`}
          className={({ isActive }) =>
            isActive
              ? " px-4 text-nowrap bg-white text-black border border-[#83838A] h-8 flex justify-center items-center rounded"
              : " px-4 text-nowrap bg-[#454545] text-white border border-[#83838A] h-8 flex justify-center items-center rounded"
          }
        >
          {t("sendpush")}
        </NavLink>
        <NavLink
          to={`/pass/pass-statistics/${cardid}`}
          className={({ isActive }) =>
            isActive
              ? " px-5 text-nowrap bg-white text-black border border-[#83838A] h-8 flex justify-center items-center rounded"
              : " px-5 text-nowrap bg-[#454545] text-white border border-[#83838A] h-8 flex justify-center items-center rounded"
          }
        >
          {t("statics")}
        </NavLink>
      </div>
      <div className="flex gap-2">
        <NavLink
          to={`/cards/${cardid}`}
          className={({ isActive }) =>
            isActive
              ? " px-8 text-nowrap bg-white text-black border border-[#83838A] h-8 flex justify-center items-center rounded"
              : " px-8 text-nowrap bg-[#454545] text-white border border-[#83838A] h-8 flex justify-center items-center rounded"
          }
        >
          {t("edit")}
        </NavLink>
      </div>
    </div>
  );
}

export default StampsNavigation2;
