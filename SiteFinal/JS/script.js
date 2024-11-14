/* Função para exibir o pop-up com base na URL da página
//window.onload = function() {
    // Captura a URL da página atual
   const currentURL = window.location.href;

    // Verifica se está na página de Cervejas, Refrigerantes ou Cachaças
    if (currentURL.includes("/cervejas.html")) {
        alert("Você está acessando a área de Cervejas.");
    } else if (currentURL.includes("/refrigerantes.html")) {
        alert("Você está acessando a área de Refrigerantes.");
    } else if (currentURL.includes("/cachacas.html")) {
        alert("Você está acessando a área de Cachaças.");}
    else{
        alert("Você está acessando a pagina principal do site")
    }
};*/

const entrada = performance.getEntriesByType("navigation"); //armazena a informação de qual entrada (arquivo.html) vc está
if (entrada.length > 0 && entrada[0].type === "reload") { //se a entrada for igual a 0, ele redireciona a pessoa para a pagina splash.html
    window.location.href = "/splash.html"; // volta pra o html splash onde carrega a animação
}

document.addEventListener("DOMContentLoaded", function() {
    var botoesCard = document.querySelectorAll('.card'); //armazena os botão
    var contador = document.getElementById('contador'); //armazena o contador
    var popup = document.getElementById('popup'); //armazena o pop up numa variavel
    var popupText = document.getElementById('popup-text'); //armazena o texto do mesmo
    var popupConfirm = document.getElementById('popup-confirm'); //botão do "Correr pro abraço"
    var popupCancel = document.getElementById('popup-cancel'); //Botão do twitter (Cancelamento)

    var quantidade = parseInt(localStorage.getItem('quantidadeCarrinho')) || 0;
    contador.textContent = quantidade; //aqui vai a quantidade inicial pra aparecer em formato de texto la em cima do carrinho

    let carrinho = JSON.parse(localStorage.getItem('carrinhoItens')) || []; //aqui ele pega dnv os itens do carrinho, se existirem

    //uma fução que atualia o carrinho no local.storage
    function atualizarCarrinho() {
        localStorage.setItem('quantidadeCarrinho', quantidade);
        localStorage.setItem('carrinhoItens', JSON.stringify(carrinho));
        contador.textContent = quantidade;
    }
    //mostrar poup, nada demais
    function mostrarPopup(itemNome) { //fazer essa definição de nome foi complicada, admito. usei um pouco de stack overflow(muito obg comunidade dev)
        popupText.textContent = `Deseja adicionar ${itemNome} ao carrinho?`;
        popup.style.display = 'flex';
    }

    function esconderPopup() { //isso aqui esconde
        popup.style.display = 'none';
    }

    botoesCard.forEach(function(botao) {
        botao.addEventListener('click', function() {
            var itemNome = botao.querySelector('h3').textContent;
            mostrarPopup(itemNome);

            popupConfirm.onclick = function() {
                quantidade++;
                carrinho.push(itemNome);
                atualizarCarrinho();
                console.log(`Item ${itemNome} adicionado ao carrinho. Total: ` + quantidade);
                esconderPopup();
            };

            popupCancel.onclick = function() {
                console.log(`Item ${itemNome} não adicionado.`);
                esconderPopup();
            };
        });
    });

    //suas respectivas constantes
    const carrinhoModelo = document.getElementById('carrinhoModal');
    const itensCarrinho = document.getElementById('itensCarrinho');
    const fecharCarrinho = document.getElementById('fecharCarrinho');

    function abrirCarrinho() {
        itensCarrinho.innerHTML = ''; // Limpa a lista antes de exibir
        carrinho.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            itensCarrinho.appendChild(li);
        });
        carrinhoModelo.style.display = 'block';
    }

    fecharCarrinho.addEventListener('click', function() {
        carrinhoModelo.style.display = 'none';
    });

    document.getElementById('finalizarCompra').addEventListener('click', function() {
        alert('Compra finalizada!');
        carrinho = []; //limpa a array com todos os itens do carrinho
        quantidade = 0; //reseta a quantidade de itens
        atualizarCarrinho(); //isso auqi vai atualizar a local storage
        carrinhoModelo.style.display = 'none';//fecha o carrinho
    });

    document.querySelector('.carrinho').addEventListener('click', abrirCarrinho);
});