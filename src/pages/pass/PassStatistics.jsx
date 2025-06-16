import React from "react";
import Stats from "../../Components/Stats";
import Card from "../../Components/Card";
import Linechart from "../../Components/charts/LineChart";
import TimeStamps from "../../Components/TimeStamps";
import Piechart from "../../Components/charts/Piechart";
import { styled } from "@mui/material";
import { Avatar } from "@mui/material";
import { selecttransactions } from "../../redux/transactionSlice";
import { selectcustomers } from "../../redux/customerSlice";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectstamps } from "../../redux/stampSlice";
import Barcharts from "../../Components/charts/BarChart";
import { useState, useEffect } from "react";
import TransactionLinechart from "../../Components/charts/TransactionLinechart";
import CustomerLinechart from "../../Components/charts/CutomerLineChart";
import { useTranslation } from "react-i18next";

function formatAmount(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
function PassStatistics() {
  const { t } = useTranslation("passStatics");

  const { cardid } = useOutletContext();
  const [singlestamp, setSingleStamp] = useState();
  const [designdata, setdesigndata] = useState();
  const stampdata = useSelector(selectstamps);
  const transactiondata = useSelector(selecttransactions);
  const customers = useSelector(selectcustomers);
  const [installcard, setInstallcard] = useState();
  const [cardcustomers, setcardcustomers] = useState();
  const [cardtransation, setCardtransation] = useState();
  const [selectedPeriod, setSelectedPeriod] = useState("Day");
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
    <div className="mt-5">
      <h1 className="text-2xl mt-3">{t("cardstatisc")}</h1>
      <TimeStamps
        heading={t("activity")}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
      <Barcharts
        alltransactions={cardtransation}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 mt-5">
        <Stats
          border={true}
          heading={t("totalpurchaseamount")}
          amount={`${formatAmount(
            cardtransation?.reduce(
              (sum, item) => sum + (item?.Transactionamount || 0),
              0
            )
          )}`}
          change={`${formatAmount(
            cardtransation?.reduce(
              (sum, item) => sum + (item?.Transactionamount || 0),
              0
            )
          )}`}
          profit={"positive"}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-3">
        <Card
          heading={t("totalpurchaseamount")}
          rightOption={formatAmount(
            cardtransation?.reduce(
              (sum, item) => sum + (item?.Transactionamount || 0),
              0
            )
          )}
          profit={"positive"}
        >
          <div className="my-5 mx-2 relative right-5">
            <Linechart
              alltransactions={cardtransation}
              selectedPeriod={selectedPeriod}
              datatype="purchase"
              key="Transactionamount"
            />
          </div>
        </Card>

        <Card
          heading={t("totalTransition")}
          rightOption={cardtransation?.length}
          profit={"positive"}
        >
          <div className="my-5 relative right-5">
            <TransactionLinechart
              alltransactions={cardtransation}
              selectedPeriod={selectedPeriod}
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-3">
        <Card
          heading={t("totalpurchaseamount")}
          rightOption={formatAmount(
            cardtransation?.reduce(
              (sum, item) => sum + (item?.Transactionamount || 0),
              0
            )
          )}
          profit={"positive"}
        >
          <div className="my-5 mx-2 relative right-5">
            <Linechart
              alltransactions={cardtransation}
              selectedPeriod={selectedPeriod}
              datatype="purchase"
              key="Transactionamount"
            />
          </div>
        </Card>
        <Card
          heading={t("totalTransition")}
          rightOption={cardtransation?.length}
          profit={"positive"}
        >
          <div className="my-5 relative right-5">
            <TransactionLinechart
              alltransactions={cardtransation}
              selectedPeriod={selectedPeriod}
            />
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-3">
        <Card
          heading={t("newclients")}
          rightOption={cardcustomers?.length}
          profit={"positive"}
        >
          <div className="my-5 relative right-5">
            <CustomerLinechart
              alltransactions={cardcustomers}
              selectedPeriod={selectedPeriod}
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-3">
        <Card heading={t("device")} rightOption={"0"} profit={"neutral"}>
          <div className="my-5 relative right-5">
            <Piechart allcustomers={cardcustomers} />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PassStatistics;
