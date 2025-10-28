// Importa componentes do React Router para navegação e rotas aninhadas
import { Navigate, Outlet } from "react-router-dom"

// Importa função para obter o token salvo localmente
import { getToken } from "../utils/storage"

// Componente que protege rotas, garantindo acesso apenas a usuários autenticados
export default function ProtectedRoute() {
  // Recupera o token do armazenamento local
  const token = getToken()

  // Se existir token (usuário logado), renderiza as rotas-filhas (<Outlet />)
  // Caso contrário, redireciona para a página de login
  return token ? <Outlet /> : <Navigate to="/login" replace />
}
