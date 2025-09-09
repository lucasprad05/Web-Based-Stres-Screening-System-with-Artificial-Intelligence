import { useState } from 'react'
import '../styles/login.css'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login:', { email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">Login</h2>

      {/* Email */}
      <div className="login-field">
        <label htmlFor="email" className="login-label">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />
      </div>

      {/* Senha */}
      <div className="login-field">
        <label htmlFor="password" className="login-label">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />
      </div>

      {/* Links */}
      <div className="login-actions">
        <a href="/forgot-password" className="login-link">Esqueci minha senha</a>
        <a href="/register" className="login-link">Cadastrar-me</a>
      </div>

      {/* Botão */}
      <button type="submit" className="login-button">Entrar</button>
    </form>
  )
}
