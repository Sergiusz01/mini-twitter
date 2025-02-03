/**
 * Moduł zawierający typy związane z tweetami
 * Definiuje interfejsy i typy używane w operacjach na tweetach
 */

import { DetailTweet } from "@/interfaces/tweet.interface";
import { Bookmark, Like, Thread } from "@prisma/client";
import { BatchPayload } from ".";

/**
 * Typ filtra dla zapytań o tweety
 * Definiuje strukturę warunków wyszukiwania tweetów
 */
export type WhereFilter = {
	parentId: string | null;
	user: {
		followers: { some: { followingId: string } | undefined };
	};
	bookmarks: { some: { userId: string } } | undefined;
	likes: { some: { userId: string } } | undefined;
	userId: string | undefined;
};

/**
 * Typ zwracany przez akcję pobierania tweetów
 * Zawiera listę tweetów i informację o kolejnych stronach
 */
export type GetTweetsActionType =
	| {
			data: DetailTweet[];
			hasNext: boolean;
	  }
	| undefined;

/**
 * Typy dla różnych operacji na tweetach
 */
export type CreateTweetActionType = Thread | undefined;  // Tworzenie tweeta
export type GetTweetActionType = DetailTweet | undefined | null;  // Pobieranie pojedynczego tweeta
export type GetTotalTweetsActionType = number | undefined;  // Liczba wszystkich tweetów
export type DeleteTweetActionType = Thread | undefined;  // Usuwanie tweeta
export type ToggleLikeActionType = Like | undefined;  // Przełączanie polubienia
export type ToggleBookmarkActionType = Bookmark | undefined;  // Przełączanie zakładki
export type GetTotalBookmarksActionType = number | undefined;  // Liczba zakładek
export type DeleteBookmarksAction = BatchPayload | undefined;  // Usuwanie zakładek
