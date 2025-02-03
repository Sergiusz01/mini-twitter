/**
 * Moduł zawierający funkcje narzędziowe (utilities)
 * Implementuje różne pomocnicze funkcje używane w całej aplikacji
 */

import { ConvertToHttpsType } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Łączy klasy CSS z wykorzystaniem clsx i tailwind-merge
 * @param inputs Klasy CSS do połączenia
 * @returns Połączone i zoptymalizowane klasy CSS
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Konwertuje timestamp na relatywny format daty
 * Zwraca czas w formacie: s (sekundy), m (minuty), h (godziny), d (dni), w (tygodnie), y (lata)
 * 
 * @param timestamp Timestamp do przekonwertowania
 * @param referenceTime Czas odniesienia (domyślnie aktualny czas)
 * @returns Sformatowany relatywny czas
 */
export function customDatePost(timestamp: number, referenceTime: number = Date.now()): string {
	const timeDiff = referenceTime - timestamp;

	switch (true) {
		case timeDiff < 60000:
			const seconds = Math.floor(timeDiff / 1000);
			return seconds + "s";
		case timeDiff < 3600000:
			const minutes = Math.floor(timeDiff / 60000);
			return minutes + "m";
		case timeDiff < 86400000:
			const hours = Math.floor(timeDiff / 3600000);
			return hours + "h";
		case timeDiff < 604800000:
			const days = Math.floor(timeDiff / 86400000);
			return days + "d";
		case timeDiff < 31536000000:
			const weeks = Math.floor(timeDiff / 604800000);
			return weeks + "w";
		default:
			const years = Math.floor(timeDiff / 31536000000);
			return years + "y";
	}
}

/**
 * Formatuje obiekt Date na string w polskim formacie
 * Format: HH:MM · DD MIESIĄC RRRR
 * 
 * @param Date Obiekt daty do sformatowania
 * @returns Sformatowana data i czas
 */
export const formatDateTime = (Date: Date): string => {
	const formattedTime = new Intl.DateTimeFormat('pl-PL', {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).format(Date);

	const day = Date.getDate();
	const month = months[Date.getMonth()].toLowerCase();
	const year = Date.getFullYear();

	return `${formattedTime} · ${day} ${month} ${year}`;
};

/**
 * Konfiguracja dla powiadomień toast
 */
export const toastOptions = {
	duration: 2000,
	style: {
		color: "#fff",
		backgroundColor: "#1D9BF0",
	},
};

/**
 * Lista polskich nazw miesięcy
 */
export const months = [
	"Styczeń",
	"Luty",
	"Marzec",
	"Kwiecień",
	"Maj",
	"Czerwiec",
	"Lipiec",
	"Sierpień",
	"Wrzesień",
	"Październik",
	"Listopad",
	"Grudzień",
];

/**
 * Konwertuje URL na format HTTPS
 * Obsługuje różne formaty wejściowe (http://, https://, bez protokołu)
 * 
 * @param url URL do przekonwertowania
 * @returns Obiekt z przekonwertowanym URL i tytułem lub undefined
 */
export function convertToHttps(url: string): ConvertToHttpsType {
	if (!url) return;

	if (url.startsWith("https://")) {
		return {
			href: url,
			title: url.slice(8),
		};
	} else if (url.startsWith("http://")) {
		return {
			href: "https://" + url.slice(7),
			title: url.slice(7),
		};
	} else {
		return {
			href: "https://" + url,
			title: url,
		};
	}
}

/**
 * Pobiera aktualną ścieżkę i parametry wyszukiwania
 * Obsługuje środowisko SSR zwracając fallback
 * 
 * @param fallbackPath Ścieżka domyślna w przypadku błędu
 * @returns Aktualna ścieżka z parametrami lub fallback
 */
export const getCurrentPath = (fallbackPath: string = ''): string => {
	try {
		if (typeof window === 'undefined') {
			return fallbackPath;
		}
		return `${window.location.pathname}${window.location.search}`;
	} catch {
		return fallbackPath;
	}
};

/**
 * Sprawdza i waliduje numer strony
 * Zapewnia, że wartość jest poprawną liczbą >= 0
 * 
 * @param qPage Numer strony do sprawdzenia
 * @returns Zwalidowany numer strony
 */
export const isValidPage = (qPage: string): number => {
	const page = parseInt(qPage);

	if (page < 0 || isNaN(page)) return 0;
	return page;
};

/**
 * Wyodrębnia ID filmu z linku YouTube
 * Obsługuje różne formaty linków YouTube
 * 
 * @param text Tekst zawierający link do YouTube
 * @returns ID filmu lub null jeśli nie znaleziono linku
 */
export const extractYouTubeId = (text: string): string | null => {
	const patterns = [
		/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\s]+)/,
		/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^\s]+)/,
		/(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^\s]+)/
	];

	for (const pattern of patterns) {
		const match = text.match(pattern);
		if (match && match[1]) {
			return match[1];
		}
	}

	return null;
};

/**
 * Wyodrębnia URL Spotify z tekstu
 * Obsługuje linki do utworów, albumów i playlist
 * 
 * @param text Tekst zawierający link do Spotify
 * @returns URL Spotify lub null jeśli nie znaleziono
 */
export const extractSpotifyUrl = (text: string): string | null => {
	const spotifyRegex = /https:\/\/open\.spotify\.com\/(track|album|playlist)\/[a-zA-Z0-9]+/;
	const match = text.match(spotifyRegex);
	return match ? match[0] : null;
};

/**
 * Wyodrębnia URL GitHub z tekstu
 * Obsługuje linki do repozytoriów, plików i katalogów
 * 
 * @param text Tekst zawierający link do GitHub
 * @returns URL GitHub lub null jeśli nie znaleziono
 */
export const extractGithubUrl = (text: string): string | null => {
	const githubRegex = /https?:\/\/(?:www\.)?github\.com\/[^/\s]+\/[^/\s]+(?:\/(?:blob|tree)\/[^/\s]+\/[^/\s]+)?/;
	const match = text.match(githubRegex);
	return match ? match[0] : null;
};
