import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/header.css"

// Componente de cabeçalho da aplicação
export default function Header() {
  const { isLoggedIn, logout } = useAuth() // pega estado de autenticação
  const navigate = useNavigate() // hook para navegação programática

  // Função chamada ao clicar em "Sair"
  const handleLogout = () => {
    logout() // limpa token e estado do usuário
    navigate("/login") // redireciona para página de login
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">StudStress AI</Link> {/* logo clicável */}
      </div>

      <nav>
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/testPage">Faça seu teste!</Link></li>

          {isLoggedIn ? (
            <>
              <li><Link to="/perfil">Meu perfil</Link></li> {/* link para área do usuário */}
              <li><button onClick={handleLogout} className="logout-btn">Sair</button></li> {/* botão de logout */}
            </>
          ) : (
            <li><Link to="/login">Entrar / Cadastrar-se</Link></li>
          )}
        </ul>
      </nav>
    </header>
  ) 
}
