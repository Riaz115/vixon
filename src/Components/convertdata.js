export const designconvert = (data) => {
  const designformData = {
    card_status: data?.card_status || false,
    active: data?.active || 8,
    selectedNumber: data?.stamps_count,
    activeStampIcon: data?.active_stamp,
    inactiveStampIcon: data?.inactive_stamp,
    textColor: data?.text_color,
    bgColor: data?.card_background,
    activeStampColor: data?.active_stamp_color,
    inActiveStampColor: data?.inactive_stamp_color,
    outlineColor: data?.outline_color,
    stampBgColor: data?.stamp_background,
    bgUnderStampsColor: data?.background_under_stamps,
    backgroundColorFortheCenterPart: data?.background_center_part_color,
    showNameOnTheCard: false,
    showPhotoOnTheCard: false,
    activeStampImg: data?.custom_active_stamp,
    inactiveStampImg: data?.custom_inactive_stamp,
    logo: data?.logo_image,
    stampbackground: data?.background_image,
    icon: data?.icon_image,
    fields: [
      {
        fieldType: data?.first_field_type,
        fieldName: data?.second_field_value,
      },
      { fieldType: data?.last_field_type, fieldName: data?.second_field_value },
    ],
    showLogoAtCardIssuingForm: data?.show_logo,
    showBackgroundColorOnCardIssuingForm: data?.show_background_color,
  };
  return designformData;
};

export const informationconvert = (data) => {
  const informationformData = {
    cardDescription: data?.card_description,
    howToEarnStamp: data?.earn_stamp_instructions,
    companyName: data?.company_name,
    rewardDetails: data?.reward_details,
    earnedRewardMessage: data?.earned_reward_message,
    earnedStampMessage: data?.earned_stamp_message,
    multiRewards: data?.multi_rewards,
    referralProgram: data?.referral_program,
    bonusMoment: data?.bonus_trigger,
    stampsForReferrer: data?.stamps_for_referral,
    stampsForReferrerSelected: data?.stamps_for_referral,
    stampsForNewCustomer: 10,
    stampsForNewCustomerSelected: 0,
    activeLinks: data?.active_link,
    feedBackLinks: data?.feedback_link,
    termsOfUse: data?.terms_of_use,
    termsOfUseSwitch: data?.termsOfUseSwitch,
    linkToTheFullTermsAndConditions: data?.terms_link,
    issuerCompanyName: data?.issuer_company_name,
    issuerEmail: data?.issuer_email,
    issuerPhone: data?.issuer_phone_number,
    redeemRadio: data?.redeem_reward_automatically,
  };

  return informationformData;
};

export const settingconvert = (data) => {
  const settingdata = {
    cardExpirationFixedTermDate: data?.card_expiration_term,
    cardExpirationFixedTermAfterIssuingDays: data?.card_term_value,
    cardExpirationFixedTermAfterIssuingYears: data?.card_term_unit,
    selectedCollectedPayment: data?.selectedMembershipExpiration,
    selectedAutoRenewal: data?.selectedAutoRenewal,
    selectedMembershipExpiration: data?.selectedMembershipExpiration,
    language: data?.language,
    dateFormat: data?.date_format,
    thousandSeperator: data?.thousand_separator,
    decimalSeparator: data?.decimal_separator,
    modaldata: data?.modaldata,
    cardIssuingForm: data?.cardIssuingForm,
    tiers: data?.tiers,
    reward: data?.reward,
    utm: "",
    phoneMask: data?.phone_mask,
    privacyPolicySwitch: data?.privacyPolicySwitch,
    privacyPolicyText:
      data?.privacy_policy ||
      "I agree that my personal data can be used and provided for direct marketing purposes.",
    concentToProcessingOfPrivateDateSwitch:
      data?.personal_data_processing_consent,
    googlewallet: data?.display_google_wallet_button,
    cardIssuedLimit: data?.max_cards_issued,
    numberOfStampsWhenIssuingCard: data?.stamps_per_card_issue,
    analyticsSwitch: data?.analyticsSwitch,
    purchaseAmountIsRequiredSwitch: data?.is_purchase_amount_required,
    analytics: data?.analytics,
    selectedUpperRadio: data?.card_expiration_type,
    selectedBottomRadio: data?.stamp_life,
    redemptionRulesRadio: data?.redemptionRulesRadio || "multiple",
    earnPointsWhenRedeemReward: data?.earnPointsWhenRedeemReward,
    trackVisitWhenRedeemCard: data?.trackVisitWhenRedeemCard,
    linkedCardTemplate: data?.linkedCardTemplate,
    rewardForTheFirstVisit: data?.rewardForTheFirstVisit,
  };

  return settingdata;
};

import html2pdf from "html2pdf.js";

const newImge = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const imageBlob = await response.blob();
  const blobUrl = URL.createObjectURL(imageBlob);
  return blobUrl;
};

export const generatePDF = async (data) => {
  try {
    // Create a container div for PDF content
    const pdfContent = document.createElement("div");
    pdfContent.id = "pdf-content";
    // Ensure no margins or paddings are added in the container
    pdfContent.style.margin = "0";
    pdfContent.style.padding = "0";
    pdfContent.style.width = "100%"; // Full width to avoid extra spacing

    // HTML content with the exact structure and no extra left spacing
    pdfContent.innerHTML = `
      <div style="max-width: 100%; margin: 0; padding: 0;">
        <div class="text-center mb-6">
            <h1 class="text-2xl font-bold">NABITE SVOJU</h1>
            <h1 class="text-2xl font-bold">DARČEKOVÚ KARTU A</h1>
            <h1 class="text-2xl font-bold">NAKUPUJTE POHODLNE!</h1>
            <div class="mt-4 text-lg px-8">
                <p>Pridajte si vernostnú kartu do</p>
                <p class="font-bold">Apple Wallet alebo Google Pay!</p>
            </div>
        </div>
        <div class="flex justify-center mb-6">
            <div class="bg-black p-3 rounded-3xl">
                <img id="qr-code" src="${data.qrcode}" alt="QR Code" class="w-36 h-36" />
            </div>
        </div>
        <div class="text-center mb-6">
            <ol class="list-decimal list-inside">
                <div class="flex items-center justify-center">
                    <span class="mr-2">1.</span>
                    <p class="font-bold">Naskenujte tento QR kód</p>
                </div>
                <div class="flex items-center justify-center">
                    <span class="mr-2">2.</span>
                    <p class="font-bold">Vyplňte krátky formulár</p>
                </div>
                <div class="flex items-center justify-center">
                    <span class="mr-2">3.</span>
                    <p class="font-bold">Začnite využívať svoju</p>
                </div>
                <div class="flex items-center justify-center">
                    <p class="font-bold">darčekovú kartu</p>
                </div>
            </ol>
        </div>
        <div class="flex justify-center space-x-4 mb-6">
            <div class="flex justify-center items-center gap-2  p-1 bg-black text-white rounded-md">
                <div>
                    <img id="google-pay" src="/assets/1wallet-button.png" alt="Google Pay" class="w-4 h-4" />
                </div>
                <div style="font-size: .5rem;" class="text-center">
                    <div>Pridať do služby</div>
                    <div>Google Peňaženka</div>
                </div>
            </div>
            <div class="flex justify-center items-center gap-2  p-1 bg-black text-white rounded-md">
                <div>
                    <img id="google-pay" src="/assets/image-removebg-preview.png" alt="Google Pay" class="w-4 h-4" />
                </div>
                <div style="font-size: .5rem;" class="text-left">
                    <div>Pridať do služby</div>
                    <div>Apple Wallet</div>
                </div>
            </div>
        </div>
        <div class="text-center text-sm text-gray-500 flex items-center gap-2 justify-end">
            <div class="flex items-center">Powered by </div>
            <div>
                <img id="google-pay" src="/assets/VEXiON Logo.svg" alt="Google Pay" class="w-24 h-full" />
            </div>
        </div>
      </div>`;

    // Append the PDF content to the body
    document.body.appendChild(pdfContent);

    // Get the QR code image element
    const qrCodeImg = document.getElementById("qr-code");

    // Function to wait for the image to load
    const waitForImageLoad = (imgElement) => {
      return new Promise((resolve, reject) => {
        if (imgElement.complete && imgElement.naturalHeight !== 0) {
          resolve(); // Image already loaded
        } else {
          imgElement.onload = () => resolve();
          imgElement.onerror = () =>
            reject(new Error("Failed to load QR code image."));
        }
      });
    };

    // Wait for the QR code image to load
    await waitForImageLoad(qrCodeImg);

    // Define PDF options with A4 size and no margins
    const options = {
      margin: 0, // Remove all margins
      filename: `${data?.stampName}.pdf` || "vexion-cards.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true }, // Ensure CORS is enabled
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }, // A4 format
    };

    // Generate and download the PDF
    await html2pdf().from(pdfContent).set(options).save();
  } catch (error) {
    console.error("Error during PDF generation:", error);
    alert("Failed to generate PDF. Please try again.");
  } finally {
    // Cleanup: Remove the PDF content from the DOM
    const pdfContent = document.getElementById("pdf-content");
    if (pdfContent) {
      document.body.removeChild(pdfContent);
    }
  }
};
export const viewPDF = async (data) => {
  try {
    // Create a container div for PDF content
    const pdfContent = document.createElement("div");
    pdfContent.id = "pdf-content";
    // Ensure no margins or paddings are added in the container
    pdfContent.style.margin = "0";
    pdfContent.style.padding = "0";
    pdfContent.style.width = "100%"; // Full width to avoid extra spacing

    // HTML content with the exact structure and no extra left spacing
    pdfContent.innerHTML = `
      <div style="max-width: 100%; margin: 0; padding: 0;">
        <div class="text-center mb-6">
            <h1 class="text-2xl font-bold">NABITE SVOJU</h1>
            <h1 class="text-2xl font-bold">DARČEKOVÚ KARTU A</h1>
            <h1 class="text-2xl font-bold">NAKUPUJTE POHODLNE!</h1>
            <div class="mt-4 text-lg px-8">
                <p>Pridajte si vernostnú kartu do</p>
                <p class="font-bold">Apple Wallet alebo Google Pay!</p>
            </div>
        </div>
        <div class="flex justify-center mb-6">
            <div class="bg-black p-3 rounded-3xl">
                <img id="qr-code" src="${data.qrcode}" alt="QR Code" class="w-36 h-36" />
            </div>
        </div>
        <div class="text-center mb-6">
            <ol class="list-decimal list-inside">
                <div class="flex items-center justify-center">
                    <span class="mr-2">1.</span>
                    <p class="font-bold">Naskenujte tento QR kód</p>
                </div>
                <div class="flex items-center justify-center">
                    <span class="mr-2">2.</span>
                    <p class="font-bold">Vyplňte krátky formulár</p>
                </div>
                <div class="flex items-center justify-center">
                    <span class="mr-2">3.</span>
                    <p class="font-bold">Začnite využívať svoju</p>
                </div>
                <div class="flex items-center justify-center">
                    <p class="font-bold">darčekovú kartu</p>
                </div>
            </ol>
        </div>
        <div class="flex justify-center space-x-4 mb-6">
            <div class="flex justify-center items-center gap-2  p-1 bg-black text-white rounded-md">
                <div>
                    <img id="google-pay" src="/assets/1wallet-button.png" alt="Google Pay" class="w-4 h-4" />
                </div>
                <div style="font-size: .5rem;" class="text-center">
                    <div>Pridať do služby</div>
                    <div>Google Peňaženka</div>
                </div>
            </div>
            <div class="flex justify-center items-center gap-2  p-1 bg-black text-white rounded-md">
                <div>
                    <img id="google-pay" src="/assets/image-removebg-preview.png" alt="Google Pay" class="w-4 h-4" />
                </div>
                <div style="font-size: .5rem;" class="text-left">
                    <div>Pridať do služby</div>
                    <div>Apple Wallet</div>
                </div>
            </div>
        </div>
        <div class="text-center text-sm text-gray-500 flex items-center gap-2 justify-end">
            <div class="flex items-center">Powered by </div>
            <div>
                <img id="google-pay" src="/assets/VEXiON Logo.svg" alt="Google Pay" class="w-24 h-full" />
            </div>
        </div>
      </div>`;

    // Append the PDF content to the body
    document.body.appendChild(pdfContent);

    // Get the QR code image element
    const qrCodeImg = document.getElementById("qr-code");

    // Function to wait for the image to load
    const waitForImageLoad = (imgElement) => {
      return new Promise((resolve, reject) => {
        if (imgElement.complete && imgElement.naturalHeight !== 0) {
          resolve(); // Image already loaded
        } else {
          imgElement.onload = () => resolve();
          imgElement.onerror = () =>
            reject(new Error("Failed to load QR code image."));
        }
      });
    };

    // Wait for the QR code image to load
    await waitForImageLoad(qrCodeImg);

    // Define PDF options with A4 size and no margins
    const options = {
      margin: 0, // Remove all margins
      filename: `${data?.stampName}.pdf` || "vexion-cards.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true }, // Ensure CORS is enabled
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }, // A4 format
    };

    // Generate and download the PDF
    html2pdf()
      .from(pdfContent)
      .set(options)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const pdfBlobUrl = pdf.output("bloburl");
        window.open(pdfBlobUrl, "_blank");
      })
      .finally(() => {
        document.body.removeChild(pdfContent);
      });
  } catch (error) {
    console.error("Error during PDF generation:", error);
    alert("Failed to generate PDF. Please try again.");
  } finally {
    // Cleanup: Remove the PDF content from the DOM
    const pdfContent = document.getElementById("pdf-content");
    if (pdfContent) {
      document.body.removeChild(pdfContent);
    }
  }
};



import { serverUrl } from "../config";
import { toPng, toJpeg, toBlob } from 'html-to-image';
export const createImage = (id) => {
  return new Promise(async (resolve, reject) => {
    const imageContent = document.getElementById("cardImage");
    //console.log("imageContent", imageContent);

    if (!imageContent) {
      reject('Element with ID "cardImage" not found.');
      return;
    }

    // Change the class if needed
    if (imageContent.className === "py-1 flex justify-center   scale-content") {
      imageContent.className = "py-2 flex justify-center info";
    }

    await new Promise((r) => setTimeout(r, 1000));

    try {
      // Handle background image logic
      const backgroundImage = window.getComputedStyle(imageContent).backgroundImage;
      //console.log(backgroundImage,"hshsfj")
      // imageContent.style.backgroundColor = "white";
      if (backgroundImage && backgroundImage !== "none") {
        const urlMatch = backgroundImage.match(/url\(["']?([^"']+)["']?\)/);
        //console.log(urlMatch,"this is url")
        if (urlMatch && urlMatch[1]) {
          const backgroundUrl = urlMatch[1];
          if (!backgroundUrl.startsWith("file://") && /^https?:\/\//i.test(backgroundUrl)) {
            const response = await fetch(
              `${serverUrl}/image-proxy?url=${encodeURIComponent(backgroundUrl)}`
            );
            //console.log(response,"this is response data")
            if (!response.ok) {
              throw new Error(`Failed to fetch background image: ${response.statusText}`);
            }
            const blob = await response.blob();
            const dataUrl = URL.createObjectURL(blob);
            imageContent.style.backgroundImage = `url(${dataUrl})`;
            // imageContent.style.backgroundColor = "white";
          }
        }
      }
      await new Promise((r) => setTimeout(r, 1000));

      // Handle image elements logic
      const images = imageContent.querySelectorAll("img");
      const cache = new Map(); // Create a cache to store fetched image URLs
      
      await Promise.all(
        Array.from(images).map(async (img) => {
          const src = img.getAttribute("src");
          if (src && !src.startsWith("file://") && /^https?:\/\//i.test(src)) {
            // Check if the image has already been fetched
            if (cache.has(src)) {
              // Reuse the cached data URL
              img.src = cache.get(src);
            } else {
              // Fetch the image and cache the result
              const response = await fetch(`${serverUrl}/image-proxy?url=${encodeURIComponent(src)}`);
              const blob = await response.blob();
              const dataUrl = URL.createObjectURL(blob);
              //console.log(src,"this is src data");
              cache.set(src, dataUrl); 
              img.src = dataUrl;
            }
          }
        })
      );
      
      
      const dataUrl = await toPng(imageContent, {
        quality: 1,
        pixelRatio: 3,
      });


      if (imageContent.className === "py-2 flex justify-center info") {
        imageContent.className = "py-1 flex justify-center   scale-content"
        // imageContent.style.backgroundColor = "white";
      }
      //console.log(dataUrl, "this is data url");

      const contentType = 'image/jpeg';
      const blob = base64ToBlob(dataUrl, contentType);
      //console.log(blob, "this is blob");
      cache.clear();
      resolve(blob);
    } catch (error) {
      //console.log("Error fetching images:", error);
    }
  });
};


function base64ToBlob(base64, contentType = '', sliceSize = 512) {
  // Remove any data URL scheme prefix
  if (base64.includes(',')) {
    base64 = base64.split(',')[1];
  }
  try {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  } catch (error) {
    console.error('Error decoding base64 string:', error);
    throw error; // Rethrow or handle the error as needed
  }
}







export const resizeImage = async (imageUrl, size) => {
  return new Promise(async (resolve, reject) => {
    const img = new Image();

    img.crossOrigin = "anonymous"; // Handle cross-origin images (optional, depending on your AWS settings)
    img.src = imageUrl; // Set the URL of the image from AWS or any other source

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, size, size);

      // Convert the canvas to a blob and resolve it
      canvas.toBlob((blob) => resolve(blob), "image/png");
    };

    img.onerror = (err) => {
      reject("Image failed to load");
    };
  });
};

export const convertImage = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};


