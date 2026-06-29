"use client";

import { useEffect } from "react";

interface DirectionSetterProps {
  lang: string;
}

export function DirectionSetter({ lang }: DirectionSetterProps) {
  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    const fontFamily =
      lang === "ar"
        ? "var(--font-noto-sans-arabic), sans-serif"
        : "var(--font-ibm-plex-mono), monospace";

    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
    document.body.style.fontFamily = fontFamily;
  }, [lang]);

  return null;
}