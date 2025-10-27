// Importa o componente de formulário de registro
import RegisterForm from "../components/RegisterForm";
// Importa estilos da página
import "../styles/register.css";

// Componente da página de registro
export default function RegisterPage() {
  return (
    <div className="register-page">
      {/* Container centralizado do formulário */}
      <div className="register-container">
        <RegisterForm />
      </div>
    </div>
  );
}
