import {create} from "zustand";

interface GameState {
  attempts: number;
  elapsedTime: number;
  gameStarted: boolean;
  startTime: number;
  tileCount: number;
  matchedPairs: number;
  playerName: string;
  roundHistory: {playerName: string; attempts: number; elapsedTime: number}[];
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
}

const saveRoundHistoryToLocalStorage = (
  roundHistory: {playerName: string; attempts: number; elapsedTime: number}[]
) => {
  localStorage.setItem("roundHistory", JSON.stringify(roundHistory));
};

const loadRoundHistoryFromLocalStorage = (): {
  playerName: string;
  attempts: number;
  elapsedTime: number;
}[] => {
  const savedHistory = localStorage.getItem("roundHistory");
  return savedHistory ? JSON.parse(savedHistory) : [];
};

export const useGameStore = create<GameState>((set) => ({
  attempts: 0,
  elapsedTime: 0,
  gameStarted: false,
  startTime: 0,
  tileCount: 16,
  matchedPairs: 0,
  playerName: "",
  roundHistory: loadRoundHistoryFromLocalStorage(),
  startGame: () =>
    set(() => ({
      gameStarted: true,
      startTime: Date.now(),
      attempts: 0,
      elapsedTime: 0,
      matchedPairs: 0,
    })),
  endGame: () => set(() => ({gameStarted: false})),
  setTileCount: (count) => set(() => ({tileCount: count})),
  setPlayerName: (name) => set(() => ({playerName: name})),
  resetGame: () =>
    set(() => ({
      attempts: 0,
      elapsedTime: 0,
      gameStarted: false,
      startTime: 0,
      matchedPairs: 0,
    })),
  incrementAttempts: () => set((state) => ({attempts: state.attempts + 1})),
  incrementMatchedPairs: () =>
    set((state) => ({matchedPairs: state.matchedPairs + 1})),
  updateRoundHistory: () =>
    set((state) => {
      const newRoundHistory = [
        ...state.roundHistory,
        {
          playerName: state.playerName,
          attempts: state.attempts,
          elapsedTime: state.elapsedTime,
        },
      ];
      saveRoundHistoryToLocalStorage(newRoundHistory);
      return {roundHistory: newRoundHistory};
    }),
  loadRoundHistory: () =>
    set(() => ({
      roundHistory: loadRoundHistoryFromLocalStorage(),
    })),
  set: (fn) => set(fn),
}));
