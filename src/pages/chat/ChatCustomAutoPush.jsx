import React, { useEffect, useState, useTransition } from "react";
import { Avatar, FormControl, MenuItem, Select, styled } from "@mui/material";
import { TextField } from "@mui/material";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import { pageVariants } from "../../Animation";
import { motion } from "framer-motion";
import { PhoneEmulator } from "../../Components/PhoneEmulator";
import { useSelector } from "react-redux";
import { PiPlus } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import { Popover, IconButton, Box } from "@mui/material";
import { Loader } from "../../Components/Loader/loader";
import { selectstamps } from "../../redux/stampSlice";
import IosSwitch from "../../UIComponents/IosSwitch";
import {
  createcustomPush,
  getcustompush,
  updatecustompush,
} from "../../api/custompush";
import { selectBusinesses } from "../../redux/businessSlice";
import { deletecustompush } from "../../api/custompush";
import DeletecustomModal from "./DeletecustomModal";
import { useTranslation } from "react-i18next";
function ChatCustomAutoPush() {
  const { t } = useTranslation("chatcustomeautopush");

  const businessdata = useSelector(selectBusinesses);
  const allcards = useSelector(selectstamps);
  const [loading, setLoading] = useState(false);
  const [allpush, setallPush] = useState();
  const [data, setData] = useState({
    eventType: "",
    condition: "",
    message: "",
    time: 1,
    timeFormat: "Minutes",
    status: false,
  });
  const [errors, setErrors] = useState({});
  const [openmodal, setOpenmodal] = useState(false);
  const validate = () => {
    const newErrors = {};
    if (!data.eventType) {
      newErrors.eventType = t("eventRequire");
    }
    if (!data.condition) {
      newErrors.condition = t("conditionRequire");
    }
    if (!data.message) {
      newErrors.message = t("msgRequire");
    }
    if (!data.cardId) {
      newErrors.cardId = t("cardRequired");
    }
    if (data.time <= 0) {
      newErrors.time = t("timeRequire");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitData = async () => {
    if (validate()) {
      try {
        setLoading(true);
        const response = await createcustomPush({
          ...data,
          businessId: businessdata?.activeLocation,
        });

        if (response.status === 201 || response.status === 200) {
          setallPush([...allpush, response?.data?.data]);
          setData({
            eventType: "",
            condition: "",
            message: "",
            time: 1,
            timeFormat: "Minutes",
            status: false,
          });
          toast.success(t("customAutoPushSuccess"));
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        // //console.log(error, "this is error data")
      }
    } else {
      toast.error(t("errSubmit"));
    }
  };

  const Updatepush = async (data) => {
    try {
      const response = await updatecustompush(data);
      if (response.status === 201 || response.status == 200) {
        toast.success(t("dataSucMsg"));
      }
    } catch (error) {
      // //console.log(error, "error in update custom auto push")
      toast.success(t("failMsg"));
    }
  };

  const deleteData = async (data) => {
    try {
      setLoading(true);
      const response = await deletecustompush(data);
      if (response.status === 201 || response.status == 200) {
        toast.success(t("cusDelMsg"));
        const datafilter = allpush.filter(
          (item) => item._id !== response?.data?.data?._id
        );
        setallPush(datafilter);
        setLoading(false);
        setOpenmodal(false);
      }
    } catch (error) {
      setLoading(false);

      // //console.log(error, "error in update custom auto push")
      toast.success(t("failDelCusMsg"));
    }
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await getcustompush(businessdata?.activeLocation);
        // //console.log(response, "this is response data custom push");

        if (response.status === 200 || response.status === 201) {
          setallPush(response?.data?.data);
        }
      } catch (error) {
        // //console.log(error, "these are errors occurs due")
      }
    };
    if (businessdata?.activeLocation) {
      getdata();
    }
  }, [businessdata?.activeLocation]);

  useEffect(() => {
    document.title = t("title");
  }, []);
  const [pushMessage, setPushMessage] = useState(t("pushMsg"));

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-6 lg:col-span-4  mt-5">
          <div className="pb-6 border-b border-[#D5D5DD]">
            <h1 className="text-2xl mt-3">{t("customeAutoPush")}</h1>
            <p className="text-xs pt-1 text-[#656565]">{t("topDescPara")}</p>
          </div>
          <div className="border border-gray-300 box-borderrounded mt-10 rounded">
            <div className="border-b border-gray-300 pt-3 py-5 px-3 ">
              <p className="font-semibold text-xl">{t("sendpush")}</p>
              <p className="pb-2 text-sm text-[#656565]">
                {t("sendautopushrole")}
              </p>
              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Lanuguage</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{ height: 40 }}
                  onChange={(e) => {
                    setData({
                      ...data,
                      eventType: e.target.value,
                      condition: e.target.value,
                    });
                  }}
                  //   label="Language"
                >
                  <MenuItem value="Card install">{t("cardinstall")}</MenuItem>
                  {/* <MenuItem value="Review Sent">Review Sent</MenuItem> */}
                  <MenuItem value="Number of stamps reached">
                    {t("numOfStamps")}
                  </MenuItem>
                  <MenuItem value="Number of bonuses reached">
                    {t("noOfbonus")}
                  </MenuItem>
                  <MenuItem value="Number of rewards reached">
                    {t("numOfReward")}
                  </MenuItem>
                  <MenuItem value="Number of rewards used">
                    {t("numOfRewardUse")}
                  </MenuItem>
                  <MenuItem value="Card period expired">
                    {t("cardPerExp")}
                  </MenuItem>
                  <MenuItem value="Status card upgrade">
                    {t("statusCardUpgrade")}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          {data.eventType !== "" ? (
            <MsgElement
              data={data}
              setData={setData}
              allcards={allcards}
              Onfocus={() => {
                // //console.log("this is data for on focus")
              }}
              update={submitData}
              setPushMessage={setPushMessage}
              errors={errors}
            />
          ) : (
            <></>
          )}
          {allpush?.map((item, index) => {
            return (
              <MsgElement
                t={t}
                key={index}
                data={item}
                setData={(Object) => {
                  const copydata = [...allpush];
                  copydata[index] = Object;
                  setallPush(copydata);
                }}
                allcards={allcards}
                Onfocus={() => {
                  // //console.log("this is data for on focus")
                }}
                update={Updatepush}
                setPushMessage={setPushMessage}
                errors={{}}
                deleteData={deleteData}
                openmodal={openmodal}
                setOpenmodal={setOpenmodal}
              />
            );
          })}
        </div>
        <div className="col-span-6 lg:col-span-2 fixed top-20 right-10 ">
          <div className="text-center  p-6 ">
            <div
              className={`flex gap-1 my-2 mx-auto  items-center  w-max rounded-full bg-gray-200 shadow px-4 py-1 text-xs`}
            >
              <div className={` ${"bg-[#1DCD27]"}  p-1  rounded-full `}></div>
              <span> {status ? t("active") : t("inActive")}</span>
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
        <Loader loading={loading} />
      </div>
    </motion.div>
  );
}

function MsgElement({
  data,
  index,
  setData,
  update,
  Onfocus,
  allcards,
  errors,
  setPushMessage,
  deleteData,
  openmodal,
  setOpenmodal,
  t,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const filtercard = (id) => {
    const card = allcards.find((item) => item._id === id);
    return card?.stampName;
  };
  const open = Boolean(anchorEl);
  const id = open ? "card-popover" : undefined;

  return (
    <div className="border border-gray-300 box-border rounded mt-5">
      <div className=" pt-3 py-5">
        <div className="flex justify-between border-b border-gray-300 mb-5 px-3 pb-2">
          <div>
            <p className="font-semibold">{data?.eventType}</p>
            <p className="text-xs pb-2 text-[#656565]">{data.eventType}</p>
          </div>
          <IosSwitch
            isOn={data?.status}
            setIsOn={(e) => {
              setData({
                ...data,
                status: e,
              });
            }}
          />
        </div>
        <div className="px-3">
          {/* <p className='text-sm text-[#656565] pb-3'>Message</p> */}

          <div className="my-2">
            <InputTextEmoji
              placeholder="Enter Name"
              rows={1}
              value={data?.condition}
              onChangeemoji={(value) => {
                const updatedModules = data?.condition + value;
                setData({
                  ...data,
                  condition: updatedModules,
                });
              }}
              index={index}
              onChange={(e) => {
                setData({
                  ...data,
                  condition: e.target.value,
                });
              }}
            />
            {errors.condition && (
              <p className="text-red-500 text-xs mt-1">{errors.condition}</p>
            )}
          </div>

          <div className="my-2">
            <InputTextEmoji
              t={t}
              placeholder="Enter Message"
              rows={4}
              Onfocus={Onfocus}
              value={data?.message}
              onChangeemoji={(value) => {
                const updatedModules = data.message + value;
                setData({
                  ...data,
                  message: updatedModules,
                });
              }}
              index={index}
              onChange={(e) => {
                setData({
                  ...data,
                  message: e.target.value,
                });
                setPushMessage(e.target.value);
              }}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          <InputText
            t={t}
            value={data?.time}
            onChange={(e) => {
              setData({
                ...data,
                time: e.target.value,
              });
            }}
            error={errors.time}
            helperText={errors.time}
          />

          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">Lanuguage</InputLabel> */}
            <Select
              className="my-2"
              labelId="demo-simple"
              id="demo-simple"
              sx={{ height: 40 }}
              value={data?.timeFormat}
              onChange={(e) => {
                setData({
                  ...data,
                  timeFormat: e.target.value,
                });
              }}
            >
              <MenuItem value="Minutes">{t("minutes")}</MenuItem>
              <MenuItem value="Hours">{t("hours")}</MenuItem>
              <MenuItem value="Days">{t("days")}</MenuItem>
              <MenuItem value="Weeks">{t("weeks")}</MenuItem>
              <MenuItem value="Months">{t("months")}</MenuItem>
            </Select>
          </FormControl>
          <p className="mt-5 text-sm pb-2 text-[#656565]">{t("selectCard")}</p>
          <div className="flex items-center p-3 rounded-md border border-gray-300">
            <div>
              <button className="text-[15px]  mx-2">
                <span className="flex">
                  {filtercard(data?.cardId)}{" "}
                  <RiCloseLine
                    onClick={() => {
                      setData({
                        ...data,
                        cardId: null,
                      });
                    }}
                    className="text-sm m-1"
                  />
                </span>
              </button>
            </div>
            <div className="flex gap-2">
              <div
                className="w-max p-2 rounded-md bg-gray-200 cursor-pointer"
                onClick={handleClick}
              >
                <PiPlus className="text-sm " />
              </div>
              <div
                className="w-max p-2 rounded-md bg-gray-200 cursor-pointer"
                onClick={handleClick}
              >
                <RiCloseLine className="text-sm" />
              </div>
            </div>
          </div>
          {errors.cardId && (
            <p className="text-red-500 text-xs mt-1">{errors.cardId}</p>
          )}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div className="w-64 max-h-60 overflow-y-auto">
              <Box className="">
                {allcards?.map((card, index) => (
                  <button
                    key={index}
                    button
                    onClick={() => {
                      setData({
                        ...data,
                        cardId: card._id,
                      });
                      setAnchorEl(null);
                    }}
                    className="hover:bg-gray-100 mx-2"
                  >
                    {card.stampName}
                  </button>
                ))}
              </Box>
            </div>
            <div className="p-2 bg-gray-100 border-t border-gray-300 flex justify-between items-center">
              <IconButton onClick={handleClose} size="small">
                {/* <CloseIcon fontSize="small" /> */}
              </IconButton>
            </div>
          </Popover>
        </div>

        <div className="flex justify-between">
          <div
            className="ml-3 rounded bg-black text-white w-max px-7 py-2 mt-4 cursor-pointer"
            onClick={() => {
              update(data);
            }}
          >
            {t("save")}
          </div>
          <div
            className="mt-8 mx-3 cursor-pointer"
            onClick={() => {
              setOpenmodal(true);
            }}
          >
            <RiDeleteBinLine className="text-[22px]" />
          </div>
        </div>
      </div>
      <DeletecustomModal
        open={openmodal}
        handleDelete={deleteData}
        handleClose={() => {
          setOpenmodal(false);
        }}
        singlestamp={data}
      />
    </div>
  );
}

const InputText = ({ value, onChange, error, helperText, t }) => {
  return (
    <TextField
      fullWidth
      onChange={onChange}
      type="number"
      value={value}
      error={!!error}
      helperText={helperText}
      variant="outlined"
      InputProps={{
        sx: {
          height: "40px",
          padding: "0 14px",
        },
      }}
      inputProps={{
        min: 1,
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
  );
};

function InputTextEmoji({
  placeholder,
  value,
  onChange,
  index,
  Onfocus,
  onChangeemoji,
  rows,
  t,
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
          multiline // Add this prop to enable textarea functionality
          rows={rows} // Specify the number of rows for the textarea
          InputProps={{
            sx: {
              padding: "0 14px",
              fontSize: "15px",
              // Remove height here to allow rows to work
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              // Remove height here as well
              "& textarea": {
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

export default ChatCustomAutoPush;
