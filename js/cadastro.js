let listausuarios = [];

if (localStorage.getItem('listausuarios')) {
    listausuarios = JSON.parse(localStorage.getItem('listausuarios'));
}

function cadastrar() {
    let nome = document.querySelector('#nome').value.trim();
    let senha = document.querySelector('#password').value.trim();
    let email = document.querySelector('#email').value.trim();
    let cpf = document.querySelector('#cpf').value.trim();
    let dataNascimento = document.querySelector('#data').value.trim();

    let nomeAviso = document.getElementById('nomeAviso');
    let emailAviso = document.getElementById('emailAviso');
    let senhaAviso = document.getElementById('senhaAviso');
    let cpfAviso = document.getElementById('cpfAviso');
    let dataAviso = document.getElementById('dataAviso');

    nomeAviso.innerHTML = '';
    emailAviso.innerHTML = '';
    senhaAviso.innerHTML = '';
    cpfAviso.innerHTML = '';
    dataAviso.innerHTML = '';

    // Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto > 9 ? 0 : resto;
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto > 9 ? 0 : resto;
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) return false;

    return true;
}

// Função para formatar CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

// Função para validar email
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

// Adicionar validação em tempo real para CPF
document.getElementById('cpf').addEventListener('input', function(e) {
    let cpf = e.target.value;
    let cpfAviso = document.getElementById('cpfAviso');
    
    // Formata o CPF enquanto digita
    e.target.value = formatarCPF(cpf);
    
    // Remove a formatação para validação
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length === 11) {
        if (validarCPF(cpf)) {
            cpfAviso.innerHTML = 'CPF válido';
            cpfAviso.style.color = 'green';
        } else {
            cpfAviso.innerHTML = 'CPF inválido';
            cpfAviso.style.color = 'red';
        }
    } else {
        cpfAviso.innerHTML = '';
    }
});

// Adicionar validação em tempo real para email
document.getElementById('email').addEventListener('input', function(e) {
    let email = e.target.value;
    let emailAviso = document.getElementById('emailAviso');
    
    if (email) {
        if (validarEmail(email)) {
            const emailJaExiste = listausuarios.some(usuario => usuario.email === email);
            if (emailJaExiste) {
                emailAviso.innerHTML = 'Este e-mail já está cadastrado';
                emailAviso.style.color = 'red';
            } else {
                emailAviso.innerHTML = 'E-mail válido';
                emailAviso.style.color = 'green';
            }
        } else {
            emailAviso.innerHTML = 'E-mail inválido';
            emailAviso.style.color = 'red';
        }
    } else {
        emailAviso.innerHTML = '';
    }
});


    let valido = true;

    if (nome.length < 3) {
        nomeAviso.innerHTML = 'Mínimo de 3 caracteres*';
        valido = false;
    }

    if (!validarEmail(email)) {
        emailAviso.innerHTML = 'Por favor, insira um email válido*';
        valido = false;
    }

    const emailJaExiste = listausuarios.some(usuario => usuario.email === email);
    if (emailJaExiste) {
        emailAviso.innerHTML = 'Este e-mail já está cadastrado*';
        valido = false;
    }

    if (senha.length < 6) {
        senhaAviso.innerHTML = 'Mínimo de 6 caracteres*';
        valido = false;
    } else if (senha.includes(' ')) {
        senhaAviso.innerHTML = 'A senha não pode conter espaços*';
        valido = false;
    }

    const cpfNumerico = cpf.replace(/\D/g, '');
    if (!validarCPF(cpfNumerico)) {
        cpfAviso.innerHTML = 'CPF inválido*';
        valido = false;
    }

    const cpfJaExiste = listausuarios.some(usuario => usuario.cpf === cpf);
    if (cpfJaExiste) {
        cpfAviso.innerHTML = 'Este CPF já está cadastrado*';
        valido = false;
    }

    if (!dataNascimento) {
        dataAviso.innerHTML = 'Informe a data de nascimento*';
        valido = false;
    }

    if (!valido) {
        return;
    }

    let usuario = {
        nome: nome,
        senha: senha,
        email: email,
        cpf: cpf,
        dataNascimento: dataNascimento,
        dataRegistro: new Date().toISOString()
    };

    listausuarios.push(usuario);
    localStorage.setItem('listausuarios', JSON.stringify(listausuarios));

    // Mostrar mensagem de sucesso
    const mensagemSucesso = document.createElement('div');
    mensagemSucesso.style.color = 'green';
    mensagemSucesso.style.fontSize = '1.2em';
    mensagemSucesso.style.marginTop = '20px';
    mensagemSucesso.style.textAlign = 'center';
    mensagemSucesso.innerHTML = 'Cadastro realizado com sucesso! Redirecionando para o login...';
    document.querySelector('.cadastro-container').appendChild(mensagemSucesso);

    // Limpar formulário
    document.getElementById('cadastroForm').reset();

    // Redirecionar após 3 segundos
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 3000);
}
