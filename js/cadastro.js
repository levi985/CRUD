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

    let valido = true;

    if (nome.length < 3) {
        nomeAviso.innerHTML = 'Mínimo de 3 caracteres*';
        valido = false;
    }

    if (!email.includes('@') || !email.includes('.')) {
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

    const cpfNumerico = cpf.replace(/\D/g, ''); // Remove tudo que não for número
    if (cpfNumerico.length !== 11) {
        cpfAviso.innerHTML = 'CPF deve conter 11 números*';
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
        dataNascimento: dataNascimento
    };

    listausuarios.push(usuario);
    localStorage.setItem('listausuarios', JSON.stringify(listausuarios));
    console.log('Cadastrado com sucesso!!');

    document.getElementById('cadastroForm').reset();
}
