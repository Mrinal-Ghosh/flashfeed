import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Example: block access without a header
  const secret = req.nextUrl.searchParams.get("key");

  if (secret !== process.env.CRON_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}
