import React from "react";
import Topbar from "./Components/Topbar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Addstamp } from "./redux/stampSlice";
import { Loader } from "./Components/Loader/loader";
import {
  getStamps,
  getallcustomers,
  getalltransaction,
} from "./api/createstamp";
import { Addcustomer } from "./redux/customerSlice";
import { Addtransaction } from "./redux/transactionSlice";

import "tippy.js/dist/tippy.css";

const App = ({ businessdata }) => {
  const [barcodeData, setBarCodeData] = useState("");
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        setloading(true);
        const response = await getStamps({
          businessId: businessdata?.activeLocation,
        });
        if (response.status === 200) {
          setloading(false);

          dispatch(Addstamp(response.data?.data));
        } else {
          setloading(false);
        }
      } catch (error) {
        setloading(false);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const transactionall = async () => {
      try {
        setloading(true);
        const response = await getalltransaction({
          businessId: businessdata?.activeLocation,
        });
        if (response.status === 200 || response.status === 201) {
          setloading(false);
          dispatch(Addtransaction(response.data?.data?.transactions));
        }
      } catch (error) {
        // //console.log(error)
        setloading(false);
      }
    };
    transactionall();
  }, []);

  useEffect(() => {
    const customerall = async () => {
      try {
        setloading(true);
        const response = await getallcustomers({
          businessId: businessdata?.activeLocation,
        });

        if (response.status === 200 || response.status === 201) {
          setloading(false);
          dispatch(Addcustomer(response.data?.data?.customers));
        }
      } catch (error) {
        // //console.log(error)
        setloading(false);
      }
    };
    customerall();
  }, []);

  return (
    <>
      {/* <GoogleTranslate/> */}
      <Topbar businessdata={businessdata} />
      <div className="flex pt-20 ">
        <Sidebar setBarCodeData={setBarCodeData} />
        <div className="flex-1 pl-16  px-6">
          <Outlet  context={{barcodeData, setBarCodeData}}/>
          <Loader loading={loading} />
        </div>
      </div>
    </>
  );
};

export default App;


