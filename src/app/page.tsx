export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { ArticleList } from "@/components/news/article-list";
import { prisma } from "@/lib/prisma";
import { ArticleGridSkeleton } from "@/components/news/article-grid-skeleton";

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 12; // Number of articles per page

  const skip = (currentPage - 1) * pageSize;

  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
    skip,
    take: pageSize,
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

  // Get the total count of articles for pagination
  const totalArticles = await prisma.article.count();
  const totalPages = Math.ceil(totalArticles / pageSize);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-6">Today&lsquo;s Top Stories</h2>
        <Suspense fallback={<ArticleGridSkeleton />}>
          <ArticleList
            initialArticles={articles}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Suspense>
      </section>
    </div>
  );
}
