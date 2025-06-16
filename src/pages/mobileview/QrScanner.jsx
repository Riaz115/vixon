import React from "react";
// import Group from "../../../public/assets/Group.png";

const QrScanner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full sm:w-[24rem] h-screen sm:h-[50vh] bg-white rounded-lg shadow-md">
        <div className="text-center flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 mt-10 pl-2 md:mt-1">
            <span className="text-black">VEX</span>
            <span className="text-[#36C6FA]">i</span>ON{" "}
            <span className="text-[#36C6FA]">cards</span>
          </h1>
          <button className="mr-4 mt-7 w-[5px] h-[5px] sm:none">
            <img src="/assets/Group.png" alt="" className="object-contain w-full h-full" />
          </button>
        </div>

        {/* Border Div */}
        <div className="border-2 border-red-500 border-t-2 rounded-2xl  sm:border-none mt-10 flex flex-col items-center h-screen">
          {/* Box with fixed width and height */}
          <div className="flex justify-center">
  <div title="qwer" style={{width: "200px"}} className="test text-center my-3 border-2 px-9 py-2 box-border bg-gray-200">
    sdsdsd
  </div>
</div>


          {/* QR Code with spacing */}
          <div className="mt-4 h">
            <img src="/assets/Frame.png" alt="QR Code" className="h-auto w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrScanner;
