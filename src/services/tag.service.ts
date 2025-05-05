import { PrismaClient } from "@prisma/client";
import { extractTags } from "../lib/tags";

const prisma = new PrismaClient();

export async function tagArticle(
  articleId: string,
  title: string,
  content?: string
) {
  const text = [title, content].filter(Boolean).join(" ");
  const tagNames = extractTags(text);

  for (const name of tagNames) {
    // Upsert the Tag itself
    const tag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    // Link it to the article (if not already linked)
    await prisma.articleTag.upsert({
      where: {
        articleId_tagId: {
          articleId,
          tagId: tag.id,
        },
      },
      update: {},
      create: {
        articleId,
        tagId: tag.id,
      },
    });
  }
}
