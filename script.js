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
    document.getElementById('pi'),
    document.getElementById('theta')
];

const colorNames = ['red', 'blue', 'green', 'yellow', 'pink', 'purple'];
const symbols = ['π', 'θ'];

const sounds = {
    red: new Audio('red.mp3'),
    blue: new Audio('blue.mp3'),
    green: new Audio('green.mp3'),
    yellow: new Audio('yellow.mp3'),
    pink: new Audio('pink.mp3'),
    purple: new Audio('purple.mp3'),
    pi: new Audio('pi.mp3'),
    theta: new Audio('theta.mp3')
};

function startGame() {
    document.getElementById('start').style.display = 'none';
    displayCountdown();
}

function displayCountdown() {
    const countdown = document.createElement('div');
    countdown.className = 'countdown';
    countdown.style.fontFamily = 'Verdana';
    countdown.style.fontSize = '50px';
    countdown.style.color = 'white';
    countdown.style.backgroundColor = 'black'; // Add black background
    countdown.style.padding = '10px'; // Add padding
    countdown.style.borderRadius = '10px'; // Add border radius
    countdown.innerHTML = '3';
    document.getElementById('container').appendChild(countdown);

    setTimeout(() => {
        countdown.innerHTML = '2';
        setTimeout(() => {
            countdown.innerHTML = '1';
            setTimeout(() => {
                countdown.innerHTML = 'Begin!';
                setTimeout(() => {
                    countdown.style.display = 'none';
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
        itemPool = [...colorNames, ...symbols, 'π', 'θ', 'π', 'θ'];
        round = 1;
    }
    for (let i = 0; i < round; i++) {
        let randomItem = itemPool[Math.floor(Math.random() * itemPool.length)];
        sequence.push(randomItem);
    }
}

function displaySequence() {
    let delay = 0;
    sequence.forEach((item, index) => {
        setTimeout(() => {
            if (symbols.includes(item)) {
                document.getElementById('container').innerHTML = item;
                playSound(item === 'π' ? 'pi' : 'theta');
                setTimeout(() => {
                    document.getElementById('container').innerHTML = '';
                    if (index === sequence.length - 1) {
                        enableUserInput();
                    }
                }, 1000);
            } else {
                document.getElementById('container').style.backgroundColor = item;
                playSound(item);
                setTimeout(() => {
                    document.getElementById('container').style.backgroundColor = 'white';
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
    const color = button.id;

    if (symbols.includes(color)) {
        userSequence.push(color);
    } else {
        userSequence.push(color.split('-')[1]);
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
    document.getElementById('container').style.backgroundColor = 'white';
    document.getElementById('container').innerHTML = '';
    displayCountdown();
    colorButtons.forEach(button => {
        button.removeEventListener('click', handleUserInput);
    });
}

function playSound(item) {
    if (sounds[item]) {
        sounds[item].currentTime = 0; 
        sounds[item].play();
    }
}
