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
var fontOption1 = document.querySelector('.font-option-1');
var fontOption2 = document.querySelector('.font-option-2');
let multip;
var fontOption3 = document.querySelector('.font-option-3');
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


setting.addEventListener('click', ()=> {
    settingContainer.classList.remove('hidden');
    container.classList.add('hidden');

})

close.addEventListener('click', ()=> {
    settingContainer.classList.add('hidden');
    container.classList.remove('hidden');
})

pomodoro.addEventListener('click', ()=> {
    activeBar = 'pom';
    startMinutes = pomodoroTime;
    time = startMinutes * 60;
    countDownEl.textContent = startMinutes < 10 ? `0${startMinutes}:00` : `${startMinutes}:00`;
    pomodoro.classList.add('active');
    shortBreak.classList.remove('active');
    longBreak.classList.remove('active');
    document.querySelector('.active').style.background = `${activeColor}`;
})

shortBreak.addEventListener('click', ()=> {
    activeBar = 'short';
    startMinutes = shortBreakTime;
    time = startMinutes * 60;
    countDownEl.textContent = startMinutes < 10 ? `0${startMinutes}:00` : `${startMinutes}:00`;
    shortBreak.classList.add('active');
    pomodoro.classList.remove('active');    
    longBreak.classList.remove('active');
    document.querySelector('.active').style.background = `${activeColor}`;
})
longBreak.addEventListener('click', ()=> {
    activeBar = 'long';
    startMinutes = longBreakTime;
    time = startMinutes * 60;
    countDownEl.textContent = startMinutes < 10 ? `0${startMinutes}:00` : `${startMinutes}:00`;
    longBreak.classList.add('active');
    shortBreak.classList.remove('active');
    pomodoro.classList.remove('active');
    document.querySelector('.active').style.background = `${activeColor}`;
})


applyBtn.addEventListener('click', ()=> {
    settingContainer.classList.add('hidden');
    container.classList.remove('hidden');
    pomodoroTime = pomodoroInput.value;
    shortBreakTime = shortBreakInput.value;
    longBreakTime = longBreakInput.value;
    if(activeBar === 'pom') {
        countDownEl.textContent = pomodoroTime < 10 ? `0${pomodoroTime}:00` : `${pomodoroTime}:00`;
        time = pomodoroTime * 60;
    }
    else if(activeBar === 'short') {
        countDownEl.textContent = shortBreakTime < 10 ? `0${shortBreakTime}:00` : `${shortBreakTime}:00`;
        time = shortBreakTime * 60;
    }
    else if (activeBar === 'long'){
        countDownEl.textContent = longBreakTime < 10 ? `0${longBreakTime}:00` : `${longBreakTime}:00`;
        time = longBreakTime * 60;
    }
    
    // console.log(multip);
})



var progressChecker;
startBtn.addEventListener('click', ()=> {
    multip = parseFloat(360/time);
    if(started) {
        startBtn.innerHTML = 'Start';
        started = false;
        myStop(progressChecker);
    }
    else {
        progressChecker = setInterval(()=> {
            minutes = Math.floor(time/60);
            let seconds = time % 60;   

            
            if(minutes >= 0 && seconds >= 0) {
                seconds = seconds < 10 ? '0' + seconds : seconds;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                countDownEl.textContent  = `${minutes}:${seconds}`;
                time--;
                if(activeColor === undefined) activeColor = 'tomato';
                // console.log(activeColor);
                progresssBar.style.background = `conic-gradient(
                    ${activeColor} ${time * multip}deg,
                    #141835 ${time * multip}deg
                )`;
            }
            
        } , 1000)
        startBtn.innerHTML = 'Pause';
        started = true;
    }
})

function myStop(myInterval) {
    clearInterval(myInterval);
  }
document.querySelector('.color-option-1').addEventListener('click', ()=> {
    
    applyBtn.classList.add('color-option-1');
    circle.classList.add('color-option-1');

    document.querySelector('.color-option-1 svg').classList.add('visible');
    document.querySelector('.color-option-2 svg').classList.remove('visible');
    document.querySelector('.color-option-3 svg').classList.remove('visible');
    
    applyBtn.classList.remove('color-option-2');
    circle.classList.remove('color-option-2');

    applyBtn.classList.remove('color-option-3');
    circle.classList.remove('color-option-3');
    activeColor = 'tomato';
    console.log( `active colo is ${activeColor}`);
})

document.querySelector('.color-option-2').addEventListener('click', ()=> {
    applyBtn.classList.add('color-option-2');
    circle.classList.add('color-option-2');
    document.querySelector('.color-option-2 svg').classList.add('visible');
    document.querySelector('.color-option-1 svg').classList.remove('visible');
    document.querySelector('.color-option-3 svg').classList.remove('visible');
    applyBtn.classList.remove('color-option-1');
    circle.classList.remove('color-option-1');
    applyBtn.classList.remove('color-option-3');
    circle.classList.remove('color-option-3');
    activeColor = 'lightskyblue';
    console.log( `active colo is ${activeColor}`);
})

document.querySelector('.color-option-3').addEventListener('click', ()=> {
    applyBtn.classList.add('color-option-3');
    circle.classList.add('color-option-3');
    document.querySelector('.color-option-1 svg').classList.remove('visible');
    document.querySelector('.color-option-2 svg').classList.remove('visible');
    document.querySelector('.color-option-3 svg').classList.add('visible');
    applyBtn.classList.remove('color-option-2');
    circle.classList.remove('color-option-2');
    applyBtn.classList.remove('color-option-1');
    circle.classList.remove('color-option-1');
    activeColor = 'violet';
    console.log( `active colo is ${activeColor}`);
})

fontOption1.addEventListener('click', ()=> {

    fontOption1.classList.add('active-font');
    fontOption2.classList.remove('active-font');
    fontOption3.classList.remove('active-font');
    document.body.classList.add('font-option-1');
    document.body.classList.remove('font-option-2');
    document.body.classList.remove('font-option-3');
})

fontOption2.addEventListener('click', ()=> {
    fontOption2.classList.add('active-font');
    fontOption1.classList.remove('active-font');
    fontOption3.classList.remove('active-font');
    document.body.classList.add('font-option-2');
    document.body.classList.remove('font-option-1');
    document.body.classList.remove('font-option-3');
})
fontOption3.addEventListener('click', ()=> {
    
    fontOption3.classList.add('active-font');
    fontOption2.classList.remove('active-font');
    fontOption1.classList.remove('active-font');
    document.body.classList.add('font-option-3');
    document.body.classList.remove('font-option-1');
    document.body.classList.remove('font-option-2');
})