import { IoIosInformationCircleOutline } from "react-icons/io";
export default function Heading_Description({ heading, description, infoIcon }) {
  return (
    <div className='pb-2'>
      {heading && (
        <p className='text-[19.2px] text-[#333333] leading-6 font-semibold flex gap-1'>
          {heading}
          {infoIcon && <IoIosInformationCircleOutline />}
        </p>
      )}
      {description && <p className='text-[14.4px] text-[#656565] leading-6 font-normal'>{description}</p>}
    </div>
  );
}
