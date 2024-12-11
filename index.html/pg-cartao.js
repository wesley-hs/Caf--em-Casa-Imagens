// Função para mostrar valor total do pagamento com cartão
function mostrarValorTotal() {
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosCarrinho'));

    if (dadosSalvos) {
        const valorTotalComFreteEDesconto = dadosSalvos.valorTotalComFreteEDesconto;

        if (valorTotalComFreteEDesconto !== undefined) {
            console.log("Valor total com frete e desconto:", valorTotalComFreteEDesconto);

            const inputCEP = document.getElementById("input-cep");
            const cepDestino = inputCEP && inputCEP.value.trim() !== "" ? inputCEP.value.trim() : ""; 

            const botaoFinalizar = document.getElementById("finalizar-cartao");
            if (botaoFinalizar) {
                if (cepDestino) {
                    botaoFinalizar.textContent = `Finalizar com Cartão - R$ ${parseFloat(valorTotalComFreteEDesconto).toFixed(2)} (Destino: ${cepDestino})`;
                } else {
                    botaoFinalizar.textContent = `Finalizar com Cartão - R$ ${parseFloat(valorTotalComFreteEDesconto).toFixed(2)}`;
                }
                console.log("Texto do botão atualizado:", botaoFinalizar.textContent);
            }
        }
    }
}

// Função para mostrar valor total do pagamento com PIX
function mostrarValorTotalPIX() {
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosCarrinho'));

    if (dadosSalvos) {
        const valorTotalComFreteEDesconto = dadosSalvos.valorTotalComFreteEDesconto;

        if (valorTotalComFreteEDesconto !== undefined) {
            console.log("Valor total com frete e desconto:", valorTotalComFreteEDesconto);

            const inputCEP = document.getElementById("input-cep");
            const cepDestino = inputCEP && inputCEP.value.trim() !== "" ? inputCEP.value.trim() : ""; 

            const botaoFinalizar = document.getElementById("finalizar-pix");
            if (botaoFinalizar) {
                if (cepDestino) {
                    botaoFinalizar.textContent = `Finalizar com PIX - R$ ${parseFloat(valorTotalComFreteEDesconto).toFixed(2)} (Destino: ${cepDestino})`;
                } else {
                    botaoFinalizar.textContent = `Finalizar com PIX - R$ ${parseFloat(valorTotalComFreteEDesconto).toFixed(2)}`;
                }
                console.log("Texto do botão atualizado:", botaoFinalizar.textContent);
            }
        }
    }
}



document.getElementById("nome-cartao").addEventListener("input", function () {
    // Converte o texto para letras maiúsculas automaticamente
    this.value = this.value.toUpperCase();
});

// Função para validar o nome
function validarNome() {
    const nome = document.getElementById("nome-cartao").value;

    // Verifica se o nome contém apenas letras e espaços (sem números)
    const regex = /^[A-Z\s]+$/;

    if (!regex.test(nome)) {
        alert("O nome só pode conter letras e espaços. Não são permitidos números.");
        return false;
    }

    // Verifica se o nome tem pelo menos dois nomes (palavras)
    const nomeCompleto = nome.trim().split(" ");
    if (nomeCompleto.length < 2) {
        alert("O nome completo deve ter pelo menos dois nomes.");
        return false;
    }

    return true;
}

// Adicionando evento de validação ao botão
document.getElementById("finalizar-cartao").addEventListener("click", function (event) {
    if (!validarNome()) {
        event.preventDefault(); // Impede o envio do formulário se a validação falhar
    }
});


// Função para aplicar a máscara de entrada para o número do cartão
function aplicarMascaraCartao(event) {
    const campo = event.target;
    let valor = campo.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
    if (valor.length <= 4) {
        campo.value = valor;
    } else if (valor.length <= 8) {
        campo.value = valor.replace(/(\d{4})(\d{0,4})/, '$1 $2');
    } else if (valor.length <= 12) {
        campo.value = valor.replace(/(\d{4})(\d{4})(\d{0,4})/, '$1 $2 $3');
    } else {
        campo.value = valor.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, '$1 $2 $3 $4');
    }
}

// Função para validar o número do cartão (16 dígitos, separados por 4 blocos de 4)
function validarNumeroCartao() {
    const numeroCartao = document.getElementById("numero-cartao").value;

    // Expressão regular para verificar se o número está no formato correto (4 blocos de 4 dígitos)
    const regex = /^\d{4} \d{4} \d{4} \d{4}$/;

    if (!regex.test(numeroCartao)) {
        alert("O número do cartão deve ser composto por 16 dígitos, separados por espaços.");
        return false;
    }

    return true;
}

// Adicionando o evento de input para a máscara no campo do número do cartão
document.getElementById("numero-cartao").addEventListener("input", aplicarMascaraCartao);

// Adicionando evento de validação ao botão de finalizar pagamento
document.getElementById("finalizar-cartao").addEventListener("click", function (event) {
    if (!validarNumeroCartao()) {
        event.preventDefault(); // Impede o envio do formulário se a validação falhar
    }
});


// Validação da validade 
document.getElementById("validade").addEventListener("input", function(e) {
    let input = e.target.value;

    // Remove qualquer caractere não numérico
    input = input.replace(/\D/g, "");

    // Adiciona a barra "/" entre o mês e o ano, se necessário
    if (input.length > 2) {
        input = input.slice(0, 2) + "/" + input.slice(2, 4);
    }

    // Limita a entrada a no máximo 5 caracteres (MM/AA)
    if (input.length > 5) {
        input = input.slice(0, 5);
    }

    e.target.value = input; // Atualiza o valor do campo
});


// Validadção CVV
document.getElementById('cvv-cartao').addEventListener('input', function(e) {
    let cvv = e.target.value;

    // Remove qualquer caractere não numérico
    cvv = cvv.replace(/\D/g, '');

    // Limita a entrada a 3 dígitos
    if (cvv.length > 3) {
        cvv = cvv.slice(0, 3);
    }

    e.target.value = cvv;
});


document.getElementById("parcelamento").addEventListener("change", function() {
    const parcelamento = this.value;
    
    if (parcelamento === "") {
        alert("Por favor, selecione o parcelamento.");
    } else {
        console.log("Parcelamento selecionado:", parcelamento);
        // Aqui você pode adicionar outras lógicas, como calcular o valor total com base no parcelamento
    }
});


document.getElementById("finalizar-cartao").addEventListener("click", function() {
    // Verificar nome
    const nomeCartao = document.getElementById("nome-cartao").value.trim();
    const numeroCartao = document.getElementById("numero-cartao").value.trim();
    const validade = document.getElementById("validade").value.trim();
    const cvv = document.getElementById("cvv-cartao").value.trim();
    const parcelamento = document.getElementById("parcelamento").value;
    
    // Validar nome (letras maiúsculas e sem números)
    const nomeValido = /^[A-Z\s]+$/.test(nomeCartao) && nomeCartao.split(" ").length >= 2;
    
    // Validar número do cartão (16 dígitos, formato 4-4-4-4)
    const numeroValido = /^[0-9]{4}([ ]?)[0-9]{4}([ ]?)[0-9]{4}([ ]?)[0-9]{4}$/.test(numeroCartao);
    
    // Validar validade do cartão (MM/AAAA, não deve ser uma data vencida)
    const validadeValida = /^(0[1-9]|1[0-2])\/\d{2}$/.test(validade);
    const dataValidade = new Date("20" + validade.slice(-2), validade.slice(0, 2) - 1);
    const dataAtual = new Date();
    const validadeCorreta = dataValidade > dataAtual;
    
    // Validar CVV (3 dígitos)
    const cvvValido = /^[0-9]{3}$/.test(cvv);
    
    // Validar parcelamento (não pode ser "Escolha")
    const parcelamentoValido = parcelamento !== "";

    // Se tudo estiver correto, mostrar sucesso; caso contrário, erro.
    if (nomeValido && numeroValido && validadeValida && validadeCorreta && cvvValido && parcelamentoValido) {
        alert("Pagamento realizado com sucesso!");

        // Redirecionar para a página de rastreio após 3 segundos
        setTimeout(function() {
            window.location.href = "status.html";
        }, 3000);// 3000 milissegundos = 3 segundos
    } else {
        let mensagemErro = "Por favor, corrija os seguintes erros:\n";
        
        if (!nomeValido) mensagemErro += "- Nome inválido (deve ter pelo menos dois nomes e só conter letras maiúsculas e espaços).\n";
        if (!numeroValido) mensagemErro += "- Número do cartão inválido (deve ser no formato 4-4-4-4, com 16 dígitos).\n";
        if (!validadeValida) mensagemErro += "- Validade inválida (deve ser no formato MM/AAAA).\n";
        if (!validadeCorreta) mensagemErro += "- O cartão está vencido.\n";
        if (!cvvValido) mensagemErro += "- CVV inválido (deve ter 3 dígitos).\n";
        if (!parcelamentoValido) mensagemErro += "- Por favor, selecione o parcelamento.\n";
        
        alert(mensagemErro);
    }
});



