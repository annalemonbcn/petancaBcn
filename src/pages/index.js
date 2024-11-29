import { createHeader } from "../utils/header.js";
import { getAllBookings, removeBooking } from "../utils/localStorage.js";
import { renderBooking } from "./utils.js";
import { notyf } from "../notyf/index.js";

const bookingsListEl = document.getElementById("bookings-list");

const deleteModal = document.querySelector(".modal#modal-delete");
const courtNameEl = document.querySelector(
  ".modal#modal-delete #details-courtName"
);
const courtDayEl = document.querySelector(".modal#modal-delete #details-day");
const courtHourEl = document.querySelector(".modal#modal-delete #details-hour");

const icoClose = document.getElementById("ico-close");
const cancelButton = document.querySelector(".modal .btn-retro#cancel");
const deleteButton = document.querySelector(".modal .btn-retro#delete");

createHeader();
document.getElementById("app-content").classList.add("show");

const renderBookings = () => {
  const bookings = getAllBookings();

  // Hide html
  const noBookingsEl = document.getElementById("noBookings");
  noBookingsEl.style.display = "none";
  const bookingsEl = document.getElementById("bookings");
  bookingsEl.style.display = "none";

  if (!bookings.length) {
    noBookingsEl.style.display = "block";
    return;
  }
  bookingsEl.style.display = "flex";
  const bookingHtml = bookings.map(renderBooking).join("");
  bookingsListEl.innerHTML = bookingHtml;
  addCrossElementsListeners();
};

const addCrossElementsListeners = () => {
  const crossElements = document.querySelectorAll(".booking .cancel img");
  crossElements.forEach((crossEl) => {
    crossEl.onclick = (e) => {
      const booking = e.target.closest(".booking");
      openModal(booking);
    };
  });
};

renderBookings();

const openModal = (booking) => {
  deleteModal.style.display = "block";

  const bookingName = booking.children[0].children[1].innerHTML;
  courtNameEl.innerHTML = bookingName;

  const bookingDay = booking.children[0].children[2].innerHTML;
  courtDayEl.innerHTML = bookingDay;

  const bookingHour = booking.children[0].children[3].innerHTML;
  courtHourEl.innerHTML = bookingHour;

  const bookingId = booking.dataset.id;

  // Listener to Delete button
  deleteButton.onclick = () => {
    try {
      removeBooking(bookingId);
      notyf.success("Booking successfully deleted");
      closeModal();
      renderBookings();
    } catch (error) {
      notyf.error("Error deleting your booking");
      console.error("Error deleting booking", error);
    }
  };
};

const closeModal = () => (deleteModal.style.display = "none");

// Listener to icoClose
icoClose.onclick = () => closeModal();

// Listener to cancel button
cancelButton.onclick = () => closeModal();

// Listener to window to close the modal if click anywhere outside of the modal
window.onclick = (event) => {
  if (event.target == deleteModal) {
    closeModal();
  }
};
