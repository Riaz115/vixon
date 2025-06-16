import { useEffect, useState } from "react";
import { MyDocument } from "./generatePdf";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

// Function to preload all images
const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    })
  );
};

const convertImageToBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
// Main component
export const PDFPreView = ({ children, data }) => { // Fixed typo here
  const [qrCodeBase64, setQrCodeBase64] = useState(null);
// //console.log("data" , data)
  // List of image URLs to preload
 
  useEffect(() => {
    // Convert QR code image to base64
    const loadQrCode = async () => {
      try {
        if (data?.qrcode) {
          const qrCodeBase64 = await convertImageToBase64(data.qrcode);
          setQrCodeBase64(qrCodeBase64);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading QR code image: ", error);
      }
    };

    loadQrCode();
  }, [data?.qrcode]);

  

  

  return (
    <div style={{width:"100%", height:"100%"}}>
      { qrCodeBase64 ? (
                  <PDFViewer fileName={`${data?.stampName || 'vexion-cards'}.pdf`}  width="100%" height="100%">
                  <MyDocument qrCodeBase64={qrCodeBase64} data={data} />
                </PDFViewer>
      ) : (
        <PDFViewer fileName={`${data?.stampName || 'vexion-cards'}.pdf`} width="100%" height="100%">
        <MyDocument qrCodeBase64={qrCodeBase64}  data={data}/>
      </PDFViewer>
      )}
    </div>
  );
};

export default PDFPreView;
