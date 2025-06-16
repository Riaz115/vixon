import { IoIosInformationCircleOutline } from "react-icons/io";
import IosSwitch from "./IosSwitch";

export default function BoxWithSwitch1({
  description,
  infoIcon,
  isOn,
  setIsOn,
  name,
}) {
  //   const [isOn, setIsOn] = React.useState(false);
  return (
    <div className="border border-[#D5D5DD] bg-[white] py-3 px-3 flex justify-between items-center gap-4 rounded-md">
      <p className="text-[16px] text-[#333333] flex gap-1">
        {description}
        {infoIcon && <IoIosInformationCircleOutline />}
      </p>
      <IosSwitch isOn={isOn} setIsOn={setIsOn} name={name} />
    </div>
  );
}
