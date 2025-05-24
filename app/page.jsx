"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizontal } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { StatisticsPanel } from "@/components/statistics-panel"
import { NamePopup } from "@/components/name-popup"
import { AppServices } from "@/services/AppServices"
import { useModel } from "@/lib/model-context"
import { useUsername } from "@/lib/username-context"


const sentimentFromResult = (r) => r.toLowerCase()

export default function Home() {
    const { setUsername } = useUsername()
    const { model } = useModel()
    const storageKey = `chat_history_${model}`

    const [messages, setMessages] = useState([])
    useEffect(() => {
        if (typeof window === "undefined") return
        try {
            const stored = localStorage.getItem(storageKey)
            setMessages(stored ? JSON.parse(stored) : [])
        } catch { setMessages([]) }
    }, [storageKey])

    const [stats, setStats] = useState({ total: 0, positive: 0, neutral: 0, negative: 0 })
    useEffect(() => {
        const sys = messages.filter((m) => m.sender === "system")
        setStats({
            total: sys.length,
            positive: sys.filter((m) => m.sentiment === "positive").length,
            neutral: sys.filter((m) => m.sentiment === "neutral").length,
            negative: sys.filter((m) => m.sentiment === "negative").length,
        })

        if (typeof window !== "undefined")
            localStorage.setItem(storageKey, JSON.stringify(messages))
    }, [messages, storageKey])

    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    const handleSendMessage = useCallback(async () => {
        const text = inputValue.trim()
        if (!text || isTyping) return

        setMessages((prev) => [...prev, { sender: "user", message: text }])
        setInputValue("")
        setIsTyping(true)

        try {
            const t0 = performance.now()
            const data = await AppServices.post({ model, text }, "/predict")
            const t1 = performance.now()
            const duration = Math.round(t1 - t0)
            setMessages((prev) => [
                ...prev,
                {
                    sender: "system",
                    thinking: duration,
                    message: data.result,
                    sentiment: sentimentFromResult(data.result),
                    score: data.score,
                },
            ])
        } catch (err) {
            console.error(err)
            setMessages((prev) => [
                ...prev,
                { sender: "system", message: "⚠️ backend error", sentiment: "neutral" },
            ])
        } finally {
            setIsTyping(false)
        }
    }, [inputValue, isTyping, model])

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleNameSaved = (name) => {
        setUsername(name)
    }

    return (
        <>
            <NamePopup onNameSaved={handleNameSaved} />
            <div className="flex h-full">
                <div className="w-1/4 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
                    <div className="flex-1 overflow-auto py-8 px-4">
                        <div className="max-w-3xl mx-auto">
                            {messages.map((msg, idx) => (
                                <ChatMessage key={idx} message={msg} />
                            ))}

                            {isTyping && (
                                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mt-4">
                                    {[0, 150, 300].map((d) => (
                                        <div
                                            key={d}
                                            className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: `${d}ms` }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 md:p-6 pb-8">
                        <div className="mx-auto max-w-3xl">
                            <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm rounded-2xl">
                                <CardContent className="p-2 pt-3">
                                    <Textarea
                                        placeholder="Type a message"
                                        className="min-h-0 outline-none resize-none border-0 bg-transparent p-2"
                                        rows={1}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        disabled={isTyping}
                                    />
                                </CardContent>
                                <CardFooter className="flex justify-end p-2 pt-0">
                                    <Button
                                        size="icon"
                                        onClick={handleSendMessage}
                                        disabled={isTyping || !inputValue.trim()}
                                        className="rounded-full h-8 w-8"
                                    >
                                        <SendHorizontal className="h-5 w-5" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="w-3/4 bg-gray-50 dark:bg-gray-900 overflow-auto">
                    <StatisticsPanel stats={stats} />
                </div>
            </div>
        </>
    )
}
