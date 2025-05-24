'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type username = string

interface CtxValue {
  username: username
  setUsername: (m: username) => void
}

const DEFAULT_USERNAME = ''

const UsernameContext = createContext<CtxValue>({
  username: DEFAULT_USERNAME,
  setUsername: () => {},
})

export function useUsername() {
  return useContext(UsernameContext)
}

export function UsernameProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<username>(() => {
    if (typeof window === 'undefined') return DEFAULT_USERNAME
    return localStorage.getItem('userName') || DEFAULT_USERNAME
  })

  useEffect(() => {
    localStorage.setItem('userName', username)
  }, [username])

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  )
}