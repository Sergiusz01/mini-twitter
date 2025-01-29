"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { userSchema } from "@/validations/user.validation";
import { saveUserAction } from "@/actions/user.action";

import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";
import { toastOptions } from "@/lib/utils";

interface InitialValueInterface {
	id: string;
	name: string;
	bio: string;
}

interface OnBoardingProps {
	initialValue: InitialValueInterface;
}

const OnBoarding = ({ initialValue }: OnBoardingProps) => {
	const form = useForm<z.infer<typeof userSchema>>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			id: initialValue.id,
			name: initialValue.name,
			bio: initialValue.bio,
		},
	});

	const onSubmit = async (values: z.infer<typeof userSchema>) => {
		try {
			const user = await saveUserAction({
				...values,
				isCompleted: true,
			});

			if (user) {
				toast("Profil został zaktualizowany pomyślnie", toastOptions);
				window.location.href = "/home";
			}
		} catch (error) {
			toast("Wystąpił błąd podczas aktualizacji profilu", toastOptions);
			console.log("[ERROR_ONBOARDING]", error);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col space-y-8"
			>
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
				<Button
					variant="primary"
					className="w-full py-6 text-lg font-extrabold"
					type="submit"
					disabled={form.formState.isSubmitting}
				>
					Zapisz
				</Button>
			</form>
		</Form>
	);
};

export default OnBoarding;
