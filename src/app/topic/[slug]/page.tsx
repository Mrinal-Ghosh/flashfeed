import { ArticleGrid } from "@/components/news/article-grid"
import { notFound } from "next/navigation"

// Sample data - in a real app, this would come from your API
const TOPICS = [
  { name: "Technology", slug: "technology" },
  { name: "Business", slug: "business" },
  { name: "Science", slug: "science" },
  { name: "Health", slug: "health" },
  { name: "Sports", slug: "sports" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Politics", slug: "politics" },
  { name: "World", slug: "world" },
]

const SAMPLE_ARTICLES = [
  {
    id: "1",
    title: "New AI breakthrough could revolutionize healthcare",
    description:
      "Researchers have developed a new AI model that can predict disease progression with unprecedented accuracy, potentially transforming early diagnosis and treatment planning.",
    imageUrl: "https://picsum.photos/400/600",
    sourceUrl: "https://example.com/article1",
    sourceName: "Tech Today",
    publishedAt: "2025-05-01T09:00:00Z",
    category: "Technology",
  },
  {
    id: "2",
    title: "Global markets rally as inflation fears ease",
    description:
      "Stock markets worldwide saw significant gains as new economic data suggests inflation may be cooling, potentially allowing central banks to ease monetary policy.",
    imageUrl: "https://picsum.photos/400/600",
    sourceUrl: "https://example.com/article2",
    sourceName: "Financial Times",
    publishedAt: "2025-05-02T14:30:00Z",
    category: "Business",
  },
  // More articles...
]

interface TopicPageProps {
  params: {
    slug: string
  }
}

export default function TopicPage({ params }: TopicPageProps) {
  const topic = TOPICS.find((t) => t.slug === params.slug)

  if (!topic) {
    notFound()
  }

  // In a real app, you would filter articles by topic or fetch topic-specific articles
  const topicArticles = SAMPLE_ARTICLES.filter((article) => article.category.toLowerCase() === topic.name.toLowerCase())

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-6">{topic.name} News</h2>
        {topicArticles.length > 0 ? (
          <ArticleGrid articles={topicArticles} />
        ) : (
          <div className="text-center p-12 border rounded-lg">
            <p className="text-muted-foreground">No articles found for this topic.</p>
          </div>
        )}
      </section>
    </div>
  )
}
