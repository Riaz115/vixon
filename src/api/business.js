import { serverUrl } from "../config";
import axios from "axios"; 
export const getBusiness=async(id)=>{
    //console.log("id", id);
    const response= await axios.get(`${serverUrl}/api/ghl/edit-business/${id}`)
    //console.log("response.data",response.data);
    return response.data;
}
export const updateBusiness = async(data, id)=>{
    //console.log("data",data)
    const response= await axios.put(`${serverUrl}/api/ghl/update-business/${id}`,data)
    return response;
}

export const deleteUrl=async(data)=>{
    const response= await axios.post(`${serverUrl}/api/ghl/delete-url`, data)
    return response;
}