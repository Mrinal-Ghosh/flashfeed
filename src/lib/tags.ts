export const AVAILABLE_TAGS = [
  "technology",
  "politics",
  "business",
  "sports",
  "entertainment",
  "health",
  "science",
  "world",
  // TODO: Add country codes
  "us",
  "uk",
  "india",
  "china",
  "germany",
  "france",
];

// Simple extractor: matches any tag keyword
export function extractTags(text: string): string[] {
  const lower = text.toLowerCase();
  return AVAILABLE_TAGS.filter((tag) => lower.includes(tag));
}
