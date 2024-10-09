import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import './styles/App.scss';

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const App: React.FC = () => {

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

    if (firstCard.content === secondCard.content) {

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

  return (
    <div className="app">
      <div className="board-container">
        <h1>Memory Game</h1>
        <Board cards={cards} onCardClick={handleCardClick} />
        <button className="reset-button" onClick={initializeCards}>Reset Game</button>
      </div>

    </div>
  );
};

export default App;
