"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { fetchBlog, updateBlog } from "@/lib/api";
import type { BlogDetail } from "@/lib/types";

export default function EditBlogPage(): React.ReactNode {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const token = useAuthStore((s) => s.token);
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"en" | "ar">("en");

  const [form, setForm] = useState({ titleEn: "", summaryEn: "", contentEn: "", titleAr: "", summaryAr: "", contentAr: "" });

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        const data = await fetchBlog(id, "en");
        setBlog(data);
        const en = data.translations.find((t) => t.locale === "en");
        const ar = data.translations.find((t) => t.locale === "ar");
        setForm({
          titleEn: en?.title ?? "", summaryEn: en?.summary ?? "", contentEn: en?.content ?? "",
          titleAr: ar?.title ?? "", summaryAr: ar?.summary ?? "", contentAr: ar?.content ?? "",
        });
      } catch (err) {
        setError("Failed to load blog");
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
      await updateBlog(id, {
        translations: [
          { locale: "en", title: form.titleEn, summary: form.summaryEn || undefined, content: form.contentEn },
          { locale: "ar", title: form.titleAr, summary: form.summaryAr || undefined, content: form.contentAr },
        ],
      }, token);
      router.push("/admin/blogs");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update blog");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="flex items-center justify-center py-20"><div className="font-tactical-display text-tactical-text-secondary">Loading...</div></div>;
  if (!blog) return <div className="py-20 text-center text-tactical-text-secondary">Blog not found</div>;

  const currentContent = activeTab === "en" ? form.contentEn : form.contentAr;

  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="mb-6 font-tactical-display text-2xl font-bold text-tactical-text">Edit Blog</h2>
      {error && <div className="mb-4 rounded border border-tactical-alert/30 bg-tactical-alert/10 p-3 text-sm text-tactical-alert">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-2">
          <button type="button" onClick={() => setActiveTab("en")} className={`rounded px-4 py-2 font-tactical-display text-sm font-bold transition-colors ${activeTab === "en" ? "bg-tactical-accent text-tactical-bg" : "border border-tactical-border text-tactical-text-secondary hover:text-tactical-text"}`}>English</button>
          <button type="button" onClick={() => setActiveTab("ar")} className={`rounded px-4 py-2 font-tactical-display text-sm font-bold transition-colors ${activeTab === "ar" ? "bg-tactical-accent text-tactical-bg" : "border border-tactical-border text-tactical-text-secondary hover:text-tactical-text"}`}>العربية</button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm text-tactical-text-secondary">Title</label>
              <input type="text" value={activeTab === "en" ? form.titleEn : form.titleAr} onChange={(e) => updateField(activeTab === "en" ? "titleEn" : "titleAr", e.target.value)} dir={activeTab === "ar" ? "rtl" : "ltr"} className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none" required />
            </div>
            <div>
              <label className="mb-1 block text-sm text-tactical-text-secondary">Summary</label>
              <textarea value={activeTab === "en" ? form.summaryEn : form.summaryAr} onChange={(e) => updateField(activeTab === "en" ? "summaryEn" : "summaryAr", e.target.value)} dir={activeTab === "ar" ? "rtl" : "ltr"} className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none" rows={2} />
            </div>
            <div>
              <label className="mb-1 block text-sm text-tactical-text-secondary">Content (Markdown)</label>
              <textarea value={currentContent} onChange={(e) => updateField(activeTab === "en" ? "contentEn" : "contentAr", e.target.value)} dir={activeTab === "ar" ? "rtl" : "ltr"} className="w-full rounded border border-tactical-border bg-tactical-bg px-3 py-2 font-mono text-sm text-tactical-text focus:border-tactical-accent focus:outline-none" rows={15} required />
            </div>
          </div>
          <div className="rounded border border-tactical-border bg-tactical-card p-4">
            <h3 className="mb-3 text-sm font-bold text-tactical-text-secondary">Preview</h3>
            <div className="whitespace-pre-wrap text-sm text-tactical-text">{currentContent || <span className="text-tactical-text-secondary">Start typing...</span>}</div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="rounded border border-tactical-border px-4 py-2 text-tactical-text-secondary hover:text-tactical-text">Cancel</button>
          <button type="submit" disabled={saving} className="rounded bg-tactical-accent px-6 py-2 font-tactical-display font-bold text-tactical-bg transition-all hover:bg-tactical-accent/90 disabled:opacity-50">{saving ? "Saving..." : "Update Blog"}</button>
        </div>
      </form>
    </div>
  );
}
