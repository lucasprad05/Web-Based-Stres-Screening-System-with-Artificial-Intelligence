import { useEffect, useState } from "react"
import { deleteUser, getMe, updateEmail, updatePassword, type UserMe } from "../services/users"
import { listMyAssessments, type AssessmentOut } from "../services/assessments"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Swal from "sweetalert2"
import "../styles/profile.css"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function levelBadge(level: AssessmentOut["level"]) {
  return <span className={`badge-level ${level}`}>{level.toUpperCase()}</span>
}

// Define a estrutura de dados esperada pelo payload do Tooltip
type TooltipPayload = {
  value: number; // O valor percentual
  payload: { // Os dados completos do item
    date: string;
    percent: number;
    level: string;
  }
}

// Componente Customizado para o Tooltip
// Recebe as props 'active', 'payload' e 'label' do Recharts
const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: any, label?: string }) => {
  if (active && payload && payload.length) {
  // O payload[0].payload contém o objeto de dados completo (date, percent, level)
  const data = payload[0].payload;
    return (
    <div style={{
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <p style={{fontWeight: 700, margin: '0 0 4px 0'}}>Data: {data.date}</p>
        <p style={{margin: 0}}>Índice: {data.percent}%</p>
        <p style={{margin: 0}}>Nível: <span style={{fontWeight: 700, color: data.level === 'alto' ? 'red' : data.level === 'moderado' ? 'orange' : 'green'}}>{data.level.toUpperCase()}</span></p>
      </div>
    );
  }
  return null;
};

export default function Profile() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  
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

  async function onDeleteAccount() {
    const result = await Swal.fire({
      title: 'Confirma exclusão da conta?',
      text: 'Esta ação é irreversível e todos os seus dados serão perdidos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sim, excluir conta",
      cancelButtonText: "Cancelar"
    })

    if (result.isConfirmed) {
      try {
        // Chama o DELETE
        deleteUser()

        // Mensagem de sucesso
        Swal.fire({
          title: 'Conta excluída',
          text: 'Sua conta foi excluída com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        console.log("Conta excluída com sucesso.")
        // Logout e redirecionamento para a página inicial
        logout()
        navigate('/')
      } catch (e: any) {
        const errorMessage = String(e?.message || "Falha ao excluir conta.");

        // Se o backend retornar 401/404/Erro DEPOIS de ter deletado:
        if (errorMessage.includes("Usuário inativo/inexiste") || errorMessage.includes("401")) {
          console.log("Conta já excluída ou usuário inexistente. Realizando logout.")
          logout()
          navigate('/')
          return
        }

        // Se for houver erro
        console.error("Erro ao excluir conta:", e)
        await Swal.fire({
          title: 'Erro',
          text: e?.message || 'Falha ao excluir conta.',
          icon: 'error',
        })
      }
    }
  }

  const chartData = items
  ? items
      .slice() // copia
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .map((it) => ({
        date: new Date(it.created_at).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        percent: Number(it.percent),
        level: it.level,
      }))
  : []

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

          <div className="chart-section">
            <h2>Evolução do Índice de Estresse</h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    content={<CustomTooltip />}
                  />
                  <Line
                    type="monotone"
                    dataKey="percent"
                    stroke="#007bff"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>Nenhum dado disponível para o gráfico.</p>
            )}
          </div>
        </>
      )}

      {/*Exclusão de conta*/}
      <div className="delete-account-section">
        <button onClick={onDeleteAccount} className="btn-danger">
            Excluir Minha Conta
        </button>
        <p className="warning">
            Atenção: Esta ação é irreversível. Ao excluir sua conta, todos os seus dados serão permanentemente removidos do nosso sistema.
        </p>
      </div>
    </section>
  )
}
