import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import Board from './Board';
import GameStats from './GameStats';

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameBoardProps {
  handleGameFinish: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ handleGameFinish }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);

  const cardContents = [
    '🍎', '🍌', '🍇', '🍒', '🍍', '🍓', '🍑', '🍉',
    '🍋', '🍈', '🍏', '🍐', '🍊', '🥭', '🥥', '🍅',
    '🍆', '🥑', '🥝', '😀', '😃', '😄', '😁', '😆',
    '😅', '😂', '🤣', '😊', '😇', '🙂'
  ];

  const initializeCards = (tileCount: number) => {
    const selectedContents = cardContents.slice(0, tileCount / 2);
    const pairedContents = [...selectedContents, ...selectedContents];
    const shuffledCards = pairedContents
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
  };

  const handleCardClick = (clickedCardId: number) => {
    const clickedCard = cards.find((card) => card.id === clickedCardId);

    if (!clickedCard || flippedCards.length === 2 || clickedCard.isFlipped || clickedCard.isMatched) return;

    const updatedFlippedCards = [...flippedCards, { ...clickedCard, isFlipped: true }];
    setFlippedCards(updatedFlippedCards);

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    if (updatedFlippedCards.length === 2) {
      setTimeout(() => checkForMatch(updatedFlippedCards), 1000);
    }
  };

  const checkForMatch = (flippedCards: Card[]) => {
    const [firstCard, secondCard] = flippedCards;

    incrementAttempts();

    if (firstCard.content === secondCard.content) {
      incrementMatchedPairs();
      const updatedCards = cards.map((card) =>
        card.id === firstCard.id || card.id === secondCard.id
          ? { ...card, isMatched: true }
          : card
      );
      setCards(updatedCards);

      if (updatedCards.every((card) => card.isMatched)) {
        handleGameFinish();
      }
    } else {
      const updatedCards = cards.map((card) =>
        card.id === firstCard.id || card.id === secondCard.id
          ? { ...card, isFlipped: false }
          : card
      );
      setCards(updatedCards);
    }
    setFlippedCards([]);
  };

  const { tileCount, incrementAttempts, incrementMatchedPairs, attempts, elapsedTime, matchedPairs } = useGameStore();

  useEffect(() => {
    initializeCards(tileCount);
  }, [tileCount]);

  return (
    <div>
      <GameStats attempts={attempts} elapsedTime={elapsedTime} matchedPairs={matchedPairs} />
      <Board cards={cards} onCardClick={handleCardClick} />
      <button className="end-button" onClick={handleGameFinish}>End Game</button>
    </div>
  );
};

export default GameBoard;