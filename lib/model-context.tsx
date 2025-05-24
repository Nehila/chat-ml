'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Model = string

interface CtxValue {
  model: Model
  setModel: (m: Model) => void
}

const DEFAULT_MODEL: Model = 'imdb_bert'

const ModelContext = createContext<CtxValue>({
  model: DEFAULT_MODEL,
  setModel: () => {},
})

export function useModel() {
  return useContext(ModelContext)
}

export function ModelProvider({ children }: { children: ReactNode }) {
  const [model, setModel] = useState<Model>(() => {
    if (typeof window === 'undefined') return DEFAULT_MODEL
    return localStorage.getItem('dashboard_model') || DEFAULT_MODEL
  })

  useEffect(() => {
    localStorage.setItem('dashboard_model', model)
  }, [model])

  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  )
}