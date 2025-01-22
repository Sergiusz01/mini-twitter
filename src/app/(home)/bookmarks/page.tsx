import { getTweetsAction } from "@/actions/tweet.action";
import { getUserAction } from "@/actions/user.action";
import Tweets from "@/components/cards/tweets/Tweets";
import NotFound from "@/components/sharing/NotFound";
import PaginationButtons from "@/components/sharing/PaginationButtons";
import { isValidPage } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server"; // Poprawny import dla Server Components
import { redirect } from "next/navigation";

interface Props {
	searchParams: {
		page: string;
	};
}
const Page = async ({ searchParams }: Props) => {
	const { page: qPage } = searchParams;
	const page = isValidPage(qPage);

  // Pobranie danych użytkownika Clerk
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
    return null;
  }

  // Pobranie danych użytkownika z bazy
  const user = await getUserAction(clerkUser.id);
  if (!user) {
    redirect("/");
    return null;
  }

  // Pobranie tweetów użytkownika (zakładek)
  const tweets = await getTweetsAction({
    userId: user.id,
    isBookmarks: true,
    page,
  });

  const isBookmarksEmpty = !tweets?.data.length;

  return (
    <>
      {!isBookmarksEmpty ? (
        <>
          {/* Renderowanie tweetów */}
          {tweets?.data.map((tweet) => (
            <Tweets key={tweet.id} tweet={tweet} userId={user.id} />
          ))}

          {/* Paginacja */}
          <PaginationButtons
            currentPage={page}
            currentPath="/bookmarks"
            hasNext={tweets.hasNext}
          />
        </>
      ) : (
        // Wyświetlenie komunikatu, gdy zakładki są puste
        <NotFound
          title="Save posts for later"
          description="Bookmark posts to easily find them again in the future."
        />
      )}
    </>
  );
};

export default Page;
