import { getUserAction } from "@/actions/user.action";
import Topbar from "@/components/explore/Topbar";
import ButtonCreatePostMobile from "@/components/sharing/ButtonCreatePostMobile";
import Loading from "@/components/sharing/Loading";
import { currentUser } from "@clerk/nextjs/server"; // Poprawny import dla Server Components
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: "Explore",
  openGraph: {
    title: "Explore",
    siteName: "X (formerly Twitter)",
  },
};

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  // Pobranie zalogowanego użytkownika z Clerk
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in"); // Przekierowanie na stronę logowania, jeśli użytkownik nie jest zalogowany
    return null;
  }

  // Pobranie danych użytkownika z bazy danych
  const user = await getUserAction(clerkUser.id);

  if (!user) {
    redirect("/"); // Przekierowanie na stronę główną, jeśli użytkownik nie istnieje
    return null;
  }

  // Renderowanie layoutu
  return (
    <>
      <ButtonCreatePostMobile />
      <Topbar user={user} />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
};

export default Layout;
