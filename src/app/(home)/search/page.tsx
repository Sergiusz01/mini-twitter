import { getTweetsBySearchAction } from "@/actions/tweet.action";
import { getUserAction, getUsersAction } from "@/actions/user.action";
import Latest from "@/components/search/Latest";
import Media from "@/components/search/Media";
import People from "@/components/search/People";
import Tabs from "@/components/search/Tabs";
import Top from "@/components/search/Top";
import NotFound from "@/components/sharing/NotFound";
import { isValidPage } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
	searchParams: {
		q: string;
		f: string;
		page: string;
	};
}

export const generateMetadata = async ({ searchParams }: Props) => {
	const { q: queryQ } = searchParams;

	return {
		title: `${queryQ} - Wyszukiwanie`,
		openGraph: {
			title: `${queryQ} - Wyszukiwanie`,
			siteName: "Akademik",
		},
	};
};

const Page = async ({ searchParams }: Props) => {
	const { q: queryQ, f: queryF, page: qPage } = searchParams;
	const page = isValidPage(qPage);
	if (!queryQ) redirect("/explore");

	const clerkUser = await currentUser();
	if (!clerkUser) return null;

	const user = await getUserAction(clerkUser.id);
	if (!user || "message" in user) redirect("/");

	const users = await getUsersAction({
		userId: user.id,
		isOnSearch: true,
		searchQuery: queryQ,
		page: queryF === "people" ? page : 0,
		size: 30,
	});

	const tweets = await getTweetsBySearchAction({
		searchQuery: queryQ,
		page,
	});

	/**
	 * Generates the content to be displayed based on the query and user information.
	 *
	 * @return {React.ReactNode} The generated content to be displayed.
	 */
	const DisplayContent = (): ReactNode => {
		const Comp = {
			top: (
				<Top
					currentUser={user}
					queryQ={queryQ}
					page={page}
					people={users?.data}
					tweets={tweets}
				/>
			),
			latest: (
				<Latest userId={user.id} tweets={tweets} queryQ={queryQ} page={page} />
			),
			people: (
				<People page={page} queryQ={queryQ} people={users} currentUser={user} />
			),
			media: (
				<Media tweets={tweets} userId={user.id} page={page} queryQ={queryQ} />
			),
			notfound: (
				<NotFound
					title={`Brak wyników dla "${queryQ}"`}
					description="Spróbuj wyszukać coś innego"
				/>
			),
		} as any;

		const [isUsersDataExist, isTweetsDataExist, isQueryFExist] = [
			Boolean(users?.data.length),
			Boolean(tweets?.data.length),
			Boolean(queryF),
		];

		if (!isUsersDataExist && !isTweetsDataExist) return Comp["notfound"];
		if (!isQueryFExist) return Comp["top"];

		return Comp[queryF.toLowerCase()];
	};

	return (
		<>
			<Tabs />
			<DisplayContent />
		</>
	);
};

export default Page;
