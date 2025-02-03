/**
 * Moduł zawierający interfejsy związane z tweetami
 * Definiuje struktury danych używane w operacjach na tweetach
 */

import { Bookmark, Follower, Like, Thread } from "@prisma/client";
import { InitialProps } from ".";

/**
 * Podstawowy interfejs użytkownika
 * Zawiera podstawowe informacje o użytkowniku i jego relacjach
 */
interface User {
	id: string;
	imageUrl: string;
	username: string;
	name: string;
	followings: Follower[];
	followers: Follower[];
}

/**
 * Rozszerzony interfejs tweeta
 * Zawiera pełne informacje o tweecie wraz z powiązanymi danymi
 */
export interface DetailTweet extends Thread {
	user: User;
	likes: Like[];
	bookmarks: Bookmark[];
	parentId: string | null;
	parent?: DetailTweet | null;
	_count: {
		replies: number;
		likes: number;
		bookmarks: number;
	};
}

/**
 * Interfejs podstawowych danych tweeta
 * Używany do wyświetlania tweeta w listach i podglądach
 */
export interface DataTweet {
	id: string;
	text: string;
	imageUrl: string | null;
	createdAt: Date;
	parentId: string;
	isParentIdExist: boolean;
	user: {
		id: string;
		name: string;
		username: string;
		imageUrl: string;
	};
}

/**
 * Props dla operacji usuwania tweeta
 */
export interface DeleteTweetProps extends InitialProps {
	id: string;
}

/**
 * Props dla operacji przełączania zakładki tweeta
 */
export interface ToggleBookmarkTweetProps extends InitialProps {
	bookmark: Bookmark | undefined;
	userId: string;
	threadId: string;
}

/**
 * Props dla operacji przełączania polubienia tweeta
 */
export interface ToggleLikeTweetProps extends InitialProps {
	liked: Like | undefined;
	userId: string;
	currentUserId: string;
	threadId: string;
	path: string;
}

/**
 * Props dla operacji kopiowania linku do tweeta
 */
export interface CopyLinkTweetProps {
	toast: any;
	username: string;
	tweetId: string;
}

// Interfejsy dla akcji serwerowych

/**
 * Props dla akcji pobierania tweetów
 * Definiuje parametry filtrowania i paginacji
 */
export interface GetTweetsActionProps {
	size?: number;              // Liczba tweetów na stronę
	page?: number;              // Numer strony
	userId: string;             // ID użytkownika
	isFollowing?: boolean;      // Tylko od obserwowanych
	isBookmarks?: boolean;      // Tylko zakładki
	isProfile?: boolean;        // Tylko z profilu
	isReplies?: boolean;        // Tylko odpowiedzi
	isLikes?: boolean;          // Tylko polubione
	parentId?: string;          // ID tweeta nadrzędnego
}

/**
 * Props dla akcji tworzenia tweeta
 */
export interface CreateTweetActionProps {
	userId: string;             // ID autora
	imageUrl?: string;          // URL obrazu (opcjonalny)
	text: string;              // Treść tweeta
	parentId?: string;         // ID tweeta nadrzędnego (dla odpowiedzi)
	path: string;              // Ścieżka do odświeżenia
}

/**
 * Props dla akcji wyszukiwania tweetów
 */
export interface GetTweetsBySearchActionProps {
	size?: number;             // Liczba wyników na stronę
	page?: number;             // Numer strony
	searchQuery?: string;      // Fraza wyszukiwania
	filter?: "najnowsze" | "people" | "media";  // Filtr wyników
}

/**
 * Props dla akcji przełączania polubienia
 */
export interface ToggleLikeActionProps {
	userId: string;            // ID użytkownika
	threadId: string;          // ID tweeta
	path: string;             // Ścieżka do odświeżenia
}

/**
 * Props dla akcji przełączania zakładki
 */
export interface ToggleBookmarkActionProps {
	userId: string;            // ID użytkownika
	threadId: string;          // ID tweeta
	path: string;             // Ścieżka do odświeżenia
}
