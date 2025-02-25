"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { cn, getCurrentPath } from "@/lib/utils";
import { UserWithFollowers } from "@/interfaces/user.interface";
import { removeFollower, toggleFollowUser } from "@/lib/user";
import toast from "react-hot-toast";
import Link from "next/link";
import { usePrevious } from "@/hooks/usePrevious";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal, UserMinus } from "lucide-react";

interface UsersProps {
	username: string;
	name: string;
	imageUrl: string;
	userId: string;
	bio: string | null;
	currentUser: UserWithFollowers;
	showRemoveButton?: boolean;
}

const UsersTwo = ({
	username,
	name,
	imageUrl,
	userId,
	bio,
	currentUser,
	showRemoveButton = false,
}: UsersProps) => {
	const path = usePathname();
	const { addToNavigationHistory } = usePrevious();
	const [isPending, startTransition] = useTransition();

	const followed = currentUser.followings.find(
		({ followerId }) => followerId === userId,
	);

	const isFollowed = () => {
		if (isPending) return "...";
		if (followed) return "Przestań obserwować";
		return "Obserwuj";
	};

	const isOwnProfile = currentUser.id === userId;

	return (
		<section
			className={cn(
				"w-full hover:bg-gray-300/30 p-3 overflow-hidden flex items-start justify-start gap-x-4",
			)}
		>
			<Image
				src={imageUrl}
				alt={name}
				width={40}
				height={40}
				className="object-cover rounded-full w-[40px] h-[40px]"
			/>
			<section className="w-full flex flex-col">
				<div className="w-full">
					<div className="w-full flex items-center justify-between gap-x-2 overflow-hidden">
						<div className="flex items-start flex-col -space-y-1">
							<Link
								href={`/${username}`}
								onClick={() => addToNavigationHistory(getCurrentPath())}
								className={cn(
									"font-bold text-white whitespace-nowrap hover:underline",
								)}
							>
								{name}
							</Link>
							<p className="font-normal text-gray-200 whitespace-nowrap">
								@{username}
							</p>
						</div>
						<div className="flex items-center gap-x-2">
							{showRemoveButton && (
								<DropdownMenu>
									<DropdownMenuTrigger className="!outline-none p-1.5 border border-gray-200 rounded-full text-white hover:bg-gray-300/30">
										<MoreHorizontal size="20" />
									</DropdownMenuTrigger>
									<DropdownMenuContent side="bottom" align="end">
										<DropdownMenuItem
											onClick={() =>
												removeFollower({
													isPending,
													startTransition,
													toast,
													path,
													username,
													followerId: userId,
													userId: currentUser.id,
												})
											}
											className="text-red-500 focus:text-red-500"
										>
											<UserMinus size="20" />
											Usuń obserwującego
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							)}
							{!isOwnProfile && (
								<Button
									disabled={isPending}
									onClick={() =>
										toggleFollowUser({
											isPending,
											startTransition,
											toast,
											path,
											username,
											followed,
											userId,
											currentUserId: currentUser.id,
										})
									}
									className={cn(
										"py-1 px-4 font-bold tracking-wide rounded-full",
										!followed
											? "bg-white hover:bg-white/90 text-black-100"
											: "border border-gray-200 bg-transparent hover:border-red-500 hover:text-red-500 hover:bg-transparent",
									)}
								>
									{isFollowed()}
								</Button>
							)}
						</div>
					</div>
					{bio && (
						<p className="text-sm text-gray-200 mt-2 break-words">
							{bio}
						</p>
					)}
				</div>
			</section>
		</section>
	);
};

export default UsersTwo;
