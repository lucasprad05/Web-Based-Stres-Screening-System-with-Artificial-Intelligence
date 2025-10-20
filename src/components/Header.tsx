import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/header.css"

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">StudStress AI</Link>
      </div>

      <nav>
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/testPage">Faça seu teste!</Link></li>

          {isLoggedIn ? (
            <>
              <li><Link to="/perfil">Meu perfil</Link></li>
              <li><button onClick={handleLogout} className="logout-btn">Sair</button></li>
            </>
          ) : (
            <li><Link to="/login">Entrar / Cadastrar-se</Link></li>
          )}
        </ul>
      </nav>
    </header>
  ) 
}
