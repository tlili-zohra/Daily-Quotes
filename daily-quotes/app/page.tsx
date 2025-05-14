"use client";

import { useState, useEffect, useTransition } from "react";
import { getRandomQuote, saveFavorite } from "@/actions/quote";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useQuoteContext } from "@/context/QuoteContext";

// نوع الاقتباس
type Quote = {
  id: string;
  content: string;
  author: string;
};

export default function HomePage() {
  const [quote, setQuote] = useState<Quote>();
  const [isPending, startTransition] = useTransition();
  const [isFavorite, setIsFavorite] = useState(false);
  const { addFavorite } = useQuoteContext();

  // دالة إعادة استخدام
  const fetchNewQuote = async () => {
    try {
      const newQuote = await getRandomQuote();
      setQuote(newQuote);
      setIsFavorite(false);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  // جلب أولي
  useEffect(() => {
    fetchNewQuote();
  }, []);

  // حفظ كمفضل
  const handleSaveFavorite = async () => {
    if (quote) {
      await saveFavorite(quote);
      setIsFavorite(true);
      addFavorite(quote); // تحديث السياق (context)
    }
  };

  if (!quote) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6">
      <Navbar />

      <div className="max-w-2xl mx-auto">
        <Card
          className={`border-2 ${
            isFavorite ? "border-blue-500" : "border-gray-300"
          } shadow-md p-4 mb-6 transition-all duration-300 animate-fade-in`}
        >
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              “{quote.content}”
            </CardTitle>
            <CardDescription className="text-right text-gray-500 mt-4">
              — {quote.author}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleSaveFavorite}
                className="text-blue-600 hover:underline font-medium"
                disabled={isFavorite}
              >
                {isFavorite ? "❤️ Saved" : "Add to Favorites"}
              </button>
              <button
                onClick={() => startTransition(fetchNewQuote)}
                className="text-blue-600 hover:underline font-medium"
              >
                New Quote
              </button>
            </div>
          </CardContent>
        </Card>

        {isPending && (
          <p className="text-center text-sm text-gray-500">
            Loading new quote...
          </p>
        )}
      </div>
    </main>
  );
}
