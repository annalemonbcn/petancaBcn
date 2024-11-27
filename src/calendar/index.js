import {
  checkToday,
  generateHours,
  getMmonthAndYearFromDate,
  isDisabledDate,
} from "./utils.js";

const previous = document.querySelector(".left");
const next = document.querySelector(".right");
const days = document.querySelector(".days");

let currentlySelectedDay = null;
let currentlySelectedHour = null;

const dateToday = new Date();
let year = dateToday.getFullYear();
let month = dateToday.getMonth();

const displayCalendar = () => {
  const displayElement = document.querySelector(".display");
  displayElement.innerHTML = `${getMmonthAndYearFromDate(dateToday)}`;

  const firstDay = new Date(year, month, 1);
  const firstDayIndex = firstDay.getDay() - 1;
  const lastDay = new Date(year, month + 1, 0);
  const numberOfDays = lastDay.getDate();

  // Create empty days container at the beginning
  for (let i = 0; i < firstDayIndex; i++) {
    const dayContainer = document.createElement("div");
    dayContainer.innerHTML += "";
    days.appendChild(dayContainer);
  }

  // Fill day numbers
  for (let i = 1; i <= numberOfDays; i++) {
    const div = document.createElement("div");
    const date = new Date(year, month, i);
    // console.log("date", date);

    div.innerHTML += i;
    div.dataset.date = date.toDateString();

    if (checkToday(date)) div.classList.add("current-date");

    if (isDisabledDate(date)) div.classList.add("disabled");

    days.appendChild(div);
  }
};

const displayHours = () => {
  const hours = generateHours();
  // const currentHour = dateToday.getHours();

  const timePicker = document.getElementById("picker-time");

  hours.forEach((hour) => {
    const hourContainer = document.createElement("div");
    hourContainer.innerHTML = hour;
    hourContainer.classList.add("hour");
    hourContainer.dataset.time = hour;

    // TODO: disable hours
    // const generatedHour = hour.split(":").at(0);

    // if (generatedHour <= currentHour) hourContainer.classList.add("disabled");

    timePicker.appendChild(hourContainer);
  });
};

const handleDayClick = (element) => {
  // Remove class from previous selected day
  if (currentlySelectedDay) {
    currentlySelectedDay.classList.remove("selected-date");
  }

  // Add class to new selected day
  element.classList.add("selected-date");
  currentlySelectedDay = element;
};

const handleHourClick = (element) => {
  // Remove class from previous selected time
  if (currentlySelectedHour) {
    currentlySelectedHour.classList.remove("selected-hour");
  }

  // Add clas to new selected hour
  element.classList.add("selected-hour");
  currentlySelectedHour = element;
};

const displaySelected = () => {
  const dayElements = document.querySelectorAll(".days div");
  dayElements.forEach((day) => (day.onclick = (e) => handleDayClick(e.target)));

  const hourElements = document.querySelectorAll("#picker-time .hour");
  hourElements.forEach(
    (hour) => (hour.onclick = (e) => handleHourClick(e.target))
  );
};

displayCalendar();
displayHours();
displaySelected();

previous.addEventListener("click", () => {
  days.innerHTML = "";
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
  if (month > 11) {
    month = 0;
    year = year + 1;
  }
  month = month + 1;
  dateToday.setMonth(month);
  displayCalendar();
  displaySelected();
});
