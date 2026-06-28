"use client";

import ReactMarkdown from "react-markdown";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <article className="prose prose-invert prose-headings:font-tactical-display prose-headings:text-tactical-text prose-p:text-tactical-text-secondary prose-a:text-tactical-accent prose-strong:text-tactical-text max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
