"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { fetchStats } from "@/lib/api";
import type { DashboardStats } from "@/lib/types";
import {
  Plane,
  FolderOpen,
  Globe,
  Factory,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function AdminDashboardPage(): React.ReactNode {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="font-tactical-display text-tactical-text-secondary">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="py-20 text-center text-tactical-text-secondary">
        Failed to load dashboard data
      </div>
    );
  }

  const statCards: { label: string; value: number; icon: LucideIcon }[] = [
    { label: "Total Platforms", value: stats.platforms, icon: Plane },
    { label: "Total Categories", value: stats.categories, icon: FolderOpen },
    { label: "Total Countries", value: stats.countries, icon: Globe },
    { label: "Total Manufacturers", value: stats.manufacturers, icon: Factory },
    { label: "Total Blogs", value: stats.blogs, icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded border border-tactical-border bg-tactical-card p-4 transition-all tactical-glow"
          >
            <div className="mb-2 text-2xl"><card.icon size={24} className="text-tactical-accent" /></div>
            <div className="font-tactical-display text-2xl font-bold text-tactical-accent">
              {card.value}
            </div>
            <div className="text-sm text-tactical-text-secondary">
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Platforms by Category */}
        <div className="rounded border border-tactical-border bg-tactical-card p-6">
          <h3 className="mb-4 font-tactical-display font-bold text-tactical-text">
            Platforms by Category
          </h3>
          <div className="space-y-3">
            {stats.platformsByCategory.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm text-tactical-text-secondary">
                  {item.name}
                </span>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-tactical-bg">
                    <div
                      className="h-full bg-tactical-accent"
                      style={{
                        width: `${stats.platforms > 0 ? (item.count / stats.platforms) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="font-tactical-display text-sm text-tactical-accent">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platforms by Country */}
        <div className="rounded border border-tactical-border bg-tactical-card p-6">
          <h3 className="mb-4 font-tactical-display font-bold text-tactical-text">
            Platforms by Country
          </h3>
          <div className="space-y-3">
            {stats.platformsByCountry.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm text-tactical-text-secondary">
                  {item.name}
                </span>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-tactical-bg">
                    <div
                      className="h-full bg-tactical-success"
                      style={{
                        width: `${stats.platforms > 0 ? (item.count / stats.platforms) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="font-tactical-display text-sm text-tactical-success">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platforms by Status */}
        <div className="rounded border border-tactical-border bg-tactical-card p-6">
          <h3 className="mb-4 font-tactical-display font-bold text-tactical-text">
            Platforms by Status
          </h3>
          <div className="space-y-3">
            {stats.platformsByStatus.map((item) => {
              const color =
                item.status === "Active"
                  ? "text-tactical-success"
                  : item.status === "Development"
                    ? "text-tactical-accent"
                    : item.status === "Retired"
                      ? "text-tactical-alert"
                      : "text-tactical-text-secondary";

              return (
                <div
                  key={item.status}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-tactical-text-secondary">
                    {item.status}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-tactical-bg">
                      <div
                        className={`h-full ${
                          item.status === "Active"
                            ? "bg-tactical-success"
                            : item.status === "Development"
                              ? "bg-tactical-accent"
                              : item.status === "Retired"
                                ? "bg-tactical-alert"
                                : "bg-tactical-text-secondary"
                        }`}
                        style={{
                          width: `${stats.platforms > 0 ? (item.count / stats.platforms) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className={`font-tactical-display text-sm ${color}`}>
                      {item.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Blogs */}
      <div className="rounded border border-tactical-border bg-tactical-card p-6">
        <h3 className="mb-4 font-tactical-display font-bold text-tactical-text">
          Recent Blog Posts
        </h3>
        {stats.recentBlogs.length === 0 ? (
          <p className="text-sm text-tactical-text-secondary">
            No blog posts yet
          </p>
        ) : (
          <div className="space-y-3">
            {stats.recentBlogs.map((blog) => {
              const translation =
                blog.translations.find((t) => t.locale === "en") ??
                blog.translations[0];

              return (
                <div
                  key={String(blog.id)}
                  className="flex items-center justify-between border-b border-tactical-border pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <div className="font-bold text-tactical-text">
                      {translation?.title ?? "Untitled"}
                    </div>
                    <div className="text-xs text-tactical-text-secondary">
                      {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
