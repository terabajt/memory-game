import Confetti from 'react-confetti';
import GameStats from '../GameStats';
import './style.scss';
import { useGameStore } from '../../store/game.store';
import { useCallback } from 'react';

type RoundHistory = {
    playerName: string;
    attempts: number;
    elapsedTime: number;
    matchedPairs: number;
};

type RoundHistoryProps = {
    roundHistory: RoundHistory[];
};

const sortByTime = (items: RoundHistory[]) =>
    items.sort((a, b) => {
        if (b.matchedPairs === a.matchedPairs) {
            return a.elapsedTime - b.elapsedTime;
        }

        return b.matchedPairs - a.matchedPairs;
    });

const RoundHistory = ({ roundHistory }: RoundHistoryProps) => {
    return (
        <>
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
                    {sortByTime(roundHistory).map((round, index) => (
                        <tr key={index}>
                            <td>{round.playerName}</td>
                            <td>{round.attempts}</td>
                            <td>{round.elapsedTime} seconds</td>
                            <td>{round.matchedPairs}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

const GameOver = () => {
    const { updateGameState, roundHistory, startGame, player, cards } = useGameStore();

    const startNewGame = useCallback(() => {
        startGame(player.name, cards.length);
    }, [updateGameState]);

    const goToGameSetup = useCallback(() => {
        updateGameState('not-started');
    }, [updateGameState]);

    return (
        <div>
            <Confetti />
            <h2>Congratulations! You've found all pairs!</h2>
            <div>
                <button className="start-button" onClick={goToGameSetup}>
                    Change Game Settings
                </button>

                <button className="start-button" onClick={startNewGame}>
                    Start New Game
                </button>
            </div>
            <GameStats />
            <RoundHistory roundHistory={roundHistory} />
        </div>
    );
};

export default GameOver;
