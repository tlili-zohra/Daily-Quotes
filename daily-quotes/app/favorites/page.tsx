"use client";

import NavBar from "@/components/Navbar";
import { useQuoteContext } from "@/context/QuoteContext";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useQuoteContext();

  return (
    <div>
      <NavBar />
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Favorite Quotes</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-600">No favorite quotes yet.</p>
        ) : (
          <ul className="space-y-4">
            {favorites.map((quote) => (
              <li key={quote.id} className="border p-4 rounded">
                <p>"{quote.content}"</p>
                <p className="text-right font-semibold">— {quote.author}</p>
                <button
                  onClick={() => removeFavorite(quote.id)}
                  className="text-red-500 mt-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
