/**
 * Moduł zawierający schematy walidacji dla użytkowników
 * Wykorzystuje bibliotekę Zod do definicji i walidacji schematów
 */

import * as z from "zod";

/**
 * Schema podstawowej walidacji użytkownika
 * Używana przy tworzeniu nowego użytkownika
 * 
 * Definiuje wymagania dla:
 * - id: Wymagane ID użytkownika
 * - name: Wymagane imię (1-30 znaków)
 * - bio: Opcjonalny opis (max 255 znaków)
 */
export const userSchema = z.object({
	id: z.string(),
	name: z
		.string()
		.min(1, {
			message: "Imię jest wymagane",
		})
		.max(30, {
			message: "Maksymalna długość to 30 znaków",
		}),
	bio: z.string().max(255, {
		message: "Maksymalna długość to 255 znaków",
	}),
});

/**
 * Schema walidacji edycji profilu użytkownika
 * Używana przy aktualizacji danych użytkownika
 * 
 * Definiuje wymagania dla:
 * - id: Wymagane ID użytkownika
 * - bannerUrl: Opcjonalny URL bannera
 * - imageUrl: Wymagany URL zdjęcia profilowego
 * - name: Wymagane imię (1-30 znaków)
 * - bio: Opcjonalny opis (max 255 znaków)
 * - location: Opcjonalna lokalizacja (max 30 znaków)
 * - website: Opcjonalna strona WWW (max 100 znaków)
 */
export const editUserSchema = z.object({
	id: z.string(),
	bannerUrl: z.string().optional(),
	imageUrl: z.string(),
	name: z
		.string()
		.min(1, {
			message: "Imię nie może być puste",
		})
		.max(30, {
			message: "Maksymalna długość to 30 znaków",
		}),
	bio: z.string().max(255, {
		message: "Maksymalna długość to 255 znaków",
	}),
	location: z.string().max(30, {
		message: "Maksymalna długość to 30 znaków",
	}),
	website: z.string().max(100, {
		message: "Maksymalna długość to 100 znaków",
	}),
});
