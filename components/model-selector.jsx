"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, ChevronRight, FileText, Folder } from "lucide-react"
import { useModel } from "@/lib/model-context"

export function ModelSelector() {
  const { model, setModel } = useModel()
  const [selectedModel, setSelectedModel] = useState({
    id: "imdb",
    name: "Avis IMDB",
    description: "Avis de films provenant de la base IMDB.",
    icon: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png",
    selectedSubModel: 'imdb_bert'
  })

  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const dropdownRef = useRef(null)

  const modelCategories = [
    {
      id: "all_data",
      name: "Tous les avis",
      description: "Avis combinés de toutes les sources.",
      icon: "https://static.thenounproject.com/png/3496109-200.png",
      subModels: [
        { id: "all_data_bert"},
        { id: "all_data_logistic"},
        { id: "all_data_naive"},
      ],
    },
    {
      id: "amazon",
      name: "Avis Amazon",
      description: "Avis de produits provenant d'Amazon.",
      icon: "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png",
      subModels: [
        { id: "amazon_bert"},
        { id: "amazon_logistic"},
        { id: "amazon_naive"},
      ],
    },
    {
      id: "imdb",
      name: "Avis IMDB",
      description: "Avis de films provenant de la base IMDB.",
      icon: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png",
      subModels: [
        { id: "imdb_bert"},
        { id: "imdb_logistic"},
        { id: "imdb_naive"},
      ],
    },
    {
      id: "yelp",
      name: "Avis Yelp",
      description: "Avis de clients issus de Yelp.",
      icon: "https://cdn-icons-png.flaticon.com/512/168/168812.png",
      subModels: [
        { id: "yelp_bert"},
        { id: "yelp_logistic"},
        { id: "yelp_naive"}
      ],
    },
  ]

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setActiveCategory(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setActiveCategory(null)
    }
  }

  const handleSelectCategory = (category) => {
    setSelectedModel(category)
    setIsOpen(false)
    setActiveCategory(null)
  }

  const handleSelectSubModel = (categoryId, subModelId) => {
    const category = modelCategories.find((cat) => cat.id === categoryId)
    const subModel = category.subModels.find((model) => model.id === subModelId)
    setModel(subModel.id) 

    setSelectedModel({
      ...category,
      selectedSubModel: subModel.id,
    })

    setIsOpen(false)
    setActiveCategory(null)
  }

  const handleCategoryHover = (categoryId) => {
    setActiveCategory(categoryId)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img src={selectedModel.icon || "/placeholder.svg"} className="w-5 h-5" alt={selectedModel.name} />
        <span className="font-medium text-gray-700 dark:text-gray-200 text-lg">
          {selectedModel.name}
          {selectedModel.selectedSubModel && (
            <span className="text-xs ml-2 text-gray-500">({selectedModel.selectedSubModel})</span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-50 py-1 animate-in fade-in-50 zoom-in-95">
          {modelCategories.map((category) => (
            <div key={category.id} className="relative" onMouseEnter={() => handleCategoryHover(category.id)}>
              <button
                className="flex items-center w-full py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                onClick={() => handleSelectCategory(category)}
              >
                <Folder className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <img src={category.icon || "/placeholder.svg"} className="w-4 h-4" alt={category.name} />
                    <span className="font-medium text-gray-800 dark:text-gray-200">{category.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{category.description}</span>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 text-gray-500 dark:text-gray-400" />
                {selectedModel.id === category.id && !selectedModel.selectedSubModel && (
                  <Check className="absolute right-3 h-4 w-4 text-blue-500" />
                )}
              </button>

              {activeCategory === category.id && (
                <div className="absolute left-full top-0 w-72 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-50 py-1 ml-2">
                  {category.subModels.map((subModel) => (
                    <button
                      key={subModel.id}
                      className="flex items-center w-full py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                      onClick={() => handleSelectSubModel(category.id, subModel.id)}
                    >
                      <FileText className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{subModel.id}</span>
                      {selectedModel.id === category.id && selectedModel.selectedSubModel === subModel.id && (
                        <Check className="ml-auto h-4 w-4 text-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
