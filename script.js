document.getElementById('start').addEventListener('click', startGame);

let round = 1;
let sequence = [];
let userSequence = [];

const colorButtons = [
    { button: document.getElementById('choice-red'), color: 'red' },
    { button: document.getElementById('choice-blue'), color: 'blue' },
    { button: document.getElementById('choice-green'), color: 'green' },
    { button: document.getElementById('choice-yellow'), color: 'yellow' },
    { button: document.getElementById('choice-pink'), color: 'pink' },
    { button: document.getElementById('choice-purple'), color: 'purple' },
    { button: document.getElementById('pi'), color: 'pi' },
    { button: document.getElementById('theta'), color: 'theta' }
];

const colorNames = ['red', 'blue', 'green', 'yellow', 'pink', 'purple'];
const symbols = ['pi', 'theta'];

const sounds = {
    red: {
        color: new Audio('red.mp3'),
        sound: new Audio('sound.wav')
    },
    blue: {
        color: new Audio('blue.mp3'),
        sound: new Audio('sound2.mp3')
    },
    green: {
        color: new Audio('green.mp3'),
        sound: new Audio('sound3.mp3')
    },
    yellow: {
        color: new Audio('yellow.mp3'),
        sound: new Audio('sound4.mp3')
    },
    pink: {
        color: new Audio('pink.mp3'),
        sound: new Audio('sound5.mp3')
    },
    purple: {
        color: new Audio('purple.mp3'),
        sound: new Audio('sound6.mp3')
    },
    pi: {
        color: new Audio('pi.mp3'),
        sound: new Audio('sound7.mp3')
    },
    theta: {
        color: new Audio('theta.mp3'),
        sound: new Audio('sound8.mp3')
    }
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
    countdown.style.backgroundColor = 'black';
    countdown.style.padding = '10px';
    countdown.style.borderRadius = '10px';
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
        itemPool = [...colorNames, ...symbols];
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
                document.getElementById('container').innerHTML = item === 'pi' ? 'π' : 'θ';
                playSound(item);
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
    colorButtons.forEach(({ button, color }) => {
        button.addEventListener('click', handleButtonClick);
        button.style.fontFamily = 'Verdana';
    });
}

function handleButtonClick(event) {
    const color = event.target.id.split('-')[1];
    userSequence.push(color);

    playButtonSound(color);

    const currentIndex = userSequence.length - 1;
    if (userSequence[currentIndex] !== sequence[currentIndex]) {
        window.location.href = 'https://www.youtube.com/watch?v=hB7CDrVnNCs';
    } else if (userSequence.length === sequence.length) {
        setTimeout(() => {
            alert('Good job! Next round.');
            round++;
            startNextRound();
        }, 100);
    }
}

function playSound(item) {
    if (sounds[item]) {
        const colorSound = sounds[item].color;
        const soundSound = sounds[item].sound;

        colorSound.currentTime = 0;
        soundSound.currentTime = 0;

        colorSound.play();
        soundSound.play();
    }
}

function playButtonSound(color) {
    if (sounds[color] && sounds[color].sound) {
        const sound = sounds[color].sound;
        sound.currentTime = 0;
        sound.play();
    }
}

function startNextRound() {
    userSequence = [];
    colorButtons.forEach(({ button }) => {
        button.removeEventListener('click', handleButtonClick);
    });
    generateSequence();
    displaySequence();
}

function resetGame() {
    round = 1;
    sequence = [];
    userSequence = [];
    document.getElementById('start').style.display = 'block';
}
