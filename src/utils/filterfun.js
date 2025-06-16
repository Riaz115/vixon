export const Loyaltyfilters = (allcustomer) => {
  const allpwa = allcustomer?.filter((item) => item?.cards[0]?.device === "pwa")
  const applewallet = allcustomer?.filter((item) => item?.cards[0]?.device === "apple wallet")
  const googlewallet = allcustomer?.filter((item) => item?.cards[0]?.device === "google wallet")
  return [
    {
      id: "1",
      "Andconditions": [
        {
          "type": "Loyalty",
          "label": `Pwa | ${allpwa?.length || 0}`,
          "title": "PWA",
          "condition": "pwa",
          "value": "pwa"

        }
      ],
      "Orconditions": []
    },
    {
      id: "2",
      "Andconditions": [
        {
          "type": "Loyalty",
          "label": `Apple wallet | ${applewallet?.length || 0}`,
          "title": "Apple wallet",
          "condition": "apple wallet",
          "value": "apple wallet"

        }
      ],
      "Orconditions": []

    },
    {
      id: "3",
      "Andconditions": [
        {
          "type": "Loyalty",
          "label": `Google wallet | ${googlewallet?.length || 0}`,
          "title": "Google wallet",
          "condition": "google wallet",
          "value": "google wallet"

        }
      ],
      "Orconditions": []

    }
  ]

}
export const filtersHealthy = (allcustomer) => {
  //console.log(allcustomer,"these are all customers data")
  const notinstalled = allcustomer?.filter((item) => item?.cards[0]?.status === "not-installed")
  const birthdayempty = allcustomer?.filter((item) => !item?.date_of_birth)

  return [
    {
      id: "4",
      "Andconditions": [
        {
          "type": "Healthy",
          "label": `Card status not installed | ${notinstalled?.length || 0}`,
          "title": "Card status",
          "condition": "not-installed",
          "value": "not-installed"

        }
      ],
      "Orconditions": []

    },
    {
      id: "5",
      "Andconditions": [
        {
          "type": "Healthy",
          "label": `Empty bithday | ${birthdayempty?.length || 0}`,
          "title": "Empty bithday",
          "condition": "Empty bithday",
          "value": "Empty"

        }
      ],
      "Orconditions": []

    }
  ]

}

export const filtersComunication = (allcustomer) => {
  const today = new Date()
  const currentMonth = today.getMonth() + 1 // Months are 0-indexed
  const currentDay = today.getDate()

  const todayBirthdays = allcustomer?.filter((item) => {
    if (!item?.date_of_birth) return false
    const birthDate = new Date(item.date_of_birth)
    return birthDate.getDate() === currentDay && birthDate.getMonth() + 1 === currentMonth
  })

  // Filter for this month's birthdays
  const monthBirthdays = allcustomer?.filter((item) => {
    if (!item?.date_of_birth) return false
    const birthDate = new Date(item.date_of_birth)
    return birthDate.getMonth() + 1 === currentMonth
  })

  return [
    {
      id: "6",
      "Andconditions": [
        {
          type: "Comunication",
          label: `Birthday today | ${todayBirthdays?.length || 0}`,
          title: "Birthday today",
          condition: "today",
          value: "today"
        }
      ],
      "Orconditions": []
    },
    {
      id: "7",
      "Andconditions": [
        {
          type: "Comunication", // Corrected from "Healthy" to "Comunication"
          label: `Birthday in the next 30 days | ${monthBirthdays?.length || 0}`,
          title: "Birthday this month",
          condition: "month",
          value: "month"
        }
      ],
      "Orconditions": []
    }
  ]
}


// utils/filterfun.js

// utils/filterfun.js

export const changefilter = (allfilterdata = []) => {
  return allfilterdata.map((filterDoc) => ({
    id: filterDoc._id,
    filterName: filterDoc.filterName || "Untitled Filter",
    Andconditions: filterDoc.Andconditions?.map((cond) => ({
      type: cond.type,
      label: generateConditionLabel(cond),
      condition: cond.condition,
      value: cond.value
    })),
    Orconditions: filterDoc.Orconditions?.map((cond) => ({
      type: cond.type,
      label: generateConditionLabel(cond),
      condition: cond.condition,
      value: cond.value
    }))
  }))
}

// Helper function to generate labels based on condition type
const generateConditionLabel = (cond) => {
  let { type, condition, value } = cond
  let valueDisplay

  // Normalize type and condition for consistent comparison
  const normalizedType = (type || "").toLowerCase()
  const normalizedCondition = (condition || "").toLowerCase()

  switch (normalizedType) {
    case "customer birthday":
      switch (normalizedCondition) {
        case "equal":
          if (value && value.start) {
            valueDisplay = `on ${formatDate(value.start)}`
          } else {
            valueDisplay = "on an unspecified date"
          }
          break
        case "between":
          if (value && value.start && value.end) {
            valueDisplay = `between ${formatDate(value.start)} and ${formatDate(value.end)}`
          } else {
            valueDisplay = "between unspecified dates"
          }
          break
        case "currentmonth":
          valueDisplay = "in the current month"
          break
        case "today":
          valueDisplay = "today"
          break
        case "empty":
          valueDisplay = "is empty"
          break
        case "not_empty":
          valueDisplay = "is not empty"
          break
        default:
          valueDisplay = value ? value.toString() : ""
      }
      break

    // Add more cases here for other filter types if needed

    default:
      // For other types, handle if value is an object or a simple value
      if (typeof value === "object" && value !== null) {
        if (value.start && value.end) {
          valueDisplay = `from ${formatDate(value.start)} to ${formatDate(value.end)}`
        } else if (value.start) {
          valueDisplay = formatDate(value.start)
        } else {
          valueDisplay = JSON.stringify(value) // Fallback
        }
      } else {
        valueDisplay = value ? value.toString() : ""
      }
  }

  // Capitalize the first letter of type and condition for better readability
  const capitalizedType = normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1)

  // Construct the final label
  return `${capitalizedType}  ${valueDisplay}`.trim()
}


// Utility to format date strings
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  if (isNaN(date)) return ""
  const options = { year: "numeric", month: "short", day: "numeric" }
  return date.toLocaleDateString(undefined, options) // e.g., "Jan 13, 2025"
}


/// utils/filterfun.js
export const filterCustomers = (filters, customers, allstamp) => {
  if (!filters || filters.length === 0) return customers

  // Create a stampName => [cardIds] map if you need it for "card_name"
  // Only do it if allstamp is an array
  const stampNameToCardIdsMap = {}
  if (Array.isArray(allstamp)) {
    allstamp.forEach((stamp) => {
      const stampLower = (stamp?.stampName || "").toLowerCase()
      if (!stampNameToCardIdsMap[stampLower]) {
        stampNameToCardIdsMap[stampLower] = []
      }
      stampNameToCardIdsMap[stampLower].push(stamp._id)
    })
  }

  return customers.filter((customer) => {
    // For each saved filter (with AND/OR groups)
    return filters.every((filter) => {
      const { Andconditions = [], Orconditions = [] } = filter

      // 1) Evaluate ALL "AND" conditions
      const andMatch = Andconditions.every((cond) =>
        checkCondition(cond, customer, stampNameToCardIdsMap)
      )

      // 2) Evaluate ANY "OR" conditions
      const orMatch =
        Orconditions.length > 0
          ? Orconditions.some((cond) => checkCondition(cond, customer, stampNameToCardIdsMap))
          : true // If no OR, treat as automatically true

      return andMatch && orMatch
    })
  })
}


// --------------------------------------
// Dispatch to the appropriate handler
// --------------------------------------
function checkCondition(cond, customer, stampMap) {
  // cond.type: e.g. "Registration date"
  // cond.condition: e.g. "week"
  const filterType = (cond.type || "").toLowerCase()
  const conditionKey = (cond.condition || "").toLowerCase()
  const value = cond.value // Could be string/number/object/array

  switch (filterType) {
    case "card balance":
      return handleCardBalance(conditionKey, value, customer)
    case "device type":
      return handleDeviceType(conditionKey, value, customer)
    case "card name":
      return handleCardName(conditionKey, value, customer, stampMap)
    case "registration date":
      return handleRegistrationDate(conditionKey, value, customer)
    case "email":
      return handleEmail(conditionKey, value, customer)
    case "gender":
      return handleGender(conditionKey, value, customer)
    case "phone":
      return handlePhone(conditionKey, value, customer)
    case "customer birthday":
      return handleCustomerBirthday(conditionKey, value, customer)

    // Your custom filters below:
    case "loyalty":
      return handleLoyalty(cond, customer)
    case "healthy":
      return handleHealthy(cond, customer)
    case "comunication":
      return handleCommunication(cond, customer)

    default:
      // Unknown type => either return false or true
      return true
  }
}

// ------------------ 1) Card Balance ------------------
function handleCardBalance(conditionKey, value, customer) {
  const compareValue = parseFloat(value)
  if (isNaN(compareValue)) return false

  // Suppose each customer has an array of cards with "balance"
  const balances = (customer.cards || []).map((c) => parseFloat(c.balance) || 0)

  return balances.some((bal) => {
    switch (conditionKey) {
      case "greater":
        return bal > compareValue
      case "greater_equal":
        return bal >= compareValue
      case "less":
        return bal < compareValue
      case "less_equal":
        return bal <= compareValue
      case "equal":
        return bal === compareValue
      case "not_equal":
        return bal !== compareValue
      default:
        return false
    }
  })
}

// ------------------ 2) Device Type ------------------
function handleDeviceType(conditionKey, valueArray, customer) {
  if (conditionKey !== "includes") return false
  if (!Array.isArray(valueArray)) return false

  // Check if ANY of the customer's cards has a device matching one of the chosen types
  const devices = (customer.cards || []).map((c) => (c.device || "").toLowerCase())
  return devices.some((devLower) =>
    valueArray.some((opt) => devLower.includes(opt.toLowerCase()))
  )
}

// ------------------ 3) Card Name ------------------
function handleCardName(conditionKey, value, customer, stampMap) {
  if (conditionKey === "includes") {
    // cond.value is an array of stamp names
    const allMatchingCardIds = (value || [])
      .map((name) => stampMap[name.toLowerCase()] || [])
      .flat()

    return (customer.cards || []).some((card) =>
      allMatchingCardIds.includes(card.cardId)
    )
  }
  if (conditionKey === "empty") {
    return !customer.cards || customer.cards.length === 0
  }
  if (conditionKey === "not_empty") {
    return customer.cards && customer.cards.length > 0
  }
  return false
}

// ------------------ 4) Registration Date ------------------
function handleRegistrationDate(conditionKey, val, customer) {
  // Suppose `customer.createdAt` is the registration date
  if (!customer.createdAt) return false
  const cDate = new Date(customer.createdAt)
  if (isNaN(cDate)) return false

  switch (conditionKey) {
    // e.g. "week" means "In last 7 days"
    case "week": {
      const now = new Date()
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(now.getDate() - 7)
      return cDate >= sevenDaysAgo && cDate <= now
    }
    case "between": {
      if (!val?.start || !val?.end) return false
      const start = new Date(val.start)
      const end = new Date(val.end)
      return cDate >= start && cDate <= end
    }
    case "greater": {
      const valDate = new Date(val)
      return cDate > valDate
    }
    case "greater_equal": {
      const valDate = new Date(val)
      return cDate >= valDate
    }
    case "less": {
      const valDate = new Date(val)
      return cDate < valDate
    }
    case "less_equal": {
      const valDate = new Date(val)
      return cDate <= valDate
    }
    case "equal": {
      const valDate = new Date(val)
      return (
        cDate.getFullYear() === valDate.getFullYear() &&
        cDate.getMonth() === valDate.getMonth() &&
        cDate.getDate() === valDate.getDate()
      )
    }
    case "not_equal": {
      const valDate = new Date(val)
      return (
        cDate.getFullYear() !== valDate.getFullYear() ||
        cDate.getMonth() !== valDate.getMonth() ||
        cDate.getDate() !== valDate.getDate()
      )
    }
    default:
      return false
  }
}

// ------------------ 5) Email ------------------
function handleEmail(conditionKey, value, customer) {
  const emailVal = (customer.email || "").trim().toLowerCase()

  switch (conditionKey) {
    case "empty":
      return emailVal === ""
    case "not_empty":
      return emailVal !== ""
    case "includes":
      if (!value) return false
      return emailVal.includes(String(value).toLowerCase())
    default:
      return false
  }
}

// ------------------ 6) Gender ------------------
function handleGender(conditionKey, value, customer) {
  const genderVal = (customer.gender || "").toLowerCase()
  if (conditionKey === "includes") {
    // value should be an array, e.g. ["Male", "Female", ...]
    if (!Array.isArray(value)) return false
    const lowerVals = value.map((v) => v.toLowerCase())
    return lowerVals.includes(genderVal)
  }
  return false
}

// ------------------ 7) Phone ------------------
function handlePhone(conditionKey, value, customer) {
  const phoneVal = (customer.phone || "").trim().toLowerCase()

  switch (conditionKey) {
    case "empty":
      return phoneVal === ""
    case "not_empty":
      return phoneVal !== ""
    case "includes":
      if (!value) return false
      return phoneVal.includes(String(value).toLowerCase())
    default:
      return false
  }
}

// ------------------ 8) Customer Birthday ------------------

function parseDbDateOfBirth(bdayString) {
  // bdayString might be "2025-01-13T00:00:00.000Z"
  // just take the first 10 chars "2025-01-13"
  if (!bdayString) return ""
  return bdayString.slice(0, 10) // => "2025-01-13"
}

function handleCustomerBirthday(conditionKey, val, customer) {
  // Suppose customer's birthday is in customer.date_of_birth
  const bdayVal = customer.date_of_birth ? new Date(customer.date_of_birth) : null
  // If the condition expects a valid date, but we have none => false
  if (!bdayVal && ["empty", "not_empty"].indexOf(conditionKey) === -1) {
    return false
  }

  const dbBday = parseDbDateOfBirth(customer.date_of_birth) // "2025-01-13"
  if (!dbBday && (conditionKey !== "empty" && conditionKey !== "not_empty")) {
    return false
  }

  switch (conditionKey) {
    case "empty":
      return !bdayVal
    case "not_empty":
      return !!bdayVal
    case "equal": {
      const filterDate = val?.start || ""
      return dbBday === filterDate
    }
    case "day": {
      const dayNum = parseInt(val, 10)
      return bdayVal.getDate() === dayNum
    }
    case "month": {
      const monthNum = parseInt(val, 10)
      return bdayVal.getMonth() + 1 === monthNum
    }
    case "year": {
      const yearNum = parseInt(val, 10)
      return bdayVal.getFullYear() === yearNum
    }
    case "today": {
      const now = new Date()
      return (
        bdayVal.getDate() === now.getDate() &&
        bdayVal.getMonth() === now.getMonth()
      )
    }
    case "currentmonth": {
      const now = new Date()
      return bdayVal.getMonth() === now.getMonth()
    }
    default:
      return false
  }
}

// ------------------ Loyalty / Healthy / Communication (custom) ------------------
function handleLoyalty(cond, customer) {
  // cond.condition might be "pwa", "apple wallet", "google wallet", etc.
  return (customer.cards || []).some(
    (card) => card.device?.toLowerCase() === cond.condition?.toLowerCase()
  )
}

function handleHealthy(cond, customer) {
  const cKey = (cond.condition || "").toLowerCase()
  if (cKey === "not-installed") {
    return (customer.cards || []).some(
      (card) => card.status?.toLowerCase() === "not-installed"
    )
  }
  if (cKey === "empty bithday") {
    return !customer.date_of_birth
  }
  return false
}

function handleCommunication(cond, customer) {
  const cKey = (cond.condition || "").toLowerCase()
  if (!customer.date_of_birth) return false

  const now = new Date()
  const bday = new Date(customer.date_of_birth)
  const currentMonth = now.getMonth() + 1
  const currentDay = now.getDate()
  const bdayMonth = bday.getMonth() + 1
  const bdayDay = bday.getDate()

  if (cKey === "today") {
    return bdayDay === currentDay && bdayMonth === currentMonth
  }
  if (cKey === "month") {
    return bdayMonth === currentMonth
  }
  return false
}








