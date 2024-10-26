import { GameLevel, GameState } from './game.model.ts';
import { generateNewCardPairs } from './card.utils.ts';

export const startGame = (
    playerName: string,
    level: GameLevel | number,
    state: GameState,
): Partial<GameState> => {
    switch (level) {
        case 'easy': {
            level = 12;
            break;
        }

        case 'medium': {
            level = 20;
            break;
        }

        case 'hard': {
            level = 30;
            break;
        }
    }

    return {
        stats: {
            startTime: Date.now(),
            attempts: 0,
            elapsedTime: 0,
            matchedPairs: 0,
        },
        cards: generateNewCardPairs(level),
        player: {
            ...state.player,
            name: playerName,
        },
        status: 'in-progress',
    };
};

export const finishGame = (state: GameState): Partial<GameState> => {
    const newRoundHistory = [
        ...state.roundHistory,
        {
            playerName: state.player.name,
            attempts: state.stats.attempts,
            elapsedTime: state.stats.elapsedTime,
            matchedPairs: state.stats.matchedPairs,
        },
    ];

    return {
        status: 'finished',
        roundHistory: newRoundHistory,
    };
};
