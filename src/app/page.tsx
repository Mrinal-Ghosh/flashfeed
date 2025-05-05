import { ArticleGrid } from "@/components/news/article-grid"

// Sample data - in a real app, this would come from your API
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
  {
    id: "3",
    title: "Scientists discover potential new treatment for Alzheimer's",
    description:
      "A groundbreaking study has identified a compound that appears to slow or even reverse the progression of Alzheimer's disease in early trials.",
    imageUrl: "https://picsum.photos/400/600",
    sourceUrl: "https://example.com/article3",
    sourceName: "Science Daily",
    publishedAt: "2025-05-03T11:15:00Z",
    category: "Health",
  },
  {
    id: "4",
    title: "Climate summit ends with ambitious new targets",
    description:
      "World leaders have agreed to more aggressive emissions reduction goals following intense negotiations at the latest international climate conference.",
    imageUrl: "https://picsum.photos/400/600",
    sourceUrl: "https://example.com/article4",
    sourceName: "Environmental News",
    publishedAt: "2025-05-04T16:45:00Z",
    category: "World",
  },
  {
    id: "5",
    title: "Major tech company unveils revolutionary new smartphone",
    description:
      "The latest flagship device features groundbreaking battery technology and AI capabilities that could set new standards for the industry.",
    imageUrl: "https://picsum.photos/400/600",
    sourceUrl: "https://example.com/article5",
    sourceName: "Gadget Review",
    publishedAt: "2025-05-05T10:00:00Z",
    category: "Technology",
  },
  {
    id: "6",
    title: "Historic peace agreement signed in long-running conflict",
    description:
      "After decades of tension, opposing parties have reached a landmark peace deal that promises to bring stability to the region.",
    imageUrl: "https://picsum.photos/400/600",
    sourceUrl: "https://example.com/article6",
    sourceName: "World News",
    publishedAt: "2025-05-06T13:20:00Z",
    category: "Politics",
  },
  {
    id: "7",
    title: "Breakthrough in renewable energy storage announced",
    description:
      "Engineers have developed a new type of battery that could solve one of the biggest challenges in renewable energy adoption.",
    imageUrl: "https://picsum.photos/400/600",
    sourceUrl: "https://example.com/article7",
    sourceName: "Energy News",
    publishedAt: "2025-05-07T09:30:00Z",
    category: "Science",
  },
  {
    id: "8",
    title: "Underdog team wins championship in stunning upset",
    description:
      "In one of the biggest surprises in recent sports history, the underdog team overcame overwhelming odds to claim the championship title.",
    imageUrl: "https://picsum.photos/400/600",
    sourceUrl: "https://example.com/article8",
    sourceName: "Sports Center",
    publishedAt: "2025-05-08T22:15:00Z",
    category: "Sports",
  },
]

export default function Home() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-6">Today&lsquo;s Top Stories</h2>
        <ArticleGrid articles={SAMPLE_ARTICLES} />
      </section>
    </div>
  )
}
