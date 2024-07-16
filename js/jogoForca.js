let listaPalavras = ["cachorro", "gato", "papagaio"];
let chutesLetras;
let divPalavras;
let bonecoCabeca;
let bonecoBracoE;
let bonecoTronco;
let bonecoBracoD;
let bonecoPernaE;
let bonecoPernaD;
let bonecoForca;
let numTentativasIncorretas;
let maxTentativas;

document.addEventListener("DOMContentLoaded", function(){
    // após o DOM ter sido carregado,
    // atribui o elemento à variável
    chutesLetras = document.getElementById("chutes");
    divPalavras = document.getElementById("palavra");
    
    bonecoCabeca = document.getElementById("cabeca");
    bonecoBracoE = document.getElementById("bracoE");
    bonecoTronco = document.getElementById("tronco");
    bonecoBracoD = document.getElementById("bracoD");
    bonecoPernaE = document.getElementById("pernaE");
    bonecoPernaD = document.getElementById("pernaD");
    bonecoForca = [bonecoCabeca, bonecoTronco, bonecoBracoE, bonecoBracoD, bonecoPernaE, bonecoPernaD];
    
    maxTentativas = bonecoForca.length;
 });


function adicionarPalavra() {
    var palavra = document.getElementById("palavraJogoForca").value;
    console.log(palavra)

    listaPalavras.push(palavra)
    // Salva a lista atualizada no armazenamento local (opcional)
    localStorage.setItem("listaPalavras", JSON.stringify(listaPalavras));
    location.href='jogo.html';
}

function resetarBoneco() {
    document.getElementById("cabeca").style.display = "none";
    document.getElementById("bracoE").style.display = "none";
    document.getElementById("tronco").style.display = "none";
    document.getElementById("bracoD").style.display = "none";
    document.getElementById("pernaE").style.display = "none";
    document.getElementById("pernaD").style.display = "none";
}

function iniciarNovoJogo() {

    document.getElementById("corpo").classList.remove("animation");
    
    // Escolhe uma nova palavra aleatória a cada novo jogo
    var indiceAleatorio = Math.floor(Math.random() * listaPalavras.length);
    palavraEscolhida = listaPalavras[indiceAleatorio];
    console.log(palavraEscolhida);

    // Reinicializa variáveis relacionadas ao jogo
    numTentativasIncorretas = 0;
    letrasPressionadas = [];
    chutesLetras.innerHTML = "";

    // Reinicializa a interface do jogo
    resetarBoneco();
    mostrarPalavraEscondida();
    document.addEventListener("keydown", keydownListener);
}

function mostrarPalavraEscondida() {
    // Exibe a palavra escolhida com underscores para as letras não adivinhadas
    var palavraExibida = "";
    for (var i = 0; i < palavraEscolhida.length; i++) {
        if (palavraEscolhida[i] === "") {
            palavraExibida += " ";
        } else if (letrasPressionadas.includes(palavraEscolhida[i])) {
            palavraExibida += palavraEscolhida[i];
        } else {
            palavraExibida += "_";
        }
        palavraExibida += " ";
    }
    divPalavras.innerHTML = palavraExibida;
}

function jogoForca() {

    // Verifica se há uma lista de palavras no armazenamento local
    if (localStorage.getItem("listaPalavras")) {
        listaPalavras = JSON.parse(localStorage.getItem("listaPalavras"));
    }

    // Inicia um novo jogo
    iniciarNovoJogo();
}

// Define a lógica para lidar com as teclas pressionadas
var keydownListener = function(event) {
    var letraPressionada = event.key.toLowerCase(); // Converte a letra para minúscula
    if (/[a-z]/.test(letraPressionada) && !letrasPressionadas.includes(letraPressionada)) { // Verifica se é uma letra e se não foi pressionada antes
        letrasPressionadas.push(letraPressionada); // Adiciona a letra pressionada ao array de letras pressionadas

        if (palavraEscolhida.includes(letraPressionada)) {
            // Atualiza a palavra exibida com a letra revelada
            mostrarPalavraEscondida();
            // Verifica se todas as letras foram adivinhadas
            if (todasLetrasAdivinhadas()) {
                // Encerra o evento keydown
                document.removeEventListener("keydown", keydownListener);
                // Adicione aqui qualquer outra ação que deseja executar ao acertar a palavra
            }
        } else {
            // Se a letra não estiver na palavra, você pode fazer algo, como diminuir o número de tentativas ou exibir uma mensagem de erro
            chutesLetras.innerHTML += letraPressionada + " ";
            numTentativasIncorretas++; // Incrementa o número de tentativas incorretas

            // Exibe os elementos do boneco de forca de acordo com o número de tentativas incorretas
            for (var i = 0; i < numTentativasIncorretas; i++) {
                bonecoForca[i].style.display = "block";
            }

            // Se o número de tentativas exceder o máximo, você pode fazer algo, como encerrar o jogo ou exibir uma mensagem de derrota
            if (numTentativasIncorretas >= maxTentativas) {
                document.removeEventListener("keydown", keydownListener);
                document.getElementById("corpo").classList.add("animation");
                console.log('event off')
            }
        }
    }
}

function todasLetrasAdivinhadas() {
    for (var i = 0; i < palavraEscolhida.length; i++) {
        if (!letrasPressionadas.includes(palavraEscolhida[i])) {
            return false; // Se alguma letra não foi adivinhada, retorna false
        }
    }
    return true; // Se todas as letras foram adivinhadas, retorna true
}