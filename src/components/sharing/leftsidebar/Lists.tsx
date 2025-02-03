"use client";

import { Button } from "@/components/ui/button";
import { links } from "@/constants";
import { usePrevious } from "@/hooks/usePrevious";
import { useTweetModal } from "@/hooks/useTweetModal";
import { cn, getCurrentPath } from "@/lib/utils";
import { Plus, MessageSquareMore, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
	username: string;
	totalUnreadNotifications: number;
}

const Lists = ({ username, totalUnreadNotifications }: Props) => {
	const pathname = usePathname();
	const { addToNavigationHistory } = usePrevious();
	const openTweetModal = useTweetModal((state) => state.onOpen);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className="flex flex-col items-start gap-2 h-full">
			<ul className="flex flex-col space-y-3 w-full">
				{links.map((link) => {
					if (!link.href) link.href = `/${username}`;

					const isLogo = link.title === "X Logo";
					const isSamePath = !isLogo && link.href === pathname;

					return (
						<li
							key={link.title}
							className={cn(
								"w-full rounded-full overflow-hidden",
								isSamePath && "font-extrabold",
							)}
						>
							{isLogo ? (
								<button
									onClick={scrollToTop}
									className="w-full xl:p-4 max-xl:p-3 hover:bg-black-200 transition"
								>
									<span className="font-['Times_New_Roman'] text-2xl font-bold w-full text-center max-xl:hidden xl:inline">Akademik</span>
									<span className="font-['Times_New_Roman'] text-2xl font-bold w-full text-center max-xl:inline xl:hidden">A</span>
								</button>
							) : (
								<Link
									href={link.href}
									onClick={() => {
										const isNotifications = link.href === "/notifications";
										const isProfile = link.href === `/${username}`;
										if (isNotifications || isProfile) {
											addToNavigationHistory(getCurrentPath());
										}
									}}
									className={cn(
										"flex flex-row items-center space-x-5 tracking-wider text-xl max-xl:p-3 hover:bg-black-200 transition w-full",
										"xl:py-3.5 xl:px-4",
									)}
								>
									<div className="relative">
										<Image
											src={isSamePath ? link.activeIcon! : link.icon!}
											alt={link.title}
											width={30}
											height={30}
											className={cn(
												"w-[28px] h-[28px]",
												"object-contain"
											)}
										/>

										{link.href === "/notifications" &&
											Boolean(totalUnreadNotifications) && (
												<span className="min-w-[18px] h-[18px] grid place-items-center bg-blue text-white rounded-full absolute text-xs top-0 right-0">
													{totalUnreadNotifications}
												</span>
											)}
									</div>
									<span className="max-xl:hidden xl:inline">{link.title}</span>
								</Link>
							)}
						</li>
					);
				})}
				{/* Gemini w menu mobilnym */}
				<li className="xl:hidden w-full">
					<button
						onClick={() => window.postMessage({ type: 'TOGGLE_AI_ASSISTANT' }, '*')}
						className={cn(
							"flex flex-row items-center space-x-5 tracking-wider text-xl w-full",
							"p-3",
							"hover:bg-black-200 transition rounded-full",
							"group"
						)}
					>
						<div className="relative w-8 h-8 bg-gradient-to-br from-[#8E2DE2] via-[#4A00E0] to-[#1E90FF] rounded-lg flex items-center justify-center">
							<Sparkles className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
						</div>
						<span>Gemini</span>
					</button>
				</li>
				{/* Post button desktop */}
				<li className="xl:block hidden">
					<div className="mt-4 w-11/12">
						<Button
							variant="primary"
							className="w-full p-3"
							onClick={openTweetModal}
						>
							<span>Post</span>
						</Button>
					</div>
				</li>
				{/* Gemini desktop */}
				<li className="xl:block hidden w-full mt-2">
					<button
						onClick={() => window.postMessage({ type: 'TOGGLE_AI_ASSISTANT' }, '*')}
						className={cn(
							"flex flex-row items-center space-x-5 tracking-wider text-xl w-full",
							"py-3.5 px-4",
							"hover:bg-black-200 transition rounded-full",
							"group"
						)}
					>
						<div className="relative w-8 h-8 bg-gradient-to-br from-[#8E2DE2] via-[#4A00E0] to-[#1E90FF] rounded-lg flex items-center justify-center">
							<Sparkles className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
						</div>
						<span>Gemini</span>
					</button>
				</li>
			</ul>

			{/* Mobile Bottom Navigation */}
			<div className="max-sm:flex sm:hidden fixed bottom-0 px-6 pb-10 pt-4 left-0 right-0 border-t border-t-gray-300 backdrop-blur bg-black/80">
				<ul className="flex items-center justify-between w-full">
					<li>
						<Link href="/home" className="flex flex-col items-center space-y-2">
							<div className="relative">
								<Image
									src={pathname === "/home" ? "/assets/home-fill-icon.svg" : "/assets/home-icon.svg"}
									alt="Strona główna"
									width={25}
									height={25}
									className="object-contain transition-all"
								/>
							</div>
						</Link>
					</li>
					<li>
						<Link href={`/${username}`} className="flex flex-col items-center space-y-2">
							<div className="relative">
								<Image
									src={pathname === `/${username}` ? "/assets/profile-fill-icon.svg" : "/assets/profile-icon.svg"}
									alt="Profil"
									width={25}
									height={25}
									className="object-contain transition-all"
								/>
							</div>
						</Link>
					</li>
					<li>
						<Link href="/explore" className="flex flex-col items-center space-y-2">
							<div className="relative">
								<Image
									src={pathname === "/explore" ? "/assets/explore-fill-icon.svg" : "/assets/explore-icon.svg"}
									alt="Przeglądaj"
									width={25}
									height={25}
									className="object-contain transition-all"
								/>
							</div>
						</Link>
					</li>
					<li>
						<Link
							href="/notifications"
							className="flex flex-col items-center space-y-2"
							onClick={() => addToNavigationHistory(getCurrentPath())}
						>
							<div className="relative">
								<Image
									src={pathname === "/notifications" ? "/assets/notif-fill-icon.svg" : "/assets/notif-icon.svg"}
									alt="Powiadomienia"
									width={25}
									height={25}
									className="object-contain transition-all"
								/>
								{Boolean(totalUnreadNotifications) && (
									<span className="min-w-[18px] h-[18px] grid place-items-center bg-blue text-white rounded-full absolute text-xs -top-2 -right-2">
										{totalUnreadNotifications}
									</span>
								)}
							</div>
						</Link>
					</li>
					<li>
						<button
							onClick={() => window.postMessage({ type: 'TOGGLE_AI_ASSISTANT' }, '*')}
							className="flex flex-col items-center space-y-2"
						>
							<div className="relative w-[25px] h-[25px] bg-gradient-to-br from-[#8E2DE2] via-[#4A00E0] to-[#1E90FF] rounded-lg flex items-center justify-center">
								<Sparkles className="w-4 h-4 text-white" />
							</div>
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Lists;
