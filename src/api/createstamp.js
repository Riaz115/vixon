import axios from "axios"
import { serverUrl } from "../config"
import imageCompression from "browser-image-compression"
import { createImage } from "../Components/convertdata"

const CHUNK_SIZE = 4 * 1024 * 1024;
const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};
export const createStamp = async (data) => {
  //console.log(data,"this is data");
  const imageBlob = await createImage(data?.imagecard);
  const fileName = "cardimage.jpg";
  const file = new File([imageBlob], fileName, { type: "image/jpeg" });
  // const compressedFile = await imageCompression(file, options);
  const image = await handleUpload(file);
  data.imagecard = image.Location;
  data.imagecardkey = image.Key;
  const response = await axios.post(`${serverUrl}/api/card/card`, data);
  return response;
};
export const getStamps = async (businessdata) => {
  const response = await axios.get(
    `${serverUrl}/api/card/card`
  );
  return response;
};
export const deleteStamp = async (id) => {
  const response = await axios.delete(`${serverUrl}/api/card/card/${id}`);
  return response;
};
export const CardSwap = async (data) => {
  const response = await axios.put(`${serverUrl}/api/card/card`, data);
  return response;
};
export const copyStamp = async (stamp) => {
  const response = await axios.post(
    `${serverUrl}/api/card/card/${stamp.id}/copy`
  );
  return response;
};
export const activeStamp = async (data) => {
  const card_status = !data.card_status;
  const response = await axios.patch(`${serverUrl}/api/card/card/${data.id}`, {
    card_status,
  });
  return response;
};
export const getsingleStamp = async (id) => {
  const response = await axios.get(`${serverUrl}/api/card/card/${id}`);
  return response;
};
export const getStampcustomers = async (id) => {
  const response = await axios.get(`${serverUrl}/api/card/${id}`);
  return response;
};
export const getallcustomers = async (data) => {
  const response = await axios.get(
    `${serverUrl}/api/customer/customer`
  );
  return response;
};
export const deletecustomer = async (id) => {
  const response = await axios.delete(
    `${serverUrl}/api/customer/customer/${id}`
  );
  return response;
};
export const updatecustomer = async (id, data) => {
  const response = await axios.put(
    `${serverUrl}/api/customer/customer/${id}`,
    data
  );
  return response;
};
export const customersendpush = async (id, data) => {
  const response = await axios.post(
    `${serverUrl}/api/customer/customer/${id}`,
    data
  );
  return response;
};
export const allcustomersendpush = async (data) => {
  const response = await axios.post(
    `${serverUrl}/api/customer/notification`,
    data
  );
  return response;
};
export const allcardcustomersendpush = async (data) => {
  const response = await axios.post(
    `${serverUrl}/api/customer/cardnotification`,
    data
  );
  return response;
};
export const getalltransaction = async (data) => {
  const response = await axios.get(
    `${serverUrl}/api/transaction/transaction`
  );
  return response;
};

export const createcustomer = async (state) => {
  const apiData = new FormData();

  Object.entries(state).forEach(([key, value]) => {
    apiData.append(key, value);
  });
  return await axios.post(
    `${serverUrl}/api/customer/customer`,
    state
  );
};
export const updateStamp = async (data, setdesignFormData) => {
  let logoimge,
    stampbackgroundimg,
    activeStampImgimg,
    inactiveStampImgimg,
    iconimg;
  let imgcard = false;
  if (data.logo) {
    if (typeof data.logo === "string" && data.logo.startsWith("http")) {
      logoimge = data.logo;
    } else {
      const compressedFile = await imageCompression(data.logo, options);
      const image = await handleUpload(compressedFile);
      logoimge = image.Location;
      data.logokey = image.Key;
      // //console.log("nothing to sayy", image.Key) // Ensure the key is updated here
      imgcard = true;
    }
  }

  // Process stamp background
  if (data.stampbackground) {
    if (
      typeof data.stampbackground === "string" &&
      data.stampbackground.startsWith("http")
    ) {
      stampbackgroundimg = data.stampbackground;
    } else {
      const compressedFile = await imageCompression(
        data.stampbackground,
        options
      );
      const image = await handleUpload(compressedFile);
      stampbackgroundimg = image.Location;
      data.stampbackgroundkey = image.Key; // Ensure the key is updated here
      imgcard = true;
    }
  }

  // Process active stamp image
  if (data.activeStampImg) {
    if (
      typeof data.activeStampImg === "string" &&
      data.activeStampImg.startsWith("http")
    ) {
      activeStampImgimg = data.activeStampImg;
    } else {
      const compressedFile = await imageCompression(
        data.activeStampImg,
        options
      );
      const image = await handleUpload(compressedFile);
      activeStampImgimg = image.Location;
      data.activeStampImgkey = image.Key; // Ensure the key is updated here
      imgcard = true;
    }
  }

  // Process inactive stamp image
  if (data.inactiveStampImg) {
    if (
      typeof data.inactiveStampImg === "string" &&
      data.inactiveStampImg.startsWith("http")
    ) {
      inactiveStampImgimg = data.inactiveStampImg;
    } else {
      const compressedFile = await imageCompression(
        data.inactiveStampImg,
        options
      );
      const image = await handleUpload(compressedFile);
      inactiveStampImgimg = image.Location;
      data.inactiveStampImgkey = image.Key; // Ensure the key is updated here
      imgcard = true;
    }
  }
  const activedata = data?.active;
  setdesignFormData({ ...data, active: data?.numberOfStampsWhenIssuingCard });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // if (!data?.imagecard) {
  const imageBlob = await createImage(data?.stampbackground);
  //console.log(data,"this is data");
  const fileName = "cardimage.jpg";
  const file = new File([imageBlob], fileName, { type: "image/jpeg" });
  // const compressedFile = await imageCompression(file, options);
  const image = await handleUpload(file);
  data.imagecard = image.Location;
  data.imagecardkey = image.Key;
  // }
  setdesignFormData({ ...data, active: activedata });

  // if (imgcard === true) {

  // const imageBlob = await createImage("cardImage");
  // const fileName = 'cardimage.jpg';
  // const file = new File([imageBlob], fileName, { type: 'image/jpeg' });
  // const compressedFile = await imageCompression(file, options);
  // const image = await handleUpload(compressedFile);
  // data.imagecard = image.Location;
  // data.imagecardkey = image.Key;
  // }

  if (data.icon) {
    if (typeof data.icon === "string" && data.icon.startsWith("http")) {
      iconimg = data.icon;
    } else {
      const compressedFile = await imageCompression(data.icon, options);
      const image = await handleUpload(compressedFile);
      iconimg = image.Location;
      data.iconkey = image.Key; // Ensure the key is updated here
    }
  }

  const response = await axios.put(`${serverUrl}/api/card/card/${data?.id}`, {
    ...data,
    active: activedata, // Spread the updated data
    logo: logoimge,
    stampbackground: stampbackgroundimg,
    activeStampImg: activeStampImgimg,
    inactiveStampImg: inactiveStampImgimg,
    icon: iconimg,
  });

  return response;
};

function checkImage(data) {
  const urlPattern = /^(http|https):\/\//;
  if (urlPattern.test(data)) {
    return false;
  } else {
    return true;
  }
}

export const installationcard = async (id) => {
  const response = await axios.get(`${serverUrl}/api/customer/customersingle/${id}`);
  return response;
};
export const installationcardonform = async (id) => {
  const response = await axios.get(`${serverUrl}/api/customer/customer/${id}`);
  return response;
};

export const handleUpload = async (file) => {
  if (!file) {
    alert("Please select a file");
    return;
  }
  const fileName = Date.now().toString() + "_" + file.name;
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  try {
    const startTime = new Date();

    const initiateUploadRes = await fetch(
      `${serverUrl}/api/fileupload/initiateUpload`,
      {
        method: "POST",
        body: JSON.stringify({ fileName, filetype: file.type }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { uploadId } = await initiateUploadRes.json();

    const uploadPromises = [];
    let uploadedChunks = 0;
    let start = 0,
      end;

    for (let i = 0; i < totalChunks; i++) {
      end = start + CHUNK_SIZE;
      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append("index", i);
      formData.append("totalChunks", totalChunks);
      formData.append("fileName", fileName);
      formData.append("file", chunk);
      formData.append("chunkSize", CHUNK_SIZE);
      formData.append("filetype", file.type);

      const uploadPromise = fetch(
        `${serverUrl}/api/fileupload/upload?uploadId=${uploadId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      uploadedChunks++;
      const progress = Math.floor((uploadedChunks / totalChunks) * 100);
      // //console.log(progress);

      uploadPromises.push(uploadPromise);
      start = end;
    }

    await Promise.all(uploadPromises);

    const completeRes = await fetch(
      `${serverUrl}/api/fileupload/completeUpload?fileName=${fileName}&uploadId=${uploadId}`,
      { method: "POST" }
    );
    const { success, data } = await completeRes.json();

    if (!success) {
      throw new Error("Error completing upload");
    }

    const endTime = new Date();
    const timeElapsed = (endTime - startTime) / 1000;
    // //console.log('Time elapsed:', timeElapsed, 'seconds');
    return data;
  } catch (error) {
    console.error(error);
    alert("Error uploading file");
  }
};

export const sendTokenToServer = async (userToken, id, environment) => {
  try {
    const response = await axios.patch(
      `${serverUrl}/api/customer/customer/${id}`,
      { token: userToken, environment }
    );
    if (response.status === 200) {
      // //console.log("token saved")
    }
  } catch (error) {
    // //console.log("failed to save token", error)
  }
};
export const generateJwtToken = async () => {
  try {
    const response = await axios.post(`${serverUrl}/api/wallet/google`);
    if (response.status === 200) {
      // //console.log("token saved")
      return response.data;
    }
  } catch (error) {
    // //console.log("failed to save token", error)
  }
};

export const getallnotification = async (data) => {
  const response = await axios.get(
    `${serverUrl}/api/customer/allnotification`
  );
  return response;
};
export const getcardnotification = async (id) => {
  const response = await axios.get(
    `${serverUrl}/api/customer/notification/${id}`
  );
  return response;
};
export const deletenotification = async (id) => {
  const response = await axios.delete(
    `${serverUrl}/api/customer/notification/${id}`
  );
  return response;
};
