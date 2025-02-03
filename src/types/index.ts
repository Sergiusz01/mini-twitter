/**
 * Moduł eksportujący podstawowe typy używane w aplikacji
 * Zawiera typy wspólne dla różnych modułów
 */

/**
 * Typ zwracany przez funkcję convertToHttps
 * Reprezentuje przekonwertowany URL wraz z jego tytułem
 */
export type ConvertToHttpsType =
	| {
			href: string;  // Pełny URL z protokołem HTTPS
			title: string; // Tytuł/tekst wyświetlany dla URL
	  }
	| undefined;

/**
 * Typ reprezentujący wynik operacji wsadowej
 * Używany przy operacjach masowego usuwania/aktualizacji
 */
export type BatchPayload = {
	count: number; // Liczba przetworzonych rekordów
};
