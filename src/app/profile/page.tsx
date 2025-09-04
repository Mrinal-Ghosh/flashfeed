"use client";

import { useUser } from "@clerk/nextjs";


export default function ProfilePage() {
  const {user, isLoaded, isSignedIn} = useUser();
  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please sign in</div>;

  return <div>Welcome, {user.firstName}!</div>;
}
