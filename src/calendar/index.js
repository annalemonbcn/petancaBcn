import { checkToday } from "./utils.js";

let display = document.querySelector(".display");
let previous = document.querySelector(".left");
let next = document.querySelector(".right");
let days = document.querySelector(".days");
let selected = document.querySelector(".selected");

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const displayCalendar = () => {
  let formattedDate = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  display.innerHTML = `${formattedDate}`;

  const firstDay = new Date(year, month, 1);
  const firstDayIndex = firstDay.getDay() - 1;
  const lastDay = new Date(year, month + 1, 0);
  const numberOfDays = lastDay.getDate();

  for (let x = 0; x < firstDayIndex; x++) {
    const dayContainer = document.createElement("div");
    dayContainer.innerHTML += "";
    days.appendChild(dayContainer);
  }

  for (let i = 1; i <= numberOfDays; i++) {
    let div = document.createElement("div");
    let currentDate = new Date(year, month, i);
    div.dataset.date = currentDate.toDateString();
    div.innerHTML += i;
    days.appendChild(div);

    if (checkToday(currentDate)) div.classList.add("current-date");
  }
};

const displaySelected = () => {
  const dayElements = document.querySelectorAll(".days div");
  dayElements.forEach((day) => {
    day.onclick = (e) => {
      const selectedDate = e.target.dataset.date;
      selected.innerHTML = `Selected Date : ${selectedDate}`;
      // day.classList.add("selected-date");
    };
  });
};

previous.addEventListener("click", () => {
  days.innerHTML = "";
  selected.innerHTML = "";
  if (month < 0) {
    month = 11;
    year = year - 1;
  }
  month = month - 1;
  console.log(month);
  date.setMonth(month);
  displayCalendar();
  displaySelected();
});

next.addEventListener("click", () => {
  days.innerHTML = "";
  selected.innerHTML = "";
  if (month > 11) {
    month = 0;
    year = year + 1;
  }
  month = month + 1;
  date.setMonth(month);
  displayCalendar();
  displaySelected();
});

displayCalendar();
displaySelected();
