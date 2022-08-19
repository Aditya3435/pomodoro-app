'use strict';

const progresssBar = document.querySelector('.circle');
const container = document.querySelector('.container');
const valueBar = document.querySelector('.inner-circle');
const setting = document.querySelector('.setting');
const settingContainer = document.querySelector('.setting-container');
const close = document.getElementById('close');
const startBtn = document.querySelector('.start');
const countDownEl = document.querySelector('.timer');
const pomodoro = document.querySelector('.pomodoro');
const shortBreak = document.querySelector('.short-break');
const longBreak = document.querySelector('.long-break');
const pomodoroInput = document.getElementById('pomodoro');
const shortBreakInput = document.getElementById('short');
const longBreakInput = document.getElementById('long');
const applyBtn = document.querySelector('.apply');
const circle = document.querySelector('.circle');
const options = document.querySelector('.options');
const colorOption1 = document.querySelector('.color-option-1');
const colorOption2 = document.querySelector('.color-option-2');
const colorOption3 = document.querySelector('.color-option-3');

let multip;
let active = document.querySelector('.active');
let root = document.querySelector(':root');
// var activeColor = window.getComputedStyle(active, null).getPropertyValue('background');
let activeColor;
let pomodoroTime = 25;
countDownEl.textContent = pomodoroTime < 10 ? `0${pomodoroTime}:00` : `${pomodoroTime}:00`;
let shortBreakTime = 10;
let longBreakTime = 20;
let startMinutes = pomodoroTime;
let time = startMinutes * 60;
let started = false;
let minutes;
let activeBar = 'pom';
pomodoroInput.value = pomodoroTime;
shortBreakInput.value = shortBreakTime;
longBreakInput.value = longBreakTime;
active.style.background = `${activeColor}`;

const getSiblings = (TargetNode) =>
    [...TargetNode.parentNode.children].filter(
        (siblings) => siblings !== TargetNode
    );


setting.addEventListener('click', () => {
    settingContainer.classList.remove('hidden');
    container.style = `filter: blur(5px)`;

})

close.addEventListener('click', () => {
    settingContainer.classList.add('hidden');
    container.classList.remove('hidden');
    myStop(progressChecker);
    container.style = `filter: blur(0)`;
})


colorOption1.addEventListener('click', () => {
    document.querySelector('.color-option-1 svg').classList.add('visible');
    document.querySelector('.color-option-2 svg').classList.remove('visible');
    document.querySelector('.color-option-3 svg').classList.remove('visible');
    activeColor = window.getComputedStyle(colorOption1, null).getPropertyValue(('background-color'));
    root.style = `--active-color: ${activeColor} `;
})


colorOption2.addEventListener('click', () => {
    document.querySelector('.color-option-1 svg').classList.remove('visible');
    document.querySelector('.color-option-2 svg').classList.add('visible');
    document.querySelector('.color-option-3 svg').classList.remove('visible');
    activeColor = window.getComputedStyle(colorOption2, null).getPropertyValue(('background-color'));
    root.style = `--active-color: ${activeColor} `;
})




colorOption3.addEventListener('click', () => {
    document.querySelector('.color-option-1 svg').classList.remove('visible');
    document.querySelector('.color-option-2 svg').classList.remove('visible');
    document.querySelector('.color-option-3 svg').classList.add('visible');
    activeColor = window.getComputedStyle(colorOption3, null).getPropertyValue(('background-color'));
    root.style = `--active-color: ${activeColor} `;
})


applyBtn.addEventListener('click', () => {
    container.style = `filter: blur(0)`;
    myStop(progressChecker);
    settingContainer.classList.add('hidden');
    container.classList.remove('hidden');
    pomodoroTime = pomodoroInput.value;
    shortBreakTime = shortBreakInput.value;
    longBreakTime = longBreakInput.value;
    if (activeBar === 'pom') {
        countDownEl.textContent = pomodoroTime < 10 ? `0${pomodoroTime}:00` : `${pomodoroTime}:00`;
        time = pomodoroTime * 60;
    }
    else if (activeBar === 'short') {
        countDownEl.textContent = shortBreakTime < 10 ? `0${shortBreakTime}:00` : `${shortBreakTime}:00`;
        time = shortBreakTime * 60;
    }
    else if (activeBar === 'long') {
        countDownEl.textContent = longBreakTime < 10 ? `0${longBreakTime}:00` : `${longBreakTime}:00`;
        time = longBreakTime * 60;
    }
})



var progressChecker;
startBtn.addEventListener('click', () => {
    multip = parseFloat(360 / time);
    if (started) {
        myStop(progressChecker);
    }
    else {
        progressChecker = setInterval(() => {
            minutes = Math.floor(time / 60);
            let seconds = time % 60;


            if (minutes >= 0 && seconds >= 0) {
                seconds = seconds < 10 ? '0' + seconds : seconds;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                countDownEl.textContent = `${minutes}:${seconds}`;
                time--;
                if (activeColor === undefined) activeColor = 'tomato';
                progresssBar.style.background = `conic-gradient(
                    ${activeColor} ${time * multip}deg,
                    #141835 ${time * multip}deg
                )`;
            }

        }, 1000)
        startBtn.innerHTML = 'Pause';
        started = true;
    }
})

function myStop(myInterval) {
    clearInterval(myInterval);
    started = false;
    startBtn.innerHTML = 'Start';
    progresssBar.style.background = `${activeColor}`;

}

pomodoro.addEventListener('click', () => {
    myStop(progressChecker);
    activeBar = 'pom';
    startMinutes = pomodoroTime;
    time = startMinutes * 60;
    countDownEl.textContent = startMinutes < 10 ? `0${startMinutes}:00` : `${startMinutes}:00`;
    pomodoro.classList.add('active');
    getSiblings(pomodoro).forEach((siblings => {
        siblings.classList.remove('active');
    }))
})

shortBreak.addEventListener('click', () => {
    myStop(progressChecker);
    activeBar = 'short';
    startMinutes = shortBreakTime;
    time = startMinutes * 60;
    countDownEl.textContent = startMinutes < 10 ? `0${startMinutes}:00` : `${startMinutes}:00`;
    shortBreak.classList.add('active');
    getSiblings(shortBreak).forEach((siblings => {
        siblings.classList.remove('active');
    }))

})
longBreak.addEventListener('click', () => {
    myStop(progressChecker);
    activeBar = 'long';
    startMinutes = longBreakTime;
    time = startMinutes * 60;
    countDownEl.textContent = startMinutes < 10 ? `0${startMinutes}:00` : `${startMinutes}:00`;
    longBreak.classList.add('active');
    getSiblings(longBreak).forEach((siblings => {
        siblings.classList.remove('active');
    }))
})



fontOption1.addEventListener('click', () => {

    fontOption1.classList.add('active-font');
    getSiblings(fontOption1).forEach((siblings => {
        siblings.classList.remove('active-font');
    }))
    document.body.classList.add('font-option-1');
    document.body.classList.remove('font-option-2');
    document.body.classList.remove('font-option-3');
})

fontOption2.addEventListener('click', () => {
    fontOption2.classList.add('active-font');
    getSiblings(fontOption2).forEach((siblings => {
        siblings.classList.remove('active-font');
    }))
    document.body.classList.add('font-option-2');
    document.body.classList.remove('font-option-1');
    document.body.classList.remove('font-option-3');
})
fontOption3.addEventListener('click', () => {

    fontOption3.classList.add('active-font');
    getSiblings(fontOption3).forEach((siblings => {
        siblings.classList.remove('active-font');
    }))
    document.body.classList.add('font-option-3');
    document.body.classList.remove('font-option-1');
    document.body.classList.remove('font-option-2');
})