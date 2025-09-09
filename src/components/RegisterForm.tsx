import { useState } from 'react'
import '../styles/register.css'

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Register:', { name, email, password, confirmPassword })
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2 className="register-title">Criar conta</h2>

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
        />
      </div>

      <div className="register-actions">
        <a href="/login" className="register-link">Já tenho uma conta</a>
      </div>

      <button type="submit" className="register-button">Cadastrar</button>
    </form>
  )
}
