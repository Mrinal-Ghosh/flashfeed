export const AVAILABLE_TAGS = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
  "politics",
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

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  business: ["economy", "market", "stocks", "finance", "trade"],
  entertainment: ["movie", "celebrity", "music", "TV", "film", "show"],
  health: ["health", "doctor", "disease", "vaccine", "wellness"],
  science: ["research", "space", "science", "study", "lab"],
  sports: ["game", "score", "team", "match", "league", "tournament"],
  technology: ["tech", "AI", "software", "hardware", "internet", "gadget"],
  general: [], // fallback
};

export function guessCategory(text: string): string {
  const lower = text.toLowerCase();
  let best = "general",
    maxHits = 0;
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const hits = keywords.reduce(
      (c, kw) => c + (lower.includes(kw) ? 1 : 0),
      0
    );
    if (hits > maxHits) {
      maxHits = hits;
      best = cat;
    }
  }
  return best;
}
