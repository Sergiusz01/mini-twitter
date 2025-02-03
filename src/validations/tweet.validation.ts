/**
 * Moduł zawierający schematy walidacji dla tweetów
 * Wykorzystuje bibliotekę Zod do definicji i walidacji schematów
 */

import * as z from "zod";

/**
 * Schema walidacji tweeta
 * Definiuje wymagania dla:
 * - text: Wymagany tekst (1-500 znaków)
 * - imageUrl: Opcjonalny URL obrazu
 * - userId: Wymagane ID użytkownika
 * - parentId: Opcjonalne ID tweeta nadrzędnego (dla odpowiedzi)
 */
export const tweetSchema = z.object({
	text: z
		.string()
		.min(1, { message: "Treść posta jest wymagana" })
		.max(500, { message: "Maksymalna długość to 500 znaków" }),
	imageUrl: z.string().optional(),
	userId: z.string(),
	parentId: z.string().optional(),
});
