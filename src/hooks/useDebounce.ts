/**
 * Hook implementujący mechanizm debounce
 * Opóźnia aktualizację wartości o określony czas, aby zredukować częstotliwość wykonywania operacji
 * 
 * Przykłady użycia:
 * - Opóźnienie wywołań API podczas wyszukiwania
 * - Redukcja liczby renderowań przy częstych zmianach stanu
 * - Optymalizacja wydajności przy wprowadzaniu tekstu
 */

import { useEffect, useState } from "react";

/**
 * Hook useDebounce
 * @template T Typ wartości do debounce
 * @param value Wartość wejściowa
 * @param delay Opóźnienie w milisekundach (domyślnie 500ms)
 * @returns Wartość po zastosowaniu debounce
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Ustawienie timera opóźniającego aktualizację wartości
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Czyszczenie timera przy zmianie wartości lub odmontowaniu komponentu
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
} 