import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./src/pages/Home";
import NotFoundPage from "./src/pages/NotFound";

import Pass from "./src/pages/pass/Pass";
import PassCustomer from "./src/pages/pass/PassCustomer";
import PassSendPush from "./src/pages/pass/PassSendPush";
import PassSettings from "./src/pages/pass/PassSettings";
import PassStatistics from "./src/pages/pass/PassStatistics";

import Cards from "./src/pages/Cards";

import { AnimatePresence } from "framer-motion";
import App from "./src/App";
import NewComponents from "./src/Components/PhoneEmulator";
import Chat from "./src/pages/chat/Chat";
import ChatCustomAutoPush from "./src/pages/chat/ChatCustomAutoPush";
import ChatPushAutomation from "./src/pages/chat/ChatPushAutomation";
import ChatSendPush from "./src/pages/chat/ChatSendPush";
import Customer from "./src/pages/customer/Customer";
import CustomerInformation from "./src/pages/customer/CustomerInformation";
import CustomerProfile from "./src/pages/customer/CustomerProfile";
import CustomerSendPush from "./src/pages/customer/CustomerSendPush";
import CustomersHome from "./src/pages/customer/CustomersHome";
import AddBusiness from "./src/pages/AddBusiness";
import Scanner from "./src/pages/scan/Scanner";
import SubAccountLocation from "./src/pages/SubAccountLocation";
import SaveAndPreview from "./src/Components/SaveAndPreview";
import SignUp from "./src/pages/SignUp";
import { PhoneEmulatorProvider } from "./src/contexts/PhoneEmulatorContext";
import Passes from "./src/pages/Passes";
import Getpass from "./src/Components/Getpass";
import Cardinstallation from "./src/Components/Cardinstallation";
import User from "./src/pages/sso-user";
import { useSelector } from "react-redux";
import { selectBusinesses } from "./src/redux/businessSlice";
import UserLogin from "./src/pages/mobileview/UserLogin";
import QrScanner from "./src/pages/mobileview/QrScanner";
import OnScreen from "./src/pages/mobileview/OnScreen";
import SuccessMessage from "./src/pages/mobileview/SuccesMessage";
import ErrorMessage from "./src/pages/mobileview/ErrorMessage";
import MobileScanner from "./src/pages/mobileview/MobileScanner";
import Resetsendmail from "./src/pages/mobileview/Resetsendmail";
import VerifyOtp from "./src/pages/mobileview/VerifyOtp";
import Setnewpassword from "./src/pages/mobileview/Setnewpassword";
import Redirect from "./src/pages/mobileview/Redirect";

function AnimatedRoutes() {
  const businessdata = useSelector(selectBusinesses);
  return (
    <AnimatePresence>
      <PhoneEmulatorProvider>
        <Routes>
          <Route path="/getpass" element={<Getpass />} />
          <Route path="/getUser" element={<User />} />
          <Route path="/cardinstallation/:id" element={<Cardinstallation />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/User-login" element={<UserLogin />} />
          <Route path="/Accessaccount" element={<Redirect />} />
          <Route path="/resetsendmail" element={<Resetsendmail />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/change-password" element={<Setnewpassword />} />
          <Route path="/mobilescanner" element={<MobileScanner />} />
          <Route path="/qrcode-Scanner" element={<QrScanner />} />
          <Route path="/success-message" element={<SuccessMessage />} />
          <Route path="/error-message" element={<ErrorMessage />} />
          {businessdata?.token ? (
            <Route path="/" element={<App businessdata={businessdata} />}>
              <Route index element={<Home />} />
              <Route path="passes" element={<Passes />} />
              <Route path="new-components" element={<NewComponents />} />
              <Route
                path="save-preview"
                element={<SaveAndPreview isOn={true} />}
              />
              <Route path="cards/:cardid" element={<Cards />} />
              <Route path="pass" element={<Pass />}>
                <Route index element={<Navigate to="pass-settings" />} />
                <Route
                  path="pass-settings/:cardid"
                  element={<PassSettings />}
                />
                <Route
                  path="pass-customer/:cardid"
                  element={<PassCustomer />}
                />
                <Route
                  path="pass-send-push/:cardid"
                  element={<PassSendPush />}
                />
                <Route
                  path="pass-statistics/:cardid"
                  element={<PassStatistics />}
                />
              </Route>
              <Route path="customer-home" element={<CustomersHome />} />
              <Route path="customer" element={<Customer />}>
                <Route index element={<Navigate to="profile" />} />
                <Route
                  path="send-push/:customerid"
                  element={<CustomerSendPush />}
                />
                <Route
                  path="information/:customerid"
                  element={<CustomerInformation />}
                />
                <Route
                  path="profile/:customerid"
                  element={<CustomerProfile />}
                />
              </Route>
              <Route path="chat" element={<Chat />}>
                <Route index element={<Navigate to="send-push" />} />
                <Route path="send-push" element={<ChatSendPush />} />
                <Route
                  path="push-automation"
                  element={<ChatPushAutomation />}
                />
                <Route
                  path="custom-auto-push"
                  element={<ChatCustomAutoPush />}
                />
              </Route>
              <Route path="/location" element={<SubAccountLocation />} />
              {businessdata?.role === "admin" && (
                <Route path="/addBusiness" element={<AddBusiness />} />
              )}
              <Route path="/scanner-screen" element={<Scanner />} />
              {/* <Route path="/Customerview" element={<CustomerdetailView/>} /> */}
              {/* <Route path="/phone" element={<Phone />} /> */}
              <Route path="*" element={<NotFoundPage />} />
              {/* mobile routes */}
            </Route>
          ) : (
            <Route path="*" element={<User />} />
          )}
        </Routes>
      </PhoneEmulatorProvider>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
