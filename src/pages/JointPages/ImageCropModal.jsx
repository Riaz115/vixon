import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImg";

export default function ImageCropModal({
  imageSrc,
  cropSize,
  onCropComplete,
  onClose,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-md relative w-[90%] md:w-[70%] lg:w-[50%] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        {/* Cropper component */}
        <div className="relative w-full h-[400px] bg-transparent">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={cropSize.width / cropSize.height} // Maintain aspect ratio
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>

        {/* Modal footer: Cancel and Save buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            onClick={handleCropSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
