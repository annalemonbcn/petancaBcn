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

// Create days of the week
const daysNamed = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const weekEl = document.querySelector(".week");
daysNamed.forEach((day) => {
  const container = document.createElement("div");
  container.innerHTML = day;
  weekEl.appendChild(container);
});

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

    div.innerHTML += i;
    div.dataset.date = date.toDateString();

    if (checkToday(date)) {
      div.classList.add("current-date");
      currentlySelectedDay = div;
      displaySelectedDay(currentlySelectedDay);
    }

    if (isDisabledDate(date)) div.classList.add("disabled");

    days.appendChild(div);
  }
};

const displayHours = () => {
  const hours = generateHours();
  const currentHour = dateToday.getHours();

  // Reset time picker section
  const timePicker = document.getElementById("picker-time");
  timePicker.innerHTML = "";

  hours.forEach((hour) => {
    // Create an hour-container and add date-time attr
    const hourContainer = document.createElement("div");
    hourContainer.innerHTML = hour;
    hourContainer.classList.add("hour");
    hourContainer.dataset.time = hour;

    // If selected day is today: disable past hours
    if (checkToday(new Date(currentlySelectedDay.dataset.date))) {
      const generatedHour = hour.split(":").at(0);
      if (generatedHour <= currentHour) hourContainer.classList.add("disabled");
    }

    // Add hour-container to timePicker
    timePicker.appendChild(hourContainer);
  });
};

const displaySelectedDay = (selectedDay) => {
  const selectedDayEl = document.getElementById("selected-day");
  selectedDayEl.innerHTML = selectedDay.dataset.date;
};

const handleDayClick = (element) => {
  // Remove class from previous selected day
  if (currentlySelectedDay) {
    currentlySelectedDay.classList.remove("selected-date");
  }

  // Add class to new selected day
  element.classList.add("selected-date");
  // Save element to currentlySelectedDay var
  currentlySelectedDay = element;
  // Display selected day on UI element
  displaySelectedDay(currentlySelectedDay);

  // Re-render new hours
  displayHours();
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
