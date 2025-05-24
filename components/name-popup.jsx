"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NamePopup({ onNameSaved }) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const savedName = localStorage.getItem("userName")

    if (!savedName) {
      setIsOpen(true)
    } else {
      onNameSaved(savedName)
    }
  }, [onNameSaved])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name.trim().length < 2) {
      setError("Veuillez entrer un nom valide (2 caractères minimum)")
      return
    }

    localStorage.setItem("userName", name.trim())

    onNameSaved(name.trim())

    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Bienvenue !</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Avant de commencer, veillez saisir votre nom pour personnaliser votre expérience.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Votre nom
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Entrez votre nom"
                className="w-full rounded-xl"
                autoFocus
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-black rounded-xl dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                Continuer
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
