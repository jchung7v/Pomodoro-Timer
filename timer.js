const workTime = parseInt(localStorage.getItem("workTime"));
const breakTime = parseInt(localStorage.getItem("breakTime"));
const totalSessions = parseInt(localStorage.getItem("sessions"));
let sessionCounter = 0;

console.log(workTime + " " + breakTime + " " + totalSessions);

initiateSessions();

async function initiateSessions() {
  for (let i = 1; i <= totalSessions; i++) {
    console.log(i);
    sessionCounter = i;
    document.getElementById("sessionNumber").innerHTML = "Session " + i;
    await startWorkTimer();
    await startBreakTimer();
    await checkStar();
  }
}

function startWorkTimer() {
  console.log("Work Timer Activated!");
  return new Promise((resolve) => {
    TimeInSecs = workTime * 5;
    workTimer = setInterval(() => {
      if (TimeInSecs <= 0) {
        clearInterval(workTimer);
        document.getElementById("countDownText").innerHTML =
          "Session is Completed. It's time for the break";
        resolve();
      } else {
        tick();
      }
    }, 1000);
  });
}

function startBreakTimer() {
  console.log("Break Timer Activated!");
  return new Promise((resolve) => {
    TimeInSecs = breakTime * 2;
    breakTimer = setInterval(() => {
      if (TimeInSecs <= 0) {
        clearInterval(breakTimer);
        document.getElementById("countDownText").innerHTML =
          "Session is Completed. It's time for the break";
        sessionCounter++;
        resolve();
      } else {
        tick();
      }
    }, 1000);
  });
}

function tick() {
  TimeInSecs--;
  let mins = Math.floor(TimeInSecs / 60);
  let secs = TimeInSecs % 60;
  let pretty =
    (mins < 10 ? "0" : "") + mins + " : " + (secs < 10 ? "0" : "") + secs;

  document.getElementById("countDownText").innerHTML = pretty;
}

function checkStart() {
    if (sessionCounter == 2) {
        document.getElementById("stickers").innerHTML = 
    }
}