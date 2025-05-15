export interface Article {
  id: string;
  title: string;
  content: string | null;
  urlToImage: string | null;
  url: string;
  source: string;
  publishedAt: Date;
  category: string;
  isSaved?: boolean;
}
