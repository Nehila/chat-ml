import { ThumbsUp, ThumbsDown, Minus } from "lucide-react"

export function ChatMessage({ message }) {
  const isUser = message.sender === "user"

  // Get sentiment icon
  const getSentimentIcon = () => {
    if (!message.sentiment) return null

    switch (message.sentiment) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-green-500 ml-2" />
      case "negative":
        return <ThumbsDown className="h-4 w-4 text-red-500 ml-2" />
      case "neutral":
        return <Minus className="h-4 w-4 text-blue-500 ml-2" />
      default:
        return null
    }
  }

  return (
    <div className="mb-8">
      {isUser ? (
        <div className="flex justify-end mb-2 ">
          <div className="bg-gray-100 rounded-xl dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg max-w-[85%]">
            <p className="text-sm">{message.message}</p>
          </div>
        </div>
      ) : (
        <div>
          {message.thinking && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span className="flex items-center">
                Thought for {message.thinking} ms &nbsp; - &nbsp;<span className="font-bold">{parseFloat(message.score * 100).toFixed(2)}%</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            </div>
          )}
          <div className="text-gray-800 dark:text-gray-200">
            <div className="flex items-center">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.message}</p>
              {getSentimentIcon()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
