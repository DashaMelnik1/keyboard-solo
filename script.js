const wordContainer = document.querySelector('.word');
const correctCount = document.querySelector(".correct-count");
const wrongCount = document.querySelector(".wrong-count");
const wordMistakes = document.querySelector(".word-mistakes");
const timer = document.querySelector("#timer");

function getRandomWord() {
    const words = ['cat', 'dog', 'love', 'kid', 'apple', 'banana', 'success', 'travelling', 'job', 'telephone', 'programmer', 'house', 'flower', 'rain', 'melody'];
    const random = Math.floor(Math.random() * (words.length));
    return words[random];
}

let currentWord = getRandomWord();
renderWord(currentWord);


function renderWord(word) {
    wordContainer.innerHTML = word.split('').map((letter) => `<span>${letter}</span>`).join('');
}

let i = 0;
let timerId;
let isRunning = false;

document.addEventListener('keypress', (event) => {
    if (!isRunning) {
        timerId = setInterval(countTimer, 1000);
        isRunning = !isRunning;
    }
    console.log(event.key, currentWord);
    let randomLetters = Array.from(document.querySelectorAll('.word span'));

    if (event.key === currentWord[i]) {
        randomLetters[i].className = 'c';
        i++;
    } else {
        randomLetters[i].className = 'w';
        wrongCount.textContent = ++wrongCount.textContent;
        wordMistakes.textContent = ++wordMistakes.textContent;
    }
    if (i === currentWord.length) {
        correctCount.textContent = ++correctCount.textContent;
        setTimeout(nextWord, 0);
    }
})

function nextWord() {
    result();
    currentWord = getRandomWord();
    renderWord(currentWord);
    i = 0;
    wordMistakes.textContent = 0;
}

function clearContainer() {
    correctCount.textContent = 0;
    wrongCount.textContent = 0;
    clearInterval(timerId);
    timer.textContent = '00:00';
    seconds = 1;
    minutes = 0;

}

function result() {
    if (wrongCount.textContent >= 5) {
        alert(`Вы проиграли!Ваше время: ${timer.textContent}`);
        clearContainer();
        isRunning = false;
    }
    if (correctCount.textContent >= 5) {
        alert(`Вы победили! Ваше время: ${timer.textContent}`);
        clearContainer();
        isRunning = false;
    }
}

let seconds = 0;
let minutes = 0;

function format(val) {
    if (val < 10) {
        return `0${val}`;
    }
    return val;
}



function countTimer() {
    timer.innerHTML = `${format(minutes)}:${format(seconds)}`;
    if (seconds < 59) {
        seconds++;
    } else {
        minutes++;
        seconds = 0;
    }
}