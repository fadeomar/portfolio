import React, { useEffect, useState } from "react";
import * as S from "./style";
import Complex from "./Complex";
import Trix from "./Trix";

const suits = ["a", "b", "c", "d"];
const ranks = Array.from({ length: 13 }, (_, i) => i + 1);

const createDeck = () => {
  const deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push(`${suit}-${rank}`);
    }
  }
  return deck.sort(() => Math.random() - 0.5); // Shuffle the deck
};

const createShuffledDeck = () => {
  const deck = [];
  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      deck.push(`${suit}-${rank}`);
    });
  });

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
};

const distributeCards = (deck) => {
  const players = Array(4)
    .fill([null])
    .map(() => []);
  for (let i = 0; i < deck.length; i++) {
    players[i % 4].push(deck[i]);
  }
  return players;
};

const getPlayableCards = (hand, roundType, roundCards) => {
  if (roundType === "Sorting") {
    const startingCard =
      roundCards.length === 0 ? "11" : roundCards[0].split("-")[1];
    return hand.filter((card) => card.split("-")[1] === startingCard);
  }
  return [];
};

function TrixGame() {
  const [deck, setDeck] = useState([]);
  const [players, setPlayers] = useState([[], [], [], []]);
  const [userIndex, setUserIndex] = useState(0);
  const [sevenCubaHolder, setSevenCubaHolder] = useState(null);
  const [kingdomType, setKingdomType] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [log, setLog] = useState([]);

  useEffect(() => {
    const newDeck = createDeck();
    setDeck(newDeck);
    const distributed = distributeCards(newDeck);
    setPlayers(distributed);

    distributed.forEach((hand, index) => {
      if (hand.includes("a-7")) {
        setSevenCubaHolder(index);
        addLog(`Player ${index + 1} holds 7 Cuba`);
      }
    });
  }, []);

  const addLog = (message) => {
    setLog((prevLog) => [...prevLog, message]);
  };

  const handleKingdomSelection = (type) => {
    setKingdomType(type);
    setGameStarted(true);
    setCurrentPlayer(sevenCubaHolder); // Start with the player holding 7 Cuba
    addLog(`Kingdom selected: ${type}`);
  };

  const aiChooseKingdom = (hand) => {
    const highCards = hand.filter(
      (card) => parseInt(card.split("-")[1], 10) >= 9
    );
    const lowCards = hand.filter(
      (card) => parseInt(card.split("-")[1], 10) <= 5
    );

    const choice = highCards.length > lowCards.length ? "Sorting" : "Avoiding";
    handleKingdomSelection(choice);
  };

  useEffect(() => {
    if (sevenCubaHolder !== null && !gameStarted) {
      if (sevenCubaHolder !== userIndex) {
        setTimeout(() => {
          aiChooseKingdom(players[sevenCubaHolder]);
        }, 1000);
      }
    }
  }, [sevenCubaHolder, gameStarted]);

  return (
    <S.Container>
      <div className="trix-game">
        <header>
          {/* <h1>Trix Game</h1> */}
          {/* <p>Kingdom: {kingdomType || "Not selected yet"}</p> */}
          {/* {gameStarted && (
            <p>
              Current Player:{" "}
              {currentPlayer === userIndex
                ? "You"
                : `Player ${currentPlayer + 1}`}
            </p>
          )} */}
        </header>

        <section className="game-board">
          {sevenCubaHolder !== null && !gameStarted && (
            <div className="kingdom-selection">
              {sevenCubaHolder === userIndex ? (
                <>
                  <h2>You hold the 7 Cuba! Choose a kingdom:</h2>
                  <button onClick={() => handleKingdomSelection("Sorting")}>
                    Sorting
                  </button>
                  <button onClick={() => handleKingdomSelection("Avoiding")}>
                    Avoiding
                  </button>
                </>
              ) : (
                <h2>
                  Waiting for Player {sevenCubaHolder + 1} to choose a
                  kingdom...
                </h2>
              )}
            </div>
          )}
          {gameStarted && (
            <Complex
              players={players}
              userIndex={userIndex}
              onFinish={() => {}}
              //  log={log}
            />
          )}
          {false && gameStarted ? (
            kingdomType === "Sorting" ? (
              <Trix
                players={players}
                userIndex={userIndex}
                onFinish={() => {}}
                //  log={log}
              />
            ) : (
              <Complex
                players={players}
                userIndex={userIndex}
                onFinish={() => {}}
                //  log={log}
              />
            )
          ) : null}
        </section>

        <section className="log-section">
          {/* <h3>Game Log</h3>
          <ul>
            {log.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul> */}
        </section>
      </div>
    </S.Container>
  );
}

export default TrixGame;
