function iniciaJogo(x, y) {
    cardsActive = x * y;
    cardsInactive = 0;
    let cardsV = randomCards();
    document.getElementById("mesa-jogo").innerHTML = '';
    document.getElementById('pontuacao').innerHTML = 0;
    document.getElementById("mesa-jogo").style.width = 120 * x + "px";
    document.getElementById("mesa-jogo").style.height = 120 * y + "px";
   
    for (let j = 0; j < x * y / 2; j++) {
        let rnd = Math.floor(Math.random() * cardsV.length);
        for (let i = 0; i < 2; i++) {
            document.getElementById("mesa-jogo").innerHTML += cardsV[rnd];
        }
        cardsV.splice(rnd, 1);
    }

    const cards = document.querySelectorAll('.carta-memoria');
    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * (x*y));
            card.style.order = randomPos;
        });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard));
    setTimeout(() => { cards.forEach(card => unflipCards(card)) }, 1500);
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cardsInactive = 0;
let cardsActive = 0;
let veryHard = false;
let countDown = 3;
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch) {
        disableCards();
        document.getElementById('pontuacao').innerHTML = parseInt(document.getElementById('pontuacao').innerHTML) + 20;
    }
    else {
        unflipCards();
        document.getElementById('pontuacao').innerHTML -= 10;
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    cardsInactive += 2;
    countDown = 3;
    resetBoard();
    if (cardsActive == cardsInactive) {
        setTimeout(() => { alert("Com " + document.getElementById('pontuacao').innerHTML + "pontos de ganhar você acaba, estar de parabéns você Jovem Padawan"); }, 1000);
    }
}

function unflipCards(card) {
    lockBoard = true;
    if (typeof card !== "undefined") {
        card.classList.remove('flip');
        resetBoard();
        card = "undefined";
        return;
    }
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 800);
    
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function criaJogo(event) {
    switch (event.target.id) {
        case 'facil':
            iniciaJogo(2, 2);
            break;
        case 'medio':
            iniciaJogo(2, 4)
            break;
        case 'dificil':
            iniciaJogo(4, 4);
            break;
        case 'pro-player':
            iniciaJogo(6, 5);
            veryHard = true;
            break;
        default:
            alert("Não existir essa dificuldade, Jovem Padawan");
            break;
    }
}
function randomCards() {

    temp = [[`<div class="carta-memoria flip" data-framework="pisa">
<img class="frente-carta" src="img/pisa.jpg" alt="pisa" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="coliseu">
<img class="frente-carta" src="img/coliseu.jpg" alt="coliseu" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="pizza">
<img class="frente-carta" src="img/pizza.png" alt="pizza" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="macarrao">
<img class="frente-carta" src="img/macarrao.jpg" alt="macarrao" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="olimpo">
<img class="frente-carta" src="img/olimpo.png" alt="olimpo" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="spartan">
<img class="frente-carta" src="img/spartan.jpg" alt="spartan" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="mario">
<img class="frente-carta" src="img/mario.jpg" alt="mario" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="lasanha">
<img class="frente-carta" src="img/lasanha.jpg " alt="lasanha" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="simbolos1">
<img class="frente-carta" src="img/simbolos1.jpg" alt="simbolos1" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="simbolos2">
<img class="frente-carta" src="img/simbolos2.jpg" alt="simbolos2" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="mamma">
<img class="frente-carta" src="img/mamma.png" alt="mamma" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="luigi">
<img class="frente-carta" src="img/luigi.png" alt="luigi" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="nonna">
<img class="frente-carta" src="img/nonna.png" alt="nonna" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="pao">
<img class="frente-carta" src="img/pao.png" alt="pao" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="simbolos3">
<img class="frente-carta" src="img/simbolos3.jpg" alt="simbolos3" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="vinho">
<img class="frente-carta" src="img/vinho.jpg" alt="vinho" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="florenca">
<img class="frente-carta" src="img/florenca.jpg" alt="florenca" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`],

    [`<div class="carta-memoria flip" data-framework="vespa">
<img class="frente-carta" src="img/vespa.jpg" alt="vespa" />
<img class="fundo-carta" src="img/torre.jpg" alt="torre" />
</div>`]];

    return temp;
}