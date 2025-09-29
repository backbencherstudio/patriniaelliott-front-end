  export function TextLimit(text: string, maxLength: number): string {
    if (!text) return "";
    return text.length > maxLength
      ? text.slice(0, maxLength).trim() + "..."
      : text;
  }