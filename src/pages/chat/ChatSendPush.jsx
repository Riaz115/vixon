import { Checkbox, TextField } from "@mui/material";
import React, { useState } from "react";
import SendPushHistory from "../../Components/SendPushHistory";
import InputBox from "../../UIComponents/InputBox";
import { PhoneEmulator } from "../../Components/PhoneEmulator";
import DropDown from "../../UIComponents/DropDown";
import { allcustomersendpush } from "../../api/createstamp";
import { Loader } from "../../Components/Loader/loader";
import toast from "react-hot-toast";
import { getallnotification } from "../../api/createstamp";
import { useEffect } from "react";
import { selectBusinesses } from "../../redux/businessSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
function ChatSendPush() {
  const { t } = useTranslation("sendpush");

  const [id, setId] = useState();
  React.useEffect(() => {
    document.title = t("title");
  }, []);
  const businessdata = useSelector(selectBusinesses);

  const [tabs, setTabs] = useState();
  const [allnotifications, setNotification] = useState();
  const [pushMessage, setPushMessage] = useState(t("pushTextEmoji"));
  function handlePushMessage(e) {
    setPushMessage(e);
  }
  const [loading, setLoading] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState();
  function handleScheduleChange(e) {
    setScheduleEnabled(e.target.checked);
  }

  const sendmessage = async () => {
    if (!pushMessage) {
      return 0;
    }
    try {
      setLoading(true);
      const response = await allcustomersendpush({
        messageBody: pushMessage,
        title: "Reminder",
        businessId: businessdata?.activeLocation,
        intervalTime: appointmentDate,
        isSchedule: scheduleEnabled,
      });
      if (response.status === 200) {
        setNotification([...allnotifications, response.data.notification]);
        toast.success(t("successMsg"));
        setPushMessage("");
        setLoading(false);
      }
    } catch (error) {
      // //console.log(error, "these are error");
      toast.error(t("failNot"));
      setLoading(false);
    }
  };
  useEffect(() => {
    const allnoti = async () => {
      try {
        const response = await getallnotification({
          businessId: businessdata?.activeLocation,
        });
        // //console.log(response, "all data for notification")
        setNotification(response?.data?.data?.notification);
      } catch (error) {
        // //console.log(error,"error allnotification get")
      }
    };
    allnoti();
  }, []);

  return (
    <div className="grid grid-cols-6 gap-2">
      <div className="col-span-6 lg:col-span-4">
        <div className=" pb-6 border-b border-[#D5D5DD]">
          <h1 className="text-2xl mt-3">{t("sendPushNot")}</h1>
          <p className="text-xs pt-1 text-[#656565]">{t("topdesctext")}</p>
        </div>
        <div className="border border-gray-300 box-borderrounded mt-10 rounded">
          <p className="border-b border-gray-300 py-2 pl-3 font-semibold text-xl">
            {t("sendpush")}
          </p>
          <div className="pt-6 pb-5 border-b border-gray-300">
            <div className="flex gap-3 px-3">
              <div
                className={`${
                  tabs === "for-all-customers" ? "bg-black text-white" : ""
                } hover:bg-black  hover:text-white flex-1 border border-gray-300 p-2 rounded text-center`}
                onClick={() => setTabs("for-all-customers")}
              >
                {t("forAllCus")}
              </div>
              {/* <div className={`${tabs === 'for-selected-segment' ? 'bg-black text-white' : ''} flex-1 border border-gray-300 hover:bg-black hover:text-white p-2 rounded text-center`} onClick={() => setTabs('for-selected-segment')}>
                Selected segment
              </div> */}
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
            {/* <p className='text-sm text-center pt-4'>1 customers will receive your message.</p> */}
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
                {/* Conditionally render the datetime-local input */}
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
                placeHolder={t("entmsg")}
                rows={3}
              />
              <div
                onClick={sendmessage}
                className="rounded bg-black text-white w-max px-7 py-2 mt-4 cursor-pointer"
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

        {/* <div className='col-span-3 text-center bg-black text-white py-3 rounded-md my-5 cursor-pointer'>Continue</div> */}
      </div>

      <div className="col-span-6 lg:col-span-2  ">
        <div className="text-center  p-6 sticky top-20">
          <div
            className={`flex gap-1 my-2 mx-auto  items-center  w-max rounded-full bg-gray-200 shadow px-4 py-1 text-xs`}
          >
            <div className={` ${"bg-[#1DCD27]"}  p-1  rounded-full`}></div>
            <span> {status ? "Active" : "Inactive"}</span>
          </div>
          <PhoneEmulator
            activeview={true}
            emulatorContent={
              <div className="bg-[#1111118c] text-white p-3 rounded-md mt-40 mx-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://imgv3.fotor.com/images/videoImage/unblur-image-online-instantly-with-Fotor-blur-remover.jpg"
                      alt="icon"
                      className="w-5 h-5 rounded-md"
                    />
                    <span className="text-[11px] font-light">
                      {t("companyname")}
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
          {/* <small className="text-gray-500 mx-auto">Geo-push available for iOS devices only</small> */}
        </div>
      </div>
      <Loader loading={loading} />
    </div>
  );
}

export default ChatSendPush;
