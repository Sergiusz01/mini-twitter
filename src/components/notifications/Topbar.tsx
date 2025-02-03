"use client";

import ButtonBack from "../sharing/ButtonBack";
import { markAllNotificationsAsReadAction } from "@/actions/notification.action";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface Props {
  totalUnreadNotifications: number;
  userId: string;
  shouldMarkAsRead: boolean;
}

const Topbar = ({ totalUnreadNotifications, userId, shouldMarkAsRead }: Props) => {
  const path = usePathname();

  useEffect(() => {
    if (shouldMarkAsRead) {
      markAllNotificationsAsReadAction(userId, path);
    }
  }, [shouldMarkAsRead, userId, path]);

  return (
    <nav className="sticky top-0 z-10 backdrop-blur bg-black/80 py-4 px-3 flex justify-between items-center">
      <div className="flex items-center gap-x-8">
        <ButtonBack />
        <h2 className="text-xl font-bold">Powiadomienia</h2>
      </div>
    </nav>
  );
};

export default Topbar;
