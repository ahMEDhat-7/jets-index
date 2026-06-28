"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { createManufacturer } from "@/lib/api";

export default function NewManufacturerPage(): React.ReactNode {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ countryId: "", nameEn: "", specEn: "", nameAr: "", specAr: "" });

  function updateField(field: string, value: string): void { setForm((p) => ({ ...p, [field]: value })); }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!token) return;
    setSaving(true); setError("");
    try {
      await createManufacturer({
        countryId: form.countryId,
        translations: [
          { locale: "en", name: form.nameEn, specialization: form.specEn || undefined },
          { locale: "ar", name: form.nameAr, specialization: form.specAr || undefined },
        ],
      }, token);
      router.push("/admin/manufacturers");
    } catch (err) { setError(err instanceof Error ? err.message : "Failed"); } finally { setSaving(false); }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-6 font-tactical-display text-2xl font-bold text-tactical-text">Create Manufacturer</h2>
      {error && <div className="mb-4 rounded border border-tactical-alert/30 bg-tactical-alert/10 p-3 text-sm text-tactical-alert">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded border border-tactical-border bg-tactical-card p-6">
          <h3 className="mb-4 font-tactical-display font-bold text-tactical-accent">Shared</h3>
          <div><label className="mb-1 block text-sm text-tactical-text-secondary">Country ID</label><input type="text" value={form.countryId} onChange={(e) => updateField("countryId", e.target.value)} className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none" placeholder="UUID" required /></div>
        </div>
        <div className="rounded border border-tactical-border bg-tactical-card p-6">
          <h3 className="mb-4 font-tactical-display font-bold text-tactical-accent">English</h3>
          <div className="space-y-3">
            <div><label className="mb-1 block text-sm text-tactical-text-secondary">Name</label><input type="text" value={form.nameEn} onChange={(e) => updateField("nameEn", e.target.value)} className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none" required /></div>
            <div><label className="mb-1 block text-sm text-tactical-text-secondary">Specialization</label><input type="text" value={form.specEn} onChange={(e) => updateField("specEn", e.target.value)} className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none" /></div>
          </div>
        </div>
        <div className="rounded border border-tactical-border bg-tactical-card p-6">
          <h3 className="mb-4 font-tactical-display font-bold text-tactical-accent">العربية</h3>
          <div className="space-y-3">
            <div><label className="mb-1 block text-sm text-tactical-text-secondary">Name</label><input type="text" value={form.nameAr} onChange={(e) => updateField("nameAr", e.target.value)} dir="rtl" className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none" required /></div>
            <div><label className="mb-1 block text-sm text-tactical-text-secondary">Specialization</label><input type="text" value={form.specAr} onChange={(e) => updateField("specAr", e.target.value)} dir="rtl" className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none" /></div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="rounded border border-tactical-border px-4 py-2 text-tactical-text-secondary hover:text-tactical-text">Cancel</button>
          <button type="submit" disabled={saving} className="rounded bg-tactical-accent px-6 py-2 font-tactical-display font-bold text-tactical-bg hover:bg-tactical-accent/90 disabled:opacity-50">{saving ? "Saving..." : "Create"}</button>
        </div>
      </form>
    </div>
  );
}
