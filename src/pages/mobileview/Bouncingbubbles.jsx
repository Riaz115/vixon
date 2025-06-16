import React, { useEffect, useRef } from "react";

const BouncingBall = ({ on, setOn }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    let ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 34.5,
      color: "#36C6FA",
      xVelocity: 1.5,
      yVelocity: 1.5,
    };

    const drawBall = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.beginPath();
      c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
      c.fillStyle = ball.color;
      c.fill();
    };

    const container = canvas.parentElement;

    // Set canvas size to fit the container precisely
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      // Redraw the ball on resize to avoid a blank canvas
      drawBall();
    };
    resizeCanvas();



    const updateBallPosition = () => {
      // Bounce off the walls
      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.xVelocity = -ball.xVelocity;
      }
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.yVelocity = -ball.yVelocity;
      }

      ball.x += ball.xVelocity;
      ball.y += ball.yVelocity;
    };

    const animate = () => {
      updateBallPosition();
      drawBall();
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resizeCanvas);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      className="h-[70vh] w-[760px] border  border-2  shadow-2xl border-[#AAAAAA]   mx-4 rounded-xl"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      ></canvas>
      <h1
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "grey",
          textAlign: "center",
          fontSize: "1rem",
        }}
        className="w-full px-20 "
      >
        Čaká sa na <span className="font-bold">skenovanie</span> vernostnej karty...
      </h1>
      {/* <button   style={{
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
      
        }}
        disabled={on}
        onClick={() => setOn(true)} 
         className={`text-center ${on===false?"":"bg-[#36C6FA] text-white"} py-2 w-[200px] rounded-md border`}>
        Pokračovať skenovanie
      </button> */}
    </div>
  );
};

export default BouncingBall;
