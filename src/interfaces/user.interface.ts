/** Moduł zawierający interfejsy związane z użytkownikami */

import { Follower, User } from "@prisma/client";
import { InitialProps } from ".";

/** Rozszerzony interfejs użytkownika z listami relacji */
export interface UserWithFollowers extends User {
	followers: Follower[];     // Lista obserwujących
	followings: Follower[];    // Lista obserwowanych
}

/** Props dla operacji przełączania obserwowania */
export interface toggleFollowUserProps extends InitialProps {
	username: string;          // Nazwa użytkownika
	followed: Follower | undefined;  // Stan obserwowania
	userId: string;            // ID obserwowanego
	currentUserId: string;     // ID obserwującego
}

/** Props dla operacji kopiowania linku do profilu */
export interface CopyLinkUserProps {
	toast: any;               // Instancja toast
	username: string;         // Nazwa użytkownika
}

/** Props dla akcji zapisywania użytkownika */
export interface SaveUserActionProps {
	id: string;               // ID użytkownika
	imageUrl?: string;        // Zdjęcie profilowe
	name: string;             // Nazwa wyświetlana
	username?: string;        // Nazwa użytkownika
	email?: string;           // Email
	bio: string;             // Opis profilu
	isCompleted: boolean;     // Status uzupełnienia
}

/** Props dla akcji pobierania użytkowników */
export interface GetUsersActionProps {
	size?: number;            // Rozmiar strony
	page?: number;            // Numer strony
	userId: string;           // ID użytkownika
	searchQuery?: string;     // Fraza wyszukiwania
	isOnSearch?: boolean;     // Tryb wyszukiwania
	isOnExplore?: boolean;    // Tryb eksploracji
}

/** Props dla akcji aktualizacji profilu */
export interface UpdateUserActionProps {
	id: string;               // ID użytkownika
	imageUrl: string;         // Zdjęcie profilowe
	bannerUrl?: string;       // Banner profilu
	name: string;             // Nazwa wyświetlana
	bio: string;             // Opis profilu
	location: string;         // Lokalizacja
	website: string;          // Strona WWW
	path: string;            // Ścieżka do odświeżenia
}

/** Props dla akcji przełączania obserwowania */
export interface ToggleFollowUserActionProps {
	userId: string;           // ID obserwowanego
	currentUserId: string;    // ID obserwującego
	path: string;            // Ścieżka do odświeżenia
}
