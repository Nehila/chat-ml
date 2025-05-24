"use client"
import { ModelSelector } from "@/components/model-selector"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"
import { useUsername } from "@/lib/username-context"

export function Header() {
  const { username } = useUsername()


  const getInitials = (name) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }
  return (
    <header className="flex h-12 items-center justify-between border-gray-200 px-4 bg-white dark:bg-[#101828]">
      <div className="flex items-center space-x-3">
        <ModelSelector />
      </div>

      <div className="flex items-center space-x-2">
        <ThemeToggle />
        {username && <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">{username}</span>}
        <Avatar className="h-8 w-8 bg-green-600 text-white">
          <AvatarFallback>{getInitials(username)}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
