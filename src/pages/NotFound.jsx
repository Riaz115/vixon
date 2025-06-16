import React, { useEffect } from "react";
import "./css/notFound.css";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  useEffect(() => {
    const visual = document.getElementById("visual");
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = 45 / (width / height);
      visual.style.transform =
        "translate(-50%, -50%) rotate(-" + ratio + "deg)";
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to handleResize
    return () => window.removeEventListener("resize", handleResize); // Cleanup function
  }, []);

  return (
    <div className="not-found-container">
      <div onClick={() => history.back()} className="home-btn cursor-pointer">
        <svg
          height="0.8em"
          width="0.8em"
          viewBox="0 0 2 1"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="#777777"
            strokeWidth="0.1"
            points="0.9,0.1 0.1,0.5 0.9,0.9"
          />
        </svg>{" "}
        Home
      </div>
      <div className="background-wrapper">
        <h1 id="visual">404</h1>
      </div>
      <p className="page-text">The page you’re looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
