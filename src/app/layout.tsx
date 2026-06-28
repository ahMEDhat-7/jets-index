import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jetdex — Military Aviation Database",
  description:
    "A comprehensive index of the world's fighter jet manufacturers, aircraft programs, and military aviation systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return children;
}
