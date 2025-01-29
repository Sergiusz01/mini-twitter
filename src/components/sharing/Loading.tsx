"use client";

interface Props {
	title?: string;
}

const Loading = ({ title = "Ładowanie..." }: Props) => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="flex flex-col items-center space-y-4">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue" />
				<p className="text-gray-200 font-normal">{title}</p>
			</div>
		</div>
	);
};

export default Loading;
