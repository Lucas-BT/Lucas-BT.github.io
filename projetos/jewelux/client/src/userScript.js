/* Variáveis Globais */
const Getinfo = JSON.parse(localStorage.getItem('Users')) || []; // Informações dos Utilizadores
const productsStorage = JSON.parse(localStorage.getItem('products')); // Informações dos Produtos
const currentUser = JSON.parse(localStorage.getItem('LoggedInUser')); // Informações do utilizador corrente
const user = Getinfo.find(user => user.id === currentUser.id) || {};

window.onload = function() {
    checkLoginStatus();
    inicializeContent();

    // Eventos para os cliques aos itens do menu
    document.getElementById('M-conta').addEventListener('click', () => {
        changeContent(accContent);
        addClassOnIt('M-conta');
    });
    document.getElementById('M-pedidos').addEventListener('click', () => {
        changeContent(ordersContent);
        addClassOnIt('M-pedidos');
    });
    document.getElementById('M-pagamentos').addEventListener('click', () => {
        changeContent(paymentsContent); 
        addClassOnIt('M-pagamentos');
    });
    document.getElementById('M-preferencias').addEventListener('click', () => {
        changeContent(preferencesContent);
        addClassOnIt('M-preferencias');
    });
    document.getElementById('M-ajuda').addEventListener('click', () => {
        changeContent(helpContent);
        addClassOnIt('M-ajuda');
    });

    aplicarTema(user.tema || 'claro');
}


// Função para verificar o estado do utilizador corrente
function checkLoginStatus() {
    if (currentUser && currentUser.estado === 'on') {
        const userName = currentUser.nome;
        document.getElementById('lg-user').innerHTML = `<a href="./src/pages/account.html">Olá, ${userName}</a>`;
        document.getElementById('userName').innerText = `Olá, ${currentUser.nome}`;
        fillUserInfo(currentUser);
    }
}

function fillUserInfo(user) {
    document.getElementById('nome').value = user.nome;
    document.getElementById('email').value = user.email;
    document.getElementById('nascimento').value = user.nascimento;
}

// Função que efetua o login na conta
function toggleUserPanel() {
    if (currentUser && currentUser.estado === 'on') {
        window.location.href = './src/pages/account.html';
    } else {
        window.location.href = './src/pages/login.html';
    }
}

function UpdateInfo() {
    // Obter os novos valores dos inputs
    const newName = document.getElementById('nome').value;
    const newEmail = document.getElementById('email').value;
    const newBirthday = document.getElementById('nascimento').value;

    // Verifica se os campos existem e não estão vazios
    if (newName && newEmail && newBirthday) {
        
        // Pega as informações do utilizador no localStorage
        let users = JSON.parse(localStorage.getItem('Users')) || [];
        let currentUser = JSON.parse(localStorage.getItem('LoggedInUser'));

        // Verifica se currentUser é válido
        if (!currentUser) {
            alert("Nenhum usuário logado encontrado.");
            return;
        }

        // Encontra o índice do utilizador na lista 'Users'
        const userId = currentUser.id;
        const index = users.findIndex(user => user.id === userId);

        if (index === -1) {
            alert("Usuário não encontrado.");
            return;
        }

        // Atualiza as informações do utilizador com os novos valores
        users[index].nome = newName;
        users[index].email = newEmail;
        users[index].nascimento = newBirthday;

        // Atualiza também o usuário logado
        currentUser.nome = newName;
        currentUser.email = newEmail;
        currentUser.nascimento = newBirthday;

        // Salva as informações atualizadas de volta no localStorage
        localStorage.setItem('Users', JSON.stringify(users));
        localStorage.setItem('LoggedInUser', JSON.stringify(currentUser));

        alert("Alterações salvas com sucesso!");
        window.location.reload();
        
    } else {
        // Se algum dos campos estiver vazio, exibir uma mensagem de erro
        alert("Por favor, preencha todos os campos antes de salvar as alterações.");
    }
}

function Logout(){
    currentUser.estado = 'off';
    localStorage.setItem('LoggedInUser', JSON.stringify(currentUser));
    localStorage.removeItem('LoggedInUser');
    window.location.reload();
    window.location.href = '../../index.html';
}

const accContent = `
    <h2 class="text-xl font-semibold mb-2">Minhas Informações</h2>
    <p class="text-sm text-zinc-600 mb-4">
        Sinta-se à vontade para editar qualquer um dos seus dados abaixo para que sua conta Jewelux esteja totalmente atualizada.
    </p>
    <form id="updateForm">
        <div class="mb-4">
            <label for="nome" class="labelsAcc">Nome:</label>
            <input type="text" id="nome" value="" class="inputsAcc">
        </div>
        <div class="mb-4">
            <label for="email" class="labelsAcc">Email:</label>
            <input type="email" id="email" value="" class="inputsAcc">
        </div>
        <div class="mb-4">
            <label for="nascimento" class="labelsAcc">Data de Nascimento:</label>
            <input type="date" id="nascimento" value="" class="inputsAcc">
        </div>
        <button type="submit" class="btnAlterar" onclick="UpdateInfo()">Salvar Alteração</button>
    </form>
`;

const ordersContent = `
    <h2 class="text-xl font-semibold mb-2">Meus Pedidos</h2>
    <p class="text-sm text-zinc-600 mb-4">Abaixo está a lista de seus pedidos recentes.</p>
    <div id="order-list"></div>
`;

const paymentsContent = `
    <h2 class="text-xl font-semibold mb-2">Métodos de Pagamento</h2>
    <p class="text-sm text-zinc-600 mb-4">Gerencie seus métodos de pagamento aqui.</p>
    <!-- Conteúdo específico para pagamentos -->
`;

const preferencesContent = `
    <h2>Preferências</h2>
    <p>Clique no ícone abaixo para alternar entre o modo claro e escuro.</p>
    <button type="button" class="btnAlterar" onclick="alternarTema()">Modo Escuro <i id="icon-tema" class="fas fa-moon theme-icon"></i></button>
`;

const helpContent = `
    <h2 class="text-xl font-semibold mb-2">Ajuda</h2>
    <p class="text-sm text-zinc-600 mb-4">Como podemos ajudar você?</p>
    <!-- Conteúdo específico para ajuda -->
`;

// Função para alterar o conteúdo da seção
function changeContent(content) {
    document.getElementById('content').innerHTML = content;
    if (content === accContent) {
        checkLoginStatus();
    } else if (content === ordersContent) {
        loadOrders();
    }
}

// Função para adicionar o style 'OnIt' as opções do menu
function addClassOnIt(itemId) {
    const items = document.querySelectorAll('.accMenu ul li');
    items.forEach(item => item.classList.remove('onIt'));
    document.getElementById(itemId).classList.add('onIt');
}

// Função para inicializar o conteúdo da seção
function inicializeContent() {
    changeContent(accContent);
    document.getElementById('M-conta').classList.add('onIt');
}

// Função para carregar as encomendas do utilizador
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem(`delivery_${currentUser.id}`)) || [];
    const orderListDiv = document.getElementById('order-list');

    if (orders.length === 0) {
        orderListDiv.innerHTML = '<p>Você ainda não fez nenhum pedido.</p>';
        return;
    }

    let ordersHtml = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID da Encomenda Pedido</th>
                    <th>Data</th>
                    <th>Nome</th>
                    <th>Morada</th>
                    <th>Produtos</th>
                </tr>
            </thead>
            <tbody>
    `;
    orders.forEach(order => {
        const productsHtml = order.produtos.map(product => {
            const productInfo = productsStorage.find(p => p.id === product.product.id);
            return productInfo ? `${productInfo.nome} (x${product.quantity})` : '';
        }).join(', ');

        ordersHtml += `
            <tr>
                <td>${order.id}</td>
                <td>${formatarData(order.data)}</td>
                <td>${order.nome}</td>
                <td>${order.morada}</td>
                <td>${productsHtml}</td>
            </tr>
        `;
    });

    ordersHtml += `
            </tbody>
        </table>
    `;

    orderListDiv.innerHTML = ordersHtml;
}

// Função para formatar a data no formato dia-mês-ano
function formatarData(data) {
    const dateObj = new Date(data);
    const dia = String(dateObj.getDate()).padStart(2, '0');
    const mes = String(dateObj.getMonth() + 1).padStart(2, '0'); // Mês começa de 0
    const ano = dateObj.getFullYear();
    return `${dia}-${mes}-${ano}`;
}


// Função para alternar o tema
function alternarTema() {
    const temaAtual = document.body.classList.contains('dark-mode') ? 'dark' : 'claro';
    const novoTema = temaAtual === 'claro' ? 'dark' : 'claro';
    aplicarTema(novoTema);
    const userIndex = Getinfo.findIndex(user => user.id === currentUser.id);
    if (userIndex > -1) {
        Getinfo[userIndex].tema = novoTema;
        localStorage.setItem('Users', JSON.stringify(Getinfo));
    }
}

// Função para aplicar o tema
function aplicarTema(tema) {
    if (tema === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('icon-tema').classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('icon-tema').classList.replace('fa-sun', 'fa-moon');
    }
}