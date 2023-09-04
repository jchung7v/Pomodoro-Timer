let resetIcon = document.getElementById("reset-icon");
let playPauseIcon = document.getElementById("play-pause-icon");

let sessionCounter;
let elapsedTime = 0;
let currentTime;
let timeInSecs;

// fetch timer from service worker ever second
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("TIME_IN_SECS received, sending back: ")
  timeInSecs = message.timeInSecs;
  let mins = Math.floor(timeInSecs / 60);
  let secs = timeInSecs % 60;
  let view =
    (mins < 10 ? "0" : "") + mins + " : " + (secs < 10 ? "0" : "") + secs;
  document.getElementById("countdown").innerHTML = view;
});

playPauseIcon.addEventListener("click", () => {
  chrome.runtime.sendMessage({
    type: "PAUSE_TIMER",
  })
});

resetIcon.addEventListener("click", () => {
  chrome.runtime.sendMessage({
    type: "RESET_TIMER",
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PLAY_AUDIO') {
    playAudio();
  } else if (message.type === 'ADD_STAR') {
    if (message.sessionCounter >= 1 && message.sessionCounter <= 5) {
      checkStar();
    }
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
