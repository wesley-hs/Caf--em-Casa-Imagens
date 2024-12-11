// Função para carregar os dados do LocalStorage e atualizar a tabela e os gráficos
function carregarDados() {
    // Recuperar os dados do LocalStorage
    const clienteNome = localStorage.getItem("clienteNome") || "Usuário";
    const dadosCarrinho = JSON.parse(localStorage.getItem("dadosCarrinho"));
    const clienteEmail = localStorage.getItem("clienteEmail");
    const clienteCelular = localStorage.getItem("clienteCelular");
    const compraStatus = localStorage.getItem("compraStatus");
    const cepInserido = localStorage.getItem("cepInserido");

    // Selecionar a tabela de histórico de compras e ganhos totais
    const listaUsuarios = document.getElementById("lista-usuarios");
    const ganhosTotaisElemento = document.getElementById("ganhos-totais");

    // Limpar a tabela antes de preencher
    listaUsuarios.innerHTML = "";

    // Variável para somar os ganhos totais
    let ganhosTotais = 0;

    // Verificar se os dados existem
    if (dadosCarrinho) {
        const { valorTotalComFreteEDesconto, carrinho } = dadosCarrinho;

        // Calcular ganhos totais
        ganhosTotais += parseFloat(valorTotalComFreteEDesconto);

        // Adicionar uma linha na tabela com os dados do usuário e histórico
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${clienteNome}</td>
            <td>${clienteEmail ? clienteEmail : "Email não fornecido"}</td>
            <td>${clienteCelular ? clienteCelular : "Telefone não fornecido"}</td>
            <td>${cepInserido}</td>
            <td>${carrinho.map(item => item.nome).join(", ")}</td>
            <td>R$ ${valorTotalComFreteEDesconto.toFixed(2)}</td>
            <td>${compraStatus === "1" ? "Compra concluída" : "Compra pendente"}</td>
        `;
        listaUsuarios.appendChild(tr);

        // Atualizar gráficos
        const nomesProdutos = carrinho.map(item => item.nome);
        const valoresProdutos = carrinho.map(item => item.preco * item.quantidade);
        atualizarGraficos(clienteNome, valoresProdutos, nomesProdutos);
    } else {
        console.error("Dados do LocalStorage estão incompletos!");
    }

    // Exibir os ganhos totais
    ganhosTotaisElemento.textContent = `Ganhos Totais: R$ ${ganhosTotais.toFixed(2)}`;
}

console.log(localStorage.getItem("clienteEmail"));  // Verifique o email
console.log(localStorage.getItem("clienteCelular")); // Verifique o telefone


  // Função para atualizar gráficos
  function atualizarGraficos(nomeUsuario, valores, nomesProdutos) {
    // Gráfico de gastos do usuário
    const ctx1 = document.getElementById("grafico-gasto-usuarios").getContext("2d");
    new Chart(ctx1, {
        type: "bar",
        data: {
            labels: [nomeUsuario],
            datasets: [{
                label: "Gasto Total (R$)",
                data: [valores.reduce((a, b) => a + b, 0)],
                backgroundColor: "#4E342E",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Gráfico de produtos mais comprados
    const ctx2 = document.getElementById("grafico-produtos-mais-comprados").getContext("2d");
    new Chart(ctx2, {
        type: "pie",
        data: {
            labels: nomesProdutos,
            datasets: [{
                data: valores,
                backgroundColor: ["#8D6E63", "#A1887F", "#D7CCC8"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
        }
    });
  }

  // Função para buscar usuário
  function buscarUsuario() {
    const busca = document.getElementById("busca").value.toLowerCase();
    const listaUsuarios = document.getElementById("lista-usuarios").children;

    Array.from(listaUsuarios).forEach(linha => {
        const textoLinha = linha.textContent.toLowerCase();
        linha.style.display = textoLinha.includes(busca) ? "" : "none";
    });
  }

  // Função para editar usuário
  function editarUsuario() {
    alert("Função de edição em desenvolvimento.");
  }

  // Função para excluir compra
  function excluirCompra() {
    if (confirm("Tem certeza de que deseja excluir esta compra?")) {
        localStorage.clear();
        location.reload();
    }
  }

  // Função para reenviar nota fiscal
  function reenviarNota() {
    alert("Nota fiscal reenviada para o e-mail do cliente.");
  }

  // Função para exportar dados para Excel
  function exportarExcel() {
    const tabela = document.getElementById("lista-usuarios");
    const linhas = tabela.querySelectorAll("tr");

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nome,E-mail,Telefone,Endereço,Produtos,Valor Total,Status\n";

    linhas.forEach(linha => {
        const colunas = linha.querySelectorAll("td");
        const valores = Array.from(colunas).map(celula => celula.textContent);
        csvContent += valores.join(",") + "\n";
    });

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "historico_compras.csv");
    link.click();
  }

  // Função para exportar dados para PDF
  function exportarPDF() {
    const tabela = document.getElementById("tabela");
    const pdf = new jsPDF();

    pdf.text("Histórico de Compras", 10, 10);
    pdf.autoTable({ html: tabela });

    pdf.save("historico_compras.pdf");
  }

  // Inicializar ao carregar a página
  window.onload = carregarDados;