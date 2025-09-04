import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function ensureUserExists(userClerkId: string) {
  // Try to get Clerk user info (name, email) to store locally if needed.
  let clerkUser;
  const clerk = await clerkClient();
  try {
    clerkUser = await clerk.users.getUser(userClerkId);
  } catch (err) {
    console.error("Failed to fetch Clerk user", err);
    // If clerk user can't be fetched, still allow DB upsert with minimal info.
    clerkUser = undefined;
  }

  return prisma.user.upsert({
    where: { clerkId: userClerkId },
    create: {
      clerkId: userClerkId,
      email: clerkUser?.primaryEmailAddress?.emailAddress ?? "",    //!Warning: empty string needs to be handled in edge case
      name: clerkUser?.firstName ? `${clerkUser.firstName} ${clerkUser.lastName ?? ""}`.trim() : undefined,
    },
    update: {
      // Optionally keep basic record in sync
      email: clerkUser?.primaryEmailAddress?.emailAddress ?? undefined,
      name: clerkUser?.firstName ? `${clerkUser.firstName} ${clerkUser.lastName ?? ""}`.trim() : undefined,
    },
  });
}

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
