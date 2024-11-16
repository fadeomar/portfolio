import Menu from "./Menu";
import Tetris from "./Tetris";

import { useGameOver } from "../hooks/useGameOver";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  const start = () => resetGameOver();

  return (
    <div className="Game" style={{ marginTop: "76px", height: "100vh" }}>
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </div>
  );
};

export default Game;
