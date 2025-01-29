import * as z from "zod";

export const userSchema = z.object({
	id: z.string(),
	name: z
		.string()
		.min(1, {
			message: "Imię jest wymagane",
		})
		.max(30, {
			message: "Maksymalna długość to 30 znaków",
		}),
	bio: z.string().max(255, {
		message: "Maksymalna długość to 255 znaków",
	}),
});

export const editUserSchema = z.object({
	id: z.string(),
	bannerUrl: z.string().optional(),
	imageUrl: z.string(),
	name: z
		.string()
		.min(1, {
			message: "Imię nie może być puste",
		})
		.max(30, {
			message: "Maksymalna długość to 30 znaków",
		}),
	bio: z.string().max(255, {
		message: "Maksymalna długość to 255 znaków",
	}),
	location: z.string().max(30, {
		message: "Maksymalna długość to 30 znaków",
	}),
	website: z.string().max(100, {
		message: "Maksymalna długość to 100 znaków",
	}),
});
