let workTime = 0;
let breakTime = 0;
let sessions = 0;
let sessionCounter = 0;
let paused = false;
let elapsedTime = 0;
let currentTime;
let timeInSecs;
let sessionActive = false;

chrome.storage.local.get(
  [
    "workTime",
    "breakTime",
    "sessions",
    "timeInSecs",
    "sessionActive",
    "sessionCounter",
  ],
  function (result) {
    workTime = parseInt(result.workTime) || 0;
    breakTime = parseInt(result.breakTime) || 0;
    sessions = parseInt(result.sessions) || 0;
    timeInSecs = parseInt(result.timeInSecs) || 0;
    sessionActive = result.sessionActive || false;
    sessionCounter = parseInt(result.sessionCounter) || 0;
  }
);

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
    case "RESET_ALL":
      resetAll();
      break;
  }
});

// start new session
async function startSession() {
  if (sessionActive) return;
  sessionActive = true;
  chrome.storage.local.set({ sessionActive: true });

  console.log("startSession Activated!");

  for (let i = 1; i <= sessions; i++) {
    sessionCounter = i;
    chrome.storage.local.set({ sessionCounter: sessionCounter });
    await startTimer(workTime);
    await startTimer(breakTime);
    chrome.runtime.sendMessage({
      type: "ADD_STAR",
      sessionCounter: sessionCounter,
    });
  }
  chrome.storage.local.set({ sessionActive: false });
  sessionActive = false;
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
        chrome.storage.local.set({ timeInSecs: timeInSecs });
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

function resetAll() {
  clearInterval(currentTime);
  timeInSecs = 0;
  sessionCounter = 0;
  sessionActive = false;
  paused = false;

  chrome.storage.local.set({
    workTime: 0,
    breakTime: 0,
    sessions: 0,
    timeInSecs: 0,
    sessionActive: false,
    sessionCounter: 0,
  });
  chrome.runtime.sendMessage({ type: "ALL_RESET" });
}
