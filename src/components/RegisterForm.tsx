// Importa o hook useState do React para manipular estados locais
import { useState } from 'react'
// Importa hooks e componentes do React Router
import { useNavigate, Link } from 'react-router-dom'
// Importa as funções de autenticação do serviço de API
import { register, login } from '../services/auth'
// Importa o contexto de autenticação da aplicação
import { useAuth } from '../context/AuthContext'
// Importa os estilos específicos do formulário de registro
import '../styles/register.css'

// Define e exporta o componente de formulário de cadastro
export default function RegisterForm() {
  // Estados locais para armazenar os dados do formulário
  const [name, setName] = useState('')                  // Nome do usuário
  const [email, setEmail] = useState('')                // E-mail
  const [password, setPassword] = useState('')          // Senha
  const [confirmPassword, setConfirmPassword] = useState('') // Confirmação da senha
  const [loading, setLoading] = useState(false)         // Controle de carregamento (enquanto envia)
  const [error, setError] = useState<string | null>(null) // Armazena mensagens de erro (se houver)

  // Hook do React Router para redirecionar o usuário
  const navigate = useNavigate()

  // Obtém a função de login via token do contexto de autenticação
  const { loginWithToken } = useAuth()

  // Função executada ao enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()  // Evita o comportamento padrão do formulário (recarregar a página)
    setError(null)      // Limpa erros anteriores

    // Validação simples: senhas precisam coincidir
    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setLoading(true) // Mostra estado de carregamento

    try {
      // 1️⃣ Cria o novo usuário chamando a API de registro
      await register({ name, email, password })

      // 2️⃣ Faz login automático após o cadastro, recebendo o token de acesso
      const data = await login(email, password)

      // 3️⃣ Usa o token para autenticar no contexto global da aplicação
      await loginWithToken(data.access_token)

      // 4️⃣ Redireciona o usuário para a página inicial
      navigate('/')
    } catch (err: any) {
      // Caso ocorra algum erro (ex: e-mail já existente, problema no servidor)
      const msg = err?.message || 'Falha ao cadastrar'
      setError(msg)
    } finally {
      // Encerra o estado de carregamento (independente de sucesso ou erro)
      setLoading(false)
    }
  }

  // Desabilita o botão de envio se o formulário estiver incompleto ou carregando
  const disabled = loading || !name || !email || !password || !confirmPassword

  return (
    // Estrutura principal do formulário
    <form onSubmit={handleSubmit} className="register-form">
      <h2 className="register-title">Criar conta</h2>

      {/* Exibe mensagem de erro, se houver */}
      {error && <p className="register-error">{error}</p>}

      {/* Campo: Nome completo */}
      <div className="register-field">
        <label htmlFor="name" className="register-label">Nome completo</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}     // Atualiza o estado ao digitar
          className="register-input"
          required
          autoComplete="name"
        />
      </div>

      {/* Campo: E-mail */}
      <div className="register-field">
        <label htmlFor="email" className="register-label">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}     // Atualiza o estado ao digitar
          className="register-input"
          required
          autoComplete="email"
        />
      </div>

      {/* Campo: Senha */}
      <div className="register-field">
        <label htmlFor="password" className="register-label">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Atualiza o estado ao digitar
          className="register-input"
          required
          autoComplete="new-password"
        />
      </div>

      {/* Campo: Confirmar senha */}
      <div className="register-field">
        <label htmlFor="confirm-password" className="register-label">Confirmar senha</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // Atualiza o estado
          className="register-input"
          required
          autoComplete="new-password"
        />
      </div>

      {/* Link para usuários que já possuem conta */}
      <div className="register-actions">
        <Link to="/login" className="register-link">Já tenho uma conta</Link>
      </div>

      {/* Botão de envio: muda texto enquanto está carregando */}
      <button type="submit" className="register-button" disabled={disabled}>
        {loading ? 'Cadastrando…' : 'Cadastrar'}
      </button>
    </form>
  )
}
