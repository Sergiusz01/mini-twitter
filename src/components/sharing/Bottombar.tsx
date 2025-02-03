"use client";

import { linksMobile } from "@/constants";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
	username: string;
	totalUnreadNotifications: number;
}

const Bottombar = ({ username, totalUnreadNotifications }: Props) => {
	const pathname = usePathname();

	// Walidacja username
	const validUsername = username || "";

	return (
		<div className="max-sm:flex sm:hidden fixed bottom-0 px-6 pb-10 pt-4 left-0 right-0 border-t border-t-gray-300 backdrop-blur bg-black/80">
			<ul className="flex items-center justify-between w-full">
				{linksMobile.map((link) => {
					if (!link.href) link.href = `/${validUsername}`;
					if (link.href === "gemini") {
						return (
							<li key={link.title}>
								<button
									onClick={() => window.postMessage({ type: 'TOGGLE_AI_ASSISTANT' }, '*')}
									className="flex flex-col items-center space-y-2"
								>
									<div className="relative w-[25px] h-[25px] bg-gradient-to-br from-[#8E2DE2] via-[#4A00E0] to-[#1E90FF] rounded-lg flex items-center justify-center">
										<Sparkles className="w-4 h-4 text-white" />
									</div>
								</button>
							</li>
						);
					}

					const isSamePath = link.href === pathname;
					const isOnStatusPost =
						link.href === "/home" && pathname.includes("status");

					return (
						<li key={link.title}>
							<Link
								href={link.href}
								className="flex flex-col items-center space-y-2"
							>
								<div className="relative">
									<Image
										src={
											isSamePath || isOnStatusPost ? link.activeIcon : link.icon
										}
										alt={link.title}
										width={25}
										height={25}
										className="object-contain transition-all"
									/>
									{link.href === "/notifications" &&
										Boolean(totalUnreadNotifications) && (
											<span className="min-w-[18px] h-[18px] grid place-items-center bg-blue text-white rounded-full absolute text-xs -top-2 -right-2">
												{totalUnreadNotifications}
											</span>
										)}
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Bottombar;
