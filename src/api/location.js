import axios from "axios"
import { serverUrl } from "../config"

export const createLocation=async(data)=>{
    const response= await axios.post(`${serverUrl}/api/location/locationdata`,data)
    //console.log("response", response)
    return response;    
}
export const getLocations=async(data)=>{
    const response= await axios.get(`${serverUrl}/api/location/locationdata/getBusiness`)
    return response;
}
export const updateLocationforcard=async(data,id)=>{
    const response= await axios.put(`${serverUrl}/api/location/location/${id}`,data)
    return response;
}
export const deleteLocation=async(id)=>{
    const response= await axios.delete(`${serverUrl}/api/location/location/${id}`)
    return response;
}