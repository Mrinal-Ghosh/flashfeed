import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

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
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={article.urlToImage || "/placeholder.svg?height=400&width=600"}         //TODO: Use real placeholder
            alt={article.title}
            className="object-cover transition-transform group-hover:scale-105"
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
      </Card>
    </a>
  );
}
