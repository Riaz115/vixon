import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import dashboarden from "./src/locales/en/dashboard.json";
import carden from "./src/locales/en/card.json";
import dashboardsk from "./src/locales/sk/dashboard.json";
import cardsk from "./src/locales/sk/card.json";
import customerhome from "./src/locales/en/customerhome.json";
import customerhomesk from "./src/locales/sk/customerhome.json";
import changeNavigation from "./src/locales/en/chatnavigation.json";
import changeNavigationSk from "./src/locales/sk/chatnavigation.json";
import sendPush from "./src/locales/en/sendpush.json";
import sendPushSk from "./src/locales/sk/sendpush.json";
import sendPusAutomation from "./src/locales/en/chatPushAutomation.json";
import sendPusAutomationSk from "./src/locales/sk/chatPushAutomation.json";
import chatcustomeautopush from "./src/locales/en/chatCustomeAutoPush.json";
import chatcustomeautopushsk from "./src/locales/sk/chatCustomeAutoPush.json";
import location from "./src/locales/en/location.json";
import locationsk from "./src/locales/sk/location.json";
import phone from "./src/locales/en/phone.json";
import stempNavigation from "./src/locales/en/stampNavigation.json";
import stempNavigateSk from "./src/locales/sk/stampNavigation.json";
import passCustomer from "./src/locales/en/passCustomer.json";
import passSetting from "./src/locales/en/passSetting.json";
import sendPushHistoy from "./src/locales/en/sendpushHistory.json";
import passSetingsk from "./src/locales/sk/passSetting.json";
import sendpushHistorysk from "./src/locales/sk/sendpushHistory.json";
import filter from "./src/locales/en/filter.json";
import addfiltermodal from "./src/locales/en/addFilterModal.json";
import filtersk from "./src/locales/sk/filter.json";
import addfiltermodalsk from "./src/locales/sk/addFilterModal.json";
import customerbase from "./src/locales/en/customerBase.json";
import customerbasesk from "./src/locales/sk/customerBase.json";
import passcustomersk from "./src/locales/sk/passCustomer.json";
import passSendPush from "./src/locales/en/passSendPush.json";
import passSendPushsk from "./src/locales/sk/passSendPush.json";
import timestamps from "./src/locales/en/timeStamp.json";
import timestampssk from "./src/locales/sk/timeStamp.json";
import barchart from "./src/locales/en/barchart.json";
import barchartsk from "./src/locales/sk/barchart.json";
import piechart from "./src/locales/en/piechart.json";
import passStatics from "./src/locales/en/passStatics";
import piechartsk from "./src/locales/sk/piechart.json";
import passStaticssk from "./src/locales/sk/passStatics";
import newFirstStampNavigation from "./src/locales/en/FirstStampsNavigation.json";
import newFirstStampNavigationsk from "./src/locales/sk/FirstStampsNavigation.json";
import forcards from "./src/locales/en/forCards.json";
import forcardssk from "./src/locales/sk/forCards.json";
import cardtype from "./src/locales/en/cardType.json";
import cardtypesk from "./src/locales/sk/cardType.json";
import defaultcard from "./src/locales/en/defaultCard.json";
import defaultcardsk from "./src/locales/sk/defaultCard.json";
import defaultandriod from "./src/locales/en/defaultAndriod.json";
import defaultandriodsk from "./src/locales/sk/defaultAndriod.json";
import saveandpreview from "./src/locales/en/saveAndPreview.json";
import saveandpreviewsk from "./src/locales/sk/saveAndPreview.json";
import addcustomerpopup from "./src/locales/en/addCustomerPopup.json";
import addcustomerpopupsk from "./src/locales/sk/addCustomerPopup.json";
import deletemodal from "./src/locales/en/deleteModal.json";
import deletemodalsk from "./src/locales/sk/deleteModal.json";
import addamount from "./src/locales/en/addAmountModal.json";
import addamountsk from "./src/locales/sk/addAmountModal.json";
import sendnotification from "./src/locales/en/sendNotifications.json";
import sendnotificationsk from "./src/locales/sk/sendNotifications.json";
import customerprofile from "./src/locales/en/CustomerProfile.json";
import customerprofilesk from "./src/locales/sk/CustomerProfile.json";
import customersendpush from "./src/locales/en/CustomerSendPush.json";
import customersendpushsk from "./src/locales/sk/CustomerSendPush.json";
import cutomerinformation from "./src/locales/en/CustomerInformation.json";
import cutomerinformationsk from "./src/locales/sk/CustomerInformation.json";
import customernavigation from "./src/locales/en/CustomerNavigation.json";
import customernavigationsk from "./src/locales/sk/CustomerNavigation.json";
import androiddetail from "./src/locales/en/AndrioiDetail.json";
import androiddetailsk from "./src/locales/sk/AndrioiDetail.json";
import scannerscreen from "./src/locales/en/ScannerScreen.json";
import scannerscreensk from "./src/locales/sk/ScannerScreen.json";
import customerpreview from "./src/locales/en/CustomerPreview.json";
import customerpreviewsk from "./src/locales/sk/CustomerPreview.json";
import cardpreview from "./src/locales/en/CardPreview.json";
import cardpreviewsk from "./src/locales/sk/CardPreview.json";
import stamppreview from "./src/locales/en/StampPreview.json";
import stamppreviewsk from "./src/locales/sk/StampPreview.json";
import couponpreview from "./src/locales/en/CoupenPreview.json";
import couponpreviewsk from "./src/locales/sk/CoupenPreview.json";
import rewardpreview from "./src/locales/en/RewardAndPreview.json";
import rewardpreviewsk from "./src/locales/sk/RewardAndPreview.json";
import discountpreview from "./src/locales/en/DiscountPreview.json";
import discountpreviewsk from "./src/locales/sk/DiscountPreview.json";
import customerrewardpreview from "./src/locales/en/CustomerRewardPreview.json";
import customerrewardpreviewsk from "./src/locales/sk/CustomerRewardPreview.json";
import addbussiness from "./src/locales/en/AddBussiness.json";
import addbussinesssk from "./src/locales/sk/AddBussiness.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      dashboard: dashboarden,
      card: carden,
      customerhome: customerhome,
      changenavigation: changeNavigation,
      sendpush: sendPush,
      sendpusautomation: sendPusAutomation,
      chatcustomeautopush: chatcustomeautopush,
      location: location,
      phone: phone,
      stampnavigation: stempNavigation,
      passcustomer: passCustomer,
      passsetting: passSetting,
      sendpushhistory: sendPushHistoy,
      filter: filter,
      addfiltermodal: addfiltermodal,
      customerbase: customerbase,
      passSendPush: passSendPush,
      timestamps: timestamps,
      barchart: barchart,
      piechart: piechart,
      passStatics: passStatics,
      firstStampnavigation: newFirstStampNavigation,
      forcards: forcards,
      cardtype: cardtype,
      defaultcard: defaultcard,
      defaultandriod: defaultandriod,
      saveandpreview: saveandpreview,
      addcustomerpopup: addcustomerpopup,
      deletemodal: deletemodal,
      addamount: addamount,
      sendnotification: sendnotification,
      customerprofile: customerprofile,
      customersendpush: customersendpush,
      cutomerinformation: cutomerinformation,
      customernavigation: customernavigation,
      androiddetail: androiddetail,
      scannerscreen: scannerscreen,
      customerpreview: customerpreview,
      cardpreview: cardpreview,
      stamppreview: stamppreview,
      couponpreview: couponpreview,
      rewardpreview: rewardpreview,
      discountpreview: discountpreview,
      customerrewardpreview: customerrewardpreview,
      addbussiness: addbussiness,
    },
    sk: {
      dashboard: dashboardsk,
      card: cardsk,
      customerhome: customerhomesk,
      changenavigation: changeNavigationSk,
      sendpush: sendPushSk,
      sendpusautomation: sendPusAutomationSk,
      chatcustomeautopush: chatcustomeautopushsk,
      location: locationsk,
      stampnavigation: stempNavigateSk,
      passsetting: passSetingsk,
      sendpushhistory: sendpushHistorysk,
      filter: filtersk,
      addfiltermodal: addfiltermodalsk,
      passcustomer: passcustomersk,
      customerbase: customerbasesk,
      passSendPush: passSendPushsk,
      barchart: barchartsk,
      piechart: piechartsk,
      passStatics: passStaticssk,
      timestamps: timestampssk,
      firstStampnavigation: newFirstStampNavigationsk,
      forcards: forcardssk,
      cardtype: cardtypesk,
      defaultcard: defaultcardsk,
      defaultandriod: defaultandriodsk,
      saveandpreview: saveandpreviewsk,
      addcustomerpopup: addcustomerpopupsk,
      deletemodal: deletemodalsk,
      addamount: addamountsk,
      sendnotification: sendnotificationsk,
      customerprofile: customerprofilesk,
      customersendpush: customersendpushsk,
      cutomerinformation: cutomerinformationsk,
      customernavigation: customernavigationsk,
      androiddetail: androiddetailsk,
      scannerscreen: scannerscreensk,
      customerpreview: customerpreviewsk,
      cardpreview: cardpreviewsk,
      stamppreview: stamppreviewsk,
      couponpreview: couponpreviewsk,
      rewardpreview: rewardpreviewsk,
      discountpreview: discountpreviewsk,
      customerrewardpreview: customerrewardpreviewsk,
      addbussiness: addbussinesssk,
    },
  },
  lng: localStorage.getItem("language") || "en", // Get language from localStorage or default to 'en'
  fallbackLng: "en", // Fallback language
  ns: ["dashboard"], // Declare namespaces
  defaultNS: "dashboard", // Set default namespace
  interpolation: {
    escapeValue: false, // React already escapes content
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng); // Save language to localStorage
});

export default i18n;
