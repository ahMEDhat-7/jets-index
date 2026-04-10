export interface ContentSection {
  type: "heading" | "paragraph" | "list" | "break";
  content: string;
  items?: string[];
}

function breakOnPeriods(text: string): string[] {
  const parts: string[] = [];
  let current = "";
  
  for (const char of text) {
    current += char;
    if (char === "." && current.length > 10) {
      parts.push(current.trim());
      current = "";
    }
  }
  if (current.trim()) {
    parts.push(current.trim());
  }
  
  return parts;
}

export function parseContent(content: string): ContentSection[] {
  let processed = content
    .replace(/\\n/g, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
    .replace(/<[^>]+>/g, "")
    .trim();

  const sections: ContentSection[] = [];
  const lines = processed.split("\n");
  let currentParagraph = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const nextLine = lines[i + 1]?.trim();

    if (line === "") {
      if (currentParagraph) {
        const parts = breakOnPeriods(currentParagraph);
        parts.forEach((part, idx) => {
          sections.push({ type: "paragraph", content: part });
          if (idx < parts.length - 1) {
            sections.push({ type: "break", content: "" });
          }
        });
        currentParagraph = "";
      }
      continue;
    }

    if (line.match(/^[\.\-=_]{3,}$/) || line === ".") {
      if (currentParagraph) {
        const parts = breakOnPeriods(currentParagraph);
        parts.forEach((part, idx) => {
          sections.push({ type: "paragraph", content: part });
          if (idx < parts.length - 1) {
            sections.push({ type: "break", content: "" });
          }
        });
        currentParagraph = "";
      }
      sections.push({ type: "break", content: "" });
      continue;
    }

    if (line === line.toUpperCase() && line.length < 50 && line.length > 3) {
      if (currentParagraph) {
        const parts = breakOnPeriods(currentParagraph);
        parts.forEach((part, idx) => {
          sections.push({ type: "paragraph", content: part });
          if (idx < parts.length - 1) {
            sections.push({ type: "break", content: "" });
          }
        });
        currentParagraph = "";
      }
      sections.push({ type: "heading", content: line });
      continue;
    }

    if (line.endsWith(":") && line.length < 60 && !line.includes(".")) {
      if (currentParagraph) {
        const parts = breakOnPeriods(currentParagraph);
        parts.forEach((part, idx) => {
          sections.push({ type: "paragraph", content: part });
          if (idx < parts.length - 1) {
            sections.push({ type: "break", content: "" });
          }
        });
        currentParagraph = "";
      }
      sections.push({ type: "heading", content: line.replace(/:$/, "") });
      continue;
    }

    if (line.match(/^[-•*]\s+/) || (nextLine && nextLine.match(/^[-•*]\s+/))) {
      if (currentParagraph) {
        const parts = breakOnPeriods(currentParagraph);
        parts.forEach((part, idx) => {
          sections.push({ type: "paragraph", content: part });
          if (idx < parts.length - 1) {
            sections.push({ type: "break", content: "" });
          }
        });
        currentParagraph = "";
      }
      const items: string[] = [];
      let j = i;
      while (j < lines.length) {
        const bulletLine = lines[j].trim();
        if (bulletLine.match(/^[-•*]\s+/)) {
          items.push(bulletLine.replace(/^[-•*]\s+/, ""));
          j++;
        } else {
          break;
        }
      }
      if (items.length > 0) {
        sections.push({ type: "list", content: "", items });
        i = j - 1;
        continue;
      }
    }

    currentParagraph += (currentParagraph ? " " : "") + line;
  }

  if (currentParagraph) {
    const parts = breakOnPeriods(currentParagraph);
    parts.forEach((part, idx) => {
      sections.push({ type: "paragraph", content: part });
      if (idx < parts.length - 1) {
        sections.push({ type: "break", content: "" });
      }
    });
  }

  return sections;
}
