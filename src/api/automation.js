import { serverUrl } from "../config";
import axios from "axios";

export const getautomation=async(id)=>{
    const response= await axios.get(`${serverUrl}/api/notification/getFeedback/${id}`)
    return response;
}
export const updateautomation=async(id,data)=>{
    const response= await axios.put(`${serverUrl}/api/notification/updateAutomation/${id}`,data)
    return response;
}