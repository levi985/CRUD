let listausuarios = []


if(localStorage.getItem('listausuarios')){
    listausuarios = JSON.parse(localStorage.getItem('listausuarios'))
}

function cadastrar(){
    let nome = document.querySelector('#nome').value;
    let senha = document.querySelector('#password').value;
    let email = document.querySelector('#email').value;
    let usuario = {
        nome:nome,
        senha:senha,
        email:email
    }
    listausuarios.push(usuario)
    localStorage.setItem('listausuarios', JSON.stringify(listausuarios));
    console.log('Cadastrado com sucesso!!')
}