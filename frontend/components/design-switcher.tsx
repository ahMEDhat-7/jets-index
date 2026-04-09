"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const designs = [
  { id: 2, name: "Browse", desc: "Gallery", path: "/browse" },
];

export function DesignSwitcher() {
  const pathname = usePathname();
  const currentPath = pathname;

  return (
    <nav className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto max-w-[calc(100vw-120px)] sm:max-w-none">
      {designs.map((design) => (
        <Link
          key={design.id}
          href={design.path}
          className={cn(
            "px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap",
            currentPath === design.path
              ? "bg-slate-900 dark:bg-slate-700 text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700",
          )}
        >
          {design.name}
        </Link>
      ))}
    </nav>
  );
}

export function DesignInfo() {
  const pathname = usePathname();
  const design = designs.find((d) => pathname.startsWith(d.path));

  return (
    <div className="text-sm">
      <span className="font-semibold dark:text-white">{design?.name}</span>
      <span className="text-slate-500 dark:text-slate-400 ml-2">{design?.desc}</span>
    </div>
  );
}
