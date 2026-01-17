// src/components/layout/TopBar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { Search, Plus } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { Sun, Moon, Laptop } from "lucide-react";

export function TopBar() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search pages..."
              className="w-full pl-9 bg-muted/40 h-9"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="gap-1 h-9">
            <Plus className="h-4 w-4" />
            New Page
          </Button>

          <UserButton afterSignOutUrl="/" />
          <ThemeSwitch
            modes={["light", "dark", "system"]}
            icons={[
              <Sun key="sun-icon" size={16} />,
              <Moon key="moon-icon" size={16} />,
              <Laptop key="laptop-icon" size={16} />,
            ]}
            showInactiveIcons="all"
          />
        </div>
      </div>
    </header>
  );
}
