import { Link } from "react-router-dom"
import "../styles/mainPage.css"

export default function MainPage() {
  return (
    <section className="main-hero">
      <div className="hero-divider" aria-hidden />

      <div className="hero-left">
        <h1>Entenda seu nível de estresse, sem complicação.</h1>
        <p className="hero-desc">
          O StudStress AI usa respostas rápidas do seu dia a dia para estimar seu nível de estresse e
          sugerir próximos passos — tudo de forma simples e humana.
        </p>

        <Link to="/Fazerteste" className="cta-button">Fazer o teste!</Link>

        <p className="hero-footnote">
          Baseado em um modelo treinado com dados do Kaggle sobre bem-estar de estudantes.
        </p>
      </div>

      <div className="hero-right">
        <figure className="photo-frame">
          <img
            src="./src/assets/people-inicial-page.png"
            alt="Estudantes sorrindo em ambiente acadêmico"
          />
        </figure>

        <p className="photo-caption">
          “Pequenas mudanças diárias fazem uma grande diferença.”
        </p>
      </div>
    </section>
  )
}
