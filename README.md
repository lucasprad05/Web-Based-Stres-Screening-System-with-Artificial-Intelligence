# 🧠 StressAI Frontend

Interface web do **StressAI**, uma aplicação que avalia o nível de estresse de estudantes com base em um questionário interativo e fornece recomendações personalizadas.

---

## 🚀 Tecnologias Utilizadas

- **React + TypeScript**
- **Vite**
- **React Router DOM**
- **CSS Modules**
- **Axios / Fetch API** (comunicação com a API FastAPI)
- **ESLint + Prettier** (padrões de código)

---

## 🧩 Estrutura do Projeto

```bash
WEB-STRESS-AI/
├── public/                   # Arquivos estáticos
├── src/
│   ├── assets/               # Ícones, imagens e vetores
│   ├── components/           # Componentes reutilizáveis (QuestionScale, CircularScore, etc)
│   ├── context/              # Contextos globais (ex: AuthContext)
│   ├── pages/                # Páginas da aplicação (Login, Register, FazerTeste, Result)
│   ├── routes/               # Definição de rotas e proteção de acesso
│   ├── services/             # Funções de requisição (API, autenticação, etc)
│   ├── styles/               # Arquivos CSS globais e modulares
│   ├── utils/                # Funções auxiliares e helpers
│   ├── App.tsx               # Configuração principal de rotas e layout
│   └── main.tsx              # Ponto de entrada do React
├── .env                      # Variáveis de ambiente (ex: VITE_API_URL)
├── vite.config.ts            # Configuração do Vite
├── tsconfig.json             # Configuração base do TypeScript
├── eslint.config.js          # Regras de lint
└── package.json              # Dependências e scripts
```

## ⚙️ Como Rodar o Projeto Localmente

 - Primeiro rode o Back-End. Siga as instruções do README.md do repositório do Back-End:

https://github.com/lucasprad05/backend

 
 - Instalar dependências
```bash
npm install
```
- Configurar variáveis de ambiente
Crie um arquivo .env na raiz do projeto:
```bash
VITE_API_URL=http://localhost:8000
```

- Rodar o servidor local
```bash
npm run dev
```

## Autenticação (Login e Token JWT)
Está no endpoint: POST /auth/token
A autenticação ocorre quando o usuário envia e-mail e senha, e o sistema:
- verifica as credenciais (verify_credentials),
- emite um JWT token via create_access_token,
- inclui dentro do token os scopes (permissões) concedidos.
-> Isso garante que apenas usuários válidos recebem um token de acesso.

## Autorização (Controle de Acesso)
A autorização acontece nas dependências das rotas protegidas, como:
```python
def grant_scopes(user: dict, requested_scopes: Optional[List[str]]):
    req = list(set(requested_scopes or []))
    granted = [s for s in req if s in user["scopes"]]
    return granted or ["read"]
```
A função acima define os **escopos de autorização** que um usuário pode acessar.  
Ela garante que apenas os escopos válidos sejam concedidos no token JWT.

<strong>Autenticação e Autorização são encontradas no repositorio do backend em app/core/security.py</strong>
