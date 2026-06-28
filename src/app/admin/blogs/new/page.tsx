"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { createBlog } from "@/lib/api";

export default function NewBlogPage(): React.ReactNode {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

  const [form, setForm] = useState({
    titleEn: "",
    summaryEn: "",
    contentEn: "",
    titleAr: "",
    summaryAr: "",
    contentAr: "",
  });

  function updateField(field: string, value: string): void {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError("");

    try {
      await createBlog(
        {
          translations: [
            { locale: "en", title: form.titleEn, summary: form.summaryEn || undefined, content: form.contentEn },
            { locale: "ar", title: form.titleAr, summary: form.summaryAr || undefined, content: form.contentAr },
          ],
        },
        token
      );
      router.push("/admin/blogs");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create blog");
    } finally {
      setSaving(false);
    }
  }

  const currentContent = activeTab === "en" ? form.contentEn : form.contentAr;
  const currentTitle = activeTab === "en" ? form.titleEn : form.titleAr;

  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="mb-6 font-tactical-display text-2xl font-bold text-tactical-text">Create Blog</h2>

      {error && (
        <div className="mb-4 rounded border border-tactical-alert/30 bg-tactical-alert/10 p-3 text-sm text-tactical-alert">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-2">
          <button type="button" onClick={() => setActiveTab("en")} className={`rounded px-4 py-2 font-tactical-display text-sm font-bold transition-colors ${activeTab === "en" ? "bg-tactical-accent text-tactical-bg" : "border border-tactical-border text-tactical-text-secondary hover:text-tactical-text"}`}>English</button>
          <button type="button" onClick={() => setActiveTab("ar")} className={`rounded px-4 py-2 font-tactical-display text-sm font-bold transition-colors ${activeTab === "ar" ? "bg-tactical-accent text-tactical-bg" : "border border-tactical-border text-tactical-text-secondary hover:text-tactical-text"}`}>العربية</button>
        </div>

        {/* Editor + Preview */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm text-tactical-text-secondary">Title</label>
              <input
                type="text"
                value={activeTab === "en" ? form.titleEn : form.titleAr}
                onChange={(e) => updateField(activeTab === "en" ? "titleEn" : "titleAr", e.target.value)}
                dir={activeTab === "ar" ? "rtl" : "ltr"}
                className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-tactical-text-secondary">Summary</label>
              <textarea
                value={activeTab === "en" ? form.summaryEn : form.summaryAr}
                onChange={(e) => updateField(activeTab === "en" ? "summaryEn" : "summaryAr", e.target.value)}
                dir={activeTab === "ar" ? "rtl" : "ltr"}
                className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
                rows={2}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-tactical-text-secondary">Content (Markdown)</label>
              <textarea
                value={currentContent}
                onChange={(e) => updateField(activeTab === "en" ? "contentEn" : "contentAr", e.target.value)}
                dir={activeTab === "ar" ? "rtl" : "ltr"}
                className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 font-mono text-sm text-tactical-text focus:border-tactical-accent focus:outline-none"
                rows={15}
                required
              />
            </div>
          </div>
          <div className="rounded border border-tactical-border bg-tactical-card p-4">
            <h3 className="mb-3 text-sm font-bold text-tactical-text-secondary">Preview</h3>
            <div className="prose prose-invert max-w-none text-sm text-tactical-text">
              {currentContent ? (
                <pre className="whitespace-pre-wrap">{currentContent}</pre>
              ) : (
                <span className="text-tactical-text-secondary">Start typing to see preview...</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="rounded border border-tactical-border px-4 py-2 text-tactical-text-secondary hover:text-tactical-text">Cancel</button>
          <button type="submit" disabled={saving} className="rounded bg-tactical-accent px-6 py-2 font-tactical-display font-bold text-tactical-bg transition-all hover:bg-tactical-accent/90 disabled:opacity-50">
            {saving ? "Saving..." : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
