import { getTweetAction } from "@/actions/tweet.action";
import NotFound from "@/components/sharing/404";
import ButtonCreatePostMobile from "@/components/sharing/ButtonCreatePostMobile";
import Loading from "@/components/sharing/Loading";
import DetailTweet from "@/components/tweetId/DetailTweet";
import Topbar from "@/components/tweetId/Topbar";
import { ReactNode, Suspense } from "react";
import { currentUser as clerkCurrentUser } from "@clerk/nextjs/server";
import { getUserAction, getUserByUsernameAction } from "@/actions/user.action";
import { redirect } from "next/navigation";
import { DataTweet } from "@/interfaces/tweet.interface";

interface Props {
  children: ReactNode;
  params: {
    username: string;
    tweetId: string;
  };
}

export const generateMetadata = async ({ params }: Props) => {
  const { tweetId, username } = params;

  const [dataTweet, clerkUser, user] = await Promise.all([
    getTweetAction(tweetId),
    clerkCurrentUser(),
    getUserByUsernameAction(username),
  ]);

  if (!dataTweet || !clerkUser || !user) {
    return {
      title: "Not Found",
      description: "The requested tweet or user does not exist.",
    };
  }

  return {
    title: `${dataTweet.user.name} on X: "${dataTweet.text}"`,
    description: dataTweet.text,
    openGraph: {
      title: `${dataTweet.user.name} on X`,
      description: dataTweet.text,
      url: `/${dataTweet.user.username}/status/${tweetId}`,
      images: [dataTweet.imageUrl],
      type: "article",
    },
  };
};

const Layout = async ({ children, params }: Props) => {
  const { tweetId, username } = params;

  // Fetch necessary data in parallel
  const [dataTweet, clerkUser, user] = await Promise.all([
    getTweetAction(tweetId),
    clerkCurrentUser(),
    getUserByUsernameAction(username),
  ]);

  if (!dataTweet || !clerkUser || !user) {
    return <NotFound />;
  }

  // Get the current user's information
  const currentUser = await getUserAction(clerkUser.id);
  if (!currentUser) {
    redirect("/");
  }

  // Prepare the data for replying to the tweet
  const dataReplyTweet: DataTweet = {
    id: dataTweet.id,
    text: dataTweet.text,
    imageUrl: dataTweet.imageUrl,
    createdAt: dataTweet.createdAt,
    parentId: dataTweet.id,
    isParentIdExist: Boolean(dataTweet.parentId),
    user: {
      id: dataTweet.user.id,
      name: dataTweet.user.name,
      username: dataTweet.user.username,
      imageUrl: dataTweet.user.imageUrl,
    },
  };

  return (
    <>
      {/* Mobile button for creating posts */}
      <ButtonCreatePostMobile isMobile dataTweet={dataReplyTweet} />
      {/* Top navigation bar */}
      <Topbar />
      {/* Detailed view of the tweet */}
      <DetailTweet tweet={dataTweet} userId={currentUser.id} />
      {/* Render child components with a loading fallback */}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
};

export default Layout;
