import CreateAnAccount from "@/components/sharing/CreateAnAccount";
import { currentUser } from "@clerk/nextjs/server"; // Poprawny import dla serwera
import { redirect } from "next/navigation";
import Image from "next/image";
import { getUserAction, saveUserAction } from "@/actions/user.action";

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
        {/* Logo dla mobilnych */}
        <div className="flex md:hidden">
          <Image
            src="/assets/small-x-logo.svg"
            alt="X Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        {/* Logo dla desktopowych */}
        <div className="hidden md:flex">
          <Image
            src="/assets/large-x-logo.svg"
            alt="X Logo"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
        {/* Sekcja główna */}
        <div className="flex flex-col space-y-4 sm:space-y-8">
          <div className="flex flex-col space-y-8 sm:space-y-16">
            <h1 className="text-4xl sm:text-6xl font-extrabold">Happening now</h1>
            <h3 className="text-xl sm:text-3xl font-bold tracking-wider">
              Join today.
            </h3>
          </div>
          <CreateAnAccount />
        </div>
      </section>
    </main>
  );
}
