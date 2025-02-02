import * as z from "zod";

export const tweetSchema = z.object({
	text: z
		.string()
		.min(1, { message: "Treść posta jest wymagana" })
		.max(500, { message: "Maksymalna długość to 500 znaków" }),
	imageUrl: z.string().optional(),
	userId: z.string(),
	parentId: z.string().optional(),
});
