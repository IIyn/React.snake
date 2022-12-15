import React, { useRef, useEffect, useState } from "react";

const Game = () => {
  const CANVAS = {
    width: 1000,
    height: 800,
  };

  const SQUARE_SIZE = 20;

  const [snake, setSnake] = useState([
    {
      x: 50,
      y: 10,
      lastPosition: {
        x: 40,
        y: 10,
      },
    },
  ]);

  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const addSquare = (index) => {
    const tmpSnake = snake;
    snake.push({
      x: snake[index - 1].lastPosition.x,
      y: snake[index - 1].lastPosition.y,
      lastPosition: {
        x: 0,
        y: 0,
      },
    });
    setSnake(tmpSnake);
  };

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext("2d");
    }
  }, []);

  return (
    <>
      <canvas
        style={{
          border: "1px solid #000",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        width={CANVAS.width}
        height={CANVAS.height}
      />
    </>
  );
};

export default Game;
