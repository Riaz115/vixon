import React from "react";
import { Outlet ,useParams} from "react-router-dom";
import CustomerNavigation from "../../Components/CustomerNavigation";
import { selectcustomers } from "../../redux/customerSlice";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
function Customer() {
  const {customerid}=useParams();
  const [single,setSingle]=useState();
  const allcustomers=useSelector(selectcustomers);
  useEffect(()=>{
    const data=allcustomers?.find((item)=>item._id===customerid)
    setSingle(data);
  },[customerid,allcustomers])
  
  return (
    <>
      <CustomerNavigation customerid={customerid} />
      <div className="mt-[57px] mb-[55px]">
        <Outlet context={single} />
      </div>
    </>
  );
}

export default Customer;
