import { getTweetsAction } from "@/actions/tweet.action";
import { currentUser } from "@clerk/nextjs/server"; // Poprawny import dla Server Components
import { getUserAction } from "@/actions/user.action";
import { redirect } from "next/navigation";
import NotFound from "@/components/sharing/NotFound";
import Tweets from "@/components/cards/tweets/Tweets";
import { isValidPage } from "@/lib/utils";
import PaginationButtons from "@/components/sharing/PaginationButtons";

interface Props {
  searchParams: {
    page: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const page = isValidPage(searchParams?.page); // Walidacja strony (domyślnie 1)

  // Pobranie zalogowanego użytkownika
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
    return null;
  }

  // Pobranie użytkownika z bazy danych
  const user = await getUserAction(clerkUser.id);
  if (!user) {
    redirect("/");
    return null;
  }

  // Pobranie tweetów użytkownika
  const isFollowing = false; // Możesz zmienić na dynamiczne w przyszłości
  const tweets = await getTweetsAction({ userId: user.id, isFollowing, page });

  // Renderowanie treści
  return (
    <>
      {tweets?.data.length ? (
        <>
          {tweets.data.map((tweet, index) => (
            <Tweets key={tweet.id} tweet={tweet} userId={user.id} index={index} />
          ))}

          <PaginationButtons
            currentPage={page}
            currentPath={"/home"}
            hasNext={tweets.hasNext}
          />
        </>
      ) : (
        <NotFound
          title="Witaj Akademik"
          description="To jest najlepszy moment, aby dołączyć do konwersacji. Zacznij obserwować innych, aby zobaczyć ich tweety tutaj."
        />
      )}
    </>
  );
};

export default Page;
