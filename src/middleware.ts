import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/api/preferences/:path*",
  "/api/saved-articles/:path*",
  "/api/history/:path*",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isProtectedRoute(req) && !userId) {
    await auth.protect(); // redirects anonymous users to /sign-in by default
  }

  const res = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });
  // If userId is defined, attach it; otherwise pass an empty string or omit
  if (userId) {
    res.headers.set("x-user-id", userId);
  }
  return res;
});

export const config = {
  matcher: [
    "/api/preferences/:path*",
    "/api/saved-articles/:path*",
    "/api/history/:path*",
  ],
};
