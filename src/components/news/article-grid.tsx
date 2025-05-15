import { ArticleCard } from "@/components/news/article-card";
import { Article } from "@/types";

interface ArticleGridProps {
  articles: Article[];
  onSaveToggle?: (articleId: string, isSaved: boolean) => void;
  onArticleClick?: (articleId: string) => void;
}

export function ArticleGrid({
  articles,
  onSaveToggle,
  onArticleClick,
}: ArticleGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          isSaved={article.isSaved}
          onSaveToggle={onSaveToggle}
          onArticleClick={onArticleClick}
        />
      ))}
    </div>
  );
}
