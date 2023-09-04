const popupPage = document.querySelector(".popup-page");
const timerPage = document.querySelector(".timer-page");

const workButtonsContainer = document.getElementById("work-btn-container");
const breakButtonsContainer = document.getElementById("break-btn-container");
const sessionButtonsContainer = document.getElementById(
  "session-btn-container"
);
const resetIcon = document.getElementById("reset-icon");
const playPauseIcon = document.getElementById("play-pause-icon");
const backButton = document.getElementById("back-icon");
const GO = document.getElementById("go-btn");
const resetAllButton = document.getElementById("reset-all");

let workTime = 0;
let breakTime = 0;
let sessions = 0;
let sessionCounter = 0;
let elapsedTime = 0;
let currentTime = 0;
let timeInSecs = 0;

// Store workTime, breakTime, and number of sessions in a local storage
workButtonsContainer.addEventListener("click", (e) => {
  if (e.target.dataset.work) {
    workTime = parseInt(e.target.dataset.work, 10);
    chrome.storage.local.set({ workTime: workTime });
    deselectAllButtons(workButtonsContainer);
    e.target.classList.remove("button-original-color");
    e.target.classList.add("button-clicked-color");
  }
});

breakButtonsContainer.addEventListener("click", (e) => {
  if (e.target.dataset.break) {
    breakTime = parseInt(e.target.dataset.break, 10);
    chrome.storage.local.set({ breakTime: breakTime });
    deselectAllButtons(breakButtonsContainer);
    e.target.classList.remove("button-original-color");
    e.target.classList.add("button-clicked-color");
  }
});

sessionButtonsContainer.addEventListener("click", (e) => {
  if (e.target.dataset.session) {
    sessions = parseInt(e.target.dataset.session, 10);
    chrome.storage.local.set({ sessions: sessions });
    deselectAllButtons(sessionButtonsContainer);
    e.target.classList.remove("button-original-color");
    e.target.classList.add("button-clicked-color");
  }
});

// Deselect a button when the other button is clicked
function deselectAllButtons(container) {
  container.querySelectorAll(".button").forEach((button) => {
    button.classList.add("button-original-color");
    button.classList.remove("button-clicked-color");
  });
}

// Initiate a session
GO.addEventListener("click", () => {
  if (workTime != 0 && breakTime != 0 && sessions != 0) {
    chrome.runtime.sendMessage({
      type: "SET_TIMER",
    });
    popupPage.style.display = "none";
    timerPage.style.display = "block";
  } else {
    document.getElementById("notice").innerHTML =
      "Please press all three types of buttons";
  }
});

//////////////////////////////////////////////

// fetch timer from service worker ever second
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("TIME_IN_SECS received, sending back: ");
  timeInSecs = message.timeInSecs;
  let mins = Math.floor(timeInSecs / 60);
  let secs = timeInSecs % 60;
  let view =
    (mins < 10 ? "0" : "") + mins + " : " + (secs < 10 ? "0" : "") + secs;
  document.getElementById("countdown").innerHTML = view;
});

chrome.storage.local.get("timeInSecs", function (result) {
  timeInSecs = parseInt(result.timeInSecs) || 0;
  updateTimerDisplay();
});

function updateTimerDisplay() {
  let mins = Math.floor(timeInSecs / 60);
  let secs = timeInSecs % 60;
  let view =
    (mins < 10 ? "0" : "") + mins + " : " + (secs < 10 ? "0" : "") + secs;
  document.getElementById("countdown").innerHTML = view;
}

playPauseIcon.addEventListener("click", () => {
  chrome.runtime.sendMessage({
    type: "PAUSE_TIMER",
  });
});

resetIcon.addEventListener("click", () => {
  chrome.runtime.sendMessage({
    type: "RESET_TIMER",
  });
});

backButton.addEventListener("click", () => {
  clearInterval(currentTime);

  popupPage.style.display = "block";
  timerPage.style.display = "none";
});

resetAllButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({
    type: "RESET_ALL",
  });
});

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(["sessionActive"], function (result) {
    if (result.sessionActive) {
      popupPage.style.display = "none";
      timerPage.style.display = "block";

      timeInSecs = result.timeInSecs || 0;
      updateTimerDisplay();

      sessionCounter = result.sessionCounter || 0;
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PLAY_AUDIO") {
    playAudio();
  } else if (message.type === "ADD_STAR") {
    if (message.sessionCounter >= 1 && message.sessionCounter <= 5) {
      checkStar();
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "ALL_RESET") {
    popupPage.style.display = "block";
    timerPage.style.display = "none";
  }
});

function checkStar() {
  console.log("Star Sticker is Activated!");
  return new Promise((resolve) => {
    let starElement = document.createElement("img");
    starElement.src = "./images/star.jpg";
    starElement.alt = "Star Sticker";
    starElement.style.width = "50px";
    document.getElementById("stickers").appendChild(starElement);
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
