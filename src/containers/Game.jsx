import React, { useRef, useEffect, useState } from "react";
import FocusTrap from "focus-trap-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addScore } from "../slices/scoreSlice";

const Game = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [score, setScore] = useState(1);
  const [lastDirection, setLastDirection] = useState(null);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const CANVAS = {
    width: Math.floor((dimensions.width * 0.8) / 20) * 20,
    height: Math.floor((dimensions.height * 0.9) / 20) * 20,
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

  const [food, setFood] = useState([]);

  const [intervalSpeed, setIntervalSpeed] = useState(400);
  const [intervalId, setIntervalId] = useState(null);

  const [gameOver, setGameOver] = useState(false);

  const canvasRef = useRef(null);
  const ctx = useRef(null);

  function addSquare(index) {
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
  }

  function follow() {
    let tmpSnake = snake;
    for (let i = 1; i < tmpSnake.length; i++) {
      ctx.current.clearRect(
        tmpSnake[i].x,
        tmpSnake[i].y,
        SQUARE_SIZE,
        SQUARE_SIZE
      );
      tmpSnake[i].lastPosition.x = tmpSnake[i].x;
      tmpSnake[i].lastPosition.y = tmpSnake[i].y;
      tmpSnake[i].x = tmpSnake[i - 1].lastPosition.x;
      tmpSnake[i].y = tmpSnake[i - 1].lastPosition.y;
      ctx.current.fillStyle = "green";
      ctx.current.fillRect(
        tmpSnake[i].x,
        tmpSnake[i].y,
        SQUARE_SIZE,
        SQUARE_SIZE
      );
    }
    setSnake(tmpSnake);
  }

  function move(direction) {
    if (
      (direction === "ArrowUp" && lastDirection !== "ArrowDown") ||
      (direction === "ArrowDown" && lastDirection !== "ArrowUp") ||
      (direction === "ArrowLeft" && lastDirection !== "ArrowRight") ||
      (direction === "ArrowRight" && lastDirection !== "ArrowLeft")
    ) {
      clearInterval(intervalId);
      let tmpSnake = snake;
      setIntervalId(
        setInterval(() => {
          const snakeHead = tmpSnake[0];
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
          ctx.current.fillStyle = "green";
          ctx.current.fillRect(
            snakeHead.x,
            snakeHead.y,
            SQUARE_SIZE,
            SQUARE_SIZE
          );
          tmpSnake[0].lastPosition.x = tmpSnake[0].x;
          tmpSnake[0].lastPosition.y = tmpSnake[0].y;
          tmpSnake[0].x = snakeHead.x;
          tmpSnake[0].y = snakeHead.y;
          setSnake(tmpSnake);
          checkCollision();
          checkFoodCollision();
          follow();
          if (randomize(0, 100, 1) <= 70 && food.length <= 15) {
            spawnFood();
          }
        }, intervalSpeed)
      );
    }
  }

  function checkFoodCollision() {
    const snakeHead = snake[0];
    for (let i = 0; i < food.length; i++) {
      if (snakeHead.x === food[i].x && snakeHead.y === food[i].y) {
        addSquare(snake.length);
        setScore(score + 1);
        const tmpFood = food;
        tmpFood.splice(i, 1);
      }
    }
  }

  function checkCollision() {
    const snakeHead = snake[0];
    if (
      snakeHead.x < 0 ||
      snakeHead.x > CANVAS.width ||
      snakeHead.y < 0 ||
      snakeHead.y > CANVAS.height ||
      snake.filter((s) => s.x === snakeHead.x && s.y === snakeHead.y).length > 1
    ) {
      clearInterval(intervalId);
      setGameOver(true);
    }
  }

  const randomize = (min, max, step) => {
    return Math.floor((Math.random() * (max - min) + min) / step) * step;
  };

  function spawnFood() {
    const tmpFood = {
      x: randomize(0, CANVAS.width, SQUARE_SIZE),
      y: randomize(0, CANVAS.width, SQUARE_SIZE),
    };
    const tmpFoodArray = food;
    tmpFoodArray.push(tmpFood);
    setFood(tmpFoodArray);
    ctx.current.fillStyle = "red";
    ctx.current.fillRect(tmpFood.x, tmpFood.y, SQUARE_SIZE, SQUARE_SIZE);
  }

  function handleKeyDown(e) {
    if (e.code !== lastDirection) {
      setLastDirection(e.code);
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
          move(lastDirection);
          break;
      }
    }
  }

  function handleSubmit() {
    dispatch(
      addScore({
        score: {
          id: new Date().getTime(),
          name: name,
          points: score,
        },
      })
    );
    navigate("/score");
  }

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext("2d");
      ctx.current.fillStyle = "green";
      ctx.current.fillRect(snake[0].x, snake[0].y, SQUARE_SIZE, SQUARE_SIZE);
    }

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    setIntervalSpeed(400 / (score/2));
    if (food.length <= 15) {
      for (let index = 0; index < randomize(1, 5, 1); index++) {
        spawnFood();
      }
    }
  }, [score]);

  return (
    <>
      {gameOver ? (
        <>
          <h1>Game Over !!!</h1>
          <h2>Score {score}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (name === "") {
                alert("Veuillez entrer un nom");
              } else {
                handleSubmit();
              }
            }}
          >
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input type="submit" value="Ajouter aux scores" />
          </form>
        </>
      ) : (
        <div id="game">
          <FocusTrap
            focusTrapOptions={{
              fallbackFocus: "#canvas",
              clickOutisdeDeactivates: true,
            }}
          >
            <canvas
              id="canvas"
              style={{
                border: "1px solid #000",
              }}
              width={CANVAS.width}
              height={CANVAS.height}
              ref={canvasRef}
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </FocusTrap>
          <h2>Score : {score}</h2>
        </div>
      )}
    </>
  );
};

export default Game;
