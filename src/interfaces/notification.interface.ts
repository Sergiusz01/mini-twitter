/**
 * Moduł zawierający interfejsy związane z powiadomieniami
 * Definiuje struktury danych dla różnych typów powiadomień
 */

/** Interfejs użytkownika źródłowego powiadomienia */
interface SourceUser {
	id: string;              // ID użytkownika
	username: string;        // Nazwa użytkownika
	imageUrl: string;        // Zdjęcie profilowe
}

/** Interfejs posta powiązanego z powiadomieniem */
interface Post {
	id: string;              // ID posta
	text: string;            // Treść posta
	imageUrl: string | null; // Zdjęcie w poście
}

/** Główny interfejs powiadomienia */
export interface DataNotification {
	id: string;              // ID powiadomienia
	isRead: boolean;         // Status przeczytania
	userId: string;          // ID odbiorcy
	activityType: string | null;  // Typ aktywności
	sourceId: string;        // ID źródła
	parentIdPost: string | null;  // ID posta nadrzędnego
	parentIdUser: string | null;  // ID użytkownika nadrzędnego
	parentType: string;      // Typ elementu nadrzędnego
	createdAt: Date;         // Data utworzenia
	sourceUser: SourceUser | null;  // Użytkownik źródłowy
	post: Post | null;       // Powiązany post
}

// Interfejsy dla akcji powiadomień

/** Bazowy interfejs dla powiadomień związanych z użytkownikami */
interface ParentTypeUserProps {
	userId: string;          // ID odbiorcy
	parentIdUser: string;    // ID użytkownika nadrzędnego
	sourceId: string;        // ID źródła
	path: string;           // Ścieżka do odświeżenia
}

/** Bazowy interfejs dla powiadomień związanych z postami */
interface ParentTypePostProps {
	userId: string;          // ID odbiorcy
	sourceId: string;        // ID źródła
	parentIdPost: string;    // ID posta nadrzędnego
	path: string;           // Ścieżka do odświeżenia
}

/** Props dla powiadomienia o nowym obserwującym */
export interface FollowUserNotificationActionProps
	extends ParentTypeUserProps {}

/** Props dla powiadomienia o polubieniu posta */
export interface LikePostNotificationActionProps extends ParentTypePostProps {}

/** Props dla powiadomienia o komentarzu do posta */
export interface CommentPostNotificationActionProps
	extends ParentTypePostProps {}

/** Props dla powiadomienia o odpowiedzi na komentarz */
export interface ReplyCommentPostNotificationActionProps
	extends ParentTypePostProps {}

/** Props dla akcji pobierania powiadomień */
export interface GetNotificationsActionProps {
	userId: string;          // ID użytkownika
	size?: number;           // Rozmiar strony
	page?: number;           // Numer strony
}
