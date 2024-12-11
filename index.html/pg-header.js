// Redirecionamento para a página inicial
document.getElementById('logo').addEventListener('click', () => window.location.href = 'index.html');


// Redirecionamento de perfil e logout
document.getElementById('link-perfil').addEventListener('click', () => window.location.href = 'perfil.html');
document.getElementById('link-sair').addEventListener('click', () => window.location.href = 'cadastro.html');

// Redireciona para a página sobre
document.getElementById('link-sobre').addEventListener('click', () => window.location.href = "sobre.html");

function displayUserName() {
    // Recupera o nome do cliente do localStorage
    const clienteNome = localStorage.getItem('clienteNome');

    // Verifica se o nome do cliente existe no localStorage
    if (clienteNome) {
        // Se o nome do cliente foi encontrado, exibe-o na página
        const userNameElement = document.getElementById('user-name');
        userNameElement.textContent = `Olá, ${clienteNome}`;
    }

    // Depuração: Verificando se o nome foi recuperado corretamente
    console.log('Nome exibido na header:', clienteNome);
}

// Chama a função quando a página carregar
window.onload = displayUserName;


 // Acessa o campo de pesquisa pelo ID
 const searchInput = document.getElementById("search");

 // Adiciona um listener para o evento de "Enter"
 searchInput.addEventListener("keydown", function(event) {
     // Verifica se a tecla pressionada é "Enter"
     if (event.key === "Enter") {
         const searchTerm = this.value.trim().toLowerCase(); // Captura o termo de pesquisa
 
         // Redireciona baseado no termo de pesquisa
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
         else if (searchTerm === "sac" || "dúvidas") {
            window.location.href = "sac.html";
         }
         else {
             // Fallback para um valor não encontrado
             alert("Termo de pesquisa não encontrado.");
         }
     }
 });
