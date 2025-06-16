import React from "react";

export default function SelectColor({ heading, color, onColorChange }) {
  const handleInputChange = (e) => {
    const value = e.target.value;
    onColorChange(value);
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    onColorChange(value);
  };

  return (
    <div>
      {heading && <p className='text-[14.4px] text-[#656565] leading-6 font-normal mb-1'>{heading}</p>}
      <div className='flex gap-3 items-center'>
        <div className='h-10 w-10 shadow rounded-md'>
          <input type='color' className='w-full h-full rounded-md' value={color} onChange={handleColorChange} />
        </div>
        <div className='w-full'>
          <input
            type='text'
            className='border border-[#D5D5DD] py-2 px-3 w-full focus:outline-none rounded-md'
            value={color}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}
