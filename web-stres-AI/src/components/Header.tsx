import { Link } from "react-router-dom"
import "../styles/header.css"

type HeaderProps = {
  isLoggedIn: boolean
}

export default function Header({ isLoggedIn }: HeaderProps) {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">StudStress AI</Link>
      </div>

      <nav>
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/Fazerteste">Faça seu teste!</Link></li>

          {isLoggedIn ? (
            <li><Link to="/Perfil">Meu perfil</Link></li>
          ) : (
            <li><Link to="/Login">Entrar / Cadastrar-se</Link></li>
          )}
        </ul>
      </nav>
    </header>
  )
}
