"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Minus } from "lucide-react"

export function StatisticsPanel({ stats }) {
  // Animation states
  const [animate, setAnimate] = useState(false)
  const [countValues, setCountValues] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
    total: 0,
  })

  // Calculate percentages
  const positivePercent = stats.total ? Math.round((stats.positive / stats.total) * 100) : 0
  const neutralPercent = stats.total ? Math.round((stats.neutral / stats.total) * 100) : 0
  const negativePercent = stats.total ? Math.round((stats.negative / stats.total) * 100) : 0

  // Trigger animations on mount
  useEffect(() => {
    // Delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Animate counting
  useEffect(() => {
    if (!animate) return

    let startTimestamp
    const duration = 1500 // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)

      setCountValues({
        positive: Math.floor(progress * stats.positive),
        neutral: Math.floor(progress * stats.neutral),
        negative: Math.floor(progress * stats.negative),
        total: Math.floor(progress * stats.total),
      })

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setCountValues(stats)
      }
    }

    window.requestAnimationFrame(step)
  }, [animate, stats])

  return (
    <div className="p-6 h-full pb-32 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Analyse des Sentiments</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card
          className={`bg-white dark:bg-gray-800 rounded-xl  transition-all duration-500 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "100ms" }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Positif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{countValues.positive}</div>
              <div className="ml-auto text-green-500 font-medium">{positivePercent}%</div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-white dark:bg-gray-800 rounded-xl  transition-all duration-500 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Neutre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Minus className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{countValues.neutral}</div>
              <div className="ml-auto text-blue-500 font-medium">{neutralPercent}%</div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-white dark:bg-gray-800 transition-all rounded-xl  duration-500 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "300ms" }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Négatif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ThumbsDown className="h-5 w-5 text-red-500 mr-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{countValues.negative}</div>
              <div className="ml-auto text-red-500 font-medium">{negativePercent}%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-row justify-center gap-4 items-center w-full">
        <Card
        className={`bg-white w-full h-full dark:bg-gray-800 rounded-xl mb-6 transition-all duration-500 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transitionDelay: "400ms" }}
      >
        <CardHeader>
          <CardTitle>Distribution des Sentiments</CardTitle>
          <CardDescription>Répartition des avis par sentiment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            {/* Animated bar chart */}
            <div className="flex items-end h-[250px] w-full gap-4 px-10">
              <div className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-green-500 rounded-t-xl transition-all duration-1000 ease-out"
                  style={{
                    height: animate ? `${Math.max(positivePercent * 2, 20)}px` : "0px",
                    maxHeight: "200px",
                  }}
                ></div>
                <div className="mt-2 text-sm font-medium">Positif</div>
                <div className="text-xs text-gray-500">{positivePercent}%</div>
              </div>

              <div className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t-xl transition-all duration-1000 ease-out"
                  style={{
                    height: animate ? `${Math.max(neutralPercent * 2, 20)}px` : "0px",
                    maxHeight: "200px",
                    transitionDelay: "200ms",
                  }}
                ></div>
                <div className="mt-2 text-sm font-medium">Neutre</div>
                <div className="text-xs text-gray-500">{neutralPercent}%</div>
              </div>

              <div className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-red-500 rounded-t-xl transition-all duration-1000 ease-out"
                  style={{
                    height: animate ? `${Math.max(negativePercent * 2, 20)}px` : "0px",
                    maxHeight: "200px",
                    transitionDelay: "400ms",
                  }}
                ></div>
                <div className="mt-2 text-sm font-medium">Négatif</div>
                <div className="text-xs text-gray-500">{negativePercent}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card
        className={`bg-white w-full h-full dark:bg-gray-800 mb-6 transition-all duration-500 rounded-xl  ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transitionDelay: "500ms" }}
      >
        <CardHeader>
          <CardTitle>Répartition des Sentiments</CardTitle>
          <CardDescription>Vue proportionnelle des sentiments</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="relative w-[200px] h-[200px]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Animated pie chart */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#22c55e"
                strokeWidth="20"
                strokeDasharray={`${positivePercent * 2.51} ${(100 - positivePercent) * 2.51}`}
                strokeDashoffset={animate ? "0" : "251"}
                className="transition-all duration-1000 ease-out"
                style={{ transitionDelay: "100ms" }}
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="20"
                strokeDasharray={`${neutralPercent * 2.51} ${(100 - neutralPercent) * 2.51}`}
                strokeDashoffset={animate ? `${-(positivePercent * 2.51)}` : "251"}
                className="transition-all duration-1000 ease-out"
                style={{ transitionDelay: "300ms" }}
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#ef4444"
                strokeWidth="20"
                strokeDasharray={`${negativePercent * 2.51} ${(100 - negativePercent) * 2.51}`}
                strokeDashoffset={animate ? `${-((positivePercent + neutralPercent) * 2.51)}` : "251"}
                className="transition-all duration-1000 ease-out"
                style={{ transitionDelay: "500ms" }}
              />
            </svg>
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${animate ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold">{countValues.total}</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      <br/>
    </div>
  )
}
