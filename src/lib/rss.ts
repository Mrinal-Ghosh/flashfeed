  import Parser from "rss-parser";
  import { RSSItem } from "../types";

  const rssParser = new Parser<{},RSSItem>();

  export async function fetchRSSFeed(url: string): Promise<RSSItem[]> {
    const feed = await rssParser.parseURL(url);
    return feed.items.map((item) => ({
      guid: item.guid || item.link,
      title: item.title,
      content: item.content,
      link: item.link,
      isoDate: item.isoDate,
    }));
  }
