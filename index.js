const workTime = 10*1000;
const restTime = 5*1000;

let currentTime = workTime;
let workIntervals = 2;
let currentMode = "Working...";

const dataPercent = document.querySelectorAll('.data-percent')[0];

const timer = document.getElementById('timer');

const modeE1 = document.getElementById('mode');


let countdownInterval;

updateCountdown(currentTime);
countdown(currentTime);


function countdown(pTime){
    

    countdownInterval = setInterval(() => {
	pTime = pTime - 1000;
	if (pTime <= 0)
	{
	    if (workIntervals >= 0)
	    {
		clearInterval(countdownInterval);
		if (workIntervals > 0){
		    switchMode();
		}
	    } else {

		clearInterval(countdownInterval);
	    }
	}
	updateCountdown(pTime)
    }, 1000)

}



function updateCountdown(pTime){
    if (pTime <= 0 && workIntervals == 0){
	// turn red, reset angle	
	dataPercent.style.setProperty('--angle', '360deg');
	dataPercent.style.setProperty('--color', 'red');
	timer.innerText = `00:00`;
	modeE1.innerText = `END: 0`;
    } else {
	let angle = pTime / (currentMode == "Working..." ? workTime : restTime) * 360 + 'deg';
	if (pTime == 0){
	    angle = '360deg';
	}
	let color = currentMode == "Working..." ? 'blue' : 'red';
	dataPercent.style.setProperty('--angle', angle); 
	dataPercent.style.setProperty('--color', color); 



	let minutes = Math.floor(pTime / 60 / 1000).toString().padStart(2, "0");
	let seconds = Math.floor((pTime / 1000) % 60).toString().padStart(2, "0");

	timer.innerText = `${minutes} : ${seconds}`;

	modeE1.innerText = `${currentMode} : ${workIntervals}`;

    }


}

function switchMode(){
    currentMode = currentMode == "Working..." ? "Resting..." : "Working...";
    workIntervals = currentMode == "Working..." ? workIntervals - 1 : workIntervals;
    currentTime = currentMode == "Working..." ? workTime : restTime;
    updateCountdown(currentTime)
    countdown(currentTime);
}

function play(){

    clearInterval(countdownInterval);
    countdown(currentTime);
    document.querySelectorAll('.play')[0].classList.add('d-none'); 
    document.querySelectorAll('.pause')[0].classList.remove('d-none');



}

function pause(){
    clearInterval(countdownInterval);
    let [minutes, seconds] = timer.innerText.split(":");
    currentTime = ((minutes * 60) + (seconds * 1)) * 1000;
    document.querySelectorAll('.play')[0].classList.remove('d-none'); 
    document.querySelectorAll('.pause')[0].classList.add('d-none');
    
    

}

function reset(){
    clearInterval(countdownInterval);

    currentMode = "Working...";
    currentTime = workTime;
    numberOfWorkIntervals = 2;

    document.querySelectorAll('.play')[0].classList.add('d-none'); 
    document.querySelectorAll('.pause')[0].classList.remove('d-none');

    updateCountdown(currentTime);
    countdown(currentTime);
}
