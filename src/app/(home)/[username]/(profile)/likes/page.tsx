import { getTweetsAction } from "@/actions/tweet.action";
import { getUserAction, getUserByUsernameAction } from "@/actions/user.action";
import NotFound from "@/components/sharing/NotFound";
import Tweets from "@/components/cards/tweets/Tweets";
import { currentUser as clerkCurrentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isValidPage } from "@/lib/utils";
import PaginationButtons from "@/components/sharing/PaginationButtons";
import React from "react";

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
		title: `Posty polubione przez ${user.name} (${user.username})`,
		openGraph: {
			title: `Posty polubione przez ${user.name} (${user.username})`,
		},
	};
};

const Page = async ({ params, searchParams }: Props) => {
	const { username } = params;
	const { page: qPage } = searchParams;
	const page = isValidPage(qPage);

	// currentUser()
	const clerkUser = await clerkCurrentUser();
	if (!clerkUser) return null;

	const currentUser = await getUserAction(clerkUser.id);
	if (!currentUser) redirect("/");

	const user = await getUserByUsernameAction(username);
	if (!user) return <NotFound />;

	let tweets = await getTweetsAction({
		userId: user.id,
		isProfile: true,
		isLikes: true,
		page,
	});

	/**
	 * Generates a comment for the given function body.
	 *
	 * @return {JSX.Element} The JSX element of the NotFound component.
	 */
	const savePostsForLater = (): React.ReactElement => {
		const isSameUserId = currentUser.id === user.id;
		const title = isSameUserId
			? "Nie masz jeszcze żadnych polubień"
			: `@${user.username} nie ma jeszcze polubień`;
		const description = isSameUserId
			? "Kliknij serduszko na dowolnym poście, aby okazać uznanie. Gdy to zrobisz, post pojawi się tutaj."
			: "Gdy pojawią się polubienia, posty będą wyświetlane tutaj.";

		return <NotFound title={title} description={description} />;
	};

	return !tweets?.data.length ? (
		savePostsForLater()
	) : (
		<>
			{tweets?.data.map((tweet) => (
				<Tweets key={tweet.id} tweet={tweet} userId={user.id} />
			))}

			<PaginationButtons
				currentPage={page}
				currentPath={`/${user.username}/likes`}
				hasNext={tweets.hasNext}
			/>
		</>
	);
};

export default Page;
