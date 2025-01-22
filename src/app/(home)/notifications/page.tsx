import { getNotificationsAction } from "@/actions/notification.action";
import { getUserAction } from "@/actions/user.action";
import PostNotification from "@/components/cards/notifications/PostNotification";
import UserNotification from "@/components/cards/notifications/UserNotification";
import NotFound from "@/components/sharing/NotFound";
import PaginationButtons from "@/components/sharing/PaginationButtons";
import { DataNotification } from "@/interfaces/notification.interface";
import { isValidPage } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server"; // Poprawny import
import { redirect } from "next/navigation";
import { Fragment, JSX } from "react";

interface Props {
	searchParams: {
		page: string;
	};
}
const Page = async ({ searchParams }: Props) => {
	const { page: qPage } = searchParams;
	const page = isValidPage(qPage);

  // Pobranie zalogowanego użytkownika
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
    return null;
  }

  // Pobranie danych użytkownika z bazy
  const user = await getUserAction(clerkUser.id);
  if (!user) {
    redirect("/");
    return null;
  }

  // Pobranie powiadomień
  const notifications = await getNotificationsAction({
    userId: user.id,
    page,
  });

  // Funkcja do renderowania odpowiedniego typu powiadomienia
  const actionTypeField = (data: DataNotification): JSX.Element => {
	const options: any = {
		User: <UserNotification dataNotification={data} />,
		Post: (
			<PostNotification
				currentUsername={user.username}
				dataNotification={data}
			/>
		),
	};

	return options[data.parentType];
};

  return notifications?.data.length ? (
    <>
      {/* Renderowanie powiadomień */}
      {notifications.data.map((notification) => (
        <Fragment key={notification.id}>
          {actionTypeField(notification)}
        </Fragment>
      ))}

      {/* Paginacja */}
      <PaginationButtons
        currentPage={page}
        currentPath="/notifications"
        hasNext={notifications.hasNext}
      />
    </>
  ) : (
    // Brak powiadomień
    <NotFound
      title="Nothing to see here — yet"
      description="All notifications will be here, starting from likes, comments, replies and others"
    />
  );
};

export default Page;
