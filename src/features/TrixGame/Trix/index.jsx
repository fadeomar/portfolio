import React, { useState, useEffect } from "react";
import TrixUI from "./TrixUI";

const initialGroundStatus = {
  a: { started: false, top: "a-10", bottom: "a-10" },
  b: { started: false, top: "b-10", bottom: "b-10" },
  c: { started: false, top: "c-10", bottom: "c-10" },
  d: { started: false, top: "d-10", bottom: "d-10" },
};

const Trix = ({ players, userIndex, onFinish, log: _log }) => {
  const [ground1Status, setGround1Status] = useState(initialGroundStatus);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  // const [log, setLog] = useState([..._log]);
  const [log, setLog] = useState([]);
  const [playerHands, setPlayerHands] = useState(players);
  const [groundCards, setGroundCards] = useState([]);
  const [finishOrder, setFinishOrder] = useState([]);

  const addLog = (message) => setLog((prevLog) => [...prevLog, message]);

  const isPlayable = (hand, suit) => {
    const card = hand.find(
      (card) =>
        card === ground1Status[suit].top || card === ground1Status[suit].bottom
    );
    return card;
  };

  const getPlayableCards = (hand) => {
    return hand.filter((card) => {
      const [suit] = card.split("-");
      return (
        card === ground1Status[suit]?.top ||
        card === ground1Status[suit]?.bottom
      );
    });
  };

  const playCard = (playerIndex, card) => {
    const [suit, rank] = card.split("-");
    const updatedHands = [...playerHands];
    updatedHands[playerIndex] = updatedHands[playerIndex].filter(
      (c) => c !== card
    );
    setGroundCards((oldCards) => [...oldCards, card]);
    if (
      updatedHands[playerIndex].length === 0 &&
      !finishOrder.includes(playerIndex)
    ) {
      setFinishOrder((prevOrder) => [...prevOrder, playerIndex]);
    }
    const updatedGround = { ...ground1Status };
    if (updatedGround[suit].top.split("-")[1] === rank) {
      updatedGround[suit].top = `${suit}-${rank - -1}`;
    }

    if (updatedGround[suit].bottom.split("-")[1] === rank) {
      updatedGround[suit].bottom = `${suit}-${rank - 1}`;
    }

    setPlayerHands(updatedHands);
    setGround1Status(updatedGround);
    addLog(`Player ${playerIndex + 1} played ${card}`);
  };

  const handleTurn = () => {
    const hand = playerHands[currentPlayer];
    const playableCards = Object.keys(ground1Status).reduce((acc, suit) => {
      const hasCard = isPlayable(hand, suit);
      return !!hasCard ? [...acc, hasCard] : acc;
    }, []);

    if (playableCards.length > 0) {
      if (currentPlayer === userIndex) {
        return; // User's turn: highlight playable cards and wait for their choice
      } else {
        playCard(currentPlayer, playableCards[0]);
      }
    }

    // No playable cards; skip turn
    addLog(`Player ${currentPlayer + 1} skipped their turn.`);
    moveToNextPlayer();
  };

  const moveToNextPlayer = () => {
    const nextPlayer = (currentPlayer + 1) % 4;
    setCurrentPlayer(nextPlayer);
  };

  const handleUserPlay = (card) => {
    playCard(userIndex, card);
    moveToNextPlayer();
  };
  let interval;
  useEffect(() => {
    const hand = playerHands[currentPlayer];
    const playableCards = Object.keys(ground1Status).reduce((acc, suit) => {
      const hasCard = isPlayable(hand, suit);
      return !!hasCard ? [...acc, hasCard] : acc;
    }, []);
    interval = setInterval(() => {
      if (currentPlayer === userIndex && playableCards.length === 0) {
        handleTurn();
      }
      if (currentPlayer !== userIndex) {
        handleTurn();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPlayer, playerHands]);

  useEffect(() => {
    const value = (str) => Number(str.split("-")[1]);
    if (
      // Object.values(groundStatus).every((status) => status.current === null)
      Object.values(ground1Status).every(
        (status) =>
          status?.top &&
          status?.bottom &&
          value(status.top) > 13 &&
          value(status.bottom) < 1
      )
    ) {
      addLog("Game over!");
      console.log("players Order ===> ", finishOrder);
      clearInterval(interval);
      onFinish(); // Notify parent component
    }
  }, [ground1Status]);

  return (
    <div className="sorting-game">
      <TrixUI
        log={log}
        playerCards={playerHands[userIndex]}
        currentPlayer={currentPlayer}
        userIndex={userIndex}
        canPlayCard={(card) =>
          getPlayableCards(playerHands[userIndex]).includes(card)
        }
        onCardClick={(card) => {
          return (
            userIndex === currentPlayer &&
            getPlayableCards(playerHands[userIndex]).includes(card) &&
            handleUserPlay(card)
          );
        }}
        groundCards={groundCards}
      />
    </div>
  );
};

export default Trix;
