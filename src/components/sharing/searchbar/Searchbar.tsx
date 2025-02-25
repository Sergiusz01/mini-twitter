"use client";

/**
 * Komponent wyszukiwarki użytkowników
 * Implementuje funkcjonalność wyszukiwania w czasie rzeczywistym z debounce
 */

import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { getUsersAction } from "@/actions/user.action";
import { User } from "@prisma/client";
import { UserWithFollowers } from "@/interfaces/user.interface";
import { useDebounce } from "@/hooks/useDebounce";
import Focused from "./Focused";

interface Props {
	currentUser: UserWithFollowers;
}

/**
 * Główny komponent wyszukiwarki
 * @param currentUser - Aktualnie zalogowany użytkownik
 */
const Searchbar = ({ currentUser }: Props) => {
	// Stan komponentu
	const [isFocused, setIsFocused] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [users, setUsers] = useState<User[]>([]);
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	/**
	 * Pobiera użytkowników na podstawie wyszukiwanej frazy
	 * @param searchQuery - Fraza wyszukiwania
	 */
	async function getAllOfUsers(searchQuery: string) {
		const users = await getUsersAction({
			searchQuery,
			userId: currentUser.id,
			isOnSearch: true,
		});

		if (!users?.data.length) return;

		setUsers(users.data);
	}

	// Efekt wywołujący wyszukiwanie po zmianie frazy z debounce
	useEffect(() => {
		getAllOfUsers(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	/**
	 * Obsługa zmiany wartości w polu wyszukiwania
	 */
	const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
	};

	/**
	 * Obsługa utraty fokusu - czyści wyniki i pole wyszukiwania
	 */
	const onBlurSearch = () => {
		setTimeout(() => {
			setIsFocused(false);
			setUsers([]);
			setSearchTerm("");
		}, 100);
	};

	/**
	 * Obsługa uzyskania fokusu
	 */
	const onFocusSearch = () => {
		setIsFocused(true);
	};

	return (
		<div className="relative w-full">
			<div className="relative">
				<div className="absolute left-0 top-0 bottom-0 px-4 py-2.5">
					<Search
						size="20px"
						className={cn("", isFocused ? "text-blue" : "text-white")}
					/>
				</div>
				<Input
					type="text"
					value={searchTerm}
					onChange={onChangeSearch}
					className="no-focus !outline-none border-transparent focus:border-blue ps-12 bg-gray-400 text-white placeholder:text-white/80 rounded-full"
					placeholder="Szukaj"
					onFocus={onFocusSearch}
					onBlur={onBlurSearch}
				/>
			</div>

			{/* Komponent wyświetlający wyniki wyszukiwania */}
			{isFocused && (
				<Focused
					users={users}
					currentUser={currentUser}
					setIsFocused={setIsFocused}
					searchTerm={searchTerm}
				/>
			)}
		</div>
	);
};

export default Searchbar;
