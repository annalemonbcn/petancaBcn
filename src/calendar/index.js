import {
  checkToday,
  generateHours,
  getMmonthAndYearFromDate,
  isDisabledDate,
} from "./utils.js";
import { notyf } from "../notyf/index.js";
import { toggleView } from "../modal/utils.js";
import { closeModal } from "../modal/index.js";
import { BOOKINGS_KEY_PREFIX } from "../utils/localStorage.js";

const previous = document.querySelector(".left");
const next = document.querySelector(".right");
const days = document.querySelector(".days");
const timePicker = document.getElementById("picker-time");

const selectedDayEl = document.getElementById("selected-day");
const selectedHourEl = document.getElementById("selected-hour");

const btnConfirm = document.getElementById("btn-confirm");

export let currentlySelectedDay = null;
export let currentlySelectedHour = null;

const dateToday = new Date();
let year = dateToday.getFullYear();
let month = dateToday.getMonth();

const bookingModal = document.getElementById("modal-booking");
const markerNameEl = document.querySelector(".modal .marker-name");
const modalBody = document.querySelector(".modal #modal-body");

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
    const dayContainer = document.createElement("div");
    const date = new Date(year, month, i);

    dayContainer.innerHTML += i;
    dayContainer.dataset.date = date.toDateString();

    if (checkToday(date)) {
      dayContainer.classList.add("current-date");
      currentlySelectedDay = dayContainer;
      displaySelectedDay(currentlySelectedDay);
    }

    if (isDisabledDate(date)) dayContainer.classList.add("disabled");

    // Add listener for each day
    dayContainer.onclick = (e) => handleDayClick(e.target);

    days.appendChild(dayContainer);
  }
};

const displayHours = () => {
  const hours = generateHours();
  const currentHour = dateToday.getHours();

  // Reset time picker section
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

    // Add listener
    hourContainer.onclick = (e) => handleHourClick(e.target);

    // Add hour-container to timePicker
    timePicker.appendChild(hourContainer);
  });
};

const displaySelectedHour = (selectedHour) =>
  (selectedHourEl.innerHTML = selectedHour.dataset.time);

const displaySelectedDay = (selectedDay) =>
  (selectedDayEl.innerHTML = selectedDay.dataset.date);

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

  // Re-render new hours for each new day
  displayHours();
  // Reset UI selected hour element
  selectedHourEl.innerHTML = "";
};

const handleHourClick = (element) => {
  // Remove class from previous selected time
  if (currentlySelectedHour) {
    currentlySelectedHour.classList.remove("selected-hour");
  }

  // Add clas to new selected hour
  element.classList.add("selected-hour");
  // Save element to current  var
  currentlySelectedHour = element;
  // Display selected hour on UI element
  displaySelectedHour(currentlySelectedHour);
};

const init = () => {
  // Create days of the week
  const daysNamed = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const weekEl = document.querySelector(".week");
  daysNamed.forEach((day) => {
    const container = document.createElement("div");
    container.innerHTML = day;
    weekEl.appendChild(container);
  });

  // Display calendar
  displayCalendar();
  // Display time picker
  displayHours();

  previous.onclick = () => {
    days.innerHTML = "";
    if (month < 0) {
      month = 11;
      year = year - 1;
    }
    month = month - 1;
    dateToday.setMonth(month);
    displayCalendar();
  };

  next.onclick = () => {
    days.innerHTML = "";
    if (month > 11) {
      month = 0;
      year = year + 1;
    }
    month = month + 1;
    dateToday.setMonth(month);
    displayCalendar();
  };
};

init();

btnConfirm.onclick = () => {
  if (!currentlySelectedHour) {
    notyf.error("You must select a time");
    return;
  }

  // Switch view in modal-body
  toggleView();

  // Fill view info
  const courtNameEl = document.querySelector("#modal-body .confirm #courtName");
  courtNameEl.innerHTML = markerNameEl.innerHTML;

  const confirmSelectedDayEl = document.querySelector(
    "#modal-body .confirm #selectedDay"
  );
  confirmSelectedDayEl.innerHTML = currentlySelectedDay.dataset.date;

  const confirmSelectedTime = document.querySelector(
    "#modal-body .confirm #selectedTime"
  );
  confirmSelectedTime.innerHTML = currentlySelectedHour.dataset.time;
};

const bookButton = document.querySelector(".modal .btn-retro#book");
bookButton.onclick = () => {
  const bookingData = {
    id: modalBody.dataset.modalId,
    court: markerNameEl.innerHTML,
    day: currentlySelectedDay.dataset.date,
    hour: currentlySelectedHour.dataset.time,
  };
  try {
    // Save item in localStorage
    localStorage.setItem(
      `${BOOKINGS_KEY_PREFIX}${modalBody.dataset.modalId}`,
      JSON.stringify(bookingData)
    );
    const confirmation = notyf.success(
      "Booking registered! Click here to see all your bookings."
    );
    confirmation.on(
      "click",
      ({ target, event }) => (window.location.href = "src/pages/bookings.html")
    );
    closeModal(bookingModal);
  } catch (error) {
    notyf.error("Couldn't register your booking. Please try again");
    console.error("Error registering a booking", error);
  }
};
