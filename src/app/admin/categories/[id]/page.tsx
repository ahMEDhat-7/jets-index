"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { updateCategory } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export default function EditCategoryPage(): React.ReactNode {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const token = useAuthStore((s) => s.token);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ nameEn: "", domainEn: "", nameAr: "", domainAr: "" });

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        const res = await fetch(`/api/v1/categories/${id}?locale=en`);
        const json = await res.json();
        const cat = json.data;
        const en = cat.translations?.find((t: { locale: string }) => t.locale === "en");
        const ar = cat.translations?.find((t: { locale: string }) => t.locale === "ar");
        setForm({ nameEn: en?.name ?? "", domainEn: en?.domain ?? "", nameAr: ar?.name ?? "", domainAr: ar?.domain ?? "" });
      } catch (err) { setError("Failed to load"); console.error(err); } finally { setLoading(false); }
    }
    void load();
  }, [id]);

  function updateField(field: string, value: string): void { setForm((p) => ({ ...p, [field]: value })); }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!token) return;
    setSaving(true); setError("");
    try {
      await updateCategory(id, { translations: [
        { locale: "en", name: form.nameEn, domain: form.domainEn || undefined },
        { locale: "ar", name: form.nameAr, domain: form.domainAr || undefined },
      ]}, token);
      router.push("/admin/categories");
    } catch (err) { setError(err instanceof Error ? err.message : "Failed"); } finally { setSaving(false); }
  }

  if (loading) return <div className="flex items-center justify-center py-20"><div className="font-tactical-display text-tactical-text-secondary">Loading...</div></div>;

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-6 font-tactical-display text-2xl font-bold text-tactical-text">Edit Category</h2>
      {error && <div className="mb-4 rounded border border-tactical-alert/30 bg-tactical-alert/10 p-3 text-sm text-tactical-alert">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded border border-tactical-border bg-tactical-card p-6">
          <h3 className="mb-4 font-tactical-display font-bold text-tactical-accent">English</h3>
          <div className="space-y-3">
            <div><label className="mb-1 block text-sm text-tactical-text-secondary">Name</label><input type="text" value={form.nameEn} onChange={(e) => updateField("nameEn", e.target.value)} className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none" required /></div>
            <div><label className="mb-1 block text-sm text-tactical-text-secondary">Domain</label><input type="text" value={form.domainEn} onChange={(e) => updateField("domainEn", e.target.value)} className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none" /></div>
          </div>
        </div>
        <div className="rounded border border-tactical-border bg-tactical-card p-6">
          <h3 className="mb-4 font-tactical-display font-bold text-tactical-accent">العربية</h3>
          <div className="space-y-3">
            <div><label className="mb-1 block text-sm text-tactical-text-secondary">Name</label><input type="text" value={form.nameAr} onChange={(e) => updateField("nameAr", e.target.value)} dir="rtl" className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none" required /></div>
            <div><label className="mb-1 block text-sm text-tactical-text-secondary">Domain</label><input type="text" value={form.domainAr} onChange={(e) => updateField("domainAr", e.target.value)} dir="rtl" className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none" /></div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="rounded border border-tactical-border px-4 py-2 text-tactical-text-secondary hover:text-tactical-text">Cancel</button>
          <button type="submit" disabled={saving} className="rounded bg-tactical-accent px-6 py-2 font-tactical-display font-bold text-tactical-bg hover:bg-tactical-accent/90 disabled:opacity-50">{saving ? "Saving..." : "Update"}</button>
        </div>
      </form>
    </div>
  );
}
