import type { NextApiRequest, NextApiResponse } from "next";
import { ReadingHistoryService } from "../../../services/user.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userClerkId = req.headers["x-user-id"] as string;
  if (!userClerkId) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    const history = await ReadingHistoryService.list(userClerkId);
    return res.json(history);
  }

  if (req.method === "POST") {
    const { articleId } = req.body as { articleId: string };
    const rec = await ReadingHistoryService.record(userClerkId, articleId);
    return res.json(rec);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end();
}
