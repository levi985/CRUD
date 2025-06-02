// Quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se já tem alguém logado
    let usuarioLogado = localStorage.getItem('usuarioAtual');
    if (usuarioLogado) {
        window.location.href = 'perfil.html';
    }

    // Pega os elementos do formulário
    let form = document.getElementById('loginForm');
    let email = document.getElementById('email');
    let senha = document.getElementById('password');
    let erroEmail = document.getElementById('emailError');
    let erroSenha = document.getElementById('passwordError');
    let erroLogin = document.getElementById('loginError');

    // Função que verifica se o email é válido
    function verificaEmail(email) {
        if (email.includes('@') && email.includes('.')) {
            return true;
        }
        return false;
    }

    // Função que verifica se a senha é válida
    function verificaSenha(senha) {
        if (senha.length === 6 && !isNaN(senha)) {
            return true;
        }
        return false;
    }

    // Quando o formulário for enviado
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpa as mensagens de erro
        erroEmail.innerHTML = '';
        erroSenha.innerHTML = '';
        erroLogin.innerHTML = '';

        // Pega os valores dos campos
        let emailValor = email.value.trim();
        let senhaValor = senha.value.trim();
        let tudoOk = true;

        // Verifica o email
        if (emailValor === '') {
            erroEmail.innerHTML = 'Digite seu email!';
            erroEmail.style.color = 'red';
            tudoOk = false;
        } else if (!verificaEmail(emailValor)) {
            erroEmail.innerHTML = 'Email inválido!';
            erroEmail.style.color = 'red';
            tudoOk = false;
        }

        // Verifica a senha
        if (senhaValor === '') {
            erroSenha.innerHTML = 'Digite sua senha!';
            erroSenha.style.color = 'red';
            tudoOk = false;
        } else if (!verificaSenha(senhaValor)) {
            erroSenha.innerHTML = 'A senha deve ter 6 números!';
            erroSenha.style.color = 'red';
            tudoOk = false;
        }

        // Se tudo estiver ok, tenta fazer o login
        if (tudoOk) {
            // Pega a lista de usuários
            let usuarios = JSON.parse(localStorage.getItem('listausuarios')) || [];
            
            // Procura o usuário
            let usuarioEncontrado = false;
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].email === emailValor && usuarios[i].senha === senhaValor) {
                    usuarioEncontrado = true;
                    
                    // Salva os dados do usuário
                    let dadosUsuario = {
                        id: usuarios[i].id,
                        email: usuarios[i].email,
                        nome: usuarios[i].nome,
                        cpf: usuarios[i].cpf,
                        dataNascimento: usuarios[i].dataNascimento,
                        dataRegistro: usuarios[i].dataRegistro,
                        horarioLogin: new Date().toISOString()
                    };
                    
                    localStorage.setItem('usuarioAtual', JSON.stringify(dadosUsuario));
                    
                    // Mostra mensagem de sucesso
                    let mensagem = document.createElement('div');
                    mensagem.innerHTML = 'Login realizado com sucesso! Redirecionando...';
                    mensagem.style.color = 'green';
                    mensagem.style.fontSize = '1.2em';
                    mensagem.style.textAlign = 'center';
                    mensagem.style.marginTop = '20px';
                    document.querySelector('.login-container').appendChild(mensagem);
                    
                    // Redireciona para o perfil
                    setTimeout(function() {
                        window.location.href = 'perfil.html';
                    }, 2000);
                    
                    break;
                }
            }
            
            // Se não encontrou o usuário
            if (!usuarioEncontrado) {
                erroLogin.innerHTML = 'E-mail ou senha incorretos. Verifique suas credenciais.';
                erroLogin.style.color = 'red';
            }
        }
    });

    // Verifica o email enquanto digita
    email.addEventListener('input', function() {
        let emailValor = email.value.trim();
        if (emailValor !== '' && !verificaEmail(emailValor)) {
            erroEmail.innerHTML = 'Email inválido!';
            erroEmail.style.color = 'red';
        } else {
            erroEmail.innerHTML = '';
        }
    });

    // Verifica a senha enquanto digita
    senha.addEventListener('input', function() {
        let senhaValor = senha.value.trim();
        if (senhaValor !== '' && !verificaSenha(senhaValor)) {
            erroSenha.innerHTML = 'A senha deve ter 6 números!';
            erroSenha.style.color = 'red';
        } else {
            erroSenha.innerHTML = '';
        }
    });
});
