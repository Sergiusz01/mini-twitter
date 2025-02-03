/**
 * Store zarządzający stanem zakładek postów
 * Wykorzystuje bibliotekę Zustand do zarządzania globalnym stanem
 */

import { create } from "zustand";

/**
 * Interfejs stanu
 * @property status Aktualnie wybrany status zakładki
 */
interface State {
	status: string;
}

/**
 * Interfejs akcji
 * @property setStatus Funkcja zmieniająca status zakładki
 */
interface Action {
	setStatus: (status: string) => void;
}

/**
 * Hook useTabsPosts
 * Zarządza stanem zakładek i umożliwia przełączanie między nimi
 * Domyślnie ustawiony na zakładkę "Dla Ciebie"
 */
export const useTabsPosts = create<State & Action>((set) => ({
	status: "Dla Ciebie",
	setStatus: (status) => set({ status }),
}));
