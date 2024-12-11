let currentStatus = 0;

const mensagensStatus = [
    "Pagamento Aprovado",
    "Pedido em Preparo",
    "Pedido Enviado",
    "Pedido Saiu para Entrega",
    "Pedido Entregue"
];

function updateStatus() {
 
    const progressBar = document.getElementById("statusBarProgress");
    const statusElements = document.querySelectorAll(".status div");
    
   
    const progress = (currentStatus + 1) * 20;
    progressBar.style.width = progress + "%";
    

    statusElements.forEach((status, index) => {
        if (index <= currentStatus) {
            status.classList.add("verde");
        } else {
            status.classList.remove("verde");
        }
    });


    const mensagemContainer = document.getElementById("statusMensagem");
    if (mensagemContainer) {
        mensagemContainer.textContent = mensagensStatus[currentStatus];
    }

    
    localStorage.setItem("compraStatus", currentStatus);
}

document.getElementById("btnAvancar").addEventListener("click", () => {
    if (currentStatus < 4) {
        currentStatus++;
        updateStatus();
    } else {
        alert("Pedido já foi entregue!");
    }
});


function displayUserName() {
   
    const clienteNome = localStorage.getItem('clienteNome');

    if (clienteNome) {
       
        const userNameElement = document.getElementById('user-name');
        userNameElement.textContent = `Olá, ${clienteNome}`;
    }

    console.log('Nome exibido na header:', clienteNome);
}


function exibirInformacoesCarrinho() {
  
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

   
    if (carrinho.length > 0) {
       
        const carrinhoContainer = document.createElement('div');
        carrinhoContainer.classList.add('carrinho-container');

      
        carrinho.forEach(item => {
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('carrinho-item');

            
            const imagem = document.createElement('img');
            imagem.src = item.imagem;
            imagem.alt = item.nome;
            imagem.classList.add('imagem-item');

            
            const nome = document.createElement('h3');
            nome.textContent = item.nome;

            
            const quantidade = document.createElement('p');
            quantidade.textContent = `Quantidade: ${item.quantidade}`;

           
            const preco = document.createElement('p');
            preco.textContent = `Preço: R$ ${item.preco.toFixed(2)}`;

            
            itemContainer.appendChild(imagem);
            itemContainer.appendChild(nome);
            itemContainer.appendChild(quantidade);
            itemContainer.appendChild(preco);

            carrinhoContainer.appendChild(itemContainer);
        });

        
        const statusContainer = document.querySelector('.status');
        statusContainer.appendChild(carrinhoContainer);
    } else {
        
        const mensagem = document.createElement('p');
        mensagem.textContent = 'Nenhum item no carrinho.';
        document.querySelector('.status').appendChild(mensagem);
    }
}

window.onload = function() {
    displayUserName();
    exibirInformacoesCarrinho();
    updateStatus(); 
};


function gerarCodigoUnico() {
  
    let codigo = Math.floor(Math.random() * 1000000000000000); 
    let sufixo = String(Math.floor(Math.random() * 100)).padStart(2, '0'); 
    codigo = codigo + '-' + sufixo;

   
    if (localStorage.getItem('codigoPedido') === codigo) {
      
        return gerarCodigoUnico();
    } else {
    
        localStorage.setItem('codigoPedido', codigo);
        return codigo;
    }
}


function exibirCodigoPedido() {
    const codigoPedido = gerarCodigoUnico();
    const elementoCodigo = document.querySelector('.price strong'); 
    elementoCodigo.textContent = `Número do Pedido: ${codigoPedido}`;
}


window.onload = function() {
    displayUserName();
    exibirInformacoesCarrinho();
    updateStatus(); 
    exibirCodigoPedido(); 
};


function calcularDataEntrega() {
    const hoje = new Date();  
    hoje.setDate(hoje.getDate() + 7);  

   
    const dia = String(hoje.getDate()).padStart(2, '0'); 
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');  
    const ano = hoje.getFullYear();

    return `${dia}/${mes}/${ano}`; 
}


function exibirDataEntrega() {
    const dataEntrega = calcularDataEntrega();
    const elementoDataEntrega = document.querySelector('.price + .price');  
    elementoDataEntrega.innerHTML = `<strong>Prazo de Entrega:</strong> ${dataEntrega}`;
}


window.onload = function() {
    displayUserName();
    exibirInformacoesCarrinho();
    updateStatus(); 
    exibirCodigoPedido(); 
    exibirDataEntrega();  
};


document.getElementById('logo').addEventListener('click', () => window.location.href = 'index.html');


const searchInput = document.getElementById("search");

searchInput.addEventListener("keydown", function(event) {
  
    if (event.key === "Enter") {
        const searchTerm = this.value.trim().toLowerCase(); 

        
        if (searchTerm === "cadastro") {
            window.location.href = "cadastro.html";
        } 
        else if (searchTerm === "login") {
            window.location.href = "login.html";
        }
        else if (searchTerm === "rastreio" || searchTerm === "status") {
            window.location.href = "status.html";
        }
        else if (searchTerm === "carrinho") {
            window.location.href = "carrinho.html";
        }
        else if (searchTerm === "sobre" || searchTerm === "comentário") {
            window.location.href = "sobre.html";
        }
        else if (searchTerm === "perfil") {
            window.location.href = "perfil.html";
        }
        else if (searchTerm === "pagamento") {
            window.location.href = "pagamento.html";
        }
        else if (searchTerm === "sac" || searchTerm === "dúvidas") {
            window.location.href = "sac.html";
        }
        else {
            
            alert("Termo de pesquisa não encontrado.");
        }
    }
});
