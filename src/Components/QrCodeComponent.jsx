import React, { useState } from "react";
import { frontendUrl } from "../config";
import StylishLoader from "./modal/StylishLoader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MyDocument } from "../utils/generatePdf";
import PDFGeneratorWithLoader from "../utils/prePdf";
import toast from "react-hot-toast";

const QRCodeComponent = ({ data, cardid, t }) => {
  const qrCodeImage = data?.qrcode; // Update this path to the actual path of your QR code image
  const [linkText, setLinkText] = useState(t("copylink"));
  const [loader, setLoader] = useState(false);
  const generatedocument = async () => {
    setLoader(true);
    // await generatePDF(data);
    setLoader(false);
  };
  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-[#d5d5dd68] shadow-sm w-full mx-auto h-full justify-center">
      <div className="py-10 bg-white border border-gray-200 w-full flex justify-center rounded-lg">
        {qrCodeImage && (
          <img
            src={qrCodeImage}
            alt="QR Code"
            className="w-48 h-48 object-contain"
          />
        )}
      </div>
      <div className="mt-4 w-full text-center border border-[#D5D5DD] p-2 rounded">
        <a
          style={{
            wordBreak: "break-all",
            overflowWrap: "break-word",
            display: "block", // Ensures the link takes the full width available
            width: "100%", // Ensures the link takes the full width of its container
          }}
          href={`${frontendUrl}/signup/?id=${cardid}`}
          className="text-[#1F1E1F]"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* {data?.site_url} */}
          {`${frontendUrl}/signup/?id=${cardid}`}
        </a>
      </div>
      <div className="mt-4 flex flex-col space-y-2 w-full">
        <button
          onClick={() => {
            handleCopy(data?.site_url);
          }}
          className="py-2 px-4 bg-black text-white rounded hover:bg-green-600"
        >
          {linkText}
        </button>
        <PDFGeneratorWithLoader data={data}>
          <button
            className="py-2 px-4 text-center w-full bg-black text-white rounded hover:bg-green-600"
            onClick={() => generatedocument()}
          >
            {loader ? (
              <StylishLoader size="sm" color="black" />
            ) : (
              t("downloadpdf")
            )}
          </button>
        </PDFGeneratorWithLoader>
        {/* <PDFDownloadLink

document={<MyDocument data={data} />}
          fileName={`${data?.stampName || 'vexion-cards'}.pdf`}
        >
             <button
          onClick={() => generatedocument()}
         
        >
          {loader ? <StylishLoader size="sm" color="black" /> : "Download PDF"}
        </button>
        </PDFDownloadLink> */}
      </div>
    </div>
  );
};
const handleCopy = (text) => {
  if (window.self !== window.top) {
    // Send message to parent window if in iframe
    window.parent.postMessage({ action: "copyToClipboard", text }, "*");
    toast.success(t("copiedlink"));
    setLinkText(t("copied"));
    setTimeout(() => {
      setLinkText(t("copylink"));
    }, 5000);
    toast.success(t("cpysendtoparent"));
  } else {
    // Copy directly if not in iframe
    navigator.clipboard.writeText(text).then(() => {
      toast.success(t("copyclipboard"));
      toast.success(t("copiedlink"));
      setLinkText(t("copied"));
      setTimeout(() => {
        setLinkText(t("copylink"));
      }, 5000);
    });
  }
};

export default QRCodeComponent;
