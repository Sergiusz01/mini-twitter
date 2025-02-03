/**
 * Store zarządzający stanem odpowiedzi na tweety
 * Wykorzystuje bibliotekę Zustand do przechowywania danych tweeta, na który odpowiadamy
 */

import { create } from "zustand";
import { DataTweet } from "@/interfaces/tweet.interface";

/**
 * Interfejs stanu odpowiedzi
 * @property dataTweet Dane tweeta, na który odpowiadamy (lub null jeśli nie odpowiadamy)
 */
interface State {
	dataTweet: DataTweet | null;
}

/**
 * Interfejs akcji odpowiedzi
 * @property setDataTweet Funkcja ustawiająca dane tweeta do odpowiedzi
 */
interface Action {
	setDataTweet: (dataTweet: DataTweet | null) => void;
}

/**
 * Hook useReplyTweet
 * Zarządza stanem odpowiedzi na tweety
 * Przechowuje dane tweeta, na który użytkownik chce odpowiedzieć
 */
export const useReplyTweet = create<State & Action>((set) => ({
	dataTweet: null,
	setDataTweet: (dataTweet) => set({ dataTweet }),
}));
