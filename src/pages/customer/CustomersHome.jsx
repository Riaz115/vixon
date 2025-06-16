// CustomersHome.jsx
import React, { useEffect, useState } from "react";
import CustomersTable from "../../Components/table/CustomersTable";
import Filters from "../../Components/Filters";
import { pageVariants } from "../../Animation";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { selectstamps } from "../../redux/stampSlice";
import { getallcustomers, getalltransaction } from "../../api/createstamp";
import { Loader } from "../../Components/Loader/loader";
import { Addcustomer, selectcustomers } from "../../redux/customerSlice";
import {
  Addtransaction,
  selecttransactions,
} from "../../redux/transactionSlice";
import { selectBusinesses } from "../../redux/businessSlice";
import Stats from "../../Components/Stats";
import { filterCustomers } from "../../utils/filterfun";
import { useTranslation } from "react-i18next";

function CustomersHome() {
  //my code
  const { t } = useTranslation("customerhome");

  const stamps = useSelector(selectstamps);
  const transactions = useSelector(selecttransactions);
  const customers = useSelector(selectcustomers);

  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState(stamps[0]?.id);
  const [cardcustomers, setCardcustomers] = useState();
  const [cardtransaction, setCardtransaction] = useState();
  const business = useSelector(selectBusinesses);
  const [implementFilter, setimplementFilter] = useState([]);
  const [filtercustomer, setfilterCustomers] = useState();
  const allstamp = stamps;

  useEffect(() => {
    document.title = "Customers";
    setCard(stamps[0]?.id);
  }, [stamps]);

  useEffect(() => {
    setData(customers);
  }, [customers]);

  const changecard = (id) => {
    setCard(id);
  };

  useEffect(() => {
    const custom = customers?.filter((item) =>
      item?.cards?.some((card) => card?.device)
    );
    setCardcustomers(custom);
  }, [customers]);

  useEffect(() => {
    const custom = transactions?.filter((item) => item?.cardId?.id === card);
    setCardtransaction(custom);
  }, [card, transactions]);

  useEffect(() => {
    const transactionall = async () => {
      try {
        setLoading(true);
        const response = await getalltransaction({
          businessId: business?.activeLocation,
        });
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          dispatch(Addtransaction(response.data?.data?.transactions));
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    transactionall();
  }, [business?.activeLocation, dispatch]);

  useEffect(() => {
    const customerall = async () => {
      try {
        setLoading(true);
        const response = await getallcustomers({
          businessId: business?.activeLocation,
        });

        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          dispatch(Addcustomer(response.data?.data?.customers));
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    customerall();
  }, [business?.activeLocation, dispatch]);

  // Apply Filters
  useEffect(() => {
    const dataafterthefilter = filterCustomers(
      implementFilter,
      customers,
      allstamp
    );
    // console.log("Applied Filters:", implementFilter);
    // console.log("Filtered Customers:", dataafterthefilter);
    setfilterCustomers(dataafterthefilter);
  }, [implementFilter, customers, allstamp]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="mb-20 mt-4">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <div>
              <Stat data={cardcustomers} title={t("cardInstalled")} />
            </div>
            <div>
              <Stat data={customers} title={t("customerTotal")} />
            </div>
            <div>
              <Stat data={transactions} title={t("totalTransition")} />
            </div>
            <div>
              <Stats heading={t("feedbackRating")} rating={4} />
            </div>
          </div>
          {/* Pass `stamps` as `allstamp` prop */}
          <Filters
            implementFilter={implementFilter}
            setimplementFilter={setimplementFilter}
            customers={customers}
            allstamp={stamps} // Added this line
          />
          <CustomersTable
            cardcustomers={filtercustomer}
            allstamp={stamps}
            t={t}
          />
        </div>
      </div>
      <Loader loading={loading} />
    </motion.div>
  );
}

function Stat({ data, title }) {
  return (
    <div className="p-4 box-border border border-gray-300 rounded">
      <span className="text-[44px] leading-7 font-semibold">
        {data?.length}
      </span>
      <br />
      <span className="text-sm text-[#656565]">{title}</span>
    </div>
  );
}

export default CustomersHome;
