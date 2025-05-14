import { prisma } from "@/lib/prisma";

export async function getRecommendedArticles(userId: string, limit = 20) {
  // Load explicit topics
  const prefs = await prisma.preference.findMany({
    where: { userId },
    select: { topic: true },
  });
  const topics = prefs.map((p) => p.topic);

  // Find articles tagged with those topics
  const explicit = await prisma.article.findMany({
    where: {
      tags: { some: { tag: { name: { in: topics } } } },
    },
    take: limit,
  });

  // Load user interactions to boost frequently-read tags
  const interactions = await prisma.interaction.findMany({
    where: { userId },
    include: { article: { include: { tags: { include: { tag: true } } } } },
  });

  // Count tag hits
  const tagCounts: Record<string, number> = {};
  for (const ix of interactions) {
    for (const at of ix.article.tags) {
      tagCounts[at.tag.name] = (tagCounts[at.tag.name] || 0) + 1;
    }
  }

  // Fetch more articles from top interaction tags
  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);

  const implicit = await prisma.article.findMany({
    where: {
      tags: { some: { tag: { name: { in: sortedTags } } } },
      // exclude ones already in `explicit`
      id: { notIn: explicit.map((a) => a.id) },
    },
    take: limit,
  });

  // Combine lists (explicit first, then implicit)
  return [...explicit, ...implicit].slice(0, limit);
}
