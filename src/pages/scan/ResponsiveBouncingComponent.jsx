import React, { useEffect, useRef } from "react";

const ResponsiveBouncingComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let ball = {
      x: 0,
      y: 0,
      radius: 0,
      color: "#36C6FA",
      xVelocity: 1.5,
      yVelocity: 1.5,
    };

    // Adjust the canvas size to fit its container and update the ball accordingly
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      // Center the ball and adjust its radius based on container size
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.radius = Math.min(canvas.width, canvas.height) / 17;
      drawBall();
    };

    const drawBall = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = ball.color;
      ctx.fill();
    };

    const updateBallPosition = () => {
      // Reverse direction when the ball collides with the container edges
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

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "50vh", // Adjust as needed based on viewport
        maxWidth: "760px", // Limits width on larger screens
        margin: "0 auto",
        border: "2px solid #AAAAAA",
        borderRadius: "1rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      ></canvas>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "grey",
          fontSize: "1rem",
          textAlign: "center",
          padding: "0 1rem",
        }}
      >
        Čaká sa na <span style={{ fontWeight: "bold" }}>skenovanie</span> vernostnej karty...
      </div>
    </div>
  );
};

export default ResponsiveBouncingComponent;
