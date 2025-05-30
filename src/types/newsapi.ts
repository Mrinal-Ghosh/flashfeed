export interface NewsAPIArticle {
  source: { id: string | null; name: string };
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string; // ISO timestamp
  content?: string;
}
