// src/App.tsx
import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"

// Páginas
import MainPage from "./pages/Main"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import StressResultPage from "./pages/StressResult"

export default function App() {
  const isLoggedIn = false

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Remova/adicione conforme existir */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/stress-result" element={<StressResultPage />} />
          <Route path="*" element={<div style={{ padding: 24 }}>404</div>} />
        </Routes>
      </main>
    </>
  )
}
