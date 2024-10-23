import { cardContents } from './card.utils.ts';

export type GameLevel = 'easy' | 'medium' | 'hard';
export type GameStatus = 'not-started' | 'in-progress' | 'finished';

export type TCard = {
    id: number;
    type: (typeof cardContents)[number];
    isFlipped: boolean;
    isMatched: boolean;
};

export type RoundHistory = {
    playerName: string;
    attempts: number;
    elapsedTime: number;
    matchedPairs: number;
};

export type GameState = {
    cards: TCard[];
    status: GameStatus;
    stats: {
        startTime: number;
        elapsedTime: number;
        attempts: number;
        matchedPairs: number;
    };
    player: {
        name: string;
        setName: (name: string) => void;
    };
    roundHistory: RoundHistory[];
    startGame: (playerName: string, level: GameLevel | number) => void;
    finishGame: () => void;
    flipCard: (cardId: number) => void;
    updateGameState: (status: GameStatus) => void;
};
