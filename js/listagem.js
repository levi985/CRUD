// Verificar se o usuário está logado
function verificarLogin() {
    const usuarioAtual = localStorage.getItem('usuarioAtual');
    if (!usuarioAtual) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Formatação de data padrão
function formatarData(dataISO) {
    if (!dataISO) return "-";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
}

// Corpo da tabela
function carregarUsuarios() {
    if (!verificarLogin()) return;

    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";

    let usuarios = [];
    try {
        const usuariosJSON = localStorage.getItem("listausuarios");
        usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    } catch (e) {
        console.error("Erro ao ler dados do localStorage", e);
        usuarios = [];
    }

    if (!Array.isArray(usuarios)) {
        const tr = document.createElement("tr");
        tr.innerHTML = "<td colspan='6'>Formato inválido de dados.</td>";
        tbody.appendChild(tr);
        return;
    }

    if (usuarios.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = "<td colspan='6'>Nenhum usuário encontrado.</td>";
        tbody.appendChild(tr);
    } else {
        usuarios.forEach((usuario, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${usuario.nome || "-"}</td>
                <td>${usuario.email || "-"}</td>
                <td>••••••</td>
                <td>${usuario.cpf || "-"}</td>
                <td>${formatarData(usuario.dataNascimento)}</td>
                <td>
                    <button id="editar" class="botao-acao" onclick="editarUsuario(${index})">Editar</button>
                    <button id="excluir" class="botao-acao" onclick="excluirUsuario(${index})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    document.getElementById("totalUsuarios").textContent = `Total de usuários: ${usuarios.length}`;
}

// Excluir usuário
function excluirUsuario(index) {
    if (!verificarLogin()) return;
    
    const usuarios = JSON.parse(localStorage.getItem("listausuarios")) || [];
    usuarios.splice(index, 1);
    localStorage.setItem("listausuarios", JSON.stringify(usuarios));
    carregarUsuarios();
}

// Editar usuário
function editarUsuario(index) {
    if (!verificarLogin()) return;
    
    const usuarios = JSON.parse(localStorage.getItem("listausuarios")) || [];
    const usuario = usuarios[index];

    const novoNome = prompt("Nome:", usuario.nome);
    const novoEmail = prompt("Email:", usuario.email);
    const novaSenha = prompt("Senha:", usuario.senha);
    const novoCpf = prompt("CPF:", usuario.cpf || "");
    const novaData = prompt("Data de Nascimento (AAAA-MM-DD):", usuario.dataNascimento || "");

    if (novoNome && novoEmail && novaSenha) {
        usuarios[index] = {
            nome: novoNome,
            email: novoEmail,
            senha: novaSenha,
            cpf: novoCpf,
            dataNascimento: novaData
        };
        localStorage.setItem("listausuarios", JSON.stringify(usuarios));
        carregarUsuarios();
    } else {
        alert("Todos os campos são obrigatórios.");
    }
}

// Filtrar usuários
function filtrarUsuarios() {
    if (!verificarLogin()) return;
    
    const termo = document.getElementById("searchInput").value.toLowerCase();
    const linhas = document.querySelectorAll("#userTableBody tr");

    linhas.forEach(linha => {
        const nome = linha.children[0].textContent.toLowerCase();
        linha.style.display = nome.includes(termo) ? "" : "none";
    });
}

// Função para fazer logout
function fazerLogout() {
    localStorage.removeItem('usuarioAtual');
    window.location.href = 'login.html';
}

// Iniciar página
window.onload = () => {
    if (verificarLogin()) {
        carregarUsuarios();
    }
};
