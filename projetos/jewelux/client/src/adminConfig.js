const currentUser = JSON.parse(localStorage.getItem('LoggedInUser'));

document.addEventListener('DOMContentLoaded', function () {
    checkLoginStatus();
});


function checkLoginStatus() {
    if (!currentUser || currentUser.tipoDeConta !== 'admin') {
        alert('Acesso negado. Faça login como administrador para acessar a esta página.');
        window.location.href = './src/pages/login.html'; // Redireciona para a página de login
    } else if(currentUser.tipoDeConta === 'Normal'){
        console.log(currentUser);
        alert('Acesso negado. A sua conta não tem permissão para aceder a está pagina.');
        window.location.href = 'index.html';
    } else {
        const userName = currentUser.nome;
        document.getElementById('lg-user').innerHTML = `<a onclick="Logout()">Sair</a>`;
        loadProducts();            
    }
}

function Logout(){
    currentUser.estado = 'off';
    localStorage.setItem('LoggedInUser', JSON.stringify(currentUser));
    localStorage.removeItem('LoggedInUser');
    window.location.reload();
    window.location.href = 'index.html';
}

function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsSection = document.getElementById('products-container');
    productsSection.innerHTML = ''; // Limpar o que existe

    const productContainer = document.createElement("div");
    productContainer.classList.add("pro-container");

    if (products.length > 0) {
        products.forEach((product, index) => {
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

            const editButton = document.createElement('button');
            editButton.className = 'btn btn-primary';
            editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger ms-2';
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.onclick = () => deleteProduct(index);

            productDiv.appendChild(productDescription);
            productDiv.appendChild(editButton);
            productDiv.appendChild(deleteButton);

            editButton.addEventListener('click', function () {
                // Armazena o ID do produto clicado no localStorage para acessá-lo na página de detalhes
                localStorage.setItem('productSelected', JSON.stringify(product.id));
                // Redireciona para a página de detalhes do produto
                window.location.href = './src/pages/editProduct.html';
            });
            
            productContainer.appendChild(productDiv);
        });
    } else {
        productContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
    }
    productsSection.appendChild(productContainer);
}

function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts(); 
}