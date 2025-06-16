export const languagesList = [
  { name: "English (International) en", value: "en" },
  { name: "Spanish es", value: "es" },
];

export const dateFormats = [
  { name: "DD/MM/YYYY" },
  { name: "MM/DD/YYYY" },
  { name: "DD.MM.YYYY" },
  { name: "YYYY.MM.DD" },
  { name: "DD-MM-YYYY" },
  { name: "YYYY-MM-DD" },
];

export const seperators = [
  { name: "space" },
  { name: "dot" },
  { name: "comma" },
];

export const fieldTypes = [
  { name: "text" },
  { name: "first_name" },
  { name: "last_name" },
  { name: "url" },
  { name: "email" },
  { name: "date" },
  { name: "phone" },
  { name: "number" },
  { name: "photo" },
  { name: "date_of_birth" },
];

export const daysList = Array.from({ length: 30 }, (_, i) => ({
  name: (i + 1).toString(),
}));
export const timeList = [
  { name: "days" },
  { name: "months" },
  { name: "years" },
];

export const fieldName = [
  { name: "First Name", value: "first_name" },
  { name: "Last Name", value: "last_name" },
  { name: "Email", value: "email" },
  { name: "Phone", value: "phone" },
  { name: "Date of Birth", value: "date" },
  { name: "Unused Field", value: "text" },
  { name: "Available Reward", value: "text" },
  { name: "Summary stamps count", value: "text" },
  { name: "Stamps until the reward", value: "text" },
];

export const fieldNames = {
  Stamp: [
    { name: "First Name", value: "first_name" },
    { name: "Stamps until the reward", value: "text" },
    { name: "Last Name", value: "last_name" },
    { name: "Email", value: "email" },
    { name: "Phone", value: "phone" },
    { name: "Date of Birth", value: "date" },
    { name: "Unused Field", value: "text" },
    { name: "Available Reward", value: "text" },
    { name: "Summary stamps count", value: "text" },
  ],
  Reward: [
    { name: "First Name", value: "first_name" },
    { name: "Reward", value: "rewards" },
    { name: "Last Name", value: "last_name" },
    { name: "Email", value: "email" },
    { name: "Phone", value: "phone" },
    { name: "Date of Birth", value: "date_of_birth" },
    { name: "Unused Field", value: "text" },
    { name: "Expiration Date", value: "expirationdate" },
    { name: "Till the next reward", value: "nextreward" },
  ],
  Discount: [
    { name: "First Name", value: "first_name" },
    { name: "Discount percentage", value: "percentage" },
    { name: "Last Name", value: "last_name" },
    { name: "Email", value: "email" },
    { name: "Date of Birth", value: "date_of_birth" },
    { name: "Phone", value: "phone" },
    { name: "Unused Field", value: "text" },
    { name: "Discount status", value: "status" },
    { name: "Spend to rich next level", value: "nextlevel" },
  ],
  Coupon: [
    { name: "First Name", value: "first_name" },
    { name: "Reward for the first visit", value: "visit" },
    { name: "Last Name", value: "last_name" },
    { name: "Email", value: "email" },
    { name: "Phone", value: "phone" },
    { name: "Date of Birth", value: "date_of_birth" },
    { name: "Unused Field", value: "text" },
  ],
};

export const fieldType = [
  { name: "first_name", value: "first_name" },
  { name: "last_name", value: "last_name" },
  { name: "last_name", value: "email" },
  { name: "phone", value: "phone" },
  { name: "date", value: "date" },
  { name: "text", value: "text" },
  { name: "text", value: "text" },
  { name: "text", value: "text" },
  { name: "text", value: "text" },
];

export const activeLink_list = [
  {
    name: "Email",
  },
  {
    name: "Facebook",
  },
  {
    name: "Weapon",
  },
  {
    name: "LGBTQ",
  },
  {
    name: "LGBTQIA+",
  },
];

export const activeLinks = [
  {
    name: "url",
  },
  {
    name: "phone",
  },
  {
    name: "email",
  },
  {
    name: "address",
  },
];

export const rewardType = [
  { name: "Order (€ OFF)" },
  { name: "Order (% OFF)" },
  { name: "Custom" },
];

export const services = [
  // { name: "2gis" },
  // { name: "Booksy" },
  // { name: "Booking" },
  { name: "Google" },
  // { name: "Flamp" },
  // { name: "FourSquare" },
  { name: "Facebook" },
  { name: "Custom" },
  // { name: "yandex" },
  // { name: "Yell" },
  // { name: "YellowPages" },
  // { name: "Yelp" },
  // { name: "Zoon" },
];

export const linkedCardTemplateList = [
  { name: "Without a Linked Template" },
  { name: "Membership card № 1" },
  { name: "Stamp card № 1" },
  { name: "Reward card № 1" },
  { name: "Stamp card № 2" },
  { name: "Stamp card № 3" },
];
