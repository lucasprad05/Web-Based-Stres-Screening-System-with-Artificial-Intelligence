import { createContext, useContext, useEffect, useState } from "react"
import { getToken, setToken, clearToken } from "../utils/storage"
import { me } from "../services/auth"

// Define o tipo do usuário
type User = { id: string; name: string; email: string }

// Define o tipo do contexto de autenticação
type AuthContextType = {
  user: User | null
  isLoggedIn: boolean
  loginWithToken: (token: string) => Promise<void>
  logout: () => void
}

// Cria o contexto com valores padrão
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  loginWithToken: async () => {},
  logout: () => {},
})

// Componente provedor de autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Ao montar o componente, tenta restaurar sessão a partir do token armazenado
  useEffect(() => {
    const t = getToken()
    if (!t) return
    me().then(setUser).catch(() => clearToken()) // se o token for inválido, limpa
  }, [])

  // Realiza login usando um token existente
  async function loginWithToken(token: string) {
    setToken(token)
    const u = await me().catch(() => {
      clearToken() // limpa token inválido
      return null
    })
    setUser(u)
  }

  // Logout: limpa token e usuário
  function logout() {
    clearToken()
    setUser(null)
  }

  // Fornece valores e funções de autenticação para toda a árvore de componentes
  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para acessar o contexto de autenticação
export const useAuth = () => useContext(AuthContext)
