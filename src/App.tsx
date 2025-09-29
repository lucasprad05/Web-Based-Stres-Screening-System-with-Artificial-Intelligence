// src/App.tsx
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Routes, Route } from "react-router-dom"

// Páginas
import MainPage from "./pages/Main"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import TestPage from "./pages/TestPage"
import ResultPage from "./pages/ResultPage"

export default function App() {
  const isLoggedIn = false

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/testPage" element={<TestPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<div style={{ padding: 24 }}>404</div>} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}
