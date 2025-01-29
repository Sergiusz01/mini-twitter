import { getUserAction, saveUserAction } from "@/actions/user.action";
import Logout from "@/components/sharing/Logout";
import OnBoarding from "@/components/forms/OnBoarding";
import { currentUser as clerkCurrentUser } from "@clerk/nextjs/server"; // Użycie serwerowego modułu Clerk
import { redirect } from "next/navigation";
import Image from "next/image";

const Page = async () => {
  // Pobranie aktualnego użytkownika z Clerk
  const clerkUser = await clerkCurrentUser();
  if (!clerkUser) {
    redirect("/sign-in"); // Przekierowanie, jeśli użytkownik nie jest zalogowany
    return null;
  }

  // Pobranie danych użytkownika z bazy
  const user = await getUserAction(clerkUser.id);

  // Jeśli użytkownik zakończył onboarding, przekierowanie na stronę główną
  if (user?.isCompleted) {
    redirect("/home");
    return null;
  }

  // Mapa danych użytkownika do zapisania w bazie
  const mapUser = {
    id: clerkUser.id,
    imageUrl: clerkUser.imageUrl || "",
    name: "",
    username: clerkUser.username?.toLowerCase() || "",
    email: clerkUser.emailAddresses[0]?.emailAddress || "",
    bio: "",
  };

  // Jeśli użytkownik nie istnieje w bazie, zapisanie tymczasowych danych
  if (!user) {
    const temporaryUserData = {
      ...mapUser,
      name: "unknown",
      isCompleted: false,
    };
    await saveUserAction(temporaryUserData);
  }

  return (
    <section className="w-full h-screen">
      {/* Pasek nawigacyjny */}
      <nav className="py-6 border-b border-gray-300">
        <div className="px-3 sm:lg-0 max-w-4xl mx-auto flex items-center justify-between">
          <Image
            width={35}
            height={35}
            alt="Logo X"
            src="/assets/small-x-logo.svg"
            className="object-contain"
          />
          <Logout>Wyloguj się</Logout>
        </div>
      </nav>

      {/* Sekcja zawartości */}
      <section className="max-w-4xl mx-auto px-3 flex justify-center mt-20 lg:px-0 font-lato">
        <div className="w-full max-w-[500px] flex flex-col space-y-10">
          <div className="text-center flex flex-col space-y-2 items-center max-w-[450px] mx-auto">
            <h1 className="text-3xl font-extrabold tracking-wide">Witaj.</h1>
            <p className="font-normal text-gray-100">
              Poświęćmy chwilę na uzupełnienie Twojego profilu, abyśmy mogli
              zapewnić Ci lepsze i bardziej spersonalizowane doświadczenie na naszej platformie.
            </p>
          </div>
          {/* Formularz onboardingu */}
          <OnBoarding initialValue={mapUser} />
        </div>
      </section>
    </section>
  );
};

export default Page;
