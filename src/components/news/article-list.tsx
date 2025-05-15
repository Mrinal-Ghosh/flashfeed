"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { ArticleGrid } from "@/components/news/article-grid";
import { useSavedArticles } from "@/hooks/use-saved-articles";
import { Article } from "@/types";
import { PaginationControls } from "@/components/news/pagination-controls";

// Define the article type based on your database schema

// Props for the component
interface ArticleListProps {
  initialArticles: Article[];
  currentPage: number;
  totalPages: number;
}

export function ArticleList({
  initialArticles,
  currentPage,
  totalPages,
}: ArticleListProps) {
  // Transform database articles to match the format expected by ArticleGrid
  const transformArticles = (articles: Article[], savedIds: Set<string>) => {
    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      content: article.content,
      urlToImage: article.urlToImage || "/placeholder.svg?height=400&width=600",
      url: article.url,
      source: article.source,
      publishedAt: article.publishedAt,
      category: article.category,
      isSaved: savedIds.has(article.id),
    }));
  };

  const [articles, setArticles] = useState(() =>
    transformArticles(initialArticles, new Set())
  );
  const [isChangingPage, setIsChangingPage] = useState(false);

  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const {
    isArticleSaved,
    toggleSaved,
    isLoading: isSavedLoading,
  } = useSavedArticles();

  // Update articles with saved status once auth is loaded
  useEffect(() => {
    if (isLoaded && !isSavedLoading) {
      setArticles(
        transformArticles(
          initialArticles,
          new Set(
            initialArticles.filter((a) => isArticleSaved(a.id)).map((a) => a.id)
          )
        )
      );
    }
  }, [isLoaded, isSavedLoading, initialArticles, isArticleSaved]);

  const handleSaveToggle = async (articleId: string, isSaved: boolean) => {
    if (!isSignedIn) {
      router.push("/login");
      return;
    }

    // Update UI optimistically
    setArticles(
      articles.map((article) =>
        article.id === articleId ? { ...article, isSaved } : article
      )
    );

    // Call the API
    await toggleSaved(articleId);
  };

  const handleArticleClick = async (articleId: string) => {
    // The reading history is recorded in the ArticleCard component
    console.log(`Article clicked: ${articleId}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;

    setIsChangingPage(true);

    // Update the URL with the new page number
    const params = new URLSearchParams();
    if (newPage > 1) {
      params.set("page", newPage.toString());
    }

    // Navigate to the new page
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isChangingPage}
      />

      <ArticleGrid
        articles={articles}
        onSaveToggle={handleSaveToggle}
        onArticleClick={handleArticleClick}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isChangingPage}
      />
    </div>
  );
}
