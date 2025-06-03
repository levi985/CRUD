document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cepInput');
    const consultarBtn = document.getElementById('consultarCep');
    const enderecoCard = document.getElementById('enderecoCard');
    const enderecoInfo = document.getElementById('enderecoInfo');
    const historicoList = document.getElementById('historicoList');
    
    let historico = JSON.parse(localStorage.getItem('historicoCep')) || [];
    
    carregarHistorico();
    
    consultarBtn.addEventListener('click', consultarCEP);
    cepInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') consultarCEP();
    });
    
    function consultarCEP() {
        const cep = cepInput.value.replace(/\D/g, '');
        
        if (cep.length !== 8) {
            alert('CEP deve conter 8 dígitos');
            return;
        }
        
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    enderecoCard.style.display = 'none';
                    alert('CEP não encontrado');
                } else {
                    exibirEndereco(data);
                    adicionarAoHistorico(data);
                }
            })
            .catch(() => {
                alert('Erro ao consultar CEP');
            });
    }
    
    function exibirEndereco(data) {
        enderecoInfo.innerHTML = `
            <p><strong>CEP:</strong> ${data.cep || 'Não informado'}</p>
            <p><strong>Logradouro:</strong> ${data.logradouro || 'Não informado'}</p>
            <p><strong>Complemento:</strong> ${data.complemento || 'Não informado'}</p>
            <p><strong>Bairro:</strong> ${data.bairro || 'Não informado'}</p>
            <p><strong>Cidade:</strong> ${data.localidade || 'Não informado'}</p>
            <p><strong>Estado:</strong> ${data.uf || 'Não informado'}</p>
            <p><strong>IBGE:</strong> ${data.ibge || 'Não informado'}</p>
            <p><strong>DDD:</strong> ${data.ddd || 'Não informado'}</p>
        `;
        enderecoCard.style.display = 'block';
    }
    
    function adicionarAoHistorico(data) {
        historico = historico.filter(item => item.cep !== data.cep);
        historico.unshift(data);
        
        if (historico.length > 5) {
            historico = historico.slice(0, 5);
        }
        
        localStorage.setItem('historicoCep', JSON.stringify(historico));
        carregarHistorico();
    }
    
    function carregarHistorico() {
        if (historico.length === 0) {
            historicoList.innerHTML = '<p>Nenhuma consulta recente</p>';
            return;
        }
        
        historicoList.innerHTML = historico.map(item => `
            <div class="historico-item">
                <p><strong>${item.cep}</strong> - ${item.logradouro || ''}, ${item.bairro || ''}</p>
                <button onclick="consultarNovamente('${item.cep}')">Consultar novamente</button>
            </div>
        `).join('');
    }
    
    window.consultarNovamente = function(cep) {
        cepInput.value = cep;
        consultarCEP();
    };
});