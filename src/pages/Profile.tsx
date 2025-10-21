import { useEffect, useState } from "react"
import { getMe, updateEmail, updatePassword, type UserMe } from "../services/users"
import { listMyAssessments, type AssessmentOut } from "../services/assessments"
import "../styles/profile.css"

function levelBadge(level: AssessmentOut["level"]) {
  return <span className={`badge-level ${level}`}>{level.toUpperCase()}</span>
}

export default function Profile() {
  const [me, setMe] = useState<UserMe | null>(null)
  const [items, setItems] = useState<AssessmentOut[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  const [email, setEmail] = useState("")
  const [emailPwd, setEmailPwd] = useState("")
  const [emailMsg, setEmailMsg] = useState<string | null>(null)
  const [emailErr, setEmailErr] = useState<string | null>(null)

  const [curPwd, setCurPwd] = useState("")
  const [newPwd, setNewPwd] = useState("")
  const [pwdMsg, setPwdMsg] = useState<string | null>(null)
  const [pwdErr, setPwdErr] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [u, hist] = await Promise.all([getMe(), listMyAssessments()])
        if (!mounted) return
        setMe(u)
        setEmail(u.email)
        setItems(hist)
      } catch (e: any) {
        if (mounted) setErr(e?.message ?? "Erro")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  async function onSubmitEmail(e: React.FormEvent) {
    e.preventDefault()
    setEmailMsg(null); setEmailErr(null)
    try {
      const updated = await updateEmail(email, emailPwd)
      setMe(updated)
      setEmail(updated.email)
      setEmailPwd("")
      setEmailMsg("E-mail atualizado com sucesso")
    } catch (e: any) {
      const msg = String(e?.message || "")
      setEmailErr(msg.includes("Senha atual incorreta") ? "Senha atual incorreta" : "Falha ao atualizar e-mail")
    }
  }

  async function onSubmitPassword(e: React.FormEvent) {
    e.preventDefault()
    setPwdMsg(null); setPwdErr(null)
    try {
      await updatePassword(curPwd, newPwd)
      setCurPwd("")
      setNewPwd("")
      setPwdMsg("Senha alterada com sucesso")
    } catch (e: any) {
      const msg = String(e?.message || "")
      setPwdErr(msg.includes("Senha atual incorreta") ? "Senha atual incorreta" : "Falha ao atualizar senha")
    }
  }

  return (
    <section className="profile-shell">
      <header className="profile-header">
        <h1>Meu Perfil</h1>
        <p className="subtitle">Dados da conta e histórico de testes</p>
      </header>

      {loading && <p>Carregando...</p>}
      {err && <p className="error">{err}</p>}

      {me && (
        <div className="profile-grid">
          <div className="card">
            <h2>Dados básicos</h2>
            <div className="kv">
              <div><span className="k">Nome</span><span className="v">{me.name}</span></div>
              <div><span className="k">E-mail</span><span className="v">{me.email}</span></div>
            </div>
          </div>

          <div className="card">
            <h2>Alterar e-mail</h2>
            <form onSubmit={onSubmitEmail} className="form-grid">
              <label>
                Novo e-mail
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              </label>
              <label>
                Senha atual
                <input type="password" value={emailPwd} onChange={(e)=>setEmailPwd(e.target.value)} required />
              </label>
              <button type="submit" className="btn-primary">Salvar e-mail</button>
              {emailErr && <p className="error">{emailErr}</p>}
              {emailMsg && <p className="ok">{emailMsg}</p>}
            </form>
          </div>

          <div className="card">
            <h2>Alterar senha</h2>
            <form onSubmit={onSubmitPassword} className="form-grid">
              <label>
                Senha atual
                <input type="password" value={curPwd} onChange={(e)=>setCurPwd(e.target.value)} required />
              </label>
              <label>
                Nova senha
                <input type="password" value={newPwd} onChange={(e)=>setNewPwd(e.target.value)} required />
              </label>
              <button type="submit" className="btn-primary">Salvar senha</button>
              {pwdErr && <p className="error">{pwdErr}</p>}
              {pwdMsg && <p className="ok">{pwdMsg}</p>}
            </form>
          </div>
        </div>
      )}

      {items && (
        <>
          <h2 className="block-title">Histórico de testes</h2>
          {items.length > 0 ? (
            <div className="table-wrap">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Nível</th>
                    <th>Índice</th>
                    <th>Perguntas</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id}>
                      <td>{new Date(it.created_at).toLocaleString()}</td>
                      <td>{levelBadge(it.level)}</td>
                      <td>{it.percent}/100</td>
                      <td>{it.dims.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Nenhum teste salvo ainda.</p>
          )}

          <div className="coming-soon">
            <h2>Gráfico (em breve)</h2>
            <p>Em breve, um gráfico com a evolução do seu índice de estresse.</p>
          </div>
        </>
      )}
    </section>
  )
}
