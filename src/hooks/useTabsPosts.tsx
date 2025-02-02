import { create } from "zustand";

interface State {
	status: string;
}

interface Action {
	setStatus: (status: string) => void;
}

export const useTabsPosts = create<State & Action>((set) => ({
	status: "Dla Ciebie",
	setStatus: (status) => set({ status }),
}));
