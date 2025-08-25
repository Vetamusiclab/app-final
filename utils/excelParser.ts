// Заглушка: в реальном проекте используйте xlsx
export async function parseExcel(file: File): Promise<{ name: string; email?: string }[]> {
  const text = await file.text();
  return text.split(/\n|\r/).filter(Boolean).map((line) => ({ name: line.trim() }));
}
