import { getTotalNotificationsAction } from "@/actions/notification.action";
import { getUserAction } from "@/actions/user.action";
import Topbar from "@/components/notifications/Topbar";
import Loading from "@/components/sharing/Loading";
import { currentUser } from "@clerk/nextjs/server"; // Poprawny import dla Server Components
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: "Notifications",
  openGraph: {
    title: "Notifications",
    siteName: "X (formerly Twitter)",
  },
};

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  // Pobranie danych użytkownika Clerk
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in"); // Przekierowanie, jeśli użytkownik nie jest zalogowany
    return null;
  }

  // Pobranie danych użytkownika z bazy danych
  const user = await getUserAction(clerkUser.id);

  if (!user) {
    redirect("/"); // Przekierowanie, jeśli użytkownik nie istnieje w bazie
    return null;
  }

  // Pobranie liczby nieprzeczytanych powiadomień
  const totalUnreadNotifications = await getTotalNotificationsAction(user.id);

  return (
    <>
      <Topbar
        userId={user.id}
        totalUnreadNotifications={totalUnreadNotifications ?? 0} // Bezpieczna obsługa wartości null/undefined
      />
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </>
  );
};

export default Layout;
