import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - News and Insights",
  description:
    "Stay updated with the latest news and insights on military aviation platforms.",
  keywords: [
    "military news",
    "aviation blog",
    "defense news",
    "jets index blog",
  ],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
