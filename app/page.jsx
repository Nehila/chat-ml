"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizontal } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { StatisticsPanel } from "@/components/statistics-panel"

export default function Home() {
  const [messages, setMessages] = useState([
    {
      sender: "user",
      message: "The product arrived faster than expected, and it works perfectly!",
    },
    {
      sender: "system",
      thinking: "3",
      message: "Positive",
      sentiment: "positive",
    },
    {
      sender: "user",
      message: "The instructions were unclear, but the customer service helped resolve my issue.",
    },
    {
      sender: "system",
      thinking: "4",
      message: "Neutral",
      sentiment: "neutral",
    },
    {
      sender: "user",
      message: "This was a complete waste of money. Broke after one use!",
    },
    {
      sender: "system",
      thinking: "2",
      message: "Negative",
      sentiment: "negative",
    },
    {
      sender: "user",
      message: "I expected a better quality for the price, but it's acceptable.",
    },
    {
      sender: "system",
      thinking: "3",
      message: "Neutral",
      sentiment: "neutral",
    },
    {
      sender: "user",
      message: "Absolutely fantastic! Exceeded my expectations in every way.",
    },
    {
      sender: "system",
      thinking: "2",
      message: "Positive",
      sentiment: "positive",
    },
  ])

  // Calculate statistics
  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
  })

  // Update stats when messages change
  useEffect(() => {
    const systemMessages = messages.filter((m) => m.sender === "system")
    setStats({
      total: systemMessages.length,
      positive: systemMessages.filter((m) => m.sentiment === "positive").length,
      neutral: systemMessages.filter((m) => m.sentiment === "neutral").length,
      negative: systemMessages.filter((m) => m.sentiment === "negative").length,
    })
  }, [messages])

  // Uncomment the line below to start with an empty conversation
  // const [messages, setMessages] = useState([])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { sender: "user", message: inputValue }])
      setInputValue("")
      setIsTyping(true)

      // Simulate AI response after a short delay
      setTimeout(() => {
        // Randomly determine sentiment
        const sentiments = ["positive", "neutral", "negative"]
        const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)]

        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            sender: "system",
            thinking: Math.floor(Math.random() * 5) + 1,
            message: randomSentiment.charAt(0).toUpperCase() + randomSentiment.slice(1),
            sentiment: randomSentiment,
          },
        ])
      }, 1500)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-full">
      {/* Left side - Chat */}
      <div className="w-1/4 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="max-w-2xl text-center">
              <h1 className="text-2xl font-medium mb-6 text-gray-900 dark:text-white">
                Qu'est-ce qui vous intéresse aujourd'hui ?
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-auto py-8 px-4">
            <div className="max-w-3xl mx-auto">
              {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))}

              {isTyping && (
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mt-4">
                  <div
                    className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="p-4 md:p-6 pb-8">
          <div className="mx-auto max-w-3xl">
            <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm rounded-2xl">
              <CardContent className="p-2 pt-3">
                <Textarea
                  placeholder="Poser une question"
                  className="min-h-0 outline-none resize-none border-0 bg-transparent p-2 text-gray-900 dark:text-white focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                />
              </CardContent>

              <CardFooter className="flex justify-between p-2 pt-0">
                <div></div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    className="rounded-full h-8 w-8 flex justify-center items-center bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                    onClick={handleSendMessage}
                    disabled={isTyping || !inputValue.trim()}
                  >
                    <SendHorizontal className="h-5 w-5" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>

          </div>
        </div>
      </div>

      {/* Right side - Statistics */}
      <div className="w-3/4 bg-gray-50 dark:bg-gray-900 overflow-auto">
        <StatisticsPanel stats={stats} />
      </div>
    </div>
  )
}
