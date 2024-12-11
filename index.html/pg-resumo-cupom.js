document.addEventListener("DOMContentLoaded", function () {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const valorFrete = document.getElementById("valor-frete");
    const valorTotal = document.getElementById("valor-total");
    const valorItens = document.getElementById("valor-itens");
    const valorPrazoFrete = document.getElementById("prazo-frete");
    const freteGratisRadio = document.getElementById("gratis");
    const freteSedexRadio = document.getElementById("sedex");
    const fretePacRadio = document.getElementById("pac");
    const codigoCupom = document.getElementById("codigo-cupom");
    const aplicarCupomBtn = document.getElementById("aplicar-cupom");
    const inputCEP = document.getElementById("input-cep");


    document.addEventListener("DOMContentLoaded", function () {
        const inputCEP = document.getElementById("input-cep");
        const valorPrazoFrete = document.getElementById("prazo-frete");
    
        // Função para calcular o prazo de entrega com base no CEP
        function calcularPrazoEntrega(cep) {
            if (!cep || cep.length < 8) {
                return "Insira um CEP válido.";
            }
    
            const primeirosDigitos = cep.slice(0, 2); // Os dois primeiros dígitos do CEP
    
            // Exemplo de prazos por região
            switch (primeirosDigitos) {
                case "01": case "02": case "03": case "04": case "05": case "06": case "07": case "08": case "09": case "10": 
                case "11": case "12": case "13": case "14": case "15": case "16": case "17": case "18": case "19": 
                    return "3 a 5 dias úteis"; // Regiões próximas ao estado de SP
                case "20": case "21": case "22": case "23": case "24": 
                    return "5 a 7 dias úteis"; // Estado do RJ
                case "30": case "31": case "32": case "33": case "34": 
                    return "5 a 7 dias úteis"; // Estado de MG
                case "40": case "41": case "42": case "43": case "44": 
                    return "7 a 10 dias úteis"; // Estado da BA
                case "50": case "51": case "52": case "53": case "54": case "55":
                    return "7 a 12 dias úteis"; // Estados do Centro-Oeste
                case "60": case "61": case "62": case "63": case "64": 
                    return "10 a 15 dias úteis"; // Norte e Nordeste
                case "70": case "71": case "72": case "73": case "74": 
                    return "10 a 15 dias úteis"; // DF e arredores
                case "90": case "91": case "92": case "93": case "94": 
                    return "10 a 15 dias úteis"; // Região Sul
                default:
                    return "Prazo de entrega não disponível para essa região."; // Para CEPs não mapeados
            }
        }
    
        // Função para atualizar o prazo de entrega
        function atualizarPrazoEntrega() {
            const cep = inputCEP.value.trim();
            const prazo = calcularPrazoEntrega(cep);
            valorPrazoFrete.innerText = prazo;
        }
    
        // Adiciona evento ao campo CEP
        inputCEP.addEventListener('input', atualizarPrazoEntrega);
    
        // Atualiza o prazo ao carregar a página (se o CEP estiver preenchido)
        if (inputCEP.value.trim()) {
            atualizarPrazoEntrega();
        }
    });

    // Função para calcular o valor total dos itens no carrinho
    function calcularValorItens() {
        let valorTotalItens = 0;
        carrinho.forEach(item => {
            valorTotalItens += item.preco * item.quantidade;
        });
        return valorTotalItens;
    }

    // Função para calcular o valor do frete
    function calcularFrete() {
        const valorItensTotal = calcularValorItens();

        if (valorItensTotal >= 200) {
            // Frete grátis disponível
            freteGratisRadio.disabled = false;
            freteSedexRadio.disabled = true;
            fretePacRadio.disabled = true;
            freteGratisRadio.checked = true;
            valorPrazoFrete.innerText = calcularPrazoFreteGratis();
            return 0;
        } else {
            // Frete grátis não disponível
            freteGratisRadio.disabled = true;
            freteSedexRadio.disabled = false;
            fretePacRadio.disabled = false;
            valorPrazoFrete.innerText = "7 a 15 dias úteis";  // Exemplo de prazo para PAC e SEDEX
            const freteSelecionado = document.querySelector('input[name="frete"]:checked');
            return freteSelecionado ? parseFloat(freteSelecionado.value) : 0;
        }
    }

    // Função para calcular o prazo de entrega do frete grátis com base no CEP
    function calcularPrazoFreteGratis() {
        const cep = inputCEP ? inputCEP.value.trim() : "";
        if (cep) {
            // A lógica pode ser adaptada para mais critérios, mas vamos assumir que SP é rápido e estados mais distantes mais lentos
            const estado = cep.slice(0, 2);  // Pegando o primeiro dois números do CEP para indicar o estado
            if (estado === "11" || estado === "12" || estado === "13" || estado === "14" || estado === "15" || estado === "16" || estado === "17" || estado === "18" || estado === "19") {
                return "3 a 4 dias úteis";  // Exemplo de prazo mais rápido para SP e proximidades
            } else {
                return "7 a 10 dias úteis";  // Prazo mais longo para estados mais distantes
            }
        }
        return ""; // Se o CEP não estiver informado, retorna vazio
    }

    // Função para aplicar o cupom de desconto
    function aplicarCupom() {
        const cupom = codigoCupom.value.trim().toLowerCase();
        let desconto = 0;

        // Exemplo: Cupom de 10% de desconto
        if (cupom === "desconto10") {
            desconto = 0.1; // 10% de desconto
            alert("Desconto de 10% aplicado!");
        } else {
            alert("Cupom inválido");
        }

        const valorTotalItens = calcularValorItens();
        const valorFreteCalculado = calcularFrete();
        const totalComDesconto = valorTotalItens + valorFreteCalculado - (valorTotalItens * desconto);

        // Atualizando o total com desconto
        valorTotal.innerText = `R$ ${totalComDesconto.toFixed(2)}`;

        // Salvar no localStorage com o valor total com frete e desconto
        salvarDadosNoLocalStorage(valorTotalItens, valorFreteCalculado, totalComDesconto, desconto, valorPrazoFrete.innerText);
        
        // Salvar o valor total final com desconto também fora do carrinho
        localStorage.setItem('valorTotalComFreteEDesconto', totalComDesconto.toFixed(2));
    }

    // Função para salvar os dados no localStorage
    function salvarDadosNoLocalStorage(valorItensTotal, valorFreteCalculado, valorTotalComDesconto, desconto, prazoFrete) {
        const dadosCarrinho = {
            valorItens: valorItensTotal,
            valorFrete: valorFreteCalculado,
            valorTotal: valorItensTotal + valorFreteCalculado,  // Total sem desconto
            valorTotalComFreteEDesconto: valorTotalComDesconto, // Total com desconto
            desconto: desconto,
            prazoFrete: prazoFrete,
            carrinho: carrinho.map(item => ({
                ...item,
                valorTotalComFreteEDesconto: valorTotalComDesconto // Salva o valor total com frete e desconto dentro de cada item
            })), // Salva o carrinho completo (itens e quantidades)
        };
        localStorage.setItem('dadosCarrinho', JSON.stringify(dadosCarrinho));
    }

    // Função para atualizar o resumo do pedido
    function atualizarResumoCarrinho() {
        const valorItensTotal = calcularValorItens();
        valorItens.innerText = `R$ ${valorItensTotal.toFixed(2)}`;

        // Calculando o frete
        const valorFreteCalculado = calcularFrete();

        // Atualiza o valor do frete
        valorFrete.innerText = `R$ ${valorFreteCalculado.toFixed(2)}`;

        // Calcula o valor total (itens + frete)
        const total = valorItensTotal + valorFreteCalculado;
        valorTotal.innerText = `R$ ${total.toFixed(2)}`;

        // Salvar no localStorage sem desconto inicial
        salvarDadosNoLocalStorage(valorItensTotal, valorFreteCalculado, total, valorPrazoFrete.innerText); // Sem desconto inicial
    }

    // Chama a função para atualizar o resumo do carrinho ao carregar a página
    atualizarResumoCarrinho();

    // Adiciona evento de mudança nos inputs de frete
    const freteOpcoes = document.querySelectorAll('input[name="frete"]');
    freteOpcoes.forEach(freteOpcao => {
        freteOpcao.addEventListener('change', atualizarResumoCarrinho);
    });

    // Adiciona evento para aplicar o cupom de desconto
    aplicarCupomBtn.addEventListener('click', aplicarCupom);

    // Recuperar dados salvos do localStorage ao carregar a página
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosCarrinho'));
    if (dadosSalvos) {
        valorItens.innerText = `R$ ${dadosSalvos.valorItens.toFixed(2)}`;
        valorFrete.innerText = `R$ ${dadosSalvos.valorFrete.toFixed(2)}`;
        valorTotal.innerText = `R$ ${dadosSalvos.valorTotal.toFixed(2)}`;
        valorPrazoFrete.innerText = dadosSalvos.prazoFrete;
        codigoCupom.value = dadosSalvos.desconto > 0 ? "desconto10" : ""; // Exemplo de cupom, se houver

        // Atualiza o botão de pagamento com o valor total final com frete e desconto
        const botaoFinalizar = document.getElementById("finalizar-cartão");
        if (botaoFinalizar) {
            const valorFinalComFreteEDesconto = localStorage.getItem("valorTotalComFreteEDesconto") || dadosSalvos.valorTotal;
            botaoFinalizar.textContent = `Finalizar com Cartão - R$ ${valorFinalComFreteEDesconto.toFixed(2)}`;
        }
    }
});


