// Importa o hook useState do React para gerenciar estados locais do componente
import { useState } from 'react'

// Importa hooks e componentes do React Router para navegação e links
import { useNavigate, Link } from 'react-router-dom'

// Importa a função de login do serviço de autenticação (API)
import { login } from '../services/auth'

// Importa o contexto de autenticação da aplicação
import { useAuth } from '../context/AuthContext'

// Importa o arquivo CSS responsável pelo estilo da página de login
import '../styles/login.css'

// Define e exporta o componente de formulário de login
export default function LoginForm() {
  // Declara estados locais do formulário
  const [email, setEmail] = useState('')                // Guarda o valor do campo de e-mail
  const [password, setPassword] = useState('')          // Guarda o valor do campo de senha
  const [loading, setLoading] = useState(false)         // Indica se o login está em andamento
  const [error, setError] = useState<string | null>(null) // Guarda mensagens de erro (se houver)

  // Hook do React Router para redirecionar o usuário após o login
  const navigate = useNavigate()

  // Obtém do contexto de autenticação a função que salva o token e carrega os dados do usuário
  const { loginWithToken } = useAuth()

  /**
   * Função chamada ao enviar o formulário de login.
   * Realiza autenticação, salva o token e redireciona o usuário.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()    // Impede o recarregamento padrão da página
    setError(null)        // Limpa mensagens de erro anteriores
    setLoading(true)      // Ativa o estado de "carregando"

    try {
      // Chama a função de login no serviço de autenticação
      // Retorna um objeto com { access_token, token_type }
      const data = await login(email, password)

      // Usa o token recebido para autenticar via contexto global
      await loginWithToken(data.access_token)

      // Redireciona o usuário para a página inicial após login bem-sucedido
      navigate('/')
    } catch (err: any) {
      // Define uma mensagem genérica de erro (evita exposição de detalhes do servidor)
      const msg = 'Falha no login. Verifique suas credenciais e tente novamente.'
      setError(msg)
    } finally {
      // Independentemente do resultado, desativa o estado de carregamento
      setLoading(false)
    }
  }

  // O botão será desabilitado se o login estiver em andamento ou se os campos estiverem vazios
  const disabled = loading || !email || !password

  return (
    // Estrutura principal do formulário de login
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">Login</h2>

      {/* Se houver erro, exibe a mensagem acima do formulário */}
      {error && <p className="login-error">{error}</p>}

      {/* Campo de entrada para o e-mail */}
      <div className="login-field">
        <label htmlFor="email" className="login-label">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}   // Atualiza o estado conforme o usuário digita
          className="login-input"
          required
          autoComplete="email"                         // Sugestão automática do navegador
        />
      </div>

      {/* Campo de entrada para a senha */}
      <div className="login-field">
        <label htmlFor="password" className="login-label">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao digitar
          className="login-input"
          required
          autoComplete="current-password"              // Usa senha salva no navegador
        />
      </div>

      {/* Link para a página de registro caso o usuário ainda não tenha conta */}
      <div className="login-actions">
        <Link to="/register" className="login-link">Cadastrar-me</Link>
      </div>

      {/* Botão principal de envio — mostra estado de carregamento enquanto autentica */}
      <button type="submit" className="login-button" disabled={disabled}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
