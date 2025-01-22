import { getUserAction } from "@/actions/user.action";
import CreateTweetForm from "@/components/forms/createtweetform/CreateTweetForm";
import Topbar from "@/components/home/Topbar";
import ButtonCreatePostMobile from "@/components/sharing/ButtonCreatePostMobile";
import Loading from "@/components/sharing/Loading";
import { currentUser } from "@clerk/nextjs/server"; // Użycie poprawnego modułu serwera
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
  openGraph: {
    title: "Home",
    siteName: "X (formerly Twitter)",
  },
};

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  // Pobranie zalogowanego użytkownika
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
      <section className="border-b border-gray-300 max-sm:hidden">
        <CreateTweetForm
          userId={user.id}
          imageUrl={user.imageUrl}
          htmlForId="home"
        />
      </section>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
};

export default Layout;
