function verificarSenha() {
    const senha = document.getElementById('senha').value;

    fetch('https://connecta-back.onrender.com/validar_senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha })
    })
    .then(res => res.json())
    .then(data => {
        if (data.acesso) {
            document.getElementById('painel').style.display = 'block';
        } else {
            alert('Senha incorreta');
        }
    })
    .catch(() => {
        alert('Erro ao validar senha');
    });
}

function exportar() {
    fetch('https://connecta-back.onrender.com/exportar')
        .then(res => res.json())
        .then(data => {
            document.getElementById('status').textContent = data.message;

            if (data.dados) {
                const tabela = document.createElement('table');
                const thead = tabela.createTHead();
                const headerRow = thead.insertRow();

                Object.keys(data.dados[0]).forEach(chave => {
                    const th = document.createElement('th');
                    th.textContent = chave;
                    headerRow.appendChild(th);
                });

                const tbody = tabela.createTBody();
                data.dados.forEach(linha => {
                    const row = tbody.insertRow();
                    Object.values(linha).forEach(valor => {
                        const cell = row.insertCell();
                        cell.textContent = valor;
                    });
                });

                const tabelaDiv = document.getElementById('tabela');
                tabelaDiv.innerHTML = '';
                tabelaDiv.appendChild(tabela);
            }
        })
        .catch(() => {
            document.getElementById('status').textContent = 'Erro ao carregar os dados.';
        });
}

function converter() {
    fetch('https://connecta-back.onrender.com/converter', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
            document.getElementById('status').textContent = data.message;
        })
        .catch(() => {
            document.getElementById('status').textContent = 'Erro ao converter dados.';
        });
}
