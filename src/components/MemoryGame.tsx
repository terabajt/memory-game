import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import Board from './Board';
import DifficultySelector from './DifficultySelector';
import GameStats from './GameStats';

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);

  const cardContents = ['🍎', '🍌', '🍇', '🍒', '🍍', '🍓', '🍑', '🍉'];

  const initializeCards = () => {
    const shuffledCards = [...cardContents, ...cardContents]
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

  useEffect(() => {
    initializeCards();
  }, []);

  const { attempts, elapsedTime, gameStarted, startGame, endGame, tileCount, setTileCount, resetGame, set, incrementAttempts, incrementMatchedPairs, matchedPairs } = useGameStore();

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        set((state) => ({ elapsedTime: Math.floor((Date.now() - state.startTime) / 1000) }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, set]);

  const handleGameFinish = () => {
    endGame();
  };

  return (
    <div className="memory-game">
      <DifficultySelector setTileCount={setTileCount} />
      <GameStats attempts={attempts} elapsedTime={elapsedTime} matchedPairs={matchedPairs} />
      {!gameStarted ? (
        <button className="start-button" onClick={startGame}>Start Game</button>
      ) : (
        <div>
          <Board cards={cards} onCardClick={handleCardClick} />
          <button className="end-button" onClick={handleGameFinish}>End Game</button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;