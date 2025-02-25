"use client";

import DeleteModal from "@/components/modals/DeleteModal";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePrevious } from "@/hooks/usePrevious";
import { deleteTweet } from "@/lib/tweet";
import { toggleFollowUser } from "@/lib/user";
import { cn, getCurrentPath } from "@/lib/utils";
import { Follower } from "@prisma/client";
import { ChevronsRight, MoreHorizontal, Trash, UserPlus2, UserX2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, useState, useTransition } from "react";
import toast from "react-hot-toast";

interface Props {
	username: string;
	tweetId: string;
	isOwnTweet: boolean;
	path: string;
	followed: Follower;
	userId: string;
	currentUserId: string;
}

const Menu = ({
	username,
	tweetId,
	isOwnTweet,
	path,
	userId,
	currentUserId,
	followed,
}: Props) => {
	const router = useRouter();
	const { addToNavigationHistory } = usePrevious();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isPendingTweet, startTransitionTweet] = useTransition();
	const [isPendingFollowUser, startTransitionFollowUser] = useTransition();

	const deleteTweetHandler = async (
		e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
	) => {
		e.stopPropagation();
		try {
			setIsDialogOpen(false);
			setIsMenuOpen(false);
			
			await new Promise<void>((resolve) => {
				startTransitionTweet(async () => {
					await deleteTweet({
						isPending: isPendingTweet,
						startTransition: startTransitionTweet,
						toast,
						path,
						id: tweetId,
					});
					resolve();
				});
			});

			// Po pomyślnym usunięciu, przekieruj na stronę główną
			router.push('/home');
			router.refresh();
		} catch (error) {
			console.error('Error deleting tweet:', error);
			toast.error('Wystąpił błąd podczas usuwania tweeta');
		}
	};

	const redirectToDetailPost = () => {
		addToNavigationHistory(getCurrentPath());
		router.push(`/${username}/status/${tweetId}`);
	};

	return (
		<>
			<DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
				<DropdownMenuTrigger asChild>
					<div className="!outline-none text-gray-200 bg-transparent hover:bg-blue/20 hover:text-blue transition p-2 rounded-full cursor-pointer">
						<MoreHorizontal className="w-5 h-5" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="bottom" align="end">
					<DropdownMenuItem
						onClick={(e) => {
							e.stopPropagation();
							setIsMenuOpen(false);
							redirectToDetailPost();
						}}
					>
						<ChevronsRight className="w-4 h-4" />
						Przejdź do posta
					</DropdownMenuItem>
					{isOwnTweet ? (
						<DropdownMenuItem
							onClick={(e) => {
								e.stopPropagation();
								setIsDialogOpen(true);
								setIsMenuOpen(false);
							}}
							className={cn(
								"text-[#f4212e]",
								isPendingTweet && "opacity-50 cursor-not-allowed",
							)}
							disabled={isPendingTweet}
						>
							<Trash className="w-4 h-4" />
							Usuń
						</DropdownMenuItem>
					) : (
						<DropdownMenuItem
							onClick={(e) => {
								e.stopPropagation();
								setIsMenuOpen(false);
								toggleFollowUser({
									isPending: isPendingFollowUser,
									startTransition: startTransitionFollowUser,
									toast,
									path,
									username,
									followed,
									userId,
									currentUserId,
								});
							}}
							disabled={isPendingFollowUser}
							className={cn(
								isPendingFollowUser && "opacity-50 cursor-not-allowed",
							)}
						>
							{followed
								? <UserX2 className="w-4 h-4" />
								: <UserPlus2 className="w-4 h-4" />}
							<p className="flex items-center gap-x-2">
								{followed ? "Przestań obserwować" : "Obserwuj"}
								<span className="max-w-[80px] overflow-hidden whitespace-nowrap text-ellipsis">
									@{username}
								</span>
							</p>
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>

			<DeleteModal
				title="Usunąć post?"
				description="Tej operacji nie można cofnąć. Post zostanie usunięty z Twojego profilu, z osi czasu osób, które Cię obserwują oraz z wyników wyszukiwania."
				ButtonAction={
					<Button
						variant="primary"
						className="bg-red-600 hover:bg-red-600/90 rounded-full font-extrabold text-sm"
						onClick={deleteTweetHandler}
						disabled={isPendingTweet}
					>
						{isPendingTweet ? "Usuwanie..." : "Usuń"}
					</Button>
				}
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
			/>
		</>
	);
};

export default Menu;
