import { URL_REGEX } from "@/lib/tweet";
import { convertToHttps } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

interface Props {
	content: string;
}

const TweetText = ({ content }: Props) => {
	const router = useRouter();
	const words = content.split(" ");

	const handleHashtagClick = (hashtag: string) => {
		router.push(`/search?q=${encodeURIComponent(hashtag)}`);
	};

	const handleMentionClick = (username: string) => {
		router.push(`/${username.slice(1)}`);
	};

	return (
		<div className="whitespace-pre-wrap break-words text-[15px] leading-normal">
			{words.map((word: string) => {
				if (word.match(URL_REGEX)) {
					return (
						<Fragment key={word + new Date()}>
							<Link
								href={convertToHttps(word)?.href!}
								onClick={(e) => e.stopPropagation()}
								target="_blank"
								className="text-blue hover:underline"
							>
								{convertToHttps(word)?.title}
							</Link>{" "}
						</Fragment>
					);
				} else if (word.startsWith('#')) {
					return (
						<Fragment key={word + new Date()}>
							<span
								onClick={(e) => {
									e.stopPropagation();
									handleHashtagClick(word);
								}}
								className="text-blue hover:underline cursor-pointer"
							>
								{word}
							</span>{" "}
						</Fragment>
					);
				} else if (word.startsWith('@')) {
					return (
						<Fragment key={word + new Date()}>
							<span
								onClick={(e) => {
									e.stopPropagation();
									handleMentionClick(word);
								}}
								className="text-blue hover:underline cursor-pointer"
							>
								{word}
							</span>{" "}
						</Fragment>
					);
				}
				return word + " ";
			})}
		</div>
	);
};

export default TweetText;
