import Confetti from 'react-confetti';
import DifficultySelector from '../DifficultySelector';
import GameStats from '../GameStats';
import './style.scss';

type GameOverProps = {
    attempts: number;
    elapsedTime: number;
    matchedPairs: number;
    roundHistory: {
        playerName: string;
        attempts: number;
        elapsedTime: number;
        matchedPairs: number;
    }[];
    setTileCount: (count: number) => void;
    playerNameInput: string;
    setPlayerNameInput: (name: string) => void;
    handleStartGame: () => void;
};

const GameOver = ({
    attempts,
    elapsedTime,
    matchedPairs,
    roundHistory,
    setTileCount,
    playerNameInput,
    setPlayerNameInput,
    handleStartGame,
}: GameOverProps) => {
    const sortedRoundHistory = [...roundHistory].sort((a, b) => {
        if (b.matchedPairs === a.matchedPairs) {
            return a.elapsedTime - b.elapsedTime;
        }
        return b.matchedPairs - a.matchedPairs;
    });

    return (
        <div>
            <Confetti />
            <h2>Congratulations! You've found all pairs!</h2>
            <div className="container">
                <DifficultySelector setTileCount={setTileCount} disabled={false} />
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter player name"
                        value={playerNameInput}
                        onChange={e => setPlayerNameInput(e.target.value)}
                    />
                </div>
                <button className="start-button" onClick={handleStartGame}>
                    Start Game
                </button>
            </div>
            <GameStats attempts={attempts} elapsedTime={elapsedTime} matchedPairs={matchedPairs} />
            <h3>Round History</h3>
            <table className="round-history">
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Attempts</th>
                        <th>Elapsed Time</th>
                        <th>Matched Pairs</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRoundHistory.map((round, index) => (
                        <tr key={index}>
                            <td>{round.playerName}</td>
                            <td>{round.attempts}</td>
                            <td>{round.elapsedTime} seconds</td>
                            <td>{round.matchedPairs}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GameOver;
