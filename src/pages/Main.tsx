// Importa o componente Link do React Router para navegação entre páginas
import { Link } from "react-router-dom"

// Importa o arquivo de estilos CSS associado a esta página
import "../styles/mainPage.css"

// Define e exporta o componente principal da página inicial
export default function MainPage() {
  return (
    // A seção principal da página — usada como "hero section" (área de destaque)
    <section className="main-hero">
      
      {/* Um divisor visual (possivelmente uma linha ou espaçamento no layout) */}
      <div className="hero-divider" aria-hidden />

      {/* Lado esquerdo da seção principal: contém textos e botões */}
      <div className="hero-left">
        {/* Título principal da página */}
        <h1>Entenda seu nível de estresse, sem complicação.</h1>

        {/* Descrição explicando a proposta do site ou app */}
        <p className="hero-desc">
          O StudStress AI usa respostas rápidas do seu dia a dia para estimar seu nível de estresse e
          sugerir próximos passos — tudo de forma simples e humana.
        </p>

        {/* Botão de ação que leva o usuário para a página do teste */}
        <Link to="/TestPage" className="cta-button">
          Fazer o teste!
        </Link>

        {/* Nota de rodapé explicando a base de dados usada pelo modelo de IA */}
        <p className="hero-footnote">
          Baseado em um modelo treinado com dados do Kaggle sobre bem-estar de estudantes.
        </p>
      </div>

      {/* Lado direito da seção principal: imagem e citação motivacional */}
      <div className="hero-right">
        {/* Moldura da imagem (usa uma tag <figure> semântico para imagens com legenda) */}
        <figure className="photo-frame">
          <img
            src="./src/assets/people-inicial-page.png"
            alt="Estudantes sorrindo em ambiente acadêmico"
          />
        </figure>

        {/* Legenda da imagem com uma citação inspiradora */}
        <p className="photo-caption">
          “Pequenas mudanças diárias fazem uma grande diferença.”
        </p>
      </div>
    </section>
  )
}
