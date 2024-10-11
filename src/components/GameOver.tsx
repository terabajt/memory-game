import React from 'react';
import DifficultySelector from './DifficultySelector';
import GameStats from './GameStats';

interface GameOverProps {
  attempts: number;
  elapsedTime: number;
  matchedPairs: number;
  roundHistory: { playerName: string; attempts: number; elapsedTime: number }[];
  setTileCount: (count: number) => void;
  playerNameInput: string;
  setPlayerNameInput: (name: string) => void;
  handleStartGame: () => void;
}

const GameOver: React.FC<GameOverProps> = ({
  attempts,
  elapsedTime,
  matchedPairs,
  roundHistory,
  setTileCount,
  playerNameInput,
  setPlayerNameInput,
  handleStartGame,
}) => {
  const sortedRoundHistory = [...roundHistory].sort((a, b) => {
    if (a.elapsedTime === b.elapsedTime) {
      return b.attempts - a.attempts;
    }
    return a.elapsedTime - b.elapsedTime;
  });

  return (
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
          {sortedRoundHistory.map((round, index) => (
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
  );
};

export default GameOver;