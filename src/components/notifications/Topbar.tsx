"use client";

import { BookX, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState, useTransition } from "react";
import DeleteModal from "../modals/DeleteModal";
import toast from "react-hot-toast";
import { toastOptions } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { markAllNotificationsAsReadAction } from "@/actions/notification.action";
import ButtonBack from "../sharing/ButtonBack";

interface Props {
  totalUnreadNotifications: number;
  userId: string;
}

const Topbar = ({ totalUnreadNotifications, userId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  const handleMarkAllAsRead = () => {
    if (isPending || !totalUnreadNotifications) return;

    startTransition(() => {
      markAllNotificationsAsReadAction({ userId, path });
    });

    toast("Wszystkie powiadomienia zostały oznaczone jako przeczytane", toastOptions);
  };

  return (
    <nav className="sticky top-0 z-10 backdrop-blur bg-black/80 py-4 px-3 flex justify-between items-center">
      <div className="flex items-center gap-x-8">
        <ButtonBack />
        <h2 className="text-xl font-bold">Powiadomienia</h2>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="!outline-none">
          <Button
            variant="icon"
            size="icon"
            className="rounded-full hover:bg-gray-300/30"
          >
            <MoreHorizontal size="18" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem onClick={handleMarkAllAsRead}>
            <BookX size="18" />
            Oznacz wszystkie jako przeczytane
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Topbar;
