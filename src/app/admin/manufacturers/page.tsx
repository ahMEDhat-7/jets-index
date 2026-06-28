"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { fetchManufacturers, deleteManufacturer } from "@/lib/api";
import type { ManufacturerListItem } from "@/lib/types";
import { getTranslation } from "@/lib/utils";

export default function AdminManufacturersPage(): React.ReactNode {
  const [manufacturers, setManufacturers] = useState<ManufacturerListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);

  useEffect(() => { void load(); }, []);

  async function load(): Promise<void> {
    try { const data = await fetchManufacturers({ locale: "en" }); setManufacturers(data.data); } catch (err) { console.error(err); } finally { setLoading(false); }
  }

  async function handleDelete(id: string): Promise<void> {
    if (!confirm("Are you sure?") || !token) return;
    try { await deleteManufacturer(id, token); setManufacturers((p) => p.filter((m) => m.id !== id)); } catch (err) { console.error(err); }
  }

  if (loading) return <div className="flex items-center justify-center py-20"><div className="font-tactical-display text-tactical-text-secondary">Loading...</div></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-tactical-display text-2xl font-bold text-tactical-text">Manufacturers</h2>
        <Link href="/admin/manufacturers/new" className="rounded bg-tactical-accent px-4 py-2 font-tactical-display font-bold text-tactical-bg transition-all hover:bg-tactical-accent/90">+ Create</Link>
      </div>
      <div className="rounded border border-tactical-border bg-tactical-card">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b border-tactical-border">
            <th className="px-4 py-3 text-tactical-text-secondary">Name</th>
            <th className="px-4 py-3 text-tactical-text-secondary">Specialization</th>
            <th className="px-4 py-3 text-tactical-text-secondary">Country</th>
            <th className="px-4 py-3 text-tactical-text-secondary">Platforms</th>
            <th className="px-4 py-3 text-right text-tactical-text-secondary">Actions</th>
          </tr></thead>
          <tbody>
            {manufacturers.map((m) => (
              <tr key={m.id} className="border-b border-tactical-border last:border-0 hover:bg-tactical-bg-secondary/50">
                <td className="px-4 py-3 font-bold text-tactical-text">{getTranslation(m.translations, "en")}</td>
                <td className="px-4 py-3 text-tactical-text-secondary">{m.translations.find((t) => t.locale === "en")?.specialization ?? "—"}</td>
                <td className="px-4 py-3 text-tactical-text-secondary">{m.country ? getTranslation(m.country.translations, "en") : "—"}</td>
                <td className="px-4 py-3 text-tactical-accent">{m._count?.platforms ?? 0}</td>
                <td className="px-4 py-3 text-right"><div className="flex justify-end gap-2">
                  <Link href={`/admin/manufacturers/${m.id}`} className="rounded px-2 py-1 text-xs text-tactical-accent hover:bg-tactical-accent/10">Edit</Link>
                  <button onClick={() => void handleDelete(m.id)} className="rounded px-2 py-1 text-xs text-tactical-alert hover:bg-tactical-alert/10">Delete</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {manufacturers.length === 0 && <div className="py-12 text-center text-tactical-text-secondary">No manufacturers</div>}
      </div>
    </div>
  );
}
