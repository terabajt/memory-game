import {create} from "zustand";

interface GameState {
  attempts: number;
  elapsedTime: number;
  gameStarted: boolean;
  startTime: number;
  tileCount: number;
  matchedPairs: number;
  startGame: () => void;
  endGame: () => void;
  setTileCount: (count: number) => void;
  resetGame: () => void;
  incrementAttempts: () => void;
  incrementMatchedPairs: () => void;
  set: (fn: (state: GameState) => Partial<GameState>) => void;
}

export const useGameStore = create<GameState>((set) => ({
  attempts: 0,
  elapsedTime: 0,
  gameStarted: false,
  startTime: 0,
  tileCount: 16,
  matchedPairs: 0,
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
  set: (fn) => set(fn),
}));
