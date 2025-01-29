import { getTweetsAction } from "@/actions/tweet.action";
import { currentUser } from "@clerk/nextjs/server";
import { getUserAction } from "@/actions/user.action";
import { redirect } from "next/navigation";
import { isValidPage } from "@/lib/utils";
import PaginationButtons from "@/components/sharing/PaginationButtons";
import Tweets from "@/components/cards/tweets/Tweets";
import NotFound from "@/components/sharing/NotFound";
import { Suspense } from "react";

interface Props {
	searchParams: {
		page: string;
	};
}

const Page = async ({ searchParams }: Props) => {
	const { page: qPage } = searchParams;
	const page = isValidPage(qPage);

	const clerkUser = await currentUser();
	if (!clerkUser) return null;

	const user = await getUserAction(clerkUser.id);
	if (!user) redirect("/");

	const isFollowing = true;
	const tweets = await getTweetsAction({ userId: user.id, isFollowing, page });

	return (
		<Suspense fallback={<div>Ładowanie...</div>}>
			{tweets?.data.length ? (
				<>
					{tweets?.data.map((tweet) => (
						<Tweets key={tweet.id} tweet={tweet} userId={user.id} />
					))}

					<PaginationButtons
						currentPage={page}
						currentPath="/home/following"
						hasNext={tweets.hasNext}
					/>
				</>
			) : (
				<NotFound
					title="Brak postów do wyświetlenia"
					description="Nie obserwujesz nikogo lub osoby, które obserwujesz nie mają żadnych postów"
				/>
			)}
		</Suspense>
	);
};

export default Page;
