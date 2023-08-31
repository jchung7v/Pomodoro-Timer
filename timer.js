const workTime = parseInt(localStorage.getItem("workTime"));
const breakTime = parseInt(localStorage.getItem("breakTime"));
const totalSessions = parseInt(localStorage.getItem("sessions"));
let restartIcon = document.getElementById("restart-icon");
let playPauseIcon = document.getElementById("play-pause-icon");

let sessionCounter;
let paused = false;
let restart = false;
let elapsedTime = 0;
let currentTimer;

console.log(workTime + " " + breakTime + " " + totalSessions);

startSession();

async function startSession() {
  for (let i = 1; i <= totalSessions; i++) {
    console.log("i: " + i);
    sessionCounter = i;
    console.log("session counter: " + sessionCounter);
    document.getElementById("sessionNumber").innerHTML = "Session " + i;
    await startTimer(workTime, "Work Timer");
    await playAudio();
    await startTimer(breakTime, "Break Timer");
    await checkStar();
  }
}

function startTimer(duration, label) {
  console.log("Timer Activated!");
  return new Promise((resolve) => {
    clearInterval(currentTimer);
    timeInSecs = duration * 5 + 1;
    elapsedTime = 0;
    currentTimer = setInterval(() => {
      if (timeInSecs <= 0 || paused) {
        clearInterval(currentTimer);
        resolve();
      } else {
        elapsedTime++;
        tick();
      }
    }, 1000);
  });
}

// function startBreakTimer() {
//   console.log("Break Timer Activated!");
//   return new Promise((resolve) => {
//     timeInSecs = breakTime * 5 + 1;
//     breakTimer = setInterval(() => {
//       if (timeInSecs <= 0) {
//         clearInterval(breakTimer);
//         document.getElementById("countDownText").innerHTML =
//           "Session is Completed. It's time for the break";
//         resolve();
//       } else if (!paused) {
//         elapsedTime++;
//         console.log("elapsedTime: " + elapsedTime);
//         tick();
//       }
//     }, 1000);
//   });
// }

playPauseIcon.addEventListener("click", () => {
  paused = !paused;
});

restartIcon.addEventListener("click", () => {
  console.log("Restart Button is Activated!");
  paused = false;
  clearInterval(workTimer);
  clearInterval(breakTimer);

  timeInSecs = workTime * 60;
  elapsedTime = 0;
  startWorkTimer();
});

function tick() {
  timeInSecs--;
  let mins = Math.floor(timeInSecs / 60);
  let secs = timeInSecs % 60;
  let pretty =
    (mins < 10 ? "0" : "") + mins + " : " + (secs < 10 ? "0" : "") + secs;

  document.getElementById("countdown").innerHTML = pretty;
}

function checkStar() {
  console.log("Star Sticker is Activated!");
  return new Promise((resolve) => {
    let starElement = document.createElement("img");
    starElement.src = "./images/star.jpg";
    starElement.alt = "Star Sticker";
    starElement.style.width = "50px";

    if (sessionCounter >= 1 && sessionCounter <= 5) {
      document.getElementById("stickers").appendChild(starElement);
    }
    resolve();
  });
}

async function playAudio() {
  const audio = new Audio("./images/promise-616.mp3");
  try {
    await audio.play();
  } catch (err) {
    console.log("You must allow audio play in the browser");
  }
}
