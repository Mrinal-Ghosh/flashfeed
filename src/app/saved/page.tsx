"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ArticleGrid } from "@/components/news/article-grid";
import { Button } from "@/components/ui/button";
import { Bookmark, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { ArticleGridSkeleton } from "@/components/news/article-grid-skeleton";
import { Article } from "@/types";
import Link from "next/link";

interface SavedArticle {
  id: string;
  articleId: string;
  savedAt: string;
  article: Article;
}

export default function SavedArticlesPage() {
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is not signed in and auth has loaded
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  const fetchSavedArticles = async () => {
    if (!isSignedIn || !user) return;

    try {
      setIsRefreshing(true);
      const response = await fetch("/api/saved-articles", {
        headers: {
          "x-user-id": user.id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch saved articles");
      }

      const data = await response.json();
      setSavedArticles(data);
    } catch (error) {
      toast.error("Error", {
        description: "Failed to load saved articles",
      });
      console.error("Failed to fetch saved articles:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isSignedIn && user) {
      fetchSavedArticles();
    }
  }, [isSignedIn, user]);

  const handleSaveToggle = async (articleId: string, isSaved: boolean) => {
    if (!isSaved) {
      // Remove the article from the list if it was unsaved
      setSavedArticles(
        savedArticles.filter((item) => item.article.id !== articleId)
      );
    }
  };

  if (!isLoaded) {
    return <ArticleGridSkeleton />;
  }

  // Map saved articles to the format expected by ArticleGrid
  const articles = savedArticles.map((item) => ({
    ...item.article,
    isSaved: true,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Saved Articles</h1>
          <p className="text-muted-foreground mt-1">
            Articles you&apos;ve bookmarked for later
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchSavedArticles}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <ArticleGridSkeleton />
      ) : articles.length > 0 ? (
        <ArticleGrid articles={articles} onSaveToggle={handleSaveToggle} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
          <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No saved articles</h3>
          <p className="text-muted-foreground mt-1 mb-4 text-center max-w-md">
            Bookmark articles you want to read later by clicking the bookmark
            icon on any article card
          </p>
          <Button asChild>
            <Link href="/">Browse articles</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
