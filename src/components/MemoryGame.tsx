import React, { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import GameBoard from './GameBoard';
import GameOver from './GameOver';
import GameSetup from './GameSetup';

const MemoryGame: React.FC = () => {
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [playerNameInput, setPlayerNameInput] = useState<string>('');

  const { attempts, elapsedTime, gameStarted, startGame, endGame, setTileCount, set, roundHistory, loadRoundHistory, setPlayerName, resetGame } = useGameStore();

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
    setGameFinished(true);
  };

  const handleStartGame = () => {
    resetGame();
    setPlayerName(playerNameInput);
    startGame();
    setGameFinished(false);
  };

  return (
    <div className="memory-game">
      {!gameStarted && !gameFinished ? (
        <GameSetup
          playerNameInput={playerNameInput}
          setPlayerNameInput={setPlayerNameInput}
          setTileCount={setTileCount}
          handleStartGame={handleStartGame}
        />
      ) : gameFinished ? (
        <GameOver
          attempts={attempts}
          elapsedTime={elapsedTime}
          matchedPairs={roundHistory.length}
          roundHistory={roundHistory}
          setTileCount={setTileCount}
          playerNameInput={playerNameInput}
          setPlayerNameInput={setPlayerNameInput}
          handleStartGame={handleStartGame}
        />
      ) : (
        <GameBoard handleGameFinish={handleGameFinish} />
      )}
    </div>
  );
};

export default MemoryGame;