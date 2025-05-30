import { prisma } from "@/lib/prisma";

//* User queries
export const UserService = {
  async upsertUser(clerkUserId: string, email: string) {
    return prisma.user.upsert({
      where: { clerkId: clerkUserId },
      create: { clerkId: clerkUserId, email },
      update: { email },
    });
  },
};

//* Preferences queries
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

//* Saved article queries
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

//* Reading history queries
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
