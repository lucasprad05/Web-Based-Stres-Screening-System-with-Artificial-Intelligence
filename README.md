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

WEB-STRESS-AI/
├── public/ # Arquivos estáticos
├── src/
│ ├── assets/ # Ícones, imagens e vetores
│ ├── components/ # Componentes reutilizáveis (QuestionScale, CircularScore, etc)
│ ├── context/ # Contextos globais (ex: AuthContext)
│ ├── pages/ # Páginas da aplicação (Login, Register, FazerTeste, Result)
│ ├── routes/ # Definição de rotas e proteção de acesso
│ ├── services/ # Funções de requisição (API, autenticação, etc)
│ ├── styles/ # Arquivos CSS globais e modulares
│ ├── utils/ # Funções auxiliares e helpers
│ ├── App.tsx # Configuração principal de rotas e layout
│ └── main.tsx # Ponto de entrada do React
├── .env # Variáveis de ambiente (ex: VITE_API_URL)
├── vite.config.ts # Configuração do Vite
├── tsconfig.json # Configuração base do TypeScript
├── eslint.config.js # Regras de lint
└── package.json # Dependências e scripts

## ⚙️ Como Rodar o Projeto Localmente

 - Primeiro rode o Back-End. Siga as instruções do README.md do repositório do Back-End:
 (LINK DO REP)

 
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
