const currentUser = JSON.parse(localStorage.getItem('LoggedInUser'));
const userId = currentUser ? currentUser.id : null;

function checkLoginStatus() {
    if (currentUser && currentUser.estado === 'on') {
        const userName = currentUser.nome;
        document.getElementById('lg-user').innerHTML = `<a href="./account.html">Olá, ${userName}</a>`;
    }
}

let cartContents = [];
if (currentUser) {
    cartContents = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
} else {
    cartContents = JSON.parse(sessionStorage.getItem('guest_cart')) || [];
}

window.onload = function () {
    checkLoginStatus();

    const cartTableBody = document.getElementById('cart-tbody');
    const cartSummary = document.getElementById('summary');

    cartTableBody.innerHTML = '';

    if (cartContents.length === 0) {
        const emptyCartRow = document.createElement('tr');
        const emptyCartCell = document.createElement('td');
        emptyCartCell.setAttribute('colspan', '5');
        emptyCartCell.textContent = 'Carrinho Vazio';
        emptyCartRow.appendChild(emptyCartCell);
        cartTableBody.appendChild(emptyCartRow);
    } else {
        cartContents.forEach(product => {
            const row = document.createElement('tr');

            const removeCell = document.createElement('td');
            removeCell.innerHTML = '<i class="fa-solid fa-x"></i>';
            removeCell.addEventListener('click', function () {
                removeFromCart(product.product.id);
            });
            row.appendChild(removeCell);

            const imageCell = document.createElement('td');
            const productImage = document.createElement('img');
            productImage.src = product.product.imagem;
            productImage.alt = 'Imagem do Produto';
            imageCell.appendChild(productImage);
            row.appendChild(imageCell);

            const nameSizeCell = document.createElement('td');
            const productName = document.createElement('span');
            productName.textContent = product.product.nome;
            const productSize = document.createElement('span');
            productSize.textContent = ` (${product.size})`;
            nameSizeCell.appendChild(productName);
            nameSizeCell.appendChild(productSize);
            row.appendChild(nameSizeCell);

            const priceCell = document.createElement('td');
            if (product.product.preco) {
                priceCell.textContent = product.product.preco.toFixed(2) + '€';
            } else {
                priceCell.textContent = 'Preço Indisponível';
            }
            row.appendChild(priceCell);

            const quantityControlsCell = document.createElement('td');
            const decreaseButton = document.createElement('button');
            decreaseButton.textContent = '-';
            decreaseButton.classList.add('quantity-btn');
            decreaseButton.addEventListener('click', function () {
                updateQuantity(product.product.id, product.quantity - 1);
            });
            quantityControlsCell.appendChild(decreaseButton);

            const quantityInput = document.createElement('input');
            quantityInput.type = 'text';
            quantityInput.value = product.quantity;
            quantityInput.min = '1';
            quantityInput.classList.add('quantity-input');
            quantityControlsCell.appendChild(quantityInput);

            const increaseButton = document.createElement('button');
            increaseButton.textContent = '+';
            increaseButton.classList.add('quantity-btn');
            increaseButton.addEventListener('click', function () {
                updateQuantity(product.product.id, product.quantity + 1);
            });
            quantityControlsCell.appendChild(increaseButton);

            row.appendChild(quantityControlsCell);
            cartTableBody.appendChild(row);
        });
    }

    const subtotal = cartContents.reduce((total, product) => total + (product.product.preco * product.quantity), 0);
    const total = subtotal;

    cartSummary.innerHTML = `
        <h3>Sumário</h3>
        <table>
            <tr>
                <td>Subtotal:</td>
                <td>${subtotal.toFixed(2)}€</td>
            </tr>
            <tr>
                <td>Taxa de Entrega:</td>
                <td>Gratuita</td>
            </tr>
            <tr>
                <td>Total:</td>
                <td>${total.toFixed(2)}€</td>
            </tr>
        </table>
        <button class="checkout-btn" onclick="window.location.href='./checkout.html'">Checkout</button>
    `;
};

// Função para remover um produto do carrinho
function removeFromCart(productId) {
    if (currentUser) {
        let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
        cart = cart.filter(item => item.product.id !== productId);
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    } else {
        let cart = JSON.parse(sessionStorage.getItem('guest_cart')) || [];
        cart = cart.filter(item => item.product.id !== productId);
        sessionStorage.setItem('guest_cart', JSON.stringify(cart));
    }
    location.reload();
}

// Função para atualizar a quantidade de um produto no carrinho
function updateQuantity(productId, newQuantity) {
    // Atualiza a quantidade do produto no carrinho do utilizador
    if (currentUser) {
        // Se o utilizador estiver autenticado, atualiza o carrinho no localStorage
        let cart = JSON.parse(localStorage.getItem(`cart_${currentUser.id}`)) || [];
        const index = cart.findIndex(product => product.product.id === productId);
        if (index !== -1) {
            cart[index].quantity = newQuantity;
            localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
        }
    } else {
        // Se o utilizador for um visitante, atualiza o carrinho na sessionStorage
        let cart = JSON.parse(sessionStorage.getItem('guest_cart')) || [];
        const index = cart.findIndex(product => product.product.id === productId);
        if (index !== -1) {
            cart[index].quantity = newQuantity;
            sessionStorage.setItem('guest_cart', JSON.stringify(cart));
        }
    }
    location.reload();
}
