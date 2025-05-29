let listausuarios = JSON.parse(localStorage.getItem('listausuarios')) || [];
let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

if (!usuarioLogado) {
    alert('Você precisa estar logado.');
    window.location.href = 'login.html';
}

let usuario = listausuarios.find(u => u.email === usuarioLogado.email);

if (!usuario) {
    alert('Usuário logado não encontrado na lista de usuários.');
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
}

document.querySelector('#nome').value = usuario.nome || '';
document.querySelector('#email').value = usuario.email || '';
document.querySelector('#senha').value = usuario.senha || '';
document.querySelector('#cpf').value = usuario.cpf || '';
document.querySelector('#dataNascimento').value = usuario.dataNascimento || '';

document.querySelector('#form-perfil').addEventListener('submit', function (event) {
    event.preventDefault();

    let nome = document.querySelector('#nome').value.trim();
    let senha = document.querySelector('#senha').value.trim();
    let dataNascimento = document.querySelector('#dataNascimento').value.trim();

    if (nome.length < 3) {
        alert('Nome deve ter pelo menos 3 caracteres.');
        return;
    }

    if (senha.length < 6 || senha.includes(' ')) {
        alert('A senha deve ter no mínimo 6 caracteres e não pode conter espaços.');
        return;
    }

    usuario.nome = nome;
    usuario.senha = senha;
    usuario.dataNascimento = dataNascimento;

    let indice = listausuarios.findIndex(u => u.email === usuario.email);
    if (indice !== -1) {
        listausuarios[indice] = usuario;
        localStorage.setItem('listausuarios', JSON.stringify(listausuarios));
        alert('Alterações salvas com sucesso!');
    }
});
