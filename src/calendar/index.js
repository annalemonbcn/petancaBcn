import { checkToday } from "./utils.js";

const display = document.querySelector(".display");
const previous = document.querySelector(".left");
const next = document.querySelector(".right");
const days = document.querySelector(".days");
const selected = document.querySelector(".selected");

const dateToday = new Date();
const year = dateToday.getFullYear();
let month = dateToday.getMonth();
let currentlySelectedDay = null;

const displayCalendar = () => {
  let formattedDate = dateToday.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  display.innerHTML = `${formattedDate}`;

  const firstDay = new Date(year, month, 1);
  const firstDayIndex = firstDay.getDay() - 1;
  const lastDay = new Date(year, month + 1, 0);
  const numberOfDays = lastDay.getDate();

  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);

  // Create each day container
  for (let x = 0; x < firstDayIndex; x++) {
    const dayContainer = document.createElement("div");
    dayContainer.innerHTML += "";
    days.appendChild(dayContainer);
  }

  // Fill day numbers
  for (let i = 1; i <= numberOfDays; i++) {
    const div = document.createElement("div");
    const date = new Date(year, month, i);
    div.innerHTML += i;
    div.dataset.date = date.toDateString();
    days.appendChild(div);

    if (checkToday(date)) div.classList.add("current-date");

    if (date < yesterday) {
      div.classList.add("disabled");
    }
  }
};

const displaySelected = () => {
  const dayElements = document.querySelectorAll(".days div");
  dayElements.forEach((day) => {
    day.onclick = (e) => {
      const selectedDate = e.target.dataset.date;

      // Remove class from previous selected day
      if (currentlySelectedDay) {
        currentlySelectedDay.classList.remove("selected-date");
      }

      // Add class to new selected day
      e.target.classList.add("selected-date");
      currentlySelectedDay = e.target;

      // Display selected date
      // selected.innerHTML = `Selected Date : ${selectedDate}`;
    };
  });
};

previous.addEventListener("click", () => {
  days.innerHTML = "";
  // selected.innerHTML = "";
  if (month < 0) {
    month = 11;
    year = year - 1;
  }
  month = month - 1;
  dateToday.setMonth(month);
  displayCalendar();
  displaySelected();
});

next.addEventListener("click", () => {
  days.innerHTML = "";
  // selected.innerHTML = "";
  if (month > 11) {
    month = 0;
    year = year + 1;
  }
  month = month + 1;
  dateToday.setMonth(month);
  displayCalendar();
  displaySelected();
});

displayCalendar();
displaySelected();
