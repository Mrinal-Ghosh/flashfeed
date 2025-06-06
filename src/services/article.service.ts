import { PrismaClient } from "@prisma/client";
import { RSSItem, NewsAPIArticle } from "../types";
import { guessCategory } from "@/lib/tags";

const prisma = new PrismaClient();

function mapRSS(item: RSSItem) {
  const text = (item.title + " " + (item.content || item.description)).slice(
    0,
    1000
  );
  return {
    externalId: item.guid,
    source: "RSS",
    title: item.title,
    content: item.content,
    url: item.link,
    urlToImage: null,
    publishedAt: item.isoDate ? new Date(item.isoDate) : new Date(),
    category: guessCategory(text),
  };
}

function mapNewsAPI(item: NewsAPIArticle) {
  const text = (item.title + " " + (item.content || item.description)).slice(
    0,
    1000
  );
  return {
    externalId: item.url,
    source: item.source.name,
    title: item.title,
    content: item.content || item.description,
    url: item.url,
    urlToImage: item.urlToImage,
    publishedAt: new Date(item.publishedAt),
    category: guessCategory(text),
  };
}

export async function upsertRSSArticles(items: RSSItem[]) {
  for (const raw of items) {
    const data = mapRSS(raw);
    await prisma.article.upsert({
      where: { url: data.url },
      update: data,
      create: data,
    });
    console.log(`Upserting article: ${data.title}, published at ${data.publishedAt}`);
  }
}

export async function upsertNewsAPIArticles(items: NewsAPIArticle[]) {
  for (const raw of items) {
    const data = mapNewsAPI(raw);
    await prisma.article.upsert({
      where: { url: data.url },
      update: data,
      create: data,
    });
    console.log(`Upserting article: ${data.title}, published at ${data.publishedAt}`);
  }
}

export async function deleteArticles(time: Date) {
  await prisma.article.deleteMany({
    where: {
      publishedAt: { lt: time },
    },
  });
}