import { serverUrl } from "../config"
import axios from "axios"

export const createcustomPush=async(data)=>{
    return await axios.post(`${serverUrl}/api/customPush/createCustomAutoPush`, data);
}

export const getcustompush=async(id)=>{
    return await axios.get(`${serverUrl}/api/customPush/CustomAutoPush/${id}`);
}
export const updatecustompush=async(data)=>{
    return await axios.put(`${serverUrl}/api/customPush/CustomAutoPush/${data?._id}`, data);
}
export const deletecustompush=async(data)=>{
    return await axios.delete(`${serverUrl}/api/customPush/CustomAutoPush/${data?._id}`);
}

export const sendMessageToSelectedCustomers = async (data) => {
    // data should include: { userIds, messageBody, etc. }
    const url = `${serverUrl}/api/customer/multi-notification`;
    return axios.post(url, data);
};