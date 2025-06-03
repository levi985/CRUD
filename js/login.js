document.addEventListener('DOMContentLoaded', function() {
    let usuarioLogado = localStorage.getItem('usuarioAtual');
    if (usuarioLogado) {
        window.location.href = 'perfil.html';
    }

    let form = document.getElementById('loginForm');
    let email = document.getElementById('email');
    let senha = document.getElementById('password');
    let erroEmail = document.getElementById('emailError');
    let erroSenha = document.getElementById('passwordError');
    let erroLogin = document.getElementById('loginError');

    function verificaEmail(email) {
        if (email.includes('@') && email.includes('.')) {
            return true;
        }
        return false;
    }

    function verificaSenha(senha) {
        if (senha.length === 6 && !isNaN(senha)) {
            return true;
        }
        return false;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        erroEmail.innerHTML = '';
        erroSenha.innerHTML = '';
        erroLogin.innerHTML = '';

        let emailValor = email.value.trim();
        let senhaValor = senha.value.trim();
        let tudoOk = true;

        if (emailValor === '') {
            erroEmail.innerHTML = 'Digite seu email!';
            erroEmail.style.color = 'red';
            tudoOk = false;
        } else if (!verificaEmail(emailValor)) {
            erroEmail.innerHTML = 'Email inválido!';
            erroEmail.style.color = 'red';
            tudoOk = false;
        }

        if (senhaValor === '') {
            erroSenha.innerHTML = 'Digite sua senha!';
            erroSenha.style.color = 'red';
            tudoOk = false;
        } else if (!verificaSenha(senhaValor)) {
            erroSenha.innerHTML = 'A senha deve ter 6 números!';
            erroSenha.style.color = 'red';
            tudoOk = false;
        }

        if (tudoOk) {
            let usuarios = JSON.parse(localStorage.getItem('listausuarios')) || [];
            
            let usuarioEncontrado = false;
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].email === emailValor && usuarios[i].senha === senhaValor) {
                    usuarioEncontrado = true;
                    
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
                    
                    let mensagem = document.createElement('div');
                    mensagem.innerHTML = 'Login realizado com sucesso! Redirecionando...';
                    mensagem.style.color = 'green';
                    mensagem.style.fontSize = '1.2em';
                    mensagem.style.textAlign = 'center';
                    mensagem.style.marginTop = '20px';
                    document.querySelector('.login-container').appendChild(mensagem);
                    
                    setTimeout(function() {
                        window.location.href = 'perfil.html';
                    }, 2000);
                    
                    break;
                }
            }
            
            if (!usuarioEncontrado) {
                erroLogin.innerHTML = 'E-mail ou senha incorretos. Verifique suas credenciais.';
                erroLogin.style.color = 'red';
            }
        }
    });

    email.addEventListener('input', function() {
        let emailValor = email.value.trim();
        if (emailValor !== '' && !verificaEmail(emailValor)) {
            erroEmail.innerHTML = 'Email inválido!';
            erroEmail.style.color = 'red';
        } else {
            erroEmail.innerHTML = '';
        }
    });

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
