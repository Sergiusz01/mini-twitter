import { getTweetsAction } from "@/actions/tweet.action";
import { getUserAction, getUserByUsernameAction } from "@/actions/user.action";
import NotFound from "@/components/sharing/404";
import Tweets from "@/components/cards/tweets/Tweets";
import { currentUser as clerkCurrentUser } from "@clerk/nextjs/server"; // Użycie wersji serwerowej
import { redirect } from "next/navigation";
import PaginationButtons from "@/components/sharing/PaginationButtons";
import { isValidPage } from "@/lib/utils";

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
      title: "Profile",
    };
  }

  return {
    title: `${user.name} (${user.username})`,
    openGraph: {
      title: `${user.name} (${user.username})`,
      description: user.bio || "Check out this profile on X (formerly Twitter).",
      images: [user.imageUrl],
      url: `${process.env.NEXT_PUBLIC_NEXT_URL}/${user.username}`,
    },
  };
};

const Page = async ({ params, searchParams }: Props) => {
	const { username } = params;
	const { page: qPage } = searchParams;
	const page = isValidPage(qPage);

  // Pobranie zalogowanego użytkownika Clerk
  const clerkUser = await clerkCurrentUser();
  if (!clerkUser) {
    redirect("/sign-in");
    return null;
  }

  // Pobranie danych zalogowanego użytkownika z bazy
  const currentUser = await getUserAction(clerkUser.id);
  if (!currentUser) {
    redirect("/");
    return null;
  }

  // Pobranie danych profilu użytkownika z URL
  const user = await getUserByUsernameAction(username);
  if (!user) {
    return <NotFound />;
  }

  // Pobranie tweetów użytkownika
  const tweets = await getTweetsAction({
    userId: user.id,
    isProfile: true,
    page,
  });

  return tweets?.data.length ? (
    <>
      {/* Renderowanie tweetów */}
      {tweets.data.map((tweet) => (
        <Tweets key={tweet.id} tweet={tweet} userId={user.id} />
      ))}

      {/* Paginacja */}
      <PaginationButtons
        currentPage={page}
        currentPath={`/${user.username}`}
        hasNext={tweets.hasNext}
      />
    </>
  ) : (
    <NotFound
      title="No tweets yet"
      description={`${user.name} hasn't tweeted anything yet.`}
    />
  );
};

export default Page;
