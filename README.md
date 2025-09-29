# 🧠 Projeto Final — Sistema Web de Triagem de Estresse com IA

Aplicação web **responsiva** onde alunos preenchem um formulário sobre hábitos e sentimentos e recebem uma **estimativa do nível de estresse** (Baixo / Moderado / Alto) com base em um **modelo pré-treinado de Machine Learning**.

> Dataset: **Student Stress Monitoring** (Kaggle)

---

## 📑 Sumário
- [Objetivo Geral](#-objetivo-geral)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Rodar](#-como-rodar)
- [API do Backend](#-api-do-backend)
- [Machine Learning](#-machine-learning)
- [Formulário (Campos Sugeridos)](#-formulário-campos-sugeridos)
- [Segurança & Boas Práticas](#-segurança--boas-práticas)
- [Roadmap](#-roadmap)
- [Licença](#-licença)

---

## 🎯 Objetivo Geral
Desenvolver uma aplicação web responsiva onde alunos possam preencher um formulário sobre seus hábitos e sentimentos e receber uma **estimativa do nível de estresse** baseada em **modelo de ML** treinado previamente.

---

## 🏗 Arquitetura
Frontend (React + TS + Tailwind)
│
├── Requisições HTTP (axios/fetch)
│
Backend (Python + Flask)
├── /avaliar -> chama Modelo ML (scikit-learn)
├── /historico -> consulta histórico do usuário (PostgreSQL)
└── /atualizar -> atualiza histórico (PostgreSQL)


---

## 🧰 Tecnologias

**Frontend**
- React + TypeScript + Vite
- TailwindCSS
- Recharts (ou Chart.js) para gráficos
- React Router

**Backend**
- Python + Flask (API REST)
- PostgreSQL (produção) + JSON/arquivo (seed inicial)
- SQLAlchemy / psycopg2 (ou equivalente)

**Machine Learning**
- scikit-learn (RandomForestClassifier ou DecisionTree)
- pandas, numpy
- joblib para exportar o modelo (`.pkl`)

Para rodar o Front End

npm install <br>
npm run dev

