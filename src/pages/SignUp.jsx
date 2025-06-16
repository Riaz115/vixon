import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import PhoneInput from "react-phone-number-input";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getsingleStamp, createcustomer } from "../api/createstamp";
import { Loader } from "../Components/Loader/loader";
import toast from "react-hot-toast";
import { HiChevronDown } from "react-icons/hi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase";
import { serverUrl, Vapid_KEY } from "../config";
import axios from "axios";

const SignUp = () => {
  // --- State Variables ---
  const [state, setState] = useState({});
  const [formdata, setFormData] = useState([]);
  const [stemp, setStemp] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [ipnumber, setipnumber] = useState();
  const [countrydata, setcountrydata] = useState();
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // --- Fetch Country Info based on IP ---
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`${serverUrl}/get-country-info`, {
          headers: { "x-forwarded-for": ipnumber }
        });
        if (response.data.country) {
          setcountrydata(response.data.country);
        }
      } catch (error) {
        console.error("Error fetching country info:", error);
      }
    };
    if (ipnumber) {
      fetchCountry();
    }
  }, [ipnumber]);

  useEffect(() => {
    async function getUserIP() {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setipnumber(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    }

    getUserIP();
  }, []);

  // --- Fetch Stamp Data ---
  useEffect(() => {
    const fetchStamp = async () => {
      try {
        const response = await getsingleStamp(id);
        if (response?.status === 200) {
          setFormData(response?.data?.data?.cardIssuingForm);
          setStemp(response?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching stamp data:", error);
      }
    };
    if (id) {
      fetchStamp();
    }
  }, [id]);

  // --- Prefill Form Based on URL Parameters ---
  useEffect(() => {
    if (formdata.length > 0) {
      const initialState = {};

      formdata.forEach(field => {
        const paramValue = searchParams.get(field.fieldType);

        if (paramValue) {
          switch (field.fieldType) {
            case "date_of_birth":
            case "date":
              // Ensure the date is in the correct format
              initialState[field.fieldType] = dayjs(paramValue).format("YYYY-MM-DD");
              break;
            case "phone":
              initialState[field.fieldType] = paramValue;
              break;
            case "photo":
              // File inputs cannot be prefilled for security reasons
              break;
            default:
              initialState[field.fieldType] = paramValue;
          }
        }
      });

      setState(prevState => ({ ...prevState, ...initialState }));
    }
  }, [formdata, searchParams]);

  // --- Input Handling and Validation ---
  const handleStateChange = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
    validateInput(key, value);
  };

  const validateInput = (key, value) => {
    let error = "";
    switch (key) {
      case "first_name":
      case "last_name":
        if (!value) {
          error = `${key.replace("_", " ")} is required`;
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = `${key.replace("_", " ")} should only contain letters`;
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid";
        }
        break;
      case "phone":
        if (!value) {
          error = "Phone number is required";
        } else if (value.length < 10 || value.length > 15) {
          error = "Phone number should be between 10 and 15 digits";
        }
        break;
      case "termsOfUse":
        if (!value) {
          error = "You must accept the terms of use";
        }
        break;
      case "dataPolicy":
        if (!value) {
          error = "You must agree to the data policy";
        }
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [key]: error }));
  };

  // --- onSubmit and Notification Functions ---
  const onSubmit = async (device, token) => {
    const newErrors = {};
    formdata.forEach(field => {
      const value = state[field.fieldType];
      if (!value) {
        newErrors[field.fieldType] = `${field.fieldName} is required`;
      }
    });
    if (!state.termsOfUse) newErrors["termsOfUse"] = "You must accept the terms of use";
    if (!state.dataPolicy) newErrors["dataPolicy"] = "You must agree to the data policy";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        if (!navigator.onLine) {
          toast.error("No internet connection. Please check your network.");
          setLoading(false);
          return;
        }
        const devicetype = getDeviceType();
        const response = await createcustomer({
          ...state,
          stamp: id,
          device,
          devicetype,
          businessId: stemp.businessId,
          fcmToken: token, // include token if available
        });
        if (response.status === 200 || response.status === 201) {
          if (response.data?.device === "pwa") {
            navigate(`/cardinstallation/${response.data?.customer?._id.toString()}`);
            toast.success("Customer created successfully");
          } else if (response.data?.device === "apple wallet") {
            toast.success("Added to Apple Wallet");
            const appleewalletScript = response.data?.appleewalletScript;
            const passPassurl = appleewalletScript?.url?.fileUrl;
            if (passPassurl) window.location.href = passPassurl;
          } else {
            toast.success("Added to Google Wallet");
            const saveUrl = response.data?.googlewalletScript?.saveUrl;
            if (saveUrl) window.location.href = saveUrl;
            else toast.error("Failed to get the Google Wallet save URL");
          }
          setLoading(false);
        } else if (response.status === 403) {
          toast.error("Could not create card: Maximum number of issued cards reached");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        if (error.name === "AbortError") {
          toast.error("Request timed out. Please try again.");
        } else if (!navigator.onLine) {
          toast.error("Lost internet connection. Please check your network.");
        } else if (error.response) {
          toast.error("An error occurred while creating the customer.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  // --- Device Detection Helper ---
  const getDeviceType = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows nt/i.test(userAgent)) return "Windows";
    if (/android/i.test(userAgent) && !/windows/i.test(userAgent)) return "Android";
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
    if (/macintosh|mac os x/i.test(userAgent)) return "Mac";
    return "Desktop";
  };
  const deviceType = getDeviceType();

  // --- Helper to Render Wallet Buttons ---
  const renderWalletButtons = () => {
    if (deviceType === "iOS") {
      return (
        <div onClick={() => handleSubmitWithToken("apple wallet")} className="w-full h-12 cursor-pointer mb-2">
          <img src="/assets/appleSvg.svg" alt="Apple Wallet" className="w-full h-full object-contain" />
        </div>
      );
    } else if (deviceType === "Android") {
      return (
        <div onClick={() => handleSubmitWithToken("google wallet")} className="w-full h-12 my-2 cursor-pointer">
          <img src="/assets/wallet-button.png" alt="Google Wallet" className="w-full h-full object-contain" />
        </div>
      );
    } else {
      return (
        <Typography variant="body2" sx={{ mt: 1 }}>
          <a
            onClick={() => onSubmit("pwa")}
            style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
          >
            Install on the Home screen
          </a>
        </Typography>
      );
    }
  };

  // --- Toggle Terms ---
  const handleToggleTerms = () => {
    setShowTerms(prevShowTerms => !prevShowTerms);
  };

  // --- Firebase Messaging and Service Worker Setup ---
  useEffect(() => {
    onMessage(messaging, payload => {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          registration.showNotification(payload.notification.title, {
            body: payload.notification.body || "server ki body",
            icon: "/assets/logo.svg"
          });
        }
      });
    });
  }, []);

  if ("serviceWorker" in navigator) {
    const scope = `/cardinstallation/${id}`;
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js", { scope })
      .then(registration => {
        onMessage(messaging, payload => {
          if (registration) {
            registration.showNotification(payload.notification.title, {
              body: payload.notification.body || "server ki body",
              icon: "/assets/logo.svg"
            });
          }
        });
      })
      .catch(err => {
        console.error("Service Worker registration failed:", err);
      });
  }

  const handleSubmitWithToken = async (device) => {
    // If the device is iOS / Apple Wallet, skip FCM token retrieval
    if (device === "apple wallet" || getDeviceType() === "iOS") {
      onSubmit(device, null);
      return;
    }

    // Otherwise (Android / other devices), attempt to get an FCM token
    try {
      const token = await getToken(messaging, { vapidKey: Vapid_KEY });
      if (!token) {
        console.error("No FCM token available");
        toast.error("Failed to get notification token. Please enable notifications.");
      } else {
        console.log("FCM Token:", token);
        onSubmit(device, token);
      }
    } catch (error) {
      console.error("Error retrieving FCM token:", error);
      toast.error("Failed to retrieve push notification token.");
      // Fallback: If you want to proceed even without a token, you can call onSubmit here
      // onSubmit(device, null);
    }
  };

  // --- Render Component ---
  return (
    <Box className="w-full mx-auto h-screen">
      <div
        className={`py-4 flex justify-center`}
        style={{
          backgroundColor: stemp?.showBackgroundColorOnCardIssuingForm ? stemp?.bgColor : "",
          color: stemp?.textColor
        }}
      >
        {stemp?.showLogoAtCardIssuingForm && stemp?.logo ? (
          <img className="h-10" src={stemp?.logo} alt="Logo" />
        ) : (
          stemp?.stampName
        )}
      </div>
      <p className="text-2xl text-center my-8">{stemp?.stampName}</p>
      <Box
        className="sm:w-[600px] mt-10 mx-auto w-auto border border-[#d5d5dd] rounded-lg flex flex-col items-center"
        sx={{ padding: "2.5rem" }}
      >
        {/* Render Form Fields */}
        <Box className="flex flex-col gap-4 w-full mt-8">
          {formdata?.map((field, index) => {
            switch (field.fieldType) {
              case "first_name":
              case "last_name":
                return (
                  <TextField
                    key={index}
                    id={field.fieldType}
                    type="text"
                    label={field.fieldName}
                    value={state[field.fieldType] || ""}
                    onChange={e => handleStateChange(field.fieldType, e.target.value)}
                    variant="outlined"
                    error={!!errors[field.fieldType]}
                    helperText={errors[field.fieldType]}
                    className="w-full bg-white"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#d5d5dd" },
                        "&:hover fieldset": { borderColor: "#d5d5dd" },
                        "&.Mui-focused fieldset": { borderColor: "black" }
                      },
                      "& .MuiInputLabel-root": { color: "#8c8c8c" },
                      "& .MuiInputLabel-root.Mui-focused": { color: "black" }
                    }}
                  />
                );
              case "url":
                return (
                  <TextField
                    key={field.fieldType}
                    id={field.fieldType}
                    label={field.fieldName}
                    value={state[field.fieldType] || ""}
                    type="url"
                    onChange={e => handleStateChange(field.fieldType, e.target.value)}
                    variant="outlined"
                    error={!!errors[field.fieldType]}
                    helperText={errors[field.fieldType]}
                    className="w-full bg-white"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#d5d5dd" },
                        "&:hover fieldset": { borderColor: "#d5d5dd" },
                        "&.Mui-focused fieldset": { borderColor: "black" }
                      },
                      "& .MuiInputLabel-root": { color: "#8c8c8c" },
                      "& .MuiInputLabel-root.Mui-focused": { color: "black" }
                    }}
                  />
                );
              case "number":
                return (
                  <TextField
                    key={field.fieldType}
                    id={field.fieldType}
                    label={field.fieldName}
                    value={state[field.fieldType] || ""}
                    type="number"
                    onChange={e => handleStateChange(field.fieldType, e.target.value)}
                    variant="outlined"
                    error={!!errors[field.fieldType]}
                    helperText={errors[field.fieldType]}
                    className="w-full bg-white"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#d5d5dd" },
                        "&:hover fieldset": { borderColor: "#d5d5dd" },
                        "&.Mui-focused fieldset": { borderColor: "black" }
                      },
                      "& .MuiInputLabel-root": { color: "#8c8c8c" },
                      "& .MuiInputLabel-root.Mui-focused": { color: "black" }
                    }}
                  />
                );
              case "email":
                return (
                  <TextField
                    key={field.fieldType}
                    type="email"
                    id={field.fieldType}
                    label={field.fieldName}
                    value={state[field.fieldType] || ""}
                    onChange={e => handleStateChange(field.fieldType, e.target.value)}
                    variant="outlined"
                    error={!!errors[field.fieldType]}
                    helperText={errors[field.fieldType]}
                    className="w-full bg-white"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#d5d5dd" },
                        "&:hover fieldset": { borderColor: "#d5d5dd" },
                        "&.Mui-focused fieldset": { borderColor: "black" }
                      },
                      "& .MuiInputLabel-root": { color: "#8c8c8c" },
                      "& .MuiInputLabel-root.Mui-focused": { color: "black" }
                    }}
                  />
                );
              case "phone":
                return (
                  <Box key={field.fieldType} className="w-full">
                    <PhoneInput
                      type={field.fieldType}
                      key={field.fieldType}
                      defaultCountry={countrydata || "SK"}
                      value={state.phone || ""}
                      onChange={value => handleStateChange("phone", value)}
                      className="block w-full rounded-md border-0 p-4 bg-white outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#DFDFE5] sm:text-sm sm:leading-6"
                      international
                      placeholder="Enter phone number"
                    />
                    <Typography className="text-red-600">
                      {errors[field.fieldType]}
                    </Typography>
                  </Box>
                );
              case "date_of_birth":
              case "date":
                return (
                  <LocalizationProvider dateAdapter={AdapterDayjs} key={field.fieldType}>
                    <DatePicker
                      inputFormat="YYYY-MM-DD"
                      value={
                        state[field.fieldType]
                          ? dayjs(state[field.fieldType], "YYYY-MM-DD")
                          : null
                      }
                      onChange={newValue => {
                        if (newValue) {
                          handleStateChange(field.fieldType, newValue.format("YYYY-MM-DD"));
                        } else {
                          handleStateChange(field.fieldType, "");
                        }
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          placeholder={field.fieldName}
                          fullWidth
                          variant="outlined"
                          sx={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#DFDFE5" },
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#DFDFE5" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "black" }
                          }}
                          InputProps={{
                            ...params.InputProps,
                            className:
                              "w-full rounded-md border-0 p-4 outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#DFDFE5] sm:text-sm sm:leading-6 bg-white"
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                );
              case "photo":
                return (
                  <Box key={field.fieldType} className="w-full">
                    <Typography className="text-gray-600">
                      {field.fieldName}
                    </Typography>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e =>
                        handleStateChange(field.fieldType, e.target.files[0])
                      }
                      className="w-full bg-white p-4 border border-gray-300 rounded-md"
                    />
                    <Typography className="text-red-600">
                      {errors[field.fieldType]}
                    </Typography>
                  </Box>
                );
              default:
                return null;
            }
          })}

          {/* Terms of Use */}
          <Box>
            <Box className="flex flex-row gap-5 items-center">
              <Checkbox
                checked={state.termsOfUse || false}
                onChange={() => handleStateChange("termsOfUse", !state.termsOfUse)}
                sx={{ color: "black" }}
              />
              <Typography className="text-[14px]">
                I accept the{" "}
                <a
                  href="https://cards.vexion.one/podmienky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 font-semibold"
                >
                  Terms of use
                </a>
              </Typography>
            </Box>
            <Typography className="text-red-600">{errors["termsOfUse"]}</Typography>
          </Box>

          {/* Data Policy */}
          <Box>
            <Box className="flex flex-row gap-5 items-center">
              <Checkbox
                checked={state.dataPolicy || false}
                onChange={() => handleStateChange("dataPolicy", !state.dataPolicy)}
                sx={{ color: "black" }}
              />
              <Typography className="text-[14px]">
                I agree with the{" "}
                <a
                  href="https://cards.vexion.one/gdpr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 font-semibold"
                >
                  Data policy
                </a>
              </Typography>
            </Box>
            <Typography className="text-red-600">{errors["dataPolicy"]}</Typography>
          </Box>
        </Box>

        {/* --- Wallet Buttons Section --- */}
        <Box className="mt-5 w-[100%] text-center">
          {renderWalletButtons()}
        </Box>

        {/* --- Conditionally Render Terms of Use --- */}
        {stemp?.termsOfUse && stemp?.termsOfUse.trim() !== "" && (
          <Box
            onClick={handleToggleTerms}
            className="mt-5 cursor-pointer"
            sx={{
              textTransform: "none",
              color: "#000",
              borderColor: "#000",
              "&:hover": { backgroundColor: "#f0f0f0" },
              padding: "10px",
              border: "2px solid gray"
            }}
            display="flex"
            justifyContent="space-between"
          >
            <span>Terms of use</span>
            <span className="text-red">
              <HiChevronDown />
            </span>
          </Box>
        )}

        {showTerms && stemp?.termsOfUse && stemp?.termsOfUse.trim() !== "" && (
          <Grid className="mt-2 my-4 p-4 border">
            {stemp?.termsOfUse.split("\n").map((term, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ margin: "4px" }}>{term}</Box>
              </Grid>
            ))}
          </Grid>
        )}

        <Loader loading={loading} />
      </Box>
    </Box>
  );
};

export default SignUp;
