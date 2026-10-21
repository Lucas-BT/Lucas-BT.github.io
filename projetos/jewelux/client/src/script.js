/* Variaveis Globais */
const Getinfo = JSON.parse(localStorage.getItem('Users')) || []; // Informações do Utilizador
const GetAdmininfo = JSON.parse(localStorage.getItem('admin')) || []; // Informações do Utilizador
const productsStorage = JSON.parse(localStorage.getItem('products')); // Informações dos Produtos
const currentUser = JSON.parse(localStorage.getItem('LoggedInUser'));
const productSelected = JSON.parse(localStorage.getItem('productSelected'));

/* Informações do Utilizador Administrador */
const adminEmail = "admin@admin.com";
const adminPass = "Admin123!";
const adminNome = "Lukeny";


window.onload = function() {
    checkLoginStatus();

/* ----------------PRODUTOS---------------- */
    const products = [
        {
            id: 1,
            nome: "Anel Ciclo em Prata Dourada",
            imagem: "/projetos/jewelux/client/img/anel-ciclo.png",
            material: "Prata",
            categoria: "Mulher",
            preco: 50.00,
            descricao: "Anel de filigrana em prata.\n\n"+
            "Ciclo é uma celebração da natureza através da arte portuguesa da filigrana."+
            "Inspirada nas suas formas e texturas orgânicas, esta é uma seleção de delicadas joias de prata e prata dourada.\n\n"+
            "Anel em prata dourada 925‰ com 3,5cm e 3,0 gr. Feito em Portugal.",
            quantidade: 10
        },
        {
            id: 2,
            nome: "Colar Coração de Viana em Ouro - 9Kt",
            imagem: "/projetos/jewelux/client/img/colar-coracao-de-viana.png",
            material: "Ouro",
            categoria: "Mulher",
            preco: 290.00,
            descricao: "Colar Coração de Viana em ouro da Coleção Essentia.\n\n"+
            "A Coleção Essentia, feita em ouro, é um regresso às origens da ourivesaria tradicional portuguesa," 
            + " às suas formas clássicas e intemporais que atravessam gerações.\n\nColar com medalha de filigrana em ouro 9Kt com 2,4gr." 
            + "Fio com 44cm. Medalha com 2,3cm feita em Portugal.",
            quantidade: 8
        },
        {
            id: 3,
            nome: "Colar Escudo em Prata",
            imagem: "/projetos/jewelux/client/img/colar-escudo-prata.png",
            material: "Prata",
            categoria: "Homem",
            preco: 39.00,
            descricao: "Colar em prata, parte da coleção Escudo.\n\n"+
            "Uma coleção de joias unissexo inspirada no Escudo Português, símbolo da nação desde o séc. XV.\n\n"+ 
            "Colar em prata 925‰ com 45,0cm e 2,2gr. Medalha com 1,5cm. Feito em Portugal.",
            quantidade: 5
        },
        {
            id: 4,
            nome: "Anel Escudo em Prata Dourada",
            imagem: "/projetos/jewelux/client/img/anel-escudo-em-prata-dourada.png",
            material: "Prata",
            categoria: "Homem",
            preco: 55.00,
            descricao: "Anel sinete em prata, parte da coleção Escudo.\n\n"+
            "Uma coleção de joias unissexo inspirada no Escudo Português, símbolo da nação desde o séc. XV\n\n"+
            "Anel em prata dourada 925‰ com 1,0cm e 2,7gr.",
            quantidade: 5
        },
        {
            id: 5,
            nome: "Brincos Caramujo em Ouro 9Kt",
            imagem: "/projetos/jewelux/client/img/brincos-caramujo-ouro.png",
            material: "Ouro",
            categoria: "Mulher",
            preco: 250.00,
            descricao: "Brincos de filigrana em ouro da Coleção Essentia.\n\n"+
            "Feita em ouro, é um regresso às origens da ourivesaria tradicional portuguesa, às suas formas clássicas e intemporais que atravessam gerações\n\n"+
            "Brincos com esmalte em ouro 9Kt. Medalha com 1,4cm e comprimento total 2cm. 1,6gr. Feito em Portugal.",
            quantidade: 5
        },
        {
            id: 6,
            nome: "Brincos em Ouro Rosa - 18K",
            imagem: "/projetos/jewelux/client/img/brincos-rose-gold.png",
            material: "Diamante",
            categoria: "Mulher",
            preco: 999.99,
            descricao: "Como mestre na arte de fazer correntes, desde um simples fio até criações de alta joalheria,"+
            "a Jewelux oferece os brincos de argola em ouro rosa inteiramente cobertos com mais de 600 diamantes"+
            "criando um deslumbrante efeito de pavé aleatório\n\n"+
            "Brincos em ouro rosa 18k com 614 diamantes brancos (≈6,4 Cts) em ouro rosa banhado a ródio branco 18k.",
            quantidade: 3
        },
        {
            id: 7,
            nome: "Brincos Nudo Petit",
            imagem: "/projetos/jewelux/client/img/nudo-ouro-rosa.png",
            material: "Ouro",
            categoria: "Criança",
            preco: 450.00,
            descricao: "Com a inconfundível silhueta Nudo, os brincos de pedra 'nude' são embelezados por pavé para o dobro do charme da joia."+
            "Principalmente em crianças.\n\n"+
            "Brincos em ouro branco e rosa 18k com 78 diamantes brancos (≈1,6 Cts) em ouro branco banhado a ródio branco 18k.",
            quantidade: 5
        },
        {
            id: 8,
            nome: "Pulseira em Ouro Branco",
            imagem: "/projetos/jewelux/client/img/pulseira-ouro-branco.png",
            material: "Ouro",
            categoria: "Homem",
            preco: 300.00,
            descricao: "A pulseira de corrente em ouro branco e ouro rosa apresenta o distintivo fecho de pressão de elos de tamanho grande da Jewelux.\n\n"+
            "As linhas simples são fluidas em termos de gênero e seu apelo universal é instantaneamente evidente. Essencial e requintado, inspirado no design milanês.\n\n"+
            "Pulseira em ouro branco banhado a ródio 18k e ouro rosa.",
            quantidade: 5
        },
        {
            id: 9,
            nome: "Brincos Rainbow Daisy",
            imagem: "/projetos/jewelux/client/img/rainbow-earnings.png",
            material: "Prata",
            categoria: "Criança",
            preco: 20.00,
            descricao: "Estes atraentes brincos florais multicoloridos marcam qualquer roupa pela qual sua filha seja obcecada.\n\n"+
            "Lindamente desenhados com diversas cores de esmalte do arco-íris dentro de cada pétala da flor e feitos com a melhor prata esterlina 925,"+
            "estes brincos de flores definitivamente se tornarão o par favorito de suas meninas.",
            quantidade: 4
        },
        {
            id: 10,
            nome: "Pulseira Base Charm",
            imagem: "/projetos/jewelux/client/img/pulseira-base-charm.png",
            material: "Prata",
            categoria: "Criança",
            preco: 30.00,
            descricao: "Uma pulseira moderna para meninas foi projetada como uma pulseira de elos simples, ideal para as meninas adicionarem qualquer um de seus preciosos pingentes.\n\n"+
            "Esta pulseira simples de prata esterlina 925 permite que sua filha exiba seu estilo adicionando pingentes que mostram sua personalidade.",
            quantidade: 5
        }
    ];
    
    const adminInfo = [
        {
            id: Math.floor(10 + Math.random() * 90),
            email: adminEmail,
            pass: adminPass,
            nome: adminNome,
            tipoDeConta: 'admin'
        }
    ];

// Armazenar os produtos no localStorage
if (!productsStorage)
    localStorage.setItem('products', JSON.stringify(products));

/* ADMIN */
localStorage.setItem('admin', JSON.stringify(adminInfo));

// Referência à seção de produtos
const productsSection = document.getElementById("products");


// Limpar o conteúdo existente na seção de produtos
productsSection.innerHTML = '';

productsSection.classList.add("section-p1");

const title = document.createElement("h2");

const paragraph = document.createElement("p");

title.innerText = "As Mais Preciosas";
paragraph.innerText = "Coleção dos mais vendidos";
productsSection.appendChild(title);
productsSection.appendChild(paragraph);

const productContainer = document.createElement("div");
productContainer.classList.add("pro-container");
// Obter os produtos armazenados no localStorage
//const productsStorage = JSON.parse(localStorage.getItem('products'));

// Verificar se há produtos armazenados
if (productsStorage) {
    // Iterar sobre os produtos armazenados e adicioná-los à seção de produtos
    for (let i = 0; i < Math.min(3, productsStorage.length); i++) {
        const product = productsStorage[i];

        const productDiv = document.createElement("div");
        productDiv.classList.add("pro");

        const productImage = document.createElement("img");
        productImage.src = product.imagem;
        productDiv.appendChild(productImage);

        const productDescription = document.createElement("div");
        productDescription.classList.add("des");

        const brandName = document.createElement("span");
        brandName.innerText = "Jewelux";
        productDescription.appendChild(brandName);

        const productName = document.createElement("h5");
        productName.innerText = product.nome;
        productDescription.appendChild(productName);

        const productPrice = document.createElement("h4");
        productPrice.innerText = `${product.preco.toFixed(2)}€`;
        productDescription.appendChild(productPrice);

        productDiv.appendChild(productDescription);

        productDiv.addEventListener('click', function () {
            // Armazenar o ID do produto clicado no localStorage para acessá-lo na página de detalhes
            localStorage.setItem('productSelected', JSON.stringify(product.id));
            // Redirecionar para a página de detalhes do produto
            window.location.href = './src/pages/details.html';
        });
        productContainer.appendChild(productDiv);
    }
} else {
    // Se não houver produtos armazenados, exibir uma mensagem ou tomar outra ação adequada
    console.log("Não há produtos armazenados no localStorage.");
}

productsSection.appendChild(productContainer);

};

// Função que efetua o registo de uma conta
function SignUp() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
    const Cpassword = document.getElementById("Cpass").value;
    const birthday = document.getElementById("dataNasc").value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    let users = JSON.parse(localStorage.getItem('Users')) || [];

    // Verifica se o email já está presente na coleção 'Users'
    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
        const confirmAlert = confirm("Este email já está associada a uma conta. Deseja iniciar sessão?");
        if (confirmAlert) {
            window.location.href = '/projetos/jewelux/client/src/pages/login.html';
        }
        return;
    }

    const currentDate = new Date('2024-05-22');
    const birthDate = new Date(birthday);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    if (name && email &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
        email.length > 8 &&
        password && 
        password.length >= 8 &&
        Cpassword === password &&
        birthday &&
        birthDate <= currentDate &&
        age >= 16) {
        const info = {
            id: Math.floor(10 + Math.random() * 90), //Numero aleatoria com apenas 2 digitos
            nome: name,
            email: email,
            password: password,
            nascimento: birthday.toString(),
            sexo: sexo,
            tema: 'claro',
            estado: 'off',
            tipoDeConta: 'Normal'
        };

        //Adicionar as informações do utilizador ao array
        users.push(info);

        localStorage.setItem('Users', JSON.stringify(users));

        window.location.href = '/projetos/jewelux/client/src/pages/login.html';
        alert("A sua conta foi criada com sucesso.\nAgora precisa fazer login.");
    } 
    else {
        alert("ERRO, tente novamente!\nVerifique se todos os campos estão preenchidos corretamente e se você tem mais de 16 anos.");
        name.value = "";
        email.value = "";
        password.value = "";
    }
}

// Função que efetua a login na conta
function Login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
    
    // Verifica se o email e password coincidem com algum utilizador armazenado
    const foundUser = Getinfo.find(user => user.email === email && user.password === password);
    const foundAdmin = GetAdmininfo.find(user => user.email === email && user.pass === password);

    if (foundUser) {
        alert("Login bem sucedido!");
        foundUser.estado = 'on'; //Muda o estado do utilizador para "On"
        localStorage.setItem('LoggedInUser', JSON.stringify(foundUser));
        // Levar para a homepage
        window.location.href = '../../index.html';
    } else if(foundAdmin) {
        alert("Bem vindo Admin, login bem sucedido!");
        localStorage.setItem('LoggedInUser', JSON.stringify(foundAdmin));
        // Levar para a homepage do Administrador
        window.location.href = '../../indexAdmin.html';
    } else {
        alert("O Email ou password está incorreta. Por favor, tente novamente.");
    }
}


// Função para verificar o estado do utilizador
function checkLoginStatus() {
    if (currentUser && currentUser.estado === 'on') {
        const userName = currentUser.nome;
        document.getElementById('lg-user').innerHTML = `<a href="/projetos/jewelux/client/src/pages/account.html">Olá, ${userName}</a>`;
    }
}

// Função que preenche os inputs com as informações do utilizador autenticado
function fillUserInfo(user) {
    document.getElementById('nome').value = user.nome;
    document.getElementById('email').value = user.email;
    document.getElementById('nascimento').value = user.nascimento;
}

// Função que mostra a Área Pessoal se estiver com sessão iniciada
function toggleUserPanel() {
    if (currentUser && currentUser.estado === 'on') {
        window.location.href = '/projetos/jewelux/client/src/pages/account.html';
    } else {
        window.location.href = '/projetos/jewelux/client/src/pages/login.html';
    }
}

function Logout(){
    currentUser.estado = 'off';
    localStorage.setItem('LoggedInUser', JSON.stringify(currentUser));
    localStorage.removeItem('LoggedInUser');
    window.location.reload();
    window.location.href = '../../index.html';
}

function aplicarTema(tema) {
    if (tema === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('icon-tema').classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('icon-tema').classList.replace('fa-sun', 'fa-moon');
    }
}



