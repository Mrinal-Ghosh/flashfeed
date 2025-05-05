import { ArticleGrid } from "@/components/news/article-grid"

// Sample data - in a real app, this would come from your API
const SAMPLE_ARTICLES = [
  {
    id: "1",
    title: "New AI breakthrough could revolutionize healthcare",
    description:
      "Researchers have developed a new AI model that can predict disease progression with unprecedented accuracy, potentially transforming early diagnosis and treatment planning.",
    imageUrl: "/placeholder.svg?height=400&width=600",
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
    imageUrl: "/placeholder.svg?height=400&width=600",
    sourceUrl: "https://example.com/article2",
    sourceName: "Financial Times",
    publishedAt: "2025-05-02T14:30:00Z",
    category: "Business",
  },
  // More articles...
]

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  // In a real app, you would search articles based on the query
  const searchResults = query
    ? SAMPLE_ARTICLES.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.description.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-2">Search Results</h2>
        <p className="text-muted-foreground mb-6">
          {query ? `Showing results for "${query}"` : "Enter a search term to find articles"}
        </p>

        {query && searchResults.length === 0 ? (
          <div className="text-center p-12 border rounded-lg">
            <p className="text-muted-foreground">No articles found matching your search.</p>
          </div>
        ) : query ? (
          <ArticleGrid articles={searchResults} />
        ) : null}
      </section>
    </div>
  )
}
