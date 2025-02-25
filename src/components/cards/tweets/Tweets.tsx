"use client";

import { DataTweet, DetailTweet } from "@/interfaces/tweet.interface";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { customDatePost, getCurrentPath, extractYouTubeId, extractSpotifyUrl, extractGithubUrl } from "@/lib/utils";
import { renderText } from "@/lib/tweet";
import { Like, Share, Comment, Menu } from "./";
import TweetText from "@/components/sharing/TweetText";
import { usePrevious } from "@/hooks/usePrevious";
import YouTubeEmbed from "@/components/sharing/YouTubeEmbed";
import SpotifyEmbed from "@/components/sharing/SpotifyEmbed";
import GithubEmbed from "@/components/sharing/GithubEmbed";

interface Props {
	tweet: DetailTweet;
	userId: string;
}

const Tweets = ({ tweet, userId }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const { addToNavigationHistory } = usePrevious();
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

	const formattedCreatedAt =
		tweet.createdAt && customDatePost(tweet.createdAt.getTime());

	const isOwnTweet = tweet.userId === userId;

	const youtubeId = extractYouTubeId(tweet.text);
	const spotifyUrl = extractSpotifyUrl(tweet.text);
	const githubUrl = extractGithubUrl(tweet.text);

	const redirectToDetailPost = () => {
		addToNavigationHistory(getCurrentPath());
		router.push(`/${tweet.user.username}/status/${tweet.id}`);
	};

	useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) return null;

	return (
		<article
			className="flex gap-x-4 px-4 py-4 border-b border-b-gray-300 bg-black-100 hover:bg-black-200/40 transition-all cursor-pointer"
			onClick={(e) => {
				e.stopPropagation();
				redirectToDetailPost();
			}}
		>
			<div className="flex flex-col items-start">
				<div 
					className="flex items-start jsutify-start rounded-full overflow-hidden cursor-pointer"
					onClick={(e) => {
						e.stopPropagation();
						router.push(`/${tweet.user.username}`);
					}}
				>
					<Image
						src={tweet.user.imageUrl}
						alt={tweet.user.name}
						width={35}
						height={35}
						priority
						className="object-cover rounded-full w-[35px] h-[35px]"
					/>
				</div>
				{tweet.parentId && (
					<div className="flex-1 w-[2px] bg-gray-300 ml-[17px] mt-2" />
				)}
			</div>
			<div className="flex-1 flex flex-col space-y-4">
				{tweet.parentId && tweet.parent && (
					<p className="text-sm text-gray-200">
						Odpowiedź do{" "}
						<span
							className="text-blue hover:underline cursor-pointer"
							onClick={(e) => {
								e.stopPropagation();
								router.push(`/${tweet.parent?.user.username}`);
							}}
						>
							@{tweet.parent.user.username}
						</span>
					</p>
				)}
				<section className="flex-1 flex justify-between">
					<div className="flex-1 flex flex-col space-y-3">
						<div className="flex-1 flex items-center flex-wrap gap-x-2">
							<h5 
								onClick={(e) => {
									e.stopPropagation();
									router.push(`/${tweet.user.username}`);
								}}
								className="text-ellipsis overflow-hidden whitespace-nowrap font-bold text-white w-fit max-w-[150px] cursor-pointer hover:underline"
							>
								{tweet.user.name}
							</h5>
							<p className="text-ellipsis whitespace-nowrap font-normal text-gray-200">
								@{tweet.user.username} · {formattedCreatedAt}
							</p>
						</div>
						<TweetText content={renderText(tweet.text)} />
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

				<section className="flex flex-col space-y-3">
					<section>
						{tweet.imageUrl && (
							<Image
								src={tweet.imageUrl}
								alt="Preview Image"
								width={600}
								height={300}
								loading="lazy"
								className="object-contain rounded-xl"
								unoptimized
							/>
						)}
						{youtubeId && <YouTubeEmbed videoId={youtubeId} />}
						{spotifyUrl && <SpotifyEmbed spotifyUrl={spotifyUrl} />}
						{githubUrl && <GithubEmbed githubUrl={githubUrl} />}
					</section>

					<section className="flex items-center gap-x-10">
						<Comment
							totalReplies={tweet._count.replies}
							dataTweet={dataTweet}
						/>
						<Like
							liked={liked!}
							path={pathname}
							userId={tweet.user.id}
							currentUserId={userId}
							threadId={tweet.id}
							totalLikes={tweet._count.likes}
						/>
						<div className="flex-1 flex justify-end">
							<Share
								path={pathname}
								userId={userId}
								tweetId={tweet.id}
								bookmark={bookmark!}
								username={tweet.user.username}
							/>
						</div>
					</section>
				</section>
			</div>
		</article>
	);
};

export default Tweets;
