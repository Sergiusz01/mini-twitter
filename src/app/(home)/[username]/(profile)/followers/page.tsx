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

export const generateMetadata = async ({ params }: { params: { username: string } }) => {
	const { username } = params;
	const user = await getUserByUsernameAction(username);

	if (!user) {
		return {
			title: "Profil",
		};
	}

	return {
		title: `Osoby obserwujące ${user.name} (${user.username})`,
		openGraph: {
			title: `Osoby obserwujące ${user.name} (${user.username})`,
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

	// Pobierz użytkowników, którzy obserwują danego użytkownika
	const followers = await Promise.all(
		user.followers.map(async (follower) => {
			const followerUser = await getUserAction(follower.followingId);
			return followerUser;
		})
	);

	const validFollowers = followers.filter((follower): follower is NonNullable<typeof follower> => follower !== null && follower !== undefined);

	return (
		<div className="flex flex-col">
			<h2 className="text-xl font-bold px-3 py-4">Obserwujący</h2>
			{validFollowers.length > 0 ? (
				<>
					{validFollowers.map((follower, index) => (
						<UsersTwo
							key={follower.id}
							userId={follower.id}
							name={follower.name}
							username={follower.username}
							imageUrl={follower.imageUrl}
							bio={follower.bio}
							currentUser={currentUser}
							showRemoveButton={currentUser.username === username}
							index={index}
						/>
					))}
				</>
			) : (
				<div className="p-4 text-center text-gray-200">
					Ten użytkownik nie ma jeszcze obserwujących
				</div>
			)}
		</div>
	);
};

export default Page; 
