"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ArticleCard } from "@/components/news/article-card";
import { Button } from "@/components/ui/button";
import { History, RefreshCw, Clock } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { ArticleGridSkeleton } from "@/components/news/article-grid-skeleton";
import {
  format,
  isToday,
  isYesterday,
  isThisWeek,
  isThisMonth,
} from "date-fns";
import { Article } from "@/types";
import Link from "next/link";


interface ReadingHistoryItem {
  id: string;
  articleId: string;
  readAt: string;
  article: Article;
}

export default function ReadingHistoryPage() {
  const [historyItems, setHistoryItems] = useState<ReadingHistoryItem[]>([]);
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

  const fetchReadingHistory = async () => {
    if (!isSignedIn || !user) return;

    try {
      setIsRefreshing(true);
      const response = await fetch("/api/history", {
        headers: {
          "x-user-id": user.id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reading history");
      }

      const data = await response.json();
      setHistoryItems(data);
    } catch (error) {
      toast.error("Error", {
        description: "Failed to load reading history",
      });
      console.error("Failed to fetch reading history:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isSignedIn && user) {
      fetchReadingHistory();
    }
  }, [isSignedIn, user]);

  if (!isLoaded) {
    return <ArticleGridSkeleton />;
  }

  // Group history items by time period
  const groupedHistory = historyItems.reduce((groups, item) => {
    const readAt = new Date(item.readAt);
    let group = "Older";

    if (isToday(readAt)) {
      group = "Today";
    } else if (isYesterday(readAt)) {
      group = "Yesterday";
    } else if (isThisWeek(readAt)) {
      group = "This Week";
    } else if (isThisMonth(readAt)) {
      group = "This Month";
    }

    if (!groups[group]) {
      groups[group] = [];
    }

    groups[group].push(item);
    return groups;
  }, {} as Record<string, ReadingHistoryItem[]>);

  // Order of groups to display
  const groupOrder = ["Today", "Yesterday", "This Week", "This Month", "Older"];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reading History</h1>
          <p className="text-muted-foreground mt-1">
            Articles you&apos;ve recently read
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchReadingHistory}
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
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, groupIndex) => (
            <div key={groupIndex} className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <ArticleGridSkeleton />
            </div>
          ))}
        </div>
      ) : historyItems.length > 0 ? (
        <div className="space-y-12">
          {groupOrder.map((group) => {
            const items = groupedHistory[group];
            if (!items || items.length === 0) return null;

            return (
              <section key={group} className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <span>{group}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="relative">
                      <ArticleCard article={item.article} />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2 text-xs flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          Read {format(new Date(item.readAt), "MMM d, h:mm a")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
          <History className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No reading history</h3>
          <p className="text-muted-foreground mt-1 mb-4 text-center max-w-md">
            Your reading history will appear here after you read some articles
          </p>
          <Button asChild>
            <Link href="/">Browse articles</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
