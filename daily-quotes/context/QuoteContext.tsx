"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Quote = {
  id: string;
  content: string;
  author: string;
};

type QuoteContextType = {
  favorites: Quote[];
  addFavorite: (quote: Quote) => void;
  removeFavorite: (id: string) => void;
};

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Quote[]>([]);

  const addFavorite = (quote: Quote) => {
    setFavorites((prev) => [...prev, quote]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <QuoteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </QuoteContext.Provider>
  );
}

// Hook للاستخدام بسهولة
export function useQuoteContext() {
  const context = useContext(QuoteContext);
  if (!context)
    throw new Error("useQuoteContext must be used inside QuoteProvider");
  return context;
}
