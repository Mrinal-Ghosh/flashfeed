import { ArticleGrid } from "@/components/news/article-grid";
import { prisma } from "@/lib/prisma";

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const rawQuery = searchParams.q;
  const query = typeof rawQuery === "string" ? rawQuery.trim() : "";

  const articles = query
    ? await prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: {
          publishedAt: "desc",
        },
        take: 24,
      })
    : [];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-2">Search Results</h2>
        <p className="text-muted-foreground mb-6">
          {query
            ? `Showing results for "${query}"`
            : "Enter a search term to find articles"}
        </p>

        {query && articles.length === 0 ? (
          <div className="text-center p-12 border rounded-lg">
            <p className="text-muted-foreground">
              No articles found matching your search.
            </p>
          </div>
        ) : query ? (
          <ArticleGrid articles={articles} />
        ) : null}
      </section>
    </div>
  );
}
