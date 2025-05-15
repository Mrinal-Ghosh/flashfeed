import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export function usePreferences() {
  const { getToken } = useAuth();
  const [prefs, setPrefs] = useState<string[]>([]);

  async function fetchPrefs() {
    const token = await getToken({ template: "supabase" });
    const res = await fetch("/api/preferences", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPrefs(data.categories);
  }

  async function savePrefs(categories: string[]) {
    const token = await getToken();
    await fetch("/api/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ categories }),
    });
    setPrefs(categories);
  }

  useEffect(() => {
    fetchPrefs();
  }, []);

  return { prefs, savePrefs };
}
