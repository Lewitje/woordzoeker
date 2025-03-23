import { create } from "zustand";

type GameState = {
	activeToast: string | null;
	queue: string[];
};

type GameActions = {
	addToast: (message: string) => void;
	setActiveToast: (message: string) => void;
	removeActiveToast: () => void;
};

const initialGameState: GameState = {
	activeToast: null,
	queue: [], // TODO: Implement queue
};

const useToastStore = create<GameState & GameActions>()((set) => ({
	...initialGameState,
	addToast: (message) => {
		set((state) => ({ queue: [...state.queue, message] }));
	},
	setActiveToast: (message) => {
		set(() => ({ activeToast: message }));
	},
	removeActiveToast: () => set(() => ({ activeToast: null })),
}));

export default useToastStore;
