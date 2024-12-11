document.addEventListener('DOMContentLoaded', () => {
    const rastrearBtn = document.getElementById('rastrear-btn');
    const codigoRastreioInput = document.getElementById('codigo-rastreio');
    const resultadoRastreio = document.querySelector('#resultado-rastreio');

    // Quando o botão de rastrear for clicado
    rastrearBtn.addEventListener('click', () => {
        const idCompra = codigoRastreioInput.value.trim();

        // Verifica se o ID foi inserido
        if (idCompra) {
            const dadosPagamento = JSON.parse(localStorage.getItem('dadosPagamento'));

            // Verifica se o ID da compra corresponde ao que está armazenado
            if (dadosPagamento && dadosPagamento.idCompra === idCompra) {
                // Exibe os dados dos produtos
                let htmlConteudo = '<h2>Produtos Comprados:</h2>';
                
                dadosPagamento.carrinho.forEach(item => {
                    htmlConteudo += `
                        <div class="item-pedido">
                            <p><strong>Produto:</strong> ${item.nome}</p>
                            <p><strong>Preço:</strong> R$ ${item.preco.toFixed(2)}</p>
                            <p><strong>Quantidade:</strong> ${item.quantidade}</p>
                            <hr>
                        </div>
                    `;
                });

                // Exibe os produtos
                resultadoRastreio.innerHTML = htmlConteudo;

                // Cálculos finais (incluindo desconto e frete)
                const totalItens = dadosPagamento.carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
                const desconto = parseFloat(localStorage.getItem('desconto')) || 0;
                const valorComDesconto = totalItens * (1 - desconto);
                const valorFrete = parseFloat(localStorage.getItem('valorFrete')) || 0;
                const valorTotal = valorComDesconto + valorFrete;

                const valorTotalElement = `
                    <div class="resumo-pedido">
                        <p><strong>Total dos Itens:</strong> R$ ${totalItens.toFixed(2)}</p>
                        <p><strong>Desconto Aplicado:</strong> R$ ${desconto > 0 ? (totalItens - valorComDesconto).toFixed(2) : 'R$ 0,00'}</p>
                        <p><strong>Frete:</strong> R$ ${valorFrete.toFixed(2)}</p>
                        <p><strong>Valor Total a Pagar:</strong> R$ ${valorTotal.toFixed(2)}</p>
                    </div>
                `;
                
                // Exibe o valor total (com frete e desconto)
                resultadoRastreio.innerHTML += valorTotalElement;
            } else {
                resultadoRastreio.innerHTML = '<p>Compra não encontrada. Verifique o ID de rastreio.</p>';
            }
        } else {
            resultadoRastreio.innerHTML = '<p>Por favor, insira o código de rastreio.</p>';
        }
    });
});
