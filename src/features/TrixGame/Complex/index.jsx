import React, { useState, useEffect } from "react";
import ComplexUI from "./ComplexUI";

const initialGroundStatus = {
  p1: [],
  p2: [],
  p3: [],
  p4: [],
  currentRound: [],
};

function getHighestPlayerIdByType(arr, type) {
  // Filter the array to include only cards that start with the specified type
  const filtered = arr.filter((item) => item.card.startsWith(type + "-"));

  // Find the playerId of the card with the highest numeric value for the given type
  const highest = filtered.reduce(
    (max, item) => {
      const cardValue = parseInt(item.card.split("-")[1], 10); // Extract the numeric part of the card
      return cardValue > max.value
        ? { playerId: item.playerId, value: cardValue }
        : max;
    },
    { playerId: null, value: -Infinity }
  );

  return highest.playerId;
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

const getBestCard = ({ cards, type }) => {
  const sortedCards = sortByLetterAndNumber(cards);
  if (type) {
    const firstCardSameTypeIndex = sortedCards.findIndex((item) =>
      item.includes(type)
    );
    if (firstCardSameTypeIndex > -1) {
      return { card: cards[firstCardSameTypeIndex] };
    }
  }

  let categorizedByType = sortedCards.reduce(
    (total, item) => {
      if (item.includes("a")) total.a++;
      else if (item.includes("b")) total.b++;
      else if (item.includes("c")) total.c++;
      else if (item.includes("d")) total.d++;
      return total;
    },
    { a: 0, b: 0, c: 0, d: 0 }
  );

  // Find the smallest letter with a non-zero value
  let smallest = Object.keys(categorizedByType).reduce(
    (smallestKey, currentKey) => {
      let smallestValue = categorizedByType[smallestKey];
      let currentValue = categorizedByType[currentKey];
      return currentValue > 0 &&
        (smallestValue === 0 || currentValue < smallestValue)
        ? currentKey
        : smallestKey;
    }
  );

  const bestCardIndex = cards.findIndex((item) => item.includes(smallest));
  return { card: cards[bestCardIndex], cardIndex: bestCardIndex };
};

const Complex = ({ players, userIndex, onFinish }) => {
  const [ground1Status, setGround1Status] = useState(initialGroundStatus);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [log, setLog] = useState([]);
  const [playerHands, setPlayerHands] = useState(players);
  const [groundCards, setGroundCards] = useState([]);
  const [finishOrder, setFinishOrder] = useState([]);

  // new
  const [roundType, setRoundType] = useState(null);
  const [groundRoundStatus, setGroundRoundStatus] = useState([]);

  useEffect(() => {
    console.log({ groundRoundStatus, length: groundRoundStatus.length });
    if (groundRoundStatus.length === 4) {
      const leaderIndex = getHighestPlayerIdByType(
        groundRoundStatus,
        roundType
      );
      setCurrentPlayer(leaderIndex);
      setRoundType(null);
      setGroundRoundStatus([]);
    }
  }, [groundRoundStatus.length]);

  const addLog = (message) => setLog((prevLog) => [...prevLog, message]);

  const getPlayableCards2 = (hand) => {
    if (currentPlayer === userIndex && !roundType) {
      return hand;
    }
    const cardsWithSameType = hand.filter((card) => {
      return card.includes(roundType);
    });
    if (cardsWithSameType.length === 0) {
      return hand;
    }
    return cardsWithSameType;
  };

  const playCardTest = (playerIndex, card) => {
    const [suit, rank] = card.split("-");
    if (!roundType) {
      setRoundType(suit);
    }
    const updatedHands = [...playerHands];
    updatedHands[playerIndex] = updatedHands[playerIndex].filter(
      (c) => c !== card
    );

    setGroundRoundStatus((old) => {
      console.log({ old });
      return [...old, { playerId: playerIndex, card }];
    });
    setPlayerHands(updatedHands);

    console.log("5555555");
  };

  const handleTurn = () => {
    const hand = playerHands[currentPlayer];

    if (currentPlayer === userIndex) {
      return; // User's turn: highlight playable cards and wait for their choice
    } else {
      const { card } = getBestCard({ cards: hand, type: roundType });
      playCardTest(currentPlayer, card);
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
    playCardTest(userIndex, card);
    moveToNextPlayer();
  };
  let interval;
  useEffect(() => {
    interval = setInterval(() => {
      handleTurn();
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPlayer, playerHands]);

  useEffect(() => {
    const value = (str) => Number(str.split("-")[1]);
    if (
      ground1Status.p1.length +
        ground1Status.p2.length +
        ground1Status.p3.length +
        ground1Status.p4.length ===
      52
    ) {
      addLog("Game over!");
      clearInterval(interval);
      onFinish(); // Notify parent component
    }
  }, [ground1Status]);

  return (
    <div className="sorting-game">
      <ComplexUI
        log={log}
        playerCards={playerHands[userIndex]}
        currentPlayer={currentPlayer}
        userIndex={userIndex}
        canPlayCard={(card) => {
          // getPlayableCards(playerHands[userIndex]).includes(card);
          return getPlayableCards2(playerHands[userIndex]).includes(card);
        }}
        onCardClick={(card) => {
          return (
            userIndex === currentPlayer &&
            getPlayableCards2(playerHands[userIndex]).includes(card) &&
            handleUserPlay(card)
          );
        }}
        groundCards={groundCards}
      />
    </div>
  );
};

export default Complex;
