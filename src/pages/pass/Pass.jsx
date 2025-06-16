import React, { useState,useEffect } from "react";
import StampsNavigation2 from "../../Components/StampsNavigation2";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

function Pass() {
  const {cardid}=useParams();

  return (
    <>
      <StampsNavigation2 cardid={cardid} />
      <div className="mt-[68px] mb-[55px]">
        <Outlet context={{ cardid}} />
       
      </div>
    </>
  );
}

export default Pass;
