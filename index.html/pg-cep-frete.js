document.getElementById("calcular-frete").addEventListener("click", function () {
    const cep = document.getElementById("cep-destino").value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Verificar se o CEP tem 8 caracteres
    if (cep.length === 8) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        // Fazer requisição à API
        fetch(url)
            .then(response => response.json()) // Parse do JSON
            .then(data => {
                if (data.erro) {
                    // Se houver erro (CEP inválido)
                    document.getElementById("erro-cep").style.display = 'block';
                    document.getElementById("resultado-cep").style.display = 'none';
                } else {
                    // Exibir resultados (cidade e estado)
                    document.getElementById("erro-cep").style.display = 'none';
                    document.getElementById("resultado-cep").style.display = 'block';
                    document.getElementById("cidade").innerText = data.localidade; // Cidade
                    document.getElementById("estado").innerText = data.uf; // Estado

                    // Salvar o CEP no LocalStorage
                    localStorage.setItem("cepInserido", cep);
                    console.log(`CEP ${cep} salvo no LocalStorage.`);
                }
            })
            .catch(error => {
                // Caso haja algum erro na requisição
                console.error('Erro na requisição:', error);
                document.getElementById("erro-cep").style.display = 'block';
                document.getElementById("resultado-cep").style.display = 'none';
            });
    } else {
        // Se o CEP não tiver 8 caracteres
        document.getElementById("erro-cep").style.display = 'block';
        document.getElementById("resultado-cep").style.display = 'none';
    }
});

// Função para calcular o valor do frete
function calcularFrete(estado) {
    // Se o estado for SP, o frete é grátis
    if (estado === "SP") {
        return 0;
    } else {
        // Para outros estados, vamos usar uma lógica simples
        // Quanto mais distante de SP, mais caro o frete
        return 30 + Math.floor(Math.random() * 20); // Valor aleatório para simular
    }
}

// Mostrar o valor do frete selecionado
document.querySelectorAll('input[name="frete"]').forEach(input => {
    input.addEventListener('change', function () {
        const valorSelecionado = this.value;

        if (valorSelecionado === "0") {
            document.getElementById("valor-frete").innerText = "Frete Grátis!";
        } else {
            document.getElementById("valor-frete").innerText = `Valor do frete: R$ ${valorSelecionado}`;
        }
    });
});

// Recuperar o CEP salvo ao carregar a página
window.onload = function () {
    const cepSalvo = localStorage.getItem("cepInserido");
    if (cepSalvo) {
        document.getElementById("cep-destino").value = cepSalvo; // Preencher o campo com o CEP salvo
        console.log(`CEP recuperado do LocalStorage: ${cepSalvo}`);
    }
};
