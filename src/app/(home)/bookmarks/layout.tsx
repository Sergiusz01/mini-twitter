import { getTotalBookmarksAction } from "@/actions/tweet.action";
import { getUserAction } from "@/actions/user.action";
import Topbar from "@/components/bookmarks/Topbar";
import ButtonCreatePostMobile from "@/components/sharing/ButtonCreatePostMobile";
import Loading from "@/components/sharing/Loading";
import { currentUser } from "@clerk/nextjs/server"; // Poprawny import dla Server Components
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: "Bookmarks",
  openGraph: {
    title: "Bookmarks",
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
    redirect("/sign-in"); // Przekierowanie dla użytkowników niezalogowanych
    return null;
  }

  // Pobranie danych użytkownika z bazy
  const user = await getUserAction(clerkUser.id);
  if (!user) {
    redirect("/"); // Przekierowanie, jeśli użytkownik nie istnieje w bazie
    return null;
  }

  // Pobranie liczby zakładek użytkownika
  const bookmarks = await getTotalBookmarksAction(user.id);

  return (
    <>
      {/* Przycisk do tworzenia posta dla urządzeń mobilnych */}
      <ButtonCreatePostMobile />

      {/* Pasek nawigacyjny */}
      <Topbar
        username={user.username}
        userId={user.id}
        isBookmarksEmpty={!Boolean(bookmarks)} // Sprawdzenie, czy zakładki są puste
      />

      {/* Zawartość strony */}
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </>
  );
};

export default Layout;
