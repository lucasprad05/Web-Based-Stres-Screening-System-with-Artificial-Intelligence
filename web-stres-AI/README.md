# StudStress AI - Protótipo Inicial (HTML/CSS/JS)

>Este projeto corresponde à primeira entrega da disciplina **Desenvolvimento de Aplicações Web**. 
>O objetivo principal da aplicação é ajudar estudantes a entenderem melhor seus níveis de estresse através de um **questionário interativo**.

-----

## Tecnologias Utilizadas
- **HTML5** e **CSS3**
- **JavaScript**
- **Bootstrap 5**
- **LocalStorage** 

## Telas e Funcionalidades

O protótipo implementa o fluxo principal da aplicação, consistindo nas seguintes telas e funcionalidades:

  * **Página Inicial (`index.html`):**

      * Apresenta a proposta de valor da aplicação.
      * Contém a chamada principal para a ação ("Faça seu teste\!"), que direciona o usuário para o questionário.

  * **Páginas de Autenticação:**

      * **Cadastro (`pages/register.html`):** Um formulário para o usuário criar uma nova conta. As informações são salvas no `localStorage` do navegador para simular a persistência de dados.
      * **Login (`pages/login.html`):** Um formulário para o usuário entrar na sua conta. O script valida as credenciais com base nos dados salvos no `localStorage`.

  * **Página do Teste (`pages/teste.html`):**

      * Exibe um questionário interativo com perguntas de múltipla escolha.
      * O JavaScript controla a exibição das perguntas, captura as respostas do usuário e calcula uma pontuação final.
      * Ao final do teste, o usuário é automaticamente redirecionado para a página de resultados.

  * **Página de Resultados (`pages/resultado.html`):**

      * Exibe a pontuação final calculada no teste.
      * Apresenta um diagnóstico textual (Nível Baixo, Moderado ou Alto) com base na pontuação obtida.
      * Oferece um botão para o usuário refazer o teste.

-----

## Estrutura do Projeto

O projeto está organizado na seguinte estrutura de pastas, separando conteúdo (HTML), estilo (CSS) e lógica (JavaScript):

```
/web-stres-AI
│
├── index.html              // Página inicial
├── README.md               // Esta documentação
│
├── pages/                  // Demais páginas HTML do projeto
│   ├── login.html
│   ├── register.html
│   ├── teste.html
│   └── resultado.html
│
├── styles/                 // Arquivos de estilo (CSS)
│   ├── global.css          // Estilos globais (header, footer, variáveis de cor)
│   ├── home.css            // Estilos específicos da página inicial
│   ├── forms.css           // Estilos para as páginas de login e cadastro
│   ├── test.css            // Estilos para a página do teste
│   └── result.css          // Estilos para a página de resultado
│
└── scripts/                // Arquivos de lógica (JavaScript)
    ├── auth.js             // Lógica para os formulários de login e cadastro
    ├── test.js             // Lógica para o funcionamento do questionário
    └── results.js          // Lógica para exibir o resultado do teste
```

-----

## Instruções de Instalação e Execução

Este projeto é composto apenas por arquivos estáticos (HTML, CSS, JS) e não requer um processo de instalação complexo ou dependências.

Existem duas maneiras de executar a aplicação:

### Método 1: Abrindo o Arquivo Diretamente

1.  Clone ou baixe este repositório.
2.  Abra o arquivo `index.html` no navegador.

### Método 2: Usando um Servidor Local

1.  Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code.
2.  Abra a pasta do projeto no VS Code.
3. Clique com o botão direito em `index.html` → *Open with Live Server*.  
5.  O projeto será aberto em uma nova aba do navegador, geralmente no endereço `http://127.0.0.1:5500`.