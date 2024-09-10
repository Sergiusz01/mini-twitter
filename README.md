## Wymagania

Przed uruchomieniem projektu upewnij się, że masz zainstalowane następujące oprogramowanie:

- [Node.js](https://nodejs.org/) - platforma do uruchamiania aplikacji JavaScript po stronie serwera.
- [MongoDB](https://www.mongodb.com/try/download/community) 
- [Visual Studio Code](https://code.visualstudio.com/) - edytor kodu (opcjonalnie).

## Instalacja

### 1. Klonowanie repozytorium

Aby sklonować to repozytorium, użyj poniższej komendy w terminalu:

```bash
git clone https://github.com/Sergiusz01/mini-twitter.git
```

### 2. Instalacja zależności

#### Frontend
Przejdź do folderu `/client` i zainstaluj wszystkie zależności:

```bash
cd client
npm install
```

#### Backend
Przejdź do folderu `/server` i zainstaluj wszystkie zależności:

```bash
cd server
npm install
```

## Uruchamianie aplikacji

### 1. Uruchomienie MongoDB

Upewnij się, że MongoDB działa na Twoim lokalnym komputerze 

- Jeśli korzystasz z lokalnej wersji MongoDB, uruchom ją zgodnie z dokumentacją:  
  [MongoDB - Dokumentacja](https://www.mongodb.com/docs/manual/installation/)
  
- Skonfiguruj swoje połączenie w pliku `.env`.

### 2. Uruchomienie frontendu

Aby uruchomić frontend, przejdź do folderu `/client` i uruchom aplikację:

```bash
npm start
```

Aplikacja frontendowa powinna być dostępna pod adresem `http://localhost:3000`.

### 3. Uruchomienie backendu

Aby uruchomić backend, przejdź do folderu `/server` i użyj `nodemon`:

```bash
npx nodemon
```

Backend będzie działał na porcie `http://localhost:4000`.

## Dodatkowe informacje

- Jeśli nie masz zainstalowanego `nodemon`, możesz go zainstalować globalnie:

```bash
npm install -g nodemon
```

- Upewnij się, że w pliku `.env` znajdują się poprawne zmienne środowiskowe (np. adres bazy danych, klucze API).

---



