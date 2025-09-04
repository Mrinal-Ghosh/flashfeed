"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, Bookmark, BookmarkCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    content: string | null;
    urlToImage: string | null;
    url: string;
    source: string;
    publishedAt: Date;
    category: string;
  };
  isSaved?: boolean;
  onSaveToggle?: (articleId: string, isSaved: boolean) => void;
  onArticleClick?: (articleId: string) => void;
}

export function ArticleCard({
  article,
  isSaved = false,
  onSaveToggle,
  onArticleClick,
}: ArticleCardProps) {
  const [saved, setSaved] = useState(isSaved);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, user } = useUser();

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      toast.error("Authentication required", {
        description: "Please sign in to save articles",
      });
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);

      if (saved) {
        // Remove from saved
        await fetch("/api/saved-articles", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user?.id || "",
          },
          body: JSON.stringify({ articleId: article.id }),
        });

        toast("Article removed", {
          description: "Article removed from your saved list",
        });
      } else {
        // Add to saved
        await fetch("/api/saved-articles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user?.id || "",
          },
          body: JSON.stringify({ articleId: article.id }),
        });

        toast("Article saved", {
          description: "Article added to your saved list",
        });
      }

      setSaved(!saved);
      if (onSaveToggle) {
        onSaveToggle(article.id, !saved);
      }
    } catch (error) {
      toast.error("Failed to update saved articles", {
        description: "Error",
      });
      console.error("Failed to update saved articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleArticleClick = async () => {
    // Record reading history if user is signed in
    if (isSignedIn && user) {
      try {
        await fetch("/api/history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
          body: JSON.stringify({ articleId: article.id }),
        });
      } catch (error) {
        console.error("Failed to record reading history:", error);
      }
    }

    // Call the onArticleClick callback if provided
    if (onArticleClick) {
      onArticleClick(article.id);
    }
  };

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
      onClick={handleArticleClick}
    >
      <Card className="h-full overflow-hidden transition-all hover:shadow-md relative">
        {article.urlToImage ? (
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="object-cover transition-transform group-hover:scale-105 w-full h-full"
            />
            <div className="absolute top-2 right-2">
              <Badge
                variant="secondary"
                className="bg-background/80 backdrop-blur-sm"
              >
                {article.category}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm"
            >
              {article.category}
            </Badge>
          </div>
        )}

        <CardContent className="p-4">
          <h3 className="line-clamp-2 text-lg font-semibold mb-2 group-hover:text-primary">
            {article.title}
          </h3>
          <p className="line-clamp-3 text-sm text-muted-foreground mb-3">
            {article.content}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-4 pt-0 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>
              {formatDistanceToNow(new Date(article.publishedAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>{article.source}</span>
            <ExternalLink className="h-3 w-3" />
          </div>
        </CardFooter>
        <button
          className="absolute top-2 left-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
          onClick={handleSaveToggle}
          disabled={isLoading}
          aria-label={saved ? "Remove from saved" : "Save article"}
        >
          {saved ? (
            <BookmarkCheck className="h-4 w-4 text-primary" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </button>
      </Card>
    </a>
  );
}
