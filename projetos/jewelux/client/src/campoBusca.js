const productsStorage = JSON.parse(localStorage.getItem('products')); // Informações dos Produtos
const currentUser = JSON.parse(localStorage.getItem('LoggedInUser'));

window.onload = function() {
checkLoginStatus();

// Referência à seção de produtos
const productsSection = document.getElementById("catalog");

// Limpa o conteúdo existente na seção de produtos
productsSection.innerHTML = '';

const productContainer = document.createElement("div");
productContainer.classList.add("pro-container");

// Listagem dos produtos
if (productsStorage) {
    // Iterar sobre os produtos armazenados e adicioná-los à seção de produtos
    productsStorage.forEach(product => {
        productsSection.innerHTML = '';

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
            window.location.href = './details.html';
        });
        productContainer.appendChild(productDiv)
    });
} else {
    // Se não houver produtos armazenados, exibir uma mensagem ou tomar outra ação adequada
    console.log("Não há produtos armazenados no localStorage.");
}
productsSection.appendChild(productContainer);


const termoBusca = document.getElementById("searchBar");

termoBusca.addEventListener("input", function () {
    const termo = termoBusca.value.toLowerCase().trim();
    productContainer.innerHTML = '';
    // Verifica se há produtos armazenados
    // Atinge sobre os produtos e mostrar apenas os que correspondem ao termo de busca
    productsSection.innerHTML = ''; // Limpar a seção de produtos antes de adicionar os novos produtos filtrados
    for(let i = 0; i < productsStorage.length; i++) {
        const product = productsStorage[i];
        if (product.nome.toLowerCase().includes(termo)) {
            
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
                // Armazena o ID do produto clicado no localStorage para acessá-lo na página de detalhes
                localStorage.setItem('productSelected', JSON.stringify(product.id));
                // Redireciona para a página de detalhes do produto
                window.location.href = './details.html';
            });
            productContainer.appendChild(productDiv); // Corrigi para adicionar os produtos filtrados à seção de produtos
        }
    }

    productsSection.appendChild(productContainer);
});
}

function checkLoginStatus() {
    if (currentUser && currentUser.estado === 'on') {
        const userName = currentUser.nome;
        document.getElementById('lg-user').innerHTML = `<a href="account.html">Olá, ${userName}</a>`;
    }
}