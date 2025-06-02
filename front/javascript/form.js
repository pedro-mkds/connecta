function maskTelefone(input) {
    let v = input.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);

    if (v.length <= 10) {
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else {
        v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    }
    input.value = v.trim();
}

function sendWhatsApp(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const problema = document.getElementById('problema').value.trim();
    const statusMsg = document.getElementById('form-status');

    if (!nome || !telefone || !endereco || !numero || !cidade || !problema) {
        statusMsg.style.color = 'red';
        statusMsg.textContent = 'Por favor, preencha todos os campos.';
        return false;
    }

    if (!/^[0-9]{10,}$/.test(telefone.replace(/\D/g, ''))) {
        statusMsg.style.color = 'red';
        statusMsg.textContent = 'Informe um telefone válido com DDD.';
        return false;
    }

    const message =
        `Olá! Meu nome é *${nome}*.\n\n` +
        `*Telefone:* ${telefone}\n` +
        `*Endereço:* ${endereco}, Nº ${numero}\n` +
        `*Cidade:* ${cidade}\n\n` +
        `*Descrição do problema:*\n${problema}`;

    const urlMessage = encodeURIComponent(message);
    const whatsappNumber = '54996040904';
    const url = `https://wa.me/${whatsappNumber}?text=${urlMessage}`;

    // Salva no backend
    const data = { nome, telefone, endereco, numero, cidade, problema };
    fetch('https://connecta-back.onrender.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
        console.log("Dados salvos no backend:", json);
        statusMsg.style.color = 'green';
        statusMsg.textContent = 'Formulário enviado com sucesso!';
    })
    .catch(err => {
        console.error("Erro ao salvar no backend:", err);
        statusMsg.style.color = 'red';
        statusMsg.textContent = 'Erro ao salvar os dados.';
    });

    // Abre o WhatsApp em nova aba
    window.open(url, '_blank');

    return false;
}

function exportarCSV() {
    fetch('https://connecta-back.onrender.com/exportar')
        .then(res => res.json())
        .then(data => {
            alert(data.message); // Exibe a mensagem de sucesso
        })
        .catch(err => {
            alert('Erro ao exportar: ' + err.message);
        });
}
