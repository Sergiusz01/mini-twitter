/**
 * Middleware konfiguracyjny dla autentykacji Clerk
 * Obsługuje zabezpieczenie tras i zarządzanie sesjami użytkowników
 */
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

/**
 * Konfiguracja tras, które będą obsługiwane przez middleware
 * Definiuje wzorce URL, które powinny być przechwytywane
 */
export const config = {
  matcher: [
    // Pomija wewnętrzne pliki Next.js i pliki statyczne, chyba że znajdują się w parametrach wyszukiwania
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Zawsze uruchamia się dla tras API
    '/(api|trpc)(.*)',
  ],
}