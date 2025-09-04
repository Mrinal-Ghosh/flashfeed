"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  sourceUrl: string;
  sourceName: string;
  publishedAt: string;
  category: string;
}

interface SavedArticle {
  id: string;
  articleId: string;
  savedAt: string;
  article: Article;
}

export function useSavedArticles() {
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [savedArticleIds, setSavedArticleIds] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(true);
  const { isSignedIn, user } = useUser();

  const fetchSavedArticles = useCallback(async () => {
    if (!isSignedIn || !user) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/saved-articles", {
        headers: {
          "x-user-id": user.id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch saved articles");
      }

      const data: SavedArticle[] = await response.json();
      setSavedArticles(data);

      // Create a set of saved article IDs for quick lookup
      const ids = new Set(data.map((item) => item.article.id));
      setSavedArticleIds(ids);
    } catch (error) {
      console.error("Error fetching saved articles:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    fetchSavedArticles();
  }, [fetchSavedArticles]);

  const saveArticle = async (articleId: string) => {
    if (!isSignedIn || !user) {
      toast.error("Authentication required", {
        description: "Please sign in to save articles",
      });
      return false;
    }

    try {
      const response = await fetch("/api/saved-articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({ articleId }),
      });

      if (!response.ok) {
        throw new Error("Failed to save article");
      }

      // Update local state
      const newSavedArticle = await response.json();
      setSavedArticles((prev) => [...prev, newSavedArticle]);
      setSavedArticleIds((prev) => new Set(prev).add(articleId));

      return true;
    } catch (error) {
      toast.error("Error", {
        description: "Failed to save article",
      });
      console.error("Failed to save article:", error);
      return false;
    }
  };

  const removeArticle = async (articleId: string) => {
    if (!isSignedIn || !user) return false;

    try {
      const response = await fetch("/api/saved-articles", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({ articleId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove article");
      }

      // Update local state
      setSavedArticles((prev) =>
        prev.filter((item) => item.article.id !== articleId)
      );
      setSavedArticleIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(articleId);
        return newSet;
      });

      return true;
    } catch (error) {
      toast.error("Error", {
        description: "Failed to remove article",
      });
      console.error("Failed to remove article:", error);
      return false;
    }
  };

  const toggleSaved = async (articleId: string) => {
    if (savedArticleIds.has(articleId)) {
      return await removeArticle(articleId);
    } else {
      return await saveArticle(articleId);
    }
  };

  const isArticleSaved = (articleId: string) => {
    return savedArticleIds.has(articleId);
  };

  return {
    savedArticles,
    isLoading,
    saveArticle,
    removeArticle,
    toggleSaved,
    isArticleSaved,
    refresh: fetchSavedArticles,
  };
}
