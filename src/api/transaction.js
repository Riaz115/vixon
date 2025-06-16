import axios from "axios";
import { serverUrl } from "../config";
import { createImage } from "../Components/convertdata";
import { handleUpload } from "./createstamp";
import imageCompression from 'browser-image-compression';
const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  
export const createTransactions = async (data) => {
    const response = await axios.post(`${serverUrl}/api/transaction/createTransaction`, data)
    return response;
}
