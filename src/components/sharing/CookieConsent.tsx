"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1B1B1B]/95 backdrop-blur-sm border-t border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 pr-8 sm:pr-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              Ta strona używa plików cookies w celu świadczenia usług i analizowania ruchu. 
              Korzystając z tej strony zgadzasz się na ich użycie.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("/polityka-prywatnosci", "_blank")}
              className="bg-transparent border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 w-full sm:w-auto whitespace-nowrap"
            >
              Dowiedz się więcej
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleAccept}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto whitespace-nowrap"
            >
              Akceptuję
            </Button>
          </div>
          <button
            onClick={handleAccept}
            className="absolute top-4 right-4 sm:static text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-gray-800/50 transition-colors"
            aria-label="Zamknij"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 