import { useState } from "react"
import Header from "./components/Header"
import MainPage from "./pages/Main"

export default function App() {
  // Troqcar pelo real estado de autenticação depois
  const [isLoggedIn] = useState(false)

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="container">
        <MainPage />
      </main>
    </>
  )
}
