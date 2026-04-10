"use client";

import { useState } from "react";
import { Blog } from "@/stores/useDesignStore";
import { Calendar, ArrowRight, ArrowDown } from "lucide-react";
import { parseContent, ContentSection } from "./content-parser";

interface BlogCardProps {
  blog: Blog;
}

function ContentRenderer({ content }: { content: string }) {
  const sections: ContentSection[] = parseContent(content);

  return (
    <div className="space-y-2 text-base leading-relaxed text-slate-700 dark:text-slate-300">
      {sections.map((section, idx) => {
        if (section.type === "heading") {
          return (
            <h2
              key={idx}
              className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-display-hangar)] text-slate-900 dark:text-white pt-4"
            >
              {section.content}
            </h2>
          );
        }
        if (section.type === "break") {
          return <div key={idx} />;
        }
        if (section.type === "list" && section.items) {
          return (
            <ul key={idx} className="list-disc list-inside space-y-2 ml-4">
              {section.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="text-slate-700 dark:text-slate-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={idx} className="text-slate-700 dark:text-slate-300">
            {section.content}
          </p>
        );
      })}
    </div>
  );
}

export function BlogCard({ blog }: BlogCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
          <time dateTime={blog.publishedAt}>
            {new Date(blog.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-display-hangar)] mb-2 sm:mb-3 dark:text-white">
          {blog.title}
        </h2>
        {blog.summary && (
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mb-4">
            {blog.summary}
          </p>
        )}

        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <ContentRenderer content={blog.content} />
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 text-[#f59e0b] font-medium text-sm sm:text-base hover:gap-3 transition-all mt-4"
        >
          {isExpanded ? (
            <>
              <ArrowDown className="w-4 h-4" />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <ArrowRight className="w-4 h-4" />
              <span>Read More</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
