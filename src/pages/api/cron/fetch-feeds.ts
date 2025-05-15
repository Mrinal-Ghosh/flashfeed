import type { NextApiRequest, NextApiResponse } from "next";
import { fetchRSSFeed } from "../../../lib/rss";
import { fetchTopHeadlines } from "../../../lib/newsapi";
import {
  upsertRSSArticles,
  upsertNewsAPIArticles,
  deleteArticles,
} from "../../../services/article.service";

const RSS_URLS = [
  "http://rss.cnn.com/rss/edition.rss",
  //TODO: add more feeds here
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.key !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Fetch & upsert RSS
    for (const url of RSS_URLS) {
      const items = await fetchRSSFeed(url);
      console.log(`Fetched ${items.length} RSS items from ${url}`);
      items.slice(0, 3).forEach((item, index) => {
        console.log(`[RSS] Item ${index + 1}: ${item.title}, published at: ${item.isoDate}`);
      });
      await upsertRSSArticles(items);
    }

    // Fetch & upsert NewsAPI
    const newsItems = await fetchTopHeadlines({ country: "us", pageSize: 50 });
    console.log(`Fetched ${newsItems.length} NewsAPI articles`);
    newsItems.slice(0, 3).forEach((item, index) => {
      console.log(`[NewsAPI] Item ${index + 1}: ${item.title}, published at: ${item.publishedAt}`);
    });
    await upsertNewsAPIArticles(newsItems);

    // Purge articles with TTL 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    await deleteArticles(sevenDaysAgo);

    return res.status(200).json({ success: true, timestamp: new Date() });
  } catch (error) {
    console.error("Fetch-Feeds Error:", error);
    return res.status(500).json({ error: "Fetch failed" });
  }
}
