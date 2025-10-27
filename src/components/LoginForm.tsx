import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/auth'
import { useAuth } from '../context/AuthContext'
import '../styles/login.css'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { loginWithToken } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const data = await login(email, password)     // { access_token, token_type }
      await loginWithToken(data.access_token)       // salva token + busca /users/me
      navigate('/')                                 // redireciona pós-login
    } catch (err: any) {
      // Mensagem de erro genérica para evitar vazamento de info, mas de forma humanizada
      const msg = 'Falha no login. Verifique suas credenciais e tente novamente.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const disabled = loading || !email || !password

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">Login</h2>

      {error && <p className="login-error">{error}</p>}

      <div className="login-field">
        <label htmlFor="email" className="login-label">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
          autoComplete="email"
        />
      </div>

      <div className="login-field">
        <label htmlFor="password" className="login-label">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
          autoComplete="current-password"
        />
      </div>

      <div className="login-actions">
        <Link to="/register" className="login-link">Cadastrar-me</Link>
      </div>

      <button type="submit" className="login-button" disabled={disabled}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
