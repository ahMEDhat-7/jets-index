import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Military Platforms",
  description:
    "Browse our comprehensive collection of military aircraft, tanks, naval vessels, and defense platforms from around the world.",
  keywords: [
    "browse military aircraft",
    "fighter jets list",
    "military platforms database",
    "compare jets",
    "tanks catalog",
  ],
};

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
