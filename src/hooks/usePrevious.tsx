/**
 * Store zarządzający historią nawigacji
 * Wykorzystuje bibliotekę Zustand do śledzenia i zarządzania historią odwiedzonych URL-i
 */

import { create } from "zustand";

/**
 * Interfejs stanu historii nawigacji
 * @property navigationHistory Tablica przechowująca historię odwiedzonych URL-i
 */
interface State {
	navigationHistory: string[];
}

/**
 * Interfejs akcji historii nawigacji
 * @property addToNavigationHistory Dodaje nowy URL do historii
 * @property goBack Cofa do poprzedniego URL-a
 * @property clearNavigationHistory Czyści całą historię
 */
interface Action {
	addToNavigationHistory: (url: string) => void;
	goBack: () => void;
	clearNavigationHistory: () => void;
}

/**
 * Hook usePrevious
 * Zarządza historią nawigacji w aplikacji
 * Umożliwia:
 * - Dodawanie nowych URL-i do historii
 * - Cofanie się do poprzednich stron
 * - Czyszczenie historii
 */
export const usePrevious = create<State & Action>((set) => ({
	navigationHistory: [],
	
	// Dodaje nowy URL do historii, pomijając duplikaty
	addToNavigationHistory: (url) =>
		set((state) => {
			const len = state.navigationHistory.length - 1;
			const leadingValue = state.navigationHistory[len];

			if (leadingValue === url)
				return { navigationHistory: [...state.navigationHistory] };

			return { navigationHistory: [...state.navigationHistory, url] };
		}),
	
	// Usuwa ostatni URL z historii
	goBack: () =>
		set((state) => ({
			navigationHistory: state.navigationHistory.slice(0, -1),
		})),
	
	// Resetuje historię nawigacji
	clearNavigationHistory: () => set({ navigationHistory: [] }),
}));
