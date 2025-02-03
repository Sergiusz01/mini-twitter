/**
 * Moduł zawierający podstawowe interfejsy współdzielone w aplikacji
 * Definiuje wspólne typy używane w różnych komponentach
 */

import { TransitionStartFunction } from "react";

/**
 * Bazowy interfejs dla props komponentów
 * Zawiera podstawowe właściwości potrzebne do obsługi stanu i przejść
 */
export interface InitialProps {
	isPending: boolean;                    // Stan oczekiwania
	startTransition: TransitionStartFunction;  // Funkcja rozpoczynająca przejście
	toast?: any;                          // Opcjonalna instancja toast
	path: string;                         // Ścieżka do odświeżenia
}
