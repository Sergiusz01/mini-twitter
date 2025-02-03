import { User } from "@prisma/client";
import Image from "next/image";

interface Props {
  users: User[];
  onSelect: (username: string) => void;
  position: { top: number; left: number };
}

const UserSuggestions = ({ users, onSelect, position }: Props) => {
  if (!users.length) return null;

  return (
    <div 
      className="absolute z-50 bg-black-200 border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto w-full animate-in fade-in slide-in-from-top-2 duration-200"
      style={{ 
        top: `${position.top}px`, 
        left: 0,
        right: 0
      }}
    >
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-2 p-2 hover:bg-gray-300/30 cursor-pointer transition-colors"
          onClick={() => onSelect(user.username)}
        >
          <Image
            src={user.imageUrl}
            alt={user.name}
            width={28}
            height={28}
            className="rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">{user.name}</p>
            <p className="text-gray-200 text-sm truncate">@{user.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserSuggestions; 