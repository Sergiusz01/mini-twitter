/**
 * Store zarządzający stanem modalu tworzenia tweeta
 * Wykorzystuje bibliotekę Zustand do zarządzania globalnym stanem modalu
 */

import { create } from "zustand";

/**
 * Interfejs stanu modalu
 * @property isOpen Określa czy modal jest otwarty
 */
interface State {
	isOpen: boolean;
}

/**
 * Interfejs akcji modalu
 * @property onOpen Funkcja otwierająca modal
 * @property onClose Funkcja zamykająca modal
 */
interface Action {
	onOpen: () => void;
	onClose: () => void;
}

/**
 * Hook useTweetModal
 * Zarządza stanem modalu do tworzenia nowych tweetów
 * Udostępnia metody do otwierania i zamykania modalu
 */
export const useTweetModal = create<State & Action>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
