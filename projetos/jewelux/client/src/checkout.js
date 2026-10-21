const currentUser = JSON.parse(localStorage.getItem('LoggedInUser'));
const userId = currentUser ? currentUser.id : null;

let cartContents = [];
if (currentUser) {
    cartContents = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
} else {
    cartContents = JSON.parse(sessionStorage.getItem('guest_cart')) || [];
}

window.onload = function () {
    fillUserData();
    setupAccordions();
    populateCartSummary();



    document.getElementById('complete-order').addEventListener('click', function () {
        if (validateForm()) {
            saveDeliveryInfo();
            alert('Pedido concluído com sucesso!');
            
            if (currentUser) {
                localStorage.removeItem(`cart_${userId}`);
            } else {
                sessionStorage.removeItem('guest_cart');
            }

            window.location.href = 'account.html';
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });

    
};

function populateCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    const subtotal = cartContents.reduce((total, product) => total + (product.product.preco * product.quantity), 0);
    const total = subtotal;

    let itemsHTML = cartContents.map(product => `
            <div class="item">
                <img src="${product.product.imagem}" alt="${product.product.nome}">
                <div>
                    <p>${product.product.preco.toFixed(2)}€</p>
                    <p>${product.product.nome} - Tamanho: ${product.size}</p>
                    <input type="number" value="${product.quantity}" min="1" disabled>
                </div>
            </div>
        `).join('');

        cartSummary.innerHTML = `
            <h3>Sumário do Carrinho</h3>
            ${itemsHTML}
            <div class="total">
                <span>Total:</span>
                <span>${total.toFixed(2)}€</span>
            </div>
        `;
    }

function fillUserData() {
    if (currentUser) {
        document.getElementById('name').value = currentUser.nome;
        //document.getElementById('email').value = currentUser.email;
    }
}

function setupAccordions() {
    const accButtons = document.querySelectorAll('.accordion-button');
    accButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
}

function validateForm() {
    const deliveryForm = document.getElementById('delivery-form');
    const isValid = deliveryForm.checkValidity();
    if (!isValid) {
        deliveryForm.reportValidity();
    }
    return isValid;
}

function saveDeliveryInfo() {
    const deliveryForm = document.getElementById('delivery-form');

    const deliveryInfo = {
        id: Math.floor(10 + Math.random() * 90),
        nome: deliveryForm.name.value,
        email: currentUser.email,
        telefone: deliveryForm.phone.value,
        morada: deliveryForm.address.value,
        cidade: deliveryForm.city.value,
        codigoPostal: deliveryForm['postal-code'].value,
        data: new Date().toISOString(),
        pagamento: document.querySelector('input[name="payment-method"]:checked').value,
        produtos: cartContents, // Incluir os produtos do carrinho
    };

    let ordersInfo = JSON.parse(localStorage.getItem(`delivery_${userId}`)) || [];
    ordersInfo.push(deliveryInfo);

    if (currentUser) {
        localStorage.setItem(`delivery_${userId}`, JSON.stringify(ordersInfo));
    }
}