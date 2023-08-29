const workButtonsContainer = document.getElementById("work-btn-container");
const breakButtonsContainer = document.getElementById("break-btn-container");
const sessionButtonsContainer = document.getElementById(
  "session-btn-container"
);
const GO = document.getElementById("go-btn");

let workTime = 0;
let breakTime = 0;
let sessions = 0;
let workTimeInSecs;
let breakTimeInSecs;
let workTimer;
let isClicked = false;

workButtonsContainer.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.dataset.work) {
    workTime = parseInt(e.target.dataset.work, 10);
    localStorage.setItem("workTime", workTime);
    console.log(workTime);

    deselectAllButtons(workButtonsContainer);
    e.target.classList.remove("button-original-color");
    e.target.classList.add("button-clicked-color");
  }
});

breakButtonsContainer.addEventListener("click", (e) => {
  if (e.target.dataset.break) {
    breakTime = parseInt(e.target.dataset.break, 10);
    localStorage.setItem("breakTime", breakTime);
    console.log(breakTime);

    deselectAllButtons(breakButtonsContainer);
    e.target.classList.remove("button-original-color");
    e.target.classList.add("button-clicked-color");
  }
});

sessionButtonsContainer.addEventListener("click", (e) => {
  if (e.target.dataset.session) {
    sessions = parseInt(e.target.dataset.session, 10);
    localStorage.setItem("sessions", sessions);
    console.log(sessions);

    deselectAllButtons(sessionButtonsContainer);
    e.target.classList.remove("button-original-color");
    e.target.classList.add("button-clicked-color");
  }
});

GO.addEventListener("click", () => {
  console.log("GO");
  if (workTime != 0 && breakTime != 0 && sessions != 0) {
    window.location.href = "timer.html";
  } else {
    document.getElementById("notice").innerHTML =
      "Please press all three types of buttons";
  }
});

function deselectAllButtons(container) {
  container.querySelectorAll("button").forEach((button) => {
    button.classList.add("button-original-color");
    button.classList.remove("button-clicked-color");
  });
}

