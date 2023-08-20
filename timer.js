const workTime = parseInt(localStorage.getItem("workTime"));
const breakTime = parseInt(localStorage.getItem("breakTime"));
const totalSessions = parseInt(localStorage.getItem("sessions"));
let sessionCounter;

console.log(workTime + " " + breakTime + " " + totalSessions);

startSession();

async function startSession() {
  for (let i = 1; i <= totalSessions; i++) {
    console.log("i: " + i);
    sessionCounter = i;
    console.log("session counter: " + sessionCounter)
    document.getElementById("sessionNumber").innerHTML = "Session " + i;
    await startWorkTimer();
    await startBreakTimer();
    await checkStar();
  }
}

function startWorkTimer() {
  console.log("Work Timer Activated!");
  return new Promise((resolve) => {
    TimeInSecs = workTime * 2;
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
    let paused = false;
    let elapsedTime = 0;
    TimeInSecs = breakTime * 2;
    breakTimer = setInterval(() => {
      if (TimeInSecs <= 0) {
        clearInterval(breakTimer);
        document.getElementById("countDownText").innerHTML =
          "Session is Completed. It's time for the break";
        resolve();
      } else if (!paused) {
        elapsedTime++;
        console.log(elapsedTime);
        tick();
      }
    }, 1000);
  });
}

function pauseInterval() {
    paused = true;
}

function resumeInterval() {
    paused = false;
}

function tick() {
  TimeInSecs--;
  let mins = Math.floor(TimeInSecs / 60);
  let secs = TimeInSecs % 60;
  let pretty =
    (mins < 10 ? "0" : "") + mins + " : " + (secs < 10 ? "0" : "") + secs;

  document.getElementById("countDownText").innerHTML = pretty;
}

function checkStar() {
  console.log("Star Sticker is Activated!");
  return new Promise((resolve) => {
    let starElement = document.createElement("img");
    starElement.src = "star.jpg";
    starElement.alt = "Star Sticker";
    starElement.style.width = "50px";

    if (sessionCounter >= 1 && sessionCounter <= 5) {
      document.getElementById("stickers").appendChild(starElement);
    }
    resolve();
  });
}
