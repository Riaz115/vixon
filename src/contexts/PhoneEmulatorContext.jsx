// src/Contexts/PhoneEmulatorContext.js
import React, { createContext, useState } from 'react';

export const PhoneEmulatorContext = createContext();


const keys = {
    Stamp: {
      // heading1: "Stamps Untill the rewards",
      heading1: "Stamp card № 3",
      heading2: "",
      heading3: {
        text1: "Stamps until the reward...",
        text2: "8 stamps",
      },
      heading4: {
        text1: "Available rewards",
        text2: "2 rewards",
      },
    },
    Reward: {
      heading1: "Reward card № 2",
      heading2: {
        text1: "Balance",
        text2: "500",
      },
      heading3: {
        text1: "Reward",
        text2: "No data",
      },
      heading4: {
        text1: "Stamps until the reward",
        text2: "500",
      },
      bg: "",
    },
    Membership: {
      heading1: "Membership card № 2...",
      heading2: {
        text1: "Expiration",
        text2: "00.00.0000",
      },
      heading3: {
        text1: "Membership tier",
        text2: "Gold",
      },
      heading4: {
        text1: "Available limits",
        text2: "8 Visits",
      },
      bg: "",
    },
    Discount: {
      heading1: "Discount card № 2",
      heading2: "",
      heading3: {
        text1: "Discounts percentage",
        text2: "1%",
      },
      heading4: {
        text1: "Discount status",
        text2: "Bronze",
      },
      bg: "Background image",
    },
    Gift: {
      heading1: "Gift card № 1",
      heading2: {
        text1: "Gift balance",
        text2: "$1,800",
      },
      heading3: {
        text1: "First name",
        text2: "No data",
      },
      heading4: "",
      bg: "Background image",
    },
    Coupon: {
      heading1: "Coupon № 2",
      heading2: {
        text1: "Expiration",
        text2: "00.00.0000",
      },
      heading3: {
        text1: "Discount for the first visit",
        text2: "10",
      },
      heading4: "",
    },
    bg: "Background image",
  };


export const PhoneEmulatorProvider = ({ children }) => {
    const [phoneData, setPhoneData] = useState(null); // Default to Stamp
    const [globalCard, setglobalCard] = useState("Stamp"); // Default to Stamp
    const [onlyPhone, setOnlyPhone] = useState(false); // Default to Stamp
    const [emulatorContent, setEmulatorContent] = useState(null); // State to hold the JSX content
    const [navSteper, setNavsteper] = useState({
        information: false,
        design: false,
        setting: false,
        preview: false,
        qrCode:false

      })
   
    const updatePhoneData = (cardtype,cardKeys, jsx) => {
      //// //console.log   .log("set card keys" , cardKeys)
      setglobalCard(cardtype)
      setPhoneData(cardKeys);
      setEmulatorContent(jsx);
    };
    const updatePhoneType = (cardKeys, jsx) => {
     
    };

    return (
        <PhoneEmulatorContext.Provider value={{globalCard,  onlyPhone ,  updatePhoneType , phoneData, updatePhoneData , setEmulatorContent , emulatorContent,setglobalCard , navSteper , setNavsteper}}>
            {children}
        </PhoneEmulatorContext.Provider>
    );
};
