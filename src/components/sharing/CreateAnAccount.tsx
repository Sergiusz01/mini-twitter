"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CreateAnAccount = () => {
	const router = useRouter();

	return (
		<Button
			variant="primary"
			onClick={() => router.push("/sign-in")}
			className="font-extrabold text-sm"
		>
			Utwórz konto
		</Button>
	);
};

export default CreateAnAccount;
