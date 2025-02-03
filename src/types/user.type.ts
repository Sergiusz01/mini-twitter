/**
 * Moduł zawierający typy związane z użytkownikami
 * Definiuje interfejsy i typy używane w operacjach na użytkownikach
 */

import { UserWithFollowers } from "@/interfaces/user.interface";
import { Follower, User } from "@prisma/client";

/** Typ zwracany przez akcję pobierania użytkowników */
export type GetUsersActionType =
	| {
			data: User[];
			hasNext: boolean;
	  }
	| undefined;

/** Typ zwracany przez akcję zapisywania użytkownika */
export type SaveUserActionType = User | undefined;

/** Typ zwracany przez akcję pobierania użytkownika */
export type GetUserActionType = UserWithFollowers | null | undefined;

/** Typ zwracany przez akcję aktualizacji użytkownika */
export type UpdateUserActionType = User | undefined;

/** Typ zwracany przez akcję pobierania użytkownika po nazwie */
export type GetUserByUsernameActionType = GetUserActionType;

/** Typ zwracany przez akcję przełączania obserwowania */
export type ToggleFollowUserActionType = Follower | undefined;
