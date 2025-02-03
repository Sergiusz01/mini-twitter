import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import CookieConsent from "@/components/sharing/CookieConsent";
import AIAssistant from "@/components/ai/AIAssistant";

export const metadata: Metadata = {
	title: {
		default: "X",
		template: "%s / X",
	},
	metadataBase: new URL(process.env.NEXT_PUBLIC_NEXT_URL || 'https://mini-twitter-sergiusz01.vercel.app'),
	openGraph: {
		title: {
			default: "X",
			template: "%s / X",
		},
		siteName: "X (formerly Twitter)",
	},
};

export const viewport: Viewport = {
	themeColor: "black",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider
			localization={{
				signIn: {
					start: {
						title: "Zaloguj się",
						subtitle: "aby kontynuować"
					}
				},
				signUp: {
					start: {
						title: "Utwórz konto",
						subtitle: "aby kontynuować"
					}
				},
				userButton: {
					action__signOut: "Wyloguj się"
				}
			}}
		>
			<html lang="pl" suppressHydrationWarning>
				<body className="bg-black text-white font-lato" suppressHydrationWarning>
					<Toaster position="bottom-center" />
					<main className="h-full">{children}</main>
					<CookieConsent />
					<AIAssistant />
				</body>
			</html>
		</ClerkProvider>
	);
}
