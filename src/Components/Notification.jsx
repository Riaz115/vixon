import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

function Notification() {
  const [notificationState, setNotificationState] = useState(true);
  return (
    <>
      {notificationState && (
        <div className="mb-2 border border-[#1DCD27] box-border py-2 px-2 sm:px-4 rounded-md bg-[#EDFCEE] flex justify-between items-center flex-wrap">
          <span className="text-[#1DCD27]">
            Each invested $1 generates you $7,192.37 as a return on investments
          </span>
          <IoMdClose
            onClick={() => setNotificationState(false)}
            className="text-[#1DCD27] text-xl hidden sm:block cursor-pointer"
          />
        </div>
      )}
    </>
  );
}

export default Notification;




