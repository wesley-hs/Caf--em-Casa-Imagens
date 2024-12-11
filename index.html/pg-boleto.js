// Função para exibir o valor total no botão de boleto
function mostrarValorTotalBoleto() {
    console.log("Função mostrarValorTotalBoleto chamada.");
    // Recupera os dados salvos do localStorage
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosCarrinho'));

    if (dadosSalvos) {
        const valorTotalComFreteEDesconto = dadosSalvos.valorTotalComFreteEDesconto;

        if (valorTotalComFreteEDesconto) {
            // Atualiza o texto do botão com o valor total
            const botaoFinalizar = document.getElementById('finalizar-boleto');
            if (botaoFinalizar) {
                botaoFinalizar.textContent = `Finalizar com Boleto - R$ ${parseFloat(valorTotalComFreteEDesconto).toFixed(2)}`;
                console.log("Texto do botão atualizado:", botaoFinalizar.textContent);
            } else {
                console.error("Botão de finalizar não encontrado.");
            }
        } else {
            console.error("Valor total com frete e desconto não encontrado no localStorage.");
        }
    } else {
        console.error("Dados do carrinho não encontrados no localStorage.");
    }
}

// Função que será chamada ao clicar no botão "Finalizar com Boleto"
function finalizarComBoleto() {
    console.log("Função finalizarComBoleto chamada.");
    // Recupera os dados do carrinho do LocalStorage
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosCarrinho'));

    if (dadosSalvos) {
        const valorTotalComFreteEDesconto = dadosSalvos.valorTotalComFreteEDesconto;

        if (valorTotalComFreteEDesconto) {
            // Exibe o código de barras
            const codigoBarras = document.getElementById('codigo-barras');
            if (codigoBarras) {
                codigoBarras.style.display = 'block'; // Exibe o código de barras
                console.log('Código de barras exibido');
            } else {
                console.error('Elemento do código de barras não encontrado.');
            }

            // Exibe uma mensagem de confirmação no console ou na tela
            console.log('Boleto gerado com sucesso!');

            // Após 5 segundos, redireciona para a página de rastreio
            setTimeout(function() {
                window.location.href = 'status.html';
            }, 5000); // 5 segundos
        } alert('Pagamento realizado com suceso. Redirecionando para a página de rastreio!')
}}
