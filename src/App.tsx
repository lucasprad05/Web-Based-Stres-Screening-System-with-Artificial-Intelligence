import Header from "./components/Header"
import Footer from "./components/Footer"
import { Routes, Route } from "react-router-dom"

// Páginas
import MainPage from "./pages/Main"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import TestPage from "./pages/TestPage"
import Result from "./pages/Result"

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/testPage" element={<TestPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/result" element={<Result />} />
          <Route path="/perfil" element={<div style={{ padding: 24 }}>Página do Perfil (TODO)</div>} />
          <Route path="*" element={<div style={{ padding: 24 }}>404</div>} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}
