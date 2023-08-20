const workButtonsContainer = document.getElementById("workButtonsContainer");
const breakButtonsContainer = document.getElementById("breakButtonsContainer");
const sessionButtonsContainer = document.getElementById(
  "sessionButtonsContainer"
);
const GO = document.getElementById("GO");

let workTime = 0;
let breakTime = 0;
let sessions = 0;
let workTimeInSecs;
let breakTimeInSecs;
let workTimer;

workButtonsContainer.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.dataset.work) {
    workTime = parseInt(e.target.dataset.work, 10);
    localStorage.setItem("workTime", workTime);
    console.log(workTime);
  }
});

breakButtonsContainer.addEventListener("click", (e) => {
  if (e.target.dataset.break) {
    breakTime = parseInt(e.target.dataset.break, 10);
    localStorage.setItem("breakTime", breakTime);
    console.log(breakTime);
  }
});

sessionButtonsContainer.addEventListener("click", (e) => {
  if (e.target.dataset.session) {
    sessions = parseInt(e.target.dataset.session, 10);
    localStorage.setItem("sessions", sessions);
    console.log(sessions);
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