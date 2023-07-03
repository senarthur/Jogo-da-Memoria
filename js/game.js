const grid = document.querySelector(".grid");
const namePlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const gameCanva = document.querySelector(".game-canva");
const endGameDisplay = document.querySelector(".end-game");
const restartButton = document.querySelector(".restart-button");
const endGameMessage = document.querySelector(".message");

const characters = [
    'abra',
    'articuno',
    'dragonair',
    'eevee_evolutions',
    'gardevoir',
    'lucario',
    'maroak',
    'pikachu',
    'psyduck',
    'snivy'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const removeElement = (elements) => {
    elements.forEach((element) => {
        element.remove();
    });
}

const restartGame = () => {
    const cards = document.querySelectorAll(".card");
    const faces = document.querySelectorAll(".face");

    removeElement(cards);
    removeElement(faces);

    endGameDisplay.classList.add('display-none');
    gameCanva.style.filter = 'blur(0)';
    timer.innerHTML = '0';

    loadGame();
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll(".disabled-card");

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        setTimeout(() => {
            gameCanva.style.filter = 'blur(5px)';
            endGameDisplay.classList.remove('display-none');
            endGameMessage.innerHTML = `Parábens ${namePlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos`
        }, 300);
    }

    restartButton.addEventListener('click', restartGame);
}

const checkCards = () => {
    const firtsCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firtsCharacter == secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
    
}

let firstCard = '';
let secondCard = '';

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
    
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(../images/${character}.png)`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTimer = timer.innerHTML;
        timer.innerHTML = parseInt(currentTimer) + 1;
    }, 1000);
}

const loadGame = () => {
    startTimer();
    
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5 );

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

window.onload = () => {
    namePlayer.innerHTML = localStorage.getItem('player');
    loadGame();
}
