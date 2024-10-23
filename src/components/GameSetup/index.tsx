import '../../App.scss';
import DifficultySelector from '../DifficultySelector';
import { GameLevel } from '../../store/game.model';
import { useGameStore } from '../../store/game.store';
import { useCallback, useState } from 'react';

const GameSetup = () => {
    const [level, setLevel] = useState<GameLevel>('easy');
    const { startGame, player: currentPlayer } = useGameStore();
    const [playerName, setPlayerName] = useState<string | undefined>(currentPlayer.name);

    const startNewGame = useCallback(() => {
        if (level && playerName?.length) {
            startGame(playerName, level);
        }
    }, [level, playerName, startGame]);

    return (
        <div className="container">
            <DifficultySelector value={level} onDifficultyChange={setLevel} disabled={false} />
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter player name"
                    value={playerName}
                    onChange={e => setPlayerName(e.target.value)}
                />
            </div>
            <button className="start-button" onClick={startNewGame}>
                {/* you could add support for translations, if did it in a past, configuring eg 18n lib is few hours top */}
                Start Game
            </button>
        </div>
    );
};

export default GameSetup;
