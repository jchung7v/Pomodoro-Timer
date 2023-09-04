// chrome.storage.local.get(["workTime"], function (result) {
//   workTime = parseInt(result.workTime) || 0;
// });
// chrome.storage.local.get(["breakTime"], function (result) {
//   breakTime = parseInt(result.breakTime) || 0;
// });
// chrome.storage.local.get(["sessions"], function (result) {
//   sessions = parseInt(result.sessions) || 0;
// });
let workTime = 0;
let breakTime = 0;
let sessions = 0;
let sessionCounter = 0;
let paused = false;
let elapsedTime = 0;
let currentTime;
let timeInSecs;

chrome.storage.local.get(["workTime", "breakTime", "sessions"], function (result) {
  workTime = parseInt(result.workTime) || 0;
  breakTime = parseInt(result.breakTime) || 0;
  sessions = parseInt(result.sessions) || 0;
});

// receive a message from popup.js and respond to it
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "SET_TIMER":
      startSession();
      break;
    case "PAUSE_TIMER":
      pauseTimer();
      break;
    case "RESET_TIMER":
      resetTimer();
      break;
  }
});

// start new session
async function startSession() {
  console.log("startSession Activated!");
  for (let i = 1; i <= sessions; i++) {
    sessionCounter = i;
    await startTimer(workTime);
    await startTimer(breakTime);
    chrome.runtime.sendMessage({
      type: "ADD_STAR",
      sessionCounter: sessionCounter,
    });
  }
}

// start work/break timer
function startTimer(duration) {
  console.log("startTimer Activated!");
  return new Promise((resolve) => {
    clearInterval(currentTime);
    timeInSecs = duration * 60;
    console.log("This is timeInSecs: " + timeInSecs);
    elapsedTime = 0;
    currentTime = setInterval(() => {
      if (timeInSecs <= 0) {
        chrome.runtime.sendMessage({ type: "PLAY_AUDIO" });
        clearInterval(currentTime);
        resolve();
      } else if (paused === true) {
        clearInterval(currentTime);
      } else {
        elapsedTime++;
        timeInSecs--;
        console.log("This is timeInSecs: " + timeInSecs);
        console.log("This is elapsedTime: " + elapsedTime);
        // send data to display timer on screen
        chrome.runtime.sendMessage({
          type: "Time_In_Secs",
          timeInSecs: timeInSecs,
          elapsedTime: elapsedTime,
        });
      }
    }, 1000);
  });
}

// pause current timer
function pauseTimer() {
  paused = !paused;
  if (!paused) {
    startTimer(timeInSecs / 60);
  }
}

// reset current timer
function resetTimer() {
  paused = false;
  startTimer(workTime, "Work Timer");
}
