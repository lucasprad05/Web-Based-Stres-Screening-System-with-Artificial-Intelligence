// Importa o formulário de login e estilos
import LoginForm from "../components/LoginForm";
import "../styles/login.css";

// Componente da página de login
export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        {/* Renderiza o formulário de login */}
        <LoginForm />
      </div>
    </div>
  );
}
