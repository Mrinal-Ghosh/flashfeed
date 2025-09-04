export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { ArticleGrid } from "@/components/news/article-grid";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ index: string }>;
};

export default async function ForYouPage({ params }: Props) {
  const {index} = await params;
  const page = parseInt(index, 10);

  if (isNaN(page) || page < 1) {
    redirect("/for-you/1");
  }

  const take = 12;
  const skip = (page - 1) * take;

  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
    skip,
    take,
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

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-6">Articles Recommended For You</h2>
        <ArticleGrid articles={articles} />

        {/* Pagination Controls */}
        <div className="flex justify-between mt-6">
          {page > 1 ? (
            <a
              href={`/for-you/${page - 1}`}
              className="px-4 py-2 rounded"
            >
              ← Previous
            </a>
          ) : (
            <div />
          )}
          {articles.length === take && (
            <a
              href={`/for-you/${page + 1}`}
              className="px-4 py-2 rounded"
            >
              Next →
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
