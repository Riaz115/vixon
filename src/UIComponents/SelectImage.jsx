import { useState, useRef } from "react";
import Heading_Description from "./Heading_Description";
import DropDown from "./DropDown";
import { AiTwotoneDelete } from "react-icons/ai";
import ImageCropModal from "../pages/JointPages/ImageCropModal";

export default function SelectImage({
                                      id,
                                      title,
                                      description,
                                      dropDown,
                                      onFileSelect,
                                      stateValue,
                                      cropSize,
                                    }) {
  // Local state to store the selected image (its name and source)
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Create a ref to our hidden file input
  const fileInputRef = useRef(null);

  // When a file is selected via the file input
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setIsModalOpen(true);
      };
    }
  };

  // When a file is dropped into the drag-and-drop area
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setIsModalOpen(true);
      };
    } else {
      alert("No file selected");
    }
  };

  // Prevent default drag-over behavior
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Close the crop modal and reset the local state and file input
  const closeModal = () => {
    setIsModalOpen(false);
    setImageSrc(null);
    setImageName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset the file input value
    }
    // Optionally, notify the parent that no file is selected
    onFileSelect(null);
  };

  return (
    <>
      {title && <Heading_Description heading={title} />}
      {dropDown && <DropDown />}

      {/* Hidden file input */}
      <input
        type="file"
        required
        id={`active-stamps_${id}`}
        accept="image/png"
        className="hidden"
        onChange={handleFileSelect}
        ref={fileInputRef}
      />

      {/* Drag-and-drop area with file selection button */}
      <div className="mt-2 py-3 px-4 flex justify-between items-center border-dashed border-2 border-gray-300 rounded-md">
        <img
          src="/assets/dragAndDrop.png"
          alt="drag and drop"
          className="w-[35px]"
        />
        <div className="flex gap-2 items-center">
          <label
            htmlFor={`active-stamps_${id}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="bg-black py-2 px-4 text-xs w-max text-white rounded cursor-pointer">
              Select file
            </div>
          </label>
          {stateValue && (
            <AiTwotoneDelete
              className="text-2xl cursor-pointer"
              onClick={() => {
                // Clear parent state and reset local image variables
                onFileSelect(null);
                setImageName("");
                setImageSrc(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            />
          )}
        </div>
      </div>

      {/* Display the selected file name */}
      {imageName && (
        <div className="mt-2 text-center text-sm text-gray-500">
          {imageName}
        </div>
      )}

      {/* Show description text if provided */}
      <div className="text-xs text-center mt-2 text-gray-500">
        {description}
      </div>

      {/* Crop modal: open when an image is selected */}
      {isModalOpen && (
        <ImageCropModal
          imageSrc={imageSrc}
          cropSize={cropSize}
          onClose={closeModal}
          onCropComplete={async (croppedImage) => {
            // When cropping is finished, fetch the cropped image as a Blob
            const response = await fetch(croppedImage);
            const blob = await response.blob();
            const croppedFile = new File([blob], imageName, { type: blob.type });
            // Notify the parent with the final file
            onFileSelect(croppedFile);
            // Optionally, update imageSrc if you want to display the cropped image
            setImageSrc(URL.createObjectURL(blob));
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}
