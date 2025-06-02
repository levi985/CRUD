document.addEventListener('DOMContentLoaded', () => {
    // Verificar se já existe uma sessão ativa
    const usuarioAtual = localStorage.getItem('usuarioAtual');
    if (usuarioAtual) {
        window.location.href = 'login.html';
    }

    const formularioLogin = document.getElementById('loginForm');
    const campoEmail = document.getElementById('email');
    const campoSenha = document.getElementById('password');
    const erroEmail = document.getElementById('emailError');
    const erroSenha = document.getElementById('passwordError');
    const erroLogin = document.getElementById('loginError');

    // Função para validar email
    const validarEmail = (email) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    };

    // Função para validar senha
    const validarSenha = (senha) => {
        // Senha deve ter exatamente 6 números
        const regexSenha = /^\d{6}$/;
        return regexSenha.test(senha);
    };

    // Função para limpar mensagens de erro
    const limparErros = () => {
        erroEmail.textContent = '';
        erroSenha.textContent = '';
        erroLogin.textContent = '';
    };

    // Função para exibir mensagem de erro
    const mostrarErro = (elemento, mensagem) => {
        elemento.textContent = mensagem;
        elemento.style.color = '#ff0000';
        elemento.style.fontSize = '0.9em';
        elemento.style.marginTop = '5px';
    };

    // Evento de submit do formulário
    formularioLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        limparErros();

        const email = campoEmail.value.trim();
        const senha = campoSenha.value.trim();
        let valido = true;

        // Validação do email
        if (!email) {
            mostrarErro(erroEmail, 'E-mail é obrigatório');
            valido = false;
        } else if (!validarEmail(email)) {
            mostrarErro(erroEmail, 'E-mail inválido. Use um formato válido (ex: usuario@email.com)');
            valido = false;
        }

        // Validação da senha
        if (!senha) {
            mostrarErro(erroSenha, 'Senha é obrigatória');
            valido = false;
        } else if (!validarSenha(senha)) {
            mostrarErro(erroSenha, 'A senha deve conter exatamente 6 números');
            valido = false;
        }

        if (valido) {
            // Buscar usuários no localStorage
            const usuarios = JSON.parse(localStorage.getItem('listausuarios')) || [];
            
            // Procurar usuário com email e senha correspondentes
            const usuario = usuarios.find(u => u.email === email && u.senha === senha);

            if (usuario) {
                // Salvar dados da sessão com informações completas do usuário
                const dadosSessao = {
                    id: usuario.id,
                    email: usuario.email,
                    nome: usuario.nome,
                    cpf: usuario.cpf,
                    dataNascimento: usuario.dataNascimento,
                    dataRegistro: usuario.dataRegistro,
                    horarioLogin: new Date().toISOString()
                };
                localStorage.setItem('usuarioAtual', JSON.stringify(dadosSessao));

                // Mostrar mensagem de sucesso
                const mensagemSucesso = document.createElement('div');
                mensagemSucesso.style.color = 'green';
                mensagemSucesso.style.fontSize = '1.2em';
                mensagemSucesso.style.marginTop = '20px';
                mensagemSucesso.style.textAlign = 'center';
                mensagemSucesso.innerHTML = 'Login realizado com sucesso! Redirecionando...';
                document.querySelector('.login-container').appendChild(mensagemSucesso);

                // Redirecionar para a página de listagem após 2 segundos
                setTimeout(() => {
                    window.location.href = 'perfil.html';
                }, 2000);
            } else {
                mostrarErro(erroLogin, 'E-mail ou senha incorretos. Verifique suas credenciais.');
            }
        }
    });

    // Validação em tempo real do email
    campoEmail.addEventListener('input', () => {
        const email = campoEmail.value.trim();
        if (email && !validarEmail(email)) {
            mostrarErro(erroEmail, 'E-mail inválido. Use um formato válido (ex: usuario@email.com)');
        } else {
            erroEmail.textContent = '';
        }
    });

    // Validação em tempo real da senha
    campoSenha.addEventListener('input', () => {
        const senha = campoSenha.value.trim();
        if (senha && !validarSenha(senha)) {
            mostrarErro(erroSenha, 'A senha deve conter exatamente 6 números');
        } else {
            erroSenha.textContent = '';
        }
    });
});
