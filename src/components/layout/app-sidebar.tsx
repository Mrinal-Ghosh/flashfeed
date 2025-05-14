"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, TrendingUp, Globe, Bookmark, History, Settings, ChevronDown } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const TOPICS = [                                    //TODO: Use constant single source of truth for this, same referenced in TopicPage
  { name: "Technology", slug: "technology" },
  { name: "Business", slug: "business" },
  { name: "Science", slug: "science" },
  { name: "Health", slug: "health" },
  { name: "Sports", slug: "sports" },
  { name: "Entertainment", slug: "entertainment" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [topicsOpen, setTopicsOpen] = useState(true)

  return (
      <Sidebar
        className="h-[calc(100vh-3.5rem)] mt-0 top-14"
        variant="sidebar"
        collapsible="icon"
      >
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/popular">
                  <TrendingUp className="h-5 w-5" />
                  <span>Popular</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/saved">
                  <Bookmark className="h-5 w-5" />
                  <span>Saved</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/history">
                  <History className="h-5 w-5" />
                  <span>History</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        <SidebarContent>
          <SidebarGroup>
            <Collapsible
              open={topicsOpen}
              onOpenChange={setTopicsOpen}
              className="w-full"
            >
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center justify-between">
                  <span>Topics</span>
                  <motion.div
                    animate={{ rotate: topicsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {TOPICS.map((topic) => (
                      <SidebarMenuItem key={topic.slug}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === `/topic/${topic.slug}`}
                        >
                          <Link href={`/topic/${topic.slug}`}>
                            <Globe className="h-4 w-4" />
                            <span>{topic.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        </SidebarContent>

        <div className="mt-auto p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/settings">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        <SidebarRail />
      </Sidebar>
  );
}
