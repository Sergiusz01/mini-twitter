# Mini-Twitter

Mini-Twitter to aplikacja społecznościowa zbudowana przy użyciu Next.js 14, która implementuje podstawowe funkcjonalności Twittera. Projekt wykorzystuje nowoczesne technologie i najlepsze praktyki programistyczne.

## Technologie

- Next.js 14 (App Router)
- TypeScript
- MySQL (baza danych)
- Prisma (ORM)
- Clerk (autentykacja)
- Cloudinary (przechowywanie obrazów)
- Tailwind CSS (stylizacja)
- React Hook Form (formularze)
- Zod (walidacja)
- Zustand (zarządzanie stanem)

## Wymagania systemowe

- Node.js 18.17.0 lub nowszy
- MySQL 8.0 lub nowszy
- NPM lub Yarn

## Instalacja i konfiguracja lokalna

1. Sklonuj repozytorium:
```bash
git clone [adres-repozytorium]
cd mini-twitter
```

2. Zainstaluj zależności:
```bash
npm install
# lub
yarn install
```

3. Skonfiguruj zmienne środowiskowe:
   Skopiuj plik `.env.example` do `.env` i uzupełnij następujące zmienne:

   ```env
   # URL aplikacji
   NEXT_PUBLIC_NEXT_URL="http://localhost:3000"

   # Baza danych
   DATABASE_URL="mysql://user:password@localhost:3306/mini_twitter"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_NAME=
   NEXT_PUBLIC_UPLOAD_PRESET=

   # Gemini AI (opcjonalne)
   GEMINI_API_KEY=
   ```

4. Zainicjalizuj bazę danych:
```bash
npx prisma generate
npx prisma db push
```

5. Uruchom aplikację w trybie deweloperskim:
```bash
npm run dev
# lub
yarn dev
```

## Wdrożenie produkcyjne

### 1. Przygotowanie do wdrożenia

1. Upewnij się, że wszystkie zmienne środowiskowe są poprawnie skonfigurowane
2. Zbuduj aplikację:
```bash
npm run build
# lub
yarn build
```

### 2. Wdrożenie na Vercel (zalecane)

1. Utwórz konto na [Vercel](https://vercel.com)
2. Połącz repozytorium z projektem Vercel
3. Skonfiguruj zmienne środowiskowe w panelu Vercel:
   - Dodaj wszystkie zmienne z pliku `.env`
   - Ustaw `NEXT_PUBLIC_NEXT_URL` na adres produkcyjny
4. Wdróż aplikację klikając "Deploy"

### 3. Konfiguracja usług zewnętrznych

#### Clerk
1. Utwórz konto na [Clerk](https://clerk.dev)
2. Stwórz nową aplikację
3. Skonfiguruj metody uwierzytelniania (np. Google, GitHub)
4. Skopiuj klucze API do zmiennych środowiskowych

#### Cloudinary
1. Utwórz konto na [Cloudinary](https://cloudinary.com)
2. Stwórz nowy projekt
3. Skonfiguruj preset do przesyłania obrazów
4. Skopiuj nazwę chmury i preset do zmiennych środowiskowych

#### MySQL
1. Skonfiguruj bazę danych MySQL (np. na PlanetScale lub innym dostawcy)
2. Zaktualizuj `DATABASE_URL` w zmiennych środowiskowych

### 4. Wdrożenie na własnym serwerze

1. Przygotuj serwer z Node.js i MySQL
2. Sklonuj repozytorium na serwerze
3. Zainstaluj zależności produkcyjne:
```bash
npm install --production
```
4. Zbuduj aplikację:
```bash
npm run build
```
5. Uruchom serwer produkcyjny:
```bash
npm start
```

## Monitorowanie i utrzymanie

- Regularnie sprawdzaj logi aplikacji w panelu Vercel
- Monitoruj wykorzystanie zasobów Cloudinary
- Wykonuj kopie zapasowe bazy danych MySQL
- Śledź statystyki uwierzytelniania w panelu Clerk
- Aktualizuj zależności do najnowszych stabilnych wersji

## Wsparcie

W przypadku problemów lub pytań:
1. Sprawdź sekcję Issues w repozytorium
2. Skontaktuj się z zespołem deweloperskim
