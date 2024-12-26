import "../style.css";
import { getCardSymbol } from "../cardsNames";
import Table from "./Table";

function containsRedSymbols(str) {
  // return str.includes("♥") && str.includes("♦");
  // return str.includes("a") && str.includes("b");
  const hasA = str.includes("a");
  const hasB = str.includes("b");
  return hasA || hasB;
}

function sortByFirstLetter(arr) {
  return arr.sort((a, b) => a[0].localeCompare(b[0]));
}

function sortByLetterAndNumber(arr) {
  return arr.sort((a, b) => {
    // Extract the letter and number from each string
    const [letterA, numberA] = a.split("-");
    const [letterB, numberB] = b.split("-");

    // First, compare by letter
    const letterComparison = letterA.localeCompare(letterB);
    if (letterComparison !== 0) {
      return letterComparison;
    }

    // If letters are the same, compare numerically
    return parseInt(numberA, 10) - parseInt(numberB, 10);
  });
}
const TrixUI = ({
  log,
  playerCards,
  currentPlayer,
  userIndex,
  onCardClick,
  canPlayCard,
  groundCards,
}) => {
  return (
    <div className="game-table">
      <div className="log-section">
        <p>
          Current Player:{" "}
          {currentPlayer === userIndex ? "You" : `Player ${currentPlayer + 1}`}
        </p>
        <p>{log[log.length - 1]}</p>
      </div>
      <div className="player top-player">
        <div className="player-info">
          <div className="player-icon">👤</div>
          <div className="player-name">Player 2</div>
          <div className="player-score">Score: 20</div>
        </div>
        <div className="cards back-cards">
          <div className="card back"></div>
          <div className="card back"></div>
          <div className="card back"></div>
        </div>
      </div>

      <div className="player left-player">
        <div className="player-info">
          <div className="player-icon">👤</div>
          <div className="player-name">Player 3</div>
          <div className="player-score">Score: 15</div>
        </div>
        <div className="cards back-cards vertical">
          <div className="card back"></div>
          <div className="card back"></div>
          <div className="card back"></div>
        </div>
      </div>

      <Table groundCards={groundCards} />

      <div className="player right-player">
        <div className="player-info">
          <div className="player-icon">👤</div>
          <div className="player-name">Player 4</div>
          <div className="player-score">Score: 10</div>
        </div>
        <div className="cards back-cards vertical">
          <div className="card back"></div>
          <div className="card back"></div>
          <div className="card back"></div>
        </div>
      </div>

      <div className="player bottom-player">
        <div className="cards">
          {/* <div className="card">{getCardSymbol("c-13")}</div>
          <div className="card">K♥</div>
          <div className="card">Q♦</div>
          <div className="card">J♣</div> */}
          {playerCards.length &&
            sortByLetterAndNumber(playerCards).map((card) => {
              return (
                <div
                  className={
                    containsRedSymbols(card) ? "card text-red-500" : "card"
                  }
                  style={{
                    border: canPlayCard(card) ? "2px solid green" : "none",
                  }}
                  key={card}
                  onClick={() => onCardClick(card)}
                >
                  {getCardSymbol(card)}
                </div>
              );
            })}
        </div>
        <div className="player-info">
          <div className="player-icon">👤</div>
          <div className="player-name">You</div>
          <div className="player-score">Score: 30</div>
        </div>
      </div>
    </div>
  );
};

export default TrixUI;
