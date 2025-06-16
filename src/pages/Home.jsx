import React from "react";
import TimeStamps from "../Components/TimeStamps";
import Notification from "../Components/Notification";
import Stats from "../Components/Stats";
import Card from "../Components/Card";
import { Avatar } from "@mui/material";
import { styled } from "@mui/system";
import Barcharts from "../Components/charts/BarChart";
import Linechart from "../Components/charts/LineChart";
// import Piechart from "../Components/charts/Piechart";
import { motion } from "framer-motion";
import { pageVariants } from "../Animation";
import { useState } from "react";
const SmallTextAvatar = styled(Avatar)({
  height: 33,
  width: 33,
  backgroundColor: "black",
  fontSize: "12px",
});
import { useSelector } from "react-redux";
import { selecttransactions } from "../redux/transactionSlice";
import TransactionLinechart from "../Components/charts/TransactionLinechart";
import CustomerLinechart from "../Components/charts/CutomerLineChart";
import { selectcustomers } from "../redux/customerSlice";
import { selectstamps } from "../redux/stampSlice";
import CardsLinechart from "./chat/CardsLineChart";
import Piechart from "../Components/charts/Piechart";
import { useTranslation } from "react-i18next";
function formatAmount(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function Home() {
  const alltransactions = useSelector(selecttransactions);
  const allcustomers = useSelector(selectcustomers);
  const allcards = useSelector(selectstamps);
  const { t } = useTranslation("dashboard");
  const [selectedPeriod, setSelectedPeriod] = useState("Day");

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <TimeStamps
        heading={"Dashboard"}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
      <Barcharts
        alltransactions={alltransactions}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 mt-5">
        <Stats
          border={true}
          heading={t("totalPurchaseAmount")}
          amount={`${formatAmount(
            alltransactions?.reduce(
              (sum, item) => sum + (item?.Transactionamount || 0),
              0
            )
          )}`}
          change={`${formatAmount(
            alltransactions?.reduce(
              (sum, item) => sum + (item?.Transactionamount || 0),
              0
            )
          )}`}
          profit={"positive"}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-3">
        <Card
          heading={t("totalPurchaseAmount")}
          rightOption={formatAmount(
            alltransactions?.reduce(
              (sum, item) => sum + (item?.Transactionamount || 0),
              0
            )
          )}
          profit={"positive"}
        >
          <div className="my-5 mx-2 relative right-5">
            <Linechart
              alltransactions={alltransactions}
              selectedPeriod={selectedPeriod}
              t={t}
              key="Transactionamount"
            />
          </div>
        </Card>

        <Card
          heading={t("totaltransactions")}
          rightOption={alltransactions?.length}
          profit={"positive"}
        >
          <div className="my-5 relative right-5">
            <TransactionLinechart
              alltransactions={alltransactions}
              selectedPeriod={selectedPeriod}
            />
          </div>
        </Card>
      </div>
      {/* <TimeStamps heading={"Activity"} /> */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-3">
        <Card
          heading={t("newclients")}
          rightOption={allcustomers?.length}
          profit={"positive"}
        >
          <div className="my-5 relative right-5">
            <CustomerLinechart
              alltransactions={allcustomers}
              selectedPeriod={selectedPeriod}
            />
          </div>
        </Card>
        <Card
          heading={t("issuedCards")}
          rightOption={allcards?.length}
          profit={"positive"}
        >
          <div className="my-5 relative right-5">
            <CardsLinechart
              alltransactions={allcards}
              selectedPeriod={selectedPeriod}
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-3">
        <Card heading={t("device")} rightOption={"0"} profit={"neutral"}>
          <div className="my-5 relative right-5">
            <Piechart allcustomers={allcustomers} t={t} />
          </div>
        </Card>
        {/* <Card heading={"Top 10"}>
          <div className='h-64 mt-3'>
            <div className='flex justify-between my-4'>
              <div className='flex items-center'>
                <span className='mr-4 text-xs'>10</span>
                <SmallTextAvatar className='mr-2'>FA</SmallTextAvatar>
                <span className='text-sm font-bold'>Farooq</span>
              </div>
              <div className='text-xs'>10</div>
            </div>
            <div className='flex justify-between my-4'>
              <div className='flex items-center'>
                <span className='mr-4 text-xs'>10</span>
                <SmallTextAvatar className='mr-2'>FA</SmallTextAvatar>
                <span className='text-sm font-bold'>Farooq</span>
              </div>
              <div className='text-xs'>10</div>
            </div>
            <div className='flex justify-between my-4'>
              <div className='flex items-center'>
                <span className='mr-4 text-xs'>10</span>
                <SmallTextAvatar className='mr-2'>FA</SmallTextAvatar>
                <span className='text-sm font-bold'>Farooq</span>
              </div>
              <div className='text-xs'>10</div>
            </div>
            <div className='flex justify-between my-4'>
              <div className='flex items-center'>
                <span className='mr-4 text-xs'>10</span>
                <SmallTextAvatar className='mr-2'>FA</SmallTextAvatar>
                <span className='text-sm font-bold'>Farooq</span>
              </div>
              <div className='text-xs'>10</div>
            </div>
            <div className='flex justify-between my-4'>
              <div className='flex items-center'>
                <span className='mr-4 text-xs'>10</span>
                <SmallTextAvatar className='mr-2'>FA</SmallTextAvatar>
                <span className='text-sm font-bold'>Farooq</span>
              </div>
              <div className='text-xs'>10</div>
            </div>
          </div>
        </Card> */}
      </div>
    </motion.div>
  );
}

export default Home;
