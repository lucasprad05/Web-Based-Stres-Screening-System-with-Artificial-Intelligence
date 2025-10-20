import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register, login } from '../services/auth'
import { useAuth } from '../context/AuthContext'
import '../styles/register.css'

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { loginWithToken } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setLoading(true)
    try {
      await register({ name, email, password })        // cria usuário
      const data = await login(email, password)        // pega token
      await loginWithToken(data.access_token)          // salva e carrega /users/me
      navigate('/')                                    // redireciona
    } catch (err: any) {
      const msg = err?.message || 'Falha ao cadastrar'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const disabled = loading || !name || !email || !password || !confirmPassword

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2 className="register-title">Criar conta</h2>

      {error && <p className="register-error">{error}</p>}

      {/* Nome */}
      <div className="register-field">
        <label htmlFor="name" className="register-label">Nome completo</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register-input"
          required
          autoComplete="name"
        />
      </div>

      {/* Email */}
      <div className="register-field">
        <label htmlFor="email" className="register-label">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
          required
          autoComplete="email"
        />
      </div>

      {/* Senha */}
      <div className="register-field">
        <label htmlFor="password" className="register-label">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
          required
          autoComplete="new-password"
        />
      </div>

      {/* Confirmar senha */}
      <div className="register-field">
        <label htmlFor="confirm-password" className="register-label">Confirmar senha</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-input"
          required
          autoComplete="new-password"
        />
      </div>

      <div className="register-actions">
        <Link to="/login" className="register-link">Já tenho uma conta</Link>
      </div>

      <button type="submit" className="register-button" disabled={disabled}>
        {loading ? 'Cadastrando…' : 'Cadastrar'}
      </button>
    </form>
  )
}
