export function LocaleScript({ lang }: { lang: string }) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const fontFamily =
    lang === "ar"
      ? "var(--font-noto-sans-arabic), sans-serif"
      : "var(--font-ibm-plex-mono), monospace";

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          document.documentElement.setAttribute('lang', '${lang}');
          document.documentElement.setAttribute('dir', '${dir}');
          document.body.style.fontFamily = '${fontFamily}';
        `,
      }}
    />
  );
}
