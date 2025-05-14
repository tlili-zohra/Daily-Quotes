"use server";

import axios from "axios";

export interface Quote {
  id: string;
  content: string;
  author: string;
}

const favorites: Quote[] = [];

// ✅ Get random quote from ZenQuotes API

// دالة لجلب اقتباس عشوائي
export async function getRandomQuote() {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");

    // طباعة الاستجابة لمعرفة ما يحتويه الـ API
    console.log(response.data);

    // تأكد من أن الاستجابة تحتوي على البيانات المتوقعة
    if (response && response.data && response.data.length > 0) {
      const quoteData = response.data[0]; // الحصول على أول اقتباس
      return {
        id: crypto.randomUUID(),
        content: quoteData.q, // نص الاقتباس
        author: quoteData.a, // المؤلف
      };
    } else {
      throw new Error("No data returned from API");
    }
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    //throw new Error("Failed to fetch quote"); // إعادة الخطأ
  }
}

// ✅ Save favorite quote
export async function saveFavorite(quote: Quote): Promise<void> {
  // prevent duplicates by content & author
  const exists = favorites.some(
    (q) => q.content === quote.content && q.author === quote.author
  );
  if (!exists) {
    favorites.push(quote);
  }
}

// ✅ Get all favorites
export async function getFavorites(): Promise<Quote[]> {
  return favorites;
}

// ✅ Delete favorite by ID
export async function deleteFavorite(id: string): Promise<void> {
  const index = favorites.findIndex((q) => q.id === id);
  if (index !== -1) {
    favorites.splice(index, 1);
  }
}
