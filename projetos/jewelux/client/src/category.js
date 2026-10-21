// Função para obter parâmetros de URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Carregar produtos do localStorage
const products = JSON.parse(localStorage.getItem('products')) || [];

const currentUser = JSON.parse(localStorage.getItem('LoggedInUser'));


// Obter a categoria da URL
const category = getUrlParameter('category');

// Filtrar produtos pela categoria
const filteredProducts = products.filter(product => product.categoria === category);

// Mapear categorias para banners e descrições
const categoryInfo = {
    'Homem': {
        banner: '/projetos/jewelux/client/img/categoriaHomem1.png',
        title: 'Homens',
        description: 'Conheça a nossa secção de Homem, incluindo algumas das peças mais icónicas.'
    },
    'Mulher': {
        banner: '/projetos/jewelux/client/img/mulherCategory.png',
        title: 'Mulheres',
        description: 'Descubra elegantes e sofisticadas joias desenhadas para realçar a beleza feminina.'
    },
    'Criança': {
        banner: '/projetos/jewelux/client/img/criancaCategory.png',
        title: 'Crianças',
        description: 'Encontre joias encantadoras e seguras, perfeitas para celebrar momentos especiais dos mais pequenos.'
    },
};

function checkLoginStatus() {
    if (currentUser && currentUser.estado === 'on') {
        const userName = currentUser.nome;
        document.getElementById('lg-user').innerHTML = `<a href="/projetos/jewelux/client/src/pages/account.html">Olá, ${userName}</a>`;
    }
}

window.onload = function () {
    checkLoginStatus();
    const categoryBannerSection = document.getElementById('category-banner');
    const categorySection = document.getElementById("category");
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("pro-container");

    categorySection.innerHTML = '';
    categorySection.classList.add("section-p1");

    // Adicionar banner e descrição da categoria
    if (categoryInfo[category]) {
        const bannerDiv = document.createElement("div");
        bannerDiv.classList.add("category-banner");

        const bannerImg = document.createElement("img");
        bannerImg.src = categoryInfo[category].banner;
        bannerImg.alt = category;

        const bannerTitle = document.createElement("h1");
        bannerTitle.innerHTML = categoryInfo[category].title;

        const bannerDescription = document.createElement("p");
        bannerDescription.innerText = categoryInfo[category].description;

        bannerDiv.appendChild(bannerImg);
        bannerDiv.appendChild(bannerTitle);
        bannerDiv.appendChild(bannerDescription);

        categoryBannerSection.appendChild(bannerDiv);
    }

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
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

            categoryContainer.appendChild(productDiv);
        });
    } else {
        categoryContainer.innerHTML = '<p>Nenhum produto encontrado nesta categoria.</p>';
    }
    categorySection.appendChild(categoryContainer);
}
