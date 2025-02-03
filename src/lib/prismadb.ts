/**
 * Konfiguracja i inicjalizacja klienta Prisma
 * Implementuje wzorzec Singleton dla połączenia z bazą danych
 */

import { PrismaClient } from "@prisma/client";

/**
 * Funkcja tworząca pojedynczą instancję klienta Prisma
 * @returns Nowa instancja PrismaClient
 */
const prismaClientSingleton = () => {
	return new PrismaClient();
};

/**
 * Typ reprezentujący instancję singletona PrismaClient
 */
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

/**
 * Rozszerzenie globalnego obiektu o właściwość prisma
 * Umożliwia przechowywanie pojedynczej instancji między hot-reloadami w trybie development
 */
const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClientSingleton | undefined;
};

/**
 * Instancja klienta Prisma
 * Wykorzystuje istniejącą instancję lub tworzy nową
 */
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

/**
 * Zachowuje instancję w globalnym obiekcie w trybie development
 * Zapobiega tworzeniu wielu połączeń podczas hot-reloadu
 */
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
