import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import StylishLoader from "./modal/StylishLoader";
import toast from "react-hot-toast";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MyDocument } from "../utils/generatePdf";
import PDFGeneratorWithLoader from "../utils/prePdf";
import { useTranslation } from "react-i18next";
export default function SaveAndPreview({
  isOn,
  setIsOn,
  generatePDF,
  singledata,
  activecard,
}) {
  const { t } = useTranslation("saveandpreview");
  const qrCodeImage = singledata?.qrcode;
  //// //console.log   .log("this is qr code of this card",singledata?.qrcode) // Update this path to the actual path of your QR code image
  const link = "https://take.cards/Uy1HB";

  const [loader, setLoader] = useState(false);
  const generatedocument = async () => {
    setLoader(true);
    await generatePDF(singledata);
    setLoader(false);
  };

  const handleCopy = (text) => {
    if (window.self !== window.top) {
      // Send message to parent window if in iframe
      window.parent.postMessage({ action: "copyToClipboard", text }, "*");
      toast.success(t("copytoast"));
    } else {
      // Copy directly if not in iframe
      navigator.clipboard.writeText(text).then(() => {
        toast.success(t("copytoclip"));
      });
    }
  };

  return (
    isOn && (
      <div>
        <div className="backdrop-blur-sm bg-[#00000052] flex justify-center items-center fixed bottom-0 left-0 w-full h-[calc(100vh)] z-50">
          <div className="h-max w-[350px]">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-[#d5d5dd68] shadow-sm w-full mx-auto h-full justify-center">
              <div className="w-full flex justify-between items-center mb-3">
                <p className="font-bold">{t("preview")}</p>
                {/* <IoClose className='text-2xl cursor-pointer' onClick={() => setIsOn(false)} /> */}
                <IoClose
                  className="text-2xl cursor-pointer"
                  onClick={() => setIsOn(false)}
                />
              </div>
              <div className="py-10 bg-white border border-gray-200 w-full flex justify-center rounded-lg">
                <img
                  src={qrCodeImage}
                  alt="QR Code"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className="mt-4 w-full text-center border border-[#D5D5DD] p-2 rounded">
                <a
                  href={singledata?.site_url}
                  className="text-[#1F1E1F]"
                  target="_blank"
                  style={{
                    wordBreak: "break-all",
                    overflowWrap: "break-word",
                    display: "block", // Ensures the link takes the full width available
                    width: "100%", // Ensures the link takes the full width of its container
                  }}
                  rel="noopener noreferrer"
                >
                  {singledata?.site_url}
                </a>
              </div>
              <div className="mt-4 flex flex-col space-y-2 w-full">
                <button
                  onClick={() => {
                    handleCopy(singledata?.site_url);
                    // toast.success("copied!")
                  }}
                  className="py-2 px-4 bg-black text-white rounded hover:bg-green-600"
                >
                  {t("copylink")}
                </button>
                {/* <PDFDownloadLink
                                    className='py-2 px-4 text-center bg-black text-white rounded hover:bg-green-600'
                  document={<MyDocument data={singledata} />}
                  fileName={`${singledata?.stampName || 'vexion-cards'}.pdf`}
                >
                  <button
                    // onClick={() => window.open(`${link}.pdf`)}
                  >
                    {loader ? <StylishLoader size="sm" color="black" /> : "Download PDF"}
                  </button>
                </PDFDownloadLink> */}
                <PDFGeneratorWithLoader data={singledata}>
                  <button className="py-2 w-full px-4 text-center bg-black text-white rounded hover:bg-green-600">
                    {loader ? (
                      <StylishLoader size="sm" color="black" />
                    ) : (
                      t("downloadpdf")
                    )}
                  </button>
                </PDFGeneratorWithLoader>

                <button
                  onClick={activecard}
                  className="py-2 px-4 bg-black text-white rounded hover:bg-green-600"
                >
                  {t("activecard")}
                </button>
                <button
                  className="py-2 px-4 bg-black text-white rounded hover:bg-green-600"
                  onClick={() => setIsOn(false)}
                >
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
