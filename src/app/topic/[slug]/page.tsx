import { ArticleGrid } from "@/components/news/article-grid";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// Sample data - in a real app, this would come from your API
const TOPICS = [
  { name: "Technology", slug: "technology" },
  { name: "Business", slug: "business" },
  { name: "Science", slug: "science" },
  { name: "Health", slug: "health" },
  { name: "Sports", slug: "sports" },
  { name: "Entertainment", slug: "entertainment" },
];

interface TopicPageProps {
  params: {
    slug: string;
  };
}


export default async function TopicPage({ params }: TopicPageProps) {
  const topic = TOPICS.find((t) => t.slug === params.slug);

  if (!topic) {
    notFound();
  }

  const articles = await prisma.article.findMany({
    where: {
      category: topic.slug,
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: 24, // Limit to 24 most recent articles
  });

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-6">{topic.name} News</h2>
        {articles.length > 0 ? (
          <ArticleGrid articles={articles} />
        ) : (
          <div className="text-center p-12 border rounded-lg">
            <p className="text-muted-foreground">
              No articles found for this topic.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
