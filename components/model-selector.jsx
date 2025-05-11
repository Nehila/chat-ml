"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"

export function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState({
    id: "imdb",
    name: "Avis IMDB",
    description: "Avis de films provenant de la base IMDB.",
    icon: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png",
  })

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const models = [
    {
      id: "imdb",
      name: "Avis IMDB",
      description: "Avis de films provenant de la base IMDB.",
      icon: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png",
    },
    {
      id: "yelp",
      name: "Avis Yelp",
      description: "Avis de clients issus de Yelp.",
      icon: "https://cdn-icons-png.flaticon.com/512/168/168812.png",
    },
    {
      id: "amazom",
      name: "Avis Amazon",
      description: "Avis de produits provenant d'Amazon.",
      icon: "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png",
    },
    {
      id: "all",
      name: "Tous les avis",
      description: "Avis combinés de toutes les sources.",
      icon: "https://static.thenounproject.com/png/3496109-200.png",
    },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelectModel = (model) => {
    setSelectedModel(model)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img src={selectedModel.icon || "/placeholder.svg"} className="w-5 h-5" alt={selectedModel.name} />
        <span className="font-medium text-gray-700 dark:text-gray-200 text-lg">{selectedModel.name}</span>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-50 py-1 animate-in fade-in-50 zoom-in-95">
          {models.map((model) => (
            <button
              key={model.id}
              className="flex flex-col items-start w-full py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
              onClick={() => handleSelectModel(model)}
            >
              <div className="flex w-full items-center flex-row gap-3">
                <img src={model.icon || "/placeholder.svg"} className="w-5 h-5" alt={model.name} />
                <span className="font-medium text-gray-800 dark:text-gray-200">{model.name}</span>
                {selectedModel.id === model.id && <Check className="ml-auto h-4 w-4 text-blue-500" />}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{model.description}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
