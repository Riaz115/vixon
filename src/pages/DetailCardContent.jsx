import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
const DetailCardContent = ({ informationformData, alldata, getFieldValueByName }) => {
    return (
        <div className='flex jsutify-content-center mx-1 rounded-lg'>

            <div
                style={{ color: "black", back: "white" }}
                className="hide-scrollbar  overflow-y-auto w-full rounded-lg px-2"
            >
            
                <div className="py-4 px-3 mt-2 shadow bg-white rounded-md">
           
                    <p className="font-bold text-[12px] mt-3">Company Name</p>
                    <p className="text-[12px]">{informationformData?.companyName}</p>
                    {informationformData?.activeLinks?.length > 0 && <p className="font-bold text-[12px] ">Active Links</p>}
                    <p className="text-[12px]">
                        {informationformData?.activeLinks?.map((value, index) => {
                            return (
                                <div key={index}>
                                    <a
                                        className="text-blue-400"
                                        href={value?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"

                                    >
                                        {value.text}
                                    </a>
                                    <br />
                                </div>
                            );
                        })}
                    </p>
                    {/* <hr className="my-4" /> */}
                    {informationformData?.termsOfUseSwitch === false ? "" : <p className="font-bold text-[12px] mt-3">Terms of use</p>}

                    {informationformData?.termsOfUseSwitch === false ? "" : <p className="text-[12px] whitespace-pre-wrap"
                      style={{
                        whiteSpace: "pre-wrap", // Preserves newlines and spaces
                        wordWrap: "break-word", // Ensures long words wrap properly
                      }}>
                        {informationformData?.termsOfUse}
                    </p>}

                    {informationformData?.feedBackLinks?.length > 0 && <p className="font-bold text-[12px] mt-3">Feedback Links</p>}
                    <p className="text-[12px]">
                        {informationformData?.feedBackLinks?.map((value, index) => {
                            return (
                                <>
                                    <a
                                        className="text-blue-400"
                                        href={value.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={index}
                                    >
                                        {value.service}
                                    </a>
                                    <br />
                                </>
                            );
                        })}
                    </p>
                    <hr className="my-4" />


                    {/* <hr className="my-4" /> */}

                    {informationformData?.issuerCompanyName && <p className="font-bold text-[12px]">Issuer Information</p>}
                    <p className="text-[12px] text-blue-400">
                        {informationformData?.issuerCompanyName}
                        <br />
                        {informationformData?.issuerEmail}
                        <br />
                        {informationformData?.issuerPhone}
                    </p>
                    {/* <hr className="my-4" /> */}
                    {alldata?.first_name && <p className="font-bold text-[12px] ">First Name</p>}
                    <p className="text-[12px]">
                        {alldata?.first_name}
                    </p>
                    {alldata?.first_name && <hr className="my-4" />}
                    {alldata?.last_name && <p className="font-bold text-[12px] mt-3">LastName</p>}
                    <p className="text-[12px]">
                        {alldata?.last_name}
                    </p>
                    {alldata?.last_name && <hr className="my-4" />}
                    {alldata?.phone && <p className="font-bold text-[12px] mt-3">Phone</p>}
                    <p className="text-[12px]">
                        {alldata?.phone}
                    </p>
                    {alldata?.phone && <hr className="my-4" />}
                    {alldata?.email && <p className="font-bold text-[12px] mt-3">Email</p>}
                    <p className="text-[12px]">
                        {alldata?.email}
                    </p>
                    {alldata?.email && <hr className="my-4" />}
                    {alldata?.date_of_birth && <p className="font-bold text-[12px] mt-3">Date of Birth</p>}
                    <p className="text-[12px]">
                        {new Date(alldata?.date_of_birth)?.toLocaleDateString()}
                    </p>
                    {/* {alldata?.date_of_birth &&  <hr className="my-4" />} */}
                    {alldata?.stampName && <p className="font-bold text-[12px] mt-3">Card Name</p>}
                    <p className="text-[12px]">
                        {alldata?.stampName}
                    </p>
                    <hr className="my-4" />
                    <p className="font-bold text-[12px] mt-3">Card Serial Number</p>
                    <p className="text-[12px] text-center">
                        {informationformData?._id?.slice(0,10)}
                    </p>
                    <hr className="my-4" />

                    <p className="text-[12px] text-center">Tap for more details</p>
                </div>
            </div>
        </div>
    )
}

export default DetailCardContent