import { toggleFollowUserAction, removeFollowerAction } from "@/actions/user.action";
import {
	CopyLinkUserProps,
	toggleFollowUserProps,
} from "@/interfaces/user.interface";
import { toastOptions } from "./utils";
import { followUserNotificationAction } from "@/actions/notification.action";

/**
 * Toggles the follow status of a user.
 *
 * @param {toggleFollowUserProps} toggleFollowUserProps - The properties needed for toggling the follow status.
 * @return {void} This function does not return anything.
 */
export const toggleFollowUser = ({
	isPending,
	startTransition,
	toast,
	path,
	username,
	followed,
	userId,
	currentUserId,
}: toggleFollowUserProps): void => {
	if (isPending || userId === currentUserId) return;

	startTransition(() => {
		toggleFollowUserAction({ userId, currentUserId, path });
		
		// Nie wysyłamy powiadomienia przy usuwaniu obserwującego
		if (!followed) {
			followUserNotificationAction({
				userId,
				sourceId: currentUserId,
				parentIdUser: currentUserId,
				path,
			});
		}
	});

	const message = followed
		? `Przestałeś obserwować ${username}`
		: `Zacząłeś obserwować ${username}`;

	toast(message, toastOptions);
};

/**
 * Copies the user's link to the clipboard and displays a toast message.
 *
 * @param {CopyLinkUserProps} props - The properties needed to copy the link.
 * @param {ToastFunction} props.toast - The function to display toast messages.
 * @param {string} props.username - The username to be included in the link.
 */
export const copyLinkUser = ({ toast, username }: CopyLinkUserProps) => {
	try {
		if (!username) throw new Error("username required");

		const url = process.env.NEXT_PUBLIC_NEXT_URL || 'https://mini-twitter-sergiusz01.vercel.app';
		navigator.clipboard.writeText(`${url}/${username}`);

		toast("Copied to clipboard", toastOptions);
	} catch (error) {
		console.error("Error copying link:", error);
		toast("Error copying link", toastOptions);
	}
};

/**
 * Usuwa obserwującego użytkownika.
 */
export const removeFollower = ({
	isPending,
	startTransition,
	toast,
	path,
	username,
	followerId,
	userId,
}: {
	isPending: boolean;
	startTransition: (callback: () => void) => void;
	toast: any;
	path: string;
	username: string;
	followerId: string;
	userId: string;
}): void => {
	if (isPending) return;

	startTransition(() => {
		removeFollowerAction({ followerId, userId, path });
	});

	toast(`Usunięto obserwującego ${username}`, toastOptions);
};
