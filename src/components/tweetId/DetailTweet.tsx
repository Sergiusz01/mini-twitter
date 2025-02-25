"use client";

import { DataTweet, type DetailTweet } from "@/interfaces/tweet.interface";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDateTime, extractYouTubeId, extractSpotifyUrl, extractGithubUrl } from "@/lib/utils";
import { renderText } from "@/lib/tweet";
import { Share, Bookmark, Like, Menu, Comment } from "../cards/tweets";
import TweetText from "../sharing/TweetText";
import { useRouter } from "next/navigation";
import YouTubeEmbed from "@/components/sharing/YouTubeEmbed";
import SpotifyEmbed from "@/components/sharing/SpotifyEmbed";
import GithubEmbed from "@/components/sharing/GithubEmbed";

interface Props {
	tweet: DetailTweet;
	userId: string;
}

const DetailTweet = ({ tweet, userId }: Props) => {
	const pathname = usePathname();
	const router = useRouter();
	const [isMounted, setIsMounted] = useState(false);
	const liked = tweet.likes.find((like) => like.userId === userId);
	const followed = tweet.user.followers.find(
		({ followingId }) => followingId === userId,
	);
	const bookmark = tweet.bookmarks.find((item) => item.userId === userId);

	const dataTweet: DataTweet = {
		id: tweet.id,
		text: tweet.text,
		imageUrl: tweet.imageUrl,
		createdAt: tweet.createdAt,
		parentId: tweet.id,
		isParentIdExist: Boolean(tweet.parentId),
		user: {
			id: tweet.user.id,
			name: tweet.user.name,
			username: tweet.user.username,
			imageUrl: tweet.user.imageUrl,
		},
	};

	const isOwnTweet = tweet.userId === userId;

	const youtubeId = extractYouTubeId(tweet.text);
	const spotifyUrl = extractSpotifyUrl(tweet.text);
	const githubUrl = extractGithubUrl(tweet.text);

	const displayTweetImage = () => {
		if (!tweet.imageUrl) return null;

		return (
			<Image
				src={tweet.imageUrl}
				alt="Preview Image"
				width={600}
				height={300}
				loading="lazy"
				className="object-contain rounded-xl w-full"
				unoptimized
			/>
		);
	};

	const displayYouTubeVideo = () => {
		if (!youtubeId) return null;
		return <YouTubeEmbed videoId={youtubeId} />;
	};

	const displaySpotifyEmbed = () => {
		if (!spotifyUrl) return null;
		return <SpotifyEmbed spotifyUrl={spotifyUrl} />;
	};

	const displayGithubEmbed = () => {
		if (!githubUrl) return null;
		return <GithubEmbed githubUrl={githubUrl} />;
	};

	useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) return null;

	return (
		<section className="flex flex-col py-4 px-4 space-y-4">
			{tweet.parentId && tweet.parent && (
				<p className="text-sm text-gray-200">
					Odpowiedź do{" "}
					<span
						className="text-blue hover:underline cursor-pointer"
						onClick={() => router.push(`/${tweet.parent?.user.username}`)}
					>
						@{tweet.parent.user.username}
					</span>
				</p>
			)}
			<section className="flex items-center justify-between gap-x-10">
				<div className="flex items-start justify-start gap-x-4">
					<Image
						src={tweet.user.imageUrl}
						alt={tweet.user.name}
						width={35}
						height={35}
						priority
						className="object-cover rounded-full w-[35px] h-[35px]"
					/>
					<div className="flex-1 flex flex-col items-start -space-y-1">
						<h5 className="text-ellipsis overflow-hidden whitespace-nowrap font-bold text-white w-fit max-w-[150px]">
							{tweet.user.name}
						</h5>
						<p className="text-ellipsis whitespace-nowrap font-normal text-gray-200">
							@{tweet.user.username}
						</p>
					</div>
				</div>
				<div>
					<Menu
						username={tweet.user.username}
						tweetId={tweet.id}
						path={pathname}
						isOwnTweet={isOwnTweet}
						followed={followed!}
						userId={tweet.user.id}
						currentUserId={userId}
					/>
				</div>
			</section>

			<section className="flex-1 flex flex-col space-y-10">
				<div className="flex flex-col space-y-3">
					<TweetText content={renderText(tweet.text)} />
					{displayTweetImage()}
					{displayYouTubeVideo()}
					{displaySpotifyEmbed()}
					{displayGithubEmbed()}
					<p className="font-normal text-gray-200">
						{formatDateTime(tweet.createdAt)}
					</p>
				</div>
			</section>

			<section className="py-1 border-t border-b border-gray-300">
				<div className="flex items-center justify-between gap-x-8">
					<Comment totalReplies={tweet._count.replies} dataTweet={dataTweet} />
					<Like
						liked={liked!}
						path={pathname}
						userId={tweet.user.id}
						currentUserId={userId}
						threadId={tweet.id}
						totalLikes={tweet._count.likes}
					/>
					<Bookmark
						userId={userId}
						path={pathname}
						threadId={tweet.id}
						bookmark={bookmark!}
						totalBookmarks={tweet._count.bookmarks}
					/>
					<Share
						path={pathname}
						userId={userId}
						tweetId={tweet.id}
						bookmark={bookmark!}
						username={tweet.user.username}
						isDetailTweet
					/>
				</div>
			</section>
		</section>
	);
};

export default DetailTweet;
