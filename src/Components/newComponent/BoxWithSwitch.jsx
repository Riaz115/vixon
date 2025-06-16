export default function BoxWithSwitch({ description, infoIcon }) {
    //   const [isOn, setIsOn] = React.useState(false);
    return (
      <div className='border border-[#D5D5DD] bg-[#F7F7F8] py-3 px-3 flex justify-between items-center gap-4 rounded-md'>
        <p className='text-[16px] text-[#333333] flex gap-1'>
          {description}
          {infoIcon && <IoIosInformationCircleOutline />}
        </p>
        <IosSwitch />
      </div>
    );
  }