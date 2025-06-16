import React, { useEffect, useState } from "react";
import QRCodeComponent from "../../Components/QrCodeComponent";
import Stats from "../../Components/Stats";
import Transactions from "../../Components/table/Transactions";
import { RxDownload } from "react-icons/rx";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectstamps } from "../../redux/stampSlice";
import { PhoneEmulator } from "../../Components/PhoneEmulator";
import DefaultCardContent from "../DefaultCardContent";
import { routeMa } from "../../data";
import { generatePDF } from "../../Components/convertdata";
import { Loader } from "../../Components/Loader/loader";
import { selecttransactions } from "../../redux/transactionSlice";
import { selectcustomers } from "../../redux/customerSlice";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
function PassSettings() {
  const { t } = useTranslation("passsetting");
  const { cardid } = useOutletContext();
  const [singlestamp, setSingleStamp] = useState();
  const [designdata, setdesigndata] = useState();
  const stampdata = useSelector(selectstamps);
  const [loading, setLoading] = useState(false);
  const transactiondata = useSelector(selecttransactions);
  const [cardcustomers, setcardcustomers] = useState();
  const customers = useSelector(selectcustomers);
  const [cardtransation, setCardtransation] = useState();
  const [installcard, setInstallcard] = useState();
  const [Csv, setCsvdata] = useState();
  useEffect(() => {
    const data = transactiondata?.filter((item) => item.cardId?.id === cardid);
    // //console.log(data,"this is data")
    setCardtransation(data);
  }, [transactiondata, cardid]);

  useEffect(() => {
    const data = stampdata.find((item) => item.id === cardid);
    if (data) {
      setSingleStamp(data);
      setdesigndata(data);
    }
  }, [stampdata, cardid]);
  useEffect(() => {
    // //console.log(customers,"these are card customers")
    const data = customers.filter((item) => item?.cards[0]?.cardId === cardid);
    setcardcustomers(data);
  }, [customers, cardid]);

  useEffect(() => {
    const installedcard = cardcustomers?.filter(
      (item) => item?.cards[0]?.status === "installed"
    );
    setInstallcard(installedcard);
  }, [cardcustomers]);

  React.useEffect(() => {
    document.title = t("title");
  }, []);

  return (
    <div className="my-5">
      <div className="mt-6 flex gap-4 flex-wrap">
        <h1 className="text-2xl">{singlestamp?.stampName}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-1 mt-4">
        <div className="bg-white flex justify-center h-[660px]  rounded-lg border border-[#d5d5dd68] shadow-sm box-border p-3">
          <div className="emulater">
            {singlestamp && (
              <PhoneEmulator
                status={designdata?.card_status}
                emulatorContent={
                  <DefaultCardContent
                    routeMap={routeMa}
                    cardType={singlestamp?.cardType}
                    stampName={singlestamp?.stampName}
                    designformData={designdata}
                  />
                }
                onlyPhone={true}
              ></PhoneEmulator>
            )}
          </div>
        </div>
        <div>
          <QRCodeComponent data={singlestamp} cardid={cardid} t={t} />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <Stats
            border={true}
            heading={t("installedCards")}
            amount={installcard?.length}
            change={"0"}
            profit={"neutral"}
          />{" "}
          <Stats
            border={true}
            heading={t("stampsEarned")}
            amount={"0"}
            change={"0"}
            profit={"neutral"}
          />{" "}
          <Stats
            border={true}
            heading={t("rewardsEarned")}
            amount={"0"}
            change={"0"}
            profit={"neutral"}
          />{" "}
          <Stats
            border={true}
            heading={t("rewardRedeemed")}
            amount={"0"}
            change={"0"}
            profit={"neutral"}
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <Stats
            border={true}
            heading={t("totalCustomers")}
            amount={cardcustomers?.length}
            change={"0"}
            profit={"neutral"}
          />{" "}
          <Stats
            border={true}
            heading={t("transactions")}
            amount={cardtransation?.length}
            change={"0"}
            profit={"neutral"}
          />{" "}
          {/* <Stats border={true} heading={"Reviews"} amount={"0"} change={"0"} profit={"neutral"} />{" "} */}
          {/* <Stats border={true} heading={"Feedback rating"} amount={"0"} change={"0"} profit={"neutral"} /> */}
        </div>
      </div>

      <div className=" mt-6 flex justify-between items-center">
        <h1 className="text-2xl">{t("transHistory")}</h1>
        <span className="p-2 rounded-md bg-gray-200 shadow">
          {Csv && (
            <CSVLink data={Csv} filename="transactions.csv">
              <RxDownload />
            </CSVLink>
          )}
        </span>
      </div>
      <Transactions
        cardtransation={cardtransation}
        setCsvdata={setCsvdata}
        t={t}
      />
      <Loader loading={loading} />
    </div>
  );
}

export default PassSettings;
