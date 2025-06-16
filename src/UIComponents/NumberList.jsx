import React from "react";

export default function NumberList({ heading, number, selectedNumber, onSelectNumber }) {
  const handleNumberClick = (index) => {
    onSelectNumber(index + 1);
  };

  const items = [];
  for (let i = 0; i < number; i++) {
    items.push(
      <div
        key={i}
        className={`text-xs w-[39px] h-[39px] flex items-center justify-center rounded-full cursor-pointer ${
          i < selectedNumber ? "bg-black text-white" : "bg-white border border-gray-300"
        }`}
        onClick={() => handleNumberClick(i)}
      >
        {i + 1}
      </div>
    );
  }

  return (
    <div className='border-gray-300'>
      <span className='text-lg font-medium'>{heading}</span>
      <div className='flex gap-1 my-2 flex-wrap mt-3'>{items}</div>
    </div>
  );
}
