"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-14 sm:top-16 left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-lg">
          <nav className="flex flex-col p-4 gap-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
            >
              Home
            </Link>
            <Link
              href="/browse"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
            >
              Browse
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
            >
              News
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
