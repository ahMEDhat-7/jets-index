"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { fetchPlatforms, deletePlatform } from "@/lib/api";
import type { PlatformListItem } from "@/lib/types";
import { getTranslation, formatCurrency } from "@/lib/utils";

export default function AdminPlatformsPage(): React.ReactNode {
  const [platforms, setPlatforms] = useState<PlatformListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    void loadPlatforms();
  }, []);

  async function loadPlatforms(): Promise<void> {
    try {
      const result = await fetchPlatforms({ locale: "en", limit: "50" });
      setPlatforms(Array.isArray(result) ? result : result.data);
    } catch (err) {
      setError("Failed to load platforms");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string): Promise<void> {
    if (!confirm("Are you sure you want to delete this platform?")) return;
    if (!token) return;

    try {
      await deletePlatform(id, token);
      setPlatforms((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="font-tactical-display text-tactical-text-secondary">
          Loading platforms...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-tactical-display text-2xl font-bold text-tactical-text">
          Platforms
        </h2>
        <Link
          href="/admin/platforms/new"
          className="rounded bg-tactical-accent px-4 py-2 font-tactical-display font-bold text-tactical-bg transition-all hover:bg-tactical-accent/90"
        >
          + Create Platform
        </Link>
      </div>

      {error && (
        <div className="rounded border border-tactical-alert/30 bg-tactical-alert/10 p-3 text-sm text-tactical-alert">
          {error}
        </div>
      )}

      <div className="rounded border border-tactical-border bg-tactical-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-tactical-border">
                <th className="px-4 py-3 text-tactical-text-secondary">
                  Name
                </th>
                <th className="px-4 py-3 text-tactical-text-secondary">
                  Category
                </th>
                <th className="px-4 py-3 text-tactical-text-secondary">
                  Country
                </th>
                <th className="px-4 py-3 text-tactical-text-secondary">
                  Status
                </th>
                <th className="px-4 py-3 text-tactical-text-secondary">
                  Unit Cost
                </th>
                <th className="px-4 py-3 text-right text-tactical-text-secondary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((platform) => (
                <tr
                  key={platform.id}
                  className="border-b border-tactical-border last:border-0 hover:bg-tactical-bg-secondary/50"
                >
                  <td className="px-4 py-3 font-bold text-tactical-text">
                    {getTranslation(platform.translations, "en")}
                  </td>
                  <td className="px-4 py-3 text-tactical-text-secondary">
                    {getTranslation(
                      platform.category.translations,
                      "en",
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 text-tactical-text-secondary">
                    {getTranslation(
                      platform.country.translations,
                      "en",
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          platform.operationalStatus === "Active"
                            ? "bg-tactical-success"
                            : platform.operationalStatus === "Development"
                              ? "bg-tactical-accent"
                              : "bg-tactical-alert"
                        }`}
                      />
                      <span className="text-tactical-text-secondary">
                        {platform.operationalStatus ?? "—"}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-tactical-accent">
                    {formatCurrency(
                      platform.unitCostUsd
                        ? Number(platform.unitCostUsd)
                        : null
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/platforms/${platform.id}`}
                        className="rounded px-2 py-1 text-xs text-tactical-accent transition-colors hover:bg-tactical-accent/10"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => void handleDelete(platform.id)}
                        className="rounded px-2 py-1 text-xs text-tactical-alert transition-colors hover:bg-tactical-alert/10"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {platforms.length === 0 && (
          <div className="py-12 text-center text-tactical-text-secondary">
            No platforms found
          </div>
        )}
      </div>
    </div>
  );
}
