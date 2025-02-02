import CreateAnAccount from "@/components/sharing/CreateAnAccount";
import { currentUser } from "@clerk/nextjs/server"; // Poprawny import dla serwera
import { redirect } from "next/navigation";
import Image from "next/image";
import { getUserAction, saveUserAction } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  // Pobranie danych użytkownika z Clerk
  const clerkUser = await currentUser();

  if (clerkUser) {
    // Pobranie danych użytkownika z bazy danych
    const user = await getUserAction(clerkUser.id);

    if (!user) {
      // Mapowanie danych użytkownika Clerk
      const mapUser = {
        id: clerkUser.id,
        imageUrl: clerkUser.imageUrl || "",
        name: "",
        username: clerkUser.username?.toLowerCase() || "unknown",
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        bio: "",
      };

      // Zapis tymczasowych danych użytkownika
      const temporaryUserData = {
        ...mapUser,
        name: "unknown",
        isCompleted: false,
      };
      await saveUserAction(temporaryUserData);

      // Przekierowanie na stronę onboarding
      redirect("/onboarding");
    }

    // Sprawdzenie, czy użytkownik zakończył onboarding
    if ("isCompleted" in user && Boolean(user.isCompleted)) {
      redirect("/home");
    } else {
      redirect("/onboarding");
    }
  }

  // Renderowanie strony głównej
  return (
    <main className="max-w-4xl mx-auto h-full grid place-items-center p-5 sm:p-12 lg:p-0">
      <section className="w-full h-full md:h-fit flex flex-col md:flex-row justify-center md:justify-between space-y-24 md:space-y-0">
        {/* Sekcja główna */}
        <div className="flex flex-col space-y-4 sm:space-y-8">
          <div className="flex flex-col space-y-8 sm:space-y-16">
            <h1 className="text-4xl sm:text-6xl font-extrabold">Witaj w Akademiku!</h1>
            <h3 className="text-xl sm:text-3xl font-bold tracking-wider">
              Twoja studencka przestrzeń do dzielenia się wiedzą i doświadczeniami.
            </h3>
          </div>
          <div className="flex flex-col space-y-4">
            <Link href="/sign-up" className="w-full">
              <Button
                variant="primary"
                className="w-full font-bold text-lg bg-blue hover:bg-blue/90 rounded-full"
              >
                Dołącz do społeczności
              </Button>
            </Link>
            <Link href="/sign-in" className="w-full">
              <Button
                variant="outline"
                className="w-full font-bold text-lg bg-white hover:bg-white/90 text-black border-[1px] border-gray-200 rounded-full"
              >
                Zaloguj się
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
