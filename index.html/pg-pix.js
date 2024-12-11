// Função que será chamada quando o botão for clicado
function mostrarValorTotalPIX() {
    // Recupera os dados salvos do localStorage
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosCarrinho'));

    if (dadosSalvos) {
        const valorTotalComFreteEDesconto = dadosSalvos.valorTotalComFreteEDesconto;

        if (valorTotalComFreteEDesconto) {
            console.log("Valor total com frete e desconto:", valorTotalComFreteEDesconto); // Verifique o valor total

            // Recupera o CEP do input, se disponível
            const inputCEP = document.getElementById("input-cep");
            const cepDestino = inputCEP && inputCEP.value.trim() !== "" ? inputCEP.value.trim() : ""; // Se o CEP estiver vazio, não mostra nada

            // Atualiza o texto do botão com o valor total com frete e desconto e o destino
            const botaoFinalizar = document.getElementById("finalizar-pix"); // Botão correto
            if (botaoFinalizar) {
                // Se o cepDestino estiver vazio, não exibe nada entre parênteses
                if (cepDestino) {
                    botaoFinalizar.textContent = `Finalizar com PIX - R$ ${parseFloat(valorTotalComFreteEDesconto).toFixed(2)} (Destino: ${cepDestino})`;
                } else {
                    botaoFinalizar.textContent = `Finalizar com PIX - R$ ${parseFloat(valorTotalComFreteEDesconto).toFixed(2)}`;
                }
                console.log("Texto do botão atualizado:", botaoFinalizar.textContent); // Verifique o conteúdo do botão
            } else {
                console.error("Botão de finalizar PIX não encontrado.");
            }
        } else {
            console.error("Valor total com frete e desconto não encontrado no localStorage.");
        }
    } else {
        console.error("Dados do carrinho não encontrados no localStorage.");
    }
}


function finalizarComPIX() {
    console.log("Função finalizarComPIX chamada.");
    
    // Recupera os dados do carrinho
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosCarrinho'));
    console.log("Dados salvos no localStorage:", dadosSalvos);

    if (dadosSalvos) {
        const valorTotalComFreteEDesconto = dadosSalvos.valorTotalComFreteEDesconto;

        if (valorTotalComFreteEDesconto) {
            console.log("Valor total encontrado:", valorTotalComFreteEDesconto);

            // Exibe o QR Code
            const qrcodePix = document.getElementById('qrcode-pix');
            if (qrcodePix) {
                qrcodePix.style.display = 'block';
                console.log("QR Code exibido.");
            } else {
                console.error("Elemento QR Code não encontrado.");
            }

            // Redireciona após 5 segundos
            setTimeout(function() {
                console.log("Redirecionando para rastreio.html...");
                window.location.href = 'status.html';
            }, 5000);
            alert('Pagamento realizado com sucesso. Redirecionando para a página de rastreio!');
        } else {
            console.error("Valor total com frete e desconto não encontrado.");
        }
    } else {
        console.error("Dados do carrinho não encontrados no localStorage.");
    }
}
