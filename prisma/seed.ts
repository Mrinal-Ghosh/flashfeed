import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1) Create some Tags
  const [techTag, politicsTag] = await Promise.all([
    prisma.tag.upsert({
      where: { name: "technology" },
      update: {},
      create: { name: "technology" },
    }),
    prisma.tag.upsert({
      where: { name: "politics" },
      update: {},
      create: { name: "politics" },
    }),
  ]);

  // 2) Create a sample User with Preferences
  const user = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice",
      preferences: {
        create: [{ topic: "technology" }, { topic: "politics" }],
      },
    },
  });

  // 3) Create a sample Article
  const article = await prisma.article.upsert({
    where: { url: "https://news.example.com/ai-breakthrough" },
    update: {},
    create: {
      externalId: "newsapi-12345",
      source: "NewsAPI",
      title: "AI Breakthrough in 2025",
      content: "Researchers have just...",
      url: "https://news.example.com/ai-breakthrough",
      urlToImage: "https://news.example.com/image.jpg",
      publishedAt: new Date("2025-05-01T10:00:00Z"),
      tags: {
        create: [{ tag: { connect: { id: techTag.id } } }],
      },
    },
  });

  // 4) Log a sample Interaction
  await prisma.interaction.create({
    data: {
      user: { connect: { id: user.id } },
      article: { connect: { id: article.id } },
      type: "CLICK",
      duration: 45,
    },
  });

  console.log("✅ Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
