import type { NextApiRequest, NextApiResponse } from "next";
import { fetchRSSFeed } from "../../../lib/rss";
import { fetchTopHeadlines } from "../../../lib/newsapi";
import {
  upsertRSSArticles,
  upsertNewsAPIArticles,
} from "../../../services/article.service";

const RSS_URLS = [
  "http://rss.cnn.com/rss/edition.rss",
  // add more feeds here
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.key !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 1) Fetch & upsert RSS
    for (const url of RSS_URLS) {
      const items = await fetchRSSFeed(url);
      await upsertRSSArticles(items);
    }

    // 2) Fetch & upsert NewsAPI
    const newsItems = await fetchTopHeadlines({ country: "us", pageSize: 50 });
    await upsertNewsAPIArticles(newsItems);

    return res.status(200).json({ success: true, timestamp: new Date() });
  } catch (error) {
    console.error("Fetch-Feeds Error:", error);
    return res.status(500).json({ error: "Fetch failed" });
  }
}
