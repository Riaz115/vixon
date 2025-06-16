import React from "react";
import { useTranslation } from "react-i18next";

const CustomerPreview = ({ alldata }) => {
  const { t } = useTranslation("customerpreview");
  return (
    <div style={{ width: "380px" }}>
      <div className="text-center ">
        <p className="font-bold text-xl">{t("custinfo")}</p>
        <div className="pt-10  ">
          <div className="p-6 w-full">
            <div className="grid sm:grid-cols-1 gap-5 text-start">
              {alldata?.first_name && (
                <div>
                  <label className="block text-gray-700 font-semibold">
                    {t("fname")}
                  </label>
                  <input
                    type="text"
                    placeholder="Testing"
                    value={alldata?.first_name}
                    disabled
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}
              {alldata?.last_name && (
                <div>
                  <label className="block text-gray-700 font-semibold">
                    {t("lname")}
                  </label>
                  <input
                    type="text"
                    placeholder="Tesimf"
                    value={alldata?.last_name}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    disabled
                  />
                </div>
              )}
              {alldata?.date_of_birth && (
                <div>
                  <label className="block text-gray-700 font-semibold">
                    {t("dob")}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      value={
                        alldata?.date_of_birth
                          ? new Date(alldata?.date_of_birth)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      disabled
                    />
                  </div>
                </div>
              )}
              {alldata?.email && (
                <div>
                  <label className="block text-gray-700 font-semibold">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    placeholder="jakub.pitonak@ue-germany.de"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={alldata?.email}
                    disabled
                  />
                </div>
              )}
              {alldata?.phone && (
                <div>
                  <label className="block text-gray-700 font-semibold">
                    {t("phone")}
                  </label>
                  <input
                    type="text" // Changed type from 'email' to 'text' for phone numbers
                    placeholder="+1234567890"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={alldata?.phone}
                    disabled
                  />
                </div>
              )}
              {alldata?.device && (
                <div>
                  <label className="block text-gray-700 font-semibold">
                  {t("instondev")}
                  </label>
                  <input
                    type="text" // Changed type from 'email' to 'text' for device names
                    placeholder="App Wallet"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={alldata?.device}
                    disabled
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPreview;
