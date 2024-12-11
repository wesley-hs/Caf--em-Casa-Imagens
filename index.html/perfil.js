// Redireciona para a página inicial
document.getElementById('logo').addEventListener('click', () => window.location.href = 'index.html');

// Redireciona para a página SAC
document.getElementById('link-sac').addEventListener('click', () => window.location.href = "sac.html");

// redireciona para a página sobre
document.getElementById('link-sobre').addEventListener('click', () => window.location.href = "sobre.html");

document.getElementById('mudar-senha').addEventListener('click', mostrarAlteracaoSenha);

function mostrarAlteracaoSenha(event) {
    event.preventDefault(); // Evita que o link recarregue a página
    const alterarSenhaSection = document.querySelector('.alteracao-senha');
    alterarSenhaSection.classList.remove('hidden'); // Remove a classe "hidden" para mostrar a seção
}


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

// Função para exibir a seção de alteração de senha
function mostrarAlteracaoSenha(event) {
    event.preventDefault(); // Evita que o link recarregue a página
    const alterarSenhaSection = document.querySelector('.alteracao-senha');
    alterarSenhaSection.classList.remove('hidden'); // Remove a classe "hidden" para mostrar a seção
}

// Função para salvar informações pessoais
function salvarInformacoes(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    // Capturar os valores dos campos
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Verificar se algum campo está vazio
    if (!nome || !cpf || !email || !telefone || !endereco || !senha) {
        alert("Todos os campos devem ser preenchidos!");
        return;
    }

    // Salvar informações no localStorage
    const clienteInfo = { nome, cpf, email, telefone, endereco, senha };
    localStorage.setItem('cliente', JSON.stringify(clienteInfo));
    alert("Suas informações foram salvas com sucesso!");
}

// Função para salvar nova senha
function salvarSenha(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    // Capturar as senhas do formulário
    const senhaAtual = document.getElementById('senha_atual').value.trim();
    const novaSenha = document.getElementById('nova_senha').value.trim();
    const confirmarNovaSenha = document.getElementById('confirmar_nova_senha').value.trim();

    // Recuperar informações do cliente do localStorage
    const cliente = JSON.parse(localStorage.getItem('cliente'));

    // Verificar se a senha atual está correta
    if (cliente?.senha !== senhaAtual) {
        alert("A senha atual está incorreta!");
        return;
    }

    // Verificar se as novas senhas coincidem
    if (novaSenha !== confirmarNovaSenha) {
        alert("A nova senha e a confirmação não coincidem!");
        return;
    }

    // Atualizar a senha no localStorage
    cliente.senha = novaSenha;
    localStorage.setItem('cliente', JSON.stringify(cliente));
    alert("Senha salva com sucesso!");
}

// Adicionando eventos para os botões
document.querySelector('.alteracao-dados-pessoais form').addEventListener('submit', salvarInformacoes);
document.querySelector('.alteracao-senha form').addEventListener('submit', salvarSenha);

// Evento para o link de mudar a senha
document.getElementById('mudar-senha').addEventListener('click', mostrarAlteracaoSenha);



