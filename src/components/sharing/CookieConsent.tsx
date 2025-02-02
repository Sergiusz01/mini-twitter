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
    <div className="fixed bottom-0 left-0 right-0 bg-black-200/95 border-t border-gray-300 p-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-gray-200 text-sm">
            Ta strona używa plików cookies w celu świadczenia usług i analizowania ruchu. 
            Korzystając z tej strony zgadzasz się na ich użycie.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("/polityka-prywatnosci", "_blank")}
            className="text-gray-200 hover:text-white whitespace-nowrap"
          >
            Dowiedz się więcej
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAccept}
            className="whitespace-nowrap"
          >
            Akceptuję
          </Button>
          <button
            onClick={handleAccept}
            className="text-gray-200 hover:text-white p-1"
            aria-label="Zamknij"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 