// import { Checkbox, TextField } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import SendPushHistory from "../../Components/SendPushHistory";
// import InputBox from "../../UIComponents/InputBox";
// import { PhoneEmulator } from "../../Components/PhoneEmulator";
// import DropDown from "../../UIComponents/DropDown";
// import { allcardcustomersendpush } from "../../api/createstamp";
// import { Loader } from "../../Components/Loader/loader";
// import { useOutletContext } from "react-router-dom";
// import toast from "react-hot-toast";
// import { selectstamps } from "../../redux/stampSlice";
// import { useSelector } from "react-redux";
// import { getcardnotification } from "../../api/createstamp";
// import { useTranslation } from "react-i18next";
// function PassSendPush() {
//   const { t } = useTranslation("passSendPush");

//   const allstamps = useSelector(selectstamps);
//   const [card, setCard] = useState();
//   const { cardid } = useOutletContext();
//   const [allnotifications, setNotification] = useState();

//   useEffect(() => {
//     const data = allstamps?.find((item) => item.id === cardid);
//     setCard(data);
//   }, [allstamps, cardid]);

//   React.useEffect(() => {
//     document.title = t("title");
//   }, []);
//   const [pushMessage, setPushMessage] = useState(t("pushmsg"));
//   const [tabs, setTabs] = useState();
//   function handlePushMessage(e) {
//     setPushMessage(e);
//   }
//   const [loading, setLoading] = useState(false);
//   const [scheduleEnabled, setScheduleEnabled] = useState(false);
//   const [appointmentDate, setAppointmentDate] = useState();
//   function handleScheduleChange(e) {
//     setScheduleEnabled(e.target.checked);
//   }

//   useEffect(() => {
//     const allnoti = async () => {
//       try {
//         const response = await getcardnotification(cardid);
//         // //console.log(response,"transactions")
//         setNotification(response?.data?.data?.notification);
//       } catch (error) {
//         // //console.log(error, "error allnotification get")
//       }
//     };
//     allnoti();
//   }, []);

//   const sendmessage = async () => {
//     if (!pushMessage) {
//       return 0;
//     }
//     try {
//       setLoading(true);
//       const response = await allcardcustomersendpush({
//         cardIds: cardid,
//         messageBody: pushMessage,
//         title: card?.companyName,
//         intervalTime: appointmentDate,
//       });
//       // console.log(response,"this is response data that come form dapi")
//       if (response.status === 200) {
//         toast.success(t("toastsuc"));
//         setPushMessage("");
//         setLoading(false);
//         const response = await getcardnotification(cardid);
//         setNotification(response?.data?.data?.notification);
//       }
//       if (response.status === 404) {
//         toast.error(t("failnotmsg"));
//         setLoading(false);
//       }
//     } catch (error) {
//       // //console.log(error, "these are error");

//       toast.error(t("failnotmsg"));
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-6 gap-2">```javascript
// import { Checkbox, TextField } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import SendPushHistory from "../../Components/SendPushHistory";
// import InputBox from "../../UIComponents/InputBox";
// import { PhoneEmulator } from "../../Components/PhoneEmulator";
// import DropDown from "../../UIComponents/DropDown";
// import { allcardcustomersendpush } from "../../api/createstamp";
// import { Loader } from "../../Components/Loader/loader";
// import { useOutletContext } from "react-router-dom";
// import toast from "react-hot-toast";
// import { selectstamps } from "../../redux/stampSlice";
// import { useSelector } from "react-redux";
// import { getcardnotification } from "../../api/createstamp";
// import { useTranslation } from "react-i18next";

// function PassSendPush() {
//   const { t } = useTranslation("passSendPush");

//   const allstamps = useSelector(selectstamps);
//   const [card, setCard] = useState();
//   const { cardid } = useOutletContext();
//   const [allnotifications, setNotification] = useState();

//   useEffect(() => {
//     const data = allstamps?.find((item) => item.id === cardid);
//     setCard(data);
//   }, [allstamps, cardid]);

//   React.useEffect(() => {
//     document.title = t("title");
//   }, []);

//   const [pushMessage, setPushMessage] = useState(t("pushmsg"));
//   const [tabs, setTabs] = useState();
//   const [loading, setLoading] = useState(false);
//   const [scheduleEnabled, setScheduleEnabled] = useState(false);
//   const [appointmentDate, setAppointmentDate] = useState();

//   useEffect(() => {
//     const allnoti = async () => {
//       try {
//         const response = await getcardnotification(cardid);
//         setNotification(response?.data?.data?.notification);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     allnoti();
//   }, [cardid]);

//   const handlePushMessage = (e) => {
//     setPushMessage(e.target.value);
//   };

//   const handleScheduleChange = (e) => {
//     setScheduleEnabled(e.target.checked);
//   };

//   const sendmessage = async () => {
//     if (!pushMessage) {
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await allcardcustomersendpush({
//         cardIds: cardid,
//         messageBody: pushMessage,
//         title: card?.companyName,
//         intervalTime: appointmentDate,
//       });
//       if (response.status === 200) {
//         toast.success(t("toastsuc"));
//         setPushMessage("");
//         setLoading(false);
//         const response = await getcardnotification(cardid);
//         setNotification(response?.data?.data?.notification);
//       } else if (response.status === 404) {
//         toast.error(t("failnotmsg"));
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(t("failnotmsg"));
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-6 gap-2">
//       <div className="col-span-6 lg:col-span-4">
//         <div className="pb-6 border-b border-[#D5D5DD]">
//           <h1 className="text-2xl mt-3">{t("sendpushnotification")}</h1>
//           <p className="text-xs pt-1 text-[#656565]">{t("descriptions")}</p>
//         </div>
//         <div className="border border-gray-300 box-border rounded mt-10 rounded">
//           <p className="border-b border-gray-300 py-2 pl-3 font-semibold text-xl">
//             {t("sendpush")}
//           </p>
//           <div className="pt-6 pb-5 border-b border-gray-300">
//             <div className="flex gap-3 px-3">
//               <div
//                 className={`flex-1 border border-gray-300 p-2 rounded text-center`}
//                 onClick={() => setTabs("for-all-customers")}
//               >
//                 {t("forallcus")}
//               </div>
//             </div>
//             {tabs === "for-selected-segment" && (
//               <div className="grid grid-cols-10 gap-4 mt-4 px-3">
//                 <span className="col-span-5">
//                   <DropDown />
//                 </span>
//                 <span className="col-span-3">
//                   <DropDown />
//                 </span>
//                 <span className="col-span-2">
//                   <InputBox placeHolder={"="} />
//                 </span>
//               </div>
//             )}
//           </div>
//           <div className="pb-7">
//             <div className="pb-7">
//               <div className="flex justify-between mx-2">
//                 <span className="flex items-center py-4">
//                   <Checkbox
//                     checked={scheduleEnabled}
//                     onChange={handleScheduleChange}
//                   />
//                   <span className="text-sm">{t("schedule")}</span>
//                 </span>
//                 <span>
//                   {scheduleEnabled && (
//                     <input
//                       className="mt-5"
//                       type="datetime-local"
//                       id="appointment"
//                       name="appointment"
//                       value={appointmentDate}
//                       onChange={(e
//       <div className="col-span-6 lg:col-span-4">
//         <div className=" pb-6 border-b border-[#D5D5DD]">
//           <h1 className="text-2xl mt-3">{t("sendpushnotification")}</h1>
//           <p className="text-xs pt-1 text-[#656565]"> {t("descriptions")}</p>
//         </div>
//         <div className="border border-gray-300 box-borderrounded mt-10 rounded">
//           <p className="border-b border-gray-300 py-2 pl-3 font-semibold text-xl">
//             {t("sendpush")}
//           </p>
//           <div className="pt-6 pb-5 border-b border-gray-300">
//             <div className="flex gap-3 px-3">
//               <div
//                 className={`   flex-1 border border-gray-300 p-2 rounded text-center`}
//                 onClick={() => setTabs("for-all-customers")}
//               >
//                 {t("forallcus")}
//               </div>
//               {/* <div className={`${tabs === 'for-selected-segment' ? 'bg-black text-white' : ''} flex-1 border border-gray-300 hover:bg-black hover:text-white p-2 rounded text-center`} onClick={() => setTabs('for-selected-segment')}>
//                 Selected segment
//               </div> */}
//             </div>
//             {tabs === "for-selected-segment" && (
//               <div className="grid grid-cols-10 gap-4 mt-4 px-3">
//                 <span className="col-span-5">
//                   <DropDown />
//                 </span>
//                 <span className="col-span-3">
//                   <DropDown />
//                 </span>
//                 <span className="col-span-2">
//                   <InputBox placeHolder={"="} />
//                 </span>
//               </div>
//             )}
//             {/* <p className='text-sm text-center pt-4'>1 customers will receive your message.</p> */}
//           </div>
//           <div className="pb-7">
//             <div className="pb-7">
//               <div className="flex justify-between mx-2">
//                 <span className="flex items-center py-4">
//                   <Checkbox
//                     checked={scheduleEnabled}
//                     onChange={handleScheduleChange}
//                   />
//                   <span className="text-sm">{t("schedule")}</span>
//                 </span>
//                 <span>
//                   {/* Conditionally render the datetime-local input */}
//                   {scheduleEnabled && (
//                     <input
//                       className="mt-5"
//                       type="datetime-local"
//                       id="appointment"
//                       name="appointment"
//                       value={appointmentDate}
//                       onChange={(e) => setAppointmentDate(e.target.value)}
//                     />
//                   )}
//                 </span>
//               </div>
//             </div>
//             <div className="box-border mx-2">
//               <InputBox
//                 value={pushMessage}
//                 onChange={handlePushMessage}
//                 placeHolder={"Enter your message"}
//                 rows={3}
//               />
//               <div
//                 className="rounded bg-black text-white w-max px-7 py-2 mt-4 cursor-pointer"
//                 onClick={sendmessage}
//               >
//                 {t("send")}
//               </div>
//             </div>
//           </div>
//         </div>
//         <SendPushHistory
//           single={{
//             notificationHistory: allnotifications,
//           }}
//           setNotification={setNotification}
//         />
//         {/* <div className='col-span-3 text-center bg-black text-white py-3 rounded-md my-5 cursor-pointer'>Continue</div> */}
//       </div>
//       <PhoneEmulator
//         activeview={true}
//         emulatorContent={
//           <div className="bg-[#1111118c] text-white p-3 mt-40 rounded-md mx-2">
//             <div className="flex justify-between">
//               <div className="flex items-center gap-2">
//                 <img
//                   src={
//                     card?.icon
//                       ? card?.icon
//                       : "https://imgv3.fotor.com/images/videoImage/unblur-image-online-instantly-with-Fotor-blur-remover.jpg"
//                   }
//                   alt="icon"
//                   className="w-5 h-5 rounded-md"
//                 />
//                 <span className="text-[11px] font-light">
//                   {card?.companyName}
//                 </span>
//               </div>
//               <div className="text-[11px] font-light">{t("now")}</div>
//             </div>
//             <div className="mt-1">
//               <p className="text-[11px]">{pushMessage}</p>
//             </div>
//           </div>
//         }
//       ></PhoneEmulator>
//       <Loader loading={loading} />
//     </div>
//   );
// }

// export default PassSendPush;

import { Checkbox, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SendPushHistory from "../../Components/SendPushHistory";
import InputBox from "../../UIComponents/InputBox";
import { PhoneEmulator } from "../../Components/PhoneEmulator";
import DropDown from "../../UIComponents/DropDown";
import { allcardcustomersendpush } from "../../api/createstamp";
import { Loader } from "../../Components/Loader/loader";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { selectstamps } from "../../redux/stampSlice";
import { useSelector } from "react-redux";
import { getcardnotification } from "../../api/createstamp";
import { useTranslation } from "react-i18next";

function PassSendPush() {
  const { t } = useTranslation("passSendPush");

  const allstamps = useSelector(selectstamps);
  const [card, setCard] = useState();
  const { cardid } = useOutletContext();
  const [allnotifications, setNotification] = useState();
  const [pushMessage, setPushMessage] = useState(t("pushmsg"));
  const [tabs, setTabs] = useState();
  const [loading, setLoading] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState();

  useEffect(() => {
    const data = allstamps?.find((item) => item.id === cardid);
    setCard(data);
  }, [allstamps, cardid]);

  useEffect(() => {
    document.title = t("title");
  }, []);

  useEffect(() => {
    const allnoti = async () => {
      try {
        const response = await getcardnotification(cardid);
        setNotification(response?.data?.data?.notification);
      } catch (error) {
        console.error(error);
      }
    };
    allnoti();
  }, [cardid]);

  const handlePushMessage = (e) => {
    setPushMessage(e.target.value);
  };

  const handleScheduleChange = (e) => {
    setScheduleEnabled(e.target.checked);
  };

  const sendmessage = async () => {
    if (!pushMessage) {
      return;
    }
    try {
      setLoading(true);
      const response = await allcardcustomersendpush({
        cardIds: cardid,
        messageBody: pushMessage,
        title: card?.companyName,
        intervalTime: appointmentDate,
      });
      if (response.status === 200) {
        toast.success(t("toastsuc"));
        setPushMessage("");
        setLoading(false);
        const response = await getcardnotification(cardid);
        setNotification(response?.data?.data?.notification);
      } else if (response.status === 404) {
        toast.error(t("failnotmsg"));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(t("failnotmsg"));
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-6 gap-2">
      <div className="col-span-6 lg:col-span-4">
        <div className="pb-6 border-b border-[#D5D5DD]">
          <h1 className="text-2xl mt-3">{t("sendpushnotification")}</h1>
          <p className="text-xs pt-1 text-[#656565]">{t("descriptions")}</p>
        </div>
        <div className="border border-gray-300 box-border rounded mt-10">
          <p className="border-b border-gray-300 py-2 pl-3 font-semibold text-xl">
            {t("sendpush")}
          </p>
          <div className="pt-6 pb-5 border-b border-gray-300">
            <div className="flex gap-3 px-3">
              <div
                className="flex-1 border border-gray-300 p-2 rounded text-center"
                onClick={() => setTabs("for-all-customers")}
              >
                {t("forallcus")}
              </div>
            </div>
            {tabs === "for-selected-segment" && (
              <div className="grid grid-cols-10 gap-4 mt-4 px-3">
                <span className="col-span-5">
                  <DropDown />
                </span>
                <span className="col-span-3">
                  <DropDown />
                </span>
                <span className="col-span-2">
                  <InputBox placeHolder={"="} />
                </span>
              </div>
            )}
          </div>
          <div className="pb-7">
            <div className="flex justify-between mx-2">
              <span className="flex items-center py-4">
                <Checkbox
                  checked={scheduleEnabled}
                  onChange={handleScheduleChange}
                />
                <span className="text-sm">{t("schedule")}</span>
              </span>
              <span>
                {scheduleEnabled && (
                  <input
                    className="mt-5"
                    type="datetime-local"
                    id="appointment"
                    name="appointment"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                )}
              </span>
            </div>
            <div className="box-border mx-2">
              <InputBox
                value={pushMessage}
                onChange={handlePushMessage}
                placeHolder={"Enter your message"}
                rows={3}
              />
              <div
                className="rounded bg-black text-white w-max px-7 py-2 mt-4 cursor-pointer"
                onClick={sendmessage}
              >
                {t("send")}
              </div>
            </div>
          </div>
        </div>
        <SendPushHistory
          single={{
            notificationHistory: allnotifications,
          }}
          setNotification={setNotification}
        />
      </div>
      <PhoneEmulator
        activeview={true}
        emulatorContent={
          <div className="bg-[#1111118c] text-white p-3 mt-40 rounded-md mx-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={
                    card?.icon
                      ? card?.icon
                      : "https://imgv3.fotor.com/images/videoImage/unblur-image-online-instantly-with-Fotor-blur-remover.jpg"
                  }
                  alt="icon"
                  className="w-5 h-5 rounded-md"
                />
                <span className="text-[11px] font-light">
                  {card?.companyName}
                </span>
              </div>
              <div className="text-[11px] font-light">{t("now")}</div>
            </div>
            <div className="mt-1">
              <p className="text-[11px]">{pushMessage}</p>
            </div>
          </div>
        }
      ></PhoneEmulator>
    </div>
  );
}

export default PassSendPush;
