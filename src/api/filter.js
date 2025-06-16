import axios from "axios"
import { serverUrl } from "../config"

export const createFilter = async (data) => {
    //console.log("response", response)
    return await axios.post(`${serverUrl}/api/filter/filter`, data);
}


export const getFilters = async (businessId) => {
    return await axios.get(`${serverUrl}/api/filter/filter`);
}

export const deleteFilter=async(id)=>{
    return await axios.delete(`${serverUrl}/api/filter/delete/${id}`);
}