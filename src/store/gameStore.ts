import { create } from 'zustand';

type RoundHistory = {
    playerName: string;
    attempts: number;
    elapsedTime: number;
    matchedPairs: number;
};

type GameState = {
    attempts: number;
    elapsedTime: number;
    gameStarted: boolean;
    startTime: number;
    tileCount: number;
    matchedPairs: number;
    playerName: string;
    roundHistory: RoundHistory[];
    startGame: () => void;
    endGame: () => void;
    setTileCount: (count: number) => void;
    setPlayerName: (name: string) => void;
    resetGame: () => void;
    incrementAttempts: () => void;
    incrementMatchedPairs: () => void;
    updateRoundHistory: () => void;
    loadRoundHistory: () => void;
    set: (fn: (state: GameState) => Partial<GameState>) => void;
};

const saveRoundHistoryToLocalStorage = (roundHistory: RoundHistory[]) => {
    localStorage.setItem('roundHistory', JSON.stringify(roundHistory));
};

const loadRoundHistoryFromLocalStorage = (): RoundHistory[] => {
    try {
        const savedHistory = localStorage.getItem('roundHistory');
        return savedHistory
            ? JSON.parse(savedHistory).map((round: RoundHistory) => ({
                  ...round,
                  matchedPairs: round.matchedPairs ?? 0,
              }))
            : [];
    } catch (error) {
        console.error('Failed to load round history from localStorage:', error);
        return [];
    }
};

export const useGameStore = create<GameState>(set => ({
    attempts: 0,
    elapsedTime: 0,
    gameStarted: false,
    startTime: 0,
    tileCount: 16,
    matchedPairs: 0,
    playerName: '',
    roundHistory: loadRoundHistoryFromLocalStorage(),
    startGame: () => {
        set(() => ({
            gameStarted: true,
            startTime: Date.now(),
            attempts: 0,
            elapsedTime: 0,
            matchedPairs: 0,
        }));
    },
    endGame: () => {
        set(() => ({ gameStarted: false }));
    },
    setTileCount: count => set(() => ({ tileCount: count })),
    setPlayerName: name => set(() => ({ playerName: name })),
    resetGame: () =>
        set(() => ({
            attempts: 0,
            elapsedTime: 0,
            gameStarted: false,
            startTime: 0,
            matchedPairs: 0,
        })),
    incrementAttempts: () => set(state => ({ attempts: state.attempts + 1 })),
    incrementMatchedPairs: () => set(state => ({ matchedPairs: state.matchedPairs + 1 })),
    updateRoundHistory: () =>
        set(state => {
            const newRoundHistory = [
                ...state.roundHistory,
                {
                    playerName: state.playerName,
                    attempts: state.attempts,
                    elapsedTime: state.elapsedTime,
                    matchedPairs: state.matchedPairs,
                },
            ];
            saveRoundHistoryToLocalStorage(newRoundHistory);
            return { roundHistory: newRoundHistory };
        }),
    loadRoundHistory: () =>
        set(() => ({
            roundHistory: loadRoundHistoryFromLocalStorage(),
        })),
    set: fn => set(fn),
}));
