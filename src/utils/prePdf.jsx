import { useEffect, useState } from "react";
import { MyDocument } from "./generatePdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

// Global cache object (could also use a more robust caching solution)
const qrCodeCache = {};

// Function to convert an image to Base64 (unchanged)
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

export const PDFGeneratorWithLoader = ({ children, data }) => {
  const [loading, setLoading] = useState(false);
  const [qrCodeBase64, setQrCodeBase64] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadQrCode = async () => {
      if (data?.qrcode) {
        // If the conversion already exists in the cache, use it!
        if (qrCodeCache[data.qrcode]) {
          if (isMounted) setQrCodeBase64(qrCodeCache[data.qrcode]);
        } else {
          try {
            setLoading(true);
            const base64 = await convertImageToBase64(data.qrcode);
            qrCodeCache[data.qrcode] = base64;
            if (isMounted) setQrCodeBase64(base64);
          } catch (error) {
            console.error("Error loading QR code image: ", error);
          } finally {
            if (isMounted) setLoading(false);
          }
        }
      }
    };

    // Option 1: Preload on render (comment out if using on-demand loading)
    loadQrCode();

    // Option 2 (Lazy-load): Remove the effect and instead trigger loadQrCode when the user requests the PDF.
    // For example, you can wrap children in a button onClick handler that triggers loadQrCode once.

    return () => {
      isMounted = false;
    };
  }, [data?.qrcode]);

  return (
    <div>
      {qrCodeBase64 ? (
        <PDFDownloadLink
          document={<MyDocument qrCodeBase64={qrCodeBase64} data={data} />}
          fileName={`${data?.stampName || 'vexion-cards'}.pdf`}
        >
          {children}
        </PDFDownloadLink>
      ) : (
        <>
          {/* Optionally, you can show a loader or just the children (button) */}
          {loading ? (
            // Replace with your stylish loader component if desired
            <div className="flex items-center justify-center h-full">Loading...</div>
          ) : (
            children
          )}
        </>
      )}
    </div>
  );
};

export default PDFGeneratorWithLoader;
