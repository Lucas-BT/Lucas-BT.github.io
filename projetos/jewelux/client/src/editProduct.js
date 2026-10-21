const productsStorage = JSON.parse(localStorage.getItem('products')); 
const productSelected = JSON.parse(localStorage.getItem('productSelected'));
const Getinfo = JSON.parse(localStorage.getItem('Users')) || [];
const currentUser = JSON.parse(localStorage.getItem('LoggedInUser'));
const productDetails = productsStorage.find(product => product.id === productSelected);

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
        //document.getElementById('lg-user').innerHTML = `<a href="./src/pages/account.html"><i class="fa-solid fa-gear"></i></a>`;         
        fillProductInfo(productDetails);
    }
}

window.onload = function () {
    checkLoginStatus();
    document.getElementById('edit-product-form').addEventListener('submit', updateProductInfo);
};


function fillProductInfo(product){
    document.getElementById('currentImage').src = product.imagem;
    document.getElementById('productName').value = product.nome;
    document.getElementById('productPrice').value = product.preco.toFixed(2);
    document.getElementById('productMaterial').value = product.material;
    document.getElementById('productDescription').innerText = product.descricao;
    document.getElementById('productQuantity').value = product.quantidade;
}

function updateProductInfo(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Recuperar os novos valores do formulário
    const productName = document.getElementById('productName').value.trim();
    const productMaterial = document.getElementById('productMaterial').value.trim();
    const productPrice = parseFloat(document.getElementById('productPrice').value.trim());
    const productDescription = document.getElementById('productDescription').value.trim();
    const productQuantity = parseInt(document.getElementById('productQuantity').value.trim());

    // Atualizar as informações do produto no localStorage
    const updatedProducts = productsStorage.map(product => {
        if (product.id === productSelected) {
            return {
                ...product,
                nome: productName,
                material: productMaterial,
                preco: productPrice,
                descricao: productDescription,
                quantidade: productQuantity
            };
        }
        return product;
    });

    // Salvar os produtos atualizados no localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    alert('As informações do produto foram atualizadas com sucesso!');
    window.location.href ='../../indexAdmin.html';
}

// Adicione um ouvinte de evento ao formulário para chamar a função de atualização quando o formulário for enviado
