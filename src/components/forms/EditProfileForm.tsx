"use client";

import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { editUserSchema } from "@/validations/user.validation";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn, toastOptions } from "@/lib/utils";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import isURL from "validator/lib/isURL";
import { ArrowLeft, Camera, X } from "lucide-react";
import { updateUserAction } from "@/actions/user.action";

interface OnChangeImageProps {
	event: ChangeEvent<HTMLInputElement>;
	setFile: Dispatch<SetStateAction<File | undefined>>;
	setPreviewImage: Dispatch<SetStateAction<string>>;
}

interface Props {
	user: User;
	isModal?: boolean;
	setIsOpen?: Dispatch<SetStateAction<boolean>> | undefined;
}

const EditProfileForm = ({ user, isModal, setIsOpen }: Props) => {
	const path = usePathname();

	const [fileImageUrl, setFileImageUrl] = useState<File>();
	const [fileBannerUrl, setFileBannerUrl] = useState<File>();
	const [previewBannerUrl, setPreviewBannerUrl] = useState("");
	const [previewImageUrl, setPreviewImageUrl] = useState("");

	const form = useForm<z.infer<typeof editUserSchema>>({
		resolver: zodResolver(editUserSchema),
		defaultValues: {
			id: user.id,
			bannerUrl: user.bannerUrl ?? "",
			imageUrl: user.imageUrl,
			name: user.name,
			bio: user.bio ?? "",
			location: user.location ?? "",
			website: user.website ?? "",
		},
	});

	const onChangeImage = ({
		event,
		setFile,
		setPreviewImage,
	}: OnChangeImageProps) => {
		const files = event.target.files ?? [];
		if (!files.length) return;

		const file = files[0];
		const maxSizeInBytes = 5 * 1024 * 1024; // 5mb
		if (!file) return;

		// if file size greather then 5mb, return alert
		if (file.size > maxSizeInBytes) {
			toast.error("Maksymalny rozmiar zdjęcia to 5MB", { duration: 2000 });
			return;
		}

		setFile(file);
		const previewPhoto = URL.createObjectURL(file);
		setPreviewImage(previewPhoto);
	};

	async function uploadFile(file: File) {
		if (!file) return null;

		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "ml_default");

			const response = await fetch(
				"https://api.cloudinary.com/v1_1/drjmdbnhm/image/upload",
				{
					method: "POST",
					body: formData
				}
			);

			if (!response.ok) {
				console.error("[CLOUDINARY_ERROR] Upload failed", await response.text());
				toast.error("Błąd podczas przesyłania zdjęcia", { duration: 2000 });
				return null;
			}

			const data = await response.json();
			return data.secure_url;
		} catch (error) {
			console.error("[ERROR_UPLOAD_FILE]", error);
			toast.error("Błąd podczas przesyłania zdjęcia", { duration: 2000 });
			return null;
		}
	}

	async function onSubmit(values: z.infer<typeof editUserSchema>) {
		try {
			if (previewBannerUrl) {
				const bannerUrl = await uploadFile(fileBannerUrl!);
				if (!bannerUrl) return;
				values.bannerUrl = bannerUrl;
				console.log("Nowy banner URL:", bannerUrl);
			}
			if (previewImageUrl) {
				const imageUrl = await uploadFile(fileImageUrl!);
				if (!imageUrl) return;
				values.imageUrl = imageUrl;
				console.log("Nowy profil URL:", imageUrl);
			}

			// validations
			const isValidURL = isURL(values.website);
			if (values.website && !isValidURL) {
				toast.error("Nieprawidłowy adres URL", toastOptions);
				return;
			}

			const response = await updateUserAction({
				...values,
				path,
			});

			if (response) {
				console.log("Zaktualizowany użytkownik:", response);
				toast.success("Profil został zaktualizowany", { duration: 2000 });
				if (isModal && setIsOpen) {
					setIsOpen(false);
				} else {
					// Odświeżamy stronę tylko jeśli nie jesteśmy w trybie modalnym
					window.location.reload();
				}
			} else {
				toast.error("Wystąpił błąd podczas aktualizacji profilu", { duration: 2000 });
			}
		} catch (error: any) {
			console.error("[ERROR_SUBMIT_PROFILE_FORM]", error.message);
			toast.error("Wystąpił błąd podczas aktualizacji profilu", { duration: 2000 });
		}
	}

	// mutation
	const isLoading = form.formState.isSubmitting;

	// components
	function inputFieldValidation(value: string, max: number, type?: string) {
		const len = value.length;
		if (len === 0 && type === "name") return "profile__input-empty__name";
		if (len === 0) return "profile__input-empty";
		if (len > max) return "profile__input-error";

		return "profile__input-success";
	}

	function textareaFieldValidation(value: string, max: number) {
		const len = value.length;
		if (len === 0) return "profile__textarea-empty";
		if (len > max) return "profile__textarea-error";

		return "profile__textarea-success";
	}

	function showBannerUrl() {
		if (previewBannerUrl || user.bannerUrl) {
			const imageUrl = previewBannerUrl || user.bannerUrl || '';
			console.log("Wyświetlany banner URL:", imageUrl);
			return (
				<Image
					src={imageUrl}
					alt={user.username}
					width={600}
					height={193}
					className="h-[193px] object-cover w-full brightness-50"
					unoptimized
				/>
			);
		}

		return <div className="w-full h-full bg-black" />;
	}

	function showCloseOrPrevButton() {
		if (isModal && setIsOpen) {
			return (
				<Button
					onClick={() => setIsOpen(false)}
					className="rounded-full hover:bg-gray-300/50 transition"
					variant="icon"
					size="icon"
					disabled={isLoading}
				>
					<X />
				</Button>
			);
		}

		return (
			<Button
				disabled={isLoading}
				onClick={() => history.back()}
				className="rounded-full hover:bg-gray-300/50 transition"
				variant="icon"
				size="icon"
			>
				<ArrowLeft size="16" />
			</Button>
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<nav className="sticky top-0 z-10 bg-black/80 backdrop-blur p-4 flex justify-between items-center">
					<div className="flex items-center max-sm:gap-x-2 sm:gap-x-8">
						{showCloseOrPrevButton()}
						<h2 className="font-bold tracking-wide text-xl">Edytuj profil</h2>
					</div>
					<div>
						<Button
							type="submit"
							disabled={isLoading}
							className="py-1.5 px-4 font-bold tracking-wide rounded-full bg-white hover:bg-white/90 text-sm text-black"
							variant="primary"
						>
							Zapisz
						</Button>
					</div>
				</nav>

				{/* bannerUrl */}
				<FormField
					control={form.control}
					name="bannerUrl"
					render={({ field }) => (
						<FormItem className="w-full h-[193px] relative">
							<div className="relative w-full h-full overflow-hidden">
								{showBannerUrl()}
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
									disabled={isLoading}
									onChange={(event) =>
										onChangeImage({
											event,
											setFile: setFileBannerUrl,
											setPreviewImage: setPreviewBannerUrl,
										})
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* ImageUrl, Name, Bio, Location, Website */}
				<section className="-translate-y-[8%] space-y-6 px-4 pb-4">
					{/* imageUrl */}
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem>
								<div className="relative max-sm:w-[90px] max-sm:h-[90px] sm:h-[112px] sm:w-[112px] rounded-full overflow-hidden">
									<Image
										src={previewImageUrl || user.imageUrl}
										alt={user.username}
										width={112}
										height={112}
										className="object-cover max-sm:w-[90px] max-sm:h-[90px] sm:h-[112px] sm:w-[112px] rounded-full select-none border-4 border-black bg-gray-200"
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
										disabled={isLoading}
										onChange={(event) =>
											onChangeImage({
												event,
												setFile: setFileImageUrl,
												setPreviewImage: setPreviewImageUrl,
											})
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Name */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="profile__formItem">
								<div
									className={cn(
										"profile__formItem-top",
										field.value.length === 0 && "!hidden",
									)}
								>
									<Label htmlFor="name">Name</Label>

									<p>{field.value.length}/30</p>
								</div>
								<FormControl>
									<Input
										id="name"
										placeholder="Name"
										disabled={isLoading}
										className={cn(
											"profile__input",
											inputFieldValidation(field.value, 30, "name"),
										)}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Bio */}
					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem className="profile__formItem">
								<div
									className={cn(
										"profile__formItem-top",
										field.value.length === 0 && "!hidden",
									)}
								>
									<Label htmlFor="bio">Bio</Label>

									<p>{field.value.length}/255</p>
								</div>
								<FormControl>
									<Textarea
										rows={6}
										id="bio"
										placeholder="Bio"
										disabled={isLoading}
										className={cn(
											"profile__textarea",
											textareaFieldValidation(field.value, 255),
										)}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Location */}
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem className="profile__formItem">
								<div
									className={cn(
										"profile__formItem-top",
										field.value.length === 0 && "!hidden",
									)}
								>
									<Label htmlFor="location">Location</Label>

									<p>{field.value.length}/30</p>
								</div>
								<FormControl>
									<Input
										id="location"
										placeholder="Location"
										disabled={isLoading}
										className={cn(
											"profile__input",
											inputFieldValidation(field.value, 30),
										)}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Website */}
					<FormField
						control={form.control}
						name="website"
						render={({ field }) => (
							<FormItem className="profile__formItem">
								<div
									className={cn(
										"profile__formItem-top",
										field.value.length === 0 && "!hidden",
									)}
								>
									<Label htmlFor="website">Website</Label>

									<p>{field.value.length}/100</p>
								</div>
								<FormControl>
									<Input
										id="location"
										placeholder="Website"
										disabled={isLoading}
										className={cn(
											"profile__input",
											inputFieldValidation(field.value, 100),
										)}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</section>
			</form>
		</Form>
	);
};

export default EditProfileForm;
