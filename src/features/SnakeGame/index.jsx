import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "./useInterval";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from "./constants";
import "./style.css";
// RECOURSE: https://www.youtube.com/watch?v=OrpJdVP-hO4
const App = () => {
  const canvasRef = useRef();
  const containerRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const moveSnake = ({ keyCode }) => {
    console.log({ keyCode });
    return keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  };
  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "pink";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "lightblue";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  return (
    <div
      role="button"
      tabIndex="0"
      style={{
        display: "flex",
        justifyContent: "center",
        border: "10px solid green",
        marginTop: 76,
      }}
      onKeyDown={(e) => moveSnake(e)}
      ref={containerRef}
    >
      <canvas
        style={{ border: "1px solid white" }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      <div style={{ paddingTop: 160 }}>
        {gameOver && (
          <div
            className="game_over_container"
            onClick={() => {
              setSnake(SNAKE_START);
              setApple(APPLE_START);
              setDir([0, -1]);
              setSpeed(null);
              setGameOver(false);
            }}
          >
            GAME OVER!, try again
          </div>
        )}
        <p style={{ color: "white" }}>score: {snake.length}</p>
        <button
          onClick={startGame}
          style={{ border: "1px solid red", padding: 40, color: "white" }}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default App;
