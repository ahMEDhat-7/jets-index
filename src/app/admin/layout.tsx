"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  LayoutDashboard,
  Plane,
  FileText,
  FolderOpen,
  Globe,
  Factory,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const sidebarLinks: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/platforms", label: "Platforms", icon: Plane },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/countries", label: "Countries", icon: Globe },
  { href: "/admin/manufacturers", label: "Manufacturers", icon: Factory },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const token = useAuthStore.getState().getToken();
    if (!token && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-tactical-bg">
        <div className="font-tactical-display text-tactical-text-secondary">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-tactical-bg">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-tactical-border bg-tactical-bg-secondary">
        {/* Logo */}
        <div className="border-b border-tactical-border px-6 py-4">
          <Link
            href="/admin"
            className="font-tactical-display text-xl font-bold text-tactical-accent"
          >
            Jets Index
          </Link>
          <div className="text-xs text-tactical-text-secondary">
            Admin Panel
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-tactical-accent/10 text-tactical-accent"
                    : "text-tactical-text-secondary hover:bg-tactical-card hover:text-tactical-text"
                )}
              >
                <link.icon size={16} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-tactical-border px-6 py-4">
          <div className="mb-2 text-sm text-tactical-text">{user.email}</div>
          <div className="mb-3 text-xs text-tactical-text-secondary">
            {user.role}
          </div>
          <button
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="text-sm text-tactical-text-secondary transition-colors hover:text-tactical-alert"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-tactical-border bg-tactical-bg/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="font-tactical-display text-lg font-bold text-tactical-text">
              {sidebarLinks.find(
                (l) =>
                  pathname === l.href ||
                  (l.href !== "/admin" && pathname.startsWith(l.href))
              )?.label ?? "Admin"}
            </h1>
            <div className="flex items-center gap-4">
              <Link
                href="/en"
                className="text-sm text-tactical-text-secondary transition-colors hover:text-tactical-text"
              >
                View Site
              </Link>
              <ThemeToggle label="Toggle theme" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
