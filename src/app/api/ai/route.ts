import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error('Brak klucza API Gemini w zmiennych środowiskowych');
}

// Inicjalizacja Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req: Request) {
  try {
    // Sprawdzenie czy request jest poprawny
    if (!req.body) {
      return NextResponse.json(
        { error: "Brak treści zapytania" },
        { status: 400 }
      );
    }

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Brak wiadomości w zapytaniu" },
        { status: 400 }
      );
    }

    try {
      // Używamy modelu gemini-pro
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      // Dodajemy kontekst w języku polskim
      const prompt = `Kontekst: Jesteś zaawansowanym asystentem AI o nazwie Gemini w aplikacji typu Twitter. 
      Twoje główne cechy to:
      - Odpowiadasz zawsze w języku polskim
      - Jesteś przyjazny i pomocny
      - Specjalizujesz się w tematach akademickich i studenckich
      - Potrafisz formatować odpowiedzi używając markdown (np. **pogrubienie**, *kursywa*, listy)
      - Odpowiadasz szczegółowo, ale zwięźle
      - Jeśli pytanie dotyczy programowania, pokazujesz przykłady kodu
      - Zawsze starasz się podać źródła lub dodatkowe materiały do nauki
      
      Pytanie użytkownika: ${message}
      
      Odpowiedź sformatuj w sposób czytelny i przejrzysty, używając odpowiedniego formatowania.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiResponse = response.text();

      if (!aiResponse) {
        throw new Error('Brak odpowiedzi od AI');
      }

      return NextResponse.json({
        message: aiResponse,
      });
    } catch (aiError) {
      console.error("[AI_ERROR]", aiError);
      return NextResponse.json(
        { error: "Błąd podczas generowania odpowiedzi. Spróbuj ponownie później." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[API_ERROR]", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas przetwarzania zapytania" },
      { status: 500 }
    );
  }
} 