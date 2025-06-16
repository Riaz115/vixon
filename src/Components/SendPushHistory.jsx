import React, { useEffect } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { useState } from "react";
import { Loader } from "./Loader/loader";
import toast from "react-hot-toast";
import { deletenotification } from "../api/createstamp";
import DeleteNotification from "./modal/DeleteNotification";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
const options = {
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
};

function SendPushHistory({ single, setNotification }) {
  const { t } = useTranslation("sendpushhistory");

  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deletenotification(id);
      if (response.status === 200) {
        const filter = single.notificationHistory.filter(
          (item) => item._id !== id
        );
        setNotification(filter);
        toast.success(t("deleteSuc"));
        setLoading(false);
        setOpen(false);
      }
    } catch (error) {
      toast.error(t("fialDelMsg"));
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 box-border m-auto border border-[#D5D5DD] rounded-md">
      <div className="px-5 pt-2 pb-3 text-xl border-b border-[#D5D5DD]">
        {t("history")}
      </div>
      <div className="px-4 pb-4 box-border">
        {single?.notificationHistory?.map((item, index) => {
          return (
            <HistoryRow
              t={t}
              setOpen={setOpen}
              key={index}
              item={item}
              setId={setId}
            />
          );
        })}
      </div>
      <DeleteNotification
        t={t}
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        handleDelete={handleDelete}
      />
      <Loader loading={loading} />
    </div>
  );
}

function HistoryRow({ item, setOpen, setId, t }) {
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  }, [isCopied]);

  return (
    <div>
      <div className="flex gap-2 justify-between relative w-full px-3 top-6 sm:top-4">
        <div className="border border-[#D5D5DD] bg-white py-1 px-2 rounded-md text-[14px]">
          {new Date(item?.createdAt)?.toLocaleString("en-US", options)}{" "}
          {item?.intervalTime && (
            <span
              aria-disabled={new Date(item?.intervalTime) > new Date()}
              className={`${
                new Date(item?.intervalTime) > new Date() && "text-gray-300"
              }`}
            >
              - {new Date(item?.intervalTime)?.toLocaleString("en-US", options)}
            </span>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <div className="border border-[#D5D5DD] bg-white py-1 px-2 rounded-md text-[14px]">
            {t("deliver")} {item?.receiver}
          </div>
          <div className="border border-[#D5D5DD] bg-white py-1 px-2 rounded-md text-[14px]">
            <button
              onClick={() => {
                setOpen(true);
                setId(item?._id);
              }}
            >
              <MdDelete className="text-red-500 text-[20px]" />
            </button>
          </div>

          <div
            className={`flex items-center gap-1 cursor-pointer p-2 rounded-md border ${
              isCopied
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-700 border-[#D5D5DD]"
            } transition-colors duration-300`}
            onClick={() => {
              handleCopy(item.body, t);
              setIsCopied(true);
            }}
          >
            <MdOutlineContentCopy size={20} />
            <span className="text-sm">
              {isCopied ? t("copied") : t("copy")}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#F6F6F6] pt-8 sm:pt-8 pb-3 sm:pb-6 px-3 rounded-md border border-[#D5D5DD] shadow">
        {item?.body}
      </div>
    </div>
  );
}
const handleCopy = (text, t) => {
  if (window.self !== window.top) {
    // If running inside an iframe, send a message to the parent window
    window.parent.postMessage({ action: "copyToClipboard", text }, "*");
    toast.success(t("copyReqSendPrnt"));
  } else {
    // If not in an iframe, perform the copy action locally
    navigator.clipboard.writeText(text).then(() => {
      toast.success(t("cpytoClipBrd"));
    });
  }
};

export default SendPushHistory;
