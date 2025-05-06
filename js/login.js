document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorDiv = document.getElementById('loginError');

    // Se já estiver logado, redireciona
    if (localStorage.getItem('sessaoUsuario')) {
        window.location.href = 'perfil.html';
        return;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        errorDiv.textContent = '';

        const email = emailInput.value.trim();
        const senha = passwordInput.value;

        // Validação simples
        if (!email || !senha) {
            errorDiv.textContent = 'Preencha todos os campos.';
            return;
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            errorDiv.textContent = 'E-mail inválido.';
            return;
        }

        // Busca usuários cadastrados
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuario = usuarios.find(u => u.email === email && u.senha === senha);

        if (!usuario) {
            errorDiv.textContent = 'E-mail ou senha incorretos.';
            return;
        }

        // Salva sessão
        localStorage.setItem('sessaoUsuario', JSON.stringify(usuario));
        window.location.href = 'perfil.html';
    });
});
