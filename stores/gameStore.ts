import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { GameDifficulty } from "@/hooks/useGame";
import type { Word, IWordGrid } from "@/types/common";
import type { Cell } from "@/components/wordGrid/wordGrid";

type GameState = {
	difficulty: GameDifficulty | null;
	words: Word[];
	foundWords: Word[];
	wordGrid: IWordGrid;
	gameOver: boolean;
	foundCells: Cell[];
};

type GameActions = {
	setWords: (words: Word[]) => void;
	addFoundWord: (word: Word) => void;
	setWordGrid: (grid: IWordGrid) => void;
	resetState: () => void;
	setGameDifficulty: (difficulty: GameDifficulty) => void;
	setGameOver: () => void;
	addFoundCells: (cells: Cell[]) => void;
};

const initialGameState: GameState = {
	difficulty: null,
	words: [],
	foundWords: [],
	wordGrid: [],
	gameOver: false,
	foundCells: [],
};

const useGameStore = create<GameState & GameActions>()(
	persist(
		(set) => ({
			...initialGameState,
			setWords: (words) => {
				set(() => ({ words }));
			},
			addFoundWord: (word) => {
				set((state) => ({ foundWords: [...state.foundWords, word] }));
			},
			resetState: () => {
				set(initialGameState);
			},
			setWordGrid: (wordGrid) => {
				set(() => ({ wordGrid }));
			},
			setGameDifficulty: (difficulty) => {
				set(() => ({ difficulty }));
			},
			setGameOver: () => {
				set({ gameOver: true });
			},
			addFoundCells: (cells) => {
				set((state) => ({ foundCells: [...state.foundCells, ...cells] }));
			},
		}),
		{
			name: "game-store", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
		},
	),
);

export default useGameStore;
