import type { NextApiRequest, NextApiResponse } from "next";
import { SavedArticlesService } from "../../../services/user.service";
import { ensureUserExists } from "../../../services/user.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userClerkId = req.headers["x-user-id"] as string;
  if (!userClerkId) return res.status(401).json({ error: "Unauthorized" });

  await ensureUserExists(userClerkId);

  if (req.method === "GET") {
    const list = await SavedArticlesService.list(userClerkId);
    return res.json(list);
  }

  if (req.method === "POST") {
    const { articleId } = req.body as { articleId: string };
    const saved = await SavedArticlesService.save(userClerkId, articleId);
    return res.json(saved);
  }

  if (req.method === "DELETE") {
    const { articleId } = req.body as { articleId: string };
    await SavedArticlesService.remove(userClerkId, articleId);
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  res.status(405).end();
}
