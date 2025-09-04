import type { NextApiRequest, NextApiResponse } from "next";
import { PreferencesService } from "../../../services/user.service";
import { ensureUserExists } from "@/services/user.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userClerkId = req.headers["x-user-id"] as string;
  if (!userClerkId) return res.status(401).json({ error: "Unauthorized" });

  await ensureUserExists(userClerkId);

  if (req.method === "GET") {
    const prefs = await PreferencesService.get(userClerkId);
    return res.json(prefs ?? { categories: [] });
  }

  if (req.method === "POST") {
    const { categories } = req.body as { categories: string[] };
    const upserted = await PreferencesService.upsert(userClerkId, categories);
    return res.json(upserted);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end();
}
