"use client";

import { SignOutButton, useClerk } from "@clerk/nextjs";

const Logout = ({ children }: { children: React.ReactNode }) => {
	const { signOut } = useClerk();

	const handleSignOut = async () => {
		await signOut();
		window.location.href = "/";
	};

	return (
		<div onClick={handleSignOut}>
			{children}
		</div>
	);
};

export default Logout;
