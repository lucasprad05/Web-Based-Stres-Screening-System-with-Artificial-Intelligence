// Importa o arquivo CSS responsável pelos estilos do rodapé
import "../styles/footer.css"

// Define e exporta o componente funcional Footer
export default function Footer() {
    return (
        // Elemento <footer> semântico do HTML — representa o rodapé da página
        <footer className="footer">
            {/* Texto exibido no rodapé — inclui o ano e o nome do projeto */}
            <p>© 2025 Studstress AI</p>
        </footer>
    )
}
