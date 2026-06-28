import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number | null | undefined): string {
  if (num == null) return "—";
  return new Intl.NumberFormat("en-US").format(num);
}

export function formatDate(
  date: Date | string,
  locale: string = "en"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function getStatusColor(status: string | null): string {
  switch (status?.toLowerCase()) {
    case "active":
      return "text-tactical-success";
    case "retired":
      return "text-tactical-alert";
    case "development":
      return "text-tactical-accent";
    case "maintenance":
      return "text-yellow-500";
    default:
      return "text-tactical-text-secondary";
  }
}

export function getStatusDot(status: string | null): string {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-tactical-success";
    case "retired":
      return "bg-tactical-alert";
    case "development":
      return "bg-tactical-accent";
    case "maintenance":
      return "bg-yellow-500";
    default:
      return "bg-tactical-text-secondary";
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

export function getTranslation<T extends { locale: string }>(
  translations: T[],
  locale: string,
  fallback: string = ""
): string {
  const translation = translations.find((t) => t.locale === locale);
  if (!translation) {
    const fallbackTranslation = translations.find((t) => t.locale === "en");
    if (fallbackTranslation && "name" in fallbackTranslation) {
      return (fallbackTranslation.name as string) || fallback;
    }
    return fallback;
  }
  if ("name" in translation) {
    return (translation.name as string) || fallback;
  }
  return fallback;
}

export function getLocalizedField<T extends { locale: string }>(
  translations: T[],
  locale: string,
  field: keyof Omit<T, "locale">,
  fallback: string = ""
): string {
  const translation = translations.find((t) => t.locale === locale);
  if (!translation) {
    const fallbackTranslation = translations.find((t) => t.locale === "en");
    if (fallbackTranslation) {
      return (fallbackTranslation[field] as string) || fallback;
    }
    return fallback;
  }
  return (translation[field] as string) || fallback;
}
