import { createHeader } from "../../utils/header.js";
import {
  getAllBookings,
  removeAllBookings,
  removeBooking,
} from "../../utils/localStorage.js";
import { renderBooking } from "./utils.js";
import { notyf } from "../../notyf/index.js";

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
  const allBookings = getAllBookings();

  // Hide html
  const noBookingsEl = document.getElementById("noBookings");
  noBookingsEl.style.display = "none";
  const bookingsEl = document.getElementById("bookings");
  bookingsEl.style.display = "none";

  if (!allBookings.length) {
    noBookingsEl.style.display = "block";
    return;
  }

  bookingsEl.style.display = "flex";
  const bookingHtml = allBookings.map(renderBooking).join("");
  bookingsListEl.innerHTML = bookingHtml;
  addCrossElementsListeners();
};

const addCrossElementsListeners = () => {
  const crossElements = document.querySelectorAll(".booking .cancel img");
  crossElements.forEach((crossEl) => {
    crossEl.onclick = (e) => {
      const booking = e.target.closest(".booking");
      openDeleteModal(booking);
    };
  });
};

renderBookings();

const deleteAll = document.getElementById("deleteAll");
const deleteAllModal = document.querySelector(".modal#modal-deleteAll");
deleteAll.onclick = () => {
  // show modal
  openDeleteAllModal();

  // If click on delete button
  document.querySelector(".modal#modal-deleteAll #deleteAllBtn").onclick =
    () => {
      try {
        removeAllBookings(getAllBookings());
        notyf.success("All bookings successfully deleted");
        closeDeleteAllModal();
        renderBookings();
      } catch (error) {
        notyf.error("Error deleting all bookings");
        console.error("Error deleting all bookings", error);
      }
    };
};

/** DELETE ALL MODAL */
const openDeleteAllModal = () => (deleteAllModal.style.display = "block");

const closeDeleteAllModal = () => (deleteAllModal.style.display = "none");

// Listener to icoClose
document.querySelector(".modal#modal-deleteAll #ico-close").onclick = () =>
  closeDeleteAllModal();

// Listener to cancel button
document.querySelector(".modal#modal-deleteAll #cancelBtn").onclick = () =>
  closeDeleteAllModal();

/** DELETE SINGLE MODAL */
const openDeleteModal = (booking) => {
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
      closeDeleteModal();
      renderBookings();
    } catch (error) {
      notyf.error("Error deleting your booking");
      console.error("Error deleting booking", error);
    }
  };
};

const closeDeleteModal = () => (deleteModal.style.display = "none");

// Listener to icoClose
icoClose.onclick = () => closeDeleteModal();

// Listener to cancel button
cancelButton.onclick = () => closeDeleteModal();

// Listener to window to close modals if click anywhere outside of the modal
window.onclick = (event) => {
  if (event.target == deleteModal) {
    closeDeleteModal();
  }
  if (event.target == deleteAllModal) {
    closeDeleteAllModal();
  }
};
