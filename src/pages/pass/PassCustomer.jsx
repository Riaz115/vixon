import React from "react";
import Stats from "../../Components/Stats";
import CustomerBase from "../../Components/table/CustomerBase";
import Filters from "../../Components/Filters";
import { useOutletContext } from "react-router-dom";
import { selectcustomers } from "../../redux/customerSlice";
import { useSelector } from "react-redux";
import { selecttransactions } from "../../redux/transactionSlice";
import { useState, useEffect } from "react";
import { filterCustomers } from "../../utils/filterfun";
import { useTranslation } from "react-i18next";

function PassCustomer() {
  const { t } = useTranslation("passcustomer");
  const { cardid, customer } = useOutletContext();
  const allcustomers = useSelector(selectcustomers);
  const transactions = useSelector(selecttransactions);
  const [card, setCard] = useState(cardid);
  const [data, setData] = useState();
  const [cardtransaction, setCardtransaction] = useState();
  const [cardcustomers, setCardcustomers] = useState();
  const [implementFilter, setimplementFilter] = useState([]);
  const [filtercustomer, setfilterCustomers] = useState();
  useEffect(() => {
    document.title = t("title");
    setCard(cardid);
  }, [cardid]);
  useEffect(() => {
    const custom = transactions?.filter((item) => item?.cardId?.id === cardid);
    setCardtransaction(custom);
  }, [cardid, transactions]);

  useEffect(() => {
    const custom = allcustomers?.filter((item) =>
      item.cards.some((d) => d.cardId === cardid)
    );
    // setCardcustomers()
    setData(custom);
  }, [card, allcustomers]);
  React.useEffect(() => {
    document.title = t("mainTitle");
  }, []);
  useEffect(() => {
    const dataafterthefilter = filterCustomers(implementFilter, data);
    setfilterCustomers(dataafterthefilter);
    //  console.log(dataafterthefilter,"this is data after the filter")
  }, [implementFilter, data]);
  return (
    <div className="my-4">
      <div>
        <h1 className="text-2xl pb-3">{t("customerbase")}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Stats
          border={true}
          heading={t("customerTotal")}
          amount={data?.length}
          change={"+1"}
          profit={"positive"}
        />
        <Stats
          border={true}
          heading={t("cardsTransactions")}
          amount={cardtransaction?.length}
          change={cardtransaction?.length}
          profit={"positive"}
        />
        <Stats
          border={true}
          heading={t("reviews")}
          amount={0}
          change={0}
          profit={"neutral"}
        />
        <Stats border={true} heading={t("reviews")} rating={true} />
      </div>
      <Filters
        implementFilter={implementFilter}
        setimplementFilter={setimplementFilter}
        customers={data}
        bg={true}
      />
      <CustomerBase cardid={cardid} customer={filtercustomer} />
    </div>
  );
}

export default PassCustomer;
