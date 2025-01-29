"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useTransition } from "react";
import { UserWithFollowers } from "@/interfaces/user.interface";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "@/validations/user.validation";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../ui/form";
import { updateUserAction } from "@/actions/user.action";
import toast from "react-hot-toast";
import { toastOptions } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

interface Props {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	user: UserWithFollowers;
}

const EditProfileModal = ({ isOpen, setIsOpen, user }: Props) => {
	const [isPending, startTransition] = useTransition();
	const path = usePathname();

	const form = useForm<z.infer<typeof editUserSchema>>({
		resolver: zodResolver(editUserSchema),
		defaultValues: {
			id: user.id,
			imageUrl: user.imageUrl,
			bannerUrl: user.bannerUrl || "",
			name: user.name,
			bio: user.bio || "",
			location: user.location || "",
			website: user.website || "",
		},
	});

	const onSubmit = async (values: z.infer<typeof editUserSchema>) => {
		try {
			const updatedUser = await updateUserAction({
				...values,
				path,
			});

			if (updatedUser) {
				toast("Profil został zaktualizowany pomyślnie", toastOptions);
				setIsOpen(false);
			}
		} catch (error) {
			toast("Wystąpił błąd podczas aktualizacji profilu", toastOptions);
			console.log("[ERROR_EDIT_PROFILE_MODAL]", error);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-x-4">
							<Button
								variant="icon"
								size="icon"
								className="rounded-full hover:bg-gray-300/30"
								onClick={() => setIsOpen(false)}
							>
								<X size="18" />
							</Button>
							<DialogTitle>Edytuj profil</DialogTitle>
						</div>
						<Button
							variant="primary"
							className="py-1 px-4 font-bold tracking-wide rounded-full"
							onClick={form.handleSubmit(onSubmit)}
							disabled={isPending}
						>
							Zapisz
						</Button>
					</div>
				</DialogHeader>
				<Form {...form}>
					<form className="flex flex-col space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<Label>Imię</Label>
									<FormControl>
										<Input
											placeholder="Wprowadź swoje imię"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<Label>Bio</Label>
									<FormControl>
										<Textarea
											placeholder="Wprowadź swoje bio"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<Label>Lokalizacja</Label>
									<FormControl>
										<Input
											placeholder="Wprowadź swoją lokalizację"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="website"
							render={({ field }) => (
								<FormItem>
									<Label>Strona internetowa</Label>
									<FormControl>
										<Input
											placeholder="Wprowadź adres swojej strony"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EditProfileModal;
