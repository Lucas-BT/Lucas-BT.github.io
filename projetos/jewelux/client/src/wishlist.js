const currentUser = JSON.parse(localStorage.getItem('LoggedInUser'));
const userId = currentUser ? currentUser.id : null;

function checkLoginStatus() {
    if (currentUser && currentUser.estado === 'on') {
        const userName = currentUser.nome;
        document.getElementById('lg-user').innerHTML = `<a href="./account.html">Olá, ${userName}</a>`;
    }
}

let wishlistContents = [];
// Verifica se o utilizador está autenticado ou é um visitante
if (currentUser) {
    // Utilizador autenticado: obter a wishlist associada à sua conta
    wishlistContents = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
} else {
    // Utilizador visitante: obter a wishlist da sessão
    wishlistContents = JSON.parse(sessionStorage.getItem('guest_wishlist')) || [];
}

let cartContents = [];

if (currentUser) {
        // Utilizador autenticado: obter o carrinho associado à sua conta
        cartContents = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
} else {
        // Utilizador visitante: obter o carrinho da sessão
        cartContents = JSON.parse(sessionStorage.getItem('guest_cart')) || [];
}


window.onload = function () {
    checkLoginStatus();

    const wishlistTableBody = document.getElementById('wishlist-tbody');

    // Limpa o conteúdo existente na tabela da wishlist
    wishlistTableBody.innerHTML = '';

    if (wishlistContents.length === 0) {
        const emptyCartRow = document.createElement('tr');
        const emptyCartCell = document.createElement('td');
        emptyCartCell.setAttribute('colspan', '5');
        emptyCartCell.textContent = 'Wishlist Vazia';
        emptyCartRow.appendChild(emptyCartCell);
        wishlistTableBody.appendChild(emptyCartRow);
    } else{

    
    // Mostra os produtos na wishlist
    wishlistContents.forEach(product => {
        const row = document.createElement('tr');

        // Coluna para a imagem do produto
        const imageCell = document.createElement('td');
        const productImage = document.createElement('img');
        productImage.src = product.product.imagem;
        productImage.alt = 'Imagem do Produto';
        imageCell.appendChild(productImage);
        row.appendChild(imageCell);

        // Coluna para o nome do produto
        const nameCell = document.createElement('td');
        nameCell.textContent = product.product.nome;
        row.appendChild(nameCell);

        // Coluna para o estado do produto
        const statusCell = document.createElement('td');
        if(product.product.quantidade > 0)
            {
                statusCell.textContent = 'Em Stock✅';
            }
        else {
            statusCell.textContent = 'Sem Stock❌';
        }
        
        row.appendChild(statusCell);

        // Coluna para o preço do produto
        const priceCell = document.createElement('td');
        if (product.product.preco !== undefined) {
            priceCell.textContent = product.product.preco.toFixed(2) + '€';
        } else {
            priceCell.textContent = 'Preço Indisponível';
        }
        row.appendChild(priceCell);

        // Coluna para o botão de adicionar ao carrinho
        const addToCartCell = document.createElement('td');
        const addToCartButton = document.createElement('button');
        addToCartButton.style.padding = '10px';
        addToCartButton.innerHTML = '<a href="#"><i class="fa-solid fa-cart-shopping"></i></a>';
        addToCartButton.addEventListener('click', function () {
            addToCart(product.product.id);
        });
        addToCartCell.appendChild(addToCartButton);
        row.appendChild(addToCartCell);

        // Coluna para o botão de remover da wishlist
        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.style.padding = '10px';
        removeButton.innerHTML = '<a href="#"><i class="fa-solid fa-trash"></i></a>';
        removeButton.addEventListener('click', function () {
            removeFromWishlist(product.product.id);
        });
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        // Adicionar os conteudos das colunas à tabela da wishlist
        wishlistTableBody.appendChild(row);
    });
    if(!wishlistContents){
        wishlistTableBody.innerHTML = '<p>Nenhum produto encontrado.</p>';
    }
    const clearWishlistButton = document.getElementById('removeAll');
    clearWishlistButton.addEventListener('click', function () {
        clearWishlist();
    
    });
}
};

function removeFromWishlist(productId) {
    // Remover o produto da wishlist do utilizador
    if (currentUser) {
        // Utilizador autenticado
        let wishlist = JSON.parse(localStorage.getItem(`wishlist_${currentUser.id}`)) || [];
        wishlist = wishlist.filter(product => product.product.id !== productId);
        localStorage.setItem(`wishlist_${currentUser.id}`, JSON.stringify(wishlist));
    } else {
        // Utilizador visitante
        let wishlist = JSON.parse(sessionStorage.getItem('guest_wishlist')) || [];
        wishlist = wishlist.filter(product => product.product.id !== productId);
        sessionStorage.setItem('guest_wishlist', JSON.stringify(wishlist));
    }

    location.reload();
}

// Função para adicionar um produto ao carrinho
function addToCart(productId) {
    

    // Procurar o produto na wishlist
    const product = wishlistContents.find(item => item.product.id === productId);

    // Verificar se o produto já está no carrinho
    const existingProduct = cartContents.find(item => item.id === productId);

    if (existingProduct) {
        // Se o produto já estiver no carrinho, aumentar a quantidade
        existingProduct.quantity += 1;
    } else {
        // Caso contrário, adicionar o produto ao carrinho com 1 quantidade
        cartContents.push({ ...product, quantity: 1 });
    }

    // Atualiza o carrinho no localStorage ou sessionStorage
    if (currentUser) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cartContents));
    } else {
        sessionStorage.setItem('guest_cart', JSON.stringify(cartContents));
    }

    alert("O Produto foi adicionado ao carrinho!");
}

function clearWishlist() {
    if (currentUser) {
        localStorage.removeItem(`wishlist_${currentUser.id}`);
        location.reload();
    } else {
        sessionStorage.removeItem('guest_wishlist');
        location.reload();
    }
}