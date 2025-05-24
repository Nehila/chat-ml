import { Noto_Sans } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { ModelProvider } from "@/lib/model-context"
import { UsernameProvider } from "@/lib/username-context"

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
})

export const metadata = {
  title: "Sentiment Analysis Dashboard",
  description: "A sentiment analysis dashboard for reviews",
  generator: "v0.dev",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={notoSans.className}>
        <ThemeProvider>
          <ModelProvider>
            <UsernameProvider>
              <div className="flex h-screen flex-col bg-white dark:bg-gray-900">
                <Header />
                <main className="flex-1 overflow-hidden">{children}</main>
              </div>
            </UsernameProvider>
          </ModelProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
