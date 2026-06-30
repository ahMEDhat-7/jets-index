"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { fetchCountries, deleteCountry } from "@/lib/api";
import type { CountryListItem } from "@/lib/types";
import { getTranslation } from "@/lib/utils";

export default function AdminCountriesPage(): React.ReactNode {
  const [countries, setCountries] = useState<CountryListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);

  useEffect(() => { void load(); }, []);

  async function load(): Promise<void> {
    try { const result = await fetchCountries({ locale: "en" }); setCountries(Array.isArray(result) ? result : result.data); } catch (err) { console.error(err); } finally { setLoading(false); }
  }

  async function handleDelete(id: string): Promise<void> {
    if (!confirm("Are you sure?") || !token) return;
    try { await deleteCountry(id, token); setCountries((p) => p.filter((c) => c.id !== id)); } catch (err) { console.error(err); }
  }

  if (loading) return <div className="flex items-center justify-center py-20"><div className="font-tactical-display text-tactical-text-secondary">Loading...</div></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-tactical-display text-2xl font-bold text-tactical-text">Countries</h2>
        <Link href="/admin/countries/new" className="rounded bg-tactical-accent px-4 py-2 font-tactical-display font-bold text-tactical-bg transition-all hover:bg-tactical-accent/90">+ Create</Link>
      </div>
      <div className="rounded border border-tactical-border bg-tactical-card">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b border-tactical-border">
            <th className="px-4 py-3 text-tactical-text-secondary">Name</th>
            <th className="px-4 py-3 text-tactical-text-secondary">Platforms</th>
            <th className="px-4 py-3 text-tactical-text-secondary">Manufacturers</th>
            <th className="px-4 py-3 text-right text-tactical-text-secondary">Actions</th>
          </tr></thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.id} className="border-b border-tactical-border last:border-0 hover:bg-tactical-bg-secondary/50">
                <td className="px-4 py-3 font-bold text-tactical-text">{getTranslation(country.translations, "en")}</td>
                <td className="px-4 py-3 text-tactical-accent">{country._count?.platforms ?? 0}</td>
                <td className="px-4 py-3 text-tactical-accent">{country._count?.manufacturers ?? 0}</td>
                <td className="px-4 py-3 text-right"><div className="flex justify-end gap-2">
                  <Link href={`/admin/countries/${country.id}`} className="rounded px-2 py-1 text-xs text-tactical-accent hover:bg-tactical-accent/10">Edit</Link>
                  <button onClick={() => void handleDelete(country.id)} className="rounded px-2 py-1 text-xs text-tactical-alert hover:bg-tactical-alert/10">Delete</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {countries.length === 0 && <div className="py-12 text-center text-tactical-text-secondary">No countries</div>}
      </div>
    </div>
  );
}
