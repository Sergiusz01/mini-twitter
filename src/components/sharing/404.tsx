"use client";

import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface NotFoundProps {
	title?: string;
	description?: string;
}

const NotFound = ({ title = "Nie znaleziono", description = "Nie znaleziono żądanego zasobu." }: NotFoundProps) => {
	return (
		<div className="p-3 space-y-20">
			<div>
				<Button
					className="rounded-full hover:bg-gray-300/50 transition"
					variant="icon"
					size="icon"
					onClick={() => (window.location.href = "/home")}
				>
					<ArrowLeft size="16" />
				</Button>
			</div>
			<div className="flex items-center justify-start flex-col space-y-4">
				<h2 className="text-2xl font-bold">{title}</h2>
				<p className="text-gray-600">{description}</p>
				<Button
					variant="primary"
					className="py-0"
					onClick={() => (window.location.href = "/explore")}
				>
					Szukaj
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
