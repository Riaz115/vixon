// utils/filterDefinitions.js

export const FILTER_DEFINITIONS = [
  // -------------------------------------------------------------------------
  // 1. CARD BALANCE
  // -------------------------------------------------------------------------
  {
    key: "card_balance",
    label: "Card balance",
    type: "number",
    conditions: [
      { key: "greater", label: "Greater than", needsValue: true },
      { key: "greater_equal", label: "Greater than or equal to", needsValue: true },
      { key: "less", label: "Less than", needsValue: true },
      { key: "less_equal", label: "Less than or equal to", needsValue: true },
      { key: "equal", label: "Equal to", needsValue: true },
      { key: "not_equal", label: "Not equal to", needsValue: true },
    ],
  },

  // -------------------------------------------------------------------------
  // 2. DEVICE TYPE
  // -------------------------------------------------------------------------
  {
    key: "device_type",
    label: "Device type",
    type: "select",
    conditions: [
      {
        key: "includes",
        label: "Includes",
        needsMultipleValues: true,
        options: ["Apple Wallet", "Google Wallet", "PWA", "Unknown"],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 3. CARD NAME
  // (Dynamic options based on `cardNames` prop)
  // -------------------------------------------------------------------------
  {
    key: "card_name",
    label: "Card name",
    type: "text",
    conditions: [
      {
        key: "includes",
        label: "Includes",
        needsMultipleValues: true, // Options will be provided dynamically
      },
      {
        key: "empty",
        label: "Is Empty",
        needsValue: false, // Applies immediately
      },
      {
        key: "not_empty",
        label: "Is Not Empty",
        needsValue: false, // Applies immediately
      },
    ],
  },

  // -------------------------------------------------------------------------
  // 4. CARD STATUS
  // -------------------------------------------------------------------------
  // {
  //   key: "card_status",
  //   label: "Card status",
  //   type: "select",
  //   conditions: [
  //     {
  //       key: "equal",
  //       label: "Equal to",
  //       needsValue: true,
  //       options: ["Installed", "Not Installed"],
  //     },
  //   ],
  // },

  // -------------------------------------------------------------------------
  // 5. CURRENT NUMBER OF USES
  // -------------------------------------------------------------------------
  // {
  //   key: "current_uses",
  //   label: "Current number of uses",
  //   type: "number",
  //   conditions: [
  //     { key: "greater", label: "Greater than", needsValue: true },
  //     { key: "greater_equal", label: "Greater than or equal to", needsValue: true },
  //     { key: "less", label: "Less than", needsValue: true },
  //     { key: "less_equal", label: "Less than or equal to", needsValue: true },
  //     { key: "equal", label: "Equal to", needsValue: true },
  //     { key: "not_equal", label: "Not equal to", needsValue: true },
  //   ],
  // },

  // -------------------------------------------------------------------------
  // 6. REGISTRATION DATE
  // -------------------------------------------------------------------------
  {
    key: "registration_date",
    label: "Registration date",
    type: "date",
    conditions: [
      { key: "greater", label: "After", needsValue: true },
      { key: "greater_equal", label: "On or After", needsValue: true },
      { key: "less", label: "Before", needsValue: true },
      { key: "less_equal", label: "On or Before", needsValue: true },
      { key: "equal", label: "On", needsValue: true },
      { key: "not_equal", label: "Not On", needsValue: true },
      { key: "between", label: "Between", needsDateRange: true },
      { key: "week", label: "In Last 7 Days", needsValue: false },
    ],
  },

  // -------------------------------------------------------------------------
  // 7. EMAIL
  // -------------------------------------------------------------------------
  // {
  //   key: "email",
  //   label: "Email",
  //   type: "text",
  //   conditions: [
  //     { key: "empty", label: "Is Empty", needsValue: false }, // Applies immediately
  //     { key: "not_empty", label: "Is Not Empty", needsValue: false }, // Applies immediately
  //     { key: "includes", label: "Includes", needsValue: true },
  //   ],
  // },

  // -------------------------------------------------------------------------
  // 8. GENDER
  // -------------------------------------------------------------------------
  // {
  //   key: "gender",
  //   label: "Gender",
  //   type: "select",
  //   conditions: [
  //     {
  //       key: "includes",
  //       label: "Includes",
  //       needsMultipleValues: true,
  //       options: ["Male", "Female", "Other", "Prefer not to say"],
  //     },
  //   ],
  // },

  // -------------------------------------------------------------------------
  // 9. NAME
  // -------------------------------------------------------------------------
  // {
  //   key: "name",
  //   label: "Name",
  //   type: "text",
  //   conditions: [
  //     { key: "empty", label: "Is Empty", needsValue: false }, // Applies immediately
  //     { key: "not_empty", label: "Is Not Empty", needsValue: false }, // Applies immediately
  //     { key: "includes", label: "Includes", needsValue: true },
  //   ],
  // },

  // -------------------------------------------------------------------------
  // 10. PHONE
  // -------------------------------------------------------------------------
  // {
  //   key: "phone",
  //   label: "Phone",
  //   type: "text",
  //   conditions: [
  //     { key: "empty", label: "Is Empty", needsValue: false }, // Applies immediately
  //     { key: "not_empty", label: "Is Not Empty", needsValue: false }, // Applies immediately
  //     { key: "includes", label: "Includes", needsValue: true },
  //   ],
  // },

  // -------------------------------------------------------------------------
  // 11. UNUSED REWARDS
  // -------------------------------------------------------------------------
  // {
  //   key: "unused_rewards",
  //   label: "Unused rewards",
  //   type: "number",
  //   conditions: [
  //     { key: "greater", label: "Greater than", needsValue: true },
  //     { key: "greater_equal", label: "Greater than or equal to", needsValue: true },
  //     { key: "less", label: "Less than", needsValue: true },
  //     { key: "less_equal", label: "Less than or equal to", needsValue: true },
  //     { key: "equal", label: "Equal to", needsValue: true },
  //     { key: "not_equal", label: "Not equal to", needsValue: true },
  //   ],
  // },

  // -------------------------------------------------------------------------
  // 12. NUMBER OF STAMPS
  // -------------------------------------------------------------------------
  // {
  //   key: "number_of_stamps",
  //   label: "Number of stamps",
  //   type: "number",
  //   conditions: [
  //     { key: "greater", label: "Greater than", needsValue: true },
  //     { key: "greater_equal", label: "Greater than or equal to", needsValue: true },
  //     { key: "less", label: "Less than", needsValue: true },
  //     { key: "less_equal", label: "Less than or equal to", needsValue: true },
  //     { key: "equal", label: "Equal to", needsValue: true },
  //     { key: "not_equal", label: "Not equal to", needsValue: true },
  //   ],
  // },

  // -------------------------------------------------------------------------
  // 13. CUSTOMER BIRTHDAY
  // -------------------------------------------------------------------------
  {
    key: "customer_birthday",
    label: "Customer birthday",
    type: "date",
    conditions: [
      { key: "empty", label: "Is Empty", needsValue: false }, // Applies immediately
      { key: "not_empty", label: "Is Not Empty", needsValue: false }, // Applies immediately
      { key: "equal", label: "On", needsValue: true },
      // { key: "day", label: "Day (Numeric)", needsValue: true }, // user picks day-of-month (1-31)
      // { key: "month", label: "Month (Numeric)", needsValue: true }, // user picks month (1-12)
      // { key: "year", label: "Year (Numeric)", needsValue: true },
      { key: "today", label: "Today", needsValue: false }, // Applies immediately
      { key: "currentmonth", label: "This Month", needsValue: false }, // Applies immediately
    ],
  },

  // -------------------------------------------------------------------------
  // 14. SERIAL NUMBER
  // -------------------------------------------------------------------------
  // {
  //   key: "serial_number",
  //   label: "Card serial number",
  //   type: "text",
  //   conditions: [
  //     {
  //       key: "includes",
  //       label: "Includes",
  //       needsValue: true,
  //     },
  //     { key: "empty", label: "Is Empty", needsValue: false }, // Applies immediately
  //     { key: "not_empty", label: "Is Not Empty", needsValue: false }, // Applies immediately
  //   ],
  // },

  // -------------------------------------------------------------------------
  // 15. STATUS
  // -------------------------------------------------------------------------
  // {
  //   key: "status",
  //   label: "Status",
  //   type: "select",
  //   conditions: [
  //     {
  //       key: "equal",
  //       label: "Equal to",
  //       needsValue: true,
  //       options: ["Installed", "Not Installed"],
  //     },
  //   ],
  // },
];
