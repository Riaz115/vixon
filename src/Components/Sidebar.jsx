import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GlobalHotKeys } from "react-hotkeys";
import FullScreenToggle from "./FullScreenToggle";
import { SiConcourse } from "react-icons/si";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBusinesses, selectisCertificatesUploaded, updateCertificateState } from "../redux/businessSlice";
import { getBusiness } from "../api/business";

const keyMap = {
  HOME: "alt+1",
  CARD_TYPE: "alt+2",
  SCANNER_SCREEN: "alt+3",
  CUSTOMER_HOME: "alt+4",
  CHAT: "alt+5",
  LOCATION: "alt+6",
  PASS: "alt+7",
};

const Sidebar = ({setBarCodeData}) => {
  const navigate = useNavigate();
  const business = useSelector(selectBusinesses);
  const isCertificatesUploaded = useSelector(selectisCertificatesUploaded);
  const [businessData, setBusinessData] = useState(null);
  const [admin, setAdmin] = useState(business);
  const dispatch = useDispatch()
//console.log(businessData,"data...................")
  
  const [activeicon,setactiveIcon]=useState(false);
  const handlers = {
    HOME: () => navigate("/"),
    CARD_TYPE: () => navigate("/card-type"),
    SCANNER_SCREEN: () => navigate("/scanner-screen"),
    CUSTOMER_HOME: () => navigate("/customer-home"),
    CHAT: () => navigate("/chat"),
    LOCATION: () => navigate("/location"),
    PASS: () => navigate("/pass"),
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getBusiness(business.activeLocation.toString());
      //console.log("data //////////////////",data);
      setBusinessData(data);
      setAdmin(business);
    };
    fetchData();
  }, [business.activeLocation]);

  useEffect(() => {
    if(businessData){
//console.log(businessData)
      dispatch(updateCertificateState(businessData?.allFieldFill))
    }
  }, [businessData?.activeLocation]);
  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
  {/* <div className='sm:px-2  sm:min-w-[50px] sm:h-[100vh]   bottom-0 sm:sticky sm:top-0 h-full w-full sm:w-auto sm:bg-[#EAEAED] bg-black flex z-20 border-t-2 border-gray-300 shadow-inner justify-evenly sm:justify-center sm:flex-col items-center gap-4'> */}
      <div className="sm:px-2 sm:min-w-[50px] w-[58px] h-full fixed left-0 top-16 bg-[#EAEAED] flex flex-col items-center gap-4 justify-center z-20 border-l-2 border-gray-300 shadow-inner">

        {isCertificatesUploaded && ( <NavLink
          to='/'
          onClick={()=>{
            setactiveIcon("home")
          }}
          className={({ isActive }) =>
            isActive || activeicon==="home"
              ? "bg-[#ffffff] text-[#000000] sm:bg-[#454545] sm:text-white p-2 rounded-md "
              : "text-white sm:text-black p-2 rounded-md"
          }
        >
          {({ isActive }) => (
            <img src='/assets/homeIcon.svg' alt='homeIcon'  className={isActive || activeicon==="home"? "white-image  w-[50px] h-[30px]" : "black-image  w-[35px] h-[35px]"} />
          )}
        </NavLink>)}

        {isCertificatesUploaded && (<NavLink
          to='/passes'
          onClick={()=>{
            setactiveIcon("passes")
          }}
          className={({ isActive }) =>
            isActive || activeicon==="passes"
              ? "bg-[#ffffff] text-[#000000] sm:bg-[#454545] sm:text-white p-2 rounded-md w-[50px] h-[50px]"
              : "text-white sm:text-black p-2 rounded-md "
          }
        >
          {({ isActive }) => (
            <img src='/assets/cardType.svg' alt='cardTypeIcon' className={isActive  || activeicon==="passes"? "white-image  w-[35px] h-[35px]" : "black-image  w-[35px] h-[35px]"} />
          )}
        </NavLink>)}

        {isCertificatesUploaded && ( <NavLink
          to='/scanner-screen'
          onClick={()=>{
            setactiveIcon("scanner")
            setBarCodeData('')
          }}
          className={({ isActive }) =>
            isActive || activeicon==="scanner"
              ? "bg-[#ffffff] text-[#000000] sm:bg-[#454545] sm:text-white p-2 rounded-md"
              : "text-white sm:text-black p-2 rounded-md"
          }
        >
          {({ isActive }) => (
            <img
              src='/assets/scannerIcon.svg'
              alt='cardTypeIcon'
              className={isActive || activeicon==="scanner" ? "white-image  w-[35px] h-[35px]" : "black-image  w-[35px] h-[35px]"}
            />
          )}
        </NavLink>)}

        {isCertificatesUploaded && (<NavLink
          to='/customer-home'
          onClick={()=>{
            setactiveIcon("customer")
          }}
          className={({ isActive }) =>
            isActive || activeicon==="customer"
              ? "bg-[#ffffff] text-[#000000] sm:bg-[#454545] sm:text-white p-2 rounded-md"
              : "text-white sm:text-black p-2 rounded-md"
          }
        >
          {({ isActive }) => (
            <img
              src='/assets/customerBase.svg'
              alt='customer base'
              className={isActive  || activeicon==="customer"? "white-image  w-[35px] h-[35px]" : "black-image  w-[35px] h-[35px]"}
            />
          )}
        </NavLink>)}

        {isCertificatesUploaded && <NavLink
          to='/chat'
          onClick={()=>{
            setactiveIcon("chat")
          }}
          className={({ isActive }) =>
            isActive || activeicon==="chat"
              ? "bg-[#ffffff] text-[#000000] sm:bg-[#454545] sm:text-white p-2 rounded-md"
              : "text-white sm:text-black p-2 rounded-md"
          }
        >
          {({ isActive }) => (
            <img
              src='/assets/conversation.svg'
              alt='conversation'
              className={isActive  || activeicon==="chat"? "white-image  w-[35px] h-[35px]" : "black-image  w-[35px] h-[35px]"}
            />
          )}
        </NavLink>}

        {isCertificatesUploaded && (<NavLink
          to='/location'
          onClick={()=>{
            setactiveIcon("location")
          }}
          className={({ isActive }) =>
            isActive || activeicon==="location"
              ? "bg-[#ffffff] text-[#000000] sm:bg-[#454545] sm:text-white p-2 rounded-md"
              : "text-white sm:text-black p-2 rounded-md"
          }
        >
          {({ isActive }) => (
            <img src='/assets/location.svg' alt='location' className={isActive || activeicon==="location" ? "white-image w-[35px] h-[35px]" : "black-image w-[35px] h-[35px]"} />
          )}
        </NavLink>)}

        {admin?.role ==="admin"&&(<NavLink
          to='/addBusiness'
          onClick={()=>{
            setactiveIcon("addBusiness")
          }}
          className={({ isActive }) =>
            isActive || activeicon==="addBusiness"
              ? "bg-[#ffffff] text-[#000000] sm:bg-[#454545] sm:text-white p-2 rounded-md"
              : "text-white sm:text-black p-2 rounded-md"
          }
        >
          {({ isActive }) => (
            <img src='/assets/setting.svg' alt='location' className={activeicon ==="addBusiness" ? "white-image w-[35px] h-[35px]" : "black-image w-[35px] h-[35px]"} />
          )}
        </NavLink>)}

        {/* <NavLink
          to='/pass'
          className={({ isActive }) =>
            isActive
              ? "bg-[#ffffff] text-[#000000] sm:bg-[#454545] sm:text-white p-2 rounded-md"
              : "text-white sm:text-black p-2 rounded-md"
          }
        >
          <SiConcourse className='text-2xl' />
        </NavLink> */}

        <FullScreenToggle />
      </div>
    </GlobalHotKeys>
  );
};

export default Sidebar;
