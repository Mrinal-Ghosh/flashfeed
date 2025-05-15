import { prisma } from "@/lib/prisma";

export const PreferencesService = {
  async get(userClerkId: string) {
    return prisma.preference.findUnique({ where: { userClerkId } });
  },
  async upsert(userClerkId: string, categories: string[]) {
    return prisma.preference.upsert({
      where: { userClerkId },
      create: { userClerkId, categories },
      update: { categories },
    });
  },
};

export const SavedArticlesService = {
  async list(userClerkId: string) {
    return prisma.savedArticle.findMany({
      where: { userClerkId },
      include: { article: true },
    });
  },
  async save(userClerkId: string, articleId: string) {
    return prisma.savedArticle.create({
      data: { userClerkId, articleId },
    });
  },
  async remove(userClerkId: string, articleId: string) {
    return prisma.savedArticle.delete({
      where: { userClerkId_articleId: { userClerkId, articleId } },
    });
  },
};

export const ReadingHistoryService = {
  async record(userClerkId: string, articleId: string) {
    return prisma.readingHistory.create({
      data: { userClerkId, articleId },
    });
  },
  async list(userClerkId: string) {
    return prisma.readingHistory.findMany({
      where: { userClerkId },
      include: { article: true },
      orderBy: { readAt: "desc" },
    });
  },
};
