Sub PrezentacjaAplikacjiMiniTwitter()
    ' Tworzenie nowej prezentacji
    Dim ppt As Presentation
    Set ppt = Application.Presentations.Add
    
    ' ========== SLAJD 1: WPROWADZENIE ==========
    With ppt.Slides.Add(1, ppLayoutText)
        .Shapes.Title.TextFrame.TextRange.Text = "Mini-Twitter - Dokumentacja Techniczna"
        .Shapes.Item(2).TextFrame.TextRange.Text = "Aplikacja społecznościowa wzorowana na Twitterze" & vbNewLine & _
            "Autor: [Imię i Nazwisko]" & vbNewLine & _
            "Data: " & Format(Date, "dd.mm.yyyy")
    End With
    
    ' ========== SLAJD 2: CEL PROJEKTU ==========
    With ppt.Slides.Add(2, ppLayoutText)
        .Shapes.Title.TextFrame.TextRange.Text = "Cel Projektu"
        .Shapes.Item(2).TextFrame.TextRange.Text = _
            "• Stworzenie nowoczesnej platformy społecznościowej" & vbNewLine & _
            "• Implementacja kluczowych funkcjonalności Twittera" & vbNewLine & _
            "• Zapewnienie wysokiej wydajności i skalowalności" & vbNewLine & _
            "• Wykorzystanie najnowszych technologii webowych" & vbNewLine & _
            "• Zachowanie najwyższych standardów bezpieczeństwa"
    End With
    
    ' ========== SLAJD 3: ARCHITEKTURA SYSTEMU ==========
    With ppt.Slides.Add(3, ppLayoutText)
        .Shapes.Title.TextFrame.TextRange.Text = "Architektura Systemu"
        .Shapes.Item(2).TextFrame.TextRange.Text = _
            "Frontend:" & vbNewLine & _
            "• Next.js 14 (App Router)" & vbNewLine & _
            "• TypeScript" & vbNewLine & _
            "• Tailwind CSS" & vbNewLine & _
            "• React Hook Form" & vbNewLine & vbNewLine & _
            "Backend:" & vbNewLine & _
            "• Next.js API Routes" & vbNewLine & _
            "• Prisma ORM" & vbNewLine & _
            "• MySQL" & vbNewLine & _
            "• Clerk Authentication"
    End With
    
    ' ========== SLAJD 4: INTEGRACJA FRONTEND-BACKEND ==========
    With ppt.Slides.Add(4, ppLayoutText)
        .Shapes.Title.TextFrame.TextRange.Text = "Integracja Frontend-Backend"
        .Shapes.Item(2).TextFrame.TextRange.Text = _
            "1. Server Components (Next.js):" & vbNewLine & _
            "   • Bezpośrednie zapytania do bazy danych" & vbNewLine & _
            "   • Renderowanie po stronie serwera" & vbNewLine & vbNewLine & _
            "2. Server Actions:" & vbNewLine & _
            "   • Bezpośrednia komunikacja z bazą danych" & vbNewLine & _
            "   • Mutacje danych bez dodatkowego API" & vbNewLine & vbNewLine & _
            "3. API Routes:" & vbNewLine & _
            "   • Endpointy REST dla operacji CRUD" & vbNewLine & _
            "   • Obsługa żądań asynchronicznych"
    End With
    
    ' ========== SLAJD 5: AUTENTYKACJA ==========
    With ppt.Slides.Add(5, ppLayoutText)
        .Shapes.Title.TextFrame.TextRange.Text = "System Autentykacji (Clerk)"
        .Shapes.Item(2).TextFrame.TextRange.Text = _
            "Proces rejestracji:" & vbNewLine & _
            "1. Rejestracja przez Clerk" & vbNewLine & _
            "2. Weryfikacja email" & vbNewLine & _
            "3. Utworzenie profilu w bazie danych" & vbNewLine & _
            "4. Proces onboardingu" & vbNewLine & vbNewLine & _
            "Zabezpieczenia:" & vbNewLine & _
            "• OAuth 2.0" & vbNewLine & _
            "• JWT Tokens" & vbNewLine & _
            "• Middleware autoryzacyjne" & vbNewLine & _
            "• Szyfrowanie danych"
    End With
    
    ' ========== SLAJD 6: BAZA DANYCH ==========
    With ppt.Slides.Add(6, ppLayoutText)
        .Shapes.Title.TextFrame.TextRange.Text = "Struktura Bazy Danych"
        .Shapes.Item(2).TextFrame.TextRange.Text = _
            "Główne tabele:" & vbNewLine & _
            "• User - dane użytkowników" & vbNewLine & _
            "• Thread - tweety i odpowiedzi" & vbNewLine & _
            "• Follower - relacje między użytkownikami" & vbNewLine & _
            "• Notification - system powiadomień" & vbNewLine & _
            "• Like - polubienia" & vbNewLine & _
            "• Bookmark - zakładki" & vbNewLine & vbNewLine & _
            "Zarządzanie:" & vbNewLine & _
            "• Prisma ORM" & vbNewLine & _
            "• Migracje automatyczne" & vbNewLine & _
            "• Indeksowanie dla wydajności"
    End With
    
    ' ========== SLAJD 7: FUNKCJONALNOŚCI SPOŁECZNOŚCIOWE ==========
    With ppt.Slides.Add(7, ppLayoutText)
        .Shapes.Title.TextFrame.TextRange.Text = "Funkcjonalności Społecznościowe"
        .Shapes.Item(2).TextFrame.TextRange.Text = _
            "1. Tweety:" & vbNewLine & _
            "   • Tworzenie i usuwanie" & vbNewLine & _
            "   • Załączanie obrazów" & vbNewLine & _
            "   • System odpowiedzi" & vbNewLine & vbNewLine & _
            "2. Interakcje:" & vbNewLine & _
            "   • Polubienia" & vbNewLine & _
            "   • Zakładki" & vbNewLine & _
            "   • Obserwowanie użytkowników" & vbNewLine & vbNewLine & _
            "3. Powiadomienia:" & vbNewLine & _
            "   • W czasie rzeczywistym" & vbNewLine & _
            "   • Różne typy aktywności"
    End With
    
    ' ========== SLAJD 8: INTERFEJS UŻYTKOWNIKA ==========
    With ppt.Slides.Add(8, ppLayoutText)
        .Shapes.Title.TextFrame.TextRange.Text = "Interfejs Użytkownika"
        .Shapes.Item(2).TextFrame.TextRange.Text = _
            "Komponenty UI:" & vbNewLine & _
            "• Responsywny layout" & vbNewLine & _
            "• Dynamiczne formularze" & vbNewLine & _
            "• Modalne okna" & vbNewLine & _
            "• Infinite scroll" & vbNewLine & vbNewLine & _
            "Biblioteki:" & vbNewLine & _
            "• Tailwind CSS - stylowanie" & vbNewLine & _
            "• React Hook Form - formularze" & vbNewLine & _
            "• Zod - walidacja" & vbNewLine & _
            "• Shadcn/ui - komponenty"
    End With
    
    ' ========== SLAJD 9: OPTYMALIZACJA I WYDAJNOŚĆ ==========
    With ppt.Slides.Add(9, ppLayoutText)
        .Shapes.Title.TextFrame.TextRange.Text = "Optymalizacja i Wydajność"
        .Shapes.Item(2).TextFrame.TextRange.Text = _
            "1. Frontend:" & vbNewLine & _
            "   • Server-side rendering" & vbNewLine & _
            "   • Lazy loading komponentów" & vbNewLine & _
            "   • Optymalizacja obrazów" & vbNewLine & vbNewLine & _
            "2. Backend:" & vbNewLine & _
            "   • Indeksowanie bazy danych" & vbNewLine & _
            "   • Cachowanie zapytań" & vbNewLine & _
            "   • Paginacja wyników" & vbNewLine & vbNewLine & _
            "3. Infrastruktura:" & vbNewLine & _
            "   • CDN dla statycznych zasobów" & vbNewLine & _
            "   • Optymalizacja zapytań SQL"
    End With
    
    ' ========== SLAJD 10: BEZPIECZEŃSTWO ==========
    With ppt.Slides.Add(10, ppLayoutText)
        .Shapes.Title.TextFrame.TextRange.Text = "Bezpieczeństwo Aplikacji"
        .Shapes.Item(2).TextFrame.TextRange.Text = _
            "Zabezpieczenia:" & vbNewLine & _
            "• Autentykacja przez Clerk" & vbNewLine & _
            "• Walidacja danych wejściowych" & vbNewLine & _
            "• Zabezpieczenie przed SQL Injection" & vbNewLine & _
            "• CSRF Protection" & vbNewLine & _
            "• Rate Limiting" & vbNewLine & _
            "• Szyfrowanie danych wrażliwych" & vbNewLine & _
            "• Bezpieczne sesje użytkowników" & vbNewLine & _
            "• Monitoring bezpieczeństwa"
    End With
    
    ' ========== SLAJD 11: PODSUMOWANIE ==========
    With ppt.Slides.Add(11, ppLayoutText)
        .Shapes.Title.TextFrame.TextRange.Text = "Podsumowanie"
        .Shapes.Item(2).TextFrame.TextRange.Text = _
            "Osiągnięcia projektu:" & vbNewLine & _
            "• Pełna implementacja funkcjonalności społecznościowych" & vbNewLine & _
            "• Wysoka wydajność i skalowalność" & vbNewLine & _
            "• Nowoczesny, responsywny interfejs" & vbNewLine & _
            "• Bezpieczna architektura" & vbNewLine & _
            "• Łatwa rozszerzalność" & vbNewLine & vbNewLine & _
            "Możliwości rozwoju:" & vbNewLine & _
            "• Dodanie czatu" & vbNewLine & _
            "• Integracja z zewnętrznymi API" & vbNewLine & _
            "• Rozbudowa analityki"
    End With
    
    ' Zapisanie prezentacji
    ppt.SaveAs "Mini_Twitter_Dokumentacja.pptx"
    
End Sub 