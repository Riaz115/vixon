import React from "react";
import { Outlet } from "react-router-dom";
import ChatNavigation from "../../Components/ChatNavigation";

function Chat() {
  return (
    <>
      <ChatNavigation />
      <div className="mt-[57px] mb-[55px]">
        <Outlet />
      </div>
    </>
  );
}

export default Chat;
