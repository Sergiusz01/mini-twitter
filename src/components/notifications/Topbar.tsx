"use client";

import ButtonBack from "../sharing/ButtonBack";

interface Props {
  totalUnreadNotifications: number;
  userId: string;
  shouldMarkAsRead: boolean;
}

const Topbar = ({ totalUnreadNotifications, userId, shouldMarkAsRead }: Props) => {
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
