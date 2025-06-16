import { getToken, onMessage } from "firebase/messaging";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";

import {
  FaApple,
  FaStar,
  FaHeart,
  FaSmile,
  FaCoffee,
  FaAppleAlt,
  FaAnchor,
  FaBell,
  FaBook,
  FaBolt,
  FaCar,
  FaCheck,
  FaCloud,
  FaCogs,
  FaCompass,
  FaDesktop,
  FaDove,
  FaEye,
  FaFeather,
  FaFire,
  FaFlag,
  FaFlask,
  FaGift,
  FaGlobe,
  FaHammer,
  FaHeadphones,
  FaIceCream,
  FaKey,
  FaLeaf,
  FaLightbulb,
  FaLock,
  FaMagic,
  FaMobileAlt,
  FaMoon,
  FaPaintBrush,
  FaPaperPlane,
  FaPen,
  FaPhone,
  FaPlane,
  FaRocket,
  FaShoppingCart,
  FaSnowflake,
  FaSun,
  FaTabletAlt,
  FaTrophy,
  FaUmbrella,
  FaUser,
  FaVideo,
  FaWrench,
  FaYinYang,
} from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";

import { useParams } from "react-router-dom";
import {
  installationcard,
  installationcardonform,
  sendTokenToServer,
} from "../api/createstamp";
import { routeMa } from "../data";
import { messaging } from "../firebase";
import DefaultCardContent from "../pages/DefaultCardContent";
import DetailCardContent from "../pages/DetailCardContent";
import { Loader } from "./Loader/loader";
import { frontendUrl, Vapid_KEY } from "../config";
import { ChevronRight, Download, HelpCircle } from "lucide-react";
import { resizeImage } from "./convertdata";
import { Modal, Box, Typography, Button } from "@mui/material";

function Cardinstallation() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState();
  const [swipping, setSwipping] = useState("cardtype");
  const [details, setDetail] = useState(false);
  const [alldata, setalldata] = useState();
  const [informationformData, setinformationFormData] = useState();
  const [designformData, setdesignFormData] = useState();
  const [settingformData, setsettingFormData] = useState();
  const [stampname, setStampName] = useState();
  const [pwadata, setpwadata] = useState();
  const [notificationPermission, setNotificationPermission] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  let [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const activeStampList = [
    { icon: <FaStar />, name: "Star" },
    { icon: <FaHeart />, name: "Heart" },
    { icon: <FaSmile />, name: "Smile" },
    { icon: <FaCoffee />, name: "Coffee" },
    { icon: <FaAppleAlt />, name: "Apple" },
    { icon: <FaAnchor />, name: "Anchor" },
    { icon: <FaBell />, name: "Bell" },
    { icon: <FaBook />, name: "Book" },
    { icon: <FaBolt />, name: "Bolt" },
    { icon: <FaCar />, name: "Car" },
    { icon: <FaCheck />, name: "Check" },
    { icon: <FaCloud />, name: "Cloud" },
    { icon: <FaCogs />, name: "Cogs" },
    { icon: <FaCompass />, name: "Compass" },
    { icon: <FaDesktop />, name: "Desktop" },
    { icon: <FaDove />, name: "Dove" },
    { icon: <FaEye />, name: "Eye" },
    { icon: <FaFeather />, name: "Feather" },
    { icon: <FaFire />, name: "Fire" },
    { icon: <FaFlag />, name: "Flag" },
    { icon: <FaFlask />, name: "Flask" },
    { icon: <FaGift />, name: "Gift" },
    { icon: <FaGlobe />, name: "Globe" },
    { icon: <FaHammer />, name: "Hammer" },
    { icon: <FaHeadphones />, name: "Headphones" },
    { icon: <FaIceCream />, name: "Ice Cream" },
    { icon: <FaKey />, name: "Key" },
    { icon: <FaLeaf />, name: "Leaf" },
    { icon: <FaLightbulb />, name: "Lightbulb" },
    { icon: <FaLock />, name: "Lock" },
    { icon: <FaMagic />, name: "Magic" },
    { icon: <FaMobileAlt />, name: "Mobile" },
    { icon: <FaMoon />, name: "Moon" },
    { icon: <FaPaintBrush />, name: "Paint Brush" },
    { icon: <FaPaperPlane />, name: "Paper Plane" },
    { icon: <FaPen />, name: "Pen" },
    { icon: <FaPhone />, name: "Phone" },
    { icon: <FaPlane />, name: "Plane" },
    { icon: <FaRocket />, name: "Rocket" },
    { icon: <FaShoppingCart />, name: "Shopping Cart" },
    { icon: <FaSnowflake />, name: "Snowflake" },
    { icon: <FaSun />, name: "Sun" },
    { icon: <FaTabletAlt />, name: "Tablet" },
    { icon: <FaTrophy />, name: "Trophy" },
    { icon: <FaUmbrella />, name: "Umbrella" },
    { icon: <FaUser />, name: "User" },
    { icon: <FaVideo />, name: "Video" },
    { icon: <FaWrench />, name: "Wrench" },
    { icon: <FaYinYang />, name: "Yin Yang" },
  ];
  const disableStampList = [
    { icon: <FaStar />, name: "Star" },
    { icon: <FaHeart />, name: "Heart" },
    { icon: <FaSmile />, name: "Smile" },
    { icon: <FaCoffee />, name: "Coffee" },
    { icon: <FaAppleAlt />, name: "Apple" },
    { icon: <FaAnchor />, name: "Anchor" },
    { icon: <FaBell />, name: "Bell" },
    { icon: <FaBook />, name: "Book" },
    { icon: <FaBolt />, name: "Bolt" },
    { icon: <FaCar />, name: "Car" },
    { icon: <FaCheck />, name: "Check" },
    { icon: <FaCloud />, name: "Cloud" },
    { icon: <FaCogs />, name: "Cogs" },
    { icon: <FaCompass />, name: "Compass" },
    { icon: <FaDesktop />, name: "Desktop" },
    { icon: <FaDove />, name: "Dove" },
    { icon: <FaEye />, name: "Eye" },
    { icon: <FaFeather />, name: "Feather" },
    { icon: <FaFire />, name: "Fire" },
    { icon: <FaFlag />, name: "Flag" },
    { icon: <FaFlask />, name: "Flask" },
    { icon: <FaGift />, name: "Gift" },
    { icon: <FaGlobe />, name: "Globe" },
    { icon: <FaHammer />, name: "Hammer" },
    { icon: <FaHeadphones />, name: "Headphones" },
    { icon: <FaIceCream />, name: "Ice Cream" },
    { icon: <FaKey />, name: "Key" },
    { icon: <FaLeaf />, name: "Leaf" },
    { icon: <FaLightbulb />, name: "Lightbulb" },
    { icon: <FaLock />, name: "Lock" },
    { icon: <FaMagic />, name: "Magic" },
    { icon: <FaMobileAlt />, name: "Mobile" },
    { icon: <FaMoon />, name: "Moon" },
    { icon: <FaPaintBrush />, name: "Paint Brush" },
    { icon: <FaPaperPlane />, name: "Paper Plane" },
    { icon: <FaPen />, name: "Pen" },
    { icon: <FaPhone />, name: "Phone" },
    { icon: <FaPlane />, name: "Plane" },
    { icon: <FaRocket />, name: "Rocket" },
    { icon: <FaShoppingCart />, name: "Shopping Cart" },
    { icon: <FaSnowflake />, name: "Snowflake" },
    { icon: <FaSun />, name: "Sun" },
    { icon: <FaTabletAlt />, name: "Tablet" },
    { icon: <FaTrophy />, name: "Trophy" },
    { icon: <FaUmbrella />, name: "Umbrella" },

    { icon: <FaUser />, name: "User" },
    { icon: <FaVideo />, name: "Video" },
    { icon: <FaWrench />, name: "Wrench" },
    { icon: <FaYinYang />, name: "Yin Yang" },
  ];

  function getSelectedNumber() {
    let gridNumber = designformData.selectedNumber;

    if (gridNumber <= 5) {
      return `grid-cols-${gridNumber}`;
    }

    if (gridNumber < 15) {
      //console.log("gridNumber < 15", designformData.selectedNumber);
      return `grid-cols-${Math.ceil(gridNumber / 2)}`;
    }
    if (gridNumber > 20 && gridNumber <= 21) {
      // New condition for values between 21 and 28
      //console.log("Handling values 21 to 28", designformData.selectedNumber);
      return `grid-cols-7`; // Adjusted to divide by 4 to control column count
    }
    if (gridNumber > 21 && gridNumber < 25) {
      return `grid-cols-8`;
    }
    if (gridNumber >= 25 && gridNumber < 28) {
      return `grid-cols-9`;
    }

    if (designformData.selectedNumber % 3 === 0) {
      //console.log("designformData.selectedNumber % 3 === 0", designformData.selectedNumber);
      return `grid-cols-${Math.ceil(gridNumber / 3)}`;
    }

    return `grid-cols-${Math.ceil(gridNumber / 3)}`;
  }
  useEffect(() => {
    const get = async () => {
      try {
        setLoading(true);

        const response = await installationcardonform(id);
        if (response.status === 200 || response.status === 201) {
          // //console.log(response?.data)
          setinformationFormData(response?.data?.findcard);
          setdesignFormData(response?.data?.findcard);
          setCardType(response?.data?.findcard?.cardType);
          setStampName(response?.data?.findcard?.stampName);
          setalldata(response?.data?.customer);
          const data = await generateManifestWithBlobs(
            id,
            response?.data?.findcard
          );
          // updateManifestLink(response?.data?.customer?.cards[0]?.manifesturl,id);
          updateManifestLink(data, id);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        //// //console.log   .log(error, "these are error that show on this page")
      }
    };
    if (id) {
      get();
    }
  }, [id]);
  useEffect(() => {
    if ("serviceWorker" in navigator && id) {
      const scope = `/cardinstallation/${id}/`;
      navigator.serviceWorker
        .register(`/sw-dynamic1.js`, { scope })
        .then((registration) => {
          // //console.log(`Service Worker registered with scope: ${registration.scope}`);
        })
        .catch((error) => {
          // //console.log('Service Worker registration failed:', error);
        });
    }
  }, [id, pwadata]);
  const checkIfAppInstalled = () => {
    if (
      navigator.standalone ||
      window.matchMedia("(display-mode: standalone)").matches
    ) {
      setIsModalOpen(false);
      setIsAppInstalled(true);
    } else {
      setIsModalOpen(true);
      setIsAppInstalled(false);
    }
  };

  useEffect(() => {
    checkIfAppInstalled();

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      checkIfAppInstalled();
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [id, pwadata]);

  const updateManifestLink = async (manifestURL, id) => {
    try {
      // //console.log(`Fetching manifest from: ${manifestURL}`);
      const response = await fetch(manifestURL);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const manifestContent = await response.text();
      // //console.log(`Manifest content for ${id}:`, manifestContent);

      const blob = new Blob([manifestContent], {
        type: "application/manifest+json",
      });
      const blobURL = URL.createObjectURL(blob);
      setpwadata(blobURL);

      let existingManifest = document.querySelector(
        `link[rel="manifest"][id="manifest-${id}"]`
      );
      if (existingManifest) {
        existingManifest.href = blobURL;
      } else {
        const link = document.createElement("link");
        link.rel = "manifest";
        link.href = manifestURL;
        link.id = `manifest-${id}`; // Unique ID for each manifest
        document.head.appendChild(link);
      }

      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e; // Save the event for later
      });
    } catch (error) {
      console.error("Failed to update manifest link:", error);
    }
  };

  const generateManifestWithBlobs = async (id, data) => {
    let favicon192Blob;
    let favicon512Blob;

    if (data.icon) {
      favicon192Blob = await resizeImage(data.icon, 192);
      favicon512Blob = await resizeImage(data.icon, 512);
    } else {
      // Fallback to default icons
      favicon192Blob = await fetch("/favicon-192x192.png").then((res) =>
        res.blob()
      );
      favicon512Blob = await fetch("/favicon-512x512.png").then((res) =>
        res.blob()
      );
    }

    // Create Object URLs from the resized images
    const favicon192URL = URL.createObjectURL(favicon192Blob);
    const favicon512URL = URL.createObjectURL(favicon512Blob);

    // Create the manifest data with the icon URLs
    const manifestData = {
      short_name: `${data.stampName} ${id}`,
      name: `${data.stampName} ${id}`,
      icons: [
        {
          src: favicon192URL,
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: favicon512URL,
          sizes: "512x512",
          type: "image/png",
        },
      ],
      start_url: `${frontendUrl}/cardinstallation/${id}/`,
      display: "standalone",
      theme_color: "#ffffff",
      background_color: "#000000",
    };

    // Create a JSON blob for the manifest
    const blob = new Blob([JSON.stringify(manifestData)], {
      type: "application/json",
    });
    return URL.createObjectURL(blob);
  };
  // const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default mini-infobar
      e.preventDefault();
      // Save the event for triggering later
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          alert("App installed successfully!");
        } else {
          alert("User opted out from installing.");
        }
        setDeferredPrompt(null); // Clear the deferred prompt
      });
    } else {
      alert("PWA install prompt not available.");
    }
  };

  const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Checks for mobile devices (Android, iOS)
    return /android|iPad|iPhone|iPod/i.test(userAgent);
  };

  const askPermission = async () => {
    try {
      if (
        Notification.permission === "default" ||
        Notification.permission === "denied"
      ) {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
        } else {
          toast.success(
            "Please allow notification permission to receive alerts."
          );
        }
      } else if (Notification.permission === "granted") {
        sendNotificationAndToken();
      }
    } catch (error) {
      console.error("An error occurred while requesting permission:", error);
      toast.success("Please allow notification permission to receive alerts.");
    }
  };

  const sendNotificationAndToken = async () => {
    const isMobile = isMobileDevice();
    const tokenEnv = isMobile ? "mobile" : "desktop"; // Set tokenEnv based on device type

    const currentToken = await getToken(messaging, { vapidKey: Vapid_KEY });

    if (currentToken) {
      toast.success("Notification Enabled");

      await sendTokenToServer(currentToken, id, tokenEnv);
      setalldata({ ...alldata, tokenEnv });
    } else {
      toast.success("notification not enabled.");
    }

    onMessage(messaging, (payload) => {
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: informationformData.logo || "/assets/logo.svg", // Optional icon
      };

      if (alldata.tokenEnv === "desktop") {
        // Use new Notification API
        if (Notification.permission === "granted") {
          new Notification(notificationTitle, notificationOptions);
          CustomNotification(notificationTitle, notificationOptions);
        } else {
          // //console.log('Notification permission not granted.');
        }
      } else {
        // Use service worker to display notification
        navigator.serviceWorker.getRegistration().then((registration) => {
          if (registration) {
            registration.showNotification(
              notificationTitle,
              notificationOptions
            );
            CustomNotification(notificationTitle, notificationOptions);
          } else {
            // //console.log('Service worker registration not found.');
          }
        });
      }
    });
  };

  useEffect(() => {
    if (notificationPermission) {
      sendNotificationAndToken();
    }
  }, [notificationPermission]);

  useEffect(() => {
    onMessage(messaging, (payload) => {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.showNotification(payload.notification.title, {
            body: payload.notification.body || "server ki body",
            icon: informationformData.logo || "/assets/logo.svg",
          });
          CustomNotification(payload.notification.body || "server ki body", {
            body: payload.notification.body || "server ki body",
            icon: informationformData.logo || "/assets/logo.svg",
          });
        }
      });
      // // payload.notification.title

      if (alldata.tokenEnv === "desktop") {
        // Use new Notification API
        const notificationTitle =
          payload.notification.title || "hi vexion user";
        const notificationOptions = {
          body: payload.notification.body || "hi",
          icon: informationformData.logo || "/assets/logo.svg", // Optional icon
        };
        if (Notification.permission === "granted") {
          new Notification(notificationTitle, notificationOptions);
          CustomNotification(notificationTitle, notificationOptions);
        } else {
          // //console.log('Notification permission not granted.');
        }
      } else {
        if (payload) {
          const notificationTitle =
            payload.notification.title || "hi vexion user";
          const notificationOptions = {
            body: payload.notification.body || "hi",
            icon: informationformData.logo || "/assets/logo.svg", // Optional icon
          };
          CustomNotification(notificationTitle, notificationOptions);
        }
      }
    });
  }, []);

  if ("serviceWorker" in navigator) {
    //         // { scope }
    const scope = `/cardinstallation/${id}`;
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js", { scope })
      .then((registration) => {
        // //console.log('Message Service Worker registered with scope:', registration.scope);

        onMessage(messaging, (payload) => {
          if (registration) {
            registration.showNotification(payload.notification.title, {
              body: payload.notification.body || "server ki body",
              icon: informationformData.logo || "/assets/logo.svg",
            });
            CustomNotification(payload.notification.title, {
              body: payload.notification.body || "server ki body",
              icon: informationformData.logo || "/assets/logo.svg",
            });
          }
        });
      })
      .catch((err) => {
        // //console.log('Message Service Worker registration failed:', err);
      });
  }

  const CustomNotification = (title = "hi", options = { body: "abc" }) => {
    toast.custom((t) => (
      <div
        className={` ${
          t.visible ? "animate-enter" : "animate-leave"
        }  max-w-md w-full bg-black text-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-white `}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                style={{ objectFit: "contain" }}
                className="h-10 w-10 rounded-full "
                src={informationformData.logo || "/assets/logo.svg"}
                //   src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">{title}</p>
              <p className="mt-1 text-sm text-white">{options.body}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={(t) => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-none "
          >
            Close
          </button>
        </div>
      </div>
    ));
  };

  const Transactionamount = alldata?.cards[0]?.discount?.Transactionamount;

  const getMatchingTier = (amount) => {
    return designformData?.tiers
      ?.sort((a, b) => a.spendToAchieve - b.spendToAchieve)
      ?.findLast((tier) => amount >= tier.spendToAchieve);
  };
  const getNextTier = (amount) => {
    return designformData?.tiers?.find((tier) => amount < tier.spendToAchieve);
  };

  const matchedTier = getMatchingTier(Transactionamount);
  const nextTier = getNextTier(Transactionamount);

  // //console.log(matchedTier, "Current Matched Tier");
  // //console.log(nextTier, "Next Tier");

  function getFieldValueByName(customer, fieldName, data) {
    const Transactionamount = customer?.cards[0]?.discount?.Transactionamount;
    const getNextTier = (amount) => {
      return data?.tiers?.find((tier) => amount < tier.spendToAchieve);
    };

    const nextTier = getNextTier(Transactionamount);

    switch (fieldName) {
      case "First Name":
        return customer?.first_name || "N/A";
      case "Last Name":
        return customer?.last_name || "N/A";
      case "Email":
        return customer?.email || "N/A";
      case "Phone":
        return customer.phone;
      case "Date of Birth":
        return new Date(customer?.date_of_birth)?.toLocaleDateString() || "N/A";
      case "Available Reward":
        return customer?.cards[0]?.rewards || "0";
      case "Reward":
        return customer?.cards[0]?.rewards || "0";
      case "Summary stamps count":
        return (
          `${customer?.cards[0]?.consumedStamps}/${
            customer?.cards[0]?.remainingStamps +
            customer?.cards[0]?.consumedStamps
          }` || "N/A"
        );
      case "Stamps until the reward":
        return ` ${customer.cards[0]?.remainingStamps} Stamps` || "0";
      case "Expiration Date":
        return (
          ` ${new Date(
            data?.cardExpirationFixedTermDate
          )?.toLocaleDateString()}` || "--------"
        );

      case "Spend to rich next level":
        return `${nextTier?.spendToAchieve - Transactionamount}` || "0";
      case "Discount status":
        return (
          ` ${customer?.cards[0]?.discount?.discountstatus}` ||
          `${data?.tiers[0]?.tierName}`
        );
      case "Discount percentage":
        return (
          `${
            customer?.cards[0]?.discount?.discountlevel ||
            customer?.tiers[0]?.percentage
          }%` || `${data?.tiers[0]?.percentage}%`
        );
      case "Reward for the first visit":
        return `${customer?.rewardForTheFirstVisit}`;
      default:
        return "N/A";
    }
  }

  return (
    <>
      <div className="flex justify-center w-full items-center">
        <button
          style={{ userSelect: "none" }}
          onClick={askPermission}
          className=" cursor-pointer flex justify-center  gap-2 my-2"
        >
          <IoIosNotificationsOutline className="mt-1 font-bold text-[18px]" />
          <p className="text-[18px] font-bold text-center">
            Enable Notification
          </p>
        </button>
      </div>
      {alldata && (
        <div className="min-h-screen mt-4 w-[19rem] m-auto items-center justify-center">
          {!details ? (
            <>
              <div className="flex jsutify-content-center mx-1 rounded-lg ">
                {
                  <div
                    className="hide-scrollbar h-[430px]  overflow-y-auto w-full px-2 mx-1 rounded-lg shadow-lg border"
                    style={{
                      backgroundColor: designformData?.bgColor,
                      color: designformData?.textColor,
                    }}
                  >
                    <div className="flex items-start justify-between text-sm  ">
                      <h2 className="text-[.8rem]  font-semibold py-3 pl-2">
                        {designformData?.logo ? (
                          <img
                            src={
                              designformData?.logo instanceof File ||
                              designformData?.logo instanceof Blob
                                ? URL.createObjectURL(designformData.logo)
                                : designformData?.logo
                            }
                            alt={"something"}
                            className="w-[113px] h-[36px] my-1  object-cover object-center"
                          />
                        ) : (
                          designformData?.stampName
                        )}
                      </h2>
                      {routeMa[designformData?.cardType]?.keys?.heading2 && (
                        <div>
                          <h2 className="text-[.7rem]  font-semibold py-1 ">
                            {
                              routeMa[designformData?.cardType]?.keys?.heading2
                                ?.text1
                            }
                          </h2>
                          <h4 className="text-center text-[.7rem]">
                            {alldata.cards[0].rewards}
                          </h4>
                        </div>
                      )}
                    </div>
                    <div
                      id="cardImage"
                      style={{
                        backgroundColor: designformData?.stampbackground
                          ? ""
                          : (designformData?.cardType === "Stamp" &&
                              designformData?.bgUnderStampsColor) ||
                            designformData?.backgroundColorFortheCenterPart,
                        backgroundImage: designformData?.stampbackground
                          ? `url(${
                              designformData?.stampbackground instanceof File ||
                              designformData?.stampbackground instanceof Blob
                                ? URL.createObjectURL(
                                    designformData?.stampbackground
                                  )
                                : designformData?.stampbackground
                            })`
                          : "",
                        backgroundPosition: designformData?.stampbackground
                          ? "center"
                          : "",
                        backgroundSize: designformData?.stampbackground
                          ? "cover"
                          : "",
                        height: "110px",
                      }}
                      className=" p-1 flex  justify-center mb-3"
                    >
                      {designformData?.cardType === "Stamp" ? (
                        <div
                          className={
                            designformData.selectedNumber == 2
                              ? `flex   flex-wrap px-2  gap-1 w-full   strach justify-center`
                              : `grid ${getSelectedNumber()} w-full gap-y-1 gap-x-1 h-full  items-center justify-items-center px-2 `
                          }
                        >
                          <>
                            {Array.from({
                              length:
                                alldata?.cards[0]?.totalStamps >=
                                alldata?.cards[0]?.remainingStamps
                                  ? alldata?.cards[0]?.consumedStamps
                                  : alldata?.cards[0]?.totalStamps,
                            }).map((_, index) => (
                              <div
                                key={index}
                                style={{
                                  height:
                                    designformData?.selectedNumber <= 19
                                      ? Math.ceil(
                                          42 -
                                            Math.floor(
                                              designformData?.selectedNumber / 4
                                            ) *
                                              4
                                        )
                                      : "1.3rem",
                                  width:
                                    designformData?.selectedNumber <= 19
                                      ? Math.ceil(
                                          42 -
                                            Math.floor(
                                              designformData?.selectedNumber / 4
                                            ) *
                                              4
                                        )
                                      : "1.3rem",
                                  backgroundColor: designformData?.stampBgColor,
                                  borderColor: designformData?.outlineColor,
                                }}
                                className="border flex justify-center  items-center rounded-full overflow-hidden"
                              >
                                {designformData?.activeStampImg ? (
                                  <img
                                    src={
                                      designformData?.activeStampImg instanceof
                                        File ||
                                      designformData?.activeStampImg instanceof
                                        Blob
                                        ? URL.createObjectURL(
                                            designformData.activeStampImg
                                          )
                                        : designformData?.activeStampImg
                                    }
                                    alt="Selected"
                                    className="w-full h-full object-cover object-center"
                                  />
                                ) : (
                                  <span
                                    style={{
                                      color: designformData.activeStampColor,
                                      fontSize:
                                        24 -
                                        Math.floor(
                                          alldata?.cards[0]?.totalStamps / 4
                                        ) *
                                          2,
                                    }}
                                  >
                                    {
                                      activeStampList[
                                        designformData.activeStampIcon
                                      ]?.icon
                                    }
                                  </span>
                                )}
                              </div>
                            ))}
                          </>

                          {Array.from({
                            length:
                              alldata?.cards[0]?.totalStamps -
                              alldata?.cards[0]?.consumedStamps,
                          }).map((_, index) => (
                            <div
                              key={index}
                              style={{
                                height:
                                  designformData?.selectedNumber <= 19
                                    ? Math.ceil(
                                        42 -
                                          Math.floor(
                                            designformData?.selectedNumber / 4
                                          ) *
                                            4
                                      )
                                    : "1.3rem",
                                width:
                                  designformData?.selectedNumber <= 19
                                    ? Math.ceil(
                                        42 -
                                          Math.floor(
                                            designformData?.selectedNumber / 4
                                          ) *
                                            4
                                      )
                                    : "1.3rem",
                                backgroundColor: designformData?.stampBgColor,
                                borderColor: designformData?.outlineColor,
                              }}
                              className="border  flex justify-center  items-center rounded-full overflow-hidden"
                              aria-disabled={true}
                            >
                              {designformData.inactiveStampImg ? (
                                <img
                                  src={
                                    designformData?.inactiveStampImg instanceof
                                      File ||
                                    designformData?.inactiveStampImg instanceof
                                      Blob
                                      ? URL.createObjectURL(
                                          designformData.inactiveStampImg
                                        )
                                      : designformData?.inactiveStampImg
                                  }
                                  alt="Selected"
                                  className="w-full h-full object-cover object-center"
                                  // onLoad={(e) => URL.revokeObjectURL(routeMap["Stamp"].keys.activeStampImg)}
                                />
                              ) : (
                                <span
                                  style={{
                                    color: designformData?.inActiveStampColor,
                                    fontSize:
                                      24 -
                                      Math.floor(
                                        designformData?.selectedNumber / 4
                                      ) *
                                        2,
                                  }}
                                  className="text-gray-400"
                                >
                                  {
                                    disableStampList[
                                      designformData?.inactiveStampIcon
                                    ]?.icon
                                  }
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className=" py-6 text-xs">
                          <h2>{routeMa[designformData?.cardType]?.keys?.bg}</h2>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between px-2">
                      <div>
                        <p className="text-[9.6px] font-bold truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[108px]">
                          {designformData?.fields[0]?.fieldName}
                        </p>

                        {designformData?.cardType === "Stamp" &&
                        designformData?.fields[0]?.fieldName ===
                          "Stamps until the reward" ? (
                          <p className="text-[18.2px]">
                            {getFieldValueByName(
                              { ...alldata, ...designformData },
                              designformData?.fields[0]?.fieldName
                            )}
                          </p>
                        ) : (
                          <p className="text-[12.2px] longtext">
                            {getFieldValueByName(
                              { ...alldata, ...designformData },
                              designformData?.fields[0]?.fieldName
                            )}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-[9.6px] font-bold truncate overflow-hidden text-ellipsis  max-w-[108px]">
                          {designformData?.fields[1]?.fieldName}
                        </p>

                        {designformData?.cardType === "Stamp" &&
                        designformData?.fields[1]?.fieldName ===
                          "Available Reward" ? (
                          <p className="text-[18.2px] float-right">
                            {" "}
                            {"Rewards " +
                              getFieldValueByName(
                                { ...alldata, ...designformData },
                                designformData?.fields[1]?.fieldName
                              )}
                          </p>
                        ) : (
                          <p className="text-[12.2px] float-right text-[12.2px] longtext">
                            {" "}
                            {getFieldValueByName(
                              { ...alldata, ...designformData },
                              designformData?.fields[1]?.fieldName
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center items-end h-[140px] ">
                      {alldata?.customerbarcode ? (
                        <img
                          src={alldata?.customerbarcode}
                          className="w-24 my-2 mb-[-3rem]"
                          alt="PDF417 Barcode"
                        />
                      ) : (
                        <div className="flex flex-col justify-center items-center">
                          <QRCode value="1489276542312312" size={100} />
                        </div>
                      )}
                    </div>
                  </div>
                }
              </div>
            </>
          ) : (
            <DetailCardContent
              informationformData={informationformData}
              alldata={alldata}
              getFieldValueByName={getFieldValueByName}
            />
          )}
          <div className="flex flex-col items-center justify-center p-3 ">
            <div className="w-full max-w-md space-y-4">
              <button
                onClick={() => setDetail(!details)}
                className="group relative w-full overflow-hidden bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {details ? "Back" : "Details"}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
              </button>

              {!isAppInstalled && (
                <>
                  <button
                    onClick={handleClick}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 flex items-center justify-center"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Add to "Home Screen"
                  </button>

                  <button
                    onClick={toggleModal}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 flex items-center justify-center"
                  >
                    <HelpCircle className="mr-2 h-5 w-5" />
                    Card install guide
                  </button>
                </>
              )}
            </div>
          </div>
          <Modal
            open={isModalOpen}
            onClose={toggleModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <div className="w-full h-screen">
              <img
                src="/assets/arrow.png"
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  animation: "blink-animation 1s infinite",
                  height: "100px",
                  width: "100px",
                  zIndex: 9999,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 4,
                  maxHeight: "90vh",
                  overflowY: "auto",
                }}
              >
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    How to save a card to your phone
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "black", my: 2 }}
                    gutterBottom
                  >
                    In the top panel, tap the menu.
                  </Typography>
                  <img
                    src="/assets/1.png"
                    alt="First step"
                    className="w-full mb-2"
                  />
                  <Typography
                    variant="body1"
                    textAlign="left"
                    sx={{ color: "black" }}
                    gutterBottom
                  >
                    In the menu that appears, tap "Install app".
                  </Typography>
                  <img
                    src="/assets/2.png"
                    alt="Second step"
                    className="w-full mb-2"
                  />
                  <Typography
                    variant="body1"
                    textAlign="left"
                    sx={{ color: "black" }}
                  >
                    Follow the instructions.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, backgroundColor: "black", color: "white" }}
                  onClick={toggleModal}
                >
                  Close
                </Button>
              </Box>
            </div>
          </Modal>
          <style>
            {`
                    @keyframes blink-animation {
                        50% {
                            opacity: 0;
                        }
                    }
                `}
          </style>
        </div>
      )}
      <Loader loading={loading} />
    </>
  );
}

export default Cardinstallation;
