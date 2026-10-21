const currentUser = JSON.parse(localStorage.getItem('LoggedInUser'));

window.onload = function () {
    checkLoginStatus();

    const form = document.getElementById('edit-product-form');
    const productNameInput = document.getElementById('productName');
    const productMaterialInput = document.getElementById('productMaterial');
    const productPriceInput = document.getElementById('productPrice');
    const productDescriptionInput = document.getElementById('productDescription');
    const productImageInput = document.getElementById('productImage');
    const productQuantityInput = document.getElementById('productQuantity');
    const currentImage = document.getElementById('currentImage');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const productName = productNameInput.value.trim();
        const productMaterial = productMaterialInput.value.trim();
        const productPrice = parseFloat(productPriceInput.value.trim());
        const productDescription = productDescriptionInput.value.trim();
        const productQuantity = parseInt(productQuantityInput.value.trim());

        // Verifique se todos os campos estão preenchidos
        if (productName && productMaterial && productPrice && productDescription && productQuantity) {
            let productImage = '';
            if (productImageInput.files && productImageInput.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    productImage = e.target.result;
                    const productId = Math.floor(Math.random() * 100);

                    // Cria um novo produto
                    const newProduct = {
                        id: productId,
                        nome: productName,
                        material: productMaterial,
                        preco: productPrice,
                        descricao: productDescription,
                        imagem: productImage,
                        quantidade: productQuantity
                    };

                    // Obtem os produtos existentes no localStorage
                    let products = JSON.parse(localStorage.getItem('products')) || [];

                    // Adiciona o novo produto à lista
                    products.push(newProduct);

                    // Salva a lista atualizada no localStorage
                    localStorage.setItem('products', JSON.stringify(products));

                    // Limpa o formulário
                    form.reset();
                    currentImage.src = '';
                    
                    alert('Produto adicionado com sucesso!');

                    window.location.href = "../../indexAdmin.html";
                };
                reader.readAsDataURL(productImageInput.files[0]);
            } else {
                // Se não houver uma nova imagem, use a existente
                alert('Por favor, selecione uma imagem do produto.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Previsualizar a imagem selecionada
    productImageInput.addEventListener('change', (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                currentImage.src = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    });
};

function checkLoginStatus() {
    if (!currentUser || currentUser.tipoDeConta !== 'admin') {
        alert('Acesso negado. Faça login como administrador para acessar a esta página.');
        window.location.href = 'login.html'; // Redireciona para a página de login
    } else if(currentUser.tipoDeConta === 'Normal'){
        console.log(currentUser);
        alert('Acesso negado. A sua conta não tem permissão para aceder a está pagina.');
        window.location.href = 'index.html';
    } else {
        const userName = currentUser.nome;
        //document.getElementById('lg-user').innerHTML = `<a onclick="Logout()">Sair</a>`;          
    }
}
