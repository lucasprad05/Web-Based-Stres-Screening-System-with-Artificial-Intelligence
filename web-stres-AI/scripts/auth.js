document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');

    if (registerForm) {
        
        registerForm.addEventListener('submit', (event) => {
            
            event.preventDefault();

            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const confirmPassword = document.querySelector('#confirm-password').value;

            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.find(user => user.email === email);

            if (userExists) {
                alert('Este e-mail já foi cadastrado!');
                return;
            }

            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        console.log("Formulário de login ENCONTRADO. Adicionando o 'escutador' de evento.");
        
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const foundUser = users.find(user => user.email === email && user.password === password);

            if (foundUser) {
                alert(`Login efetuado com sucesso! Bem-vindo(a), ${foundUser.name}!`);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('LoggedInUser', foundUser.name);
                window.location.href = '../index.html';
            } else {
                alert(`E-mail ou senha incorretos. Tente novamente ou cadastre-se.`);
            }
        });
    }
});