"use client";

import { usePrevious } from "@/hooks/usePrevious";
import { cn, getCurrentPath } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface TabProps {
	title: string;
}

const Tab = ({ title }: TabProps) => {
	const { addToNavigationHistory } = usePrevious();
	const searchParams = useSearchParams();
	const queryQ = searchParams?.get("q");
	const queryF = searchParams?.get("f");

	const currentPathIsTop = title === "Popularne" && !queryF;
	const isSamePath = title.toLowerCase() === queryF?.toLowerCase();

	const getTabParam = (title: string) => {
		switch (title) {
			case "Popularne":
				return "Top";
			case "Najnowsze":
				return "Latest";
			case "Ludzie":
				return "people";
			case "Media":
				return "media";
			default:
				return title.toLowerCase();
		}
	};

	const optionLink = {
		pathname: "/search",
		query: {
			q: queryQ,
			f: getTabParam(title),
		},
	};

	return (
		<Link
			href={optionLink}
			onClick={() => addToNavigationHistory(getCurrentPath())}
			className="flex-1 flex justify-center cursor-pointer hover:bg-gray-300 transition"
		>
			<p
				className={cn(
					"py-3.5",
					currentPathIsTop || isSamePath
						? "border-b-[3px] border-b-blue font-bold text-white"
						: "text-gray-200 font-normal",
				)}
			>
				{title}
			</p>
		</Link>
	);
};

const Tabs = () => {
	return (
		<section className="border-b border-gray-300">
			<ul className="flex items-center justify-evenly">
				<Tab title="Popularne" />
				<Tab title="Najnowsze" />
				<Tab title="People" />
				<Tab title="Media" />
			</ul>
		</section>
	);
};

export default Tabs;
