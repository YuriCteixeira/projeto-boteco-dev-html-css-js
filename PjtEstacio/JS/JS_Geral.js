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

const navEntries = performance.getEntriesByType("navigation");
if (navEntries.length > 0 && navEntries[0].type === "reload") {
    window.location.href = "/Splash.html";
}

//Pega o id que tá associado, no caso o <a> que é a imagem do auto falante, interage com ele e cria um evento 'click'
document.getElementById('play-sound').addEventListener('click', (e) => {
    e.preventDefault(); //prefine que o link execute ações de navegação
    const audio = document.getElementById('forro-audio'); //seleciona o elemento audio
    //if - se a música estiver pausada e clicarmos no ícone, ela toca, e vice-versa
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}); 
