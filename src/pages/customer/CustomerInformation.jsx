import React, { useEffect, useState } from "react";
import { pageVariants } from "../../Animation";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import CustomerdeleteModal from "./CustomerdeleteModal";
import { deletecustomerdata } from "../../redux/customerSlice";
import { deletecustomer } from "../../api/createstamp";
import { useDispatch } from "react-redux";
import { Loader } from "../../Components/Loader/loader";
import { updatecustomer } from "../../api/createstamp";
import { updatecustomers } from "../../redux/customerSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
const CustomerInformation = () => {
  const { t } = useTranslation("cutomerinformation");
  const single = useOutletContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    date_of_birth: "",
    phone: "",
  });

  const Change = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deletecustomer(data._id);
      if (response.status === 204) {
        dispatch(deletecustomerdata(data._id));
        setOpen(false);
        navigate("/customer-home");
        setLoading(false);
        toast.success(t("delmsg"));
      }
    } catch (error) {
      setLoading(false);
      toast.error(t("failmsg"));
    }
  };
  const handleupdate = async () => {
    try {
      setLoading(true);
      const response = await updatecustomer(data._id, data);
      if (response.status === 200) {
        dispatch(updatecustomers(response.data.customer));
        toast.success(t("updatemsg"));
        setLoading(false);
      }
    } catch (error) {
      // //console.log(error,"these are error");
      toast.error(t("updatefail"));
      setLoading(false);
    }
  };
  useEffect(() => {
    setData(single);
  }, [single]);

  useEffect(() => {
    document.title = t("title");
  }, []);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className=" pt-10">
        <h2 className="text-2xl mb-6">{t("info")}</h2>
        <div className="bg-white p-6 rounded-lg shadow w-full">
          <div className="grid sm:grid-cols-2 gap-5">
            {
              <div>
                <label className="block text-gray-700 font-semibold">
                  {t("firstname")}
                </label>
                <input
                  type="text"
                  value={data?.first_name}
                  onChange={Change}
                  name="first_name"
                  placeholder={t("firstname")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            }

            {
              <div>
                <label className="block text-gray-700 font-semibold">
                  {t("dob")}
                </label>
                <div className="relative">
                  <input
                    value={
                      data?.date_of_birth
                        ? new Date(data.date_of_birth)
                            .toISOString()
                            .substr(0, 10)
                        : ""
                    }
                    type="date"
                    onChange={Change}
                    name="date_of_birth"
                    placeholder="30.03.4545"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            }
            {
              <div>
                <label className="block text-gray-700 font-semibold">
                  {t("lastname")}
                </label>
                <input
                  type="text"
                  value={data?.last_name}
                  name="last_name"
                  onChange={Change}
                  placeholder={t("lastname")}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            }
            {
              <div>
                <label className="block text-gray-700 font-semibold">
                  {t("email")}
                </label>
                <input
                  type="email"
                  onChange={Change}
                  name="email"
                  value={data?.email}
                  placeholder="jakub.pitonak@ue-germany.de"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            }
            {data?.googleWallet && (
              <div>
                <label className="block text-gray-700 font-semibold my-1">
                  Google Wallet
                </label>
                <a
                  href={data?.googleWallet}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/23SK_Add_to_Google_Wallet_RGB.png"
                    alt="a"
                    className="w-26 h-10"
                  />
                </a>
              </div>
            )}
            {data?.appleWallet && (
              <div>
                <label className="block text-gray-700 font-semibold my-1">
                  Apple Wallet
                </label>
                <a
                  href={data?.appleWallet}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/2SK_Add_to_Apple_Wallet_RGB_102121.png"
                    alt="a"
                    className="w-26 h-10"
                  />
                </a>
              </div>
            )}
          </div>
          <div className="mt-6 flex gap-4">
            <button
              className="bg-black text-white py-2 px-4 rounded-md w-[110px]"
              onClick={() => {
                handleupdate();
              }}
            >
              {t("save")}
            </button>
            <button
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md  w-[110px]"
              onClick={() => {
                setOpen(true);
              }}
            >
              {t("delete")}
            </button>
          </div>
        </div>
      </div>
      <CustomerdeleteModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        handleDelete={handleDelete}
        single={data}
      />
      <Loader loading={loading} />
    </motion.div>
  );
};

export default CustomerInformation;
