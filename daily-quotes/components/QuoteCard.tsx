"use client";

import { Quote, getRandomQuote, saveFavorite } from "@/actions/quote";
import { useState, useTransition } from "react";

interface Props {
  initialQuote: Quote;
}

export default function QuoteCard({ initialQuote }: Props) {
  const [quote, setQuote] = useState(initialQuote);
  const [isPending, startTransition] = useTransition();
  const [favorited, setFavorited] = useState(false);

  const handleNewQuote = () => {
    startTransition(async () => {
      const newQuote = await getRandomQuote();
      setQuote(newQuote ?? quote);
      setFavorited(false);
    });
  };

  const handleFavorite = async () => {
    await saveFavorite(quote);
    setFavorited(true);
  };

  return (
    <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md border border-gray-200 animate-fade-in transition-all duration-500">
      <p className="text-xl font-medium mb-4">"{quote.content}"</p>
      <p className="text-right text-sm text-gray-600 mb-6">— {quote.author}</p>

      <div className="flex justify-between">
        <button
          onClick={handleFavorite}
          className={`px-4 py-2 rounded transition text-white ${
            favorited
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {favorited ? "✅ Saved" : "❤️ Favorite"}
        </button>

        <button
          onClick={handleNewQuote}
          disabled={isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
        >
          🔄 {isPending ? "Loading..." : "New Quote"}
        </button>
      </div>
    </div>
  );
}
