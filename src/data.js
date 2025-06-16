export const routeMa = {
    Stamp: {
        settings: "setting",
        design: "design",
        information: "information",
        keys: {
            heading1: "Stamp",
            heading2: "",
            heading3: {
                text1: "Stamps until the reward...",
                text2: "8 stamps",
            },
            heading4: {
                text1: "Available rewards",
                text2: "2 rewards",
            }
        },
    },
    Reward: {
        settings: "setting",
        design: "design",
        information: "information",
        keys: {
            heading1: "Reward",
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
    },
    Membership: {
        settings: "setting",
        design: "design",
        information: "information",
        keys: {
            heading1: "Membership",
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
    },
    Discount: {
        settings: "setting",
        design: "design",
        information: "information",
        keys: {
            heading1: "Discount",
            heading2: "Discount for the first v...",
            heading3: {
                text1: "Discounts percentage",
                text2: "1%",
            },
            heading4: {
                text1: "Discount status",
                text2: "Bronze",
            },
            bg: "",

        },
    },
    Coupon: {
        settings: "setting",
        design: "design",
        information: "information",
        keys: {
            heading1: "Coupon",
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
    },

    Gift: {
        settings: "setting",
        design: "design",
        information: "information",
        keys: {
            heading1: "Gift",
            heading2: {
                text1: "Gift balance",
                text2: "$1,800",
            },
            heading3: {
                text1: "First name",
                text2: null,
            },
            heading4: "",
            bg: "",
            stamps: 8,
            reward: 2,

        },
    },
};

export const informationdata = {
    cardDescription: "Popis karty",
    howToEarnStamp: "How to earn stamp",
    companyName: "Meno firmy",
    // rewardDetails: "Reward Details",
    earnedRewardMessage: "Získali ste odmenu! 🎉",
    earnedStampMessage: "Skvele, už len {#} do odmeny! 🎉",
    multiRewards: "nothing to say",
    referralProgram: true,
    bonusMoment: "first_visit",
    stampsForReferrer: 10,
    stampsForReferrerSelected: 0,
    stampsForNewCustomer: 10,
    stampsForNewCustomerSelected: 0,
    activeLinks: [],
    feedBackLinks: [],
    termsOfUse: ``,
    termsOfUseSwitch: false,
    // linkToTheFullTermsAndConditions: null,
    issuerCompanyName: "",
    issuerEmail: "",
    issuerPhone: null,
    redeemRadio: true,
}

export const designdata = {
    active: 2,
    selectedNumber: 10,
    activeStampIcon: 0,
    inactiveStampIcon: 0,
    textColor: "#1F1E1F",
    bgColor: "#FFFFFF",
    activeStampColor: "black",
    inActiveStampColor: "black",
    outlineColor: "#AAAAAA",
    stampBgColor: "#EAEAED",
    bgUnderStampsColor: "#F6F6F6",
    backgroundColorFortheCenterPart: "#F6F6F6",
    showNameOnTheCard: false,
    showPhotoOnTheCard: false,
    activeStampImg: null,
    inactiveStampImg: null,
    logo: null,
    stampbackground: null,
    icon: null,
    fields: [
        { fieldType: "First Name", fieldName: "First Name" },
        { fieldType: "Stamps until the reward", fieldName: "Stamps until the reward" },
    ],
    showLogoAtCardIssuingForm: true,
    showBackgroundColorOnCardIssuingForm: true,
}

export const settingdata = {
    cardExpirationFixedTermDate:"",
    cardExpirationFixedTermAfterIssuingDays: "1",
    cardExpirationFixedTermAfterIssuingYears: "days",
    selectedCollectedPayment: "no",
    selectedAutoRenewal: "no",
    selectedMembershipExpiration: "paid_period",
    language: "Spanish es",
    dateFormat: "DD/MM/YYYY",
    thousandSeperator: "space",
    decimalSeparator: "comma",
    modaldata: [],
    cardIssuingForm: [
        {
            fieldType: "first_name",
            fieldName: "First Name",
            required: true,
            unique: false,
        },
        {
            fieldType: "last_name",
            fieldName: "Last Name",
            required: false,
            unique: false,
        },
        // { fieldType: "url", fieldName: "URL", required: false, unique: false },
        { fieldType: "email", fieldName: "Email", required: true, unique: true },
        {
            fieldType: "phone",
            fieldName: "Phone No",
            required: false,
            unique: false,
        },
        { fieldType: "date_of_birth", fieldName: "Date of Birth", required: false, unique: false },
    ],
    tiers: [
        { tierName: 'Bronzový', spendToAchieve: 0, percentage: 0 },
    
    ],
    reward: [
        {
            levelName: "10€ zľava na ďalší nákup",
            pointsEarned: 25,
            pointsType: "Order (€ OFF)",
            pointsValue: 10,
        },

    ],

    utm: "",
    phoneMask: "Luxembourg",
    privacyPolicySwitch: true,
    privacyPolicyText:
        "I agree that my personal data can be used and provided for direct marketing purposes.",
    concentToProcessingOfPrivateDateSwitch: true,
    googlewallet: true,
    cardIssuedLimit: "0",
    numberOfStampsWhenIssuingCard: 0,
    analyticsSwitch: false,
    purchaseAmountIsRequiredSwitch: false,
    analytics: "",
    selectedUpperRadio: "unlimited",
    UpperRadio: "spend",
    selectedBottomRadio: "unlimited",
    redemptionRulesRadio: "multiple",
    earnPointsWhenRedeemReward: false,
    trackVisitWhenRedeemCard: true,
    linkedCardTemplate: "without",
    rewardForTheFirstVisit: "Prvá káva zdarma ",
    isAnalytics: true,
    spend: {
        pointsGained: 10,
        moneySpent: 10,
    },
    visit: {
        pointsPerVisit: 10,
        givePointAfterEveryVisit: true
    }
}
