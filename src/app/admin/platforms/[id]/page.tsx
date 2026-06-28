"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { fetchPlatform, updatePlatform } from "@/lib/api";
import type { PlatformDetail } from "@/lib/types";

export default function EditPlatformPage(): React.ReactNode {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const token = useAuthStore((s) => s.token);
  const [platform, setPlatform] = useState<PlatformDetail | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    unitCostUsd: "",
    operationalStatus: "",
    imageUrl: "",
    categoryId: "",
    manufacturerId: "",
    countryId: "",
    nameEn: "",
    descriptionEn: "",
    nameAr: "",
    descriptionAr: "",
  });

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        const data = await fetchPlatform(id, "en");
        setPlatform(data);

        const enTranslation = data.translations.find((t) => t.locale === "en");
        const arTranslation = data.translations.find((t) => t.locale === "ar");

        setForm({
          unitCostUsd: data.unitCostUsd ? String(data.unitCostUsd) : "",
          operationalStatus: data.operationalStatus ?? "",
          imageUrl: data.imageUrl ?? "",
          categoryId: data.categoryId,
          manufacturerId: data.manufacturerId,
          countryId: data.countryId,
          nameEn: enTranslation?.name ?? "",
          descriptionEn: enTranslation?.description ?? "",
          nameAr: arTranslation?.name ?? "",
          descriptionAr: arTranslation?.description ?? "",
        });
      } catch (err) {
        setError("Failed to load platform");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, [id]);

  function updateField(field: string, value: string): void {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError("");

    try {
      await updatePlatform(
        id,
        {
          unitCostUsd: form.unitCostUsd ? parseFloat(form.unitCostUsd) : null,
          operationalStatus: form.operationalStatus || null,
          imageUrl: form.imageUrl || null,
          categoryId: form.categoryId,
          manufacturerId: form.manufacturerId,
          countryId: form.countryId,
          translations: [
            { locale: "en", name: form.nameEn, description: form.descriptionEn || undefined },
            { locale: "ar", name: form.nameAr, description: form.descriptionAr || undefined },
          ],
        },
        token
      );
      router.push("/admin/platforms");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update platform");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="font-tactical-display text-tactical-text-secondary">
          Loading platform...
        </div>
      </div>
    );
  }

  if (!platform) {
    return (
      <div className="py-20 text-center text-tactical-text-secondary">
        Platform not found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-6 font-tactical-display text-2xl font-bold text-tactical-text">
        Edit Platform
      </h2>

      {error && (
        <div className="mb-4 rounded border border-tactical-alert/30 bg-tactical-alert/10 p-3 text-sm text-tactical-alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Shared Fields */}
        <div className="rounded border border-tactical-border bg-tactical-card p-6">
          <h3 className="mb-4 font-tactical-display font-bold text-tactical-accent">
            Shared Fields
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-tactical-text-secondary">
                Unit Cost (USD)
              </label>
              <input
                type="number"
                value={form.unitCostUsd}
                onChange={(e) => updateField("unitCostUsd", e.target.value)}
                className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-tactical-text-secondary">
                Status
              </label>
              <select
                value={form.operationalStatus}
                onChange={(e) => updateField("operationalStatus", e.target.value)}
                className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Development">In Development</option>
                <option value="Retired">Retired</option>
                <option value="Maintenance">Under Maintenance</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-tactical-text-secondary">
                Image URL
              </label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => updateField("imageUrl", e.target.value)}
                className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-tactical-text-secondary">
                Category ID
              </label>
              <input
                type="text"
                value={form.categoryId}
                onChange={(e) => updateField("categoryId", e.target.value)}
                className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
                placeholder="UUID"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-tactical-text-secondary">
                Manufacturer ID
              </label>
              <input
                type="text"
                value={form.manufacturerId}
                onChange={(e) => updateField("manufacturerId", e.target.value)}
                className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
                placeholder="UUID"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-tactical-text-secondary">
                Country ID
              </label>
              <input
                type="text"
                value={form.countryId}
                onChange={(e) => updateField("countryId", e.target.value)}
                className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
                placeholder="UUID"
              />
            </div>
          </div>
        </div>

        {/* Language Fields */}
        <div className="rounded border border-tactical-border bg-tactical-card p-6">
          <h3 className="mb-4 font-tactical-display font-bold text-tactical-accent">
            Language Fields
          </h3>

          <div className="mb-6">
            <h4 className="mb-3 text-sm font-bold text-tactical-text">English</h4>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm text-tactical-text-secondary">Name</label>
                <input
                  type="text"
                  value={form.nameEn}
                  onChange={(e) => updateField("nameEn", e.target.value)}
                  className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-tactical-text-secondary">Description</label>
                <textarea
                  value={form.descriptionEn}
                  onChange={(e) => updateField("descriptionEn", e.target.value)}
                  className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-tactical-text">العربية</h4>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm text-tactical-text-secondary">Name</label>
                <input
                  type="text"
                  value={form.nameAr}
                  onChange={(e) => updateField("nameAr", e.target.value)}
                  dir="rtl"
                  className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-tactical-text-secondary">Description</label>
                <textarea
                  value={form.descriptionAr}
                  onChange={(e) => updateField("descriptionAr", e.target.value)}
                  dir="rtl"
                  className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded border border-tactical-border px-4 py-2 text-tactical-text-secondary transition-colors hover:text-tactical-text"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-tactical-accent px-6 py-2 font-tactical-display font-bold text-tactical-bg transition-all hover:bg-tactical-accent/90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Platform"}
          </button>
        </div>
      </form>
    </div>
  );
}
