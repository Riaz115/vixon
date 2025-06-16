import { Checkbox, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiMessageRounded } from "react-icons/bi";
import { DiAndroid } from "react-icons/di";
import { FaApple } from "react-icons/fa";
import SendPushHistory from "../../Components/SendPushHistory";
import { pageVariants } from "../../Animation";
import { motion } from "framer-motion";
import { PhoneEmulator } from "../../Components/PhoneEmulator";
import InputBox from "../../UIComponents/InputBox";
import { customersendpush } from "../../api/createstamp";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "../../Components/Loader/loader";
import { useDispatch } from "react-redux";
import { updatecustomers } from "../../redux/customerSlice";
import { selectstamps } from "../../redux/stampSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
function CustomerSendPush() {
  const [loading, setLoading] = useState(false);
  const allcards = useSelector(selectstamps);
  const [carddata, setCarddata] = useState();
  const [allnotifications, setNotification] = useState();

  const { t } = useTranslation("customersendpush");

  const single = useOutletContext();
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = t("title");
  }, []);
  useEffect(() => {
    const card = allcards?.find(
      (item) => item._id === single?.cards[0]?.cardId
    );
    setCarddata(card);
  }, [allcards, single]);

  useEffect(() => {
    setNotification(single?.notificationHistory);
  }, [single]);

  const [pushMessage, setPushMessage] = useState(t("pushmsg"));
  const [scheduleEnabled, setScheduleEnabled] = useState(false); // State for checkbox
  const [appointmentDate, setAppointmentDate] = useState(); // State for the date-time input

  function handlePushMessage(e) {
    setPushMessage(e);
  }

  // Handle checkbox change
  function handleScheduleChange(e) {
    setScheduleEnabled(e.target.checked);
  }
  const sendnotification = async () => {
    try {
      setLoading(true);
      const response = await customersendpush(single._id, {
        messageBody: pushMessage,
        title: carddata?.stampName,
        isSchedule: scheduleEnabled,
        intervalTime: appointmentDate,
      });
      // //console.log(response, "this is response data")
      if (response.status === 200) {
        dispatch(updatecustomers(response?.data?.data));
        toast.success(t("sucmsg"));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // //console.log(error)
      toast.error(t("failmsg"));
    }
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-6 lg:col-span-4">
          <div className=" pb-6 border-b border-[#D5D5DD]">
            <h1 className="text-2xl mt-3">{t("sendpushnot")}</h1>
            <p className="text-xs pt-1 text-[#656565]">{t("desc")}</p>
          </div>
          <div className="border border-gray-300 box-borderrounded mt-10 rounded">
            <div className="border-b border-gray-300 pt-3 py-5 px-3 ">
              <p className="font-semibold pb-2 text-xl">{t("sendpush")}</p>
              <TextField
                fullWidth
                placeholder={t("card")}
                value={carddata?.stampName}
              />
            </div>

            <div className="pb-7">
              <div className="flex justify-between mx-2">
                <span className="flex items-center py-4">
                  <Checkbox
                    checked={scheduleEnabled}
                    onChange={handleScheduleChange}
                  />
                  <span className="text-sm">{t("schdule")}</span>
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
              <div className="box-border mx-3">
                <InputBox
                  value={pushMessage}
                  onChange={handlePushMessage}
                  placeHolder={t("entmsg")}
                  rows={3}
                />
                <div
                  onClick={sendnotification}
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
              className={`flex gap-1 my-2 mx-auto  items-center  w-max rounded-full bg-gray-200 shadow px-4  text-xs`}
            >
              <div className={` ${"bg-[#1DCD27]"}  p-1  rounded-full`}></div>
              <span> {status ? t("active") : t("inactive")}</span>
            </div>
            <PhoneEmulator
              activeview={true}
              emulatorContent={
                <div className="bg-[#1111118c] text-white p-3 rounded-md mx-2 mt-40">
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
          </div>
        </div>
      </div>
      <Loader loading={loading} />
    </motion.div>
  );
}

export default CustomerSendPush;
