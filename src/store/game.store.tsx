import { create } from 'zustand';
import { flipCard } from './card.utils';
import { GameLevel, GameState, GameStatus } from './game.model';
import { finishGame, startGame } from './game.utils';
import { persist } from 'zustand/middleware';

const gameStorage = create<GameState>()(
    persist(
        (set, getState) => ({
            status: 'not-started',
            cards: [],
            stats: {
                matchedPairs: 0,
                attempts: 0,
                elapsedTime: 0,
                startTime: 0,
            },
            player: {
                name: '',
                setName: name => set(state => ({ ...state, player: { ...state.player, name } })),
            },
            roundHistory: [],
            finishGame: () => set(finishGame),
            startGame: (playerName: string, level: GameLevel | number) =>
                set(state => startGame(playerName, level, state)),
            flipCard: (cardId: number) => flipCard(cardId, getState(), set),
            updateGameState: (status: GameStatus) => set(() => ({ status })),
        }),
        {
            name: 'game-storage',
            partialize: state => ({ roundHistory: state.roundHistory }),
        },
    ),
);

export const useGameStore = () => {
    return gameStorage();
};
