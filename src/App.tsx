import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import './styles/App.scss';

// Definicja interfejsu dla kart
interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const App: React.FC = () => {
  // Inicjujemy stan kart
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);

  // Zawartość kart - możesz ją później dostosować
  const cardContents = ['🍎', '🍌', '🍇', '🍒', '🍍', '🍓', '🍑', '🍉'];

  // Funkcja do tasowania kart i resetowania planszy
  const initializeCards = () => {
    const shuffledCards = [...cardContents, ...cardContents] // Podwajamy, by mieć pary
      .sort(() => Math.random() - 0.5) // Tasujemy karty
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
  };

  // Funkcja uruchamiająca się przy kliknięciu karty
  const handleCardClick = (clickedCardId: number) => {
    const clickedCard = cards.find((card) => card.id === clickedCardId);

    if (!clickedCard || flippedCards.length === 2 || clickedCard.isFlipped || clickedCard.isMatched) return;

    const updatedFlippedCards = [...flippedCards, { ...clickedCard, isFlipped: true }];
    setFlippedCards(updatedFlippedCards);

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    // Sprawdzamy, czy wybrano 2 karty
    if (updatedFlippedCards.length === 2) {
      setTimeout(() => checkForMatch(updatedFlippedCards), 1000); // Małe opóźnienie
    }
  };

  // Sprawdzenie dopasowania kart
  const checkForMatch = (flippedCards: Card[]) => {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.content === secondCard.content) {
      // Dopasowanie kart
      const updatedCards = cards.map((card) =>
        card.id === firstCard.id || card.id === secondCard.id
          ? { ...card, isMatched: true }
          : card
      );
      setCards(updatedCards);
    } else {
      // Karty nie pasują, odwracamy je z powrotem
      const updatedCards = cards.map((card) =>
        card.id === firstCard.id || card.id === secondCard.id
          ? { ...card, isFlipped: false }
          : card
      );
      setCards(updatedCards);
    }
    setFlippedCards([]); // Resetujemy stan odwróconych kart
  };

  // Resetowanie gry
  useEffect(() => {
    initializeCards(); // Inicjalizacja kart przy pierwszym załadowaniu
  }, []);

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <Board cards={cards} onCardClick={handleCardClick} />
      <button className="reset-button" onClick={initializeCards}>Reset Game</button>
    </div>
  );
};

export default App;
