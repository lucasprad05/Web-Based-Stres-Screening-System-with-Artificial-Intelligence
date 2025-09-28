// Aguarda que todo o conteúdo da página seja carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os formulários de login e cadastro, se existirem
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');

    // ============================
    // Lógica para o formulário de registro
    // ============================
    if (registerForm) {
        
        // Adiciona o evento de submit ao formulário de registro
        registerForm.addEventListener('submit', (event) => {
            
            event.preventDefault(); // Previne o envio padrão do formulário

            // Recupera os valores dos campos do formulário
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const confirmPassword = document.querySelector('#confirm-password').value;

            // Verifica se as senhas coincidem
            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return; // Interrompe execução se as senhas forem diferentes
            }

            // Recupera usuários salvos no localStorage ou inicializa um array vazio
            const users = JSON.parse(localStorage.getItem('users')) || [];
            // Verifica se o e-mail já foi cadastrado
            const userExists = users.find(user => user.email === email);

            if (userExists) {
                alert('Este e-mail já foi cadastrado!');
                return; // Interrompe cadastro se usuário já existir
            }

            // Cria um novo usuário e adiciona ao array
            const newUser = { name, email, password };
            users.push(newUser);
            // Salva o array atualizado no localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // Confirmação de cadastro e redirecionamento para a página de login
            alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
            window.location.href = 'login.html';
        });
    }

    // ============================
    // Lógica para o formulário de login
    // ============================
    if (loginForm) {
        
        // Adiciona o evento de submit ao formulário de login
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Previne envio padrão do formulário

            // Recupera os valores dos campos do formulário
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            // Recupera usuários salvos no localStorage ou inicializa um array vazio
            const users = JSON.parse(localStorage.getItem('users')) || [];
            // Verifica se existe um usuário com email e senha correspondentes
            const foundUser = users.find(user => user.email === email && user.password === password);

            if (foundUser) {
                // Login bem-sucedido: exibe mensagem e salva estado de login
                alert(`Login efetuado com sucesso! Bem-vindo(a), ${foundUser.name}!`);
                localStorage.setItem('isLoggedIn', 'true');        // Marca como logado
                localStorage.setItem('LoggedInUser', foundUser.name); // Salva nome do usuário
                window.location.href = '../index.html';            // Redireciona para página inicial
            } else {
                // Usuário não encontrado ou senha incorreta
                alert(`E-mail ou senha incorretos. Tente novamente ou cadastre-se.`);
            }
        });
    }
});
