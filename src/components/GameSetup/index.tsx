import '../../App.scss';
import DifficultySelector from '../DifficultySelector';

type GameSetupProps = {
    playerNameInput: string;
    setPlayerNameInput: (name: string) => void;
    setTileCount: (count: number) => void;
    handleStartGame: () => void;
};

const GameSetup = ({
    playerNameInput,
    setPlayerNameInput,
    setTileCount,
    handleStartGame,
}: GameSetupProps) => {
    return (
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
    );
};

export default GameSetup;
