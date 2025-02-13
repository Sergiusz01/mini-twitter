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
   Stwórz plik `.env` i uzupełnij następujące zmienne:

```env
# CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# DATABASE
DATABASE_URL=

# CLOUDINARY
NEXT_PUBLIC_CLOUDINARY_NAME=
NEXT_PUBLIC_UPLOAD_PRESET=

# GEMINI AI
GEMINI_API_KEY=

# NEXT URL
NEXT_PUBLIC_NEXT_URL=http://localhost:3000
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

