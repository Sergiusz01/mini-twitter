/**
 * Moduł obsługujący integrację z Cloudinary
 * Zawiera funkcje do przesyłania i zarządzania plikami w chmurze
 */

import axios from "axios";

/**
 * Przesyła plik do Cloudinary
 * 
 * @param {File} file - Plik do przesłania
 * @returns {Promise<string | undefined>} URL przesłanego obrazu lub undefined w przypadku błędu
 * 
 * Proces przesyłania:
 * 1. Tworzy FormData z plikiem i presetem konfiguracyjnym
 * 2. Wysyła żądanie POST do API Cloudinary
 * 3. Zwraca URL przesłanego pliku lub undefined w przypadku błędu
 */
export const uploadFile = async (file: File): Promise<string | undefined> => {
	// Przygotowanie danych do wysłania
	const formData = new FormData();
	formData.append("file", file!);
	formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!);

	// Wysłanie żądania do Cloudinary
	const response = await axios.post(
		`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
		formData,
	);

	// Sprawdzenie statusu odpowiedzi
	const isStatus200 = response.status === 200;
	if (!isStatus200) return;

	// Zwrócenie URL-a przesłanego pliku
	return response.data.url;
};
