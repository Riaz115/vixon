export default function IosSwitch() {
    const [isOn, setIsOn] = React.useState(false);
  
    const toggleSwitch = () => {
      setIsOn(!isOn);
    };
  
    return (
      <div
        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
          isOn ? "bg-green-500" : "bg-gray-300"
        } cursor-pointer`}
        onClick={toggleSwitch}
      >
        <span
          className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full transition-transform transform ${
            isOn ? "translate-x-5 bg-white" : "translate-x-0 bg-white"
          }`}
        ></span>
      </div>
    );
  }
  