import React, { useRef, useEffect, useState } from "react";
import FocusTrap from "focus-trap-react";

const Game = () => {
  const CANVAS = {
    width: 1000,
    height: 800,
  };

  const SQUARE_SIZE = 20;

  const [snake, setSnake] = useState([
    {
      x: 200,
      y: 300,
      lastPosition: {
        x: 0,
        y: 0,
      },
    },
  ]);

  const [intervalId, setIntervalId] = useState(null);

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

  function move(direction) {
    setIntervalId(
      setInterval(() => {
        const snakeHead = snake[0];
        snakeHead.lastPosition.x = snakeHead.x;
        snakeHead.lastPosition.y = snakeHead.y;
        ctx.current.clearRect(
          snakeHead.x,
          snakeHead.y,
          SQUARE_SIZE,
          SQUARE_SIZE
        );
        switch (direction) {
          case "ArrowUp":
            snakeHead.y -= SQUARE_SIZE;
            break;
          case "ArrowDown":
            snakeHead.y += SQUARE_SIZE;
            break;
          case "ArrowLeft":
            snakeHead.x -= SQUARE_SIZE;
            break;
          case "ArrowRight":
            snakeHead.x += SQUARE_SIZE;
            break;
          default:
            break;
        }
        ctx.current.fillRect(
          snakeHead.x,
          snakeHead.y,
          SQUARE_SIZE,
          SQUARE_SIZE
        );
      }, 800)
    );
  }

  const handleKeyDown = (e) => {
    clearInterval(intervalId);
    switch (e.code) {
      case "ArrowUp":
        move("ArrowUp");
        break;
      case "ArrowDown":
        move("ArrowDown");
        break;
      case "ArrowLeft":
        move("ArrowLeft");
        break;
      case "ArrowRight":
        move("ArrowRight");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext("2d");
      ctx.current.fillStyle = "green";
      ctx.current.fillRect(snake[0].x, snake[0].y, SQUARE_SIZE, SQUARE_SIZE);
      move("ArrowRight");
    }
  }, []);

  return (
    <>
      <FocusTrap
        id="game"
        focusTrapOptions={{
          fallbackFocus: "#canvas",
          clickOutisdeDeactivates: true,
        }}
      >
        <canvas
          id="canvas"
          style={{
            border: "1px solid #000",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          width={CANVAS.width}
          height={CANVAS.height}
          ref={canvasRef}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </FocusTrap>
    </>
  );
};

export default Game;
