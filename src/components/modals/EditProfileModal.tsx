"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
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
import { X, Camera } from "lucide-react";
import Image from "next/image";
import { uploadFile } from "@/lib/cloudinary";

interface Props {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	user: UserWithFollowers;
}

const EditProfileModal = ({ isOpen, setIsOpen, user }: Props) => {
	const [isPending, startTransition] = useTransition();
	const path = usePathname();
	const [fileImageUrl, setFileImageUrl] = useState<File>();
	const [previewImageUrl, setPreviewImageUrl] = useState("");
	const [fileBannerUrl, setFileBannerUrl] = useState<File>();
	const [previewBannerUrl, setPreviewBannerUrl] = useState("");

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

	const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files ?? [];
		if (!files.length) return;

		const file = files[0];
		const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
		if (!file) return;

		if (file.size > maxSizeInBytes) {
			toast.error("Maksymalny rozmiar zdjęcia to 5MB", { duration: 2000 });
			return;
		}

		setFileImageUrl(file);
		const previewPhoto = URL.createObjectURL(file);
		setPreviewImageUrl(previewPhoto);
	};

	const onChangeBanner = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files ?? [];
		if (!files.length) return;

		const file = files[0];
		const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
		if (!file) return;

		if (file.size > maxSizeInBytes) {
			toast.error("Maksymalny rozmiar tła to 5MB", { duration: 2000 });
			return;
		}

		setFileBannerUrl(file);
		const previewBanner = URL.createObjectURL(file);
		setPreviewBannerUrl(previewBanner);
	};

	const onSubmit = async (values: z.infer<typeof editUserSchema>) => {
		try {
			if (previewImageUrl) {
				const imageUrl = await uploadFile(fileImageUrl!);
				if (!imageUrl) return;
				values.imageUrl = imageUrl;
			}

			if (previewBannerUrl) {
				const bannerUrl = await uploadFile(fileBannerUrl!);
				if (!bannerUrl) return;
				values.bannerUrl = bannerUrl;
			}

			const updatedUser = await updateUserAction({
				...values,
				path,
			});

			if (updatedUser) {
				toast("Profil został zaktualizowany pomyślnie", toastOptions);
				setIsOpen(false);
				window.location.reload();
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
							name="bannerUrl"
							render={({ field }) => (
								<FormItem>
									<div className="relative w-full h-[200px] rounded-xl overflow-hidden bg-gray-300">
										{(previewBannerUrl || user.bannerUrl) && (
											<Image
												src={previewBannerUrl || user.bannerUrl!}
												alt="Tło profilu"
												fill
												className="object-cover select-none"
												unoptimized
											/>
										)}
										<Label
											htmlFor="banner-url"
											className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-3 rounded-full bg-gray-300/80 hover:bg-gray-300/50 transition text-white cursor-pointer z-10"
										>
											<Camera />
										</Label>
									</div>
									<FormControl>
										<Input
											id="banner-url"
											type="file"
											accept="image/*"
											className="hidden"
											disabled={isPending}
											onChange={onChangeBanner}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="imageUrl"
							render={({ field }) => (
								<FormItem>
									<div className="relative w-[112px] h-[112px] rounded-full overflow-hidden">
										<Image
											src={previewImageUrl || user.imageUrl}
											alt={user.username}
											width={112}
											height={112}
											className="object-cover w-[112px] h-[112px] rounded-full select-none border-4 border-black bg-gray-200"
											unoptimized
										/>
										<Label
											htmlFor="image-url"
											className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-3 rounded-full bg-gray-300/80 hover:bg-gray-300/50 transition text-white cursor-pointer z-10"
										>
											<Camera />
										</Label>
									</div>
									<FormControl>
										<Input
											id="image-url"
											type="file"
											accept="image/*"
											className="hidden"
											disabled={isPending}
											onChange={onChangeImage}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
