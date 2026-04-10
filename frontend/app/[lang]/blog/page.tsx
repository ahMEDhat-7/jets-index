"use client";

import { useEffect, useState } from "react";
import { Blog } from "@/stores/useDesignStore";
import { fetchBlogs } from "@/lib/api";
import { BlogCard, LoadingSpinner } from "@/components";
import { useTranslations } from "next-intl";
import { FileText } from "lucide-react";

export default function BlogPage() {
  const t = useTranslations("Blog");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        setIsLoading(true);
        const blogsData = await fetchBlogs();
        setBlogs(blogsData);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-slate-900 text-[#1f2937] dark:text-slate-100 font-[family-name:var(--font-body-hangar)] transition-colors">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display-hangar)] mb-3 sm:mb-4 dark:text-white">
            {t("title")}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">
              {t("empty.title")}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 max-w-4xl mx-auto">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
