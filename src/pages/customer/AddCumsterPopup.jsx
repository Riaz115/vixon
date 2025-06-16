import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

export default function AddCustomerPopup({
  setOpen,
  open,
  customer,
  setcustomer,
  setOpentemplete,
}) {
  const { t } = useTranslation("addcustomerpopup");
  const [value, setValue] = useState();
  const [startDate, setStartDate] = useState();
  const [errors, setErrors] = useState({});

  const styinput =
    "block w-full bg-white rounded-md border-0 py-2 p-2 outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#DFDFE5] sm:text-sm sm:leading-6 bg:white";

  // Handle change for individual fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Handle phone input change
  const handlePhoneChange = (phone) => {
    setValue(phone);
    setcustomer((prev) => ({ ...prev, phone }));
  };

  // Handle date change
  const handleDateChange = (date) => {
    setStartDate(date.toISOString().split("T")[0]);
    setcustomer((prev) => ({
      ...prev,
      date_of_birth: date.toISOString().split("T")[0],
    }));
  };

  // Validation rules
  const validate = () => {
    const newErrors = {};
    if (!customer.first_name) newErrors.first_name = t("namereq");
    if (!customer.last_name) newErrors.last_name = t("lastName");
    if (!customer.email || !/\S+@\S+\.\S+/.test(customer.email))
      newErrors.email = t("valiedemailreq");
    if (!value) newErrors.phone = t("phonereq");
    if (!startDate) newErrors.date_of_birth = t("datofbirreq");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = () => {
    if (validate()) {
      setOpen(false);
      setOpentemplete(true);
    } else {
      //// //console.log   .log("Validation failed.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="w-full">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="flex justify-between mb-2">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {t("addcustomer")}
                    </DialogTitle>
                    <CgClose />
                  </div>
                  <div className="mt-2 w-full flex flex-col gap-6 my-2">
                    <input
                      type="text"
                      placeholder={t("firstname")}
                      name="first_name"
                      value={customer.first_name || ""}
                      onChange={handleChange}
                      className={styinput}
                    />
                    {errors.first_name && (
                      <span className="text-red-500 text-sm">
                        {errors.first_name}
                      </span>
                    )}

                    <input
                      type="text"
                      placeholder={t("lastname")}
                      name="last_name"
                      value={customer.last_name || ""}
                      onChange={handleChange}
                      className={styinput}
                    />
                    {errors.last_name && (
                      <span className="text-red-500 text-sm">
                        {errors.last_name}
                      </span>
                    )}

                    <input
                      type="email"
                      placeholder={t("email")}
                      name="email"
                      value={customer.email || ""}
                      onChange={handleChange}
                      className={styinput}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        {errors.email}
                      </span>
                    )}

                    <PhoneInput
                      onFocus={false}
                      className={styinput}
                      international
                      placeholder={t("phoneno")}
                      name="phone"
                      value={value}
                      onChange={handlePhoneChange}
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-sm">
                        {errors.phone}
                      </span>
                    )}

                    <DatePicker
                      selected={startDate}
                      onChange={handleDateChange}
                      placeholderText={t("dob")}
                      name="date_of_birth"
                      className="w-full rounded-md border-0 py-2 p-2 outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#DFDFE5] sm:text-sm sm:leading-6 bg-white"
                    />
                    {errors.date_of_birth && (
                      <span className="text-red-500 text-sm">
                        {errors.date_of_birth}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex gap-3 sm:px-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
              >
                {t("addcustomer")}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                {t("cancel")}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
