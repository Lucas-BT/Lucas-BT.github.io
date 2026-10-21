const productsStorage = JSON.parse(localStorage.getItem('products')); 
const productSelected = JSON.parse(localStorage.getItem('productSelected'));
const Getinfo = JSON.parse(localStorage.getItem('Users')) || [];
const currentUser = JSON.parse(localStorage.getItem('LoggedInUser'));

function checkLoginStatus() {
    if (currentUser && currentUser.estado === 'on') {
        const userName = currentUser.nome;
        document.getElementById('lg-user').innerHTML = `<a href="./account.html">Olá, ${userName}</a>`;
    }
}

window.onload = function (){
    checkLoginStatus();

    // Encontrar o produto selecionado entre os produtos armazenados
    const productDetails = productsStorage.find(product => product.id === productSelected);

    // Preencher informações do produto na página de detalhes
    if (productDetails) {
        document.getElementById('MainImg').src = productDetails.imagem;
        document.getElementById('productName').innerText = productDetails.nome;
        document.getElementById('productPrice').innerText = `${productDetails.preco.toFixed(2)}€`;

        const productDescription = document.getElementById('productDescription');
        productDescription.innerText = productDetails.descricao;

        const productSize = document.getElementById('productSize');
        const sizeOptions = ["Selecione o tamanho", "Small (S)", "Large (L)", "XL", "XXL"];
        sizeOptions.forEach(opcao => {
            const size = document.createElement('option');
            size.text = opcao;
            productSize.add(size);
        });

        // Evento de clique ao botão "Adicionar ao Carrinho"
        const btnAddToCart = document.getElementById('addToCart');
        btnAddToCart.addEventListener('click', function () {
            const quantity = parseInt(document.getElementById('productQty').value);
            const size = productSize.value;

            if (quantity < 1 || size === "Selecione o tamanho") {
                alert("Por favor, selecione uma quantidade válida e um tamanho.");
                return;
            }

            // Adicionar o produto ao carrinho do utilizador autenticado ou visitante
            if (currentUser) {
                addToAuthUserCart(productDetails, quantity, size);
            } else {
                addToGuestCart(productDetails, quantity, size);
            }

            alert("Produto adicionado ao carrinho com sucesso!");

        });

        const addToWishlistIcon = document.getElementById('addToWishlist');
        addToWishlistIcon.addEventListener('click', function () {
            const size = productSize.value;

            if (size === "Selecione o tamanho") {
                alert("Por favor, selecione um tamanho para adicionar à wishlist.");
                return;
            }

            addToWishlist(productDetails, size);
        });

    }
}

function addToWishlist(product, size) {
    if (currentUser) {
        let wishlist = JSON.parse(localStorage.getItem(`wishlist_${currentUser.id}`)) || [];
        // Verifica se o produto já existe na wishlist
        const existsInWishlist = wishlist.some(item => item.product.id === product.id && item.size === size);
        if (!existsInWishlist) {
            // Se o produto não estiver na wishlist, adicione-o
            wishlist.push({ product, size });
            // Atualiza a wishlist no localStorage
            localStorage.setItem(`wishlist_${currentUser.id}`, JSON.stringify(wishlist));
            alert('Produto adicionado à wishlist!');
        } else {
            alert('Este produto já está na wishlist!');
        }
    } else {
        let guest_wishlist = JSON.parse(sessionStorage.getItem('guest_wishlist')) || [];
        // Verifica se o produto já existe na wishlist
        const existsInWishlist = guest_wishlist.some(item => item.product.id === product.id && item.size === size);
        if (!existsInWishlist) {
            // Se o produto não estiver na wishlist, adicione-o
            guest_wishlist.push({ product, size });
            // Atualiza a wishlist no localStorage
            sessionStorage.setItem('guest_wishlist', JSON.stringify(guest_wishlist));
            alert('Produto adicionado à wishlist!');
        } else {
            alert('Este produto já está na wishlist!');
        }
    }
}



// Função para adicionar produtos ao carrinho do utilizador autenticado
function addToAuthUserCart(product, quantity, size) {
    const userId = currentUser.id;
    let userCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    userCart.push({ product, quantity, size });
    localStorage.setItem(`cart_${userId}`, JSON.stringify(userCart));
}

// Função para adicionar produtos ao carrinho de um utilizador visitante
function addToGuestCart(product, quantity, size) {
    let guestCart = JSON.parse(localStorage.getItem('guest_cart')) || [];
    guestCart.push({ product, quantity, size });
    sessionStorage.setItem('guest_cart', JSON.stringify(guestCart));
}