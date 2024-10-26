import { PropsWithChildren } from 'react';
import { useGameStore } from '../../store/game.store';
import GameBoard from '../GameBoard';
import GameOver from '../GameOver';
import GameSetup from '../GameSetup';

const Container = ({ children }: PropsWithChildren) => {
    return <div className="memory-game">{children}</div>;
};

const MemoryGame = () => {
    const { status } = useGameStore();

    switch (status) {
        case 'not-started': {
            return (
                <Container>
                    <GameSetup />
                </Container>
            );
        }

        case 'in-progress': {
            return (
                <Container>
                    <GameBoard />
                </Container>
            );
        }

        case 'finished': {
            return (
                <Container>
                    <GameOver />
                </Container>
            );
        }
    }
};

export default MemoryGame;
