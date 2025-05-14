"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow-sm">
      <h1 className="text-xl font-semibold">Daily Quotes</h1>
      <div className="space-x-4">
        <Link
          href="/"
          className={`hover:underline ${
            pathname === "/" ? "text-blue-600 font-bold" : "text-gray-700"
          }`}
        >
          Home
        </Link>
        <Link
          href="/favorites"
          className={`hover:underline ${
            pathname === "/favorites"
              ? "text-blue-600 font-bold"
              : "text-gray-700"
          }`}
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
}
