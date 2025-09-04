"use client";

import type React from "react";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import PreferencesChecklist from "../user/PreferencesChecklist";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [showPreferences, setShowPreferences] = useState(false);

  //pref cache
  const [prefLoading, setPrefLoading] = useState(false);
  const [prefLoaded, setPrefLoaded] = useState(false);
  const [prefCategories, setPrefCategories] = useState<string[] | undefined>(
    undefined
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const openPreferences = async () => {
    // Toggle the panel open/close
    const opening = !showPreferences;
    setShowPreferences(opening);

    // If opening and not loaded yet, fetch preferences once
    if (opening && !prefLoaded && !prefLoading) {
      setPrefLoading(true);
      try {
        const res = await fetch("/api/preferences", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store", // force fresh body (avoid 304)
        });

        if (!res.ok) {
          // server returned non-2xx — throw to show toast
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || `Status ${res.status}`);
        }

        const body = await res.json();
        const categories: string[] = body?.data?.categories ?? [];
        setPrefCategories(categories);
        setPrefLoaded(true);
      } catch (err) {
        console.error("Failed to load preferences:", err);
        toast.error("Failed to load preferences");
        // still leave menu open so user can interact
      } finally {
        setPrefLoading(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-2 mr-4 md:mr-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl hidden md:inline-block">
              FlashFeed
            </span>
            <span className="font-bold text-xl md:hidden">FF</span>
          </Link>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex-1 flex items-center max-w-md"
        >
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-8 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2">
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Menu</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/saved" className="cursor-pointer">
                      Saved Articles
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/history" className="cursor-pointer">
                      Reading History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(event: Event) => {
                      event.preventDefault();
                      openPreferences();
                    }}
                  >
                    <span>Preferences</span>
                    <span className="text-xs text-muted-foreground">
                      {showPreferences ? "Close" : "Open"}
                    </span>
                  </DropdownMenuItem>
                  {showPreferences && (
                    <>
                      <div className="px-3 py-2">
                        <PreferencesChecklist
                          initialCategories={prefCategories}
                          onSaved={(savedCategories) => {
                            setPrefCategories(savedCategories);
                            setPrefLoaded(true);
                            setShowPreferences(false);
                          }}
                        />
                      </div>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
