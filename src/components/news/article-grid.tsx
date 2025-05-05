import { ArticleCard } from "@/components/news/article-card"

interface Article {
  id: string
  title: string
  description: string
  imageUrl: string
  sourceUrl: string
  sourceName: string
  publishedAt: string
  category: string
}

interface ArticleGridProps {
  articles: Article[]
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
