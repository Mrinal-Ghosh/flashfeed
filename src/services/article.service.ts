import { PrismaClient } from "@prisma/client";
import { RSSItem, NewsAPIArticle } from "../types";
import { tagArticle } from "./tag.service";

const prisma = new PrismaClient();

function mapRSS(item: RSSItem) {
  return {
    externalId: item.guid,
    source: "RSS",
    title: item.title,
    content: item.content,
    url: item.link,
    urlToImage: null,
    publishedAt: item.isoDate ? new Date(item.isoDate) : new Date(),
  };
}

function mapNewsAPI(item: NewsAPIArticle) {
  return {
    externalId: item.url,
    source: item.source.name,
    title: item.title,
    content: item.content || item.description,
    url: item.url,
    urlToImage: item.urlToImage,
    publishedAt: new Date(item.publishedAt),
  };
}

export async function upsertRSSArticles(items: RSSItem[]) {
  for (const raw of items) {
    const data = mapRSS(raw);
    const article= await prisma.article.upsert({
      where: { url: data.url },
      update: data,
      create: data,
    });
    await tagArticle(article.id, article.title, article.content || "");
  }
}

export async function upsertNewsAPIArticles(items: NewsAPIArticle[]) {
  for (const raw of items) {
    const data = mapNewsAPI(raw);
    const article = await prisma.article.upsert({
      where: { url: data.url },
      update: data,
      create: data,
    });
    await tagArticle(article.id, article.title, article.content || "");
  }
}
