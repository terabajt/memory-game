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
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [playerNameInput, setPlayerNameInput] = useState<string>('');

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
    setGameFinished(false);
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
        setGameFinished(true);
        endGame();
        updateRoundHistory();
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

  const { attempts, elapsedTime, gameStarted, startGame, endGame, tileCount, setTileCount, set, incrementAttempts, incrementMatchedPairs, matchedPairs, roundHistory, updateRoundHistory, loadRoundHistory, setPlayerName, resetGame } = useGameStore();

  useEffect(() => {
    initializeCards(tileCount);
  }, [tileCount]);

  useEffect(() => {
    loadRoundHistory();
  }, []);

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
    updateRoundHistory();
    setGameFinished(true);
  };

  const handleStartGame = () => {
    resetGame();
    setPlayerName(playerNameInput);
    initializeCards(tileCount); // Initialize cards when starting a new game
    startGame();
  };

  return (
    <div className="memory-game">
      {!gameStarted && !gameFinished ? (
        <div>
          <DifficultySelector setTileCount={setTileCount} disabled={gameStarted} />
          <input
            type="text"
            placeholder="Enter player name"
            value={playerNameInput}
            onChange={(e) => setPlayerNameInput(e.target.value)}
          />
          <button className="start-button" onClick={handleStartGame}>Start Game</button>
        </div>
      ) : gameFinished ? (
        <div>
          <h2>Congratulations! You've found all pairs!</h2>
          <GameStats attempts={attempts} elapsedTime={elapsedTime} matchedPairs={matchedPairs} />
          <h3>Round History</h3>
          <table>
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Attempts</th>
                <th>Elapsed Time</th>
              </tr>
            </thead>
            <tbody>
              {roundHistory.map((round, index) => (
                <tr key={index}>
                  <td>{round.playerName}</td>
                  <td>{round.attempts}</td>
                  <td>{round.elapsedTime} seconds</td>
                </tr>
              ))}
            </tbody>
          </table>
          <DifficultySelector setTileCount={setTileCount} disabled={false} />
          <input
            type="text"
            placeholder="Enter player name"
            value={playerNameInput}
            onChange={(e) => setPlayerNameInput(e.target.value)}
          />
          <button className="start-button" onClick={handleStartGame}>Start New Game</button>
        </div>
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