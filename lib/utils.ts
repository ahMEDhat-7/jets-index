import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount?: number): string {
  if (!amount) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num?: number): string {
  if (num === undefined || num === null) return "0";
  return new Intl.NumberFormat("en-US").format(num);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function getStatusColor(status?: string): string {
  if (!status) return "text-gray-400";
  const lower = status.toLowerCase();
  if (lower.includes("active") || lower.includes("operational")) {
    return "text-green-400";
  }
  if (lower.includes("inactive") || lower.includes("decommissioned")) {
    return "text-red-400";
  }
  if (lower.includes("maintenance") || lower.includes("upgrading")) {
    return "text-yellow-400";
  }
  return "text-gray-400";
}
