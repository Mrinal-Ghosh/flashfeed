"use client";

import { useAuth } from "@clerk/nextjs";

export default function ProfilePage() {
  const { userId } = useAuth();

  if (!userId) return <div>Please sign in</div>;

  return <div>Welcome, user {userId}!</div>;
}
