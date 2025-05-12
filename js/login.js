document.addEventListener('DOMContentLoaded', () => {
    // Verificar se já existe uma sessão ativa
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'listagem.html';
    }

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginError = document.getElementById('loginError');

    // Função para validar email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Função para validar senha
    const validatePassword = (password) => {
        return password.length >= 6;
    };

    // Função para limpar mensagens de erro
    const clearErrors = () => {
        emailError.textContent = '';
        passwordError.textContent = '';
        loginError.textContent = '';
    };

    // Função para exibir mensagem de erro
    const showError = (element, message) => {
        element.textContent = message;
    };

    // Evento de submit do formulário
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        // Validação do email
        if (!email) {
            showError(emailError, 'E-mail é obrigatório');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailError, 'E-mail inválido');
            isValid = false;
        }

        // Validação da senha
        if (!password) {
            showError(passwordError, 'Senha é obrigatória');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError(passwordError, 'Senha deve ter pelo menos 6 caracteres');
            isValid = false;
        }

        if (isValid) {
            // Buscar usuários no localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Procurar usuário com email e senha correspondentes
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Salvar dados da sessão
                const sessionData = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('currentUser', JSON.stringify(sessionData));

                // Redirecionar para a página de listagem
                window.location.href = 'listagem.html';
            } else {
                showError(loginError, 'E-mail ou senha incorretos');
            }
        }
    });

    // Validação em tempo real do email
    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        if (email && !validateEmail(email)) {
            showError(emailError, 'E-mail inválido');
        } else {
            emailError.textContent = '';
        }
    });

    // Validação em tempo real da senha
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value.trim();
        if (password && !validatePassword(password)) {
            showError(passwordError, 'Senha deve ter pelo menos 6 caracteres');
        } else {
            passwordError.textContent = '';
        }
    });
});
