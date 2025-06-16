import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { pageVariants } from "../../Animation";
import { PhoneEmulator } from "../../Components/PhoneEmulator";
import { selectstamps } from "../../redux/stampSlice";
import { useSelector } from "react-redux";
import { getautomation, updateautomation } from "../../api/automation";
import { Loader } from "../../Components/Loader/loader";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
const ChatPushAutomation = () => {
  const { t } = useTranslation("sendpusautomation");

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [cardName, setCardName] = useState(t("comapnyname"));
  const [logo, setLogo] = useState();

  const allcards = useSelector(selectstamps);

  useEffect(() => {
    document.title = t("title");
  }, []);
  const [pushMessage, setPushMessage] = useState(t("pushMsg"));

  function handlePushMessage(e) {
    setPushMessage(e);
  }

  const onChange = async (e) => {
    try {
      setLoading(true);
      const response = await getautomation(e.target.value);

      if (response.status === 200) {
        setData(response?.data?.feedback[0]);
        const cardfilter = allcards?.find(
          (item) => item._id === e.target.value
        );
        setCardName(cardfilter?.companyName);
        setLogo(cardfilter?.logo);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // //console.log(error, "this is get automation error");
    }
  };

  const Onfocus = (index) => {
    const updatedModules = [...data.modules];
    setPushMessage(updatedModules[index].message);
  };

  const update = async (data) => {
    try {
      setLoading(true);
      const response = await updateautomation(data?._id, data);

      if (response.status === 200) {
        toast.success(t("successMsg"));
        setLoading(false);
      }

      // //console.log(response, "this is response data for user")
    } catch (error) {
      setLoading(false);
      // //console.log(error, "these are error")
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
        <div className="col-span-6 lg:col-span-4 mt-5">
          <div className=" pb-6 border-b border-[#D5D5DD]">
            <h1 className="text-2xl mt-3">{t("sendPushNot")}</h1>
            <p className="text-xs pt-1 text-[#656565]">{t("phoneMsg")}</p>
          </div>
          <div className="mt-12">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("selectcard")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={onChange}
              >
                {allcards.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item._id}>
                      {item?.stampName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          {data?.modules?.map((item, index) => {
            return (
              <MsgElement
                t={t}
                item={item}
                data={data}
                setData={setData}
                index={index}
                Onfocus={Onfocus}
                update={update}
              />
            );
          })}
        </div>
        <div className="col-span-6 lg:col-span-2  ">
          <div className="text-center  p-6 sticky top-20">
            <div
              className={`flex gap-1 my-2 mx-auto  items-center  w-max rounded-full bg-gray-200 shadow px-4 py-1 text-xs`}
            >
              <div className={` ${"bg-[#1DCD27]"}  p-1  rounded-full`}></div>
              <span> {status ? t("active") : t("inactive")}</span>
            </div>
            <PhoneEmulator
              activeview={true}
              emulatorContent={
                <div className="bg-[#1111118c] text-white p-3 rounded-md mt-40 mx-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          logo
                            ? logo
                            : "https://imgv3.fotor.com/images/videoImage/unblur-image-online-instantly-with-Fotor-blur-remover.jpg"
                        }
                        alt="icon"
                        className="w-5 h-5 rounded-md"
                      />
                      <span className="text-[11px] font-light">{cardName}</span>
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
        <Loader loading={loading} />
      </div>
    </motion.div>
  );
};

function MsgElement({ item, data, setData, index, Onfocus, update, t }) {
  const Desciption = (item) => {
    if (item === "Feedback") {
      return t("feedBackText");
    } else if (item === "Next visit reminder") {
      return t("nextVisitRemainder");
    } else {
      return t("congratMsg");
    }
  };
  return (
    <div className="border border-gray-300 box-border rounded mt-5">
      <div className=" pt-3 py-5">
        <div className="flex justify-between border-b border-gray-300 mb-5 px-3 pb-2">
          <div>
            <p className="font-semibold">{item?.automationName}</p>
            <p className="text-xs pb-2 text-[#656565]">
              Send {item?.automationName} form
            </p>
          </div>
          <IosSwitch
            isOn={item?.status}
            setIsOn={(e) => {
              const updatedModules = [...data.modules];
              updatedModules[index].status = e;
              setData({
                ...data,
                modules: updatedModules,
              });
            }}
          />
        </div>
        <div className="px-3">
          <p className="text-sm text-[#656565] pb-3">{t("message")}</p>

          <div className="my-2">
            <InputTextEmoji
              placeholder="Enter Message"
              Onfocus={Onfocus}
              value={item?.message}
              onChangeemoji={(value) => {
                const updatedModules = [...data.modules];
                updatedModules[index].message =
                  updatedModules[index].message + value;
                setData({
                  ...data,
                  modules: updatedModules,
                });
                Onfocus(index, updatedModules[index].message);
              }}
              index={index}
              onChange={(e) => {
                const updatedModules = [...data.modules];
                updatedModules[index].message = e.target.value;
                setData({
                  ...data,
                  modules: updatedModules,
                });
                Onfocus(index, e.target.value);
              }}
            />
          </div>
          <p className="text-xs pb-2 text-[#656565]">
            {Desciption(item?.automationName)}
          </p>

          <InputText
            value={item?.time}
            onChange={(e) => {
              const updatedModules = [...data.modules];
              updatedModules[index].time = e.target.value;
              setData({
                ...data,
                modules: updatedModules,
              });
            }}
          />
        </div>
        <div
          className="ml-3 rounded bg-black text-white w-max px-7 py-2 mt-4 cursor-pointer"
          onClick={() => {
            update(data);
          }}
        >
          {t("save")}
        </div>
      </div>
    </div>
  );
}

const IosSwitch = ({ isOn, setIsOn }) => {
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
        isOn ? "bg-green-500" : "bg-gray-300"
      } cursor-pointer`}
      onClick={toggleSwitch}
    >
      <span
        className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full transition-transform transform ${
          isOn ? "translate-x-5 bg-white" : "translate-x-0 bg-white"
        }`}
      ></span>
    </div>
  );
};

function InputTextEmoji({
  placeholder,
  value,
  onChange,
  index,
  Onfocus,
  onChangeemoji,
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="relative">
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            Onfocus(index);
          }}
          InputProps={{
            sx: {
              height: "40px",
              padding: "0 14px",
              fontSize: "15px",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "40px",
              "& input": {
                padding: "10px 0px",
              },
            },
          }}
        />
        <BsEmojiSmile
          className="absolute top-[10px] right-2 text-gray-500 text-lg"
          onClick={() => {
            setShow(!show);
          }}
        />

        <div className="absolute z-50 top-14 right-0">
          {show && (
            <EmojiPicker onEmojiClick={(event) => onChangeemoji(event.emoji)} />
          )}
        </div>
      </div>
    </>
  );
}

const InputText = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      onChange={onChange}
      type="number"
      value={value}
      variant="outlined"
      InputProps={{
        sx: {
          height: "40px", // Adjust this value as needed
          padding: "0 14px",
        },
      }}
      inputProps={{
        min: 1, // Set the minimum value to 1
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "40px", // Ensure this matches the InputProps height
          "& input": {
            padding: "10px 0px", // Adjust the padding to fit your height
          },
        },
      }}
    />
  );
};
export default ChatPushAutomation;
