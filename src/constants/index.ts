/**
 * Stałe aplikacji
 * Zawiera definicje linków nawigacyjnych i innych stałych wartości
 */

/**
 * Główne linki nawigacyjne
 * Używane w głównym menu aplikacji
 */
export const links = [
	{
		title: "X Logo",
		href: "/home",
	},
	{
		icon: "/assets/home-icon.svg",
		activeIcon: "/assets/home-fill-icon.svg",
		title: "Strona główna",
		href: "/home",
	},
	{
		icon: "/assets/explore-icon.svg",
		activeIcon: "/assets/explore-fill-icon.svg",
		title: "Przeglądaj",
		href: "/explore",
	},
	{
		icon: "/assets/notif-icon.svg",
		activeIcon: "/assets/notif-fill-icon.svg",
		title: "Powiadomienia",
		href: "/notifications",
	},
	{
		icon: "/assets/bookmark-icon.svg",
		activeIcon: "/assets/bookmark-fill-icon.svg",
		title: "Zakładki",
		href: "/bookmarks",
	},
	{
		icon: "/assets/profile-icon.svg",
		activeIcon: "/assets/profile-fill-icon.svg",
		title: "Profil",
		href: "",
	},
];

/**
 * Linki dla widoku mobilnego
 * Zoptymalizowana nawigacja dla urządzeń mobilnych
 */
export const linksMobile = [
	{
		icon: "/assets/home-icon.svg",
		activeIcon: "/assets/home-fill-icon.svg",
		title: "Strona główna",
		href: "/home",
	},
	{
		icon: "/assets/profile-icon.svg",
		activeIcon: "/assets/profile-fill-icon.svg",
		title: "Profil",
		href: "",
	},
	{
		icon: "/assets/sparkles.svg",
		activeIcon: "/assets/sparkles.svg",
		title: "Gemini",
		href: "gemini",
	},
	{
		icon: "/assets/explore-icon.svg",
		activeIcon: "/assets/explore-fill-icon.svg",
		title: "Przeglądaj",
		href: "/explore",
	},
	{
		icon: "/assets/notif-icon.svg",
		activeIcon: "/assets/notif-fill-icon.svg",
		title: "Powiadomienia",
		href: "/notifications",
	},
];

/**
 * Linki dla bocznego menu mobilnego
 * Dodatkowe opcje dostępne w menu wysuwanym
 */
export const mobileSidebarLinks = [
	{
		icon: "/assets/profile-icon.svg",
		activeIcon: "/assets/profile-fill-icon.svg",
		title: "Profil",
		href: "",
	},
	{
		icon: "/assets/bookmark-icon.svg",
		activeIcon: "/assets/bookmark-fill-icon.svg",
		title: "Zakładki",
		href: "/bookmarks",
	},
];

/**
 * Linki dla bocznego menu
 * Główna nawigacja w wersji desktopowej
 */
export const sidebarLinks = [
	{
		title: "Strona główna",
		icon: "/assets/home.svg",
		activeIcon: "/assets/home-active.svg",
		href: "/home",
	},
	{
		title: "Eksploruj",
		icon: "/assets/explore.svg",
		activeIcon: "/assets/explore-active.svg",
		href: "/explore",
	},
	{
		title: "Powiadomienia",
		icon: "/assets/notifications.svg",
		activeIcon: "/assets/notifications-active.svg",
		href: "/notifications",
	},
	{
		title: "Zakładki",
		icon: "/assets/bookmarks.svg",
		activeIcon: "/assets/bookmarks-active.svg",
		href: "/bookmarks",
	},
	{
		title: "Profil",
		icon: "/assets/profile.svg",
		activeIcon: "/assets/profile-active.svg",
		href: "",
	},
];
