"use client"

import type React from "react"

import { Navbar } from "@/components/layout/navbar"
import { SidebarNav } from "@/components/layout/sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1">
          <SidebarNav />
          <SidebarInset className="flex-1">
            <div className="flex items-center p-4 border-b">
              <SidebarTrigger />
              <h1 className="ml-4 text-xl font-semibold">FlashFeed</h1>
            </div>
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
