import React from "react";
import { MdFullscreen } from "react-icons/md";
import { RxExitFullScreen } from "react-icons/rx";

const FullScreenToggle = () => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      // IE/Edge
      elem.msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  };

  const toggleFullScreen = () => {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      enterFullScreen();
    } else {
      exitFullScreen();
    }
  };

  return (
    <button onClick={toggleFullScreen}>
      {isFullScreen ? (
        <div className="sm:bg-black bg-white p-2 rounded ">
          <RxExitFullScreen
            className="  sm:text-white text-black text-[35px]"
            onClick={() => setIsFullScreen(false)}
          />
        </div>
      ) : (
        <div className="p-2 rounded">
          <MdFullscreen
            className=" text-white sm:text-black text-[35px]"
            onClick={() => setIsFullScreen(true)}
          />
        </div>
      )}
    </button>
  );
};

export default FullScreenToggle;
