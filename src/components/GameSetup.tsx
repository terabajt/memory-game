import React from 'react';
import DifficultySelector from './DifficultySelector';

interface GameSetupProps {
  playerNameInput: string;
  setPlayerNameInput: (name: string) => void;
  setTileCount: (count: number) => void;
  handleStartGame: () => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ playerNameInput, setPlayerNameInput, setTileCount, handleStartGame }) => {
  return (
    <div>
      <DifficultySelector setTileCount={setTileCount} disabled={false} />
      <input
        type="text"
        placeholder="Enter player name"
        value={playerNameInput}
        onChange={(e) => setPlayerNameInput(e.target.value)}
      />
      <button className="start-button" onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default GameSetup;