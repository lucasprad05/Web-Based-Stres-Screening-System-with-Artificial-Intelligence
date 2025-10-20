import { createContext, useContext, useEffect, useState } from "react"
import { getToken, setToken, clearToken } from "../utils/storage"
import { me } from "../services/auth"

type User = { id: string; name: string; email: string }
type AuthContextType = {
  user: User | null
  isLoggedIn: boolean
  loginWithToken: (token: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  loginWithToken: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // ao recarregar, tenta restaurar sessão
  useEffect(() => {
    const t = getToken()
    if (!t) return
    me().then(setUser).catch(() => clearToken())
  }, [])

  async function loginWithToken(token: string) {
    setToken(token)
    const u = await me().catch(() => {
      clearToken()
      return null
    })
    setUser(u)
  }

  function logout() {
    clearToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
