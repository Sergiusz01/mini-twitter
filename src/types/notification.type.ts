/**
 * Moduł zawierający typy związane z powiadomieniami
 * Definiuje typy dla różnych rodzajów powiadomień w systemie
 */

import { DataNotification } from "@/interfaces/notification.interface";
import { Notification } from "@prisma/client";

/** Typ powiadomienia o nowym obserwującym */
export type FollowUserNotificationActionType = Notification | undefined;

/** Typ powiadomienia o polubieniu posta */
export type LikePostNotificationActionType = FollowUserNotificationActionType;

/** Typ powiadomienia o komentarzu do posta */
export type CommentPostNotificationActionType =
	FollowUserNotificationActionType;

/** Typ powiadomienia o odpowiedzi na komentarz */
export type ReplyCommentPostNotificationActionType =
	FollowUserNotificationActionType;

/** 
 * Typ zwracany przez akcję pobierania powiadomień
 * Zawiera listę powiadomień i informację o kolejnych stronach
 */
export type GetNotificationsActionType =
	| { data: DataNotification[]; hasNext: boolean }
	| undefined;

/** Typ zwracany przez akcję pobierania liczby powiadomień */
export type GetTotalNotificationsActionType = number | undefined;
