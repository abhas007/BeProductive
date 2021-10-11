//	TIMER------------------------------------------------------------------
document.getElementById("timerButton").addEventListener("click",startTimer);

function startTimer(button){
	var timerLength = document.getElementById('time').valueAsNumber;
	console.log(`Set timer for ${timerLength} minutes`);

	if (timerLength <=0 || isNaN(timerLength)){
		alert("Not possible!");
		return;
	}

	let time = Math.floor(timerLength*60);

	const countdownEl = document.getElementById('countdown');
	countdownEl.style.display="";
	x = setInterval(updateCountdown, 1000);

	function updateCountdown(){
		let minutes = Math.floor(time/60);
		let seconds = time%60;

		seconds = seconds<10 ? '0' + seconds:seconds;
		minutes = minutes<10 ? '0' + minutes:minutes;
		countdownEl.innerHTML = `${minutes} : ${seconds}`;
		time--;
		if (time==-1){
			clearInterval(x);

			button.innerText="Start Timer"
			chrome.runtime.sendMessage("Time Over!");
		}
	}
}


//	ALARM------------------------------------------------------------------
document.getElementById("alarmButton").addEventListener("click",setAlarm);
var alarmSound = new Audio();
alarmSound.src = 'alarm.mp3';
var alarmTimer;

function setAlarm(button) {
	var ms = document.getElementById('alarmTime').valueAsNumber;
	if(isNaN(ms)) {
		alert('Invalid Date');
		return;
	}

	var alarm = new Date(ms);
	var alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(),  alarm.getUTCHours(), alarm.getUTCMinutes(), alarm.getUTCSeconds());
	
	var timeLeft = alarmTime.getTime() - (new Date()).getTime();

	if(timeLeft < 0) {
		alert('Specified time is already passed');
		return;
	}
	alert('Alarm set!');
	alarmTimer = setTimeout(ringAlarm, timeLeft);

};

function ringAlarm() {
	alarmSound.play();
	let alarmName = document.getElementById('alarmName').value;
	let msg = {
		Text: alarmName
	}
	chrome.runtime.sendMessage(msg);

};

document.getElementById("block").addEventListener("click",function(){
	let site = document.getElementById("site").value
	if(site.length>0){
		chrome.runtime.sendMessage(site);
	}
})

document.getElementById("unblock").addEventListener("click", function(){
	chrome.runtime.sendMessage("unblock");
})

// TO DO --------------------------------------------------------------------
document.getElementById("todoButton").addEventListener("click",function (e) {
	e.preventDefault();
	let tick = document.createElement("input");
	tick.type = "checkbox";
	tick.className = "checkmark"

	let task = document.createElement("input");
	task.type="text";
    task.placeholder = "What needs to be done?";

	let enter = document.createElement("br");

	let listplace = document.getElementById("listplace");

	listplace.appendChild(tick);
	
    listplace.appendChild(task);
	
	listplace.appendChild(enter);
	listplace.appendChild(enter);
});