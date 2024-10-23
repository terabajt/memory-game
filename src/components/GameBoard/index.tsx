import Board from '../Board';
import GameStats from '../GameStats';
import { useGameStore } from '../../store/game.store';

const GameBoard = () => {
    const { finishGame, cards, flipCard } = useGameStore();

    return (
        <div>
            <GameStats />
            <Board cards={cards} onCardClick={flipCard} />
            <button className="end-button" onClick={finishGame}>
                End Game
            </button>
        </div>
    );
};

export default GameBoard;
