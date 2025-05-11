"use client"
import { ModelSelector } from "@/components/model-selector"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="flex h-12 items-center justify-between border-gray-200 px-4 bg-white dark:bg-[#101828]">
      <div className="flex items-center space-x-3">
        <ModelSelector />
      </div>

      <div className="flex items-center space-x-2">
        <ThemeToggle />

        <Avatar className="h-8 w-8 bg-green-600 text-white">
          <AvatarFallback>EN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
