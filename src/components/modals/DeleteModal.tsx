"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

interface Props {
	title: string;
	description: string;
	isDialogOpen: boolean;
	setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
	ButtonAction: React.ReactNode;
}

const DeleteModal = ({
	title,
	description,
	isDialogOpen,
	setIsDialogOpen,
	ButtonAction,
}: Props) => {
	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<div className="flex items-center gap-x-2">
						<Button
							variant="primary"
							className="bg-transparent hover:bg-gray-300/30 border border-gray-200 rounded-full font-extrabold text-sm"
							onClick={() => setIsDialogOpen(false)}
						>
							Anuluj
						</Button>
						{ButtonAction}
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteModal;
