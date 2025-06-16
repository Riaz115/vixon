import axios from "axios";
import { serverUrl } from "../config";

const downloadObject = async (url) => {
  try {
    const response = await axios.post(
      `${serverUrl}/api/fileupload/download-awsobj`,
      { key: url }
    );
    if (response.status === 200) {
      return response.data.url;
    }
  } catch (error) {
    // //console.log(error);
    // //console.log(`error in getting object ${url}`);
  }
};
