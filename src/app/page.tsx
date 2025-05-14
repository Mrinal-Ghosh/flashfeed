export const dynamic = "force-dynamic";

import { ArticleGrid } from "@/components/news/article-grid";
import { prisma } from "@/lib/prisma";

const articles = await prisma.article.findMany({      //TODO: Add pagination
  orderBy: { publishedAt: "desc" },
  take: 12,
  select: {
    id: true,
    title: true,
    content: true,
    urlToImage: true,
    url: true,
    source: true,
    publishedAt: true,
    category: true,
  },
});

export default function Home() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-6">Today&lsquo;s Top Stories</h2>
        <ArticleGrid articles={articles} />
      </section>
    </div>
  );
}
