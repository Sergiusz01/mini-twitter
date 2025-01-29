import { getUserAction, getUserByUsernameAction } from "@/actions/user.action";
import NotFound from "@/components/sharing/404";
import { currentUser as clerkCurrentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isValidPage } from "@/lib/utils";
import PaginationButtons from "@/components/sharing/PaginationButtons";
import UsersTwo from "@/components/cards/UsersTwo";

interface Props {
	params: {
		username: string;
	};
	searchParams: {
		page: string;
	};
}

export const generateMetadata = async ({ params }: Props) => {
	const { username } = params;
	const user = await getUserByUsernameAction(username);

	if (!user) {
		return {
			title: "Profil",
		};
	}

	return {
		title: `Osoby obserwowane przez ${user.name} (${user.username})`,
		openGraph: {
			title: `Osoby obserwowane przez ${user.name} (${user.username})`,
		},
	};
};

const Page = async ({ params, searchParams }: Props) => {
	const { username } = params;
	const { page: qPage } = searchParams;
	const page = isValidPage(qPage);

	const clerkUser = await clerkCurrentUser();
	if (!clerkUser) return null;

	const currentUser = await getUserAction(clerkUser.id);
	if (!currentUser) redirect("/");

	const user = await getUserByUsernameAction(username);
	if (!user) return <NotFound />;

	// Pobierz użytkowników, których obserwuje dany użytkownik
	const following = await Promise.all(
		user.followings.map(async (follow) => {
			const followedUser = await getUserAction(follow.followerId);
			return followedUser;
		})
	);

	const validFollowing = following.filter((follow): follow is NonNullable<typeof follow> => follow !== null && follow !== undefined);

	return (
		<div className="flex flex-col">
			<h2 className="text-xl font-bold px-3 py-4">Obserwowani</h2>
			{validFollowing.length > 0 ? (
				<>
					{validFollowing.map((followed) => (
						<UsersTwo
							key={followed.id}
							userId={followed.id}
							name={followed.name}
							username={followed.username}
							imageUrl={followed.imageUrl}
							bio={followed.bio}
							currentUser={currentUser}
						/>
					))}
				</>
			) : (
				<div className="p-4 text-center text-gray-200">
					Ten użytkownik nie obserwuje jeszcze nikogo
				</div>
			)}
		</div>
	);
};

export default Page; 