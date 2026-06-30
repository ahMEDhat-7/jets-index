"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { fetchBlogs, deleteBlog } from "@/lib/api";
import type { BlogListItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminBlogsPage(): React.ReactNode {
  const [blogs, setBlogs] = useState<BlogListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    void loadBlogs();
  }, []);

  async function loadBlogs(): Promise<void> {
    try {
      const result = await fetchBlogs({ locale: "en", limit: "50" });
      setBlogs(Array.isArray(result) ? result : result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string): Promise<void> {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    if (!token) return;
    try {
      await deleteBlog(id, token);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="font-tactical-display text-tactical-text-secondary">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-tactical-display text-2xl font-bold text-tactical-text">Blogs</h2>
        <Link
          href="/admin/blogs/new"
          className="rounded bg-tactical-accent px-4 py-2 font-tactical-display font-bold text-tactical-bg transition-all hover:bg-tactical-accent/90"
        >
          + Create Blog
        </Link>
      </div>

      <div className="rounded border border-tactical-border bg-tactical-card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-tactical-border">
              <th className="px-4 py-3 text-tactical-text-secondary">Title</th>
              <th className="px-4 py-3 text-tactical-text-secondary">Published</th>
              <th className="px-4 py-3 text-right text-tactical-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => {
              const en = blog.translations.find((t) => t.locale === "en") ?? blog.translations[0];
              return (
                <tr key={blog.id} className="border-b border-tactical-border last:border-0 hover:bg-tactical-bg-secondary/50">
                  <td className="px-4 py-3 font-bold text-tactical-text">{en?.title ?? "Untitled"}</td>
                  <td className="px-4 py-3 text-tactical-text-secondary">{formatDate(blog.publishedAt, "en")}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/blogs/${blog.id}`} className="rounded px-2 py-1 text-xs text-tactical-accent hover:bg-tactical-accent/10">Edit</Link>
                      <button onClick={() => void handleDelete(blog.id)} className="rounded px-2 py-1 text-xs text-tactical-alert hover:bg-tactical-alert/10">Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {blogs.length === 0 && <div className="py-12 text-center text-tactical-text-secondary">No blog posts</div>}
      </div>
    </div>
  );
}
