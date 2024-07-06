document.getElementById('start').addEventListener('click', startGame);

let round = 1;
let sequence = [];
let userSequence = [];

const colorButtons = [
    document.getElementById('choice-red'),
    document.getElementById('choice-blue'),
    document.getElementById('choice-green'),
    document.getElementById('choice-yellow'),
    document.getElementById('choice-pink'),
    document.getElementById('choice-purple'),
    document.getElementById('choice-pi'),
    document.getElementById('choice-theta')
];

const colorNames = ['red', 'blue', 'green', 'yellow', 'pink', 'purple'];
const symbols = ['π', 'θ'];

function startGame() {
    document.getElementById('start').style.display = 'none';
    displayCountdown();
}

function displayCountdown() {
    const container = document.getElementById('container');
    container.style.fontFamily = 'Verdana';
    container.innerHTML = '3';
    setTimeout(() => {
        container.innerHTML = '2';
        setTimeout(() => {
            container.innerHTML = '1';
            setTimeout(() => {
                container.innerHTML = 'Begin!';
                setTimeout(() => {
                    container.innerHTML = '';
                    generateSequence();
                    displaySequence();
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}

function generateSequence() {
    sequence = [];
    let itemPool = [...colorNames];
    if (round > 6) {
        itemPool = [...colorNames, ...symbols, 'π', 'θ', 'π', 'θ']; // Increase chances for symbols
        round = 1;
    }
    for (let i = 0; i < round; i++) {
        let randomItem = itemPool[Math.floor(Math.random() * itemPool.length)];
        sequence.push(randomItem);
    }
}

function displaySequence() {
    let delay = 0;
    const container = document.getElementById('container');
    sequence.forEach((item, index) => {
        setTimeout(() => {
            if (symbols.includes(item)) {
                container.innerHTML = item;
                setTimeout(() => {
                    container.innerHTML = '';
                    if (index === sequence.length - 1) {
                        enableUserInput();
                    }
                }, 1000);
            } else {
                container.style.backgroundColor = item;
                setTimeout(() => {
                    container.style.backgroundColor = 'white';
                    if (index === sequence.length - 1) {
                        enableUserInput();
                    }
                }, 500);
            }
        }, delay);
        delay += 1000;
    });
}

function enableUserInput() {
    userSequence = [];
    colorButtons.forEach(button => {
        button.addEventListener('click', handleUserInput);
        button.style.fontFamily = 'Verdana';
    });
}

function handleUserInput(event) {
    const button = event.target;
    const color = button.id.split('-')[1];

    if (color === 'pi' || color === 'theta') {
        userSequence.push(color === 'pi' ? 'π' : 'θ');
    } else {
        userSequence.push(color);
    }

    const currentIndex = userSequence.length - 1;
    if (userSequence[currentIndex] !== sequence[currentIndex]) {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        return;
    }

    if (userSequence.length === sequence.length) {
        checkSequence();
    }
}

function checkSequence() {
    const isCorrect = userSequence.every((color, index) => color === sequence[index]);
    if (isCorrect) {
        alert('Good Job!');
        round++;
        startNextRound();
    } else {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
}

function startNextRound() {
    const container = document.getElementById('container');
    container.style.backgroundColor = 'white';
    container.innerHTML = '';
    displayCountdown();
    colorButtons.forEach(button => {
        button.removeEventListener('click', handleUserInput);
    });
}
