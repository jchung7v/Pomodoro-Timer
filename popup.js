const workButtonsContainer = document.getElementById("work-btn-container");
const breakButtonsContainer = document.getElementById("break-btn-container");
const sessionButtonsContainer = document.getElementById(
  "session-btn-container"
);
const GO = document.getElementById("go-btn");

let workTime = 0;
let breakTime = 0;
let sessions = 0;
// let workTimeInSecs;
// let breakTimeInSecs;
// let workTimer;
// let isClicked = false;

// store workTime, breakTime, and # of sessions in a local storage
workButtonsContainer.addEventListener("click", (e) => {
  if (e.target.dataset.work) {
    workTime = parseInt(e.target.dataset.work, 10);
    chrome.storage.local.set({ workTime: workTime});
    deselectAllButtons(workButtonsContainer);
    e.target.classList.remove("button-original-color");
    e.target.classList.add("button-clicked-color");
  }
});

breakButtonsContainer.addEventListener("click", (e) => {
  if (e.target.dataset.break) {
    breakTime = parseInt(e.target.dataset.break, 10);
    chrome.storage.local.set({ breakTime: breakTime});
    deselectAllButtons(breakButtonsContainer);
    e.target.classList.remove("button-original-color");
    e.target.classList.add("button-clicked-color");
  }
});

sessionButtonsContainer.addEventListener("click", (e) => {
  if (e.target.dataset.session) {
    sessions = parseInt(e.target.dataset.session, 10);
    chrome.storage.local.set({ sessions: sessions});
    deselectAllButtons(sessionButtonsContainer);
    e.target.classList.remove("button-original-color");
    e.target.classList.add("button-clicked-color");
  }
});

// initiate a session if all three types of buttons are clicked.
GO.addEventListener("click", () => {
  if (workTime != 0 && breakTime != 0 && sessions != 0) {
      chrome.runtime.sendMessage({
      type: "SET_TIMER",
      // workTime: workTime,
      // breakTime: breakTime,
      // sessions: sessions,
    });
    window.location.href = "timer.html";
  } else {
    document.getElementById("notice").innerHTML =
      "Please press all three types of buttons";
  }
});

// deselect a button when the other button is clicked
function deselectAllButtons(container) {
  container.querySelectorAll("button").forEach((button) => {
    button.classList.add("button-original-color");
    button.classList.remove("button-clicked-color");
  });
}

function sendUserSelectedTime() {}
